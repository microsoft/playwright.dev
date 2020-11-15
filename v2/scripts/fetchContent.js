//@ts-check
const fse = require("fs-extra");
const path = require("path");
const md = require("markdown-it")({ typographer: true });
const slugify = require("slugify");
const sh = require("shelljs");
const semver = require("semver");

const { VERSION, SRC_DIR } = process.env;
if (!SRC_DIR) {
  console.log("Use SRC_DIR to specify docs location, e.g. path-to-repo/docs.");
  process.exit(1);
}
const srcDir = SRC_DIR;
const destDir = (function () {
  return VERSION ? path.join("versioned_docs", `version-${VERSION}`) : "./docs";
})();
const sidebarFile = (function () {
  return VERSION
    ? path.join("versioned_sidebars", `version-${VERSION}-sidebars.json`)
    : "sidebars.js";
})();
const versionsFile = "versions.json";

function slugger(text) {
  //@ts-ignore
  return slugify(text, { lower: true, strict: true });
}

function getTitle(contents) {
  const env = {};
  md.use(require("markdown-it-title"), 0).render(contents, env);
  return env.title;
}

function removeHeadingLine(contents) {
  const lines = contents.split("\n");
  const findIndex = lines.findIndex((l) => l.startsWith("# "));
  return lines.slice(findIndex + 1).join("\n");
}

function writeFrontmatter(filePath) {
  const contents = fse.readFileSync(filePath).toString();
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

function splitApi(contents) {
  const tokens = md.parse(contents, {});
  const headings = tokens.filter(
    (t) => t.type === "heading_open" && t.tag === "h3"
  );
  const lineNums = headings.map((h) => h.map[0]);
  const pairs = lineNums.reduce(function (result, value, index, array) {
    if (index < array.length - 1) {
      result.push(array.slice(index, index + 2));
    } else {
      result.push([value, contents.split("\n").length]);
    }
    return result;
  }, []);
  const lines = contents.split("\n");
  // TODO: copy footnote links to all pages
  // TODO: also fix the links since we are splitting api.md

  pairs.forEach((p) => {
    fse.mkdirpSync(path.join(destDir, "api"));
    const contents = lines.slice(p[0], p[1]).join("\n");
    const title = getTitle(contents);
    const slug = slugger(title);
    const filePath = path.join(destDir, "api", `${slug}.md`);
    // promote headings by 2 levels
    const newContents = contents
      .replace(/###/g, "#")
      .replace(/####/g, "##")
      .replace(/#####/g, "###");
    fse.writeFileSync(filePath, newContents);
  });
}

function generateApiSidebar(contents) {
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
  const prefix = VERSION ? `version-${VERSION}/api/` : "api/";
  return [
    {
      type: "category",
      label: "API reference",
      items: ids.map((id) => ({ type: "doc", id: `${prefix}${id}` })),
      collapsed: false,
    },
  ];
}

function generateDocsSidebar(contents) {
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
  const prefix = VERSION ? `version-${VERSION}/` : "";

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

  const hasCategories = !VERSION || !semver.lt(VERSION, "1.3.0");
  return hasCategories
    ? headings.map(subList).filter(Boolean)
    : headings.map((h) => ({
        type: "doc",
        // label: headingContent(h),
        id: headingLink(h),
      }));
}

function writeSidebarFile(apiSidebar, docsSidebar) {
  const sidebar = {};
  const docsKey = VERSION ? `version-${VERSION}/docs` : "docs";
  const apiKey = VERSION ? `version-${VERSION}/api` : "api";
  sidebar[docsKey] = docsSidebar;
  sidebar[apiKey] = apiSidebar;
  const content = VERSION
    ? JSON.stringify(sidebar)
    : `module.exports = ${JSON.stringify(sidebar)};`;
  fse.ensureFileSync(sidebarFile);
  fse.writeFileSync(sidebarFile, content);
}

function copyFiles() {
  const currentDir = sh.pwd().stdout;
  sh.cd(srcDir);
  const tag = VERSION ? `tags/v${VERSION}` : `master`;
  const result = sh.exec(`git checkout ${tag}`);
  if (result.code !== 0) {
    console.warn(`git checkout to ${tag} failed. Check source repo.`);
    process.exit(1);
  }
  sh.cd(currentDir);
  fse.copySync(srcDir, destDir);
}

function writeVersionsFile() {
  let newVersions = [];
  if (fse.existsSync(versionsFile)) {
    const versions = JSON.parse(fse.readFileSync("versions.json").toString());
    versions.unshift(VERSION);
    newVersions = versions;
  } else {
    newVersions = [VERSION];
  }
  const uniqVersions = semver.rsort([...new Set(newVersions)]);
  fse.writeFileSync("versions.json", JSON.stringify(uniqVersions));
}

// Main
fse.mkdirpSync(destDir);
fse.emptyDirSync(destDir);
copyFiles();
keepOnlyMarkdownFiles(destDir);

// Transform API reference
const api = fse.readFileSync(path.join(destDir, "api.md")).toString();
splitApi(api);
const apiSidebar = generateApiSidebar(api);

// Transform markdown files
const files = markdownFiles(destDir);
files.forEach((filePath) => {
  writeFrontmatter(filePath);
  closeTags(filePath);
});
const docsSidebar = generateDocsSidebar(
  fse.readFileSync(path.join(destDir, "README.md")).toString()
);

// Create sidebar
writeSidebarFile(apiSidebar, docsSidebar);

if (VERSION) {
  writeVersionsFile();
}
