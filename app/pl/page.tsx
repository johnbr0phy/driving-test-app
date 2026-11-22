import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Poland homepage (lib/region.ts), in Polish (REGIONS[].lang). A first visit to "/" from
// Poland lands here. Its CTA and local section show once Poland's tests are in the catalog.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PL");

export default function HomePL() {
  return <HomePage region="PL" />;
}
