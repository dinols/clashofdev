// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    alpinejs(),
    icon({
      iconDir: 'public/icons',
    }),
  ],
});
