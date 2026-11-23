import "@/lib/banks/frcaces";
import type { Metadata } from "next";
import content from "@/lib/landings/frcaces.fr.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("frcaces", "fr", c);

export default function Page() {
  return <TranslatedExamLanding examId="frcaces" lang="fr" content={c} samples related />;
}
