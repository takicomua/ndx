import { NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/indexnow";
import { getIndexableUrls } from "@/lib/sitemap-urls";
import { SITE } from "@/lib/constants";

function authorize(request: Request) {
  const secret =
    process.env.INDEXNOW_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    "";
  if (!secret) return { ok: false as const, status: 503 as const };
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${secret}`) {
    return { ok: false as const, status: 401 as const };
  }
  return { ok: true as const, status: 200 as const };
}

/**
 * POST /api/indexnow — manual / deploy hook
 * GET  /api/indexnow — Vercel Cron (Authorization: Bearer CRON_SECRET)
 */
export async function POST(request: Request) {
  const auth = authorize(request);
  if (!auth.ok) {
    return NextResponse.json(
      {
        error:
          auth.status === 503
            ? "INDEXNOW_SECRET not configured"
            : "Unauthorized",
      },
      { status: auth.status },
    );
  }

  let urls = getIndexableUrls();
  try {
    const json = (await request.json()) as { urlList?: string[] };
    if (Array.isArray(json.urlList) && json.urlList.length) {
      const filtered = json.urlList.filter(
        (u): u is string => typeof u === "string" && u.startsWith(SITE.url),
      );
      if (filtered.length) urls = filtered;
    }
  } catch {
    /* empty body OK — ping full sitemap set */
  }

  const result = await submitIndexNow(urls);
  return NextResponse.json(
    { ...result, count: urls.length },
    { status: result.ok ? 200 : 502 },
  );
}

/** Vercel Cron uses GET + Bearer CRON_SECRET */
export async function GET(request: Request) {
  const auth = authorize(request);
  if (!auth.ok) {
    return NextResponse.json(
      {
        endpoint: "/api/indexnow",
        methods: ["GET (cron)", "POST"],
        auth: "Bearer INDEXNOW_SECRET or CRON_SECRET",
        keyLocation: `${SITE.url}/ndx-seo-7c4e9a2f1b8d4063.txt`,
        urls: getIndexableUrls().length,
      },
      { status: auth.status === 401 ? 401 : 200 },
    );
  }

  const urls = getIndexableUrls();
  const result = await submitIndexNow(urls);
  return NextResponse.json(
    { ...result, count: urls.length, source: "cron-or-auth-get" },
    { status: result.ok ? 200 : 502 },
  );
}
