import "@/lib/banks/nlwft";
import type { Metadata } from "next";
import content from "@/lib/landings/nlwft.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("nlwft", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="nlwft" lang="nl" content={c} samples related />;
}
