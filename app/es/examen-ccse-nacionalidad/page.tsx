import "@/lib/banks/esccse";
import type { Metadata } from "next";
import content from "@/lib/landings/esccse.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("esccse", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="esccse" lang="es" content={c} samples related />;
}
