/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
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

import React, { type ReactNode } from 'react';
import webView from './webView.module.css';
import styles from './styles.module.css';

type ProfileProps = {
  children: ReactNode[];
};

const HTMLCard = ({ children }: ProfileProps) => {
  return <div className={styles.card}>
    <div className={styles.header}>
      <div style={{ whiteSpace: 'nowrap' }}>
        <span className={styles.dot} style={{ backgroundColor: 'rgb(242, 95, 88)' }}></span>
        <span className={styles.dot} style={{ backgroundColor: 'rgb(251, 190, 60)' }}></span>
        <span className={styles.dot} style={{ backgroundColor: 'rgb(88, 203, 66)' }}></span>
      </div>
      <div className={styles.addressBar}>http://localhost:3000</div>
      <div style={{ marginLeft: 'auto' }}>
        <div>
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
        </div>
      </div>
    </div>
    <div className={styles.body}>
      <div className={`html-card-page ${styles.pageSide} ${webView.webView}`}>{children[0]}</div>
      <div className={`html-card-code ${styles.codeSide}`}>{children[1]}</div>
    </div>
  </div>;
}

export default HTMLCard;
