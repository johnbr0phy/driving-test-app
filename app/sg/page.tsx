import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Singapore homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("SG");

export default function HomeSG() {
  return <HomePage region="SG" />;
}
