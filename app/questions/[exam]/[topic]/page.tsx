import type { Metadata } from "next";
import { practiceLabel } from "@/lib/practiceLabel";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { SampleQuestionCards, quizJsonLd, spreadSampleKeys } from "@/components/exam/ExamSampleQuestions";
import { loadExamBank } from "@/lib/examAppRoute";
import { getExamQuestions } from "@/lib/examData";
import { ExamConfig, examLandingPath } from "@/lib/exams";
import { TOPIC_PAGES_UPDATED_AT } from "@/lib/seoDates";
import { examMostMissed } from "@/lib/server/mostMissed";
import { getSignIdForQuestion } from "@/lib/signImages";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SITE_URL } from "@/lib/siteUrl";
import {
  ExamTopic,
  MOST_MISSED_SHOWN,
  MOST_MISSED_SLUG,
  TOPIC_PAGE_SIZE,
  examTopics,
  mostMissedPath,
  topicExamBySlug,
  topicExamSlug,
  topicExams,
  topicPath,
} from "@/lib/topicPages";
import type { Question } from "@/types";
import { SampleCardsV2, quizJsonLdV2 } from "@/components/v2/SampleQuestionsV2";
import { topicPoolV2, topicQuestionsV2 } from "@/lib/v2/printable";
import { v2Routes } from "@/lib/v2/registry";
import { BANK_SIZES } from "@/lib/v2/bankSizes";
import type { ExamV2Config } from "@/lib/v2/types";
import {
  ExamTopicV2,
  examTopicsV2,
  topicExamBySlugV2,
  topicExamSlugV2,
  topicExamsV2,
  topicPathV2,
} from "@/lib/v2/topicPages";

// Topic pages are static. The most-missed page reads the nightly Common
// Mistakes doc, so it is rendered on first request and refreshed daily.
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return [
    ...topicExams().flatMap((exam) => examTopics(exam).map((t) => ({ exam: topicExamSlug(exam), topic: t.slug }))),
    ...topicExamsV2().flatMap((exam) => examTopicsV2(exam).map((t) => ({ exam: topicExamSlugV2(exam), topic: t.slug }))),
  ];
}

// v2 exams (lib/v2/topicPages.ts): one page per drill, same URL shape.
function topicCopyV2(exam: ExamV2Config, topic: ExamTopicV2) {
  const name = exam.english?.shortName ?? exam.shortName;
  const title = `${topic.title} with Answers`;
  const what = topic.key === "afqt" ? "AFQT (arithmetic reasoning, word knowledge, paragraph comprehension and math knowledge)" : `${name} ${topic.label}`;
  const bankSize = BANK_SIZES[exam.id] ? `${BANK_SIZES[exam.id]}-question ` : "";
  const description = `Free ${what} practice questions with every answer explained, from Tigertest's ${bankSize}${name} bank. Then drill the rest until you master them.`;
  return { title, description };
}

function v2Topic(examSlug: string, topicSlug: string) {
  const exam = topicExamBySlugV2(examSlug);
  const topic = exam && examTopicsV2(exam).find((t) => t.slug === topicSlug);
  return exam && topic ? { exam, topic } : undefined;
}

type Params = { params: Promise<{ exam: string; topic: string }> };

async function bank(exam: ExamConfig): Promise<Question[]> {
  await loadExamBank({ kind: "v1", exam });
  return [...getExamQuestions(exam.id)].sort((a, b) => a.questionId.localeCompare(b.questionId));
}

function topicCopy(exam: ExamConfig, topic: ExamTopic) {
  const title = `${exam.shortName} ${topic.label} Practice Questions`;
  const description = `${TOPIC_PAGE_SIZE} free ${practiceLabel(exam.shortName)} practice questions on ${topic.label.toLowerCase()}, each with the answer explained. ${topic.perTest} of every ${exam.questionsPerTest} questions on a practice test come from this area.`;
  return { title, description };
}

