import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Portugal homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PT");

export default function HomePT() {
  return <HomePage region="PT" />;
}
