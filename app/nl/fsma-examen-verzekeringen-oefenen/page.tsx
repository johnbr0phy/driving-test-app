import "@/lib/banks/befsmavz";
import type { Metadata } from "next";
import content from "@/lib/landings/befsmavz.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("befsmavz", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="befsmavz" lang="nl" content={c} samples related />;
}
