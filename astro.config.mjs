// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output : 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify(),

  devToolbar : { 
    enabled : false
  },

  server : {
    host : true
  },

  site : 'https://skl-budget.netlify.app',
  integrations: [react()]
});