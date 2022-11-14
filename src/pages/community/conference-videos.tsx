import React from 'react';
import Layout from '@theme/Layout';
import VideoCards from './_components/VideoCards';
import PageHeader from './_components/PageHeader';

import conferenceVideos from '@site/src/data/conference-videos';

const TITLE = 'Conference Videos';
const DESCRIPTION = 'Check out the latest conference videos about Playwright';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <VideoCards videos={conferenceVideos} />
      </main>
    </Layout>
  );
}
