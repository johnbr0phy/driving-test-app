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

const title = "RSA Practice Test 2026 - Free SITHFAB021 Questions (Australia)";
const metaDescription =
  "Free RSA practice test for SITHFAB021: 200 original questions on standard drinks, proof of age, signs of intoxication and refusing service, every answer explained.";
const description =
  "Free practice for SITHFAB021 Provide responsible service of alcohol, the national RSA unit in Australia: 200 original questions on RSA law and harm minimisation, minors and proof of age, standard drinks and the effects of alcohol, recognising intoxication, refusing service and handling difficult situations, and at-risk customers and venue safety. Four 50-question practice tests with an 80 percent readiness line and an explanation on every question.";

const faqs = [
  {
    q: "What is the RSA unit SITHFAB021?",
    a: "SITHFAB021 Provide responsible service of alcohol is the national unit of competency for anyone who sells, serves or supplies alcohol in Australia, from bar and bottle shop staff to cellar door staff, delivery drivers and security. It covers following RSA principles, helping customers drink within limits, assessing intoxication and refusing service. It replaced SITHFAB002 and is delivered by registered training organisations.",
  },
  {
    q: "Is there a pass mark for the RSA assessment?",
    a: "There is no single national exam. Your training organisation assesses you with knowledge questions and practical tasks, and most require every knowledge question to be answered correctly, with a chance to resubmit. The practice tests here use an 80 percent readiness line: if you score 40 of 50 or more on every test, you know the material well.",
  },
  {
    q: "Does my RSA work in every state?",
    a: "SITHFAB021 is a national unit, but each state and territory liquor regulator sets its own rules. Some require an approved local course, a bridging module, a photo competency card or a refresher after a set number of years, and others accept the unit as it is. Check the regulator in the state where you will work before you book.",
  },
  {
    q: "How many standard drinks are in common drinks?",
    a: "An Australian standard drink holds 10 grams of alcohol. Multiply the volume in litres by the alcohol percentage and by 0.789. A 375 mL can of full-strength beer at 4.8 percent is about 1.4 standard drinks, a 150 mL glass of wine at 13 percent about 1.5, and a 30 mL nip of spirits about 1.",
  },
  {
    q: "Are these the official RSA assessment questions?",
    a: "No. Every question is written by Tigertest from the SITHFAB021 unit and its assessment requirements, the national alcohol guidelines and the common parts of state liquor law. Where states differ, the questions say so rather than assume one state's rule. Your own course will also cover your state's specific laws.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RSA practice test, RSA quiz Australia, SITHFAB021 questions, responsible service of alcohol test, RSA course practice questions, RSA certificate test 2026, RSA answers NSW Victoria Queensland",
  alternates: {
    canonical: `${siteUrl}/rsa-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rsa-practice-test`,
    images: [{ url: shareImageUrl("aursa"), width: 1200, height: 630, alt: "Tigertest free RSA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aursa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RSA Practice Test",
      description,
      url: `${siteUrl}/rsa-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 RSA practice questions",
        "4 practice tests of 50 questions with an 80 percent readiness line",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("aursa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "RSA Law & Harm Minimisation", weight: "18%" },
  { name: "Minors & Proof of Age", weight: "18%" },
  { name: "Standard Drinks & Effects", weight: "18%" },
  { name: "Recognising Intoxication", weight: "18%" },
  { name: "Refusing Service", weight: "16%" },
  { name: "At-Risk Customers & Safety", weight: "12%" },
];

export default function RsaPracticeTestLandingPage() {
  return (
    <div data-theme="aursa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RSA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rsa/dashboard"
            shortName="RSA"
            subtitle="200 questions for SITHFAB021 Provide responsible service of alcohol: standard drinks, proof of age, signs of intoxication, refusing service and RSA law across Australia. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aursa-mobile.png", desktop: "/landing/aursa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aursa" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question practice tests across every part of the unit, with an 80 percent readiness line and an explanation of the right answer on every question.
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
                Built on SITHFAB021
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The national unit has four elements: follow RSA principles, help customers drink within limits, assess intoxication, and refuse service. Its assessment requirements list what you must know, from standard drinks and the factors that change how alcohol affects someone to the at-risk groups and how to deliver packaged liquor. The practice tests split that into six areas. Every question is original, and anything a state sets for itself is marked as varying by state.
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
                src={getTigerAsset("aursa", 1)}
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
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Running an RSA Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Trainers and hospitality teachers can set Tigertest as practice for free: post one link, learners join with just their name, and you see who practised, their test scores and the topics your group misses most before assessment.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass Your RSA
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers</h3>
              <p>
                A few figures carry many marks: 18 as the legal age, 10 grams in a standard drink, about one standard drink cleared an hour, no more than 10 a week and 4 on any day for healthy adults, 0.05 for fully licensed drivers and zero for learners and provisional drivers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the standard drinks sum</h3>
              <p>
                Litres times alcohol percentage times 0.789. Work out a can of beer, a glass of wine, a nip and a premix until you can do it in your head; questions often hinge on a drink being more than one standard drink.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the signs and the steps</h3>
              <p>
                Group the signs of intoxication by speech, balance, coordination and behaviour, and learn the early warnings such as fast drinking and ordering doubles. For a refusal: take them aside, be calm and clear, point to the law, offer water, food or transport, and call for help if it turns unsafe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four practice tests, then drill the questions you missed and retrain that test&apos;s set before your assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RSA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aursa" />
        </div>
      </div>

      <ExamRelatedTests examId="aursa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your RSA?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on responsible service of alcohol.</p>
          <ExamLandingCTA dashboardHref="/rsa/dashboard" />
        </div>
      </div>
    </div>
  );
}
