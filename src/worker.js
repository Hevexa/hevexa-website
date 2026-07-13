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

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (request.method === "GET" && url.pathname in PAGES) {
      return new Response(PAGES[url.pathname], {
        status: 200,
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
