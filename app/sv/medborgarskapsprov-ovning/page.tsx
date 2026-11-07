import "@/lib/banks/semedb";
import type { Metadata } from "next";
import content from "@/lib/landings/semedb.sv.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("semedb", "sv", c);

export default function Page() {
  return <TranslatedExamLanding examId="semedb" lang="sv" content={c} samples related />;
}
