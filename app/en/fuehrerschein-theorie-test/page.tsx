import "@/lib/banks/detheorie";
import type { Metadata } from "next";
import content from "@/lib/landings/detheorie.en.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("detheorie", "en", c);

export default function Page() {
  return <TranslatedExamLanding examId="detheorie" lang="en" content={c} samples related />;
}
