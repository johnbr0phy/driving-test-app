import "@/lib/banks/bedriving";
import type { Metadata } from "next";
import content from "@/lib/landings/bedriving.nl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("bedriving", "nl", c);

export default function Page() {
  return <TranslatedExamLanding examId="bedriving" lang="nl" content={c} samples related />;
}
