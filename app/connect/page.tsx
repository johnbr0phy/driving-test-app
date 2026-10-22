import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Car, Link2, Lock, MessageSquare, Plus } from "lucide-react";

// /connect: how to add the TigerTest MCP server (app/api/mcp) to Claude or
// ChatGPT as a custom connector, what it can do, and a short FAQ.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const MCP_URL = "https://tigertest.io/api/mcp";

const title = "Use TigerTest in ChatGPT and Claude";
const description =
  "Add TigerTest to Claude or ChatGPT as a connector: turn a chat into a practice test with a shareable link, or get quizzed on your state's DMV test and see where you keep going wrong.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/connect` },
  openGraph: { title, description, url: `${siteUrl}/connect`, siteName: "TigerTest", type: "website" },
  twitter: { card: "summary", title, description },
};

const faqs = [
  {
    q: "Is the TigerTest connector free?",
    a: "Yes. Adding it costs nothing and a free TigerTest account can keep 3 quizzes of up to 50 questions each. TigerTest Premium, a one-time $9.99, raises that to 100 quizzes of up to 200 questions.",
  },
  {
    q: "Which Claude and ChatGPT plans can add it?",
    a: "Custom connectors are a feature of the paid Claude plans (Pro, Max, Team and Enterprise) and of paid ChatGPT plans with developer mode turned on. The menus move around, so look for Connectors under Settings in either app.",
  },
  {
    q: "Can I use it without a paid chat plan?",
    a: "Yes. On tigertest.io/create, copy our question-writing prompt into any ChatGPT or Claude, free plans included, paste your notes under it, and paste the reply back. Or import a Quizlet set, or write the questions yourself. DMV practice is at tigertest.io/dmv/dashboard either way.",
  },
  {
    q: "What does the connector see?",
    a: "Only the signed-in account's own quizzes and practice progress. It cannot read other people's quizzes or results, and nothing works until you sign in to TigerTest during setup.",
  },
  {
    q: "Where do my quizzes live?",
    a: "On TigerTest, at tigertest.io/q/<code>. You can edit, share or delete them at tigertest.io/create, with or without the chat app.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/connect`,
      url: `${siteUrl}/connect`,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const PROMPTS = [
  "Turn these notes into a TigerTest quiz with 20 questions.",
  "Make a quiz from this PDF, one topic per chapter, and give me the link.",
  "Add five harder questions to my Cell Biology quiz.",
  "Which of my quizzes has been played the most, and which question do people miss?",
  "Quiz me on the Texas DMV test, ten questions at a time.",
  "Run training set 2 for California and stop me when I miss one.",
  "What are my weakest DMV topics? Give me five questions on them.",
];

const cardClass = "rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6";
const stepClass = "flex gap-3 text-gray-700 dark:text-gray-200";
const stepNumClass =
  "flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 text-sm font-bold flex items-center justify-center";

function Steps({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className={stepClass}>
          <span className={stepNumClass} aria-hidden="true">
            {i + 1}
          </span>
          <span className="pt-0.5">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function UrlChip() {
  return <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm text-gray-900 dark:text-gray-50 break-all">{MCP_URL}</code>;
}

export default function ConnectPage() {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-gray-50 dark:to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-10 md:pt-20 md:pb-14 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            TigerTest is a connector for Claude and ChatGPT. Add it once, and your chat can turn anything you paste into a practice test with a link, or
            quiz you on your state&apos;s DMV test and tell you where you keep going wrong.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#add-to-claude"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 font-medium"
            >
              <Link2 className="w-4 h-4" aria-hidden="true" /> Add it to Claude
            </a>
            <a
              href="#add-to-chatgpt"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-gray-900 px-6 py-3 font-medium"
            >
              <Link2 className="w-4 h-4" aria-hidden="true" /> Add it to ChatGPT
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Server URL: <UrlChip />
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 md:pb-24 space-y-12">
        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            What you can do
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cardClass}>
              <BookOpen className="w-6 h-6 text-gray-700 dark:text-gray-200 mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Make a quiz from your chat</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-300">
                <li>Paste notes or a PDF into Claude or ChatGPT.</li>
                <li>Say &quot;turn this into a TigerTest quiz&quot;.</li>
                <li>Get a link you can open on your phone or send to a friend.</li>
                <li>Ask for more questions later, or who has played it and what they missed.</li>
              </ul>
            </div>
            <div className={cardClass}>
              <Car className="w-6 h-6 text-gray-700 dark:text-gray-200 mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Get quizzed on the DMV test</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-300">
                <li>Pick your state.</li>
                <li>Run a practice test or a training set right in the chat.</li>
                <li>Ask where you keep going wrong and drill those topics.</li>
                <li>Your progress is the same on tigertest.io.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="add-to-claude" aria-labelledby="claude-heading" className="scroll-mt-20">
          <h2 id="claude-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
            Add it to Claude
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Available on paid Claude plans. The exact menu names change now and then.</p>
          <div className={cardClass}>
            <Steps
              steps={[
                <>Open Claude.ai and go to Settings. Look for Connectors.</>,
                <>Choose Add custom connector.</>,
                <>
                  Name it TigerTest and paste the URL <UrlChip />.
                </>,
                <>Press Add. When Claude asks, sign in to TigerTest (or make a free account) and allow the connection.</>,
                <>In a new chat, make sure TigerTest is switched on under the tools menu, then ask for a quiz.</>,
              ]}
            />
          </div>
        </section>

        <section id="add-to-chatgpt" aria-labelledby="chatgpt-heading" className="scroll-mt-20">
          <h2 id="chatgpt-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
            Add it to ChatGPT
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Available on paid ChatGPT plans with developer mode turned on. The exact menu names change now and then.
          </p>
          <div className={cardClass}>
            <Steps
              steps={[
                <>Open ChatGPT and go to Settings. Look for Connectors, then Advanced (or Developer mode) and turn it on.</>,
                <>Choose Create (a new connector).</>,
                <>
                  Name it TigerTest and paste the MCP server URL <UrlChip />. Pick OAuth for authentication.
                </>,
                <>Press Create. When ChatGPT asks, sign in to TigerTest (or make a free account) and allow the connection.</>,
                <>In a new chat, pick TigerTest from the tools or connectors menu, then ask for a quiz.</>,
              ]}
            />
          </div>
        </section>

        <section aria-labelledby="try-heading">
          <h2 id="try-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Things to try
          </h2>
          <ul className="space-y-2">
            {PROMPTS.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3">
                <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span className="text-gray-800 dark:text-gray-100">&quot;{p}&quot;</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="privacy-heading" className={cardClass}>
          <div className="flex gap-3">
            <Lock className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-700 dark:text-gray-200" aria-hidden="true" />
            <div>
              <h2 id="privacy-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                What the connector can see
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Nothing works without a TigerTest account: setup ends with a sign-in on tigertest.io, and every call runs as that account. The connector
                only ever sees the signed-in account&apos;s own quizzes and progress, never anyone else&apos;s. Remove it from your chat app&apos;s
                connector settings at any time.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-1">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">No chat app needed</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
            Copy our question-writing prompt into any free ChatGPT or Claude and paste the reply back, import a Quizlet set, or write the questions yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 font-medium"
            >
              <Plus className="w-4 h-4" aria-hidden="true" /> Make a quiz
            </Link>
            <Link
              href="/q"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 font-medium"
            >
              Play a quiz
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
