import "@/lib/banks/roadmed";
import type { Metadata } from "next";
import content from "@/lib/landings/roadmed.ro.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("roadmed", "ro", c);

export default function Page() {
  return <TranslatedExamLanding examId="roadmed" lang="ro" content={c} samples related />;
}
