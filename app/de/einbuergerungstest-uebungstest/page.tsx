import "@/lib/banks/deeinb";
import type { Metadata } from "next";
import content from "@/lib/landings/deeinb.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("deeinb", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="deeinb" lang="de" content={c} samples related />;
}
