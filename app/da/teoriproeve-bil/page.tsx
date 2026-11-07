import "@/lib/banks/dkteori";
import type { Metadata } from "next";
import content from "@/lib/landings/dkteori.da.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("dkteori", "da", c);

export default function Page() {
  return <TranslatedExamLanding examId="dkteori" lang="da" content={c} samples related />;
}
