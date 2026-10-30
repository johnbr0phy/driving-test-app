import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The UK homepage (lib/region.ts). A first visit to "/" from the UK lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("UK");

export default function HomeUK() {
  return <HomePage region="UK" />;
}
