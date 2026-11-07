import "@/lib/banks/grinsure";
import type { Metadata } from "next";
import content from "@/lib/landings/grinsure.el.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("grinsure", "el", c);

export default function Page() {
  return <TranslatedExamLanding examId="grinsure" lang="el" content={c} samples related />;
}
