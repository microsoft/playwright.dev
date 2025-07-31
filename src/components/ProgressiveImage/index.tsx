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
import Image from '@theme/IdealImageLegacy';

function shouldAutoDownload() {
  return true;
}

// This is duplicated from plugin-ideal-image in order to always enable automatic download
// image prop is injected by the plugin-ideal-image Webpack plugin
function ProgressiveImage({ image: { preSrc, src } }) {
  return (
    <Image
      placeholder={{ lqip: preSrc }}
      height={src.height ?? 100}
      width={src.width ?? 100}
      src={src.src}
      srcSet={src.images.map((image) => ({
        ...image,
        src: image.path,
      }))}
      shouldAutoDownload={shouldAutoDownload}
    />
  );
}

export default ProgressiveImage;
