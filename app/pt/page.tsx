import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Portugal homepage (lib/region.ts), in Portuguese (REGIONS[].lang). A first visit to "/" from Portugal lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PT");

export default function HomePT() {
  return <HomePage region="PT" />;
}
