import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Spain homepage (lib/region.ts), in Spanish (REGIONS[].lang). A first visit to "/" from Spain lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("ES");

export default function HomeES() {
  return <HomePage region="ES" />;
}
