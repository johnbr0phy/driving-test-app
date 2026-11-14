import "@/lib/banks/frcode";
import type { Metadata } from "next";
import content from "@/lib/landings/frcode.fr.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("frcode", "fr", c);

export default function Page() {
  return <TranslatedExamLanding examId="frcode" lang="fr" content={c} samples related />;
}
