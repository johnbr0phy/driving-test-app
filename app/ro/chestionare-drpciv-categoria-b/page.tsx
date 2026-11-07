import "@/lib/banks/rodrpciv";
import type { Metadata } from "next";
import content from "@/lib/landings/rodrpciv.ro.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("rodrpciv", "ro", c);

export default function Page() {
  return <TranslatedExamLanding examId="rodrpciv" lang="ro" content={c} samples related />;
}
