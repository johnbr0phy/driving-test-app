import type { Metadata } from "next";
import content from "@/lib/landings/osha.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("osha", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="osha" lang="es" content={c} />;
}
