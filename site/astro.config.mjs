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
  integrations: [sitemap()]
});