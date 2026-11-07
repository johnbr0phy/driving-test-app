import "@/lib/banks/semoto";
import type { Metadata } from "next";
import content from "@/lib/landings/semoto.sv.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("semoto", "sv", c);

export default function Page() {
  return <TranslatedExamLanding examId="semoto" lang="sv" content={c} samples related />;
}
