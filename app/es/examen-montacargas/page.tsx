import type { Metadata } from "next";
import content from "@/lib/landings/forklift.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("forklift", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="forklift" lang="es" content={c} />;
}
