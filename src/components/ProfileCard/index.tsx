import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type ProfileProps = {
  className?: string;
  name: string;
  city: string;
  country: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
};

function ProfileCard({
  className,
  name,
  city,
  country,
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
            <span className={styles.name}>{name}</span>
            <div className={styles.location}>
            <p className={styles.city}>{city}</p>
            <p className={styles.country}>{country}</p>
            </div>
          </div>
        </div>
        <div className={styles.socialLinks}>
          {githubUrl && <a className='header-github-link' href={githubUrl}></a>}
          {twitterUrl && <a className={styles.twitterLink} href={twitterUrl}></a>}
          {websiteUrl && <a className={styles.websiteLink} href={websiteUrl}></a>}
          {linkedInUrl && <a className={styles.linkedInLink} href={linkedInUrl}></a>}
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
        city='Palma de Mallorca'
        country='Spain'
        githubUrl='https://github.com/debs-obrien'
        twitterUrl='https://twitter.com/debs_obrien'
        linkedInUrl='https://www.linkedin.com/in/debbie-o-brien-1a199975/'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Max Schmitt'
        city='Berlin'
        country='Germany'
        githubUrl='https://github.com/mxschmitt'
        twitterUrl='https://twitter.com/maxibanki'
        linkedInUrl='https://www.linkedin.com/in/max-schmitt/'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Ross Wollman'
        city='San Francisco'
        country='USA'
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
        name='Andrew Knight'
        city='North Carolina'
        country='USA'
        githubUrl='https://github.com/AutomationPanda'
        twitterUrl='https://twitter.com/AutomationPanda'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Carlos Gauto'
        city='Berazategui'
        country='Argentina'
        githubUrl='https://github.com/charlyautomatiza'
        twitterUrl='https://twitter.com/char_automatiza'
        websiteUrl='https://linktr.ee/charlyautomatiza'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Giovanni Rago'
        city='Berlin'
        country='Germany'
        imageUrl='https://media-exp1.licdn.com/dms/image/C4E03AQHNkQmEbZBVqA/profile-displayphoto-shrink_400_400/0/1517375686271?e=1664409600&v=beta&t=r7M2zqvKeA6Ogd_mHbq2-0YFZfNGGVBQtZK3b9tpFEw'
        twitterUrl='https://twitter.com/rag0g'
        websiteUrl='https://www.youtube.com/c/AutomateTogether'
      ></ProfileCardCol>
      <ProfileCardCol
        name='John Hill'
        city='Palo Alto'
        country='USA'
        githubUrl='https://github.com/unlikelyzero'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Katrik K. K'
        city='Auckland'
        country='New Zealand'
        imageUrl='https://media-exp1.licdn.com/dms/image/C5603AQFvGgrfen7F9Q/profile-displayphoto-shrink_400_400/0/1629605742823?e=1664409600&v=beta&t=yZx1w3KMdPxznERLrH1Rg7cRlNVuomVHzklnR9cMcVU'
        linkedInUrl='https://www.linkedin.com/in/karthikkk/'
      ></ProfileCardCol>
      

      <ProfileCardCol
        name='Stefan Judis'
        city='Berlin'
        country='Germany'
        githubUrl='https://github.com/stefanjudis'
        twitterUrl='https://twitter.com/stefanjudis'
        websiteUrl='https://www.stefanjudis.com'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Tally Barak'
        city='Tel Aviv'
        country='Israel'
        githubUrl='https://github.com/Tallyb'
        twitterUrl='https://twitter.com/TallyBarak'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Are you next?'
        city='Berlin'
        country='Germany'
        githubUrl='https://github.com/stefanjudis'
        twitterUrl='https://twitter.com/stefanjudis'
        websiteUrl='https://www.stefanjudis.com'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Tally Barak'
        city='Tel Aviv'
        country='Israel'
        githubUrl='https://github.com/Tallyb'
        twitterUrl='https://twitter.com/TallyBarak'
      ></ProfileCardCol>
      <ProfileCardCol
        name='Are you the next Ambassador?'
        city=''
        country=''
        imageUrl='https://playwright.dev/img/playwright-logo.svg'
      ></ProfileCardCol>
    </div>
  );
}
