// hevexa-website/src/contactApi.js
// Handles POST /api/contact from the homepage's contact form (see
// homePage.js). Sends via Resend, same approach as couple-connect's
// functions/lib/email.js — needs its own RESEND_API_KEY secret set on
// *this* Worker (`npx wrangler secret put RESEND_API_KEY` from
// hevexa-website/, or via the Cloudflare dashboard); secrets don't cross
// projects even if it's the same Resend account. Until set, this fails
// closed with a clear error rather than silently dropping messages. Same
// caveat as couple-connect's email.js: until hevexa.net's sending domain
// is verified in Resend, the shared "onboarding@resend.dev" sender can
// only deliver to the email on the Resend account itself.
//
// No database here (unlike Braid's support form), so no persistent
// per-IP lockout — just a honeypot field plus Resend's own free-tier rate
// limit (100/day) as the practical ceiling. Fine for a low-traffic company
// site; revisit if it ever gets abused.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 4000;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function handleContact(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  // Honeypot: a hidden field real visitors never fill in, but bots often do.
  if (String(body.company || "").trim()) {
    return jsonResponse({ ok: true });
  }

  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ error: "Enter a valid email address" }, 400);
  }
  if (!message) {
    return jsonResponse({ error: "Enter a message" }, 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: "Message is too long" }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "Email isn't configured yet — reach out directly instead." }, 500);
  }
  const from = env.RESEND_FROM || "Hevexa <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: "chris@hevexa.net",
      reply_to: email,
      subject: `New message from hevexa.net — ${email}`,
      html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    return jsonResponse({ error: "Could not send — try again or email us directly." }, 502);
  }
  return jsonResponse({ ok: true });
}
