import React from 'react';
import Layout from '@theme/Layout';
import VideoCards from './_components/VideoCards';
import PageHeader from './_components/PageHeader';

import releaseVideos from '@site/src/data/release-videos';

const TITLE = 'Release Videos';
const DESCRIPTION = 'Check out the latest Playwright release videos';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <VideoCards videos={releaseVideos} />
      </main>
    </Layout>
  );
}
