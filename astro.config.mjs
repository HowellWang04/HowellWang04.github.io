import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://guanhao.me',
  // Old addresses: About is the home page now, the CV lives at /resume, and Projects became Portfolio.
  redirects: {
    '/about': '/',
    '/cv': '/resume',
    '/projects': '/portfolio'
  },
  vite: {
    define: {
      'import.meta.env.PUBLIC_BUILD_ID': JSON.stringify(process.env.GITHUB_SHA ?? String(Date.now()))
    }
  },
  integrations: [sitemap(), tailwind()]
});
