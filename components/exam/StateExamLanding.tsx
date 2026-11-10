import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamConfig, getExamById } from "@/lib/exams";
import { examOffers } from "@/lib/examSeo";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { STATE_EXAM_LANDINGS_UPDATED_AT } from "@/lib/seoDates";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { SITE_URL } from "@/lib/siteUrl";
import {
  FAMILY_TERMS,
  STATE_FAMILIES,
  StateFamily,
  stateExamFacts,
  stateLandingPath,
  stateVariants,
} from "@/lib/stateLandings";

/**
 * The indexable landing of one state version of an exam family, e.g.
 * /real-estate-practice-test/california. Everything on it comes from the
 * state's ExamConfig, its bank and its official facts (lib/stateLandings.ts),
 * so a new state gets a page by being added to EXAM_VARIANTS. Server
 * component: the route imports the family's state banks first.
 */

const YEAR = 2026;

function pageCopy(variant: ExamConfig) {
  const family = variant.variantOf as StateFamily;
  const terms = FAMILY_TERMS[family];
  const state = variant.jurisdiction!.name;
  const title = `${state} ${terms.title} ${YEAR}`;
  const lastSet = variant.trainingSets[variant.trainingSets.length - 1];
  const description = `${variant.questionsPerTest} ${state} ${terms.exam} practice questions with explanations, checked against ${state} law and weighted like the state exam. Free to start, no account needed.`;
  const faqs = [
    {
      q: `How many questions are in the ${state} practice exam?`,
      a: `${variant.questionsPerTest}. They make one full-length practice exam and ${variant.trainingSets.length} training sets by content area. ${variant.copy.testsHeading.replace(/\s*·\s*/g, ": ")}.`,
    },
    {
      q: `What score do I need on the ${state} practice exam?`,
      a: `The practice exam passes at ${variant.passPct} percent, the line Tigertest uses for ${state}. A practice score does not predict your result on the real exam, so use it to find the content areas to drill.`,
    },
    {
      q: `Does this cover ${state} law?`,
      a: `Yes. National questions were checked against ${state} law, and the ${state}-only questions cover the state's own statutes and rules. ${variant.copy.sourceLine}`,
    },
    {
      q: `Is the ${state} ${terms.exam} practice free?`,
      a: `It is free to start with no account. The full-length practice exam and every training set but the last are free; the final set, ${lastSet.name}, is part of Tigertest Premium, a one-time purchase with no subscription that also covers every other exam on Tigertest.`,
    },
    {
      q: `I am testing in another state. What should I use?`,
      a: `Tigertest has ${stateVariants(family).length} state versions of this exam. For any other state, use the national practice, which covers the general portion that is the same wherever you test.`,
    },
  ];
  return { family, terms, state, title, description, faqs };
}

export function stateLandingMetadata(variant: ExamConfig): Metadata {
  const { title, description } = pageCopy(variant);
  const path = stateLandingPath(variant);
  const image = shareImageUrl(`/og/${variant.variantOf}`);
  return {
    title: `${title} - Free`,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: { index: true, follow: true },
    openGraph: { title: `Free ${title}`, description, url: `${SITE_URL}${path}`, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: `Free ${title}`, description, images: [image] },
  };
}

