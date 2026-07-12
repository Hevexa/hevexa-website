# hevexa.net

Marketing/company site for Hevexa LLC. Static HTML/CSS, no build step.

## Structure

- `index.html` — homepage (product, contact)
- `about.html` — company/about page
- `privacy.html` — hevexa.net's own privacy policy (covers the website;
  Braid's app has a separate policy at braid.hevexa.net/privacy)
- `styles.css` — shared stylesheet
- `STYLE_GUIDE.md` — design system reference (colors, type, components) —
  read this before making visual changes, to keep things consistent
- `logo.svg` — Hevexa mark, also used as favicon
- `braid-icon.png` — real Braid App Store icon, used in the product card
- `404.html` — not-found page
- `robots.txt`, `sitemap.xml` — SEO basics
- `wrangler.jsonc` — deploy config (Worker name, assets directory)
- `.assetsignore` — excludes `.git`, `.wrangler`, and doc files from what
  actually gets served; without this, the whole repo (including `.git`
  internals) gets uploaded as public static assets

## Deploy

No build step required. This deploys as a Cloudflare Worker with static
assets (`wrangler.jsonc`'s `assets.directory`), not classic Pages.

**Automatic:** the `hevexa-website` Worker is connected to this GitHub repo
(via Cloudflare's GitHub App) — push to `main` and Cloudflare rebuilds and
redeploys automatically. No manual step needed for normal edits.

**Manual** (for local testing, or if the auto-deploy ever needs a manual
kick):

```
npx wrangler deploy
```

`hevexa.net` / `www.hevexa.net` are set up via Custom Domains in the
Cloudflare dashboard (Worker settings → Domains & Routes) — that's a
per-Worker/project setting, so it has to be re-added any time the site
moves to a different Worker or Pages project.

## To edit

- Contact details (address/phone/email) live in `index.html` under `#contact`,
  in the footer, and in the JSON-LD `Organization` block in `<head>`. Keep
  all three in sync if they change.
- Swap `logo.svg` for a different logo file if needed — it's referenced from
  `index.html`, `404.html`, and as the favicon.
