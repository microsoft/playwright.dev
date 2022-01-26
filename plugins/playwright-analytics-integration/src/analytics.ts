/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

function sendAnalyticsEvent() {
  const { path, language } = parsePath(window.location.pathname);
  const hash = window.location.hash ? window.location.hash.substring(1) : '';
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
  sendAnalyticsEvent();
  return {
    onRouteUpdate() {
      sendAnalyticsEvent();
    },
  };
})();
