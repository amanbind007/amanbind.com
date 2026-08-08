// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://amanbind.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Inline tiny assets so the theme bootstrap never causes a flash.
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: {
      theme: 'monokai',
      wrap: true,
    },
  },
});
