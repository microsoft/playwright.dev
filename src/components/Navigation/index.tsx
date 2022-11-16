import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function Navigation({ links }) {
  return (
    <nav className="container">
      <ul className={styles.nav}>
        {links.map((link) => (
          <li className={styles.links}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
