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
  /** Google Ads conversion ID, e.g. AW-123456789 */
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "",
  /**
   * Conversion *label* only (not the AW- id).
   * Combined as AW-XXXX/LABEL for gtag `send_to`.
   */
  googleAdsConversionLabel:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim() || "",
  /** Full send_to override, e.g. AW-123456789/AbCdEfGhIjk */
  googleAdsSendTo: process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?.trim() || "",
  /**
   * Optional Meta Pixel (secondary). Prefer GTM if you already load Meta there.
   * Numeric pixel id only.
   */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "",
  /** Force noindex when "1" */
  noIndex: process.env.NEXT_PUBLIC_NOINDEX === "1",
} as const;

export function hasGoogleAnalytics() {
  return Boolean(SEO.gaId && SEO.gaId.startsWith("G-"));
}

export function hasGtm() {
  return Boolean(SEO.gtmId && SEO.gtmId.startsWith("GTM-"));
}

export function hasGoogleAds() {
  return /^AW-\d+$/.test(SEO.googleAdsId);
}

export function googleAdsSendTo(): string {
  const explicit = SEO.googleAdsSendTo;
  if (explicit && /^AW-\d+\/[\w.-]+$/.test(explicit)) return explicit;
  const id = SEO.googleAdsId;
  const label = SEO.googleAdsConversionLabel;
  if (hasGoogleAds() && label && /^[\w.-]+$/.test(label)) {
    return `${id}/${label}`;
  }
  return "";
}

export function hasMetaPixel() {
  return /^\d{5,20}$/.test(SEO.metaPixelId);
}

/** Direct gtag.js (skip when GTM owns tags to avoid double-firing). */
export function gtagBootstrapId(): string {
  if (hasGtm()) return "";
  if (hasGoogleAnalytics()) return SEO.gaId;
  if (hasGoogleAds()) return SEO.googleAdsId;
  return "";
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
