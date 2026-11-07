import "@/lib/banks/de34a";
import type { Metadata } from "next";
import content from "@/lib/landings/de34a.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("de34a", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="de34a" lang="de" content={c} samples related />;
}
