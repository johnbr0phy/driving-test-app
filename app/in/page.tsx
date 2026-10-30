import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The India homepage (lib/region.ts). A first visit to "/" from India lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("IN");

export default function HomeIN() {
  return <HomePage region="IN" />;
}
