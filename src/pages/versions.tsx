import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import { useVersions, useLatestVersion } from '@theme/hooks/useDocs';

const Version: React.FC = () => {
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const currentVersion = versions.find((version) => version.name === 'current');
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  );
  const stableVersion = latestVersion;
  const repoUrl = `https://github.com/microsoft/playwright`;

  return (
    <Layout
      title="Versions"
      permalink="/versions"
      description="Docusaurus 2 Versions page listing all documented site versions">
      <main className="container margin-vert--lg">
        <h1>Versions</h1>

        {stableVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Latest version</h3>
            <table>
              <tbody>
                <tr>
                  <th>{stableVersion.name}</th>
                  <td>
                    <Link to={stableVersion.path + '/api/class-playwright'}>Documentation</Link>
                  </td>
                  <td>
                    <a href={`${repoUrl}/releases/tag/v${stableVersion.name}.0`}>
                      Release Notes
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Next version (Unreleased)</h3>
            <table>
              <tbody>
                <tr>
                  <th>Next</th>
                  <td>
                    <Link to={currentVersion.path + '/api/class-playwright'}>Documentation</Link>
                  </td>
                  <td>
                    <a href={repoUrl}>Source Code</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {pastVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past versions</h3>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path + '/api/class-playwright'}>Documentation</Link>
                    </td>
                    <td>
                      <a href={`${repoUrl}/releases/tag/v${version.name}.0`}>
                        Release Notes
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default Version;
