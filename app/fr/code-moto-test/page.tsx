import "@/lib/banks/frmoto";
import type { Metadata } from "next";
import content from "@/lib/landings/frmoto.fr.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("frmoto", "fr", c);

export default function Page() {
  return <TranslatedExamLanding examId="frmoto" lang="fr" content={c} samples related />;
}
