import "@/lib/banks/frvtc";
import type { Metadata } from "next";
import content from "@/lib/landings/frvtc.fr.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("frvtc", "fr", c);

export default function Page() {
  return <TranslatedExamLanding examId="frvtc" lang="fr" content={c} samples related />;
}
