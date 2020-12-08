//@ts-check
const fse = require("fs-extra");
const path = require("path");
const md = require("markdown-it")({ typographer: true });
md.use(require("markdown-it-title"), 0);
const slugify = require("slugify");
const sh = require("shelljs");
const semver = require("semver");

function slugger(text) {
  //@ts-ignore
  return slugify(text, { lower: true, strict: true });
}

function getTitle(contents) {
  const env = {};
  md.render(contents, env);
  return env.title;
}

function removeHeadingLine(contents) {
  const lines = contents.split("\n");
  const findIndex = lines.findIndex((l) => l.startsWith("# "));
  return lines.slice(findIndex + 1).join("\n");
}

function writeFrontmatter(filePath) {
  const contents = fse.readFileSync(filePath).toString();
  console.log('frontmatter....');
  const title = getTitle(contents);
  const fileName = path.basename(filePath, path.extname(filePath));
  const fm = `---\nid: ${fileName}\ntitle: "${title}"\n---\n\n`;
  const newContents = removeHeadingLine(contents);
  fse.writeFileSync(filePath, `${fm}${newContents}`);
}

function closeTags(filePath) {
  // replaces <img> with <img/> and <br> with <br/>
  // + special handling for troubleshooting.md
  const contents = fse.readFileSync(filePath).toString();
  const newContents = contents
    .replace(/(<img("[^"]*"|[^\/">])*)>/gi, "$1/>")
    .replace(/(<br("[^"]*"|[^\/">])*)>/gi, "$1/>")
    .replace("<br/>\n</details>", "<br/>\n\n</details>");
  fse.writeFileSync(filePath, newContents);
}

function fixLinks(filePath, pagesForAPIHeadings) {
  // TODO: this does not work when anchors slug is duplicate: e.g., page.$ and page.$$
  // TODO: handle non-markdown links (e.g. dockerfile.bionic) -- redirect to github
  const existingContents = fse.readFileSync(filePath).toString();
  let contents = existingContents;
  function replaceLink(contents, slug, newSlug) {
    return contents.replace(slug, newSlug);
  }
  Object.keys(pagesForAPIHeadings).forEach((slug) => {
    const fileName = pagesForAPIHeadings[slug];
    // For inline links
    contents = replaceLink(contents, `(#${slug})`, `(${fileName}#${slug})`);
    // For links in footer
    contents = replaceLink(contents, `api.md#${slug}`, `${fileName}#${slug}`);
  });
  fse.writeFileSync(filePath, contents);
}

function markdownFiles(dir) {
  let files = [];
  fse.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fse.lstatSync(fullPath).isDirectory()) {
      files.push(...markdownFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  });
  return files.filter((name) => name.endsWith(".md"));
}

function keepOnlyMarkdownFiles(dir) {
  fse.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fse.lstatSync(fullPath).isDirectory()) {
      keepOnlyMarkdownFiles(fullPath);
    } else {
      if (!fullPath.endsWith(".md")) {
        fse.removeSync(fullPath);
      }
    }
  });
}

