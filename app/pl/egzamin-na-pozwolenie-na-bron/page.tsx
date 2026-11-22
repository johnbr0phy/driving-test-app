import "@/lib/banks/plbron";
import type { Metadata } from "next";
import content from "@/lib/landings/plbron.pl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("plbron", "pl", c);

export default function Page() {
  return <TranslatedExamLanding examId="plbron" lang="pl" content={c} samples related />;
}
