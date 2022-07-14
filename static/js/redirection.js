function param(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const path = param("path");
const q = param("q");
const version = param("version");

if (path) {
  // TODO: use versions
  // http://localhost:3000/#version=master&path=docs%2Femulation.md&q=geolocation
  window.location.pathname = `${param("path").replace(".md", "")}#${param("q")}`;
} else {
  const redirects = [
    // ------------------- nodejs ---------------------
    { from: '/docs/test-intro', to: '/docs/intro' },
    { from: '/docs/installation', to: '/docs/library' },
    { from: '/docs/next/test-intro', to: '/docs/next/intro' },
    { from: '/docs/next/installation', to: '/docs/next/library' },
    { from: '/docs/assertions', to: '/docs/test-assertions' },
    { from: '/docs/next/assertions', to: '/next/docs/test-assertions' },
    { from: '/docs/inspector', to: '/docs/debug' },
    { from: '/blog', to: '/community/welcome' },
    // ------------------- python ---------------------
    { from: '/python/docs/assertions', to: '/python/docs/api/class-playwrightassertions' },
    { from: '/python/next/docs/assertions', to: '/python/next/docs/api/class-playwrightassertions' },
    { from: '/python/docs/inspector', to: '/python/docs/debug' },
    { from: '/python/blog', to: '/community/welcome' },
    // ------------------- dotnet ---------------------
    { from: '/dotnet/docs/assertions', to: '/dotnet/docs/api/class-playwrightassertions' },
    { from: '/dotnet/next/docs/assertions', to: '/dotnet/next/docs/api/class-playwrightassertions' },
    { from: '/dotnet/inspector', to: '/dotnet/docs/debug' },
    { from: '/dotnet/blog', to: '/community/welcome' },
    // ------------------- java -----------------------
    { from: '/java/docs/assertions', to: '/java/docs/api/class-playwrightassertions' },
    { from: '/java/next/docs/assertions', to: '/java/next/docs/api/class-playwrightassertions' },
    { from: '/java/docs/inspector', to: '/java/docs/debug' },
    { from: '/java/blog', to: '/community/welcome' },
  ];
  const pathname = window.location.pathname;
  for (const redirect of redirects) {
    if (pathname === redirect.from || pathname === redirect.from + '/') {
      window.location.pathname = redirect.to;
      break;
    }
  }
}

window.addEventListener("load", () => {
  const availableIds = [...document.querySelectorAll("[id]")].map(e => e.id)
  const currentHash = window.location.hash.length > 0 ? window.location.hash.substring(1) : '';
  const currentHashIsFound = availableIds.includes(currentHash)
  if (currentHash && !currentHashIsFound) {
    const headingFound = [...document.querySelectorAll("div.markdown > h2")]
      .find(element => element.textContent.replace(/[ ]+/g, '-').replace(/[^\w-_]/g, '').replace("#", "").toLowerCase() === currentHash)
    if (headingFound) {
      const newHash = headingFound.querySelector("a").id
      window.location.hash =  newHash
    }
  }
})

const languagesInSubfolders = ['java', 'dotnet', 'python'];

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    const language = languagesInSubfolders.find(lang => window.location.pathname.startsWith(`/${lang}`));
    let serviceWorkerPath;
    if (language)
      serviceWorkerPath = `/${language}/sw.js`;
    else
      serviceWorkerPath = `/sw.js`;

    navigator.serviceWorker.register(serviceWorkerPath);
  }
});
