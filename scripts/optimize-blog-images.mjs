#!/usr/bin/env node
import { statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'assets/blog/kak-pravilno-smeshivat-tabak-hero.webp',
  'assets/blog/kak-pravilno-smeshivat-tabak-pairings.webp',
  'assets/blog/kak-pravilno-smeshivat-tabak-proportions.webp',
];

for (const relative of files) {
  const input = resolve(root, relative);
  const output = input.replace(/\.png$/i, '.webp');
  await sharp(input).webp({ quality: 78, effort: 5 }).toFile(output);
  const before = statSync(input).size;
  const after = statSync(output).size;
  console.log(
    `${relative}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB webp`
  );
}
