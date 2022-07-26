import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type ProfileProps = {
  className?: string;
  name: string;
  location: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
};

function ProfileCard({
  className,
  name,
  location,
  githubUrl,
  twitterUrl,
  websiteUrl,
  linkedInUrl,
  imageUrl
}: ProfileProps) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className='avatar avatar--vertical'>
            <img
              className='avatar__photo avatar__photo--xl'
              src={githubUrl ? `${githubUrl}.png` : imageUrl}
              alt={`${name}'s avatar`}
            />
          </div>
          <div className={styles.intro}>
            <h3 className={styles.name}>{name}</h3>
            <h3 className={styles.location}>{location}</h3>
          </div>
        </div>
        <div className={styles.socialLinks}>
          {githubUrl && <a className='header-github-link' href={githubUrl}></a>}
          {twitterUrl && <a className='twitter-link' href={twitterUrl}></a>}
          {websiteUrl && <a className='website-link' href={websiteUrl}></a>}
          {linkedInUrl && <a className='linkedIn-link' href={linkedInUrl}></a>}
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
        linkedInUrl='https://www.linkedin.com/in/debbie-o-brien-1a199975/'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Max Schmitt'
        location='Berlin, Germany'
        githubUrl='https://github.com/mxschmitt'
        twitterUrl='https://twitter.com/maxibanki'
        linkedInUrl='https://www.linkedin.com/in/max-schmitt/'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Ross Wollman'
        location='San Francisco, USA'
        githubUrl='https://github.com/rwoll'
        twitterUrl='https://twitter.com/rwoll_dev'
        linkedInUrl='https://www.linkedin.com/in/rwoll/'
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
        websiteUrl='https://linktr.ee/charlyautomatiza'
      ></ProfileCardCol>
      <ProfileCardCol
        name='John Hill'
        location='California, USA'
        githubUrl='https://github.com/unlikelyzero'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Katrik KK'
        location='Auckland, New Zealand'
        imageUrl='https://media-exp1.licdn.com/dms/image/C5603AQFvGgrfen7F9Q/profile-displayphoto-shrink_400_400/0/1629605742823?e=1664409600&v=beta&t=yZx1w3KMdPxznERLrH1Rg7cRlNVuomVHzklnR9cMcVU'
        linkedInUrl='https://www.linkedin.com/in/karthikkk/'
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
        websiteUrl='https://www.stefanjudis.com'
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
