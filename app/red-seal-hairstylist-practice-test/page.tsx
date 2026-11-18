import "@/lib/banks/carshair";
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
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;
const path = "/red-seal-hairstylist-practice-test";

const title = "Free Red Seal Hairstylist Practice Test 2026 - Interprovincial Exam Prep";
const metaDescription =
  "Free Red Seal Hairstylist practice: 200 original questions on cutting, colour, lightening, perms, relaxers, styling and salon safety, weighted like the real exam. 70% to pass.";
const description =
  "Free practice for the Red Seal Hairstylist interprovincial exam: 200 original questions across all 8 Major Work Activities of the Red Seal Occupational Standard for Hairstylist, from safety, tools and client consultation to cutting, styling, chemical texture services, hair colour and salon operations. Four 50-question tests in the real exam's proportions with the 70% pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Red Seal hairstylist practice test, Red Seal hairstylist exam questions, interprovincial hairstylist exam, hairstylist certificate of qualification, hairstylist exam Canada 2026, hairdresser Red Seal practice, 332A practice",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("carshair"), width: 1200, height: 630, alt: "Tigertest free Red Seal Hairstylist practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("carshair")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Red Seal Hairstylist Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("carshair", "CAD"),
      featureList: [
        "200 Red Seal Hairstylist practice questions",
        "4 practice tests of 50 questions with the 70% pass mark",
        "Tests weighted like the Red Seal exam breakdown by Major Work Activity",
        "5 training sets by topic",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Red Seal Hairstylist exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 70 percent. The exam has 120 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives up to four hours to write it. Passing earns the Red Seal endorsement, which is recognized in every province and territory that takes part in the program.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Red Seal Hairstylist exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions follow the Red Seal Occupational Standard for Hairstylist, grouped into 8 Major Work Activities. The biggest are altering hair colour (25 questions) and cutting hair (24). Chemical texture services have 17, styling 16, common occupational skills 14, hair and scalp care 11, salon operations 7 and specialized services such as wigs, extensions and facial hair removal 6. The practice tests here keep those proportions in 50 questions.",
          },
        },
        {
          "@type": "Question",
          name: "Do Ontario hairstylists write the Red Seal exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not at present. 332A is the Ontario trade code for Hairstylist, and Skilled Trades Ontario says Ontario does not currently offer the Red Seal endorsement for this trade, so Ontario candidates write the provincial Certificate of Qualification exam. The skills are the same, so this practice still helps, but check the format with Skilled Trades Ontario.",
          },
        },
        {
          "@type": "Question",
          name: "Who can write the Red Seal Hairstylist exam and how do I book it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apprentices write it when they finish their technical training and work hours, and experienced hairstylists without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Red Seal exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard and Health Canada and CCOHS safety guidance, so it covers the same tasks without copying the exam. Always follow the manufacturer's directions for chemical products and your province's salon sanitation rules.",
          },
        },
        classFaqJsonLd("carshair"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "A. Common Occupational Skills", weight: "12%" },
  { name: "B. Hair & Scalp Care", weight: "10%" },
  { name: "C. Cutting Hair", weight: "20%" },
  { name: "D. Styling Hair", weight: "14%" },
  { name: "E. Chemical Texture Services", weight: "14%" },
  { name: "F. Hair Colour", weight: "20%" },
  { name: "G. Specialized Services", weight: "4%" },
  { name: "H. Salon Operations", weight: "6%" },
];

export default function RedSealHairstylistLandingPage() {
  return (
    <div data-theme="carshair" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Red Seal Hairstylist Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/red-seal-hairstylist/dashboard"
            shortName="Red Seal Hairstylist"
            subtitle="200 questions across all 8 Major Work Activities, from cutting and styling to perms, relaxers, colour and lightening, with the real 70% pass mark. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/carshair-mobile.png", desktop: "/landing/carshair-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="carshair" />

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
                Five training sets by topic, from Safety, Clients &amp; Hair Care to Colour Correction &amp; Salon Business. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the Red Seal exam breakdown, with the same 70% pass mark and an explanation of the right answer on every question.
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
                Built on the Red Seal Exam Breakdown
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Red Seal publishes how many of the 120 questions come from each of the 8 Major Work Activities in the Occupational Standard for Hairstylist, and the practice tests here keep that split in 50 questions. Colour and cutting carry the most weight: together they are about 40% of the exam. Instructors running a hairstyling apprenticeship or school class can assign Tigertest at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which work activities the class misses most.
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
                src={getTigerAsset("carshair", 3)}
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
            How to Pass the Red Seal Hairstylist Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master colour theory and developer strengths</h3>
              <p>
                Know the level system, the law of colour and which base neutralizes which unwanted tone, and the four developer strengths (10, 20, 30 and 40 volume) with what each one does. Colour, lightening and correction are the largest part of the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie every cut to its elevation and guideline</h3>
              <p>
                For each haircut, know the elevation, the sectioning and whether the guide is stationary or travelling, plus what overdirection does to length. Learn the texturizing techniques by name: point cutting, slide cutting, slithering, chunking and undercutting.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the chemistry of perms and relaxers</h3>
              <p>
                Thio waves and relaxers break bonds by reduction and are re-formed by an oxidizing neutralizer, while hydroxide relaxers cannot be re-formed and never mix with thio. Learn the wrap patterns, end paper techniques, test curls and the order of a relaxer application.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by work activity. Aim for 80% or better on all four practice tests before you book, so you have room above the 70% line. After each test, drill the questions you missed and retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Red Seal Hairstylist Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Red Seal Hairstylist exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 70 percent. The exam has 120 multiple-choice questions, each with four options and one correct answer, and the Red Seal exam preparation guide gives up to four hours to write it. Passing earns the Red Seal endorsement, which is recognized in every province and territory that takes part in the program.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Red Seal Hairstylist exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions follow the Red Seal Occupational Standard for Hairstylist, grouped into 8 Major Work Activities. The biggest are altering hair colour (25 questions) and cutting hair (24). Chemical texture services have 17, styling 16, common occupational skills 14, hair and scalp care 11, salon operations 7 and specialized services such as wigs, extensions and facial hair removal 6. The practice tests here keep those proportions in 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do Ontario hairstylists write the Red Seal exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Not at present. 332A is the Ontario trade code for Hairstylist, and Skilled Trades Ontario says Ontario does not currently offer the Red Seal endorsement for this trade, so Ontario candidates write the provincial Certificate of Qualification exam. The skills are the same, so this practice still helps, but check the format with Skilled Trades Ontario.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can write the Red Seal Hairstylist exam and how do I book it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apprentices write it when they finish their technical training and work hours, and experienced hairstylists without an apprenticeship can apply as trade qualifiers. Hours, fees, booking and retake rules are set by your provincial or territorial apprenticeship authority, so check with them before you apply.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Red Seal exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Red Seal exam questions are confidential. Every question here is written by Tigertest from the published exam breakdown, the Occupational Standard and Health Canada and CCOHS safety guidance, so it covers the same tasks without copying the exam. Always follow the manufacturer&apos;s directions for chemical products and your province&apos;s salon sanitation rules.
            </p>
          </div>
          <ExamClassFaq examId="carshair" />
        </div>
      </div>

      <ExamSampleQuestions examId="carshair" />

      <ExamRelatedTests examId="carshair" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Earn Your Red Seal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all 8 Major Work Activities.</p>
          <ExamLandingCTA dashboardHref="/red-seal-hairstylist/dashboard" />
        </div>
      </div>
    </div>
  );
}
