import sharp from 'sharp';

for (const size of [16, 32, 180]) {
  await sharp('public/favicon.svg').resize(size, size).png().toFile(`public/favicon-${size}.png`);
}
