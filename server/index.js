import express from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const PORT = process.env.PORT || 4310;
const MAIL_TO = process.env.MAIL_TO || 'hello@lucrumtech.com';
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// Simple in-memory sliding-window rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_HITS;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function wantsJson(req) {
  return req.is('application/json') || (req.get('accept') || '').includes('application/json');
}

app.post('/api/contact', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
  const asJson = wantsJson(req);
  const fail = (status, message) =>
    asJson ? res.status(status).json({ error: message }) : res.redirect(303, '/contact?error=1');

  if (rateLimited(ip)) return fail(429, 'Too many requests. Try again later.');

  const { name, email, message, company } = req.body || {};

  // Honeypot: real visitors never fill this in. Pretend success, send nothing.
  if (typeof company === 'string' && company.trim() !== '') {
    return asJson ? res.json({ ok: true }) : res.redirect(303, '/contact?sent=1');
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email.trim()) ||
    typeof message !== 'string' || !message.trim()
  ) {
    return fail(400, 'Add your name, a valid email and a message.');
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return fail(400, 'That submission is too long.');
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email.trim(),
      subject: `New site enquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });
  } catch (err) {
    console.error('contact form send failed:', err);
    return fail(502, 'Could not send that right now — try again shortly.');
  }

  return asJson ? res.json({ ok: true }) : res.redirect(303, '/contact?sent=1');
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`contact-form service listening on :${PORT}`);
});