export function StateExamLanding({ variant, shots }: { variant: ExamConfig; shots: { mobile: string; desktop: string } }) {
  const { family, terms, state, title, description, faqs } = pageCopy(variant);
  const familyExam = getExamById(family)!;
  const path = stateLandingPath(variant);
  const url = `${SITE_URL}${path}`;
  const dashboardHref = `${variant.slug}/dashboard`;
  const facts = stateExamFacts(variant.id);
  const updated = STATE_EXAM_LANDINGS_UPDATED_AT;
  const source = facts?.rows.find((r) => r.url)?.url;
  const blueprint = Object.entries(variant.blueprint)
    .map(([key, n]) => ({ label: variant.categoryLabels[key] ?? key, n }))
    .sort((a, b) => b.n - a.n);
  const otherStates = stateVariants(family).filter((e) => e.id !== variant.id);
  const sameState = STATE_FAMILIES.filter((f) => f !== family)
    .flatMap((f) => stateVariants(f))
    .filter((e) => e.jurisdiction!.code === variant.jurisdiction!.code);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `Tigertest - ${title}`,
        description,
        url,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: examOffers(variant.id),
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        dateModified: updated,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
        ...(source ? { citation: source } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div data-theme={family} className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free {title}
          </h1>
          <ExamLandingHero
            dashboardHref={dashboardHref}
            shortName={variant.shortName}
            subtitle={`${variant.questionsPerTest} questions checked against ${state} law and weighted like the state exam. Free to start, no account needed.`}
            shots={shots}
          />
        </div>
      </div>

      {/* At a glance */}
      <section aria-labelledby="state-facts" className="max-w-4xl mx-auto px-6 pt-8 md:pt-12">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
          <h2 id="state-facts" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            The {state} {terms.exam} at a glance
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
            Tigertest&apos;s {state} practice has {variant.questionsPerTest} questions with explanations: one full-length
            practice exam and {variant.trainingSets.length} training sets, free to start with no account required.
          </p>
          {facts && (
            <dl className="border-t border-gray-200 dark:border-gray-800">
              {facts.rows.map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6 py-3 border-b border-gray-200 dark:border-gray-800">
                  <dt className="sm:w-1/3 shrink-0 text-gray-500 dark:text-gray-400">{row.label}</dt>
                  <dd className="min-w-0 sm:text-right font-medium [overflow-wrap:anywhere] text-gray-900 dark:text-gray-50">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            {facts?.accessed ? `Facts checked against official sources on ${facts.accessed}. ` : ""}
            {variant.copy.sourceLine}
            {source && (
              <>
                {" "}
                <a href={source} target="_blank" rel="noopener noreferrer" className="text-brand-dark underline underline-offset-2 hover:decoration-2">
                  Official source
                  <ExternalLink className="ml-0.5 inline h-3 w-3 align-baseline" aria-hidden="true" />
                </a>
              </>
            )}
          </p>
        </div>
      </section>

      {/* What you practice */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
          How the {state} practice works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">{variant.copy.trainingSub}</p>
        <div className="grid md:grid-cols-2 gap-6">
          {variant.trainingSets.map((set) => (
            <div key={set.id} className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-1">
                Set {set.setNumber}: {set.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {set.size} questions · {set.weightLabel}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
            Full-length practice exam: {variant.questionsPerTest} questions, {variant.passPct}% to pass
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-600 dark:text-gray-300">
            {blueprint.map((b) => (
              <li key={b.label} className="flex justify-between gap-4">
                <span>{b.label}</span>
                <span className="tabular-nums font-medium text-gray-900 dark:text-gray-50">{b.n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ExamSampleQuestions
        examId={variant.id}
        page={{ shortName: `${state} ${terms.exam}`, name: title, questions: variant.questionsPerTest, path }}
      />

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          {state} {terms.exam} practice: common questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other states and the national practice */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Other states and the national practice</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-brand-dark">
            <li>
              <Link href={familyExam.landingPath!} className="underline underline-offset-2 font-semibold">
                {familyExam.name} (national)
              </Link>
            </li>
            {sameState.map((e) => (
              <li key={e.id}>
                <Link href={stateLandingPath(e)} className="underline underline-offset-2">
                  {state} {FAMILY_TERMS[e.variantOf as StateFamily].exam}
                </Link>
              </li>
            ))}
            {otherStates.map((e) => (
              <li key={e.id}>
                <Link href={stateLandingPath(e)} className="underline underline-offset-2">
                  {e.jurisdiction!.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Practice only. Not affiliated with any state regulator, PSI, Pearson VUE or Prometric, and a practice score does
            not predict your exam result.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            Ready for the {state} {terms.exam}?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            Start for free. No account required. {variant.questionsPerTest} questions checked against {state} law.
          </p>
          <ExamLandingCTA dashboardHref={dashboardHref} />
        </div>
      </div>
    </div>
  );
}
