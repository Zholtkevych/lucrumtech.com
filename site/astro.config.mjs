// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// TODO: confirm this is the live domain before the first deploy — it drives
// canonical URLs and the generated sitemap.
const SITE_URL = 'https://lucrumtech.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  // 'file' emits services.html rather than services/index.html, so each URL maps
  // to exactly one file and Nginx never has to redirect to add a trailing slash.
  build: { format: 'file' },
  integrations: [sitemap()]
});