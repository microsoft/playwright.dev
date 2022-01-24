import path from 'path';
import type {
  LoadContext,
  Plugin,
} from '@docusaurus/types';

export default function pluginGoogleAnalytics(
  context: LoadContext,
): Plugin {
  const isProd = process.env.NODE_ENV === 'production' || process.env.DEV_PIXEL_INTEGRATION;

  return {
    name: 'docusaurus-playwright-analytics',
    getClientModules() {
      return isProd ? [path.resolve(__dirname, './analytics')] : [];
    },
  };
}
