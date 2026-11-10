import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEACHES } from "@/components/exam/ExamClassFaq";
import { EXAM_FACTS } from "@/lib/examFacts";
import { getExamById } from "@/lib/exams";
import { HUB_PAGES_UPDATED_AT } from "@/lib/seoDates";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SITE_URL } from "@/lib/siteUrl";
import { teachPagePath, teachPageTestBySlug, teachPageTests } from "@/lib/teachPages";
import { EXAMS_V2 } from "@/lib/v2/registry";

// One page per test that is usually taught in a class (lib/teachPages.ts).
export const dynamicParams = false;
export const generateStaticParams = () => teachPageTests().map((t) => ({ exam: teachPagePath(t).split("/").pop()! }));

type Params = { params: Promise<{ exam: string }> };

function copy(slug: string) {
  const test = teachPageTestBySlug(slug);
  if (!test) return null;
  const course = TEACHES[test.id];
  const title = `${test.shortName} Practice for Your Class`;
  const description = `Teach ${course}? Make a free Tigertest class for the ${test.shortName} practice test: post one link, students join with a name, and you see scores and the topics the class misses.`;
  const faqs = [
    { q: `Is the ${test.shortName} class free?`, a: `Yes. Classes are free for teachers. A student in your class also gets that test's full stats and every step of it at no charge.` },
    { q: "Do my students need accounts?", a: "No. A student opens your class link, types the name you know them by and starts practicing. An account is optional and keeps their progress across devices." },
    { q: "What do I see as the teacher?", a: `Who practiced and when, each student's practice test scores, the ${test.shortName} topics the class is weakest on, and every question the class answered with how many missed it and which wrong answer they picked.` },
    { q: "Can I use my own questions too?", a: "Yes. Any account can turn its own material into a Tigertest quiz and limit it to one class, so only your students can play it." },
  ];
  return { test, course, title, description, faqs };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = copy((await params).exam);
  if (!c) return {};
  const url = `${SITE_URL}${teachPagePath(c.test)}`;
  return {
    title: `${c.title} - Free`,
    description: c.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: c.title, description: c.description, url, type: "website" },
  };
}

export default async function TeachExamPage({ params }: Params) {
  const c = copy((await params).exam);
  if (!c) notFound();
  const { test, course, title, description, faqs } = c;
  const url = `${SITE_URL}${teachPagePath(test)}`;
  const facts = EXAM_FACTS[test.id];
  const v1 = getExamById(test.id);
  const v2 = EXAMS_V2.find((e) => e.id === test.id);
  const topics = v1 ? [...new Set(Object.keys(v1.blueprint).map((k) => v1.categoryLabels[k]).filter(Boolean))] : v2 ? v2.drills.map((d) => d.name) : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, dateModified: HUB_PAGES_UPDATED_AT, inLanguage: "en", isPartOf: { "@id": `${SITE_URL}/#website` }, publisher: { "@id": ORGANIZATION_ID } },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  const steps = [
    { h: "Make the class", p: `Sign in, pick ${test.shortName} and name the class. It takes under a minute.` },
    { h: "Post one link", p: "Put the class link in your LMS, a slide or a group chat. Students join with just the name you know them by." },
    { h: "See what to reteach", p: "Open the class page for scores, who practiced, and the topics and questions the class misses most." },
  ];

  return (
    <div data-theme={test.theme} className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-14 md:pt-24 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">For instructors</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">Free {title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {test.questions.toLocaleString("en-US")} {test.shortName} practice questions with explanations, set as class practice in a minute. You see every
            student&apos;s progress and what the class keeps missing.
          </p>
          <Link href={`/teach/new?exam=${test.id}`} className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            Create a free {test.shortName} class
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Or <Link href={test.href} className="underline underline-offset-2">see the {test.shortName} practice test</Link> first.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-8">How a class works</h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <li key={s.h} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6">
              <p className="text-sm font-semibold text-brand-dark mb-1">Step {i + 1}</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{s.h}</h3>
              <p className="text-gray-600 dark:text-gray-300">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">What your students practice</h2>
        {facts && <p className="text-gray-700 dark:text-gray-200 mb-4">{facts.answer}</p>}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Tigertest&apos;s practice follows {facts?.basedOn ?? "the exam's published outline"}. Students train in short sets where missed questions come back
          until they are mastered, then take full practice tests.
        </p>
        {topics.length > 0 && (
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-700 dark:text-gray-200 list-disc pl-5">
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Questions teachers ask</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-1">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href={`/teach/new?exam=${test.id}`} className="inline-block rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white hover:bg-brand-dark">
            Create a free {test.shortName} class
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/teach" className="underline underline-offset-2">How classes work on Tigertest</Link>
        </p>
      </div>
    </div>
  );
}
