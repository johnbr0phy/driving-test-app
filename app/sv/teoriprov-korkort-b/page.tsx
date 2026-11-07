import "@/lib/banks/setrafik";
import type { Metadata } from "next";
import content from "@/lib/landings/setrafik.sv.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("setrafik", "sv", c);

export default function Page() {
  return <TranslatedExamLanding examId="setrafik" lang="sv" content={c} samples related />;
}
