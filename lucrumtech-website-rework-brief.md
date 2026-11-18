# LucrumTech — Website Rework Brief

**Date:** 18 November 2026
**Site:** lucrumtech.com (EN / ES / DE / FR)
**Purpose:** restructure the site around four business verticals, add a Security section, and close four outstanding defects while every page is being touched.

---

## 0. How to use this document

This is a build brief for whoever implements the change, including an AI coding agent.

Read sections 1 to 4 before changing anything. Section 7 lists the items that are **blocked on Alex** — do not invent values for those, leave the placeholder and flag it.

**Do not rewrite existing approved copy.** The hero, the problem section, the "two weeks" ladder and the team section have been through several rounds of review. Move them, re-title the pages that hold them, but do not improve the wording unless this brief says to.

### Before changing anything

Survey the repository first: framework, routing, how the four languages are organised, where content lives, and how the site is deployed. This brief describes the target structure, not the implementation. Where the brief and the repository disagree about how something currently works, trust the repository and say so.

Work on a branch. Do not deploy without review.

### Order of work

The brief is organised by topic, not by sequence. Build it in two phases.

**Phase 1 — nothing is blocked, start here.**

| Section | Task |
|---|---|
| 2 | Navigation restructure, 8 items down to 7 |
| 3.1 | Homepage three-door block |
| 3.2 | Merge `/ai` into `/product` |
| 3.3 | Merge `/organisation` into `/interim` |
| 4 | Redirects, all four languages |
| 5.2 | hreflang tags — highest value item in the brief |
| 5.4 | Organization schema |

Phase 1 is a complete, shippable piece of work. It needs nothing from section 7.

**Phase 2 — blocked until the inputs in section 7 arrive.**

| Section | Waiting on |
|---|---|
| 5.1 Booking | 7.1 calendar link |
| 3.4 Security page | 7.2 price, 7.4 standards, 7.5 naming |
| 5.3 Case studies | 7.3 client facts |
| 3.7 Tree-Wave page | 7.6 test results |

Do not create a placeholder page for Security or Tree-Wave in Phase 1. An empty page in the navigation is worse than no page. Add each one when its content is ready.

---

## 1. What is changing and why

LucrumTech now sells four lines of business:

| # | Vertical | Sold through |
|---|---|---|
| 1 | Consulting and product ownership (includes AI services, outstaffing, white-label builds) | Website |
| 2 | Products (Tree-Wave Plus, RepairLeaf, Gentle Guardian) | Relationships and introductions |
| 3 | Interim leadership | Website |
| 4 | Security and IT infrastructure | Website |

The current navigation does not reflect this. It has eight items, three of which serve vertical 1, two serve vertical 3, and two verticals have no page at all.

**Key decision: vertical 2 does not go in the main navigation.** Tree-Wave Plus is sold to banks and payment companies through warm introductions, not search. The consumer products will eventually need their own domains. Products get a page reachable from About and the footer, and nothing more.

The site is therefore built for **three** sellable verticals.

---

## 2. Target structure

### Navigation (7 items, in this order)

```
Home · Product · Interim · Security · Work · About · Contact
```

Down from eight items, while carrying three verticals instead of two.

Keep the "Home" item. It was added deliberately because a meaningful share of visitors do not know that a logo is clickable.

### Page mapping

| Current page | Becomes | Action |
|---|---|---|
| `/` | `/` | Revised — see 3.1 |
| `/services` | `/product` | Renamed, absorbs `/ai` |
| `/ai` | section within `/product` | Merged, then redirected |
| `/organisation` | section within `/interim` | Merged, then redirected |
| `/interim` | `/interim` | Absorbs `/organisation` |
| — | `/security` | **New** — see 3.4 |
| `/work` | `/work` | Unchanged structurally |
| `/about` | `/about` | Gains a link to the products page |
| `/contact` | `/contact` | Booking fixed — see 5.1 |
| — | `/tree-wave` | **New**, not in main nav — see 3.7 |

All of this applies to all four languages.

---

## 3. Page by page

### 3.1 Home

Keep the existing hero unchanged. Product ownership stays the headline: it is the vertical that earns, and it is the idea that explains the other two.

**Change:** replace the single interim panel below the hero with a three-door block.

```
Build it.    You need a product built and nobody owns whether it works.      → /product
Fix it.      Delivery has stalled, or the organisation cannot keep up.       → /interim
Secure it.   You need to know what an attacker would find before they do.    → /security
```

One sentence each, one link each. A visitor should be able to identify their own situation within a couple of seconds.

