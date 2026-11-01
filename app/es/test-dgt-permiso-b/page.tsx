import "@/lib/banks/esdgt";
import type { Metadata } from "next";
import content from "@/lib/landings/esdgt.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("esdgt", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="esdgt" lang="es" content={c} samples related />;
}
