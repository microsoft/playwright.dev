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

function LanguageRadioLink({ languagePrefix, name, isCurrent, ...props }) {
  const location = useLocation();

  const newPathname = location.pathname.replace(
    /^(\/(java|dotnet|python))?\/(.*)/,
    "$3"
  );
  let href = languagePrefix + newPathname + location.hash;
  if (
    isMissingInLanguagePort(location.pathname, languagePrefix) &&
    newPathname.startsWith("docs/test-")
  )
    href = languagePrefix + "docs/test-runners";

  const onClick = () => {
    if ("localStorage" in window) {
      if (languagePrefix !== "/")
        localStorage.setItem("previousLanguagePrefix", languagePrefix);
      else localStorage.removeItem("previousLanguagePrefix");
    }
  };
  
  return (
    <a
      href={href}
      target="_self"
      onClick={onClick}
      className={isCurrent ? "current" : undefined}
      {...props}
    >
      {name}
    </a>
  );
}

export default function NavbarItemWrapper(props) {
  const location = useLocation();
  
  const isLanguagePicker = props.value?.includes("language switcher");
  if (isLanguagePicker) {
    const isJava = location.pathname.startsWith("/java/");
    const isPython = location.pathname.startsWith("/python/");
    const isDotnet = location.pathname.startsWith("/dotnet/");
    
    return (
      <div
        className={
          "language-radio" + (props.mobile ? "" : " language-radio-navbar")
        }
        style={{ width: "220px" }}
      >
        <LanguageRadioLink
          languagePrefix="/"
          name="Node.js"
          isCurrent={!(isDotnet || isPython || isJava)}
          style={{ width: "60px" }}
        />
        <LanguageRadioLink
          languagePrefix="/java/"
          name="Java"
          isCurrent={isJava}
          style={{ width: "40px" }}
        />
        <LanguageRadioLink
          languagePrefix="/dotnet/"
          name=".NET"
          isCurrent={isDotnet}
          style={{ width: "40px" }}
        />
        <LanguageRadioLink
          languagePrefix="/python/"
          name="Python"
          isCurrent={isPython}
          style={{ width: "50px" }}
        />
      </div>
    );
  }

  return <NavbarItem {...props} />;
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
