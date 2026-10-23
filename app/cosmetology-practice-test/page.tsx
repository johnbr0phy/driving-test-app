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

const title = "Free Cosmetology Practice Test 2026 - State Board Theory Exam Prep";
const metaDescription =
  "Free cosmetology state board practice tests: 200 questions on infection control, anatomy, chemistry, haircutting, texture services, color, skin and nails. All explained.";
const description =
  "Free cosmetology state board practice tests with 200 questions on infection control and safety, anatomy and physiology, chemistry and electricity, client consultation, shampooing, haircutting and styling, chemical texture services, haircoloring, skin care and nail care, weighted like the NIC national theory exam only (110 items, 90 minutes). Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cosmetology practice test, cosmetology state board practice test, NIC cosmetology theory exam practice, cosmetology written exam questions, beauty school state board test prep 2026, free cosmetology practice test",
  alternates: {
    canonical: `${siteUrl}/cosmetology-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cosmetology-practice-test`,
    images: [{ url: "/og/cosmetology", width: 1200, height: 630, alt: "Tigertest free cosmetology practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cosmetology"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Cosmetology Practice Tests",
      description,
      url: `${siteUrl}/cosmetology-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 cosmetology theory practice questions",
        "4 practice tests weighted like the NIC national theory exam",
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
          name: "What is on the cosmetology state board written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "These practice tests follow the NIC National Cosmetology Theory Examination only. Its content outline, effective July 1, 2022, has four domains: Scientific Concepts (35 percent: infection control and safety, anatomy and physiology, basic chemistry), Hair Care and Services (45 percent), Skin Care and Services (10 percent) and Nail Care and Services (10 percent). The candidate bulletin was revised January 1, 2026 and the weights did not change. States that use PSI sit a different exam. Check your state board's candidate bulletin.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the NIC cosmetology theory exam and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 110-question, 90-minute length is NIC only. The NIC exam has 110 multiple-choice questions, 100 of which are scored, and you have 90 minutes. The PSI national theory exam is also 110 questions with 100 scored, but you have 120 minutes and the topic weights are different. Each practice test here is 50 questions in the NIC proportions.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the cosmetology written exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NIC reports a scaled score, and most state boards set the passing score at 75. Because the score is scaled, 75 is not exactly 75 percent correct, and the mark varies by state. The practice tests here use a 75 percent pass line; aim for 85 percent or better before test day so you have room to spare.",
          },
        },
        {
          "@type": "Question",
          name: "Does this match the PSI cosmetology exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. This bank follows the NIC outline only. PSI lists national cosmetology and barber testing in Alabama, Colorado, Georgia, Kentucky, Maryland, Michigan and Tennessee, and theory testing in California, Massachusetts and Hawaii. The 2025 PSI outline, which the California Board of Barbering and Cosmetology set for April 1, 2026, is 110 questions (100 scored) in 120 minutes: infection control 30 percent, client consultation 19 percent, haircoloring 10 percent, chemical texture 12 percent, hair removal 8 percent, nail care 8 percent, skin care 4 percent, eyelash and eyebrow 4 percent, haircutting 3 percent and hairstyling 2 percent. A PSI-weighted set is not in this bank.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover the practical exam or my state's laws?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The cosmetology license has a theory (written) exam and, in most states, a separate practical exam or written practical. This prep is for the theory exam only. Training hours, fees, renewal and the state laws and rules section vary by state, so those are not asserted here; your school and your state board's bulletin cover them.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same exam for esthetics, nail technology and barbering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. NIC gives separate national theory exams for esthetics, nail technology and barbering, each with its own outline. The infection control, anatomy and chemistry questions here overlap with those exams, and the skin and nail questions are a useful warm-up, but this bank follows the cosmetology outline.",
          },
        },
        classFaqJsonLd("cosmetology"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Infection Control & Safety", weight: "18%" },
  { name: "Anatomy & Physiology", weight: "10%" },
  { name: "Chemistry & Electricity", weight: "8%" },
  { name: "Client Consultation & Hair Analysis", weight: "8%" },
  { name: "Shampooing, Haircutting & Styling", weight: "16%" },
  { name: "Chemical Texture Services", weight: "10%" },
  { name: "Haircoloring", weight: "10%" },
  { name: "Skin Care Services", weight: "10%" },
  { name: "Nail Care Services", weight: "10%" },
];

export default function CosmetologyLandingPage() {
  return (
    <div data-theme="cosmetology" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Cosmetology Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cosmetology/dashboard"
            shortName="Cosmetology"
            subtitle="200 state board theory questions on infection control, anatomy, chemistry, haircutting and styling, perms and relaxers, haircolor, skin and nails. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cosmetology-mobile.png", desktop: "/landing/cosmetology-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cosmetology" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, then take Test 1 and aim for 75 percent. Questions you miss come back until you have mastered them.
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
                Four 50-question tests in the NIC proportions only (the NIC exam is 110 items in 90 minutes), with a 75 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the NIC Theory Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These practice tests cover the NIC National Cosmetology Theory Examination only: 110 questions, 100 scored, in 90 minutes. That length is NIC only. The NIC outline gives Scientific Concepts 35 percent, Hair Care and Services 45 percent, and Skin Care and Nail Care 10 percent each. PSI states, including California from April 1, 2026, use a 120-minute outline with different weights, and this bank is not weighted to it. The percentages below are the share of these NIC practice tests. If you teach a cosmetology program, you can assign it to your class for free at{" "}
                <Link href="/teach" className="text-brand-dark font-medium underline underline-offset-2">
                  tigertest.io/teach
                </Link>
                .
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
                src={getTigerAsset("cosmetology", 1)}
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
            How to Pass the Cosmetology State Board Written Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own infection control first</h3>
              <p>
                It is the biggest single topic on the exam and the easiest to score on. Know the ladder: cleaning removes debris, disinfecting kills most pathogens on nonporous tools, sterilizing kills everything including spores. Tools are cleaned first, then fully immersed in an EPA-registered hospital disinfectant for the full contact time on the label. Porous items are single use. Know the blood exposure steps in order and where the SDS lives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers as a list</h3>
              <p>
                Hair and skin sit at pH 4.5 to 5.5. The level system runs 1 (black) to 10 (lightest blonde). Developer comes in 10, 20, 30 and 40 volume, and a predisposition test goes 24 to 48 hours before an aniline derivative color. Hair grows about half an inch a month and cycles through anagen, catagen and telogen. Write every number on one card and drill it until none of them need thought.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Separate thio from hydroxide, and color wheel from level</h3>
              <p>
                Chemical questions trip people who mix the families. Permanent waves break disulfide bonds with a thio reducing agent and rebuild them with an oxidizing neutralizer; hydroxide relaxers break the bonds permanently and are neutralized with an acid-balanced shampoo, never a thio product. In color, level is how light or dark, tone is warm or cool, and you neutralize an unwanted tone with its complement across the wheel.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest to 90 percent</h3>
              <p>
                Tigertest tracks your accuracy by topic. Most boards pass at a scaled 75, so after each practice test drill the questions you missed, retrain that test&apos;s set, and retake until you clear 90 percent with room to spare, then take all four practice tests back to back. Two of them together are about the length of the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Cosmetology Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the cosmetology state board written exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              These practice tests follow the NIC National Cosmetology Theory Examination only. Its content outline, effective July 1, 2022, has four domains: Scientific Concepts (35 percent: infection control and safety, anatomy and physiology, basic chemistry), Hair Care and Services (45 percent), Skin Care and Services (10 percent) and Nail Care and Services (10 percent). The candidate bulletin was revised January 1, 2026 and the weights did not change. States that use PSI sit a different exam. Check your state board&apos;s candidate bulletin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the NIC cosmetology theory exam and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The 110-question, 90-minute length is NIC only. The NIC exam has 110 multiple-choice questions, 100 of which are scored, and you have 90 minutes. The PSI national theory exam is also 110 questions with 100 scored, but you have 120 minutes and the topic weights are different. Each practice test here is 50 questions in the NIC proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the cosmetology written exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              NIC reports a scaled score, and most state boards set the passing score at 75. Because the score is scaled, 75 is not exactly 75 percent correct, and the mark varies by state. The practice tests here use a 75 percent pass line; aim for 85 percent or better before test day so you have room to spare.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this match the PSI cosmetology exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. This bank follows the NIC outline only. PSI lists national cosmetology and barber testing in Alabama, Colorado, Georgia, Kentucky, Maryland, Michigan and Tennessee, and theory testing in California, Massachusetts and Hawaii. The 2025 PSI outline, which the California Board of Barbering and Cosmetology set for April 1, 2026, is 110 questions (100 scored) in 120 minutes: infection control 30 percent, client consultation 19 percent, haircoloring 10 percent, chemical texture 12 percent, hair removal 8 percent, nail care 8 percent, skin care 4 percent, eyelash and eyebrow 4 percent, haircutting 3 percent and hairstyling 2 percent. A PSI-weighted set is not in this bank.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover the practical exam or my state&apos;s laws?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The cosmetology license has a theory (written) exam and, in most states, a separate practical exam or written practical. This prep is for the theory exam only. Training hours, fees, renewal and the state laws and rules section vary by state, so those are not asserted here; your school and your state board&apos;s bulletin cover them.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the same exam for esthetics, nail technology and barbering?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. NIC gives separate national theory exams for esthetics, nail technology and barbering, each with its own outline. The infection control, anatomy and chemistry questions here overlap with those exams, and the skin and nail questions are a useful warm-up, but this bank follows the cosmetology outline.
            </p>
          </div>
          <ExamClassFaq examId="cosmetology" />
        </div>
      </div>

      <ExamRelatedTests examId="cosmetology" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your State Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all nine topics.</p>
          <ExamLandingCTA dashboardHref="/cosmetology/dashboard" />
        </div>
      </div>
    </div>
  );
}
