import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Kenya homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("KE");

export default function HomeKE() {
  return <HomePage region="KE" />;
}
