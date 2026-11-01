import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Finland homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("FI");

export default function HomeFI() {
  return <HomePage region="FI" />;
}
