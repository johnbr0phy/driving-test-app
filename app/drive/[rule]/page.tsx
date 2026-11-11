import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import questions from "@/data/questions.json";
import { DrivePlayer, type FallbackQuestion } from "@/components/drive/DrivePlayer";
import { SITE_URL } from "@/lib/siteUrl";
import { isDriveEnabled } from "@/src/drive/flag";
import { getDriveRecord } from "@/src/drive/records";
import { DRIVE_SLUGS, getDriveRule, nextDriveRule } from "@/src/drive/rules";

// /drive/<rule-slug>: one scene, plus the rule as plain text for readers and
// search engines. ?state=XX loads that state's record, ?q=<id> a sibling
// question of the same rule. Behind the drive flag: a 404 while it is off.

type Params = { rule: string };
type Search = { state?: string | string[]; q?: string | string[] };
type BankQuestion = { questionId: string; question: string; optionA: string; optionB: string; optionC: string; optionD: string; correctIndex: number; explanation: string };

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) || null;

export function generateStaticParams() {
  return DRIVE_SLUGS.map((rule) => ({ rule }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const rule = getDriveRule((await params).rule);
  if (!rule) return {};
  const title = `${rule.title}: drive the DMV question | Tigertest`;
  const description = `${rule.question} Answer it by driving: a 20-second scene where you make the call and see what happens. ${rule.missRate}% of Tigertest answers get this wrong.`;
  const url = `${SITE_URL}/drive/${rule.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Tigertest", type: "website" },
  };
}

export default async function DriveScenePage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<Search> }) {
  if (!isDriveEnabled()) notFound();
  const rule = getDriveRule((await params).rule);
  if (!rule) notFound();
  const search = await searchParams;
  const stateParam = first(search.state);
  const stateCode = stateParam && /^[A-Za-z]{2}$/.test(stateParam) ? stateParam.toUpperCase() : null;
  const record = getDriveRecord(rule.slug, { state: stateCode, q: first(search.q) });
  if (!record) notFound();

  const bank = (questions as BankQuestion[]).find((q) => q.questionId === record.questionId);
  const fallback: FallbackQuestion = bank
    ? { question: bank.question, options: [bank.optionA, bank.optionB, bank.optionC, bank.optionD], correctIndex: bank.correctIndex, explanation: bank.explanation }
    : { question: record.prompt, options: [record.bankAnswer], correctIndex: 0, explanation: record.ruleText };
  const next = nextDriveRule(rule.slug);

  return (
    <main id="main">
      <h1 className="sr-only">{rule.title}: drive the question</h1>
      <DrivePlayer slug={rule.slug} title={rule.title} record={record} fallback={fallback} next={{ slug: next.slug, title: next.title }} stateCode={stateCode} />
      <article className="mx-auto max-w-3xl px-4 py-10 text-gray-900 dark:text-gray-50">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <Link className="underline" href="/drive">
            Drive the Question
          </Link>
        </p>
        <h2 className="mt-2 text-2xl font-bold">{rule.question}</h2>
        <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-200">{rule.summary}</p>
        <h3 className="mt-6 text-lg font-semibold">The rule in one sentence</h3>
        <p className="mt-2 leading-relaxed">{record.ruleText}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed">
          {rule.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Source:{" "}
          <a className="underline" href={record.citation.url} target="_blank" rel="noopener noreferrer">
            {record.citation.source}
          </a>
          , {record.citation.section}. On Tigertest practice tests, {rule.missRate}% of answers to this question are wrong.
        </p>
        <p className="mt-6">
          <Link className="font-semibold underline" href={`/dmv/dashboard${stateCode ? `?state=${stateCode}` : ""}`}>
            Take the full DMV practice test
          </Link>
        </p>
      </article>
    </main>
  );
}
