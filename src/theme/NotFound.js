/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function NotFound() {
  const { siteConfig } = useDocusaurusContext();
  const siteName = siteConfig.customFields.languageName;
  return (
    <Layout title="Page Not Found">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">
              This page is not available for {siteName}.
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

export default NotFound;
