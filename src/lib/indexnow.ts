import { SITE } from "@/lib/constants";

/** Public IndexNow key (must match public/{key}.txt) */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "ndx-seo-7c4e9a2f1b8d4063";

/**
 * Notify Bing/Yandex/IndexNow partners that URLs changed.
 * Call after deploy via POST /api/indexnow
 */
export async function submitIndexNow(
  urls: string[] = [SITE.url],
): Promise<{ ok: boolean; status: number; body: string }> {
  const payload = {
    host: SITE.domain,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text().catch(() => "");
  return { ok: res.ok || res.status === 202, status: res.status, body };
}
