import "@/lib/banks/pttvde";
import type { Metadata } from "next";
import content from "@/lib/landings/pttvde.pt.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("pttvde", "pt", c);

export default function Page() {
  return <TranslatedExamLanding examId="pttvde" lang="pt" content={c} samples related />;
}
