/**
 * One-shot IndexNow ping for the live sitemap.
 * IndexNow key is public (served as /{key}.txt) — no secrets required.
 *
 *   npm run indexnow:ping
 *   npm run indexnow:ping -- --dry-run
 *   npm run indexnow:ping -- --base https://ndx.com.ua
 *
 * Authenticated in-app path (uses INDEXNOW_SECRET or CRON_SECRET):
 *   curl -sS -X POST https://ndx.com.ua/api/indexnow \
 *     -H "Authorization: Bearer $INDEXNOW_SECRET" \
 *     -H "Content-Type: application/json"
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://ndx.com.ua";
const INDEXNOW_KEY = "ndx-seo-7c4e9a2f1b8d4063";
const UA = "NDX-IndexNow-Ping/1.0 (+https://ndx.com.ua)";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const baseArg = process.argv.find((a, i, all) => all[i - 1] === "--base");
const base = (baseArg || SITE).replace(/\/$/, "");

function slugsFrom(file, fallback) {
  try {
    const src = readFileSync(join(ROOT, file), "utf8");
    return [...src.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  } catch {
    return fallback;
  }
}

function localSitemapUrls() {
  const services = slugsFrom("src/lib/content/services.ts", [
    "sajty-ta-lendingy",
    "internet-magazyny",
    "veb-systemy-ta-kabinety",
    "poryatunok-proektu",
  ]);
  const cases = slugsFrom("src/lib/content/cases.ts", [
    "lending-pid-reklamu",
    "magazyn-mvp",
    "kabinet-komandy",
    "stabilizaciya-proektu",
  ]);
  const posts = slugsFrom("src/lib/content/blog.ts", [
    "skilky-koshtuye-lending-ukrayina",
    "skilky-koshtuye-internet-magazyn",
    "nextjs-chy-wordpress",
    "yak-zamovyty-sayt-pid-klyuch",
    "skilky-koshtuye-sayt-pid-klyuch-ukrayina",
    "landing-pid-google-ads",
    "ndx-ne-nasdaq",
    "shcho-take-ndx-diachenko",
  ]);
  const paths = [
    "/",
    "/poslugy",
    ...services.map((s) => `/poslugy/${s}`),
    "/keysy",
    ...cases.map((c) => `/keysy/${c}`),
    "/blog",
    ...posts.map((p) => `/blog/${p}`),
    "/pro-mene",
    "/zayavka",
    "/kontakt",
    "/polityka",
  ];
  return paths.map((p) => (p === "/" ? SITE : `${SITE}${p}`));
}

function coverage(urls) {
  const paths = urls.map((u) => {
    try {
      const p = new URL(u).pathname.replace(/\/$/, "");
      return p || "/";
    } catch {
      return u;
    }
  });
  const has = (p) => paths.includes(p);
  const children = (prefix) => paths.filter((x) => x.startsWith(`${prefix}/`)).length;
  return {
    total: urls.length,
    home: has("/"),
    blog: has("/blog"),
    blogPosts: children("/blog"),
    poslugy: has("/poslugy"),
    poslugyPages: children("/poslugy"),
    keysy: has("/keysy"),
    keysyPages: children("/keysy"),
    zayavka: has("/zayavka"),
    ok:
      has("/") &&
      has("/blog") &&
      children("/blog") >= 1 &&
      has("/poslugy") &&
      children("/poslugy") >= 1 &&
      has("/keysy") &&
      children("/keysy") >= 1 &&
      has("/zayavka"),
  };
}

async function fetchSitemapUrls() {
  const sitemapUrl = `${base}/sitemap.xml`;
  const res = await fetch(sitemapUrl, {
    headers: { "User-Agent": UA, Accept: "application/xml,text/xml,*/*" },
  });
  if (!res.ok) {
    throw new Error(`sitemap ${res.status} ${sitemapUrl}`);
  }
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].trim(),
  );
  if (!locs.length) throw new Error("sitemap had no <loc>");
  return locs.filter((u) => u.startsWith(SITE) || u.startsWith(base));
}

async function ping(urls) {
  const payload = {
    host: "ndx.com.ua",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": UA },
    body: JSON.stringify(payload),
  });
  const body = await res.text().catch(() => "");
  return { ok: res.ok || res.status === 202, status: res.status, body };
}

let urls;
let source = "local-content";
try {
  urls = await fetchSitemapUrls();
  source = `sitemap:${base}/sitemap.xml`;
} catch (err) {
  console.warn(`Sitemap fetch failed (${err.message}); using local content list.`);
  urls = localSitemapUrls();
}

const cov = coverage(urls);
console.log(JSON.stringify({ source, coverage: cov, sample: urls.slice(0, 8) }, null, 2));

if (!cov.ok) {
  console.error("IndexNow coverage incomplete — expected /blog, /blog/*, /poslugy/*, /keysy/*, /zayavka.");
  process.exit(1);
}

if (dryRun) {
  console.log(`Dry run: would ping ${urls.length} URLs.`);
  process.exit(0);
}

const result = await ping(urls);
console.log(JSON.stringify({ ...result, count: urls.length }, null, 2));
if (!result.ok) process.exit(1);
