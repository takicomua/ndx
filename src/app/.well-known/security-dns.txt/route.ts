import { NextResponse } from "next/server";
import { CONTACTS, SITE } from "@/lib/constants";
import { googleVerificationHtmlPath } from "@/lib/seo";

/** Optional DNS / email / Search Console checklist */
export function GET() {
  const gscFile = googleVerificationHtmlPath();
  const lines = [
    `# NDX DNS & Search checklist (configure at registrar / DNS / GSC)`,
    `# Domain: ${SITE.domain}`,
    ``,
    `# SSL/TLS: HTTPS enabled (HSTS preload-ready)`,
    `# CAA: issue "letsencrypt.org" (or your CA); issuewild "letsencrypt.org"`,
    `# SPF:  v=spf1 include:_spf.google.com ~all   (adjust to your mail)`,
    `# DKIM: enable at mail provider`,
    `# DMARC: v=DMARC1; p=quarantine; rua=mailto:${CONTACTS.email}; pct=100`,
    ``,
    `# Google Search Console`,
    `# 1. Property: ${SITE.url}`,
    `# 2. Verify: meta NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`,
    `#    and/or HTML file${gscFile ? `: ${SITE.url}${gscFile}` : " via GOOGLE_HTML_VERIFICATION"}`,
    `#    and/or DNS TXT google-site-verification=...`,
    `# 3. Submit sitemap: ${SITE.url}/sitemap.xml`,
    `# 4. Request indexing for / /poslugy /keysy`,
    `# Bing Webmaster + IndexNow key: ${SITE.url}/ndx-seo-7c4e9a2f1b8d4063.txt`,
    `# IndexNow ping: POST ${SITE.url}/api/indexnow (Bearer INDEXNOW_SECRET)`,
    ``,
    `Contact: mailto:${CONTACTS.email}`,
  ].join("\n");

  return new NextResponse(lines, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
