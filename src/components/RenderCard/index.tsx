import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type ProfileProps = {
  children: ReactNode;
};

function RenderCard({ children }: ProfileProps) {
  return <div className={styles.renderCodeblock}>{children}</div>;
}

export default RenderCard;
