import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Germany homepage (lib/region.ts), in German (REGIONS[].lang). A first visit to "/" from
// Germany lands here. Until Germany's first test is in the catalog it lists the worldwide tests.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("DE");

export default function HomeDE() {
  return <HomePage region="DE" />;
}
