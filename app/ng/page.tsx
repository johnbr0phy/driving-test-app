import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Nigeria homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("NG");

export default function HomeNG() {
  return <HomePage region="NG" />;
}
