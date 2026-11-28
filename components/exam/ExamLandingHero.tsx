import { ExamLandingHeroClient } from "@/components/exam/ExamLandingHeroClient";
import { RichTextStatic } from "@/components/v2/richTextNodes";
import type { TryRichNodes } from "@/components/exam/LandingTryQuestion";
import { pickLandingTryQuestion } from "@/lib/landingTryQuestion";
import type { Language } from "@/i18n";

export { ExamLandingCTA } from "@/components/exam/ExamLandingHeroClient";

// Server half of the exam landing hero: picks the playable "Try one now"
// question from the bank the page imported (none if it imported no bank),
// then renders the client hero (components/exam/ExamLandingHeroClient.tsx).
// A rich v2 question (bold, KaTeX, a passage) is drawn here, on the server,
// so KaTeX never ships to the browser; its CSS comes from the page's
// SampleQuestionsV2, which every v2 landing renders.
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
  const rich: TryRichNodes | undefined = q?.rich
    ? {
        stem: <RichTextStatic text={q.stem} />,
        options: q.options.map((o, i) => <RichTextStatic key={i} text={o} />),
        explanation: <RichTextStatic text={q.explanation} />,
        passage: q.passage ? (
          <>
            {q.passage.title && <RichTextStatic text={q.passage.title} className="font-semibold mb-2" />}
            <RichTextStatic text={q.passage.text} />
          </>
        ) : undefined,
      }
    : undefined;
  return <ExamLandingHeroClient key={props.dashboardHref} {...props} tryQuestion={q} tryRich={rich} />;
}
