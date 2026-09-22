# LucrumTech website

Astro static site for lucrumtech.com. No CMS — every page is a file you edit directly.

- `site/` — the site. Routes are files under `site/src/pages/`:
  `/` `/services` `/work` `/about` `/contact` `/interim` `/organisation`
  `/privacy` `/privacy/es` `/privacy/de` `/privacy/fr`
- `deploy/nginx-lucrumtech.conf` — the live Nginx server block.
- `lucrumtech-clickable.html` — the original approved design prototype, kept for reference.

## Editing content

Open the `.astro` file for the route and edit the copy. Shared chrome (header, footer, fonts,
colour tokens) is in `site/src/layouts/Layout.astro` and `site/src/styles/global.css`.

Privacy policy text is data, not markup: `site/src/data/privacy.json`, keyed by language. It
was extracted verbatim from the previous site. **The translations are abridged** — English has
10 numbered sections, Spanish/German/French have 5 (they omit Cookies, Data sharing, Data
retention, Children's privacy, and Changes to this policy). Worth completing, and it's legal
text, so it should be written or reviewed by someone qualified rather than machine-translated.

## Local development

```
cd site && npm install && npm run dev      # http://localhost:4321
```

The contact form posts to `/api/website/send-email`, which only exists behind Nginx in
production, so submissions fail locally. Validation and the consent banner work fine.

## Building

```
cd site && npm run build      # -> site/dist/
```

`site/astro.config.mjs` holds `SITE_URL`, which drives canonical URLs, `hreflang` and the
sitemap. `build.format: 'file'` is deliberate: it emits `services.html` rather than
`services/index.html` so each URL maps to one file and Nginx never 301s to add a slash.

## Deploying

The server is an OVH VPS at 57.129.63.250 (`ubuntu@`) that also hosts **formanova.solutions**,
**spainrelocationhub.com**, **SCaAD**, a Mailcow mail stack, Jenkins, Elasticsearch and
PostgreSQL. Be surgical: only ever touch `sites-available/lucrumtech`, and always
`sudo nginx -t` before reloading, or you take down other production sites.

```
cd site && npm run build
rsync -az --delete site/dist/ ubuntu@57.129.63.250:/tmp/lucrumtech-deploy/
ssh ubuntu@57.129.63.250 'sudo rsync -a --delete /tmp/lucrumtech-deploy/ /var/www/lucrumtech/ \
  && sudo chown -R www-data:www-data /var/www/lucrumtech && sudo nginx -t && sudo systemctl reload nginx'
```

Archives of the previous site live in `/var/www/_archive/` on the server.

## Contact form

`POST /api/website/send-email` is **not** part of this repo. It's `email-api.service`, a small
FastAPI app at `/home/ubuntu/email-api` on the server, listening on `127.0.0.1:8001` and
proxied by the Nginx block above. It accepts `multipart/form-data` (`name`, `email`,
`message`, plus optional `company`/`topic`), sends via `mail.formanova.solutions:587` as
`hello@lucrumtech.com`, and delivers to alex.zholtkevych@ and veronika.frontova@lucrumtech.com.

The form's hidden `reference` field is a honeypot — but note it is checked in **browser
JavaScript only**, so it does nothing against a bot posting straight at the endpoint. It's
deliberately *not* called `company`, because that's a real field on the API.

### Abuse protection

In September 2026 a bot posted ~280 submissions directly to `/api/website/send-email` over two
days, all of which became mail. The FastAPI service validates nothing — no rate limit, no
honeypot, no origin check — so the block happens in Nginx:

- `deploy/nginx-formguard.conf` → `/etc/nginx/conf.d/lucrumtech-formguard.conf`. Declares the
  rate-limit zone and the Origin/Referer maps (http-level directives can only live there). It
  is inert until referenced, so the other sites on the box are unaffected.
- The `/api/website/` block in `deploy/nginx-lucrumtech.conf` returns 403 unless the request
  carries an Origin or Referer from lucrumtech.com, and rate-limits to 10/min per IP.

A submission from the site works normally; a direct POST gets 403. If you ever need to call the
endpoint yourself, send `-H "Origin: https://lucrumtech.com"`.

The durable fix, if the bot adapts, is a server-side honeypot check inside the FastAPI app or a
captcha on the form. Neither is in place.

## Analytics and consent

Google Analytics `G-D6B36D4JXM`, carried over from the old site, wired through GA4 Consent
Mode in `site/src/components/Analytics.astro`. Nothing loads until the visitor consents:
`analytics_storage` defaults to `denied` and the gtag script is only injected on accept.

`site/src/components/CookieConsent.astro` is the banner, in all four languages. It reuses the
old site's `lt_cookie_consent` localStorage key, so anyone who already accepted or rejected
carries their choice over and isn't re-prompted. The privacy page's "manage cookies" button
reopens it so consent can be withdrawn.

## Known gaps

- No custom 404 page — unknown paths get Nginx's default. The old site never 404'd (the SPA
  returned the homepage for everything), so this is new.
- ES/DE/FR privacy translations are abridged (see above).
- The restored policy says LucrumTech is "headquartered in Berlin, Germany"; the new site copy
  says "distributed across the EU and Canada". One of the two is out of date.
- Site is English-only; the old one had full ES/DE/FR. Only the privacy policy is translated.
