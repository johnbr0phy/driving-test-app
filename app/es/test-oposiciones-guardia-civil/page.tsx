import "@/lib/banks/esguardia";
import type { Metadata } from "next";
import content from "@/lib/landings/esguardia.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("esguardia", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="esguardia" lang="es" content={c} samples related />;
}
