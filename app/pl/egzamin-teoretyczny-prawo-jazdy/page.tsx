import "@/lib/banks/plteoria";
import type { Metadata } from "next";
import content from "@/lib/landings/plteoria.pl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("plteoria", "pl", c);

export default function Page() {
  return <TranslatedExamLanding examId="plteoria" lang="pl" content={c} samples related />;
}
