import React from 'react';
import Layout from '@theme/Layout';
import VideoCards from './_components/VideoCards';
import PageHeader from './_components/PageHeader';

import featureVideos from '@site/src/data/feature-videos';

const TITLE = 'Feature Videos';
const DESCRIPTION = 'Check out the latest Playwright feature videos';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <VideoCards videos={featureVideos} />
      </main>
    </Layout>
  );
}
