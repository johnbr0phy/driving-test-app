import "@/lib/banks/nlbrom";
import type { Metadata } from "next";
import content from "@/lib/landings/nlbrom.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("nlbrom", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="nlbrom" lang="nl" content={c} samples related />;
}
