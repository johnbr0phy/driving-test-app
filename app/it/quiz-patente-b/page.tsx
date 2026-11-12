import "@/lib/banks/itpatente";
import type { Metadata } from "next";
import content from "@/lib/landings/itpatente.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("itpatente", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="itpatente" lang="it" content={c} samples related />;
}
