import "@/lib/banks/grsecurity";
import type { Metadata } from "next";
import content from "@/lib/landings/grsecurity.el.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("grsecurity", "el", c);

export default function Page() {
  return <TranslatedExamLanding examId="grsecurity" lang="el" content={c} samples related />;
}
