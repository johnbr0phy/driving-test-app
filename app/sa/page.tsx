import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Saudi Arabia homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("SA");

export default function HomeSA() {
  return <HomePage region="SA" />;
}