Everything below the doors stays as it is: the problem section, the two-week ladder, the proof section, the team section, the closing call to action.

**Keep the connecting line visible somewhere on the page.** The three verticals hold together because someone comes in and owns the thing until it works. Without that thread, three offers read as an agency that does everything.

### 3.2 Product (`/product`, was `/services`)

Absorbs the whole of `/ai` as a section within the page.

Section order:

1. Hero — what product ownership means
2. Product strategy
3. Engineering
4. **AI services** — the three named pillars: automation, transformation, optimisation (moved from `/ai`)
5. Technical leadership
6. Outstaffing and team extension — see note below
7. How we charge
8. Call to action

**Note on outstaffing.** This is a real revenue line and it is currently invisible on the site. It belongs here, described plainly: senior and mid-level engineers working as part of the client's team, with LucrumTech accountable for the work. Keep it below the ownership sections so it reads as an option rather than the main offer.

### 3.3 Interim (`/interim`)

Absorbs `/organisation` as a section within the page.

Section order:

1. Hero — some transitions a team cannot run on its own
2. The three situations: broken, stuck, scaling into enterprise
3. The diagnosis principle
4. The two-week diagnostic and what happens after it
5. **Organisation and people** — Alina's content, moved from `/organisation`
6. Who comes in — the five named people
7. Call to action

### 3.4 Security (`/security`) — new page

Source material exists: a draft written by Veronika from Volodymyr's material. Use it as the base, with the changes below.

**Section order:**

1. Hero — Protect your business, secure your technology
2. The problem, in two or three lines
3. **The entry offer** — two-week security assessment at a fixed fee, with a prioritised risk report the client keeps. [PRICE BLOCKED — see 7.2]
4. **Information and cybersecurity** — penetration testing and vulnerability assessment, security policies and procedures, monitoring and incident response, critical infrastructure protection, software product security, risk management
5. **IT infrastructure** — IT consulting and audits, network architecture and optimisation, cloud infrastructure management, support and maintenance, patching
6. Team credentials — see content rules
7. One proof point — see 7.3
8. Call to action

**Content rules for this page:**

- **Remove the data and business automation section entirely.** Power BI dashboards, data integration and process automation are the AI services offer on `/product`. Leaving them on the security page makes two pages compete. Link across instead.
- **Name the standards.** Replace "relevant international standards" with the specific ones the team has actually delivered against. North American buyers search for SOC 2, ISO 27001, PCI DSS and HIPAA. [WHICH ONES — BLOCKED, see 7.4]
- **Remove the public sector and legislative framework material from this page.** Writing national security legislation is a genuine credential but it raises questions on a Canadian site, since government work usually requires local residency or clearance. Keep it for targeted outreach in the EU, Middle East and Ukraine.
- **Do not promise 24/7 support.** Unless staffing for it is confirmed, write "extended-hours support by arrangement".
- **Describe the team accurately.** This is a partner company, not LucrumTech staff. Phrase it as "our security practice, delivered with our partner [NAME]" or similar. [NAMING DECISION BLOCKED — see 7.5]

### 3.5 Work (`/work`)

Structurally unchanged. Content fix in 5.3.

Add one security engagement here once it is cleared for publication.

### 3.6 About (`/about`)

Unchanged, except: add a link to the products page (3.7) in the body, and in the footer.

### 3.7 Tree-Wave Plus (`/tree-wave`) — new page, not in main nav

Reachable from About and the footer only.

**Content rules — these matter more than the layout:**

- Write it entirely in **outcomes**, never architecture. Faster settlement, fewer stuck transactions, fewer declines.
- **No topology.** No diagram of how routing works, no description of trees per payment type, no mention of the microservices layer. This is a hard constraint, not a style preference.
- Written in plain language a C-level executive reads once and understands.
- The page answers three questions only: what problem it removes, what it is measured to do, and who to contact.
- Target reader: banks, payment companies, high-volume merchants.

[TEST RESULTS BLOCKED — see 7.6]

---

## 4. Redirects

Set permanent (301) redirects so existing links and indexed pages do not break:

```
/services      → /product
/ai            → /product#ai
/organisation  → /interim#organisation
```

Apply the same for `/es`, `/de` and `/fr`.

---

## 5. Defects to fix during the rework

These four are outstanding from the previous review. The rework touches every page, so fix them now rather than afterwards.

### 5.1 The booking button does not book

On `/contact` the submit button reads "Book a strategy call" and sends a message. The promise and the behaviour do not match, at the exact moment a visitor decides to act.

