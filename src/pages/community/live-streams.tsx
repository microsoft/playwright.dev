import React from 'react';
import Layout from '@theme/Layout';
import VideoCards from './_components/VideoCards';
import PageHeader from './_components/PageHeader';

import liveStreams from '@site/src/data/live-streams';

const TITLE = 'Live Streams';
const DESCRIPTION = 'Check out the latest Playwright live streams';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <VideoCards videos={liveStreams} />
      </main>
    </Layout>
  );
}
