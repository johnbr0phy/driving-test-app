import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Belgium homepage (lib/region.ts), in Dutch (REGIONS[].lang). A first visit to "/" from Belgium lands here.
// The Belgian theory test itself is in English, which the page says.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("BE");

export default function HomeBE() {
  return (
    <div lang="nl">
      <HomePage region="BE" />
    </div>
  );
}
