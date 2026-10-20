import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://howellwang04.github.io',
  // Old addresses: About is the home page now, and the CV lives at /resume.
  redirects: {
    '/about': '/',
    '/cv': '/resume'
  },
  vite: {
    define: {
      'import.meta.env.PUBLIC_BUILD_ID': JSON.stringify(process.env.GITHUB_SHA ?? String(Date.now()))
    }
  },
  integrations: [sitemap(), tailwind()]
});
