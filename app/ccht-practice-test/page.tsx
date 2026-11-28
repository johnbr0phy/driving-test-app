import "@/lib/banks/ccht";
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

const title = "Free CCHT Practice Test 2026";
const metaDescription =
  "Prepare for the NNCC Certified Clinical Hemodialysis Technician exam with 200 questions on patient care, dialysis equipment, infection control and the technician role.";
const description =
  "Prepare for the NNCC Certified Clinical Hemodialysis Technician exam with 200 questions on patient care, dialysis equipment, infection control and the technician role.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CCHT practice test, NNCC hemodialysis technician exam, dialysis technician certification, CCHT practice questions",
  alternates: {
    canonical: `${siteUrl}/ccht-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccht-practice-test`,
    images: [{ url: shareImageUrl("ccht"), width: 1200, height: 630, alt: "CCHT hemodialysis technician practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccht")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest CCHT Practice Test",
      description,
      url: `${siteUrl}/ccht-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ccht", "USD"),
      featureList: ["200 original questions", "Four 50-question practice tests", "Four topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which dialysis certification does this cover?",
          acceptedAnswer: { "@type": "Answer", text: "This bank covers the entry-level Certified Clinical Hemodialysis Technician credential from NNCC. The advanced CCHT-A has its own exam." },
        },
        {
          "@type": "Question",
          name: "How long is the official CCHT exam?",
          acceptedAnswer: { "@type": "Answer", text: "NNCC allows three hours for 150 questions. About 25 are unscored pilot questions." },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: { "@type": "Answer", text: "NNCC requires a standard score of 95, which corresponds to about 74% correct on scored questions. Aim for 37 correct on each 50-question Tigertest form." },
        },
        {
          "@type": "Question",
          name: "How much of the practice test covers clinical care?",
          acceptedAnswer: { "@type": "Answer", text: "Half of each test covers clinical care. You get 12 questions on preparation and vascular access and 13 on treatment monitoring and completion." },
        },
        {
          "@type": "Question",
          name: "Can I start for free?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The first two practice tests and first two topic sets are free. Premium unlocks the rest and full statistics." },
        },
        classFaqJsonLd("ccht"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Preparation and Vascular Access", weight: "24%" },
  { name: "Treatment Monitoring and Completion", weight: "26%" },
  { name: "Technical", weight: "22%" },
  { name: "Environment", weight: "16%" },
  { name: "Role Responsibilities", weight: "12%" },
];

export default function CchtLandingPage() {
  return (
    <div data-theme="ccht" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCHT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccht/dashboard"
            shortName="CCHT Hemodialysis Technician"
            subtitle="Study for the NNCC hemodialysis technician exam with 200 questions on patient care, dialysis equipment and safety. Free to start, no account needed."
            shots={{ mobile: "/landing/ccht-mobile.png", desktop: "/landing/ccht-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccht" />

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
                Pick a topic and read the explanation after each answer. Revisit the questions you miss.
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
                Answer 25 clinical questions and 25 on equipment, the care environment and technician responsibilities. Aim for 37 correct out of 50.
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
                What Each CCHT Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The NNCC blueprint has four domains. For study, the clinical domain is split into patient preparation and treatment monitoring.
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
                src={getTigerAsset("ccht", 1)}
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
            How to Study for the CCHT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study the treatment in sequence</h3>
              <p>
                Group questions by what happens before, during or after dialysis. Notice how the timing changes what the technician needs to observe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Compare the access types</h3>
              <p>
                Make a short list of the features of fistulas, grafts and catheters. Use it to review missed questions about access assessment and care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Trace the equipment systems</h3>
              <p>
                Sketch the paths of water, dialysate and blood separately. Label the part each equipment question asks about.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Review your handoffs</h3>
              <p>
                For a missed scenario, identify what the technician observed, what the team needs to know and what belongs in the treatment record.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCHT Exam Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which dialysis certification does this cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This bank covers the entry-level Certified Clinical Hemodialysis Technician credential from NNCC. The advanced CCHT-A has its own exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the official CCHT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              NNCC allows three hours for 150 questions. About 25 are unscored pilot questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              NNCC requires a standard score of 95, which corresponds to about 74% correct on scored questions. Aim for 37 correct on each 50-question Tigertest form.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How much of the practice test covers clinical care?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Half of each test covers clinical care. You get 12 questions on preparation and vascular access and 13 on treatment monitoring and completion.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I start for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The first two practice tests and first two topic sets are free. Premium unlocks the rest and full statistics.
            </p>
          </div>
          <ExamClassFaq examId="ccht" />
        </div>
      </div>

      <ExamSampleQuestions examId="ccht" />

      <ExamRelatedTests examId="ccht" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First CCHT Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Patient Preparation and Vascular Access or take a mixed 50-question test.</p>
          <ExamLandingCTA dashboardHref="/ccht/dashboard" />
        </div>
      </div>
    </div>
  );
}
