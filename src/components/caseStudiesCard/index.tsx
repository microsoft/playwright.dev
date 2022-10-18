import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ProfileProps = {
  className?: string;
  logo: string;
  name: string;
  description: string;
  url: string;
  children?: string;
};

export function CaseStudiesCard({
  logo,
  name,
  description,
  url
}: ProfileProps) {
  return (
    <Link href={`/case-studies/${url}`}>
      <article className={styles.article}>
        <div className={styles.logo}>
          <img src={logo} alt={name} />
        </div>
        <div className={styles.CardBody}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.readMore} >Read {name}'s Case Study</div>
        </div>
      </article>
    </Link>
  );
}

export function CaseStudiesCards({ children }): JSX.Element {
  return <div className={styles.cards}>{children}</div>;
}
