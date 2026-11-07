import "@/lib/banks/dkindfoed";
import type { Metadata } from "next";
import content from "@/lib/landings/dkindfoed.da.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("dkindfoed", "da", c);

export default function Page() {
  return <TranslatedExamLanding examId="dkindfoed" lang="da" content={c} samples related />;
}
