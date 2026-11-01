import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Romania homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("RO");

export default function HomeRO() {
  return <HomePage region="RO" />;
}
