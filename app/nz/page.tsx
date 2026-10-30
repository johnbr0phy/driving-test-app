import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The New Zealand homepage (lib/region.ts). A first visit to "/" from New Zealand lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("NZ");

export default function HomeNZ() {
  return <HomePage region="NZ" />;
}
