// The /teach landing for instructors, in the style of the DMV homepage and
// the exam landings: hero with live mockups, how it works, what you see,
// every test on the site, FAQ, final call to action.

import Link from "next/link";
import { BarChart3, Gift, Link2, Lock, MonitorSmartphone, Plus, Smartphone } from "lucide-react";
import { TEST_CATALOG, TEST_GROUPS } from "@/lib/testCatalog";
import { BrowserPreview, PhonePreview } from "@/components/teach/TeachPreviews";
import { ClassQuestions } from "@/components/teach/ClassQuestions";
import { TeachLandingTracker } from "@/components/teach/TeachLandingTracker";
import type { ClassQuestionRow } from "@/lib/classes";

const SAMPLE_QUESTIONS: ClassQuestionRow[] = [
  {
    questionId: "sample-1",
    question: "Which drug reverses the anticoagulant effect of heparin?",
    options: ["Vitamin K", "Protamine sulfate", "Naloxone", "Flumazenil"],
    answer: "Protamine sulfate",
    topic: "Surgical Pharmacology",
    explanation: "Protamine sulfate binds heparin and neutralizes it. Vitamin K reverses warfarin; naloxone and flumazenil reverse opioids and benzodiazepines.",
    answered: 16,
    missed: 9,
    picks: [6, 0, 2, 1],
  },
  {
    questionId: "sample-2",
    question: "Which of these sutures is absorbable?",
    options: ["Silk", "Nylon", "Polyglactin 910", "Polypropylene"],
    answer: "Polyglactin 910",
    topic: "Intraoperative Procedures",
    explanation: "Polyglactin 910 (Vicryl) is absorbed over weeks. Silk, nylon and polypropylene are nonabsorbable.",
    answered: 17,
    missed: 6,
    picks: [4, 1, 0, 1],
  },
  {
    questionId: "sample-3",
    question: "A wrapped instrument tray comes out of the sterilizer wet. What should the surgical technologist do?",
    options: ["Use it once it dries", "Consider it contaminated and reprocess it", "Wipe it dry with a sterile towel", "Use it for a clean case only"],
    answer: "Consider it contaminated and reprocess it",
    topic: "Equipment Sterilization",
    explanation: "Moisture wicks microorganisms through the wrap, so a wet pack is treated as contaminated and goes back through processing.",
    answered: 15,
    missed: 4,
    picks: [1, 0, 3, 0],
  },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. Classes are free for teachers and students, with no limit on how many classes you make. TigerTest is paid for by optional upgrades on a few tests, never by your class.",
  },
  {
    q: "Do my students need accounts?",
    a: "No. They open your link, type the name you know them by, and start practicing. If they already have a TigerTest account they can stay signed in.",
  },
  {
    q: "What do I see?",
    a: "Who joined and when they last practiced, how many questions each student answered and their accuracy, their best practice test score, the topics your class misses most, and every question the class answered with how often it was missed.",
  },
  {
    q: "Does it work with Canvas, Blackboard or Google Classroom?",
    a: "Yes. Paste the class link into an assignment, a module or an announcement. It also works in an email, a text or on a projector as a QR code.",
  },
  {
    q: "What about student privacy?",
    a: "Students give a name and nothing else: no email, no account, no birthday. Their practice is visible only to you. They see a note on every dashboard that their scores are shared with you, and can leave the class at any time.",
  },
  {
    q: "Can one class cover two tests?",
    a: "A class is for one test, so the topic breakdown means something. Make a second class for a second test; it takes a minute.",
  },
];

const STEPS = [
  { icon: Plus, title: "Make a class", body: "Pick the test your students are preparing for. One minute, no credit card." },
  { icon: Link2, title: "Post one link", body: "Paste it into Canvas, Blackboard, Google Classroom or an email. Or show the QR code in class." },
  { icon: Smartphone, title: "Students practice", body: "They join with just a name and practice on any phone or laptop. No app, no account." },
  { icon: BarChart3, title: "You see everything", body: "Who practiced, their scores, and the topics and questions your class keeps missing." },
];

const ctaClass =
  "inline-flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-lg font-medium rounded-full";

export function TeachLanding({ signedIn }: { signedIn: boolean }) {
  const newClass = (exam?: string) => {
    const target = `/teach/new${exam ? `?exam=${exam}` : ""}`;
    return signedIn ? target : `/signup?redirect=${encodeURIComponent(target)}`;
  };
  const testCount = TEST_CATALOG.length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeachLandingTracker />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight text-balance">
            Free practice tests for your whole class
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Post one link. Students practice on their phones with just a name. You see who practiced, their scores, and exactly what your class keeps getting wrong.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link href={newClass()} className={ctaClass}>Create a free class</Link>
            {!signedIn && (
              <Link href="/login?redirect=/teach" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline">
                Already teaching with TigerTest? Sign in
              </Link>
            )}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8 lg:gap-10">
            <div className="shrink-0">
              <PhonePreview />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:hidden">Students join with just a name</p>
            </div>
            <div className="w-full md:w-auto md:flex-1 max-w-[640px]">
              <BrowserPreview />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:hidden">You see the whole class</p>
            </div>
          </div>
          <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mt-8">
            Students join on their phone with just a name. You see the whole class.
          </p>
        </div>
      </div>

      {/* Numbers */}
      <div className="border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            [`${testCount}`, "tests, from DMV to NCLEX"],
            ["1", "link for your whole class"],
            ["$0", "for you and your students"],
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-14">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative pt-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
                <Icon className="w-7 h-7 text-brand-dark" aria-hidden="true" />
              </div>
              <div className="h-full bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 pt-12 text-center">
                <p className="text-xs font-semibold text-gray-400 mb-1">Step {i + 1}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What you see */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <div className="md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-3">Know what to reteach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-5">See the questions your class keeps missing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Every question your students answer is counted. Sort by most missed, tap one to see the answer and the explanation, and walk the class through it tomorrow.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              {[
                [BarChart3, "Accuracy by topic, weakest first, against the real pass mark"],
                [MonitorSmartphone, "Each student's questions answered, accuracy and best practice test"],
                [Lock, "Students share a name only; you're the only one who sees their scores"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof BarChart3;
                return (
                  <li key={text as string} className="flex gap-3">
                    <I className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-dark" aria-hidden="true" />
                    <span>{text as string}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 md:p-5 shadow-xl">
            <ClassQuestions questions={SAMPLE_QUESTIONS} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Sample class. Tap a question.</p>
          </div>
        </div>
      </div>

      {/* Instructor callout */}
      <div className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We&apos;re building this for instructors</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We want to work with teachers to make TigerTest great for your class. Get in touch and tell us what you teach and what would help, and we&apos;ll build it with you.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Every test */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">Works with every test on TigerTest</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Driver&apos;s ed, nursing and allied health programs, trade schools, test prep. Pick a test to start a class for it.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEST_GROUPS.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-3">{g.title}</h3>
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
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-10">Questions teachers ask</h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-brand-light py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Gift className="w-8 h-8 mx-auto mb-4 text-brand-dark" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Your class could be practicing tonight</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Make a class, post the link, and watch the first students show up.</p>
          <Link href={newClass()} className={ctaClass}>Create a free class</Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
            Questions? Email <a href="mailto:john@tigertest.io" className="underline">john@tigertest.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
