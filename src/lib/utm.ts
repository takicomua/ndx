import { SITE } from "@/lib/constants";

/** Params that must survive internal hops to /brief (ads + analytics). */
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

function firstString(
  value: string | string[] | undefined | null,
): string | undefined {
  if (Array.isArray(value)) return value.find((v) => v.trim())?.trim();
  return value?.trim() || undefined;
}

export function readTrackingParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): TrackingValues {
  const out: TrackingValues = {};
  for (const key of TRACKING_PARAMS) {
    const raw =
      source instanceof URLSearchParams
        ? source.get(key)
        : firstString(source[key]);
    const value = raw?.trim();
    if (value && value.length <= 200) out[key] = value;
  }
  return out;
}

export function hasAdTrafficParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): boolean {
  return TRACKING_PARAMS.some((key) => {
    if (source instanceof URLSearchParams) return Boolean(source.get(key)?.trim());
    return Boolean(firstString(source[key]));
  });
}

/** Merge current tracking params onto an internal href without dropping type=. */
export function mergeTrackingParams(href: string, source: URLSearchParams): string {
  const url = new URL(href, SITE.url);
  for (const key of TRACKING_PARAMS) {
    const value = source.get(key)?.trim();
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function trackingQueryString(values: TrackingValues): string {
  const params = new URLSearchParams();
  for (const key of TRACKING_PARAMS) {
    const value = values[key];
    if (value) params.set(key, value);
  }
  const q = params.toString();
  return q ? `?${q}` : "";
}

export function briefHref(type?: string, extra?: TrackingValues): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (extra) {
    for (const key of TRACKING_PARAMS) {
      const value = extra[key];
      if (value) params.set(key, value);
    }
  }
  const q = params.toString();
  return q ? `/brief?${q}` : "/brief";
}
