import "@/lib/banks/ptvigil";
import type { Metadata } from "next";
import content from "@/lib/landings/ptvigil.pt.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("ptvigil", "pt", c);

export default function Page() {
  return <TranslatedExamLanding examId="ptvigil" lang="pt" content={c} samples related />;
}
