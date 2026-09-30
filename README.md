# مزارِ قائد کراچی

A bilingual (Urdu + English) visitor guide for Muhammad Ali Jinnah Mausoleum (Mazar-e-Quaid), built with Astro, Tailwind CSS, TypeScript, and the Cloudflare Worker adapter. Urdu is served at `/` and English at `/en/`, linked by `hreflang` (ur / en / x-default).

## Development

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

## Site URL

Set `PUBLIC_SITE_URL` in the build environment when a production domain is selected. `astro.config.mjs` is the only source of truth for the URL. With no value, the site still builds; canonical and Open Graph URLs fall back to relative paths, and sitemap generation is disabled.

## Cloudflare Worker

```bash
PUBLIC_SITE_URL=https://你的正式域名 pnpm deploy
```

`wrangler.jsonc` points Cloudflare to Astro's generated Worker entry and static assets.

## Image credits

The public-domain or Creative Commons photo credits are shown in the page footer/source section. Images are stored locally in `public/images/` so the page does not depend on remote image hosts.
