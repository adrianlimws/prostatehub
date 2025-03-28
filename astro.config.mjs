// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  server: {host: true, port: 3000 },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify()
});