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

const title = "Free WHMIS Practice Test 2026 - WHMIS Quiz Canada";
const metaDescription =
  "Free WHMIS practice test: 200 original questions on WHMIS 2015 pictograms, supplier and workplace labels, the 16-section SDS, hazard classes and the 2022 amendments.";
const description =
  "Free WHMIS practice tests for Canadian workers and students: 200 original questions on WHMIS 2015 and the amended Hazardous Products Regulations, covering roles and laws, hazard classes and categories, the GHS pictograms, supplier and workplace labels, the 16 sections of a safety data sheet, and safe handling, storage and emergency response. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "WHMIS practice test, WHMIS quiz, WHMIS 2015 test answers, WHMIS symbols quiz, WHMIS pictograms test, WHMIS training Canada, safety data sheet quiz, free WHMIS test",
  alternates: {
    canonical: `${siteUrl}/whmis-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/whmis-practice-test`,
    images: [{ url: shareImageUrl("cawhmis"), width: 1200, height: 630, alt: "Tigertest free WHMIS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cawhmis")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free WHMIS Practice Tests",
      description,
      url: `${siteUrl}/whmis-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 WHMIS practice questions",
        "4 practice tests across all six topic groups",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What score do I need to pass a WHMIS test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single national WHMIS exam. Each employer or training provider ends its course with its own quiz and sets its own pass mark, so the practice tests here use an 80 percent pass line as a study target. Clearing it on all four tests means you know the labels, pictograms and safety data sheets well enough for any WHMIS course quiz.",
          },
        },
        {
          "@type": "Question",
          name: "Who needs WHMIS training in Canada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every worker who works with or near a hazardous product, or may be exposed to one, must get WHMIS education and training before using it. That covers general education on how the system works and workplace-specific training on the products and procedures at that site. Many colleges and co-op programs also ask students to finish WHMIS before a placement.",
          },
        },
        {
          "@type": "Question",
          name: "How often do I need to redo WHMIS training?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WHMIS training has no national expiry date. Most provinces and territories require the employer to review the training at least once a year, and again whenever products, hazards or procedures change. Your new employer will normally train you again on its own products, so the exact rule varies by jurisdiction.",
          },
        },
        {
          "@type": "Question",
          name: "What changed in WHMIS with the 2022 amendments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Health Canada amended the Hazardous Products Regulations on December 15, 2022, aligning WHMIS with the 7th revised edition of the GHS. The changes added a chemicals under pressure class, a non-flammable aerosol category, subcategories for flammable gases (pyrophoric gases moved into Category 1A) and new SDS disclosure rules. The transition ended on December 14, 2025, and the questions here follow the amended rules.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test replace my WHMIS certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It is a free study tool with 200 original questions, not a certificate. Your WHMIS training has to come from your employer or a training provider, and it must include training on the hazardous products at your own workplace. Use Tigertest to learn the pictograms, labels and safety data sheets before your course quiz, or to refresh them between reviews.",
          },
        },
        classFaqJsonLd("cawhmis"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "WHMIS Basics, Laws & Roles", weight: "16%" },
  { name: "Hazard Classes & Categories", weight: "14%" },
  { name: "Pictograms", weight: "18%" },
  { name: "Supplier & Workplace Labels", weight: "18%" },
  { name: "Safety Data Sheets", weight: "18%" },
  { name: "Safe Handling & Emergencies", weight: "16%" },
];

export default function WhmisLandingPage() {
  return (
    <div data-theme="cawhmis" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free WHMIS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/whmis/dashboard"
            shortName="WHMIS"
            subtitle="200 questions on WHMIS 2015 pictograms, supplier and workplace labels, the 16-section safety data sheet, hazard classes and the 2022 amendments. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cawhmis-mobile.png", desktop: "/landing/cawhmis-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cawhmis" />

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
                Four 50-question tests across all six topic groups, with an 80 percent practice pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the Hazardous Products Regulations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every WHMIS course covers the same core: who does what, how hazards are classified, what each pictogram means, what goes on a supplier and a workplace label, and where to look on a safety data sheet. The practice tests here split their questions across those topics, with labels, pictograms and SDSs taking the most, because they are what you use on the job. Questions follow the Hazardous Products Regulations as amended in December 2022.
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
                src={getTigerAsset("cawhmis", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Trainers and Teachers</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running WHMIS for new hires, a co-op class or a college lab? Set up a free class at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          , share one link, and see which pictograms, label elements and SDS sections your group misses most before the course quiz. Pair it with your own workplace-specific training.
        </p>
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
            How to Pass Your WHMIS Quiz
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the pictograms in pairs</h3>
              <p>
                Most mistakes come from look-alikes: flame versus flame over circle (flammable versus oxidizer), exclamation mark versus health hazard (milder versus serious or long-term), and exclamation mark versus skull and crossbones (acute toxicity Category 4 versus Categories 1 to 3). Learn what separates each pair and remember that some classes, such as combustible dusts, have no pictogram at all.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know both kinds of label</h3>
              <p>
                A supplier label carries the product identifier, the initial supplier identifier, pictograms, one signal word, hazard statements, precautionary statements and any supplemental information, in English and French. A workplace label needs only the product identifier, safe handling information and a reference to the SDS. Know when each one is needed: decanting, products made on site and lost or unreadable labels.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Map the SDS to real questions</h3>
              <p>
                Instead of memorizing 16 titles in a row, tie each to a moment on the job: a splash (Section 4, first aid), a fire (5), a spill (6), storage (7), which gloves (8), what not to mix (10), long-term health effects (11). Sections 12 to 15 keep their headings in Canada but may be left without content, and Section 16 holds the revision date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed and retrain that test&apos;s set until it is mastered, then take the four tests back to back before your course quiz. Remember the general rules here are only half of WHMIS: your employer still has to train you on the products at your own workplace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          WHMIS Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass a WHMIS test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              There is no single national WHMIS exam. Each employer or training provider ends its course with its own quiz and sets its own pass mark, so the practice tests here use an 80 percent pass line as a study target. Clearing it on all four tests means you know the labels, pictograms and safety data sheets well enough for any WHMIS course quiz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who needs WHMIS training in Canada?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every worker who works with or near a hazardous product, or may be exposed to one, must get WHMIS education and training before using it. That covers general education on how the system works and workplace-specific training on the products and procedures at that site. Many colleges and co-op programs also ask students to finish WHMIS before a placement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How often do I need to redo WHMIS training?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              WHMIS training has no national expiry date. Most provinces and territories require the employer to review the training at least once a year, and again whenever products, hazards or procedures change. Your new employer will normally train you again on its own products, so the exact rule varies by jurisdiction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What changed in WHMIS with the 2022 amendments?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Health Canada amended the Hazardous Products Regulations on December 15, 2022, aligning WHMIS with the 7th revised edition of the GHS. The changes added a chemicals under pressure class, a non-flammable aerosol category, subcategories for flammable gases (pyrophoric gases moved into Category 1A) and new SDS disclosure rules. The transition ended on December 14, 2025, and the questions here follow the amended rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test replace my WHMIS certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. It is a free study tool with 200 original questions, not a certificate. Your WHMIS training has to come from your employer or a training provider, and it must include training on the hazardous products at your own workplace. Use Tigertest to learn the pictograms, labels and safety data sheets before your course quiz, or to refresh them between reviews.
            </p>
          </div>
          <ExamClassFaq examId="cawhmis" />
        </div>
      </div>

      <ExamRelatedTests examId="cawhmis" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your WHMIS Quiz?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six WHMIS topic groups.</p>
          <ExamLandingCTA dashboardHref="/whmis/dashboard" />
        </div>
      </div>
    </div>
  );
}
