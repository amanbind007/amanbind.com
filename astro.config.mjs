// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://amanbind.com',
  output: 'static',
  integrations: [react(), mdx(), sitemap()],
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'monokai',
      wrap: true,
    },
  },
});
