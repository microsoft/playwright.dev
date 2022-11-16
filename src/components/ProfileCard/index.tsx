import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type Person = {
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

type ProfileProps = {
  className?: string;
  person: Person;
};

function ProfileCard({ person, className }: ProfileProps) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={
                person.githubUrl ? `${person.githubUrl}.png` : person.imageUrl
              }
              alt={`${person.name}'s avatar`}
            />
          </div>
          <div className={styles.intro}>
            <span className={styles.name}>{person.name}</span>
            <p className={styles.city}>{person.city}</p>
            <p className={styles.country}>{person.country}</p>
            <p className={styles.languages}>{person.languages}</p>
          </div>
        </div>
        <div className={styles.socialLinks}>
          {person.githubUrl && (
            <a className="header-github-link" href={person.githubUrl}></a>
          )}
          {person.twitterUrl && (
            <a className={styles.twitterLink} href={person.twitterUrl}></a>
          )}
          {person.websiteUrl && (
            <a className={styles.websiteLink} href={person.websiteUrl}></a>
          )}
          {person.linkedInUrl && (
            <a className={styles.linkedInLink} href={person.linkedInUrl}></a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProfileCards({ people }): JSX.Element {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container">
        <ul className={styles.cards}>
          {people.map((person) => (
            <ProfileCard key={person.name} person={person} />
          ))}
        </ul>
      </div>
    </section>
  );
}
