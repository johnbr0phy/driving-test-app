import "@/lib/banks/plcpc";
import type { Metadata } from "next";
import content from "@/lib/landings/plcpc.pl.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("plcpc", "pl", c);

export default function Page() {
  return <TranslatedExamLanding examId="plcpc" lang="pl" content={c} samples related />;
}
