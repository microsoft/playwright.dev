import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export type ProfileProps = {
  className?: string;
  name: string;
  city: string;
  country: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
  languages?: string;
};

export default function Profile({
  className,
  name,
  githubUrl,
  twitterUrl,
  imageUrl
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="avatar avatar--vertical">
        <img
          className="avatar__photo avatar__photo--md"
          src={twitterUrl ? `${twitterUrl}.png` : imageUrl}
          alt={`${name}'s avatar`}
        />
      </div>
      <div className={styles.intro}>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
}
