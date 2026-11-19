import "@/lib/banks/itcilsb2";
import type { Metadata } from "next";
import content from "@/lib/landings/itcilsb2.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("itcilsb2", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="itcilsb2" lang="it" content={c} samples related />;
}
