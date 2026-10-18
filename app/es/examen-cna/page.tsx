import type { Metadata } from "next";
import content from "@/lib/landings/cna.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("cna", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="cna" lang="es" content={c} />;
}
