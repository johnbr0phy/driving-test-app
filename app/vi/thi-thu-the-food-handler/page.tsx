import type { Metadata } from "next";
import content from "@/lib/landings/foodhandler.vi.json";
import { TranslatedExamLanding, translatedLandingMetadata, type TranslatedLandingContent } from "@/components/exam/TranslatedExamLanding";

const c = content as TranslatedLandingContent;

export const metadata: Metadata = translatedLandingMetadata("foodhandler", "vi", c);

export default function Page() {
  return <TranslatedExamLanding examId="foodhandler" lang="vi" content={c} />;
}
