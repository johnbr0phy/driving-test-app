import "@/lib/banks/cacore";
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

const title = "BC CORE Exam Practice Test 2026 - Free CORE Hunter Exam Questions";
const metaDescription =
  "Free practice for the BC CORE hunter exam: 200 original questions on the Wildlife Act, the Hunting Regulation, firearm law, migratory bird rules, first aid and Aboriginal rights, written from the law itself.";
const description =
  "Free practice for the CORE (Conservation and Outdoor Recreation Education) written exam that first-time hunters in British Columbia pass before buying a licence: 200 original questions on the Wildlife Act and General Regulation, the Hunting Regulation, federal firearm storage and transport rules, migratory game birds, first aid for cold, shock and dehydration, and Aboriginal rights. Ethics, conservation and animal and bird identification are not covered. Four practice tests of 50 questions and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "bc core exam, core exam practice test, bc hunting test, core hunter exam, conservation and outdoor recreation education, bc hunter education, core manual questions, bc hunting licence test, bcwf core exam 2026",
  alternates: {
    canonical: `${siteUrl}/bc-core-hunter-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/bc-core-hunter-exam-practice-test`,
    images: [{ url: shareImageUrl("cacore"), width: 1200, height: 630, alt: "Tigertest free BC CORE hunter exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cacore")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the BC CORE exam?",
    a: "CORE stands for Conservation and Outdoor Recreation Education. It is the hunter education program that British Columbia residents complete before they can buy a first hunting licence. The program is run by the BC Wildlife Federation for the provincial government and has a written exam and a practical firearms handling exam. You can prepare through an in-person course with a certified CORE examiner, the BCWF online course, or self-study.",
  },
  {
    q: "How many questions are on the CORE written exam and what score do you need?",
    a: "The BC Wildlife Federation says the written exam is 90 multiple-choice questions based on the CORE Manual and the Hunting and Trapping Regulations Synopsis, and you need at least 68 points to pass, which is about 76%. Supplemental information in the manual is not tested. A failed exam must be retaken on a different day. The practice tests here have 50 questions each and use 38 of 50 as the target.",
  },
  {
    q: "What topics does the CORE exam cover?",
    a: "The BCWF lists conservation, ethics, law and regulations, first aid and survival, firearm safety, animal identification, bird identification, and Indigenous Peoples and hunting in BC. These practice tests cover the law and safety side of that list, from the Wildlife Act, the Hunting Regulation, the federal firearms regulations, the migratory bird rules, HealthLinkBC first aid advice and the Constitution Act. They do not cover conservation, ethics or animal and bird identification, because there is no official source we could read for them; use the CORE Manual for those.",
  },
  {
    q: "How are these practice tests different from the real exam?",
    a: "Each of the four practice tests has 50 questions drawn across the law topics, with no question repeated in another test, and every answer explains the rule behind it. They teach the rules that stay the same from year to year. Season dates, bag limits, fees and the current Synopsis change annually, so read this year's Synopsis before you book. The practical firearms test, where you handle two of five action types, has to be learned hands-on and is not modelled.",
  },
  {
    q: "Are these the real CORE exam questions?",
    a: "No. Every question is original, written by Tigertest from the Wildlife Act, the Hunting Regulation, the federal firearms storage and handling regulations, the Migratory Birds Regulations, 2022 and public first aid pages. It is free practice for hunting knowledge, not affiliated with the BC Wildlife Federation or the Province of British Columbia, and it does not replace the CORE course, the CORE Manual or the Synopsis.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free BC CORE Hunter Exam Practice Test",
      description,
      url: `${siteUrl}/bc-core-hunter-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cacore", "CAD"),
      featureList: [
        "200 CORE hunter exam practice questions",
        "4 practice tests of 50 questions",
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
        classFaqJsonLd("cacore"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Wildlife Act and General Regulation", weight: "12 per test" },
  { name: "Hunting Regulation: weapons and methods", weight: "15 per test" },
  { name: "Firearm law, storage and transport", weight: "10 per test" },
  { name: "Game birds and migratory bird rules", weight: "7 per test" },
  { name: "First aid for cold, shock and dehydration", weight: "4 per test" },
  { name: "Aboriginal rights and hunting", weight: "2 per test" },
];

export default function BcCoreLandingPage() {
  return (
    <div data-theme="cacore" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free BC CORE Hunter Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bc-core-hunter-exam/dashboard"
            shortName="CORE exam"
            subtitle="200 BC CORE hunter exam questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cacore-mobile.png", desktop: "/landing/cacore-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cacore" />

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
                Four training sets: the Wildlife Act and General Regulation, the Hunting Regulation, firearm law with storage and transport, and game birds with first aid and Aboriginal rights. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests Across Every Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, each drawn across all the CORE topics with a 38 of 50 target. No question appears in more than one test, and every answer explains the rule behind it.
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
                Built on the CORE Topics and BC Hunting Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real written exam is 90 multiple-choice questions on the CORE Manual and the Hunting and Trapping Regulations Synopsis. The BC Wildlife Federation publishes no topic weights, so each test here follows its topic list, with most questions on the law and firearm safety:
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
                src={getTigerAsset("cacore", 3)}
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
            How to Pass the CORE Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the Synopsis and the CORE Manual</h3>
              <p>
                The exam is based on both. Season dates, limits and fees change every year, so read the current Hunting and Trapping Regulations Synopsis, and use these tests for the rules that stay the same: licensing duties, weapon rules, safe handling and field practice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Hunting Regulation&apos;s weapon rules</h3>
              <p>
                Which firearms, shot, bullets and bows are allowed for which animals, the prohibited hours, baiting and call rules, and the parts that must stay on a carcass are favourite exam topics. Learn them by species group.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise safe handling</h3>
              <p>
                Treat every firearm as loaded, control the muzzle, keep your finger off the trigger, know your target and what is beyond it, and learn the federal rules for storing and transporting firearms. If you have not taken the Canadian Firearms Safety Course, the practical test is where you show it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Review what you miss</h3>
              <p>
                Finish every training set, then aim for 38 or more on each practice test. Missed questions come back until you master them, so your weakest topic gets the most practice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CORE Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cacore" />
        </div>
      </div>

      <ExamSampleQuestions examId="cacore" />

      <ExamRelatedTests examId="cacore" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your CORE Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all the CORE topics.</p>
          <ExamLandingCTA dashboardHref="/bc-core-hunter-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
