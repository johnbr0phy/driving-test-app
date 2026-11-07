import "@/lib/banks/fihunt";
import type { Metadata } from "next";
import content from "@/lib/landings/fihunt.fi.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("fihunt", "fi", c);

export default function Page() {
  return <TranslatedExamLanding examId="fihunt" lang="fi" content={c} samples related />;
}
