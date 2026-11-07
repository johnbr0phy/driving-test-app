import "@/lib/banks/sejakt";
import type { Metadata } from "next";
import content from "@/lib/landings/sejakt.sv.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("sejakt", "sv", c);

export default function Page() {
  return <TranslatedExamLanding examId="sejakt" lang="sv" content={c} samples related />;
}
