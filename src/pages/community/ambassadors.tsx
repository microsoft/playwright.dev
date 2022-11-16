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
import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import { ProfileCards } from '@site/src/components/ProfileCard';

import ambassadors from '@site/src/data/ambassadors';
import team from '@site/src/data/team';

const TITLE = 'Ambassadors';
const DESCRIPTION =
  'Our Mission is to build an amazing Playwright community with the help of our ambassadors who are sharing their knowledge and passion for Playwright though live streams, video courses, conference talks and more.';

export default function Video(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg container container">
        <PageHeader title={TITLE} description={DESCRIPTION} />

        <section className="margin-top--lg margin-bottom--lg text--center container">
          <h2>Meet the Ambassadors</h2>
          <p>
            We are more than excited to introduce to you our awesome Playwright
            Ambassadors and hope you enjoy the incredible content they are
            creating.
          </p>
          <ProfileCards people={ambassadors} />
        </section>

        <section className="margin-top--lg margin-bottom--lg text--center container">
          <h2>Join the Program</h2>
          <p>
            If you are creating video content, workshops, courses, conference
            talks and are sharing your knowledge of Playwright with the
            community then reach out to us by DM or through our{' '}
            <Link href="https://aka.ms/playwright-slack">
              Community Slack Channel.
            </Link>
            We would love to hear from you and see the amazing content you are
            creating.
          </p>
          <ProfileCards people={team} />
        </section>
      </main>
    </Layout>
  );
}
