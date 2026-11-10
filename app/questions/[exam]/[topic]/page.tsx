import type { Metadata } from "next";
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

// Topic pages are static. The most-missed page reads the nightly Common
// Mistakes doc, so it is rendered on first request and refreshed daily.
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return topicExams().flatMap((exam) => examTopics(exam).map((t) => ({ exam: topicExamSlug(exam), topic: t.slug })));
}

type Params = { params: Promise<{ exam: string; topic: string }> };

async function bank(exam: ExamConfig): Promise<Question[]> {
  await loadExamBank({ kind: "v1", exam });
  return [...getExamQuestions(exam.id)].sort((a, b) => a.questionId.localeCompare(b.questionId));
}

function topicCopy(exam: ExamConfig, topic: ExamTopic) {
  const title = `${exam.shortName} ${topic.label} Practice Questions`;
  const description = `${TOPIC_PAGE_SIZE} free ${exam.shortName} practice questions on ${topic.label.toLowerCase()}, each with the answer explained. ${topic.perTest} of every ${exam.questionsPerTest} questions on a practice test come from this area.`;
  return { title, description };
}

function mostMissedCopy(exam: ExamConfig) {
  const title = `Most Missed ${exam.shortName} Questions`;
  const description = `The ${exam.shortName} practice questions people get wrong most on Tigertest, with the share who missed each one, the right answer and why.`;
  return { title, description };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { exam: examSlug, topic: topicSlug } = await params;
  const exam = topicExamBySlug(examSlug);
  if (!exam) return {};
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
  if (!exam) notFound();
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
    lead = `${topic.label} makes up ${topic.perTest} of every ${exam.questionsPerTest} questions on a Tigertest ${exam.shortName} practice test. Here are ${sample.length} of the ${pool.length} questions on it, each with the answer and the reason.`;
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
    lead = `These are the ${exam.shortName} practice questions that people on Tigertest get wrong most often, from the answers of ${stats.users.toLocaleString("en-US")} people. Each one shows the share who missed it, the right answer and why.`;
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
