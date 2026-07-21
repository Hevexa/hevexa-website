// hevexa-website/src/siteChrome.js
// Shared header/footer markup and the nav-toggle/dropdown-close script for
// homePage.js, aboutPage.js, and privacyPage.js — extracted so header/nav
// changes are a single edit instead of three (previously duplicated
// byte-for-byte across index.html/about.html/privacy.html). Mirrors the
// equivalent split on the Braid site
// (couple-connect/functions/lib/braidSiteChrome.js) so both sites follow
// the same pattern.
//
// homePrefix: "" when the page IS "/" (so "#braid"/"#contact" scroll in
// place), "/" on every other page (so "/#braid" navigates back to the
// homepage section instead of looking for an anchor that isn't there).
export function siteHeader({ homePrefix = "/" } = {}) {
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="./">
      <img src="logo.svg" alt="Hevexa">
      <span>Hevexa</span>
    </a>
    <input type="checkbox" id="nav-toggle" class="nav-toggle-input">
    <label for="nav-toggle" class="nav-toggle-label" aria-label="Menu">
      <span></span><span></span><span></span>
    </label>
    <nav class="site-nav">
      <details class="nav-dropdown">
        <summary>Apps</summary>
        <div class="dropdown-menu">
          <a href="${homePrefix}#braid">Braid</a>
        </div>
      </details>
      <a href="/about">About</a>
      <a href="${homePrefix}#contact">Contact</a>
    </nav>
  </div>
</header>`;
}

export function siteFooter({ homePrefix = "/" } = {}) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="./">
          <img src="logo.svg" alt="Hevexa">
          <span>Hevexa</span>
        </a>
        <p>A software company based in Huber Heights, Ohio, building focused, private apps.</p>
      </div>
      <div class="footer-col">
        <h2>Apps</h2>
        <ul>
          <li><a href="${homePrefix}#braid">Braid</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Company</h2>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Contact</h2>
        <ul>
          <li class="plain">2002 Cooley Ln<br>Huber Heights, OH 45424</li>
          <li><a href="mailto:chris@hevexa.net">chris@hevexa.net</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Hevexa LLC. All rights reserved.</p>
      <p class="legal-links">
        <a href="/privacy">Privacy</a>
        <a href="https://braid.hevexa.net/">Braid</a>
      </p>
    </div>
  </div>
</footer>`;
}

export const NAV_SCRIPT = `<script>
document.addEventListener('click', function (e) {
  document.querySelectorAll('.nav-dropdown[open]').forEach(function (d) {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});
document.querySelectorAll('nav.site-nav a').forEach(function (a) {
  a.addEventListener('click', function () {
    var toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  });
});
</script>`;

export const FAVICON_LINKS = `<link rel="icon" type="image/svg+xml" href="logo.svg">
<link rel="apple-touch-icon" href="logo.svg">`;

// Self-hosting fonts with font-display:swap paints text in a fallback font
// first, then reflows once Inter/Sora finish downloading -- Lighthouse
// caught this as a real layout shift (CLS 0.256 on /privacy desktop,
// culprit: "Web font loaded"). Preloading gets both files fetching before
// the browser commits to the fallback-font layout, so the swap lands
// before first paint on a normal connection instead of after it.
export const FONT_PRELOAD_LINKS = `<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>`;
