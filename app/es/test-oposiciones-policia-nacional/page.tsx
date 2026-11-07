import "@/lib/banks/espolicia";
import type { Metadata } from "next";
import content from "@/lib/landings/espolicia.es.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("espolicia", "es", c);

export default function Page() {
  return <TranslatedExamLanding examId="espolicia" lang="es" content={c} samples related />;
}
