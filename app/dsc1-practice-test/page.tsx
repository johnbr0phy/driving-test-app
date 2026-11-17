import "@/lib/banks/ukdsc1";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;
const path = "/dsc1-practice-test";

const title = "DSC1 Practice Test 2026 - Free Deer Stalking Certificate Level 1 Questions";
const metaDescription =
  "Free practice for the Deer Stalking Certificate Level 1 (DSC1) written test: 200 original questions on deer biology, the six species, close seasons and law, firearms safety, shot placement and carcass hygiene, in four 50-question tests.";
const description =
  "Free practice for the DSC1 written assessment from Deer Management Qualifications: 200 original questions on deer biology and ecology, identifying the six wild species, the Deer Act 1991 and Deer (Scotland) Act 1996 with their close seasons, firearms and ammunition rules, safety, shot placement and follow up, and carcass handling and large game hygiene. Four 50-question tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "dsc1 practice test, deer stalking certificate level 1, dsc level 1 questions, dsc1 questions and answers, deer stalking test, deer close seasons uk, dmq dsc1, large game hygiene test",
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("ukdsc1"), width: 1200, height: 630, alt: "Tigertest free DSC1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [shareImageUrl("ukdsc1")], title, description: metaDescription },
};

const faqs = [
  {
    q: "What is the DSC1 written test?",
    a: "The Deer Stalking Certificate Level 1 is the entry qualification for stalking wild deer in Britain, run by Deer Management Qualifications (DMQ) with the British Deer Society and the Deer Initiative. The written assessment is multiple choice. It sits alongside a practical shooting test, a field assessment and a separate large game hygiene paper.",
  },
  {
    q: "How many questions are on the DSC1 and what score do you need?",
    a: "DMQ states the written paper is 50 multiple-choice questions and you need 40 correct, which is 80%. The large game hygiene paper is 40 questions with 32 correct to pass. Tigertest uses the same 80% line on its 50-question practice tests.",
  },
  {
    q: "Does the law differ between England and Scotland?",
    a: "Yes. England and Wales use the Deer Act 1991 and Scotland the Deer (Scotland) Act 1996, with different close seasons and rules. Scotland has had no close season for male deer since October 2023, while England and Wales still have them. Every question here says which country it means when the answer depends on it.",
  },
  {
    q: "What should I study for the DSC1?",
    a: "Deer biology and ecology, telling the six wild species apart, close seasons and the law, rifle and ammunition rules, safe handling and shot placement, follow up of wounded deer, and gralloching, larder handling and large game hygiene. Finish all four training sets, then aim for 40 of 50 on each practice test.",
  },
  {
    q: "Are these the real DSC1 questions?",
    a: "No. Every question is original, written by Tigertest from the Deer Act 1991, the Deer (Scotland) Act 1996, the firearms rules for deer calibres and the FSA wild game guidance. It is free practice, not affiliated with DMQ, the British Deer Society or the Deer Initiative, and it does not replace a DSC1 course or the practical assessments.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free DSC1 Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukdsc1", "GBP"),
      featureList: [
        "200 DSC1 practice questions",
        "4 tests of 50 questions",
        "4 training sets by topic",
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
        classFaqJsonLd("ukdsc1"),
      ].filter(Boolean),
    },
  ],
};

const contentAreas = [
  { name: "Deer biology and ecology", weight: "8 per test" },
  { name: "Identifying the six species", weight: "6 per test" },
  { name: "Deer law and close seasons", weight: "10 per test" },
  { name: "Firearms, ammunition and safety", weight: "8 per test" },
  { name: "Shot placement and follow up", weight: "7 per test" },
  { name: "Carcass handling and large game hygiene", weight: "11 per test" },
];

export default function Dsc1LandingPage() {
  return (
    <div data-theme="ukdsc1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free DSC1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/deer-stalking-certificate/dashboard"
            shortName="DSC1 test"
            subtitle="200 original questions on the Deer Stalking Certificate Level 1: deer biology, the six species, close seasons and law, firearms safety, shot placement and carcass hygiene. Four 50-question tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/ukdsc1-mobile.png", desktop: "/landing/ukdsc1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukdsc1" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: deer biology and identification, law and close seasons, firearms, safety and shot placement, and carcass handling and hygiene. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, like the real written paper, each drawn across the whole syllabus with a 40 of 50 target. No question appears in more than one test, and every answer explains the rule behind it.
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
                Built on the DSC1 syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real written paper is 50 multiple-choice questions with 40 correct to pass. DMQ publishes no topic weights, so each test here follows the syllabus areas:
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
                src={getTigerAsset("ukdsc1", 3)}
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
            How to Pass the DSC1 Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the close seasons for each country</h3>
              <p>
                England and Wales, and Scotland, have different seasons for each species and sex. Learn them as a table, and remember that Scotland has had no close season for male deer since October 2023.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the six species by sight and sign</h3>
              <p>
                Red, fallow, roe, sika, muntjac and Chinese water deer: size, coat, antlers, tail and rump patch, plus the tracks and signs they leave. Many questions describe an animal in words and ask which species it is.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put safety and the shot first</h3>
              <p>
                Be sure of your target and what lies beyond it, take only a shot you are confident of, and know where the heart and lung area is. Know how to follow up a wounded deer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip hygiene</h3>
              <p>
                The hygiene paper has its own pass mark, so learn gralloching, the larder, carcass cooling and the trained person&apos;s checks. Finish every training set, then aim for 40 or more on each practice test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DSC1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ukdsc1" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukdsc1" />

      <ExamRelatedTests examId="ukdsc1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your DSC1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the whole DSC1 syllabus.</p>
          <ExamLandingCTA dashboardHref="/deer-stalking-certificate/dashboard" />
        </div>
      </div>
    </div>
  );
}
