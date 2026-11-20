import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CopyPrompt } from "@/components/connect/CopyPrompt";
import { AI_PARENTS_PAGE_UPDATED_AT } from "@/lib/seoDates";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SITE_URL } from "@/lib/siteUrl";

// /ai-parents: parents who use Claude or ChatGPT turn their kids' own
// homework into Tigertest quizzes through the MCP connector (/create), share
// them with a family class and read the results back. Nothing new on the
// server: it is the quiz and class features, pitched to parents.

const url = `${SITE_URL}/ai-parents`;
const title = "Turn Homework Into a Quiz With Your AI";
const description =
  "Ask Claude or ChatGPT to make a practice quiz from your kids' spelling list, chapter or worksheet. Tigertest saves it, your kids play it, and you see what they miss. Free to start.";

export const metadata: Metadata = {
  title: `${title} | For Parents`,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title: `${title} | Tigertest`, description, url, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} | Tigertest`, description },
};

const STEPS = [
  { h: "Connect your AI", p: "Add Tigertest to Claude or ChatGPT. It takes about two minutes and one URL." },
  { h: "Ask for a quiz", p: "Paste this week's spelling list, a chapter or a photo of a worksheet and say what you want. Your AI writes the questions and saves them to Tigertest." },
  { h: "Kids play, you see results", p: "Share it with your family class. Your kids play on Tigertest, and you see their scores and the questions they miss." },
];

const PROMPTS: { age: string; say: string }[] = [
  { age: "Spelling, ages 6 to 9", say: "Make a 15-question spelling quiz for my 8-year-old from this week's list: [paste the words]. Share it with my family class." },
  { age: "Times tables", say: "Make a 20-question quiz on the 6, 7 and 8 times tables for a third grader, mixed up, and give me the link." },
  { age: "Reading", say: "Here's the chapter my 10-year-old read today. Make 10 questions that check they understood it, not just that they remember names." },
  { age: "Science or history", say: "Make a 15-question quiz from this photo of my daughter's worksheet on the water cycle. Share it with my family class." },
  { age: "Teens", say: "Turn my son's biology notes on cell structure into a 25-question quiz with an explanation for every answer." },
  { age: "After they play", say: "Which questions did my kids miss most on our spelling quiz?" },
];

const FAQS = [
  {
    q: "Is it free?",
    a: "Yes. A free Tigertest account keeps 3 quizzes of up to 50 questions, and every school test on Tigertest is free. Premium ($9.99 once, no subscription) raises that to 100 quizzes of up to 200 questions, for parents who make a new quiz every week.",
  },
  {
    q: "Which AI apps work?",
    a: "Claude works on any plan, including Free. In ChatGPT it depends on your plan and workspace settings. Setup steps for both are on the connect page.",
  },
  {
    q: "Do my kids need the AI, or accounts?",
    a: "No. Your kids play on Tigertest with the link, on any device. They join your family class with their first name. Only you connect your AI.",
  },
  {
    q: "Can only my kids play our quizzes?",
    a: "Yes. Say \"share it with my family class\" and only children in your class can play it. You can also keep a quiz to yourself or share it with anyone who has the link.",
  },
  {
    q: "What can the AI see?",
    a: "Only your own Tigertest quizzes and progress, the names of your classes and quizzes shared with you. It runs as your account, and you can remove it anytime.",
  },
  {
    q: "Can I fix a question the AI got wrong?",
    a: "Yes. Every quiz is listed under Your quizzes on Tigertest, where you can edit, add or delete questions without opening a chat.",
  },
];

const h2Class = "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50";

export default function AiParentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        dateModified: AI_PARENTS_PAGE_UPDATED_AT,
        inLanguage: "en",
        audience: { "@type": "EducationalAudience", educationalRole: "parent" },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
      },
      { "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div data-theme="mapgrowth" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-14 md:pt-24 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">For parents who use AI</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">{title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ask Claude or ChatGPT to make practice from your kids&apos; own spelling list, chapter or worksheet. Tigertest saves it, your kids play it, and you
            see exactly what they miss.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/create#add-to-claude" className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              Connect your AI
            </Link>
            <a href="#prompts" className="inline-block rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-gray-50 hover:border-brand">
              See what to ask
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Free to start. Works with Claude and ChatGPT.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className={`${h2Class} text-center mb-8`}>How it works</h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.h} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6">
              <p className="text-sm font-semibold text-brand-dark mb-1">Step {i + 1}</p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{s.h}</h3>
              <p className="text-gray-600 dark:text-gray-300">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>

      <div id="prompts" className="max-w-3xl mx-auto px-6 py-12 scroll-mt-20">
        <h2 className={`${h2Class} mb-2`}>What to ask</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Copy one, paste it into your AI with Tigertest turned on, and change the details.</p>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          {PROMPTS.map((p) => (
            <li key={p.say} className="flex items-start gap-4 py-5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{p.age}</p>
                <p className="text-lg text-gray-900 dark:text-gray-50">&ldquo;{p.say}&rdquo;</p>
              </div>
              <CopyPrompt text={p.say} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Set up a family class first</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              One link for your kids. Each joins with their first name, and every quiz you share with the class shows up in one report.
            </p>
            <Link href="/teach/new?for=family" className="font-semibold text-gray-900 dark:text-gray-50 underline underline-offset-2">
              Make a free family class
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Practicing for a real test?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              MAP Growth, CogAT, ISEE, SSAT, the SAT, ACT and AP exams already have free practice on Tigertest, sorted by grade.
            </p>
            <Link href="/homeschool" className="font-semibold text-gray-900 dark:text-gray-50 underline underline-offset-2">
              Free practice tests by grade
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h2 className={`${h2Class} mb-6`}>Questions parents ask</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900 dark:text-gray-50 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/create#add-to-claude" className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            Connect your AI
          </Link>
        </p>
      </div>
    </div>
  );
}
