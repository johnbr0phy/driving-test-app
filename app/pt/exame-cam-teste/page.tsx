import "@/lib/banks/ptcam";
import type { Metadata } from "next";
import content from "@/lib/landings/ptcam.pt.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("ptcam", "pt", c);

export default function Page() {
  return <TranslatedExamLanding examId="ptcam" lang="pt" content={c} samples related />;
}
