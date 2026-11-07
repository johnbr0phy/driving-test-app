import "@/lib/banks/deaevo";
import type { Metadata } from "next";
import content from "@/lib/landings/deaevo.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("deaevo", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="deaevo" lang="de" content={c} samples related />;
}
