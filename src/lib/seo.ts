/**
 * Google / SEO runtime config.
 * Fill values in `.env.local` (see `.env.example`).
 */
export const SEO = {
  /** Meta tag verification token from Google Search Console */
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  /**
   * HTML file verification token.
   * Serves `https://ndx.com.ua/google{TOKEN}.html`
   * with body `google-site-verification: {TOKEN}`
   * If empty, falls back to meta token (works when GSC gave the same id).
   */
  googleHtmlVerification:
    process.env.GOOGLE_HTML_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
    "",
  bingSiteVerification:
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || "",
  yandexVerification:
    process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim() || "",
  /** GA4 Measurement ID, e.g. G-XXXXXXXX */
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
  /** Google Tag Manager container, e.g. GTM-XXXXXXX */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "",
  /** Force noindex when "1" */
  noIndex: process.env.NEXT_PUBLIC_NOINDEX === "1",
} as const;

export function hasGoogleAnalytics() {
  return Boolean(SEO.gaId && SEO.gaId.startsWith("G-"));
}

export function hasGtm() {
  return Boolean(SEO.gtmId && SEO.gtmId.startsWith("GTM-"));
}

export function googleVerificationHtmlPath() {
  const token = SEO.googleHtmlVerification;
  if (!token) return null;
  // Token may already include "google" prefix or be full filename
  const name = token.endsWith(".html")
    ? token
    : token.startsWith("google")
      ? `${token}.html`
      : `google${token}.html`;
  return `/${name}`;
}
