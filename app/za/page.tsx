import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The South Africa homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("ZA");

export default function HomeZA() {
  return <HomePage region="ZA" />;
}
