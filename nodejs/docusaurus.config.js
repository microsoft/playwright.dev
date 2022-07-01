const path = require("path");
const isProd = process.env.NODE_ENV === "production";

let plugins = [
  [
    require.resolve("@docusaurus/plugin-content-docs"),
    {
      sidebarPath: require.resolve("./sidebars.js"),
    },
  ],
  [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebarCommunity.js'),
      }),
    ],
  [
    require.resolve("@docusaurus/plugin-content-blog"),
    {
      showReadingTime: true,
      editUrl:
        "https://github.com/microsoft/playwright.dev/edit/master/",
    },
  ],
  require.resolve("@docusaurus/plugin-content-pages"),
  require.resolve("./plugins/playwright-analytics-integration/lib/index.js"),
];

if (isProd) {
  plugins.push(require.resolve("@docusaurus/plugin-sitemap"));
}

module.exports = {
  title: "Playwright",
  tagline: "Fast and reliable end-to-end testing for modern web apps",
  // Repo config for GitHub Pages
  url: "https://playwright.dev",
  baseUrl: "/",
  organizationName: "microsoft",
  projectName: "playwright.dev",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  scripts: ["/js/redirection.js"],
  favicon: "img/playwright-logo.svg",
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['bash', 'batch', 'powershell'],
    },
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
          docId: "api/class-playwright",
          label: "API",
          position: "left",
        },
        
        {
          href: "https://github.com/microsoft/playwright",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
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
        {
          label: 'Node.js',
          position: 'left',
          items: [
            {
              label: 'Node.js',
              'data-language-prefix': '/',
              href: '#',
            },
            {
              label: 'Python',
              'data-language-prefix': '/python/',
              href: '#',
            },
            {
              label: 'Java',
              'data-language-prefix': '/java/',
              href: '#',
            },
            {
              label: '.NET',
              'data-language-prefix': '/dotnet/',
              href: '#',
            },
          ],
        },
        {
            to: '/community/welcome',
            label: 'Community',
            position: 'left',
            activeBaseRegex: `/community/`,
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
              to: "docs/api/class-playwright",
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
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg",
            },
            {
              label: "Conference videos",
              href: "/community/conference-videos",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Microsoft`,
    },
    algolia: {
      indexName: 'playwright-nodejs',
      appId: 'K09ICMCV6X',
      apiKey: 'a5b64422711c37ab6a0ce4d86d16cdd9',
    },
  },
  themes: [
    [
      require.resolve("@docusaurus/theme-classic"),
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
    '@docusaurus/theme-search-algolia',
  ],
  plugins,
  customFields: {
    repositoryName: "playwright",
  },
  trailingSlash: false,
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  }
};
