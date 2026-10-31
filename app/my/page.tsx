import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Malaysia homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("MY");

export default function HomeMY() {
  return <HomePage region="MY" />;
}
