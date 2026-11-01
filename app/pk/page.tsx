import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Pakistan homepage (lib/region.ts). A first visit to "/" from that country lands here.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PK");

export default function HomePK() {
  return <HomePage region="PK" />;
}
