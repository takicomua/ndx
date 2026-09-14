import { NextResponse, type NextRequest } from "next/server";
import { googleVerificationHtmlPath, SEO } from "@/lib/seo";
import { CANONICAL_HOST, securityHeaders } from "@/lib/security";

/**
 * HTTPS + www→apex + security headers + Google HTML verification file.
 */
export function middleware(request: NextRequest) {
  const gscPath = googleVerificationHtmlPath();
  if (gscPath && request.nextUrl.pathname === gscPath) {
    // Google expects: google-site-verification: googleXXXX.html
    const raw = SEO.googleHtmlVerification.replace(/\.html$/i, "");
    const fileToken = raw.startsWith("google") ? raw : `google${raw}`;
    const body = `google-site-verification: ${fileToken}.html`;
    return withSecurity(
      new NextResponse(body, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }),
    );
  }

  const url = request.nextUrl.clone();

  // Legacy Ads / bookmarks: /brief → /zayavka (query preserved).
  if (url.pathname === "/brief" || url.pathname === "/brief/") {
    url.pathname = "/zayavka";
    return withSecurity(NextResponse.redirect(url, 308));
  }

  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  const proto =
    request.headers.get("x-forwarded-proto") ||
    url.protocol.replace(":", "") ||
    "https";

  const isLocal =
    host === "localhost" ||
    host.startsWith("127.") ||
    host.endsWith(".local");

  const isPreview = host.endsWith(".vercel.app");

  if (!isLocal && !isPreview && process.env.NODE_ENV === "production") {
    const isWww = host === `www.${CANONICAL_HOST}`;
    const needsHttps = proto !== "https";

    if (isWww || (needsHttps && host === CANONICAL_HOST)) {
      url.protocol = "https:";
      url.host = CANONICAL_HOST;
      url.port = "";
      return withSecurity(NextResponse.redirect(url, 308));
    }
  }

  return withSecurity(NextResponse.next());
}

function withSecurity(res: NextResponse) {
  for (const h of securityHeaders()) {
    res.headers.set(h.key, h.value);
  }
  res.headers.delete("x-powered-by");
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
