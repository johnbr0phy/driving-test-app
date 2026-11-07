import "@/lib/banks/betoelating";
import type { Metadata } from "next";
import content from "@/lib/landings/betoelating.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("betoelating", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="betoelating" lang="nl" content={c} samples related />;
}
