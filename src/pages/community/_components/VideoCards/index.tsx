import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function VideoCards({ videos }) {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container">
        <ul className={clsx('clean-list', styles.videoList)}>
          {videos.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function VideoCard({ video }) {
  return (
    <li key={video.title} className="card shadow--md">
      <div className={styles.videoCardVideo}>
        {video.id ? (
          <iframe
            width="560"
            height="315"
            src={'https://www.youtube-nocookie.com/embed/' + video.id}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={styles.videoCardIframe}
          ></iframe>
        ) : (
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <img src={video.src} alt={video.title} />
          </a>
        )}
      </div>
      <div className="card__body">
        {video.conference ? (
          <div className={styles.videoCardHeader}>
            <h4 className={styles.videoCardTitle}>{video.conference}</h4>
          </div>
        ) : null}

        {video.version ? (
          <div className={styles.videoCardHeader}>
            <Link
              href={`/docs/release-notes#version-${video.version.replace(
                '.',
                ''
              )}`}
            >
              <h4 className={styles.videoCardTitle}>
                Playwright v{video.version}
              </h4>
            </Link>
          </div>
        ) : null}

        {video.title ? (
          <p className={styles.videoCardBody}>{video.title}</p>
        ) : null}

        {video.conference ? <ConferenceTags video={video} /> : null}

        <div className={styles.videoCardHighlights}>
          {video.highlights ? <VideoHighlights video={video} /> : null}
        </div>
      </div>
    </li>
  );
}

function ConferenceTags({ video }) {
  return (
    <div className={styles.videoCardTags}>
      {video.year ? <span>{video.year}</span> : null}
      {video.language ? <span>{video.language}</span> : null}
    </div>
  );
}

function VideoHighlights({ video }) {
  return (
    <div className={styles.videoCardHighlights}>
      {video.highlights
        ? video.highlights.map((highlight) => (
            <span key={highlight}>{highlight} &nbsp;</span>
          ))
        : null}
    </div>
  );
}

export default VideoCards;
