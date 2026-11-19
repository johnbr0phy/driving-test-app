import "@/lib/banks/ita2";
import type { Metadata } from "next";
import content from "@/lib/landings/ita2.it.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("ita2", "it", c);

export default function Page() {
  return <TranslatedExamLanding examId="ita2" lang="it" content={c} samples related />;
}
