import "@/lib/banks/itcils";
import type { Metadata } from "next";
import content from "@/lib/landings/itcils.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("itcils", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="itcils" lang="it" content={c} samples related />;
}
