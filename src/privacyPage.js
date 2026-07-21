// hevexa-website/src/privacyPage.js
// Served at hevexa.net/privacy (see worker.js). Shared chrome (header,
// footer, nav script) lives in siteChrome.js.
//
// Legal content untouched by this refactor — ported verbatim from the old
// privacy.html.
import { siteHeader, siteFooter, NAV_SCRIPT, FAVICON_LINKS } from "./siteChrome.js";
import { STYLE_TAG } from "./inlineStyle.js";

export const PRIVACY_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Privacy Policy — Hevexa</title>
<meta name="description" content="How hevexa.net collects, uses, and protects information.">
<link rel="canonical" href="https://hevexa.net/privacy">
${FAVICON_LINKS}
<meta name="theme-color" content="#2D2A6E">

${STYLE_TAG}

<style>
  .legal h2 {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 19px;
    margin: 40px 0 10px;
  }
  .legal h2:first-child { margin-top: 0; }
  .legal p, .legal li {
    color: var(--muted-strong);
    font-size: 15px;
    line-height: 1.65;
  }
  .legal ul { padding-left: 20px; margin: 10px 0; }
  .legal li { margin-bottom: 6px; }
  .updated { color: var(--muted); font-size: 13.5px; margin: 0 0 8px; }
</style>
</head>
<body>

${siteHeader({ homePrefix: "/" })}

<main>
  <section class="page-intro">
    <div class="wrap">
      <h1>Privacy Policy</h1>
      <p class="lead">This page covers hevexa.net, our company website — what little it collects, and how it's handled.</p>
    </div>
  </section>

  <section>
    <div class="wrap legal">
      <p class="updated">Last updated July 11, 2026</p>

      <h2>This page is about the website, not the app</h2>
      <p>hevexa.net is a small, static company site — there's no login, no user accounts, and nothing stored about you as you browse it. Braid, our app, is a separate service with its own accounts and its own data. If you're looking for how <em>Braid</em> handles your data, see the <a href="https://braid.hevexa.net/privacy">Braid privacy policy</a> instead.</p>

      <h2>What this website collects</h2>
      <p>Browsing hevexa.net doesn't collect anything personal. This site has no analytics, no advertising, and no tracking scripts.</p>
      <p>Two things worth being upfront about:</p>
      <ul>
        <li><strong>Fonts:</strong> pages load the Sora and Inter typefaces from Google Fonts. Loading them may expose your IP address to Google, per Google's own practices — we don't control or receive that data ourselves.</li>
        <li><strong>Direct contact:</strong> if you email or call using the details in the footer, we receive whatever you send — your address, number, and message — used only to reply to you.</li>
      </ul>

      <h2>What we don't do</h2>
      <div class="value-card">
        <p>No cookies, no analytics or tracking scripts, no advertising, no data brokers, and we never sell information to anyone. There's nothing to opt out of, because none of that exists here.</p>
      </div>

      <h2>Who hosts this</h2>
      <p>hevexa.net is hosted on Cloudflare — static files served on our behalf. There's no database behind this site and nothing for Cloudflare to process beyond serving the pages themselves.</p>

      <h2>Children</h2>
      <p>This website isn't directed at children.</p>

      <h2>Changes to this policy</h2>
      <p>If this changes in a meaningful way, we'll update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>Questions about this policy — email <a href="mailto:chris@hevexa.net">chris@hevexa.net</a>.</p>
    </div>
  </section>
</main>

${siteFooter({ homePrefix: "/" })}

${NAV_SCRIPT}

</body>
</html>
`;
