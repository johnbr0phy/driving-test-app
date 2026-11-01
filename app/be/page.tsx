import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Belgium homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("BE");

export default function HomeBE() {
  return <HomePage region="BE" />;
}
