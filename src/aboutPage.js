// hevexa-website/src/aboutPage.js
// Served at hevexa.net/about (see worker.js). Shared chrome (header,
// footer, nav script) lives in siteChrome.js.
import { siteHeader, siteFooter, NAV_SCRIPT, FAVICON_LINKS, FONT_LINKS, STYLESHEET_LINK } from "./siteChrome.js";

export const ABOUT_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About Hevexa</title>
<meta name="description" content="Hevexa LLC is a small software company based in Huber Heights, Ohio, building focused, private apps — starting with Braid.">
<link rel="canonical" href="https://hevexa.net/about">
${FAVICON_LINKS}
<meta name="theme-color" content="#3A3FC0">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Hevexa">
<meta property="og:title" content="About Hevexa">
<meta property="og:description" content="A small software company based in Huber Heights, Ohio, building focused, private apps.">
<meta property="og:url" content="https://hevexa.net/about">
<meta property="og:image" content="https://hevexa.net/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="About Hevexa">
<meta name="twitter:description" content="A small software company based in Huber Heights, Ohio, building focused, private apps.">

${FONT_LINKS}
${STYLESHEET_LINK}
</head>
<body>

${siteHeader({ homePrefix: "/" })}

<main>
  <section class="page-intro">
    <div class="wrap">
      <h1>Small on purpose.</h1>
      <p class="lead">Hevexa is a software company based in Huber Heights, Ohio. We're not chasing scale — we're building a small number of things well, starting with Braid.</p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="section-title">Why Hevexa exists</h2>
      <h3 class="section-heading">Built by people who'd use it</h3>
      <div class="prose">
        <p>Most software tries to do everything at once, which usually means it does nothing particularly well. Hevexa takes the opposite approach — small, focused apps, each shaped by actually using the thing every day rather than chasing a roadmap.</p>
        <p>Braid, a private space for couples, is where that started. It won't be the only thing we build, but every app we ship will hold to the same idea: do less, and do it well.</p>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="section-title">How we build</h2>
      <h3 class="section-heading">A few things we hold to</h3>
      <div class="value-grid" style="margin-top:28px;">
        <div class="value-card">
          <h4>Private by default</h4>
          <p>What's yours stays yours. We design data handling and notifications to never reveal more than they need to.</p>
        </div>
        <div class="value-card">
          <h4>Built to last</h4>
          <p>No dark patterns, no growth hacks. We'd rather build something you keep using than something you're tricked into keeping.</p>
        </div>
        <div class="value-card">
          <h4>Small on purpose</h4>
          <p>One thing done well beats five done halfway. That's true of every app we build, starting with Braid.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="wrap">
      <h2 class="section-title">Apps</h2>
      <h3 class="section-heading">See what we're building</h3>
      <div class="hero-actions">
        <a class="btn btn-primary" href="https://braid.hevexa.net/">Explore Braid</a>
        <a class="btn btn-ghost" href="/#contact">Get in touch</a>
      </div>
    </div>
  </section>
</main>

${siteFooter({ homePrefix: "/" })}

${NAV_SCRIPT}

</body>
</html>
`;
