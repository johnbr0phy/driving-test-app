import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Hungary homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("HU");

export default function HomeHU() {
  return <HomePage region="HU" />;
}
