import { NextResponse } from "next/server";
import { CONTACTS, SITE } from "@/lib/constants";

/**
 * RFC 9116 — security contact & policy disclosure for scanners / researchers.
 * https://ndx.com.ua/.well-known/security.txt
 */
export function GET() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const body = [
    `Contact: mailto:${CONTACTS.email}`,
    `Contact: ${CONTACTS.telegram}`,
    `Expires: ${expires.toISOString()}`,
    `Preferred-Languages: uk, en`,
    `Canonical: ${SITE.url}/.well-known/security.txt`,
    `Hiring: ${SITE.url}/zayavka`,
    `Policy: ${SITE.url}/polityka`,
    "",
    `# NDX · ${SITE.brand}`,
    `# Report security issues privately. Do not disclose until fixed.`,
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
