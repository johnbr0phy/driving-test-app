import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Portugal homepage (lib/region.ts), in English. A first visit to "/" from that country lands here.
// app/pt/layout.tsx wraps every /pt page in lang="pt" (the Portuguese IMT landing), so this
// English page declares its own language.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("PT");

export default function HomePT() {
  return (
    <div lang="en">
      <HomePage region="PT" />
    </div>
  );
}
