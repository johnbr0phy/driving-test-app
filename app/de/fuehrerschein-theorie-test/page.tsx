import "@/lib/banks/detheorie";
import type { Metadata } from "next";
import content from "@/lib/landings/detheorie.de.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("detheorie", "de", c);

export default function Page() {
  return <TranslatedExamLanding examId="detheorie" lang="de" content={c} samples related />;
}
