import type { Metadata } from "next";
import { HomePage } from "@/components/home/page";
import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: SITE.title,
    description: SITE.description,
    path: "/",
  }),
  title: { absolute: SITE.title },
};

/** Homepage — SSR renders services/FAQ for indexing; client form hydrates separately. */
export default function Home() {
  return <HomePage />;
}
