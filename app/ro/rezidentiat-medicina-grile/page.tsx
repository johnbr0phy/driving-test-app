import "@/lib/banks/rorezid";
import type { Metadata } from "next";
import content from "@/lib/landings/rorezid.ro.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("rorezid", "ro", c);

export default function Page() {
  return <TranslatedExamLanding examId="rorezid" lang="ro" content={c} samples related />;
}
