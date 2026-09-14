import { HomePage } from "@/components/home/page";

/** Homepage — SSR renders services/FAQ for indexing; client form hydrates separately. */
export default function Home() {
  return <HomePage />;
}
