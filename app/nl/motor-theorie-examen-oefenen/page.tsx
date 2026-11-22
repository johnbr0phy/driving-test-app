import "@/lib/banks/nlmoto";
import type { Metadata } from "next";
import content from "@/lib/landings/nlmoto.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("nlmoto", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="nlmoto" lang="nl" content={c} samples related />;
}
