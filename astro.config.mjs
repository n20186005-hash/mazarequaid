import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.PUBLIC_SITE_URL?.trim() || 'https://mazarequaid.com';

export default defineConfig({
  site: siteUrl,
  output: 'server',
  adapter: cloudflare({ configPath: "./wrangler.jsonc" }),
  integrations: siteUrl
    ? [sitemap({ customPages:[siteUrl+'/',siteUrl+'/en/'], filter:url=>!/\/404(?:\/|\.html)?$/.test(new URL(url).pathname), i18n: { defaultLocale: 'ur', locales: { ur: 'ur-PK', en: 'en' } } })]
    : [],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
