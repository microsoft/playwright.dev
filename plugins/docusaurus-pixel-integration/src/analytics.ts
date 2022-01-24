import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const languagesInSubfolders = ['java', 'dotnet', 'python'];

function parsePath(path: string): { path: string, language: string } {
  for (const language of languagesInSubfolders) {
    if (path.startsWith(`/${language}/`)) {
      return { path: path.substring(`/${language}`.length), language };
    }
  }
  return { path, language: 'node' };
}

function sendPixelEvent() {
  const { path, language } = parsePath(window.location.pathname);
  const hash = window.location.hash || '';
  const payload = new URLSearchParams({
    hash,
    path,
    language,
  });
  fetch(`https://playwright-analytics.azurewebsites.net/api/impression?${payload.toString()}`)
    .catch(() => { });
}

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }
  sendPixelEvent();
  return {
    onRouteUpdate() {
      sendPixelEvent();
    },
  };
})();
