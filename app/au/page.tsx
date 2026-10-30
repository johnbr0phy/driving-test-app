import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Australia homepage (lib/region.ts). A first visit to "/" from Australia lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("AU");

export default function HomeAU() {
  return <HomePage region="AU" />;
}
