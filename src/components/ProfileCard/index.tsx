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
import styles from './styles.module.css';

type Person = {
  name: string;
  city: string;
  country: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  imageUrl: string;
  languages?: string;
};

type ProfileProps = {
  person: Person;
};

function ProfileCard({ person }: ProfileProps) {
  return (
    <li>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={
                `../img/ambassadors/${person.imageUrl}`
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
            <a className="header-github-link" href={person.githubUrl} aria-label='GitHub'></a>
          )}
          {person.twitterUrl && (
            <a className={styles.twitterLink} href={person.twitterUrl} aria-label='Twitter'></a>
          )}
          {person.websiteUrl && (
            <a className={styles.websiteLink} href={person.websiteUrl} aria-label="Website"></a>
          )}
          {person.linkedInUrl && (
            <a className={styles.linkedInLink} href={person.linkedInUrl} aria-label="LinkedIn"></a>
          )}
        </div>
      </div>
    </li>
  );
}

export function ProfileCards({ people }): React.ReactElement {
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