function overwriteFooterLinks(footerLines) {
  // Changes relative to absolute
  // e.g. #class-browsertype -> api.md#class-browsertype
  return footerLines.map((line) => line.replace(/(#[^\s]+)/g, "api.md$1"));
}

function splitApi(contents, destDir) {
  const pageForHeading = {};
  const tokens = md.parse(contents, {});
  const headings = tokens.filter((t) => t.type === "heading_open");
  const headingsToSplitPages = headings.filter((t) => t.tag === "h3");
  const lines = contents.split("\n");
  const tokensWithLineNum = tokens.filter((t) => t.map);
  const lastToken = tokensWithLineNum[tokensWithLineNum.length - 1];
  const footerStart = lastToken.map[1];
  const footerLines = overwriteFooterLinks(lines.slice(footerStart));

  const lineNums = headingsToSplitPages.map((h) => h.map[0]);
  const pairs = lineNums.reduce((result, value, index, array) => {
    if (index < array.length - 1) {
      result.push(array.slice(index, index + 2));
    } else {
      result.push([value, footerStart]);
    }
    return result;
  }, []);

  pairs.forEach((p) => {
    const [start, end] = p;
    fse.mkdirpSync(path.join(destDir, "api"));
    const contentLines = [...lines.slice(start, end), ...footerLines];
    const contents = contentLines.join("\n");
    console.log('pairs....')
    const title = getTitle(contents);
    const slug = slugger(title);
    const relativePath = path.join("api", `${slug}.md`);
    const fullPath = path.join(destDir, relativePath);
    // Promote headings by 2 levels
    const newContents = contents
      .replace(/###/g, "#")
      .replace(/####/g, "##")
      .replace(/#####/g, "###");
    fse.writeFileSync(fullPath, newContents);

    const pairHeadings = headings.filter(
      (t) => t.map[0] >= start && t.map[0] <= end
    );
    console.log('internal headings....', destDir);
    const internalHeadings = pairHeadings
      .map((t) => getTitle(lines[t.map[0]]))
      .map((t) => slugger(t));
    internalHeadings.forEach((h) => {
      pageForHeading[h] = relativePath;
    });
  });
  return pageForHeading;
}

function generateApiSidebar(contents, version) {
  // parse the table of contents
  const tokens = md.parse(contents, {});
  const ul = tokens.find((t) => t.type === "bullet_list_open");
  const listItems = tokens.filter(
    (t) => t.type === "inline" && t.map[0] >= ul.map[0] && t.map[1] <= ul.map[1]
  );
  const ids = listItems
    .map((li) => li.children.find((c) => c.type === "text"))
    .map((t) => t.content)
    .map(slugger);
  const prefix = version ? `version-${version}/api/` : "api/";
  return [
    {
      type: "category",
      label: "API reference",
      items: ids.map((id) => ({ type: "doc", id: `${prefix}${id}` })),
      collapsed: false,
    },
  ];
}

function generateDocsSidebar(contents, version) {
  // For pre-v1.2.0 tags, the sidebar does not have categories
  // and is a flat list of links to docs.
  const tokens = md.parse(contents, {});
  const ol = tokens.find((t) => t.type === "ordered_list_open");
  const headings = tokens.filter(
    (t) =>
      t.type === "inline" &&
      t.map[0] >= ol.map[0] &&
      t.map[1] <= ol.map[1] &&
      t.level === 3
  );
  const prefix = version ? `version-${version}/` : "";

  function headingContent(token) {
    return token.children.find((t) => t.type === "text").content;
  }

  function headingLink(token) {
    const link = token.children.find((t) => t.type === "link_open");
    const id = link.attrs[0][1].replace("./", "").replace(".md", "");
    return `${prefix}${id}`;
  }

  function subList(headingToken) {
    const ul = tokens.find(
      (t) => t.type === "bullet_list_open" && t.map[0] >= headingToken.map[0]
    );
    if (!ul) {
      // Ignore. This should be only the "API reference" heading in pre-v1.2.0 tags
      return undefined;
    }
    const items = tokens.filter(
      (t) =>
        t.type === "inline" && t.map[0] >= ul.map[0] && t.map[1] <= ul.map[1]
    );
    const hrefs = items.map((i) => i.children[0].attrs[0][1]);
    return {
      type: "category",
      label: headingContent(headingToken),
      items: hrefs
        .filter((h) => h.endsWith(".md"))
        .map((h) => h.replace("./", "").replace(".md", ""))
        .filter((h) => h !== "api")
        .map((id) => ({ type: "doc", id: `${prefix}${id}` })),
      collapsed: false,
    };
  }

  const hasCategories = !version || !semver.lt(version, "1.3.0");
  return hasCategories
    ? headings.map(subList).filter(Boolean)
    : headings.map((h) => ({
        type: "doc",
        // label: headingContent(h),
        id: headingLink(h),
      }));
}

function writeSidebarFile(apiSidebar, docsSidebar, sidebarFile, version) {
  const sidebar = {};
  const docsKey = version ? `version-${version}/docs` : "docs";
  const apiKey = version ? `version-${version}/api` : "api";
  sidebar[docsKey] = docsSidebar;
  sidebar[apiKey] = apiSidebar;
  const content = version
    ? JSON.stringify(sidebar)
    : `module.exports = ${JSON.stringify(sidebar)};`;
  fse.ensureFileSync(sidebarFile);
  fse.writeFileSync(sidebarFile, content);
}

function copyFiles(srcDir, destDir, version) {
  const currentDir = sh.pwd().stdout;
  sh.cd(srcDir);
  const tag = version ? `tags/v${version}` : `master`;
  const result = sh.exec(`git checkout ${tag}`);
  if (result.code !== 0) {
    console.warn(`git checkout to ${tag} failed. Check source repo.`);
    process.exit(1);
  }
  sh.cd(currentDir);
  fse.copySync(srcDir, destDir);
}

function writeVersionsFile(version) {
  let newVersions = [];
  const versionsFile = "versions.json";
  if (fse.existsSync(versionsFile)) {
    const versions = JSON.parse(fse.readFileSync("versions.json").toString());
    versions.unshift(version);
    newVersions = versions;
  } else {
    newVersions = [version];
  }
  const uniqVersions = semver.rsort([...new Set(newVersions)]);
  fse.writeFileSync("versions.json", JSON.stringify(uniqVersions));
}

function main(srcDir, version) {
  if (!srcDir) {
    console.log(
      "Use SRC_DIR to specify docs location, e.g. path-to-repo/docs."
    );
    process.exit(1);
  }
  const destDir = (function () {
    return version
      ? path.join("versioned_docs", `version-${version}`)
      : "./docs";
  })();
  const sidebarFile = (function () {
    return version
      ? path.join("versioned_sidebars", `version-${version}-sidebars.json`)
      : "sidebars.js";
  })();
  fse.mkdirpSync(destDir);
  fse.emptyDirSync(destDir);
  copyFiles(srcDir, destDir, version);
  keepOnlyMarkdownFiles(destDir);

  // Transform API reference
  const apiContents = fse.readFileSync(path.join(destDir, "api.md")).toString();
  const pagesForAPIHeadings = splitApi(apiContents, destDir);
  const apiSidebar = generateApiSidebar(apiContents, version);

  // Transform markdown files
  const files = markdownFiles(destDir);
  files.forEach((filePath) => {
    writeFrontmatter(filePath);
    fixLinks(filePath, pagesForAPIHeadings);
    closeTags(filePath);
  });
  // Build docs sidebar
  const docsIndex = fse
    .readFileSync(path.join(destDir, "README.md"))
    .toString();
  const docsSidebar = generateDocsSidebar(docsIndex, version);
  writeSidebarFile(apiSidebar, docsSidebar, sidebarFile, version);

  if (version) {
    writeVersionsFile(version);
  }
}

module.exports = {
  main
}
