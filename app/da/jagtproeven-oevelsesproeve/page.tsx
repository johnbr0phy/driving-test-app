import "@/lib/banks/dkjagt";
import type { Metadata } from "next";
import content from "@/lib/landings/dkjagt.da.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("dkjagt", "da", c);

export default function Page() {
  return <TranslatedExamLanding examId="dkjagt" lang="da" content={c} samples related />;
}
