import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

async function ensureDir(path) {
  await mkdir(dirname(path), { recursive: true });
}

async function renderPng(size, destination, fit = 'contain') {
  await ensureDir(destination);
  await sharp('public/favicon.svg', { density: 384 })
    .resize(size, size, { fit, background: { r: 23, g: 71, b: 62, alpha: 1 } })
    .png()
    .toFile(destination);
}

for (const size of [16, 32, 180]) {
  await renderPng(size, `public/favicon-${size}.png`);
}

// PWA / Android / iOS splash icons
await renderPng(192, 'public/icons/icon-192.png');
await renderPng(512, 'public/icons/icon-512.png');
await renderPng(192, 'public/icons/maskable-192.png', 'cover');
await renderPng(512, 'public/icons/maskable-512.png', 'cover');

// Apple touch icon (already generated as 180, but keep a dedicated PWA copy too)
await renderPng(180, 'public/icons/apple-touch-icon.png');