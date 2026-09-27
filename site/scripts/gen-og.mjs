// Regenerate the Open Graph share cards, one per locale.
//   node scripts/gen-og.mjs
//
// Rendered in headless Chromium against the real Outfit webfont so the card
// matches the site's typography exactly; a rasteriser would substitute a
// system font and the brand would drift.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const LOCALES = ['en', 'es', 'de', 'fr'];
const mark = readFileSync(path.join(root, 'public/brand/logo-mark.svg'), 'utf8');

const card = (kicker, h1, muted) => `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#FFFFFF;font-family:'Outfit',sans-serif;
       padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;
       border-bottom:14px solid #A8322A}
  .brand{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;color:#1A1D21}
  .brand svg{width:38px;height:38px}
  .kicker{font-size:25px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#A8322A;margin-bottom:22px}
  h1{font-size:66px;font-weight:600;line-height:1.1;letter-spacing:-0.02em;color:#1A1D21;max-width:16ch}
  h1 span{display:block;color:#7A8089;font-weight:300}
  .foot{font-size:24px;color:#7A8089}
</style></head>
<body>
  <div class="brand">${mark}LucrumTech</div>
  <div>
    <div class="kicker">${kicker}</div>
    <h1>${h1}<span>${muted}</span></h1>
  </div>
  <div class="foot">lucrumtech.com</div>
</body></html>`;

const browser = await chromium.launch({ args: ['--no-sandbox'] });
for (const locale of LOCALES) {
  const c = JSON.parse(readFileSync(path.join(root, `src/content/${locale}/home.json`), 'utf8'));
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(card(c.hero.kicker, c.hero.h1, c.hero.h1Muted), { waitUntil: 'networkidle' });
  await page.waitForTimeout(400); // let the webfont paint
  const out = `public/og-${locale}.png`;
  writeFileSync(path.join(root, out), await page.screenshot({ type: 'png' }));
  console.log('wrote', out);
  await page.close();
}
await browser.close();
