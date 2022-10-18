module.exports = {
  community: [
    'welcome',
    'ambassadors',
    {
      type: 'category',
      label: 'Videos',
      items: [
        'conference-videos',
        'live-streams',
        'feature-videos',
        'release-videos'
      ],
      collapsed: false
    },
    {
      type: 'link',
      label: 'Case Studies',
      href: '/case-studies',
    },
    {
      type: 'link',
      label: 'Join our Community Slack',
      href: 'https://aka.ms/playwright-slack'
    }
  ]
};
