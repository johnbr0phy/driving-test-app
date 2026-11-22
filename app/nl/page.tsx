import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Netherlands homepage (lib/region.ts), in Dutch (REGIONS[].lang), inside the Dutch
// app/nl/layout.tsx. A first visit to "/" from the Netherlands lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("NL");

export default function HomeNL() {
  return <HomePage region="NL" />;
}
