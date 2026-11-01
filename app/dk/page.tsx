import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Denmark homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("DK");

export default function HomeDK() {
  return <HomePage region="DK" />;
}
