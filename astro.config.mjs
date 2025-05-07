import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import Icons from 'astro-icon';

export default defineConfig({
  integrations: [react(), Icons()],
  compressHTML: true,
});