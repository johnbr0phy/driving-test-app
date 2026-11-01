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

const title = "Australian Citizenship Test Practice 2026 - Free Mock Tests";
const metaDescription =
  "Free Australian citizenship test practice: 200 original questions from Our Common Bond, eight 20-question mock tests and a separate Australian values set, every answer explained.";
const description =
  "Free practice for the Australian citizenship test, written from the Home Affairs book Australian Citizenship: Our Common Bond. 200 original questions on Australia and its people, democratic beliefs, rights and liberties, government and the law, and Australian values. Eight mock tests of 20 questions like the real test, with a 75 percent pass line and five values questions in every test, plus a training set for each part of the book.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "australian citizenship test, australian citizenship test practice, citizenship test australia questions, our common bond practice test, australian values questions, australian citizenship mock test, citizenship test 20 questions 75%",
  alternates: {
    canonical: `${siteUrl}/australian-citizenship-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/australian-citizenship-test`,
    images: [{ url: shareImageUrl("aucit"), width: 1200, height: 630, alt: "Tigertest free Australian citizenship test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aucit")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Australian citizenship test?",
    a: "It is a computer-based test in English of 20 multiple-choice questions, with 45 minutes to answer them. Every question comes from the testable section of the Home Affairs book Australian Citizenship: Our Common Bond, which has four parts: Australia and its people; Australia's democratic beliefs, rights and liberties; government and the law in Australia; and Australian values. Five of the 20 questions are about Australian values.",
  },
  {
    q: "What is the pass mark, and why must I get all five values questions right?",
    a: "You need at least 75 percent overall, which is 15 of the 20 questions, and you must also answer all five Australian values questions correctly. The values rule is separate: 19 out of 20 is a fail if the one you missed is a values question. That is why Tigertest trains the values part on its own and puts five values questions in every mock test.",
  },
  {
    q: "What do I need to study for the citizenship test?",
    a: "Only the testable section of Our Common Bond, the first four parts of the book. Home Affairs says everything you need to pass is in it, and you do not need to buy any other study package. The book is free on the Home Affairs website and comes in many languages, but the test itself is in English.",
  },
  {
    q: "How do the Tigertest mock tests compare with the real test?",
    a: "Each of the eight mock tests has 20 questions, as the real test does: five on Australia and its people, four on democratic beliefs, rights and liberties, six on government and the law, and five on Australian values. Home Affairs does not publish how the 15 non-values questions are split, so that mix is ours. The pass line is 75 percent; Tigertest scores the overall mark, so check your five values answers yourself after each test.",
  },
  {
    q: "Are these the official citizenship test questions?",
    a: "No. Every question is written by Tigertest from the current edition of Our Common Bond, so it tests the same knowledge without copying the official test or the free Home Affairs practice test. It is free study practice, not an official resource, and it does not replace reading the book.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Australian Citizenship Test Practice",
      description,
      url: `${siteUrl}/australian-citizenship-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 Australian citizenship test practice questions",
        "8 mock tests of 20 questions with a 75% pass line",
        "5 Australian values questions in every mock test",
        "4 training sets, one per part of Our Common Bond",
        "Instant feedback with explanations",
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
        classFaqJsonLd("aucit"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Australia and its people", weight: "5 of 20" },
  { name: "Democratic beliefs, rights & liberties", weight: "4 of 20" },
  { name: "Government & the law", weight: "6 of 20" },
  { name: "Australian values (all 5 must be right)", weight: "5 of 20" },
];

export default function AustralianCitizenshipLandingPage() {
  return (
    <div data-theme="aucit" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Australian Citizenship Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/australian-citizenship/dashboard"
            shortName="Citizenship"
            subtitle="200 original questions from Our Common Bond, eight 20-question mock tests and a values set to make sure you get all five values questions right. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aucit-mobile.png", desktop: "/landing/aucit-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aucit" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Each Part of the Book</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each part of Our Common Bond. Australian values has a set of its own, because a single values mistake fails the real test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight 20-question mock tests, the same length as the real test, each with five values questions and a 75 percent pass line. Every question has an explanation of the right answer.
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
                Built on Our Common Bond
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real test draws 20 questions from the four testable parts of the book, and five of them are always about Australian values. To pass you need 15 or more correct and every values question right. Each Tigertest mock test follows that shape. Teachers running citizenship or English classes can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap ml-3">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("aucit", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
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
            How to Pass the Australian Citizenship Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the values part first</h3>
              <p>
                Five questions are about Australian values, and you must get all five right however well you do on the rest. Know the Rule of Law (everyone obeys the law, even when no one is watching), the freedoms of speech, association and religion and their limits, equality of men and women, the fair go, mutual respect and mateship, English as the national language, and that practices such as forced marriage and polygamy are against the law.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers and names</h3>
              <p>
                Six states and two mainland territories with their capitals; 26 January 1788 and the First Fleet of 11 ships under Captain Arthur Phillip; Federation on 1 January 1901; Anzac Day on 25 April; 76 senators, 12 per state and two per territory; the double majority for a referendum; voting from 18; and King Charles III as Head of State, represented by the Governor-General.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who does what</h3>
              <p>
                Separate the three powers (Parliament makes laws, the Executive puts them into practice, judges interpret them) and the three levels of government: the Australian Government for defence, immigration and tax, the states for schools, hospitals and police, and local councils for rubbish, parks and building permits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by part of the book. Aim for 18 or more out of 20 on every mock test with no values question wrong, then drill the questions you missed and retrain that part&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Australian Citizenship Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aucit" />
        </div>
      </div>

      <ExamRelatedTests examId="aucit" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Citizenship Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four parts of Our Common Bond.</p>
          <ExamLandingCTA dashboardHref="/australian-citizenship/dashboard" />
        </div>
      </div>
    </div>
  );
}
