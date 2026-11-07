import "@/lib/banks/hubizt";
import type { Metadata } from "next";
import content from "@/lib/landings/hubizt.hu.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("hubizt", "hu", c);

export default function Page() {
  return <TranslatedExamLanding examId="hubizt" lang="hu" content={c} samples related />;
}
