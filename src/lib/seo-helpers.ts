import { CONTACTS, SITE } from "@/lib/constants";

function isPlaceholderContact(value: string) {
  if (!value) return true;
  const v = value.trim();
  if (!v || v.includes("example.com")) return true;
  if (v === "hello@example.com") return true;
  if (v.endsWith("t.me/") || v.endsWith("github.com/")) return true;
  if (v.endsWith("linkedin.com/in/") || v.endsWith("linkedin.com/in")) return true;
  if (v.endsWith("dou.ua/") || v.endsWith("dou.ua/users/")) return true;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") return true;
  } catch {
    return true;
  }
  return false;
}

export function getSameAs(): string[] {
  return [
    CONTACTS.telegram,
    CONTACTS.github,
    CONTACTS.linkedin,
    CONTACTS.dou,
  ].filter((u) => !isPlaceholderContact(u));
}

export function getPublicEmail(): string | undefined {
  return isPlaceholderContact(CONTACTS.email) ? undefined : CONTACTS.email;
}

/** Real NAP only. Empty env → field omitted from JSON-LD (never invent). */
export function getBusinessPhone(): string | undefined {
  const v = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim();
  return v || undefined;
}

export function getStreetAddress(): string | undefined {
  const v = process.env.NEXT_PUBLIC_BUSINESS_STREET?.trim();
  return v || undefined;
}

export function getBusinessGeo():
  | { latitude: number; longitude: number }
  | undefined {
  const lat = Number(process.env.NEXT_PUBLIC_BUSINESS_LAT?.trim());
  const lng = Number(process.env.NEXT_PUBLIC_BUSINESS_LNG?.trim());
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return undefined;
  return { latitude: lat, longitude: lng };
}

export function postalAddress() {
  const street = getStreetAddress();
  return {
    "@type": "PostalAddress" as const,
    ...(street ? { streetAddress: street } : {}),
    addressLocality: "Kyiv",
    addressCountry: "UA",
  };
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
