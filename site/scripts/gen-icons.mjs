// Regenerate favicon rasters from public/brand/logo-mark.svg.
// Run with: node scripts/gen-icons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const svg = readFileSync(path.join(root, 'public/brand/logo-mark.svg'), 'utf8');

const targets = [
  { file: 'public/favicon-16.png', size: 16 },
  { file: 'public/favicon-32.png', size: 32 },
  { file: 'public/favicon-48.png', size: 48 },
  { file: 'public/apple-touch-icon.png', size: 180, padded: true },
];

const buffers = {};
for (const t of targets) {
  const density = t.padded ? 72 * (t.size / 64) * 0.72 : 72 * (t.size / 64);
  const png = await sharp(Buffer.from(svg), { density }).resize(t.size, t.size, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  }).png().toBuffer();
  writeFileSync(path.join(root, t.file), png);
  buffers[t.size] = png;
  console.log('wrote', t.file);
}

const ico = await pngToIco([buffers[16], buffers[32], buffers[48]]);
writeFileSync(path.join(root, 'public/favicon.ico'), ico);
console.log('wrote public/favicon.ico');

writeFileSync(path.join(root, 'public/favicon.svg'), svg);
console.log('wrote public/favicon.svg');
