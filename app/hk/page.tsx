import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Hong Kong homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("HK");

export default function HomeHK() {
  return <HomePage region="HK" />;
}
