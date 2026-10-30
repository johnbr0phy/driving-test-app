import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "SIA Door Supervisor Practice Test 2026 - Free Mock Exams";
const metaDescription =
  "Free SIA door supervisor mock exams: 200 original questions on the law, arrest, searching, licensing, drugs, terrorism, conflict and physical intervention. All explained.";
const description =
  "Free practice for the four multiple-choice exams of the Level 2 Award for Door Supervisors in the Private Security Industry, the SIA licence-linked qualification: 200 original questions on the security industry and the law, health and safety and fire, communication and records, terrorism and vulnerable people, crime, drugs and evidence, licensing law, searching and queues, conflict management and physical intervention. Four 50-question mock exams weighted like the real unit exams, with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SIA door supervisor practice test, SIA mock exam, door supervisor exam questions, SIA licence test 2026, level 2 award door supervisor, door supervisor revision, bouncer licence test UK, SIA conflict management questions, physical intervention exam",
  alternates: {
    canonical: `${siteUrl}/sia-door-supervisor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sia-door-supervisor-practice-test`,
    images: [{ url: "/og/uksia", width: 1200, height: 630, alt: "Tigertest free SIA door supervisor practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/uksia"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What exams are in the SIA door supervisor course?",
    a: "The Level 2 Award for Door Supervisors in the Private Security Industry has four units, each with its own multiple-choice exam: Principles of Working in the Private Security Industry (72 questions in 110 minutes), Principles of Working as a Door Supervisor (50 questions in 75 minutes), Application of Conflict Management (20 questions in 30 minutes) and Application of Physical Intervention Skills (30 questions in 45 minutes). That is 172 questions in all. Each unit also has a practical assessment with your trainer. These mock exams mix the four units in the same proportions.",
  },
  {
    q: "What is the pass mark for the SIA door supervisor exams?",
    a: "You need 70 percent on the first three unit exams (50 of 72, 35 of 50 and 14 of 20) and 80 percent on the physical intervention exam (24 of 30). The practical assessments must be passed in full. The mock exams here use a 70 percent pass line, so aim for 80 percent or more on the conflict management and physical intervention questions.",
  },
  {
    q: "How do I get an SIA door supervisor licence?",
    a: "You must be 18 or over, hold a valid Emergency First Aid at Work or First Aid at Work qualification before the course starts, complete the Level 2 Award with an approved training provider, then apply to the SIA, which checks your identity and criminal record. The licence costs 204 pounds and lasts 3 years. Since April 2025 you also need refresher training before you can renew.",
  },
  {
    q: "Does this cover the law in Scotland and Northern Ireland?",
    a: "The licensing law, arrest and use of force questions follow the law of England and Wales, as most door supervisor courses do: the Licensing Act 2003, section 24A of PACE 1984 and the Criminal Law Act 1967. Scotland has its own licensing law with five licensing objectives, and arrest powers there come from the common law, so check those points with your trainer if you work in Scotland or Northern Ireland.",
  },
  {
    q: "Is the SIA door supervisor qualification changing?",
    a: "The SIA began a review of all licence-linked qualifications in November 2025, with new qualifications expected to become mandatory in spring 2027. Until then the units and exams are those introduced in April 2021, which these practice questions follow. One question covers Martyn's Law, the Terrorism (Protection of Premises) Act 2025, because the SIA is its regulator.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SIA Door Supervisor Practice Tests",
      description,
      url: `${siteUrl}/sia-door-supervisor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 SIA door supervisor practice questions",
        "4 mock exams of 50 questions weighted like the four unit exams",
        "4 training sets, one per mock exam",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("uksia"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security Industry, Law & Arrest", weight: "14%" },
  { name: "Health & Safety, Fire & Emergencies", weight: "10%" },
  { name: "Communication, Records & Post-Incident", weight: "8%" },
  { name: "Terrorism & Vulnerable People", weight: "10%" },
  { name: "Crime, Drugs & Evidence", weight: "14%" },
  { name: "Licensing Law, Searching & Queues", weight: "14%" },
  { name: "Conflict Management", weight: "12%" },
  { name: "Physical Intervention", weight: "18%" },
];

export default function UksiaLandingPage() {
  return (
    <div data-theme="uksia" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            SIA Door Supervisor Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sia-door-supervisor/dashboard"
            shortName="Door Supervisor"
            subtitle="200 original questions for the four unit exams of the SIA door supervisor course: the law and arrest, licensing, searching, drugs, terrorism, conflict and physical intervention. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uksia-mobile.png", desktop: "/landing/uksia-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uksia" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock exam: Set 1 holds exactly the 50 questions of Mock Exam 1, and so on. Master Set 1, then sit Mock Exam 1. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock exams that mix all four units in the same proportions as the 172 real exam questions, with a 70 percent pass line and an explanation of the right answer on every question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the SIA Door Supervision Specification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow the learning outcomes the SIA sets for every awarding body&apos;s door supervisor qualification. The core unit (72 exam questions) is split into its four themes, the door supervision unit (50) into two, and conflict management (20) and physical intervention (30) have one each. The percentages below are the share of each mock exam. Emergency first aid is a separate qualification you take before the course and is not tested here.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("uksia", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For trainers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Trainers</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Running a door supervisor course? Set up a free class at{" "}
            <Link href="/teach" className="text-brand-dark font-medium underline underline-offset-2">
              tigertest.io/teach
            </Link>
            , share one link, and learners join with just their name. Give them the training sets as self-study between sessions, then see their mock exam scores and the topics the group misses most before exam day.
          </p>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the SIA Door Supervisor Exams
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your powers, and their limits</h3>
              <p>
                A licence gives you no special powers. You search only with consent, you arrest only as any citizen can under section 24A of PACE, for an indictable offence and only when a constable cannot, and any force must be reasonable and necessary. Many questions test exactly where those limits sit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the lists and numbers as a set</h3>
              <p>
                Four licensing objectives, five threat levels, nine protected characteristics, the fire triangle and fire classes A to F, the HOT principles and the Four Cs, 100, 200 and 400 metres for suspicious items and 15 metres for radios, 70 percent on three exams and 80 on the fourth. Put them on one card and drill it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Treat physical intervention as safety, not technique</h3>
              <p>
                The written physical intervention exam is about risk: positional asphyxia, ground restraint, acute behavioural disturbance, the red flags that mean release now, and what to tell paramedics. It has the highest pass mark, so give it the most revision.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest to 90 percent</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each mock exam, drill the questions you missed, retrain that exam&apos;s set and retake it until you clear 90 percent, then sit all four back to back before your course exams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SIA Door Supervisor Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="uksia" />
        </div>
      </div>

      <ExamRelatedTests examId="uksia" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your SIA Exams?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four units.</p>
          <ExamLandingCTA dashboardHref="/sia-door-supervisor/dashboard" />
        </div>
      </div>
    </div>
  );
}
