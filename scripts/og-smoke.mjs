/**
 * OG / title smoke check.
 *
 *   npm run og:smoke
 *   npm run og:smoke -- --base https://ndx.com.ua
 *   npm run og:smoke -- --base http://127.0.0.1:3000
 */
const UA = "NDX-OG-Smoke/1.0 (+https://ndx.com.ua)";
const HOME = "https://ndx.com.ua";

const baseArg = process.argv.find((a, i, all) => all[i - 1] === "--base");
const base = (baseArg || HOME).replace(/\/$/, "");

const PAGES = [
  { path: "/", label: "home" },
  { path: "/poslugy/sajty-ta-lendingy", label: "service" },
  { path: "/blog", label: "blog" },
  { path: "/zayavka", label: "zayavka" },
];

function attr(html, property) {
  const a = html.match(
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i",
    ),
  );
  if (a) return a[1];
  const b = html.match(
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
      "i",
    ),
  );
  return b ? b[1] : "";
}

async function check(path) {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [, ""])[1]
    .trim()
    .replace(/\s+/g, " ");
  const ogTitle = attr(html, "og:title");
  const ogUrl = attr(html, "og:url").replace(/\/$/, "") || "";
  const canonical = attr(html, "canonical");
  const expected = path === "/" ? HOME : `${HOME}${path}`;
  return {
    path,
    status: res.status,
    title,
    ogTitle,
    ogUrl,
    canonical,
    expectedOg: expected,
    ogOk: ogUrl === expected,
  };
}

const rows = [];
for (const page of PAGES) {
  rows.push(await check(page.path));
}

const homeOg = rows[0]?.ogUrl;
const titles = new Set(rows.map((r) => r.title));
const ogUrls = new Set(rows.map((r) => r.ogUrl));

console.log("URL → title → og:url");
console.log("--------------------");
for (const r of rows) {
  console.log(`${r.path}\t${r.status}\t${r.title}\t${r.ogUrl}`);
}

const innerShareHome = rows
  .slice(1)
  .filter((r) => r.ogUrl && r.ogUrl === homeOg);
const missingOg = rows.filter((r) => !r.ogOk);

let failed = false;
if (titles.size !== rows.length) {
  console.error("FAIL: titles are not unique");
  failed = true;
}
if (ogUrls.size !== rows.length) {
  console.error("FAIL: og:url values are not unique");
  failed = true;
}
if (innerShareHome.length) {
  console.error(
    "FAIL: inner pages inherited homepage og:url:",
    innerShareHome.map((r) => r.path).join(", "),
  );
  failed = true;
}
if (missingOg.length) {
  console.error(
    "FAIL: og:url mismatch:",
    missingOg.map((r) => `${r.path} got ${r.ogUrl || "(empty)"} expected ${r.expectedOg}`).join("; "),
  );
  failed = true;
}

if (failed) process.exit(1);
console.log("OK — unique titles; inner og:url ≠ homepage.");
