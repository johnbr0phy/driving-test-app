import "@/lib/banks/nltheorie";
import type { Metadata } from "next";
import content from "@/lib/landings/nltheorie.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("nltheorie", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="nltheorie" lang="nl" content={c} samples related />;
}
