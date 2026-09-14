import { SITE } from "@/lib/constants";

/** Params that must survive hops to /zayavka (ads + analytics). */
export const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type TrackingParam = (typeof TRACKING_PARAMS)[number];
export type TrackingValues = Partial<Record<TrackingParam, string>>;

export function zayavkaHref(type?: string, extra?: TrackingValues): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (extra) {
    for (const key of TRACKING_PARAMS) {
      const value = extra[key];
      if (value) params.set(key, value);
    }
  }
  const q = params.toString();
  return q ? `/zayavka?${q}` : "/zayavka";
}

export function mergeTrackingParams(
  href: string,
  source: URLSearchParams,
): string {
  const url = new URL(href, SITE.url);
  for (const key of TRACKING_PARAMS) {
    const value = source.get(key)?.trim();
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
