import "@/lib/banks/propertyCasualtyStates";
import { notFound } from "next/navigation";
import { StateExamLanding, stateLandingMetadata } from "@/components/exam/StateExamLanding";
import { stateLandingParams, stateVariantBySlug } from "@/lib/stateLandings";

// One indexable landing per state version (lib/stateLandings.ts).
export const dynamicParams = false;
export const generateStaticParams = () => stateLandingParams("pnc");

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const variant = stateVariantBySlug("pnc", (await params).state);
  return variant ? stateLandingMetadata(variant) : {};
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const variant = stateVariantBySlug("pnc", (await params).state);
  if (!variant) notFound();
  return <StateExamLanding variant={variant} shots={{ mobile: "/landing/pnc-mobile.png", desktop: "/landing/pnc-desktop.png" }} />;
}
