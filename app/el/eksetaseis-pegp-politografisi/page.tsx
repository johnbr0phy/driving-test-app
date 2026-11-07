import "@/lib/banks/grcitizen";
import type { Metadata } from "next";
import content from "@/lib/landings/grcitizen.el.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("grcitizen", "el", c);

export default function Page() {
  return <TranslatedExamLanding examId="grcitizen" lang="el" content={c} samples related />;
}
