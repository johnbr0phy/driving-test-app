import { notFound } from "next/navigation";
import { HomePage, homeMetadata } from "@/components/home/HomePage";
import { isRegion } from "@/lib/region";

// The homepage for the UK, Canada and Australia. middleware.ts serves these
// at "/" by the visitor's country cookie, so the canonical stays the root.
export const revalidate = 3600;
export const dynamicParams = false;

export const metadata = homeMetadata;

export function generateStaticParams() {
  return [{ region: "uk" }, { region: "ca" }, { region: "au" }];
}

export default async function RegionHome({ params }: { params: Promise<{ region: string }> }) {
  const region = (await params).region.toUpperCase();
  if (!isRegion(region) || region === "US") notFound();
  return <HomePage region={region} />;
}
