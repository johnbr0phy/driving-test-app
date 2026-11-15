import { ExamLandingHeroClient } from "@/components/exam/ExamLandingHeroClient";
import { pickLandingTryQuestion } from "@/lib/landingTryQuestion";
import type { Language } from "@/i18n";

export { ExamLandingCTA } from "@/components/exam/ExamLandingHeroClient";

// Server half of the exam landing hero: picks the playable "Try one now"
// question from the bank the page imported (none if it imported no bank),
// then renders the client hero (components/exam/ExamLandingHeroClient.tsx).
export function ExamLandingHero({
  tryQuestion = true,
  ...props
}: {
  dashboardHref: string;
  subtitle: string;
  shortName: string;
  shots: { mobile: string; desktop: string };
  lang?: Language;
  /** False where set 1 is not the right place to land (state versions). */
  tryQuestion?: boolean;
}) {
  const q = tryQuestion ? pickLandingTryQuestion(props.dashboardHref, props.lang) : null;
  return <ExamLandingHeroClient {...props} tryQuestion={q} />;
}
