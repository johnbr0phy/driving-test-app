import "@/lib/banks/grdriving";
import type { Metadata } from "next";
import content from "@/lib/landings/grdriving.el.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("grdriving", "el", c);

export default function Page() {
  return <TranslatedExamLanding examId="grdriving" lang="el" content={c} samples related />;
}
