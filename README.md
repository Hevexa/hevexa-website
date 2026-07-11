# hevexa.net

Marketing/company site for Hevexa LLC. Static HTML/CSS, no build step.

## Structure

- `index.html` — homepage (product, contact)
- `about.html` — company/about page
- `styles.css` — shared stylesheet
- `STYLE_GUIDE.md` — design system reference (colors, type, components) —
  read this before making visual changes, to keep things consistent
- `logo.svg` — Hevexa mark, also used as favicon
- `braid-icon.png` — real Braid App Store icon, used in the product card
- `404.html` — not-found page
- `robots.txt`, `sitemap.xml` — SEO basics

## Deploy

No build step required — this is deployable as-is to any static host.

**Cloudflare Pages** (matches the Braid app's existing stack):

```
npx wrangler pages deploy . --project-name=hevexa-net
```

Then point `hevexa.net` DNS at the Pages project in the Cloudflare dashboard.

## To edit

- Contact details (address/phone/email) live in `index.html` under `#contact`,
  in the footer, and in the JSON-LD `Organization` block in `<head>`. Keep
  all three in sync if they change.
- Swap `logo.svg` for a different logo file if needed — it's referenced from
  `index.html`, `404.html`, and as the favicon.
