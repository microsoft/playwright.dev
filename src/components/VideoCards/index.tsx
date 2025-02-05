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

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import LiteYouTube from '@site/src/components/LiteYouTube';
import styles from './styles.module.css';
import { Video } from '@site/src/data/types';

function VideoCards({ videos }: { videos: Video[] }) {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container">
        <ul className={clsx('clean-list', styles.videoList)}>
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function videoToReleasePageAnchor(video: Video) {
  const versions = video.version.split(' & ');
  return `version-${versions[versions.length - 1].replace('.', '')}`;
}

function VideoCard({ video }: { video: Video }) {
  return (
    <li key={video.title} className="card shadow--md">
      <div className={styles.videoCardVideo}>
        {video.id ? (
          <LiteYouTube
          id={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
      />
          
        ) : (
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <img src={video.src} alt={video.title} />
          </a>
        )}
      </div>
      <div className="card__body">
        {video.conference || video.host ? (
          <div className={styles.videoCardHeader}>
            <h4 className={styles.videoCardTitle}>
              {video.conference || video.host}
            </h4>
            {video.year ? <span>{video.year}</span> : null}
          </div>
        ) : null}

        {video.version ? (
          <div className={styles.videoCardHeader}>
            <Link
              href={`/docs/release-notes#${videoToReleasePageAnchor(video)}`}
            >
              <h4 className={styles.videoCardTitle}>
                Playwright v{video.version}
              </h4>
            </Link>
          </div>
        ) : null}

        {video.title ? (
          <p className={styles.videoCardTitle}>{video.title}</p>
        ) : null}
      </div>
      <div className="card__footer">
        {video.speakers ? <Speakers video={video} /> : null}
        {video.highlights ? (
          <div className={styles.videoCardHighlights}>
            {<VideoHighlights video={video} />}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function Speakers({ video }) {
  return (
    <div className={styles.videoCardTags}>
      <div>
        {video.speakers
          ? video.speakers.map((speaker) => (
              <span className={styles.speaker}>{speaker} &nbsp;</span>
            ))
          : null}
      </div>
      {video.language ? (
        <span className={styles.language}>{video.language}</span>
      ) : null}
    </div>
  );
}

function VideoHighlights({ video }) {
  return (
    <div className={styles.videoCardHighlights}>
      {video.highlights
        ? video.highlights.map((highlight) => (
            <span key={highlight} className={styles.tag}>
              {highlight} &nbsp;
            </span>
          ))
        : null}
    </div>
  );
}

export default VideoCards;