function mostMissedCopy(exam: ExamConfig) {
  const title = `Most Missed ${exam.shortName} Questions`;
  const description = `The ${practiceLabel(exam.shortName)} practice questions people get wrong most on Tigertest, with the share who missed each one, the right answer and why.`;
  return { title, description };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { exam: examSlug, topic: topicSlug } = await params;
  const exam = topicExamBySlug(examSlug);
  if (!exam) {
    const v2 = v2Topic(examSlug, topicSlug);
    if (!v2) return {};
    const { title, description } = topicCopyV2(v2.exam, v2.topic);
    const url = `${SITE_URL}${topicPathV2(v2.exam, v2.topic)}`;
    return {
      title,
      description,
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: { title, description, url, type: "article" },
    };
  }
  const topic = examTopics(exam).find((t) => t.slug === topicSlug);
  const mostMissed = topicSlug === MOST_MISSED_SLUG;
  if (!topic && !mostMissed) return {};
  const { title, description } = topic ? topicCopy(exam, topic) : mostMissedCopy(exam);
  const url = `${SITE_URL}${topic ? topicPath(exam, topic) : mostMissedPath(exam)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function TopicQuestionsPage({ params }: Params) {
  const { exam: examSlug, topic: topicSlug } = await params;
  const exam = topicExamBySlug(examSlug);
  if (!exam) {
    const v2 = v2Topic(examSlug, topicSlug);
    if (!v2) notFound();
    return <TopicQuestionsPageV2 exam={v2.exam} topic={v2.topic} />;
  }
  const topics = examTopics(exam);
  const topic = topics.find((t) => t.slug === topicSlug);
  if (!topic && topicSlug !== MOST_MISSED_SLUG) notFound();

  const all = await bank(exam);
  const dashboardHref = `${exam.slug}/dashboard`;
  const landing = examLandingPath(exam);

  let title: string;
  let lead: string;
  let sample: Question[];
  let path: string;
  let note: ((q: Question) => string | undefined) | undefined;
  let more: string;
  let updated = TOPIC_PAGES_UPDATED_AT;

  if (topic) {
    const pool = all.filter((q) => q.category === topic.key && !getSignIdForQuestion(q.questionId));
    if (pool.length === 0) notFound();
    sample = spreadSampleKeys(pool.slice(0, TOPIC_PAGE_SIZE));
    title = topicCopy(exam, topic).title;
    path = topicPath(exam, topic);
    lead = `${topic.label} makes up ${topic.perTest} of every ${exam.questionsPerTest} questions on a Tigertest ${practiceLabel(exam.shortName)} practice test. Here are ${sample.length} of the ${pool.length} questions on it, each with the answer and the reason.`;
    more = `Practice all ${pool.length} ${topic.label.toLowerCase()} questions, and the rest of the ${all.length}-question bank, in the free ${exam.shortName} training sets. Questions you miss come back until you have mastered them.`;
  } else {
    const stats = await examMostMissed(exam.id);
    const byId = new Map(all.map((q) => [q.questionId, q]));
    const ranked = (stats?.questions ?? []).filter((s) => byId.has(s.questionId));
    if (!stats || ranked.length < MOST_MISSED_SHOWN) notFound();
    const shown = ranked.slice(0, MOST_MISSED_SHOWN);
    const rate = new Map(shown.map((s) => [s.questionId, s]));
    sample = spreadSampleKeys(shown.map((s) => byId.get(s.questionId)!));
    note = (q) => {
      const s = rate.get(q.questionId);
      return s ? `${s.errorRate}% of people missed this (${s.total.toLocaleString("en-US")} answers)` : undefined;
    };
    title = mostMissedCopy(exam).title;
    path = mostMissedPath(exam);
    if (stats.updatedAt) updated = stats.updatedAt;
    lead = `These are the ${practiceLabel(exam.shortName)} practice questions that people on Tigertest get wrong most often, from the answers of ${stats.users.toLocaleString("en-US")} people. Each one shows the share who missed it, the right answer and why.`;
    more = `Tigertest tracks the ${ranked.length} most-missed ${exam.shortName} questions. These are the top ${shown.length}; the full list is the Common Mistakes tab of your stats page.`;
  }

  const url = `${SITE_URL}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description: lead,
        dateModified: updated,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
      },
      quizJsonLd(url, title, exam.name, sample),
    ],
  };

  return (
    <div data-theme={exam.id} className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-16 md:pt-16">
        <p className="mb-3 text-sm">
          <Link href={landing} className="text-brand-dark font-medium hover:underline">
            {exam.name}
          </Link>
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-5 tracking-tight">{title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">{lead}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Updated <time dateTime={updated}>{updated}</time> by the Tigertest team. {exam.copy.sourceLine}
        </p>

        <SampleQuestionCards sample={sample} note={note} />

        <div className="mt-12 rounded-2xl bg-brand-light p-8 text-center">
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-6">{more}</p>
          <ExamLandingCTA dashboardHref={topic ? dashboardHref : `${exam.slug}/stats?tab=community`} />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Free to start. No account needed.</p>
        </div>

        <nav aria-labelledby="more-topics" className="mt-12">
          <h2 id="more-topics" className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            More {exam.shortName} questions by topic
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {topics
              .filter((t) => t.slug !== topicSlug)
              .map((t) => (
                <li key={t.slug}>
                  <Link href={topicPath(exam, t)} className="text-brand-dark underline underline-offset-2">
                    {t.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href={landing} className="text-brand-dark underline underline-offset-2 font-semibold">
                {exam.name}: format, pass mark and full practice
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

async function TopicQuestionsPageV2({ exam, topic }: { exam: ExamV2Config; topic: ExamTopicV2 }) {
  await loadExamBank({ kind: "v2", exam });
  const name = exam.english?.shortName ?? exam.shortName;
  const sample = topicQuestionsV2(exam.id, topic);
  if (sample.length === 0) notFound();
  const pool = topicPoolV2(exam.id, topic);
  const topics = examTopicsV2(exam);
  const routes = v2Routes(exam);
  const startHref = topic.drillKey ? routes.drill(topic.drillKey) : routes.dashboard;
  const path = topicPathV2(exam, topic);
  const url = `${SITE_URL}${path}`;
  const title = topic.title;
  const total = BANK_SIZES[exam.id];
  const section = topic.section ? exam.sections.find((x) => x.key === topic.section) : undefined;
  const lead =
    topic.key === "afqt"
      ? `${topic.blurb} Here are ${sample.length} questions from those four, each with the answer and the reason.`
      : `${topic.blurb} Here are ${sample.length} ${name} ${topic.label.toLowerCase()} questions, each with the answer and the reason.`;
  const more =
    topic.key === "afqt"
      ? `Take a full ${name} practice test for an AFQT estimate, then drill each of the four AFQT subtests until every question is mastered.`
      : `Drill every ${topic.label.toLowerCase()} question in the ${name} ${topic.label} drill: questions you miss come back until you have mastered them.${section ? ` Then take a timed practice test with the ${section.name} section in it.` : ""}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description: lead,
        dateModified: TOPIC_PAGES_UPDATED_AT,
        inLanguage: exam.locale ?? "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
      },
      quizJsonLdV2(exam.id, url, "questions", `${title}: ${sample.length} questions`, sample),
    ],
  };

  return (
    <div data-theme={exam.id} className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-16 md:pt-16">
        <p className="mb-3 text-sm">
          <Link href={exam.landingPath} className="text-brand-dark font-medium hover:underline">
            {name} practice test
          </Link>
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-5 tracking-tight">{title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">{lead}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Updated <time dateTime={TOPIC_PAGES_UPDATED_AT}>{TOPIC_PAGES_UPDATED_AT}</time> by the Tigertest team. {exam.copy.sourceLine}
        </p>

        <SampleCardsV2 examId={exam.id} sample={sample} headingLevel={2} />

        <div className="mt-12 rounded-2xl bg-brand-light p-8 text-center">
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-6">{more}</p>
          <ExamLandingCTA dashboardHref={startHref} />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {pool.length > sample.length && total ? `${total} ${name} questions in all. ` : ""}Free to start. No account needed.
          </p>
        </div>

        <nav aria-labelledby="more-topics" className="mt-12">
          <h2 id="more-topics" className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            More {name} practice questions
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {topics
              .filter((t) => t.slug !== topic.slug)
              .map((t) => (
                <li key={t.slug}>
                  <Link href={topicPathV2(exam, t)} className="text-brand-dark underline underline-offset-2">
                    {t.title}
                  </Link>
                </li>
              ))}
            <li>
              <Link href={exam.landingPath} className="text-brand-dark underline underline-offset-2 font-semibold">
                Full {name} practice test: format, timing and scoring
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
