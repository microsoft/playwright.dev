/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Layout from '@theme/Layout';
import {useLocation} from '@docusaurus/router';

function NotFound() {
  const location = useLocation();
  const language = getLanguageByPath(location.pathname);
  return (
    <Layout title="Page Not Found">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">
              This page is not available for {language}.
            </h1>
            <p>
              We could not find what you were looking for, you can file an issue
              for the missing page <a href={generateGitHubIssueLink(location.pathname)}>here</a>.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

/**
 * @param {string} path
 * @returns {string}
 */
function getLanguageByPath(path) {
  if (path.startsWith('/python'))
    return 'Python';
  if (path.startsWith('/java'))
    return 'Java';
  if (path.startsWith('/dotnet'))
    return '.NET';
  return 'Node.js'
}

/**
 * @param {string} path
 * @returns {string}
 */
function generateGitHubIssueLink(path) {
  const params = new URLSearchParams();
  params.set('title', `[Docs]: Page not found ${path}`);
  params.set('body', `Hello!

I was navigating to the following URL: https://playwright.dev/${path} and it resulted in a 404 error.`);
  return `https://github.com/microsoft/playwright/issues/new?${params.toString()}`;
}

export default NotFound;
