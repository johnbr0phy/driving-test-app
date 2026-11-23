// The /teach landing for instructors, in the style of the DMV homepage and
// the exam landings: hero with live mockups, how it works, what you see,
// every test on the site, FAQ, final call to action.

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { useTeachCopy } from "@/components/teach/useTeachCopy";
import { GB_GROUP_TITLES } from "@/components/teach/teachCopy";
import { BarChart3, FileText, Gift, Link2, Lock, Mail, MonitorSmartphone, Plus, Smartphone } from "lucide-react";
import { TEST_CATALOG, TEST_GROUPS } from "@/lib/testCatalog";
import TeachClassDemo from "@/components/stageshow/demos/TeachClassDemo";
import { ClassQuestions } from "@/components/teach/ClassQuestions";
import { TeachLandingTracker } from "@/components/teach/TeachLandingTracker";
import type { ClassQuestionRow } from "@/lib/classes";

// Class counts for the sample questions; picks follow each question's options.
const SAMPLE_COUNTS = [
  { answered: 16, missed: 9, picks: [6, 0, 2, 1] },
  { answered: 17, missed: 6, picks: [4, 1, 0, 1] },
  { answered: 15, missed: 4, picks: [1, 0, 3, 0] },
];

const STEP_ICONS = [Plus, Link2, Smartphone, BarChart3];
const SEE_ICONS = [BarChart3, MonitorSmartphone, Lock];

const ctaClass =
  "inline-flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-lg font-medium rounded-full";

export function TeachLanding({ signedIn }: { signedIn: boolean }) {
  const { englishLocale } = useTranslation();
  const c = useTeachCopy();
  const groupTitles: Record<string, string> = englishLocale === "en-GB" && c.locale === "en-GB" ? GB_GROUP_TITLES : {};
  const faq = c.faq;
  const questions: ClassQuestionRow[] = c.sampleQuestions.map((q, i) => ({
    questionId: `sample-${i + 1}`,
    question: q.question,
    options: q.options,
    answer: q.options[q.answer],
    topic: q.topic,
    explanation: q.explanation,
    ...SAMPLE_COUNTS[i],
  }));
  // Everyone goes straight to the form; signed-out teachers sign in when
  // they press Create (sending them to /signup first lost 7 in 8).
  const newClass = (exam?: string) => `/teach/new${exam ? `?exam=${exam}` : ""}`;
  const testCount = TEST_CATALOG.length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeachLandingTracker />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight text-balance">
            {c.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-pretty">
            {c.heroSub}
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link href={newClass()} className={ctaClass}>{c.createFreeClass}</Link>
            {!signedIn && (
              <Link href="/login?redirect=/teach" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline">
                {c.alreadyTeaching}
              </Link>
            )}
          </div>

          <div
            className="mt-16 mx-auto w-full max-w-[880px]"
            role="img"
            aria-label={c.demoAria}
          >
            <TeachClassDemo />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            {c.demoCaption}
          </p>
        </div>
      </div>

      {/* Numbers */}
      <div className="border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            [testCount.toLocaleString(c.locale), c.statTests],
            ["1", c.statLink],
            [c.freeAmount, c.statFree],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">{n}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-14">{c.howItWorks}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.steps.map(({ title, body }, i) => {
            const Icon = STEP_ICONS[i];
            return (
            <div key={title} className="relative pt-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
                <Icon className="w-7 h-7 text-brand-dark" aria-hidden="true" />
              </div>
              <div className="h-full bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 pt-12 text-center">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{c.step(i + 1)}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{body}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* What you see */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <div className="md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-3">{c.seeEyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-5">{c.seeTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {c.seeBody}
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              {c.seeBullets.map((text, i) => {
                const I = SEE_ICONS[i];
                return (
                  <li key={text} className="flex gap-3">
                    <I className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-dark" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 md:p-5 shadow-xl">
            <ClassQuestions questions={questions} headingLevel={3} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{c.sampleNote}</p>
          </div>
        </div>
      </div>

      {/* Instructor callout */}
      <div className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">{c.buildTitle}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-pretty">
            {c.buildBody}
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {c.getInTouch}
          </a>
        </div>
      </div>

      {/* Every test */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">{c.everyTestTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {c.everyTestBody}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEST_GROUPS.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-3">{groupTitles[g.title] ?? g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.tests.map((t) => (
                    <Link
                      key={t.id}
                      href={newClass(t.id)}
                      className="rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-200 hover:border-gray-900 dark:hover:border-gray-50 hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      {t.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-brand-dark" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">{c.notHereTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {c.notHereBody}
              </p>
            </div>
            <a
              href="mailto:john@tigertest.io?subject=Please%20build%20a%20test%20for%20my%20class"
              className="inline-flex items-center justify-center gap-1.5 flex-shrink-0 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 hover:border-gray-900 dark:hover:border-gray-50 px-6 py-3 font-medium"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> {c.contactMe}
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-10">{c.faqTitle}</h2>
        <div className="space-y-8">
          {faq.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Gift className="w-8 h-8 mx-auto mb-4 text-brand-dark" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{c.finalTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{c.finalBody}</p>
          <Link href={newClass()} className={ctaClass}>{c.createFreeClass}</Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
            {c.questionsEmail} <a href="mailto:john@tigertest.io" className="underline">john@tigertest.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
