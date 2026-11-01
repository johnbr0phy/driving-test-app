import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Malta homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("MT");

export default function HomeMT() {
  return <HomePage region="MT" />;
}
