import "@/lib/banks/huelsoseg";
import type { Metadata } from "next";
import content from "@/lib/landings/huelsoseg.hu.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("huelsoseg", "hu", c);

export default function Page() {
  return <TranslatedExamLanding examId="huelsoseg" lang="hu" content={c} samples related />;
}
