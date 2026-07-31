/**
 * Security headers — no app imports (safe for next.config + middleware).
 */

export const CANONICAL_HOST = "ndx.com.ua";

/** Block indexing on previews / non-production hosts */
export function shouldNoIndex(): boolean {
  if (process.env.NEXT_PUBLIC_NOINDEX === "1") return true;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return true;
  }
  return false;
}

export function buildCsp(): string {
  const isDev = process.env.NODE_ENV === "development";

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.google.com",
    "https://www.gstatic.com",
  ];

  const connectSrc = [
    "'self'",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://analytics.google.com",
    "https://stats.g.doubleclick.net",
    ...(isDev ? ["ws:", "wss:", "http://localhost:*"] : []),
  ];

  return [
    `default-src 'self'`,
    `script-src ${scriptSrc.join(" ")}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc.join(" ")}`,
    `worker-src 'self' blob:`,
    `child-src 'self' blob:`,
    `frame-src 'self' https://www.googletagmanager.com https://www.google.com`,
    `media-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'self'`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");
}

export function securityHeaders(): { key: string; value: string }[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: [
        "accelerometer=()",
        "autoplay=()",
        "camera=()",
        "display-capture=()",
        "encrypted-media=()",
        "fullscreen=(self)",
        "geolocation=()",
        "gyroscope=()",
        "magnetometer=()",
        "microphone=()",
        "midi=()",
        "payment=()",
        "picture-in-picture=()",
        "publickey-credentials-get=()",
        "screen-wake-lock=()",
        "usb=()",
        "xr-spatial-tracking=()",
        "interest-cohort=()",
      ].join(", "),
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
    { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
    { key: "Origin-Agent-Cluster", value: "?1" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
    { key: "Content-Security-Policy", value: buildCsp() },
  ];
}
