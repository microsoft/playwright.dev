import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export type ProfileProps = {
  className?: string;
  children?: string;
};

export default function ProfileCards({
  children
}: ProfileProps) {
  return (
      <div className={styles.cards}>
          {children}
      </div>
  );
}
