#!/usr/bin/env node
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function toWebp(input, output, { maxWidth, quality = 76 } = {}) {
  let pipeline = sharp(input);
  if (maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { fit: 'inside', withoutEnlargement: true });
  }
  const { data, info } = await pipeline.webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
  writeFileSync(output, data);
  const before = statSync(input).size;
  console.log(
    `${output.replace(root + '/', '')}: ${Math.round(before / 1024)}KB -> ${Math.round(info.size / 1024)}KB (${info.width}x${info.height})`
  );
}

// App screenshots: source PNGs are 414x900; emit WebP at that size for all locales.
for (const locale of ['RU', 'EN', 'DE']) {
  const dir = join(root, 'images_for_web', locale);
  for (const base of ['main_1', 'main_2', 'Discovery', 'Lab']) {
    await toWebp(join(dir, `${base}.png`), join(dir, `${base}.webp`), { maxWidth: 828, quality: 76 });
  }
}

// Blog images: cap width near 2x of typical article column (~370–480 CSS px).
const blogDir = join(root, 'assets', 'blog');
for (const name of readdirSync(blogDir)) {
  if (!/\.webp$/i.test(name)) continue;
  const path = join(blogDir, name);
  await toWebp(path, path, { maxWidth: 960, quality: 78 });
}
