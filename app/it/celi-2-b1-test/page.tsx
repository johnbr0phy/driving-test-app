import "@/lib/banks/itceli";
import type { Metadata } from "next";
import content from "@/lib/landings/itceli.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("itceli", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="itceli" lang="it" content={c} samples related />;
}
