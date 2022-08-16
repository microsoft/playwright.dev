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
    { from: '/docs/browser-contexts', to: '/docs/isolation' },
    { from: '/docs/auth', to: '/docs/test-auth' },
    { from: '/docs/pom', to: '/docs/test-pom' },
    { from: '/docs/screenshot', to: '/docs/test-snapshot' },
    { from: '/docs/selectors', to: '/docs/locators' },
    { from: '/blog', to: '/community/welcome' },
    // ------------------- python ---------------------
    {
      from: '/python/docs/assertions',
      to: '/python/docs/api/class-playwrightassertions'
    },
    {
      from: '/python/next/docs/assertions',
      to: '/python/next/docs/api/class-playwrightassertions'
    },
    { from: '/python/docs/inspector', to: '/python/docs/debug' },
    { from: '/python/docs/browser-contexts', to: '/python/docs/isolation' },
    { from: '/python/docs/auth', to: '/python/docs/test-auth' },
    { from: '/python/docs/pom', to: '/python/docs/test-pom' },
    { from: '/python/docs/screenshot', to: '/python/docs/test-snapshot' },
    { from: '/python/docs/selectors', to: '/python/docs/locators' },
    { from: '/python/docs/navigations', to: '/python/docs/intro' },
    { from: '/python/docs/handles', to: '/python/docs/intro' },
    { from: '/python/docs/extensibility', to: '/python/docs/intro' },
    { from: '/python/blog', to: '/community/welcome' },
    // ------------------- dotnet ---------------------
    {
      from: '/dotnet/docs/assertions',
      to: '/dotnet/docs/api/class-playwrightassertions'
    },
    {
      from: '/dotnet/next/docs/assertions',
      to: '/dotnet/next/docs/api/class-playwrightassertions'
    },
    { from: '/dotnet/inspector', to: '/dotnet/docs/debug' },
    { from: '/dotnet/docs/browser-contexts', to: '/dotnet/docs/isolation' },
    { from: '/dotnet/docs/auth', to: '/dotnet/docs/test-auth' },
    { from: '/dotnet/docs/pom', to: '/dotnet/docs/test-pom' },
    { from: '/dotnet/docs/screenshot', to: '/dotnet/docs/test-snapshot' },
    { from: '/dotnet/docs/selectors', to: '/dotnet/docs/locators' },
    { from: '/dotnet/docs/navigations', to: '/dotnet/docs/intro' },
    { from: '/dotnet/docs/handles', to: '/dotnet/docs/intro' },
    { from: '/dotnet/docs/extensibility', to: '/dotnet/docs/intro' },
    { from: '/dotnet/blog', to: '/community/welcome' },
    // ------------------- java -----------------------
    {
      from: '/java/docs/assertions',
      to: '/java/docs/api/class-playwrightassertions'
    },
    {
      from: '/java/next/docs/assertions',
      to: '/java/next/docs/api/class-playwrightassertions'
    },
    { from: '/java/docs/inspector', to: '/java/docs/debug' },
    { from: '/java/docs/browser-contexts', to: '/java/docs/isolation' },
    { from: '/java/docs/auth', to: '/java/docs/test-auth' },
    { from: '/java/docs/pom', to: '/java/docs/test-pom' },
    { from: '/java/docs/screenshot', to: '/java/docs/test-snapshot' },
    { from: '/java/docs/selectors', to: '/java/docs/locators' },
    { from: '/java/docs/navigations', to: '/java/docs/intro' },
    { from: '/java/docs/handles', to: '/java/docs/intro' },
    { from: '/java/docs/extensibility', to: '/java/docs/intro' },
    { from: '/java/blog', to: '/community/welcome' }
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
      window.location.hash = newHash
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

const kGoToNextToken = ['Shift', 'Shift', 'Shift', 'Shift', 'Shift'];
let keyPressState = 0;
document.addEventListener('keydown', (e) => {
  if (kGoToNextToken[keyPressState] === e.key) {
    keyPressState++;
    if (keyPressState === kGoToNextToken.length) {
      gotoNext();
      keyPressState = 0;
    }
  } else {
    keyPressState = 0;
  }

  function gotoNext() {
    const parts = window.location.pathname.split('/');
    if (parts.includes('next'))
      return;
    const docsIndex = parts.indexOf('docs');
    let newPath = '/docs/next/intro';
    if (docsIndex !== -1) {
      parts.splice(docsIndex + 1, 0, 'next')
      newPath = parts.join('/');
    } else if (window.location.pathname.startsWith('/python'))
      newPath = '/python/docs/next/intro';
    else if (window.location.pathname.startsWith('/java'))
      newPath = '/java/docs/next/intro';
    else if (window.location.pathname.startsWith('/dotnet'))
      newPath = '/dotnet/docs/next/intro';
   
    window.location.href = newPath + location.hash;
  }
});
