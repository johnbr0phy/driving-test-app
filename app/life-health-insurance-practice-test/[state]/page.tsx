import "@/lib/banks/lifeHealthStates";
import { notFound } from "next/navigation";
import { StateExamLanding, stateLandingMetadata } from "@/components/exam/StateExamLanding";
import { stateLandingParams, stateVariantBySlug } from "@/lib/stateLandings";

// One indexable landing per state version (lib/stateLandings.ts).
export const dynamicParams = false;
export const generateStaticParams = () => stateLandingParams("insurance");

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const variant = stateVariantBySlug("insurance", (await params).state);
  return variant ? stateLandingMetadata(variant) : {};
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const variant = stateVariantBySlug("insurance", (await params).state);
  if (!variant) notFound();
  return <StateExamLanding variant={variant} shots={{ mobile: "/landing/insurance-mobile.png", desktop: "/landing/insurance-desktop.png" }} />;
}
