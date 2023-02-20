/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import styles from './styles.module.css';

type ProfileProps = {
  id: string;
  title: string;
  thumbnail?: string;
};

function LiteYouTube({ id, title, thumbnail }: ProfileProps) {
  return (
    <div className={styles.videoContainer}>
      <LiteYouTubeEmbed
        thumbnail={thumbnail}
        id={id}
        params="autoplay=1&autohide=1&showinfo=0&rel=0"
        title={title}
        poster="maxresdefault"
        webp
      />
    </div>
  );
}

export default LiteYouTube;
