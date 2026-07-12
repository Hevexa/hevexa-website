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
  See existing copy in `index.html`/`about.html` for tone reference.

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
  no JS framework, just the outside-click-closes listener at the bottom of
  `<body>` in each page. To add another app to the "Apps" menu, add another
  `<a>` inside the existing `.dropdown-menu`.
- **Header:** sticky, blurred backdrop, `.brand` (logo + wordmark) on the
  left, `.site-nav` on the right (`justify-content: space-between` on
  `.site-header .wrap` gives the separation — no wrapper div or CTA button
  needed there anymore). Identical markup is duplicated at the top of every
  page (no templating system) — if you change the header, update it in
  every `.html` file.
- **Footer:** `.footer-grid` (brand blurb / Company links / Contact) +
  `.footer-bottom` (copyright + legal links). Also duplicated per page.

## Multi-page conventions

- Pages: `index.html`, `about.html`, `privacy.html`, `404.html`. Header and footer markup
  is copy-pasted across all of them — there's no shared partial/include
  system (kept intentionally simple, no build step). When adding a new
  page, copy the header/footer from `about.html` rather than writing new
  markup, then adjust nav links.
- **Local asset references** (`styles.css`, `logo.svg`, `braid-icon.png`)
  use relative paths, no leading `/` — this lets the file still work if
  ever opened directly via `file://` instead of a real web server.
- **Cross-page links use clean, root-absolute URLs** — `/about`, `/privacy`,
  `/#contact`, not `about.html` or `index.html#contact`. The site is
  deployed as a Cloudflare Worker with `html_handling` left at its default,
  which auto-redirects `.html` URLs to their clean equivalent — every
  internal link should point straight at the clean URL so navigation never
  triggers that redirect (an extra hop that caused real, intermittent
  unstyled-page bugs in production). `.html` URLs still work as a fallback
  for old bookmarks/links, just don't use them in our own markup.
- **`styles.css` is cache-busted** via a `?v=N` query string on every
  `<link>` reference (all four pages). Bump `N` any time `styles.css`
  itself changes and redeploy — otherwise Cloudflare's edge cache can keep
  serving an old cached copy to some visitors after a CSS-only change.
- Contact details (address/phone/email) appear in three places per page:
  the footer, and — on `index.html` only — the JSON-LD `Organization`
  block in `<head>`. Keep all copies in sync if they change.
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
