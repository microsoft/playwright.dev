module.exports = {
  agentCli: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'installation',
        'quick-start',
        'skills',
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
        'commands/navigation',
        'commands/interaction',
        'commands/keyboard-mouse',
        'commands/tabs',
        'commands/dialogs',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Network & Storage',
      items: [
        'commands/network-routing',
        'commands/storage',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Developer Tools',
      items: [
        'commands/console-eval',
        'commands/screenshots-pdf',
        'commands/tracing',
        'commands/test-debugging',
      ],
      collapsed: false,
    },
    'commands/video-recording',
    {
      type: 'category',
      label: 'Sessions',
      items: [
        'sessions',
        'commands/attach',
      ],
      collapsed: false,
    },
    'configuration',
  ],
};
