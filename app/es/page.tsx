import { HomePage, countryHomeMetadata } from "@/components/home/HomePage";

// The Spain homepage (lib/region.ts), in English. A first visit to "/" from that country lands here.
// app/es/layout.tsx wraps every /es page in lang="es" (the US Spanish-language pages), so this
// English page declares its own language.
export const revalidate = 3600;

export const metadata = countryHomeMetadata("ES");

export default function HomeES() {
  return (
    <div lang="en">
      <HomePage region="ES" />
    </div>
  );
}
