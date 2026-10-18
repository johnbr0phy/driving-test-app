import type { Metadata } from "next";
import content from "@/lib/landings/foodhandler.ko.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("foodhandler", "ko", c);

export default function Page() {
  return <TranslatedExamLanding examId="foodhandler" lang="ko" content={c} />;
}
