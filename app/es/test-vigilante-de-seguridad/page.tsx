import "@/lib/banks/esvigilante";
import type { Metadata } from "next";
import content from "@/lib/landings/esvigilante.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("esvigilante", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="esvigilante" lang="es" content={c} samples related />;
}
