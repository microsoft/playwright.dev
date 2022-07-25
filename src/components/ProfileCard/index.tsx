import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type ProfileProps = {
  className?: string;
  name: string;
  location: string;
  githubUrl: string;
  twitterUrl?: string;
};

function ProfileCard({
  className,
  name,
  location,
  githubUrl,
  twitterUrl
}: ProfileProps) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <div className='avatar avatar--vertical'>
          <img
            className='avatar__photo avatar__photo--xl'
            src={`${githubUrl}.png`}
            alt={`${name}'s avatar`}
          />
          <div className={styles.intro}>
            <h3 className={styles.name}>{name}</h3>
            <h3 className={styles.location}>{location}</h3>
          </div>
        </div>
        <div className={styles.socialLinks}>
          {githubUrl && <a className='header-github-link' href={githubUrl}></a>}
          {twitterUrl && <a className='twitter-link' href={twitterUrl}></a>}
        </div>
      </div>
    </div>
  );
}

function ProfileCardCol(props: ProfileProps) {
  return <ProfileCard {...props} className='col col--3 margin-bottom--lg' />;
}

export function Team(): JSX.Element {
  return (
    <div className='row'>
      <ProfileCardCol
        name="Debbie O'Brien"
        location='Mallorca, Spain'
        githubUrl='https://github.com/debs-obrien'
        twitterUrl='https://twitter.com/debs_obrien'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Max Schmitt'
        location='Berlin, Germany'
        githubUrl='https://github.com/mxschmitt'
        twitterUrl='https://twitter.com/maxibanki'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Ross Wollman'
        location='San Francisco, USA'
        githubUrl='https://github.com/rwoll'
        twitterUrl='https://twitter.com/rwoll_dev'
      ></ProfileCardCol>
    </div>
  );
}

export function Ambassadors(): JSX.Element {
  return (
    <div className='row'>
      <ProfileCardCol
        name='Carlos Gauto'
        location='Berazategui, Argentina'
        githubUrl='https://github.com/charlyautomatiza'
        twitterUrl='https://twitter.com/char_automatiza'
      ></ProfileCardCol>
      <ProfileCardCol
        name='John Hill'
        location='California, USA'
        githubUrl='https://github.com/unlikelyzero'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Katrik KK'
        location='Auckland, New Zealand'
        githubUrl='https://github.com/executeautomation'
        twitterUrl='https://twitter.com/ExecuteAuto'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Pandy Knight'
        location='North Carolina, USA'
        githubUrl='https://github.com/AutomationPanda'
        twitterUrl='https://twitter.com/AutomationPanda'
      ></ProfileCardCol>

      <ProfileCardCol
        name='Stefan Judis'
        location='Berlin, Germany'
        githubUrl='https://github.com/stefanjudis'
        twitterUrl='https://twitter.com/stefanjudis'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Tally Barak'
        location='Tel Aviv, Israel'
        githubUrl='https://github.com/Tallyb'
        twitterUrl='https://twitter.com/TallyBarak'
      ></ProfileCardCol>
    </div>
  );
}
