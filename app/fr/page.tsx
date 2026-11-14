import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The France homepage (lib/region.ts), in French (REGIONS[].lang). A first visit to "/" from
// France lands here. Its CTA and local section show once France's tests are in the catalog.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("FR");

export default function HomeFR() {
  return <HomePage region="FR" />;
}
