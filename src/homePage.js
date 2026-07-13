// hevexa-website/src/homePage.js
// Served at hevexa.net/ (see worker.js). Shared chrome (header, footer,
// nav script) lives in siteChrome.js.
import { siteHeader, siteFooter, NAV_SCRIPT, FAVICON_LINKS, FONT_LINKS, STYLESHEET_LINK } from "./siteChrome.js";

export const HOME_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hevexa LLC — Software company in Huber Heights, Ohio</title>
<meta name="description" content="Hevexa LLC is a software company based in Huber Heights, Ohio. Our first product, Braid, is a private app for couples — coming soon to the App Store.">
<link rel="canonical" href="https://hevexa.net/">
${FAVICON_LINKS}
<meta name="theme-color" content="#3A3FC0">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Hevexa">
<meta property="og:title" content="Hevexa LLC">
<meta property="og:description" content="A software company based in Huber Heights, Ohio, building Braid — a private app for couples.">
<meta property="og:url" content="https://hevexa.net/">
<meta property="og:image" content="https://hevexa.net/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Hevexa LLC">
<meta name="twitter:description" content="A software company based in Huber Heights, Ohio, building Braid — a private app for couples.">

${FONT_LINKS}
${STYLESHEET_LINK}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hevexa",
  "legalName": "Hevexa LLC",
  "url": "https://hevexa.net/",
  "logo": "https://hevexa.net/logo.svg",
  "email": "chris@hevexa.net",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2002 Cooley Ln",
    "addressLocality": "Huber Heights",
    "addressRegion": "OH",
    "postalCode": "45424",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://braid.hevexa.net/"
  ]
}
</script>
</head>
<body>

${siteHeader({ homePrefix: "" })}

<main>
  <section class="hero">
    <div class="wrap">
      <h1>Software for the moments that matter.</h1>
      <p class="lead">Hevexa is a software company building focused, private apps. Our first product, Braid, is coming soon to the App Store.</p>
      <div class="hero-actions">
        <a class="btn btn-ghost" href="#contact">Contact us</a>
      </div>
    </div>
  </section>

  <section id="braid">
    <div class="wrap">
      <div class="product-grid">
        <div class="product-copy">
          <h2 class="section-title">Apps</h2>
          <h3 class="section-heading">Braid</h3>
          <p>A private space for you and your partner — daily questions, a shared calendar, a journal, connection questions, and small everyday kindness, all in one app.</p>
          <ul class="feature-list">
            <li>Daily check-in questions, answered privately and revealed together</li>
            <li>A shared calendar that keeps plans in sync</li>
            <li>A private journal just for the two of you</li>
            <li>Low-key date night ideas for whenever you're out of them</li>
            <li>Prompts for small, unprompted acts of kindness</li>
            <li>And more — connection questions, a bucket list, love notes, and a yearly recap, all built in</li>
          </ul>
          <a class="btn btn-primary" href="https://braid.hevexa.net/">Learn more about Braid</a>
        </div>
        <div class="product-visual">
          <div class="icon-frame">
            <img src="braid-icon.png" alt="Braid app icon">
          </div>
          <h4>Braid</h4>
          <p class="store-status">Coming soon to the App Store</p>
          <div class="chip-row">
            <span class="chip">Daily questions</span>
            <span class="chip">Calendar</span>
            <span class="chip">Journal</span>
            <span class="chip">Kindness</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2 class="section-title">Privacy</h2>
      <h3 class="section-heading">Your data is yours</h3>
      <div class="value-grid" style="margin-top:28px;">
        <div class="value-card">
          <h4>Never shared or sold</h4>
          <p>Your data is never shared with or sold to anyone. Full stop.</p>
        </div>
        <div class="value-card">
          <h4>Deleted when you delete</h4>
          <p>Delete your account and your data goes with it — no lingering copies left behind.</p>
        </div>
        <div class="value-card">
          <h4>Easy to leave</h4>
          <p>Deleting your account takes two taps in Settings — delete, then confirm — not a maze of forms or a support ticket like a lot of apps make it.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="wrap">
      <h2 class="section-title">Contact</h2>
      <h3 class="section-heading">Get in touch</h3>
      <div class="contact-card">
        <form id="contact-form">
          <input type="email" id="contact-email" placeholder="you@example.com" required autocomplete="email">
          <textarea id="contact-message" placeholder="What's on your mind?" required></textarea>
          <input type="text" id="contact-hp" class="hp-field" tabindex="-1" autocomplete="off">
          <button type="submit" id="contact-btn">Send message</button>
        </form>
        <p id="contact-msg"></p>
        <p class="alt-contact">Prefer email? Reach us directly at <a href="mailto:chris@hevexa.net">chris@hevexa.net</a>.</p>
      </div>
    </div>
  </section>

</main>

${siteFooter({ homePrefix: "" })}

${NAV_SCRIPT}

<script>
(function(){
  var form = document.getElementById('contact-form');
  var emailInput = document.getElementById('contact-email');
  var messageInput = document.getElementById('contact-message');
  var hpInput = document.getElementById('contact-hp');
  var btn = document.getElementById('contact-btn');
  var msg = document.getElementById('contact-msg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    msg.textContent = '';
    msg.className = '';
    btn.disabled = true;
    fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: emailInput.value, message: messageInput.value, company: hpInput.value })
    }).then(function(res){
      return res.json().catch(function(){ return {}; }).then(function(data){ return { ok: res.ok, data: data }; });
    }).then(function(result){
      if(result.ok){
        msg.textContent = "Sent — we'll get back to you soon.";
        msg.className = 'success';
        form.style.display = 'none';
      } else {
        msg.textContent = result.data.error || 'Something went wrong. Try again.';
        msg.className = 'error';
        btn.disabled = false;
      }
    }).catch(function(){
      msg.textContent = 'Could not reach the server. Check your connection.';
      msg.className = 'error';
      btn.disabled = false;
    });
  });
})();
</script>

</body>
</html>
`;
