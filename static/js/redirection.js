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
  window.location.href = `${param("path").replace(".md", "")}#${param("q")}`;
} else {
  const redirects = [
    // TODO: enable after publishing 1.13
    // { from: '/docs/test-intro', to: '/docs/intro' },
    { from: '/docs/next/test-intro', to: '/docs/next/intro' },
  ];
  const pathname = window.location.pathname;
  for (const redirect of redirects) {
    if (pathname.endsWith(redirect.from)) {
      window.location.pathname = pathname.substring(0, pathname.length - redirect.from.length) + redirect.to;
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
