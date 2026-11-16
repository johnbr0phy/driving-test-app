import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Switzerland homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("CH");

export default function HomeCH() {
  return <HomePage region="CH" />;
}
