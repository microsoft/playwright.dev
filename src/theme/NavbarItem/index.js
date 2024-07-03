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

// @ts-check
import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import { useLocation } from '@docusaurus/router';

const missingSites = calculateMissingSites(require('../../../nodejs/sidebars').docs, {
  'python': require('../../../python/sidebars').docs,
  'dotnet': require('../../../dotnet/sidebars').docs,
  'java': require('../../../java/sidebars').docs,
});

function flatSidebar(sidebar, result = []) {
  for (const item of sidebar) {
    if (item.type === 'category') {
      flatSidebar(item.items, result);
    } else {
      result.push(item.id);
    }
  }
  return result;
}

/**
 * @param {object} baseSidebar
 * @param {object} sidebars
 * @returns {string[]}
 */
function calculateMissingSites(baseSidebar, sidebars) {
  const missing = [];
  const baseItems = flatSidebar(baseSidebar);
  for (const [language, sidebar] of Object.entries(sidebars)) {
    const items = flatSidebar(sidebar);
    for (const item of baseItems) {
      if (!items.includes(item))
        missing.push(`/${language}/docs/${item}`);
    }
  }
  return missing;
}

export default function NavbarItemWrapper(props) {
  const location = useLocation();
  const languagePrefix = props['data-language-prefix'];
  const propsOverrides = {};
  if (languagePrefix) {
    // Rewrite the new link
    const newPathname = location.pathname.replace(/^(\/(java|dotnet|python))?\/(.*)/, '$3');
    propsOverrides.href = "pathname://" + languagePrefix + newPathname + location.hash;
    if (isMissingInLanguagePort(location.pathname, languagePrefix) && newPathname.startsWith('docs/test-'))
      propsOverrides.href = "pathname://" + languagePrefix + 'docs/test-runners';
    propsOverrides.autoAddBaseUrl = false
    propsOverrides.target = '_self';

    // Detect if the link is active
    const languagesInSubfolders = ['java', 'dotnet', 'python'];
    const currentLanguageIsInSubfolder = languagesInSubfolders.some(l => location.pathname.startsWith(`/${l}`));
    if (location.pathname.startsWith(languagePrefix) && currentLanguageIsInSubfolder && languagePrefix.length > 1 || languagePrefix.length === 1 && !currentLanguageIsInSubfolder) {
      propsOverrides.className += ` ${props.activeClassName}`;
    }
    propsOverrides.skipExternalLinkCheck = true;
    propsOverrides.onClick = (e) => {
      if ('localStorage' in window) {
        if (languagePrefix !== '/')
          localStorage.setItem('previousLanguagePrefix', languagePrefix);
        else
          localStorage.removeItem('previousLanguagePrefix');
      }
      if (props.onClick)
        props.onClick(e);
    }
  }
  return (
    <>
      <NavbarItem {...props} {...propsOverrides} />
    </>
  );
}

/**
 * @param {string} location
 * @param {string} linkPathPrefix
 * @returns {boolean}
 */
function isMissingInLanguagePort(location, linkPathPrefix) {
  const languagePort = linkPathPrefix.replace(/\//g, '');
  if (!languagePort)
    return false;
  return missingSites.includes('/' + languagePort + location.replace(/^(\/(java|dotnet|python))?(\/.*)/, '$3').replace(/(.*)\.html$/, '$1'));
}
