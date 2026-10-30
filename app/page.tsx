import { HomePage, homeMetadata } from "@/components/home/HomePage";

// Re-rank "Popular this week" from live answer counts once an hour.
export const revalidate = 3600;

export const metadata = homeMetadata;

// The US homepage, and what crawlers see. Other countries: app/home/[region].
export default function Home() {
  return <HomePage region="US" />;
}
