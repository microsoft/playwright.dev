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
              We could not find what you were looking for.
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

export default NotFound;
