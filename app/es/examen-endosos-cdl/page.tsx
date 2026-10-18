import type { Metadata } from "next";
import content from "@/lib/landings/cdlx.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("cdlx", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="cdlx" lang="es" content={c} />;
}
