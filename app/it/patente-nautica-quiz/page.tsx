import "@/lib/banks/itnautica";
import type { Metadata } from "next";
import content from "@/lib/landings/itnautica.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("itnautica", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="itnautica" lang="it" content={c} samples related />;
}
