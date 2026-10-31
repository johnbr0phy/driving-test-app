import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The UAE homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("AE");

export default function HomeAE() {
  return <HomePage region="AE" />;
}
