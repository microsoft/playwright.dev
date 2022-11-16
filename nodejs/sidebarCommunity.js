module.exports = {
  community: [
    'welcome',
    {
      type: 'link',
      label: 'Ambassadors',
      href: '/community/ambassadors'
    },

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
        }
      ],
      collapsed: false
    },

    {
      type: 'link',
      label: 'Join our Community Slack',
      href: 'https://aka.ms/playwright-slack'
    }
  ]
};
