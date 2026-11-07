import "@/lib/banks/hukresz";
import type { Metadata } from "next";
import content from "@/lib/landings/hukresz.hu.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("hukresz", "hu", c);

export default function Page() {
  return <TranslatedExamLanding examId="hukresz" lang="hu" content={c} samples related />;
}
