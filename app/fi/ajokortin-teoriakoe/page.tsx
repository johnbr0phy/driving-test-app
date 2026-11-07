import "@/lib/banks/fitheory";
import type { Metadata } from "next";
import content from "@/lib/landings/fitheory.fi.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("fitheory", "fi", c);

export default function Page() {
  return <TranslatedExamLanding examId="fitheory" lang="fi" content={c} samples related />;
}
