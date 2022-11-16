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
import Layout from '@theme/Layout';
import VideoCards from '@site/src/components/VideoCards';
import PageHeader from '@site/src/components/PageHeader';

import releaseVideos from '@site/src/data/release-videos';

const TITLE = 'Release Videos';
const DESCRIPTION = 'Check out the latest Playwright release videos';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader title={TITLE} description={DESCRIPTION} />
        <VideoCards videos={releaseVideos} />
      </main>
    </Layout>
  );
}
