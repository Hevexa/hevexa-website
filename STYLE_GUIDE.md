# Hevexa site style guide

Reference for keeping `hevexa.net` visually consistent across edits/sessions.
All rules live in `styles.css` — this doc just explains the system and how to
reuse it correctly. Don't hardcode colors/spacing in a page; use the existing
CSS variables and classes below.

## Brand

- **Name:** Hevexa (company: Hevexa LLC)
- **Logo:** `logo.svg` — a hexagon badge (indigo→teal gradient) with a
  white block "H" built from three `<rect>`s. Deliberately *not* SVG
  `<text>`, so it renders identically everywhere, including as a standalone
  `<img>`/favicon where page fonts aren't loaded.
- **Voice:** modest and factual, not hypey. "A private space for you and
  your partner," not "Revolutionize your relationship." Short sentences.
  See existing copy in `src/homePage.js`/`src/aboutPage.js` for tone reference.

## Color tokens

Defined once in `:root` in `styles.css`, with a `prefers-color-scheme: dark`
override block right below it. Always reference the variable, never the hex,
so dark mode stays correct automatically.

| Variable | Light | Dark | Use for |
|---|---|---|---|
| `--ink` | `#14162B` | `#EDEEF7` | body text, headings |
| `--muted` | `rgba(ink, .62)` | same formula | secondary text |
| `--muted-strong` | `rgba(ink, .8)` | same formula | body copy that needs more contrast than `--muted` |
| `--bg` | `#F6F7FB` | `#0D0E1C` | page background |
| `--card-bg` | `#FFFFFF` | `#171929` | cards, header background base |
| `--line` | `rgba(ink, .09)` | `rgba(ink, .1)` | borders, hairlines |
| `--indigo` | `#3A3FC0` | `#7B7FE8` | primary brand color, `.btn-primary` |
| `--indigo-dark` | `#2D30A0` | `#9498F0` | link color, hover states |
| `--teal` | `#17B6A6` | `#2FD6C4` | accent — section eyebrows, bullet dots |
| `--accent-bg` | `rgba(indigo, .08)` | `rgba(indigo, .14)` | tinted chip/badge backgrounds |
| `--shadow-sm` / `--shadow-lg` | — | — | card elevation, two weights only |
| `--radius` (18px) / `--radius-sm` (12px) | — | — | corner rounding, two sizes only |

Don't introduce a third shadow or radius value — pick the closer of the two
existing ones.

## Typography

- **Headings:** `'Sora', sans-serif` — weight 700 for section headings
  (`h3.section-heading`), 800 for hero/page titles (`.hero h1`,
  `.page-intro h1`). Loaded via Google Fonts in every page's `<head>`:
  `family=Sora:wght@600;700;800`.
- **Body:** `'Inter', sans-serif` — weights 400/500/600, set once on `body`.
- **Eyebrows** (`h2.section-title`): Sora 700, 12.5px, uppercase,
  `letter-spacing: 0.1em`, colored `--teal`. Always precedes a
  `h3.section-heading` inside a section.

## Layout

- Every section's content sits in `<div class="wrap">` (max-width 1040px,
  24px side padding) directly inside a `<section>` (72px vertical padding,
  `--line` top border). Don't invent a new container width.
- Plain body copy (no card, no grid) goes in `<div class="prose">` around
  the `<p>` tags — sets color/size/line-height/max-width consistently.
- Two-column layouts (`product-grid`) collapse to one column
  under 760px via the shared media query at the bottom of `styles.css` —
  add new grids to that same breakpoint rather than writing a new one.

## Components (reuse these classes)

- **Buttons:** `.btn` + one of `.btn-primary` (solid indigo), `.btn-ghost`
  (outlined). Add `.btn-sm` for the compact header CTA size.
- **Cards:** `.product-visual`, `.fact-card`, `.value-card` all share the
  same recipe — `--card-bg` background, `--line` border, `--radius`,
  `--shadow-sm` or `--shadow-lg`. Use one of these rather than styling a new
  card from scratch.
