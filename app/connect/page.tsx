import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, FileText, Library, Link2, Lock, Plus, Sparkles, Wrench } from "lucide-react";
import { CopyUrl } from "@/components/connect/CopyUrl";

// /connect: how to add the TigerTest MCP server (app/api/mcp) to Claude or
// ChatGPT as a custom connector, what it can do, and a short FAQ.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const MCP_URL = "https://www.tigertest.io/api/mcp";

const title = "Use TigerTest in ChatGPT and Claude";
const description =
  "Add TigerTest to Claude or ChatGPT: turn your notes into a shareable practice quiz, or keep practicing the tests you have in progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/connect` },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/connect`,
    siteName: "TigerTest",
    type: "website",
    images: [{ url: `${siteUrl}/og/connect`, width: 1200, height: 630, alt: "TigerTest in ChatGPT and Claude: turn any chat into a practice test" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og/connect`] },
};

const faqs = [
  {
    q: "What if I study in chat and the browser at the same time?",
    a: "An older browser tab cannot save over newer chat progress. Saving pauses with a notice; reopen TigerTest to load saved changes. Unsynced browser work may need repeating. Guest-only progress is not visible in chat.",
  },
  {
    q: "Is it free?",
    a: "Yes. A free account keeps 3 quizzes of up to 50 questions. Premium ($9.99 once) raises that to 100 quizzes of up to 200.",
  },
  {
    q: "Which plans can add it?",
    a: "Claude: any plan, including Free. ChatGPT: depends on your plan and workspace settings.",
  },
  {
    q: "Can I edit a quiz afterwards?",
    a: "Yes, at tigertest.io/create. Edit, share or delete it there, no chat needed.",
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

const PROMPT_GROUPS = [
  {
    label: "Make a quiz",
    accent: "border-orange-400",
    prompts: ["Turn these notes into a 20-question quiz.", "Make a quiz from this PDF and give me the link.", "Which question do people miss most?"],
  },
  {
    label: "Get quizzed",
    accent: "border-sky-400",
    prompts: ["Which tests do I have in progress?", "Continue my practice where I left off.", "Which topics am I getting wrong?"],
  },
];

const CLAUDE_STEPS: React.ReactNode[] = [
  <>Open Customize → Connectors (Settings in older menus).</>,
  <>Click Add custom connector.</>,
  <>Name it TigerTest and paste the URL.</>,
  <>Sign in to TigerTest and allow access.</>,
  <>Turn it on in a new chat and ask for a quiz.</>,
];

const CHATGPT_STEPS: React.ReactNode[] = [
  <>On the web, open Plugins → Add custom MCP server (or Settings → Apps → Create).</>,
  <>Name it TigerTest, paste the URL and pick OAuth.</>,
  <>Sign in to TigerTest and allow access.</>,
  <>Select TigerTest in a new chat and ask for a quiz.</>,
];

const card = "rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800";
const h2Class = "text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50";
const eyebrow = "text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400";

function Steps({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-200">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-sm font-bold flex items-center justify-center"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="pt-0.5 leading-relaxed">{s}</span>
        </li>
      ))}
    </ol>
  );
}

// The hero picture: a made-up chat where a pasted PDF becomes a TigerTest
// quiz link, with the quiz itself floating beside it as it looks on a phone.
function ChatMock() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-orange-200/70 via-amber-100/60 to-transparent dark:from-orange-500/20 dark:via-amber-500/10 blur-2xl" />
      <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl shadow-orange-900/10 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="ml-3 text-xs text-gray-400">Your chat</span>
        </div>
        <div className="p-4 sm:p-5 sm:pb-14 space-y-4 text-sm">
          <div className="flex flex-col items-end gap-1.5">
            <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-gray-700 dark:text-gray-200">
              <FileText className="w-4 h-4 text-red-500" />
              bio-chapter-4.pdf
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2.5">
              Turn this into a TigerTest quiz with 20 questions.
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-3 py-1 text-xs font-medium">
            <Wrench className="w-3.5 h-3.5" />
            Used TigerTest: create quiz
          </div>
          <div className="space-y-3 text-gray-800 dark:text-gray-100">
            <p>Done! Here&apos;s your quiz:</p>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 p-3">
              <Image src="/tiger_face_03.png" alt="" width={44} height={49} className="flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-50 truncate">Cell Biology: Chapter 4</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">20 questions · tigertest.io/q/K7RM2Q</div>
              </div>
              <span className="flex-shrink-0 rounded-full bg-orange-500 text-white px-3 py-1.5 text-xs font-semibold">Play</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block relative -mt-10 ml-auto mr-2 w-64 rotate-[3deg] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-4 text-xs">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span>Question 7 of 20</span>
          <span className="text-green-600 dark:text-green-400 font-semibold">6 right</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
          <div className="h-1.5 w-1/3 rounded-full bg-orange-500" />
        </div>
        <p className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Which organelle makes most of the cell&apos;s ATP?</p>
        <div className="space-y-1.5">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 text-gray-600 dark:text-gray-300">Ribosome</div>
          <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 dark:bg-green-950 px-2.5 py-1.5 font-medium text-green-700 dark:text-green-300">
            Mitochondrion <Check className="w-3.5 h-3.5" />
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 text-gray-600 dark:text-gray-300">Golgi apparatus</div>
        </div>
      </div>
    </div>
  );
}

function SetupCard({ id, name, note, steps }: { id: string; name: string; note: string; steps: React.ReactNode[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${card} p-6 md:p-8 scroll-mt-20`}>
      <h3 id={`${id}-heading`} className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        Add it to {name}
      </h3>
      <p className="mt-2 mb-6 text-sm text-gray-500 dark:text-gray-400">{note}</p>
      <Steps steps={steps} />
    </section>
  );
}

