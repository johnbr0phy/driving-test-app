import "@/lib/banks/dejagd";
import type { Metadata } from "next";
import content from "@/lib/landings/dejagd.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("dejagd", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="dejagd" lang="de" content={c} samples related />;
}
