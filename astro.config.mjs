// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  build: {
    format: "file",
  },
  integrations: [vue(), pagefind()],
  server: {host: true, port: 3000 },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify()
});