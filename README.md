# hevexa.net

Marketing/company site for Hevexa LLC. The three real pages (`/`, `/about`,
`/privacy`) are server-rendered by a small Worker script from shared
header/footer chrome — see `src/`. No build step; the Worker runs the JS
directly.

## Structure

- `src/worker.js` — Worker entry point. Routes `/`, `/about`, `/privacy` to
  generated HTML; everything else falls through to the static asset binding.
- `src/siteChrome.js` — shared header, footer, and nav-toggle/dropdown script
  used by all three pages. Edit this once instead of per-page.
- `src/homePage.js`, `src/aboutPage.js`, `src/privacyPage.js` — each page's
  own content (`src/privacyPage.js` is hevexa.net's own privacy policy,
  covering the website; Braid's app has a separate policy at
  braid.hevexa.net/privacy).
- `styles.css` — shared stylesheet, still served as a static file (linked
  from every generated page, not inlined)
- `STYLE_GUIDE.md` — design system reference (colors, type, components) —
  read this before making visual changes, to keep things consistent
- `logo.svg` — Hevexa mark, also used as favicon
- `braid-icon.png` — real Braid App Store icon, used in the product card
- `404.html` — not-found page, still a real static file (used via
  `not_found_handling` in `wrangler.jsonc`, not routed through `worker.js`)
- `robots.txt`, `sitemap.xml` — SEO basics
- `wrangler.jsonc` — deploy config (Worker name, `main` entry, assets
  directory + binding)
- `.assetsignore` — excludes `.git`, `.wrangler`, doc files, and `src` from
  what actually gets served; without this, the whole repo (including `.git`
  internals and the Worker's own source) gets uploaded as public static
  assets

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

- Contact details (address/phone/email) live in `src/siteChrome.js`'s
  `siteFooter()` (used by every page) and in `src/homePage.js`'s JSON-LD
  `Organization` block. Keep both in sync if they change.
- Swap `logo.svg` for a different logo file if needed — it's referenced from
  `src/siteChrome.js`, `404.html`, and as the favicon.
