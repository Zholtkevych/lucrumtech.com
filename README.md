# LucrumTech website

- `site/` — the public site. Astro, static output. Routes are files under `site/src/pages/`:
  `/` `/services` `/work` `/about` `/contact` `/interim` `/organisation`.
- `server/` — the contact-form backend. Small Express service, sends mail via SMTP, nothing else.
- `deploy/` — example Nginx config and systemd unit for the VPS.
- `lucrumtech-clickable.html` — the original approved design prototype. Kept for reference; not part of the build.

## Editing content

Each page is a plain `.astro` file — HTML with a bit of templating, no CMS. Open the file for
the route you want to change and edit the copy directly. Shared chrome (header, footer, fonts,
colour tokens) lives in `site/src/layouts/Layout.astro` and `site/src/styles/global.css`.

## Local development

```
cd site && npm install && npm run dev      # site at http://localhost:4321
cd server && npm install && npm start      # backend at http://localhost:4310
```

Requests to `/api/contact` on the Astro dev server won't reach the backend on their own — that
proxying only happens via the Nginx config in production. To test the form locally end to end,
either run the backend on the same port your dev proxy expects, or just `curl` the backend
directly at `http://localhost:4310/api/contact`.

## Building

```
cd site && npm run build      # outputs static HTML/CSS/JS to site/dist/
```

`site/astro.config.mjs` has a `SITE_URL` constant used for canonical links and the sitemap —
confirm it matches your real domain before the first deploy.

## Deploying to the VPS

1. Copy `site/dist/` to the webroot Nginx will serve (the example config uses
   `/var/www/lucrumtech.com/dist`).
2. Copy `server/` (minus `node_modules`) to the VPS, e.g. `/var/www/lucrumtech.com/server`, then
   on the VPS: `npm install --omit=dev`.
3. Copy `server/.env.example` to `server/.env` on the VPS and fill in real SMTP credentials —
   never commit `.env`.
4. Install the systemd unit: copy `deploy/lucrumtech-contact.service` to
   `/etc/systemd/system/`, then `systemctl daemon-reload && systemctl enable --now
   lucrumtech-contact`.
5. Add the Nginx server block from `deploy/nginx.conf.example` (adjust paths/domain), then
   `nginx -t && systemctl reload nginx`.

After that, redeploying a content change is just: rebuild `site/`, re-copy `dist/` to the
webroot, reload Nginx if you changed the config (you usually haven't). The backend only needs
restarting if you change `server/` code or `.env`.

## Contact form

`POST /api/contact` accepts `{ name, email, message }` (JSON or form-encoded), validates them,
and emails the submission to `MAIL_TO` (defaults to hello@lucrumtech.com) via the SMTP
credentials in `.env`. It has a honeypot field (`company`, hidden in the UI) and a basic
per-IP rate limit (5 submissions / 10 minutes) — no captcha, since this isn't public-internet
scale traffic.

## Logo / favicon assets

The nav mark and all favicon files are generated from `site/public/brand/logo-mark.svg`. To
regenerate the PNG/ICO sizes after changing that source file: `cd site && npm run gen:icons`.
