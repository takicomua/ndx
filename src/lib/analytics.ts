import {
  googleAdsSendTo,
  hasGtm,
  hasMetaPixel,
} from "@/lib/seo";

type TrackerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Successful Brief submit.
 * - Always pushes `generate_lead` to dataLayer (GTM / GA4).
 * - If tags are loaded directly (no GTM): GA4 generate_lead + Google Ads `conversion`.
 * - Meta Pixel Lead is optional and only fires when a pixel id is set.
 */
export function trackLeadSubmit() {
  if (typeof window === "undefined") return;
  const w = window as TrackerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "generate_lead",
    method: "brief_form",
  });

  if (!hasGtm()) {
    w.gtag?.("event", "generate_lead", { method: "brief_form" });
    const sendTo = googleAdsSendTo();
    if (sendTo) {
      w.gtag?.("event", "conversion", {
        send_to: sendTo,
      });
    }
  }

  if (hasMetaPixel()) {
    w.fbq?.("track", "Lead");
  }
}
