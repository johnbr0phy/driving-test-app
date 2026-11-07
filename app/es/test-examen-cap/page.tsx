import "@/lib/banks/escapcond";
import type { Metadata } from "next";
import content from "@/lib/landings/escapcond.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("escapcond", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="escapcond" lang="es" content={c} samples related />;
}