export default function ConnectPage() {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50/40 to-gray-50 dark:from-orange-950/40 dark:via-transparent dark:to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-900 bg-white/70 dark:bg-gray-900/70 px-3 py-1 text-sm font-medium text-orange-700 dark:text-orange-300">
              <Sparkles className="w-4 h-4" aria-hidden="true" /> Works in Claude and ChatGPT
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 leading-[1.05]">
              Turn any chat into a <span className="text-orange-600 dark:text-orange-400">practice test</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Paste your notes, get a quiz with a link.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#add-to-claude"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3.5 font-semibold"
              >
                <Link2 className="w-4 h-4" aria-hidden="true" /> Add it to Claude
              </a>
              <a
                href="#add-to-chatgpt"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-gray-900 px-6 py-3.5 font-semibold"
              >
                <Link2 className="w-4 h-4" aria-hidden="true" /> Add it to ChatGPT
              </a>
            </div>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">Free · takes 2 minutes</p>
          </div>
          <ChatMock />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 md:pb-28 space-y-20 md:space-y-28">
        <section aria-labelledby="what-heading">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className={eyebrow}>What it does</p>
            <h2 id="what-heading" className={`${h2Class} mt-2`}>
              Two things it does
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className={`${card} p-7 md:p-8 flex flex-col`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Make a quiz from anything</h3>
              <ul className="space-y-2.5 text-gray-600 dark:text-gray-300">
                {[
                  "Paste notes or a PDF.",
                  "Get a quiz link to play or share.",
                  "See who played and what they missed.",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-7 md:p-8 flex flex-col`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Keep learning your tests in progress</h3>
              <ul className="space-y-2.5 text-gray-600 dark:text-gray-300">
                {[
                  "Choose from your saved exams and custom quizzes.",
                  "Resume practice and drill the topics you keep missing.",
                  "Chat practice updates your TigerTest account progress.",
                  "Continue timed or adaptive test sittings on the website.",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-500" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="setup-heading">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className={eyebrow}>Set it up</p>
            <h2 id="setup-heading" className={`${h2Class} mt-2`}>
              Two minutes, one URL
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Copy this URL, then follow the steps for your app.</p>
            <div className="mt-5 max-w-md mx-auto">
              <CopyUrl url={MCP_URL} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <SetupCard
              id="add-to-claude"
              name="Claude"
              note="Works on the Free plan. Team workspaces may need an owner to add it."
              steps={CLAUDE_STEPS}
            />
            <SetupCard
              id="add-to-chatgpt"
              name="ChatGPT"
              note="Depends on your plan. No option? Ask your workspace admin."
              steps={CHATGPT_STEPS}
            />
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto text-center">
            Menus change; see the{" "}
            <a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp" className="underline hover:text-gray-900 dark:hover:text-gray-50">
              official Claude guide
            </a>{" "}
            and the{" "}
            <a href="https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt" className="underline hover:text-gray-900 dark:hover:text-gray-50">
              official ChatGPT guide
            </a>
            . Your assistant writes the questions; TigerTest just saves them.
          </p>
        </section>

        <section aria-labelledby="try-heading">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className={eyebrow}>Things to try</p>
            <h2 id="try-heading" className={`${h2Class} mt-2`}>
              Just ask
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {PROMPT_GROUPS.map((g) => (
              <div key={g.label} className={`${card} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">{g.label}</h3>
                <ul className="space-y-2.5">
                  {g.prompts.map((p) => (
                    <li
                      key={p}
                      className={`rounded-xl bg-gray-50 dark:bg-gray-950 border-l-4 ${g.accent} px-4 py-3 text-gray-800 dark:text-gray-100`}
                    >
                      &ldquo;{p}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
          <section aria-labelledby="privacy-heading" className="rounded-3xl bg-gray-900 dark:bg-gray-900 text-white p-7 md:p-8 lg:sticky lg:top-24">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 id="privacy-heading" className="text-2xl font-bold mb-3">
              What the connector can see
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Only your own quizzes and progress, plus quizzes shared with you. It runs as your TigerTest account, and you can remove it anytime.
            </p>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={`${h2Class} mb-6`}>
              Questions
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900 dark:text-gray-50 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 px-6 py-12 md:px-12 md:py-14 text-white">
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your quizzes stay on TigerTest</h2>
              <p className="mt-3 text-lg text-orange-50 max-w-xl mx-auto md:mx-0">
                Edit, share and play them here, no chat needed.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-gray-900 hover:bg-orange-50 px-6 py-3.5 font-semibold"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" /> Make a quiz
                </Link>
                <Link
                  href="/quizzes"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 text-white hover:bg-white/10 px-6 py-3.5 font-semibold"
                >
                  <Library className="w-4 h-4" aria-hidden="true" /> Browse the library
                </Link>
                <Link
                  href="/q"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 text-white hover:bg-white/10 px-6 py-3.5 font-semibold"
                >
                  Play a quiz <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <Image src="/tiger.png" alt="" width={200} height={200} className="hidden md:block w-48 h-48 drop-shadow-xl" />
          </div>
        </section>
      </div>
    </div>
  );
}
