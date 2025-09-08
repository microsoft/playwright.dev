import prismLight from './src/config/prismLight'
import prismDark from './src/config/prismDark'

import type {Config} from '@docusaurus/types';
import path from "path";
const isProd = process.env.NODE_ENV === "production";

const hasStableVersion = require(path.join(__dirname, 'python/versions.json')).includes('stable');

let plugins = [
  [
    require.resolve("@docusaurus/plugin-content-docs"),
    {
      sidebarPath: require.resolve("./sidebars.js"),
      // Docusaurus crashes if we don't have a stable version and run docusaurus commands.
      // This is a workaround to make it work since during roll we temporarily remove the stable version.
      ...(hasStableVersion ? {
        versions: {
          stable: {
            badge: false,
          }
        }
      } : {}),
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
    'content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id: 'ai',
      path: 'ai',
      routeBasePath: 'ai',
      sidebarPath: require.resolve('./sidebarAI.js'),
    }),
  ],
  require.resolve("@docusaurus/plugin-content-pages"),
    [
    require.resolve('@docusaurus/plugin-ideal-image'),
    {
      max: 1024,
      min: 640,
      steps: 4,
      disableInDev: false
    }
  ],
];

if (isProd) {
  plugins.push(require.resolve("@docusaurus/plugin-sitemap"));
}

export default {
  title: "Playwright Python",
  tagline: "Fast and reliable end-to-end testing for modern web apps",
  // Repo config for GitHub Pages
  url: "https://playwright.dev",
  baseUrl: "/python/",
  organizationName: "microsoft",
  projectName: "playwright.dev",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  scripts: ["/python/js/redirection.js"],
  favicon: "img/playwright-logo.ico",
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismLight,
      darkTheme: prismDark,
      additionalLanguages: ['python', 'bash', 'batch', 'powershell'],
    },
    navbar: {
      title: "Playwright for Python",
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
          href: "https://github.com/microsoft/playwright-python",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://aka.ms/playwright/discord",
          position: "right",
          className: "header-discord-link",
          "aria-label": "Discord server",
        },
        {
          label: 'Python',
          position: 'left',
          items: [
            {
              label: 'Python',
              'data-language-prefix': '/python/',
              href: '#',
            },
            {
              label: 'Node.js',
              'data-language-prefix': '/',
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
          to: '/agents',
          label: 'Agents',
          position: 'left',
          activeBaseRegex: `/agents/`,
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
          title: "Learn",
          items: [
            {
              label: "Getting started",
              to: "docs/intro",
            },
            {
              label: "Playwright Training",
              href: "https://learn.microsoft.com/en-us/training/modules/build-with-playwright/",
            },
            {
              label: "Learn Videos",
              to: "/community/learn-videos",
            },
            {
              label: "Feature Videos",
              to: "/community/feature-videos",
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
              label: "Discord",
              href: "https://aka.ms/playwright/discord",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/playwrightweb",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/playwrightweb",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/microsoft/playwright-python",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg",
            },
            {
              label: "Blog",
              href: "https://dev.to/playwright",
            },
            {
              label: "Ambassadors",
              href: "/community/ambassadors",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Microsoft`,
    },
    algolia: {
      indexName: 'playwright-python',
      appId: 'K09ICMCV6X',
      apiKey: 'a5b64422711c37ab6a0ce4d86d16cdd9',
    },
    image: 'https://repository-images.githubusercontent.com/221981891/8c5c6942-c91f-4df1-825f-4cf474056bd7',
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
    repositoryName: "playwright-python",
  },
  trailingSlash: false,
  future: {
    experimental_faster: true,
    v4: true,
  },
} satisfies Config;
