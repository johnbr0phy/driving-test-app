import "@/lib/banks/bevracht";
import type { Metadata } from "next";
import content from "@/lib/landings/bevracht.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("bevracht", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="bevracht" lang="nl" content={c} samples related />;
}
