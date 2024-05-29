module.exports = {
  community: [
    'welcome',
    'ambassadors',
    {
      type: 'category',
      label: 'Videos',
      items: [
        {
          type: 'link',
          label: 'Conference Videos',
          href: '/community/conference-videos'
        },
        {
          type: 'link',
          label: 'Release Videos',
          href: '/community/release-videos'
        },
        {
          type: 'link',
          label: 'Live Streams',
          href: '/community/live-streams'
        },
        {
          type: 'link',
          label: 'Feature Videos',
          href: '/community/feature-videos'
        },
        {
          type: 'link',
          label: 'Learn Videos',
          href: '/community/learn-videos'
        }
      ],
      collapsed: false
    },
    {
      type: 'link',
      label: "Learn Playwright",
      href: "https://learn.microsoft.com/en-us/training/modules/build-with-playwright/",
    },
    {
      type: 'link',
      label: "Blog",
      href: "https://dev.to/playwright",
    },

    {
      type: 'link',
      label: 'Join our Community Discord',
      href: 'https://aka.ms/playwright/discord'
    }
  ]
};
