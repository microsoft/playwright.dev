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
    require.resolve("@docusaurus/plugin-content-blog"),
    {
      showReadingTime: true,
      editUrl:
        "https://github.com/microsoft/playwright.dev/edit/master/v2/blog/",
    },
  ],
  require.resolve("@docusaurus/plugin-content-pages"),
];

if (isProd) {
  plugins.push(require.resolve("@docusaurus/plugin-sitemap"));
}

module.exports = {
  title: "Playwright",
  tagline: "Fast and reliable end-to-end testing for modern web apps",
  // Repo config for GitHub Pages
  url: "https://playwright.dev",
  baseUrl: "/java/",
  organizationName: "microsoft",
  projectName: "playwright.dev",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  scripts: ["/java/js/redirection.js"],
  favicon: "img/playwright-logo.svg",
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java'],
    },
    navbar: {
      title: "Playwright for Java",
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
          label: 'Java',
          position: 'left',
          items: [
            {
              label: 'Java',
              'data-language-prefix': '/java/',
            },
            {
              label: 'Node.js',
              'data-language-prefix': '/',
            },
            {
              label: 'Python',
              'data-language-prefix': '/python/',
            },
            {
              label: '.NET',
              'data-language-prefix': '/dotnet/',
            },
          ],
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
              href: "https://github.com/microsoft/playwright-java",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Microsoft`,
    }
  },
  themes: [
    [
      require.resolve("@docusaurus/theme-classic"),
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
    [
      require.resolve(
        "./third_party/docusaurus-search-local/dist/server/server/index"
      ),
      {
        hashed: true,
        language: ["en", "zh"],
        searchResultLimits: 10,
      },
    ],
  ],
  plugins,
  customFields: {
    repositoryName: "playwright-java",
  },
};
