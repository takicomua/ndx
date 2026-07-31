import { headers } from "next/headers";
import { HomePage } from "@/components/home/page";
import { isSeoCrawler } from "@/lib/seo-helpers";

/** Homepage — bots skip intro so content is indexable on first HTML. */
export default async function Home() {
  const ua = (await headers()).get("user-agent");
  return <HomePage skipIntro={isSeoCrawler(ua)} />;
}
