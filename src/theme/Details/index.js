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
import clsx from 'clsx';
import {Details as DetailsGeneric} from '@docusaurus/theme-common/Details';
import styles from './styles.module.css';
// Should we have a custom details/summary comp in Infima instead of reusing
// alert classes?
// Start Playwright changes
const InfimaClasses = 'alert alert--secondary';
// End Playwright changes
export default function Details({...props}) {
  return (
    <DetailsGeneric
      {...props}
      className={clsx(InfimaClasses, styles.details, props.className)}
    />
  );
}
