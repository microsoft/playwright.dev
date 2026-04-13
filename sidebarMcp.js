module.exports = {
  mcp: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'installation',
        {
          type: 'category',
          label: 'Client Setup',
          items: [
            'clients/vscode',
            'clients/cursor',
            'clients/claude-code',
            'clients/claude-desktop',
            'clients/windsurf',
            'clients/other-clients',
          ],
          collapsed: true,
        },
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'snapshots',
        'capabilities',
        'vision-mode',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Browser Automation',
      items: [
        'tools/navigation',
        'tools/interaction',
        'tools/forms',
        'tools/keyboard-mouse',
        'tools/tabs',
        'tools/dialogs',
        'tools/waiting',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Network & Storage',
      items: [
        'tools/network-mocking',
        'tools/storage',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Developer Tools',
      items: [
        'tools/console',
        'tools/screenshots',
        'tools/code-execution',
        'tools/tracing',
        'tools/assertions',
        'tools/pdf',
      ],
      collapsed: false,
    },
    'tools/video',
    {
      type: 'category',
      label: 'Sessions',
      items: [
        'configuration/user-profile',
        'configuration/browser-extension',
      ],
      collapsed: false,
    },
    'configuration/options',
  ],
};
