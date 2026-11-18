import "@/lib/banks/frcivique";
import type { Metadata } from "next";
import content from "@/lib/landings/frcivique.fr.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("frcivique", "fr", c);

export default function Page() {
  return <TranslatedExamLanding examId="frcivique" lang="fr" content={c} samples related />;
}
