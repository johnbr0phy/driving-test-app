import { shareImageUrl } from "@/lib/shareImageUrl";
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

const title = "Free Times Tables Practice Test - Year 2 to Year 4 MTC";
const metaDescription =
  "Free times tables practice for primary school: the 2s, 5s and 10s up to 12 × 12 in the order school teaches them, a short lesson for each table, and practice checks like the Year 4 MTC.";
const description =
  "Free times tables practice for children at primary school in England. Six drills follow the national curriculum order (2s, 5s and 10s in Year 2; 3s, 4s and 8s in Year 3; 6s, 7s, 9s, 11s and 12s in Year 4) plus dividing and word problems, and each drill starts with a short click-through lesson that teaches a trick for that table. Four 25-question practice checks work like the Year 4 Multiplication Tables Check, with a 6-seconds-a-question clock or untimed. Every miss comes back until it is learned. Free, with no account needed.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "times tables practice, times tables test, multiplication tables check, MTC practice, Year 4 multiplication check, times tables for kids, 2 5 and 10 times tables, 3 4 and 8 times tables, 7 times table trick, KS1 times tables, KS2 times tables",
  alternates: {
    canonical: `${siteUrl}/times-tables-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/times-tables-practice-test`,
    images: [{ url: shareImageUrl("timestables"), width: 1200, height: 630, alt: "Tigertest free times tables practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("timestables")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Which times tables should my child know by which year?",
    a: "The national curriculum in England sets the order. In Year 2 children learn the 2, 5 and 10 times tables, in Year 3 the 3, 4 and 8 times tables, and by the end of Year 4 every table up to 12 × 12. The Tigertest drills follow exactly that order, so a Year 2 child can start at the top and stop when they reach the tables their class has not done yet.",
  },
  {
    q: "What is the Multiplication Tables Check?",
    a: "A short on-screen check every Year 4 pupil in England takes at school in June. It is 25 multiplication questions on the 2 to 12 times tables, with 6 seconds to type each answer and a 3-second pause between questions. The 6, 7, 8, 9 and 12 times tables come up most. There is no pass mark; the school sees a score out of 25.",
  },
  {
    q: "My child is younger than Year 4. Is this too hard?",
    a: "No. Start with the 2s, 5s and 10s drill and Check 1, which only uses those three tables. Check 2 adds the Year 3 tables, and only Checks 3 and 4 use everything to 12 × 12. Any check can be taken untimed, so there is no rush while the tables are new.",
  },
  {
    q: "What are the lessons?",
    a: "Each drill opens with short lessons a child taps through: what × means (lots of), swapping the numbers round, doubling for the 2s, 4s and 8s, 5 lots and 2 lots for the 7s, 10 lots take away 1 lot for the 9s, and more. Every lesson asks the child to supply each step rather than just watch, then checks it with two quick questions. A missed drill question offers that table's trick again.",
  },
  {
    q: "How long should we practise each day?",
    a: "Five to ten minutes is plenty. One drill is 20 questions, and a check takes under three minutes. Little and often works better for times tables than one long session, and the drills bring back every question your child missed until they get it right.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: every lesson, drill and practice check, with no account needed. An account saves progress across devices, so a child can practise on a tablet at home and a phone in the car.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Times Tables Practice",
      description,
      url: `${siteUrl}/times-tables-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Every times table from 2 to 12, in national curriculum order",
        "A short click-through lesson with a trick for each table",
        "Six mastery drills, including dividing and word problems",
        "Four 25-question practice checks like the Year 4 MTC",
        "6 seconds a question, or untimed",
        "Every missed question comes back until it is learned",
        "Free class dashboards for teachers",
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
        classFaqJsonLd("timestables"),
      ],
    },
  ],
};

const steps = [
  { name: "2s, 5s and 10s", when: "Year 2", trick: "Double it, count in 5s, digits move left" },
  { name: "3s, 4s and 8s", when: "Year 3", trick: "Swap them round, double, double, double" },
  { name: "6s, 7s and 9s", when: "Year 4", trick: "5 lots and 2 lots, 10 lots take away 1" },
  { name: "11s and 12s", when: "Year 4", trick: "Say it twice, 10 lots and 2 lots" },
  { name: "Dividing", when: "Years 2 to 4", trick: "Times and divide are a family" },
  { name: "Times table stories", when: "Years 2 to 4", trick: "Spot the each, every and share words" },
];

export default function TimesTablesLandingPage() {
  return (
    <div data-theme="timestables" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Times Tables Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/times-tables/dashboard"
            shortName="Times Tables"
            subtitle="From the 2s, 5s and 10s up to 12 × 12, in the order school teaches them. A short lesson for every table, then drills and practice checks like the Year 4 MTC. Free, no account needed."
            shots={{ mobile: "/landing/timestables-mobile.png", desktop: "/landing/timestables-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="timestables" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">A Lesson, Then a Drill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each drill starts with a short lesson your child taps through, like doubling for the 4s or 5 lots and 2 lots for the 7s, then 20 questions from easy to hard. Type the answer, see straight away if it is right, and every miss comes back until it is learned.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Checks</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four checks of 25 questions, one at a time with no going back, like the Year 4 Multiplication Tables Check. Check 1 is just the 2s, 5s and 10s; Checks 3 and 4 use every table. Take them on the 6-seconds-a-question clock or untimed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum order */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">In the Order School Teaches Them</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The drills follow the national curriculum in England, so your child practises the tables their class is learning now, each with its own trick.
              </p>
              <div className="space-y-3">
                {steps.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{s.trick}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{s.when}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("timestables", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a Primary Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as homework for free: share one link, children join with just their first name, and you see who practised, their check scores and the tables your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Learn the Times Tables</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Understand before you memorise</h3>
              <p>
                3 × 4 means 3 lots of 4. A child who knows that can always work an answer out, and working it out a few times is what makes it stick. The first lesson in the first drill starts there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Use the facts you already know</h3>
              <p>
                Swapping the numbers round halves the work: know 3 × 8 and you know 8 × 3. The 4s are the 2s doubled, the 8s are the 4s doubled, the 9s are the 10s take away one lot. Each lesson teaches the trick for its table.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Little and often</h3>
              <p>
                Five or ten minutes a day beats an hour at the weekend. A drill is 20 questions and the missed ones come back, so a short session always ends on the facts that need it most.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Add the clock last</h3>
              <p>
                The Year 4 check gives 6 seconds a question, which means knowing the answer rather than working it out. Take the checks untimed first, then switch the clock on once the tables feel easy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">Times Tables Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="timestables" />
        </div>
      </div>

      <ExamRelatedTests examId="timestables" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the 2s, 5s and 10s.</p>
          <ExamLandingCTA dashboardHref="/times-tables/dashboard" />
        </div>
      </div>
    </div>
  );
}
