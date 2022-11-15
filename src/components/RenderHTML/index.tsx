import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

type ProfileProps = {
  children: ReactNode;
};

function RenderHTML({ children }: ProfileProps) {
  return <div className={styles.renderHTML}>{children}</div>;
}

export default RenderHTML;
