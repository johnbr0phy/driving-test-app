import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Sweden homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("SE");

export default function HomeSE() {
  return <HomePage region="SE" />;
}
