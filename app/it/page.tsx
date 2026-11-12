import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Italy homepage (lib/region.ts), in Italian (REGIONS[].lang). A first visit to "/" from
// Italy lands here. Its CTA and local section show once Italy's tests are in the catalog.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("IT");

export default function HomeIT() {
  return <HomePage region="IT" />;
}
