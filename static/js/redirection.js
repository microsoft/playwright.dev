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
}

const availableIds = [...document.querySelectorAll("[id]")].map(e => e.id)
const currentHash = window.location.hash.length > 0 ? window.location.hash.substring(1) : '';
const currentHashIsFound = availableIds.includes(currentHash)
if (currentHash && !currentHashIsFound) {
  const alternativeHash = availableIds.find(id => id.replace(/-/g, '') === currentHash);
  if (alternativeHash)
    window.location.hash = alternativeHash
}

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
