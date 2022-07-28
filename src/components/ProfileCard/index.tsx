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
  languages?: string;
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
  imageUrl,
  languages
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
            <p className={styles.city}>{city}</p>
            <p className={styles.country}>{country}</p>
            <p className={styles.languages}>{languages}</p>

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


export function Team(): JSX.Element {
  return (
    <div className={styles.cards}>
      <ProfileCard
        name="Debbie O'Brien"
        city='Palma de Mallorca'
        country='Spain'
        languages="English, Spanish"
        githubUrl='https://github.com/debs-obrien'
        twitterUrl='https://twitter.com/debs_obrien'
        linkedInUrl='https://www.linkedin.com/in/debbie-o-brien-1a199975/'
      ></ProfileCard>
      <ProfileCard
        name='Max Schmitt'
        languages="German, English"
        city='Berlin'
        country='Germany'
        githubUrl='https://github.com/mxschmitt'
        twitterUrl='https://twitter.com/maxibanki'
        linkedInUrl='https://www.linkedin.com/in/max-schmitt/'
      ></ProfileCard>
      <ProfileCard
        name='Ross Wollman'
        languages="English"
        city='San Francisco'
        country='USA'
        githubUrl='https://github.com/rwoll'
        twitterUrl='https://twitter.com/rwoll_dev'
        linkedInUrl='https://www.linkedin.com/in/rwoll/'
      ></ProfileCard>
    </div>
  );
}

export function Ambassadors(): JSX.Element {
  return (
    <div className={styles.cards}>
      <ProfileCard
        name='Andrew Knight'
        languages="English"
        city='North Carolina'
        country='USA'
        githubUrl='https://github.com/AutomationPanda'
        twitterUrl='https://twitter.com/AutomationPanda'
      ></ProfileCard>
      <ProfileCard
        name='Carlos Gauto'
        city='Berazategui'
        languages="Spanish, English"
        country='Argentina'
        githubUrl='https://github.com/charlyautomatiza'
        twitterUrl='https://twitter.com/char_automatiza'
        websiteUrl='https://linktr.ee/charlyautomatiza'
      ></ProfileCard>
      <ProfileCard
        name='Giovanni Rago'
        languages="Italian, English"
        city='Berlin'
        country='Germany'
        imageUrl='https://media-exp1.licdn.com/dms/image/C4E03AQHNkQmEbZBVqA/profile-displayphoto-shrink_400_400/0/1517375686271?e=1664409600&v=beta&t=r7M2zqvKeA6Ogd_mHbq2-0YFZfNGGVBQtZK3b9tpFEw'
        twitterUrl='https://twitter.com/rag0g'
        websiteUrl='https://www.youtube.com/c/AutomateTogether'
      ></ProfileCard>
      <ProfileCard
        name='John Hill'
        languages="English"
        city='Palo Alto'
        country='USA'
        githubUrl='https://github.com/unlikelyzero'
        linkedInUrl='https://www.linkedin.com/in/linkedjohnhill'
      ></ProfileCard>
      <ProfileCard
        name='Katrik K. K'
        languages="English"
        city='Auckland'
        country='New Zealand'
        imageUrl='https://media-exp1.licdn.com/dms/image/C5603AQFvGgrfen7F9Q/profile-displayphoto-shrink_400_400/0/1629605742823?e=1664409600&v=beta&t=yZx1w3KMdPxznERLrH1Rg7cRlNVuomVHzklnR9cMcVU'
        linkedInUrl='https://www.linkedin.com/in/karthikkk/'
      ></ProfileCard>
      <ProfileCard
        name='Stefan Judis'
        languages="English"
        city='Berlin'
        country='Germany'
        githubUrl='https://github.com/stefanjudis'
        twitterUrl='https://twitter.com/stefanjudis'
        websiteUrl='https://www.stefanjudis.com'
      ></ProfileCard>
      <ProfileCard
        name='Tally Barak'
        languages="Hebrew, English"
        city='Tel Aviv'
        country='Israel'
        githubUrl='https://github.com/Tallyb'
        twitterUrl='https://twitter.com/TallyBarak'
      ></ProfileCard>
      <a href="#join-the-program">
      <ProfileCard
        name='Are you the next Ambassador?'
        city=''
        country=''
        imageUrl='https://playwright.dev/img/playwright-logo.svg'
      ></ProfileCard>
      </a>
    </div>
  );
}