**Fix:** embed the Google Calendar appointment schedule page, with the message form kept below it as a second option for people not ready to book. [LINK BLOCKED — see 7.1]

The form itself should be three fields only: Name, Email, Message.

### 5.2 Four languages, no hreflang

The site serves EN, ES, DE and FR with no `hreflang` annotations anywhere. Google reads them as near-duplicate pages and chooses one. Three of the four locales are earning nothing in search.

**Fix:** reciprocal `hreflang` tags on every page in every language, plus `x-default`. Example for the English home page:

```html
<link rel="alternate" hreflang="en" href="https://lucrumtech.com/" />
<link rel="alternate" hreflang="es" href="https://lucrumtech.com/es/" />
<link rel="alternate" hreflang="de" href="https://lucrumtech.com/de/" />
<link rel="alternate" hreflang="fr" href="https://lucrumtech.com/fr/" />
<link rel="alternate" hreflang="x-default" href="https://lucrumtech.com/" />
```

Every page must list every language version including itself. Add the new pages to the sitemap.

### 5.3 Case studies have no outcomes

AMOS appears on the homepage with no result attached to it. InHelper has "days to hours" and nothing else.

Each case study needs four things: sector and rough size, how long the engagement ran, one hard number, and whether the client can be named. [FACTS BLOCKED — see 7.3]

Structure for each:

```
The situation.   [Sector and size.] What was broken before.
What we owned.   Scope, architecture through delivery. Engagement length.
What changed.    The outcome, with one number in it.
```

### 5.4 No Organization schema

Add JSON-LD `Organization` markup with name, URL, logo, contact point and postal address.

Business address for this purpose: **6666 Thorold Stone Road, Niagara Falls, L2J 1B3, Canada**. Confirm before publishing whether the full street address goes public or city and region only.

---

## 6. SEO pages (optional, second phase)

Only build these once sections 2 to 5 are complete. Five highest-intent phrases, all pointing at `/interim`:

1. interim CTO
2. fractional CTO
3. interim head of product
4. technical due diligence
5. engineering team turnaround

Validate search volume in a keyword tool before building anything.

**Do not optimise for "product ownership as a service".** The category was invented by LucrumTech, so nobody searches for it. Keep it as positioning on the page, not as a search target.

---

## 7. Blocked on Alex

Nothing in this list can be invented by whoever builds the site. Leave a visible placeholder and flag each one.

| # | Item | Needed for |
|---|---|---|
| 7.1 | Google Calendar appointment schedule link | 5.1 booking |
| 7.2 | Price for the two-week security assessment | 3.4 security entry offer |
| 7.3 | Case study facts: sector, size, duration, one number, naming permission — for InHelper and AMOS. AMOS first, it has no outcome at all. Plus one security engagement, if John permits DSRT to be described | 3.5, 5.3 |
| 7.4 | Which security standards the team has actually delivered against (SOC 2, ISO 27001, PCI DSS, HIPAA, others) | 3.4 |
| 7.5 | Whether the security partner company can be named publicly, and whether the technical leader can be named. Written permission needed from him before his name or titles appear | 3.4 |
| 7.6 | Tree-Wave Plus test results that are cleared for publication | 3.7 |
| 7.7 | Full street address or city and region only | 5.4 |

---

## 8. Not a website task, but it blocks selling security

Before the first direct security engagement — not before the page goes live, but before money changes hands:

- Professional indemnity and cyber insurance that covers security testing
- A rules-of-engagement document and signed client authorisation for every test
- A subcontract with the partner company that passes liability through to them
- A clear answer on offshore access, since some clients will not permit anyone outside Canada or the US into their systems

Penetration testing means entering client systems with permission. As a sole proprietor, Alex personally carries that risk. This warrants a conversation with a lawyer.

---

## 9. Rules for whoever builds this

1. **Do not rewrite approved copy.** Move it, re-title the page around it, leave the words alone.
2. **Do not invent numbers.** Every figure on the site must trace to something real. If a number is missing, leave the placeholder visible.
3. **One product figure, used everywhere.** The hero currently says 30+ products for Alex's career and 6 shipped as LucrumTech. Keep that split, and keep both figures identical on every page and in every document.
4. **Do not add a 24/7 claim, a client logo, or a testimonial** that has not been confirmed.
5. **Keep the existing colour tokens and typography.** Brand colours are the logo's red and light grey on white or black. This is a restructure, not a redesign.
6. **Every change applies to all four languages.**
7. **Check that nothing drops out of the sitemap** when pages are renamed.
