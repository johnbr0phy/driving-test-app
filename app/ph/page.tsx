import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Philippines homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PH");

export default function HomePH() {
  return <HomePage region="PH" />;
}
