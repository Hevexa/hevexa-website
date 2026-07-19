// hevexa-website/src/worker.js
// Entry point for the hevexa-website Worker (see wrangler.jsonc's "main").
// Only the three real pages and the one API route are generated here, from
// shared chrome (siteChrome.js) plus page-specific content — everything
// else (styles.css, images, robots.txt, sitemap.xml, the 404 fallback) is
// served untouched as a static asset via the "assets" binding.
import { HOME_PAGE_HTML } from "./homePage.js";
import { ABOUT_PAGE_HTML } from "./aboutPage.js";
import { PRIVACY_PAGE_HTML } from "./privacyPage.js";
import { handleContact } from "./contactApi.js";

const PAGES = {
  "/": HOME_PAGE_HTML,
  "/about": ABOUT_PAGE_HTML,
  "/privacy": PRIVACY_PAGE_HTML,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www.hevexa.net is bound to this same Worker but was serving
    // identical content instead of redirecting — duplicate URLs for the
    // same page split ranking signals between them (see Bing's Dec 2025
    // "Does Duplicate Content Hurt SEO" post). hevexa.net is canonical.
    if (url.hostname === "www.hevexa.net") {
      url.hostname = "hevexa.net";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // HEAD as well as GET — crawlers (Bing's among them) often send a HEAD
    // request to check a URL before a full GET, and this pathname wasn't
    // matching HEAD, so it fell through to the asset layer's 404 (there's
    // no backing .html file for these routes anymore) even though GET
    // returned the page fine — indexing tools saw a 404, browsers didn't.
    if ((request.method === "GET" || request.method === "HEAD") && url.pathname in PAGES) {
      return new Response(request.method === "HEAD" ? null : PAGES[url.pathname], {
        status: 200,
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
