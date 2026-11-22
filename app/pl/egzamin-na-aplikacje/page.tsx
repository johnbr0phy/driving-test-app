import "@/lib/banks/plaplik";
import type { Metadata } from "next";
import content from "@/lib/landings/plaplik.pl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("plaplik", "pl", c);

export default function Page() {
  return <TranslatedExamLanding examId="plaplik" lang="pl" content={c} samples related />;
}
