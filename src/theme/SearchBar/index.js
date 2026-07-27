/**
 * Wraps the standard SearchBar to label search results from the MCP and
 * Agent CLI doc sections. These sections mirror each other's page structure,
 * and the Algolia crawler derives the result group header (hierarchy.lvl0)
 * from the active sidebar category, so their results are otherwise
 * indistinguishable, e.g. "Network & Storage" -> "MCP › Network & Storage".
 * See https://github.com/microsoft/playwright/issues/42006.
 *
 * Passing transformItems replaces the default one, which rewrites absolute
 * Algolia URLs to site-relative ones, so this transform does both.
 */
import React, {useCallback} from 'react';
import SearchBar from '@theme-original/SearchBar';
import {useSearchResultUrlProcessor} from '@docusaurus/theme-search-algolia/client';

const searchResultSections = [
  {pathname: '/mcp/', label: 'MCP'},
  {pathname: '/agent-cli/', label: 'CLI'},
];

function sectionLabelForUrl(url) {
  try {
    const {pathname} = new URL(url, 'https://playwright.dev');
    return searchResultSections.find((section) =>
      pathname.startsWith(section.pathname),
    )?.label;
  } catch {
    return undefined;
  }
}

function labelHierarchyLvl0(value, label) {
  if (!value) {
    return label;
  }
  // Highlighted values wrap matched words in markup and the group header
  // strips it, so compare against the plain text.
  const plainText = value.replace(/<[^>]*>/g, '');
  if (plainText === label || plainText.startsWith(`${label} › `)) {
    return value;
  }
  return `${label} › ${value}`;
}

function addSectionToSearchResult(item) {
  const label = sectionLabelForUrl(item.url);
  if (!label) {
    return item;
  }
  const result = {
    ...item,
    hierarchy: {
      ...item.hierarchy,
      lvl0: labelHierarchyLvl0(item.hierarchy?.lvl0, label),
    },
  };
  // The group header prefers the highlighted/snippeted lvl0 when present.
  for (const propName of ['_highlightResult', '_snippetResult']) {
    const lvl0 = item[propName]?.hierarchy?.lvl0;
    if (lvl0?.value) {
      result[propName] = {
        ...item[propName],
        hierarchy: {
          ...item[propName].hierarchy,
          lvl0: {...lvl0, value: labelHierarchyLvl0(lvl0.value, label)},
        },
      };
    }
  }
  return result;
}

export default function SearchBarWrapper(props) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const transformItems = useCallback(
    (items) =>
      items.map((item) => ({
        ...addSectionToSearchResult(item),
        url: processSearchResultUrl(item.url),
      })),
    [processSearchResultUrl],
  );
  return <SearchBar {...props} transformItems={transformItems} />;
}