- **Chips/pills:** `.chip` (neutral, e.g. feature tags) — background
  `--bg`, border `--line`. For a tinted/brand pill use `--accent-bg` +
  `--indigo-dark` text (see old `.eyebrow`, now removed, if resurrecting).
- **Bulleted feature list:** `.feature-list` — no default markers, small
  teal dot via `::before`.
- **Nav dropdown:** `.nav-dropdown` is a native `<details>`/`<summary>` —
  no JS framework, just the outside-click-closes listener in `NAV_SCRIPT`
  (see below). To add another app to the "Apps" menu, edit the one
  `siteHeader()` function rather than any individual page.
- **Mobile nav:** below 760px, `.site-nav` collapses into a hamburger
  (`.nav-toggle-input`/`.nav-toggle-label`, pure CSS checkbox toggle, no JS
  needed to open/close). `NAV_SCRIPT` closes it automatically when a nav
  link is tapped. Don't try to "fit" more nav items by trimming copy — the
  hamburger already handles overflow, so add what you need to `siteHeader()`.
- **Header:** sticky, blurred backdrop, `.brand` (logo + wordmark) on the
  left, `.site-nav` on the right (`justify-content: space-between` on
  `.site-header .wrap` gives the separation). Markup lives in exactly one
  place — `siteHeader()` in `src/siteChrome.js` — and every page imports it.
  Change the header once, it updates everywhere.
- **Footer:** `.footer-grid` (brand blurb / Company links / Contact) +
  `.footer-bottom` (copyright + legal links). Also lives once, in
  `siteFooter()` in `src/siteChrome.js`.

## Multi-page conventions

- Pages: `/` (`src/homePage.js`), `/about` (`src/aboutPage.js`), `/privacy`
  (`src/privacyPage.js`), routed by `src/worker.js`; `404.html` is the one
  page that's still a plain static file (Cloudflare serves it directly via
  `not_found_handling`, never through the Worker). Header/footer markup is
  shared via `src/siteChrome.js` — see Components above. When adding a new
  page: create `src/newPage.js` exporting an HTML template that imports
  `siteHeader()`/`siteFooter()`/`NAV_SCRIPT` from `siteChrome.js`, then
  register its path in the `PAGES` map in `src/worker.js`.
- **Local asset references** (`styles.css`, `logo.svg`, `braid-icon.png`)
  use relative paths, no leading `/` — kept as a matter of convention from
  when pages were plain static files; harmless to keep since the Worker
  serves generated pages at the site root either way.
- **Cross-page links use clean, root-absolute URLs** — `/about`, `/privacy`,
  `/#contact`, not `index.html#contact`. `.html`-suffixed URLs no longer
  resolve to anything — `index.html`/`about.html`/`privacy.html` were
  deleted once their content moved into `src/`, so don't link to them.
- **`styles.css` is cache-busted** via a `?v=N` query string on every
  `<link>` reference (`STYLESHEET_LINK` in `siteChrome.js`, plus `404.html`'s
  own copy). Bump `N` any time `styles.css` itself changes and redeploy —
  otherwise Cloudflare's edge cache can keep serving an old cached copy to
  some visitors after a CSS-only change.
- Contact details (address/phone/email) appear in two places: `siteFooter()`
  in `siteChrome.js` (used by every page), and the JSON-LD `Organization`
  block in `src/homePage.js` only. Keep both in sync if they change.
- **Contact info lives only in the footer.** Don't add a second card/box
  elsewhere on the page repeating the address/phone/email (a `.fact-card`
  version of this existed on the about page and was removed per explicit
  request — the footer is enough, don't reintroduce it).
- New pages should be added to `sitemap.xml`.

## Adding a new section

1. `<section>` with a `.wrap` inside.
2. `h2.section-title` (eyebrow) + `h3.section-heading`, unless it's a hero
   (`.hero h1` / `.page-intro h1` instead).
3. Reuse an existing card/list/button class before inventing a new one.
4. Check it at both the desktop width and under 760px (the site's one
   breakpoint) before calling it done.
