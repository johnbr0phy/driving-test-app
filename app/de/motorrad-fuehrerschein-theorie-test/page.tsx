import "@/lib/banks/demotorrad";
import type { Metadata } from "next";
import content from "@/lib/landings/demotorrad.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("demotorrad", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="demotorrad" lang="de" content={c} samples related />;
}
