import type { Metadata } from "next";
import content from "@/lib/landings/epa608.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("epa608", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="epa608" lang="es" content={c} />;
}
