import { CONTACTS, SITE } from "@/lib/constants";

function isPlaceholderContact(value: string) {
  return (
    !value ||
    value === "hello@example.com" ||
    value.endsWith("t.me/") ||
    value.endsWith("github.com/") ||
    value.endsWith("linkedin.com/in/") ||
    value.includes("example.com")
  );
}

export function getSameAs(): string[] {
  return [CONTACTS.telegram, CONTACTS.github, CONTACTS.linkedin].filter(
    (u) => !isPlaceholderContact(u),
  );
}

export function getPublicEmail(): string | undefined {
  return isPlaceholderContact(CONTACTS.email) ? undefined : CONTACTS.email;
}

export function absoluteUrl(path = "/") {
  if (path === "/" || path === "") return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Bot / preview crawlers — skip cinematic intro on first HTML */
export function isSeoCrawler(ua: string | null | undefined) {
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|linkedinbot|twitterbot|whatsapp|telegram|discordbot|google-inspectiontool|chrome-lighthouse|pagespeed/i.test(
    ua || "",
  );
}
