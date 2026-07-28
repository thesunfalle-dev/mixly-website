#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'css/manifest.json'), 'utf8'));
const chunks = manifest.files.map((file) => {
  const source = readFileSync(resolve(root, 'css', file), 'utf8');
  return source
    .split('\n')
    .filter((line) => !(line.startsWith('/* ===') && line.includes('===')))
    .join('\n');
});
const built = chunks.join('').replace(/\n+$/, '\n');
writeFileSync(resolve(root, 'styles.css'), built);
console.log(`built styles.css from ${manifest.files.length} modules (${built.length} bytes)`);
