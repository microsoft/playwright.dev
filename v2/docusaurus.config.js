const path = require('path');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  title: "Playwright",
  tagline: "Fast and reliable end-to-end testing for modern web apps",
  // Repo config for GitHub Pages
  url: "https://playwright.dev",
  baseUrl: "/",
  organizationName: "microsoft",
  projectName: "playwright.dev",
  onBrokenLinks: "log",
  scripts: ["js/redirection.js"],
  favicon: "img/playwright-logo.svg",
  themeConfig: {
    navbar: {
      title: "Playwright",
      logo: {
        alt: "Playwright logo",
        src: "img/playwright-logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          label: "Docs",
          position: "left",
        },
        {
          type: "doc",
          docId: "api/playwright-module",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/microsoft/playwright",
          label: "GitHub",
          position: "right",
        },
        {
          type: "docsVersionDropdown",
          position: "left",
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting started",
              to: "docs/intro",
            },
            {
              label: "API reference",
              to: "docs/api/playwright-module",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/playwright",
            },
            {
              label: "Slack",
              href: "https://aka.ms/playwright-slack",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/playwrightweb",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/microsoft/playwright",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Microsoft`,
    },
    algolia: {
      apiKey: "c85f496c6eea71808027d42111ac550c",
      indexName: "playwright",
      // Disabling contextual search to ensure search works even if the
      // latest version is not indexed (there seems to be >24h delay).
      // contextualSearch: true,
    },
  },
  themes: [
    [
      require.resolve("@docusaurus/theme-classic"),
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
    path.resolve(__dirname, './plugins/docusaurus-theme-search-algolia')
  ],
  plugins: [
    [
      require.resolve("@docusaurus/plugin-content-docs"),
      {
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/microsoft/playwright/edit/master/docs/",
      },
    ],
    [
      require.resolve("@docusaurus/plugin-content-blog"),
      {
        showReadingTime: true,
        editUrl:
          "https://github.com/microsoft/playwright.dev/edit/master/v2/blog/",
      },
    ],
    [require.resolve("@docusaurus/plugin-content-pages"), {}],
    isProd && [require.resolve("@docusaurus/plugin-sitemap"), {}],
  ],
};
