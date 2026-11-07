import "@/lib/banks/deheilpr";
import type { Metadata } from "next";
import content from "@/lib/landings/deheilpr.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("deheilpr", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="deheilpr" lang="de" content={c} samples related />;
}
