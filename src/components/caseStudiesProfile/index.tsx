import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export type ProfileLayoutProps = {
  className?: string;
  children?: string;
};

export function ProfileLayout({
  children
}: ProfileLayoutProps) {
  return (
      <div className="avatar margin-bottom--sm">
          {children}
      </div>
  );
}


export type ProfileProps = {
  className?: string;
  name: string;
  githubUrl?: string;
  twitterUrl?: string;
  imageUrl?: string;
  languages?: string;
  description?: string;
};

export function Profile({
  className,
  name,
  githubUrl,
  twitterUrl,
  imageUrl,
  description
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="avatar avatar--vertical">
        <img
          className="avatar__photo avatar__photo--md"
          src={githubUrl ? `${githubUrl}.png` : imageUrl}
          alt={`${name}'s avatar`}
        />
        <div className="avatar__intro"><div className="avatar__name"><a href={twitterUrl} target="_blank" rel="noopener noreferrer"><span>{name}</span></a></div><small className="avatar__subtitle" >{description}</small></div>
      </div>
      
      
    </div>
  );
}