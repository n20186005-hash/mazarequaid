import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.PUBLIC_SITE_URL?.trim() || undefined;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  adapter: cloudflare(),
  integrations: siteUrl ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
