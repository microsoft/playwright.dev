import React from 'react';
import clsx from 'clsx';

import Layout from '@theme/Layout';

import VideoCard from './_components/VideoCard';
import conferenceVideos from '@site/src/data/conference-videos';

import styles from './styles.module.css';

const TITLE = 'Conference Videos';
const DESCRIPTION = 'Check out the latest conference videos about Playwright';

function VideoHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

function VideoCards() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container">
        <ul className={clsx('clean-list', styles.videoList)}>
          {conferenceVideos.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <VideoHeader />
        <VideoCards />
      </main>
    </Layout>
  );
}
