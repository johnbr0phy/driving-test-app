import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Ireland homepage (lib/region.ts). A first visit to "/" from Ireland lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("IE");

export default function HomeIE() {
  return <HomePage region="IE" />;
}
