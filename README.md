# Sell Like a Leader — SarvX Group event marketing package

Free virtual sales training for Elias Saracco (SarvX Group), styled to match the SarvX brand from sarvx.io. It includes a video landing page, 22 platform-sized images, a print flyer, a brand kit, and copy for every platform.

**Event facts:** Day 1 live training is free. The Day 2 VIP workshop is $99: attendees join live, ask questions, and bring a real sales issue. Dates are not set yet, so everything says "Dates announced soon."

## What's here
| Path | What it is |
|---|---|
| `index.html` | Landing page: video, topics, two-day format with free and $99 tickets, trainer, owner section, registration form, FAQ, disclaimers. |
| `brand-kit/index.html` + `SarvX-Brand-Kit.pdf` | SarvX brand guidelines: logo, colors, type, voice, and design elements. |
| `brand-kit/logos/` | Official SarvX logo files from sarvx.io, used as supplied (not recolored). |
| `marketing-copy.md` | Eventbrite, Facebook, LinkedIn, Meta ads (EN + ES), flyers, and the video script. |
| `marketing-package.html` | One page with every image and copy-ready text, for handing to the client. |
| `creatives/creative.html` + `render.mjs` | One template covers every image size. `node creatives/render.mjs` rebuilds all PNGs and the flyer PDF. |
| `creatives/png/` | Finished images. |
| `assets/` | Original SarvX logo, favicon, Elias headshot (`elias.jpg`), and the architecture photo. |

## Image sizes
| Platform | File | Size |
|---|---|---|
| Eventbrite | eventbrite-banner | 2160×1080 |
| Facebook | event-cover · feed-portrait · feed-square · story | 1920×1005 · 1080×1350 · 1080×1080 · 1080×1920 |
| LinkedIn | event-cover · profile-banner · feed · square | 1776×444 · 1584×396 · 1200×627 · 1200×1200 |
| Meta ads (A, B, C) | square · feed · story-reels · landscape | 1080×1080 · 1080×1350 · 1080×1920 · 1200×628 |
| Flyer | digital · print letter (PNG + PDF) | 1080×1350 · 8.5×11 in @ 300 dpi |

## When the dates are set
1. **Images:** in `creatives/creative.html`, set `window.EVENT.date` (e.g. `"Nov 12–13, 2026"`), then run `node creatives/render.mjs`.
2. **Landing page:** at the bottom of `index.html`, set `EVENT_DATE_LABEL`. Also set `VSL_EMBED_URL`, and either `FORM_ENDPOINT` or `EVENTBRITE_URL`.
3. **Copy:** in `marketing-copy.md`, replace "dates announced soon" and fill the remaining `[links]`.
4. **Meta Pixel:** paste the base code into `index.html`. The form already fires `CompleteRegistration`.

## Seats left counter
- Caps: 500 general admission, 100 VIP (`SEAT_CAPS` in `index.html`).
- Each form submission adds 1 to a shared online counter (Abacus, `abacus.jasoncameron.dev`, namespace `sarvx-sell-like-a-leader`). The page shows cap minus count, refreshes every 30 seconds, and blocks a ticket at 0.
- Only a number is stored there. No names or emails.
- `counter-admin-keys.txt` holds the reset keys. **Keep it private and don't upload it with the site.** It has the reset command.
- Anyone with basic tech skills could bump the public counter by hand. Registrations from your form tool (GHL/Zapier) are the real source of truth.

## English / Español
- There's an EN/ES toggle in the top bar. Spanish is shown automatically for Spanish-language browsers, and `?lang=es` forces it (useful for Spanish ads).
- Translations are in the `ES` list near the bottom of `index.html`. If you change English text on the page, update its entry there too.

## Live sign-up popups
- When someone registers and leaves "Show my first name and last initial…" checked (it's on by default), visitors see a popup in the corner, e.g. "IRENA B. · Just reserved a free ticket · 2 min ago".
- Only real registrations appear. Nothing is made up, and if nobody has signed up, no popup shows.
- It uses ntfy.sh, a free service with no account. The topic is in `FEED` in `index.html`. Only the first name, last initial, and ticket type are sent, and they're kept for 12 hours.
- To turn the popups off, set `SIGNUP_POPUPS = false` in `index.html`.
