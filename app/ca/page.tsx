import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Canada homepage (lib/region.ts). A first visit to "/" from Canada lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("CA");

export default function HomeCA() {
  return <HomePage region="CA" />;
}
