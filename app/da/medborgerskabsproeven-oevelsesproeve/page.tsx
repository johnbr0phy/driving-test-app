import "@/lib/banks/dkmedborger";
import type { Metadata } from "next";
import content from "@/lib/landings/dkmedborger.da.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("dkmedborger", "da", c);

export default function Page() {
  return <TranslatedExamLanding examId="dkmedborger" lang="da" content={c} samples related />;
}
