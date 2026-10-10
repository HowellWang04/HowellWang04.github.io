import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://howellwang04.github.io',
  vite: {
    define: {
      'import.meta.env.PUBLIC_BUILD_ID': JSON.stringify(process.env.GITHUB_SHA ?? String(Date.now()))
    }
  },
  integrations: [sitemap(), tailwind()]
});
