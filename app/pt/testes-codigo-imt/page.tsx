import "@/lib/banks/ptimt";
import type { Metadata } from "next";
import content from "@/lib/landings/ptimt.pt.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("ptimt", "pt", c);

export default function Page() {
  return <TranslatedExamLanding examId="ptimt" lang="pt" content={c} samples related />;
}
