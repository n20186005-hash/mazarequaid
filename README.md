# Mazar-e-Quaid independent guide

Urdu `/` and English `/en/` remain Astro server-rendered routes on Cloudflare. This is a nonprofit tourism and cultural information guide, unaffiliated with QMMB or government.

Use the pinned package manager and normal `pnpm install --frozen-lockfile`, then `pnpm check` and `pnpm build`. The production origin defaults to the existing `https://mazarequaid.com`; the existing www entrance is normalized by the Worker. No new custom domains or bindings are declared.

`wrangler deploy` follows Astro’s generated deployment configuration, built from `wrangler.jsonc` and the source Worker. Current hours and admission fees must be confirmed with QMMB, not inferred from Maps or old photographs. Photo provenance and derivative licence are documented in IMAGE-SOURCES.md and visibly beside the image.
