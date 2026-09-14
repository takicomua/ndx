import { CASE_PAGES } from "@/lib/content/cases";
import { BLOG_POSTS } from "@/lib/content/blog";
import { SERVICE_PAGES } from "@/lib/content/services";
import { SITE } from "@/lib/constants";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
};

/** Canonical paths for sitemap + IndexNow */
export function getSitemapEntries(): SitemapEntry[] {
  return [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/poslugy", priority: 0.9, changeFrequency: "weekly" },
    ...SERVICE_PAGES.map((s) => ({
      path: `/poslugy/${s.slug}`,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
    { path: "/keysy", priority: 0.8, changeFrequency: "weekly" },
    ...CASE_PAGES.map((c) => ({
      path: `/keysy/${c.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
    ...BLOG_POSTS.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    { path: "/pro-mene", priority: 0.8, changeFrequency: "monthly" },
    { path: "/zayavka", priority: 0.85, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/polityka", priority: 0.3, changeFrequency: "yearly" },
  ];
}

export function getIndexableUrls(): string[] {
  return getSitemapEntries().map((e) =>
    e.path === "/" ? SITE.url : `${SITE.url}${e.path}`,
  );
}

export type IndexNowCoverage = {
  total: number;
  home: boolean;
  blog: boolean;
  blogPosts: number;
  poslugy: boolean;
  poslugyPages: number;
  keysy: boolean;
  keysyPages: number;
  zayavka: boolean;
  ok: boolean;
};

export function getIndexNowCoverage(
  urls: string[] = getIndexableUrls(),
): IndexNowCoverage {
  const paths = urls.map((u) => {
    try {
      const p = new URL(u).pathname.replace(/\/$/, "");
      return p || "/";
    } catch {
      return u;
    }
  });
  const has = (p: string) => paths.includes(p);
  const children = (prefix: string) =>
    paths.filter((x) => x.startsWith(`${prefix}/`)).length;

  const blogPosts = children("/blog");
  const poslugyPages = children("/poslugy");
  const keysyPages = children("/keysy");

  return {
    total: urls.length,
    home: has("/"),
    blog: has("/blog"),
    blogPosts,
    poslugy: has("/poslugy"),
    poslugyPages,
    keysy: has("/keysy"),
    keysyPages,
    zayavka: has("/zayavka"),
    ok:
      has("/") &&
      has("/blog") &&
      blogPosts >= 1 &&
      has("/poslugy") &&
      poslugyPages >= 1 &&
      has("/keysy") &&
      keysyPages >= 1 &&
      has("/zayavka"),
  };
}
