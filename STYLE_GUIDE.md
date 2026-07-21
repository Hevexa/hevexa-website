# Hevexa site style guide

Reference for keeping `hevexa.net` visually consistent across edits/sessions.
All rules live in `styles.css` — this doc just explains the system and how to
reuse it correctly. Don't hardcode colors/spacing in a page; use the existing
CSS variables and classes below.

**Keep this file updated as the site changes** — whenever a color token,
font, component, or the performance/accessibility setup below changes, update
this file in the same commit. It exists so a fresh session (any account, any
machine) can pick up exactly where the last one left off by reading the repo,
without depending on chat history or memory.

## Brand

- **Name:** Hevexa (company: Hevexa LLC)
- **Logo:** `logo.svg` — a hexagon badge (deep indigo→plum-rose gradient,
  "Warm Bridge") with a white block "H" built from three `<rect>`s.
  Deliberately *not* SVG `<text>`, so it renders identically everywhere,
  including as a standalone `<img>`/favicon where page fonts aren't loaded.
  The gradient's two stops are also the `--indigo`/`--rose` tokens below —
  if the mark changes again, re-derive the palette from it, don't pick new
  colors independently.
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
| `--line` | `rgba(ink, .12)` | `rgba(ink, .13)` | borders, hairlines |
| `--indigo` | `#2D2A6E` | `#8983DA` | primary brand color, `.btn-primary` |
| `--indigo-dark` | `#221F54` | `#A29CEA` | link color, hover states |
| `--rose` | `#B24C6B` | `#F28FA6` | accent — section eyebrows, bullet dots |
| `--accent-bg` | `rgba(indigo, .08)` | `rgba(indigo, .14)` | tinted chip/badge backgrounds |
| `--shadow-sm` / `--shadow-lg` | — | — | card elevation, two weights only |
| `--radius` (18px) / `--radius-sm` (12px) | — | — | corner rounding, two sizes only |

Don't introduce a third shadow or radius value — pick the closer of the two
existing ones.

## Typography

- **Headings:** `'Sora', sans-serif` — weight 700 for section headings
  (`h3.section-heading`), 800 for hero/page titles (`.hero h1`,
  `.page-intro h1`).
- **Body:** `'Inter', sans-serif` — weights 400/500/600, set once on `body`.
- **Eyebrows** (`h2.section-title`): Sora 700, 12.5px, uppercase,
  `letter-spacing: 0.1em`, colored `--rose` (passes WCAG AA at 4.74:1 in
  light mode, 8.44:1 in dark — see the Performance & accessibility section
  below before introducing any *new* accent color for small text).
  Always precedes a `h3.section-heading` inside a section.
- **Self-hosted, not Google Fonts.** Both families are self-hosted as
  `fonts/inter-latin.woff2` and `fonts/sora-latin.woff2` (one variable-font
  file per family covers every weight in use — confirmed by checking
  Google's own `fonts.googleapis.com/css2?...` response before downloading;
  don't assume a separate file is needed per weight). `@font-face` rules
  (with `font-display: optional`, not `swap` — see below) live at the top of
  `styles.css`. `siteChrome.js`'s `FONT_PRELOAD_LINKS` preloads both files;
  every page includes it in `<head>` before the inline stylesheet.

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
- **Hero mark:** `.hero-mark` — a 68px rendering of `logo.svg` centered
  above `.hero h1` on the homepage only (not `.page-intro` on other pages).
  Gives the hero a visual anchor beyond text; don't add it to subpages,
  where the header's own logo is enough.
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
- **`styles.css` is inlined, not linked.** Every page embeds it directly via
  a `<style>` block (`STYLE_TAG` from `src/inlineStyle.js`) instead of an
  external `<link rel="stylesheet">`, to avoid a render-blocking request for
  a stylesheet this small. There's no build step in this repo, so
  `inlineStyle.js`'s content is a hand-maintained copy of `styles.css` —
  **any edit to `styles.css` must be copied into `inlineStyle.js` too**, or
  the live site keeps serving the old CSS even though the source file looks
  updated. (Regenerate it with the Python one-liner in this repo's git
  history — search the log for `inlineStyle.js` — rather than hand-copying,
  to avoid transcription errors.)
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

## Performance & accessibility (apply to every new page — don't wait for an audit to catch these)

Learned the hard way across a 2026-07-21 PageSpeed pass — every item here
was a real, scored finding on this site or braid.hevexa.net's identical
setup, not theoretical:

- **Self-host web fonts, never link Google Fonts directly** (see
  Typography above for how). Fetch the actual `.woff2` from
  `fonts.gstatic.com`, not `fonts.googleapis.com`.
- **`font-display: optional`, not `swap`.** `swap` causes a real, measurable
  layout shift (CLS) once the custom font loads over the fallback —
  Lighthouse's *desktop* throttled run catches this even when mobile
  doesn't. `optional` skips the late reflow entirely. Preloading the font
  files (`FONT_PRELOAD_LINKS`) is still worth doing on top of this, but
  doesn't fix CLS by itself — `font-display` is what fixes it.
  System-font stacks would sidestep this category of issue entirely, but
  replacing Sora/Inter with system fonts is a brand decision, not a
  performance one — don't make that call unilaterally to chase a couple of
  points.
- **Inline the CSS** (see `styles.css`/`inlineStyle.js` note above) rather
  than linking an external stylesheet.
- **Footer/nav headings must not skip a level.** `siteFooter()`'s column
  headings are `<h2>` for exactly this reason (going *backward* from a
  deeper content heading to h2 is fine; jumping *forward*, e.g. h2→h5, is
  what Lighthouse flags — this is why the footer can safely stay h2 even
  though `privacyPage.js` never uses anything past h2 itself).
- **Every real form input needs a `<label>`** (a visually-hidden `.sr-only`
  class is fine — see `styles.css`). Any hidden honeypot/anti-spam input
  (`.hp-field` on the contact form) needs `aria-hidden="true"` too, or it
  gets flagged as an unlabeled field.
- **Check color contrast** (≥4.5:1, WCAG AA) for any *new* small/decorative
  text color against its background — don't assume an existing token is
  safe at a different size/weight than where it's already used. Compute it
  before shipping, don't guess.
- **Serve raster images as WebP with a fallback** via `<picture>`
  (`braid-icon.png` → `.webp` is the existing example), and add/extend
  `_headers` with a long, immutable `Cache-Control` for any new static
  asset — rename the file on future content changes rather than
  overwriting, since these are cached for a year.
- **Test both mobile AND desktop on every real page** at
  pagespeed.web.dev before calling a change done — desktop's throttled
  profile has caught real regressions (the font-swap CLS above) that
  mobile missed entirely.
- **Add `fetchpriority="high"` to whatever image Lighthouse names as the
  LCP element.** `logo.svg` (the header brand mark, present on every page,
  and the larger `.hero-mark` copy on the homepage) is the current LCP
  candidate and already has it. This only needs to change if the LCP
  element itself changes (e.g. a new hero image is added) — check the
  audit's specific `<img>` snippet rather than assuming it's still the
  logo. Don't add it to the footer's copy of the same image — that's never
  an LCP candidate (below the fold at first paint), and prioritizing it
  would just compete with resources that actually matter.
