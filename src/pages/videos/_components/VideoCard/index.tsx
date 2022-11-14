import React from 'react';
import styles from './styles.module.css';

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
        <div className={styles.videoCardHeader}>
          <h4 className={styles.videoCardTitle}>{video.conference}</h4>
        </div>
        <p className={styles.videoCardBody}>{video.title}</p>
        <div className={styles.videoCardTags}>
          <span>{video.year}</span>
          <span>{video.language}</span>
        </div>
      </div>
    </li>
  );
}

export default React.memo(VideoCard);
