import "@/lib/banks/crcst";
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

const title = "Free CRCST Practice Test 2026 - 50 Questions";
const metaDescription =
  "Try a free 50-question CRCST practice test for the HSPA sterile processing exam. Get answer explanations and three free training sets. Premium adds three more tests.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CRCST practice test, HSPA CRCST exam, sterile processing practice questions, sterile processing technician exam prep, central service technician certification",
  alternates: {
    canonical: `${siteUrl}/crcst-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/crcst-practice-test`,
    images: [{ url: shareImageUrl("crcst"), width: 1200, height: 630, alt: "Tigertest free CRCST practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("crcst")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the CRCST exam?",
    a: "The HSPA CRCST exam gives you three hours for 150 multiple-choice questions. HSPA scores 125 and uses the other 25 to try out new questions. You cannot tell which questions are scored. HSPA reports your result as pass or fail.",
  },
  {
    q: "What topics does the CRCST exam cover?",
    a: "Cleaning and decontamination, preparation and packaging, and sterilization each make up 21% of the HSPA exam. The other domains are departmental considerations (15%), sterile storage, transport and inventory management (9%), professional development and human relation skills (8%), and patient care equipment and distribution (5%).",
  },
  {
    q: "Does this work for the CBSPD CSPDT exam too?",
    a: "The CBSPD Certified Sterile Processing and Distribution Technician (CSPDT) exam covers much of the same material but has its own outline and weights, set by a different board. Tigertest has a separate CSPDT practice test written to the CBSPD outline.",
  },
  {
    q: "What does the free CRCST practice test include?",
    a: "Practice Test 1 has 50 questions across all seven HSPA exam domains. Training Sets 1 to 3 are also free, with explanations and no account required. One Premium payment unlocks Practice Tests 2 to 4 and Training Sets 4 and 5.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest CRCST Practice Test",
      description: metaDescription,
      url: `${siteUrl}/crcst-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("crcst"),
      featureList: [
        "200 CRCST practice questions",
        "4 blueprint-weighted practice tests",
        "5 training sets by topic",
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
        classFaqJsonLd("crcst"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cleaning, Decontamination & Disinfection", weight: "21%" },
  { name: "Preparation & Packaging", weight: "21%" },
  { name: "Sterilization Process", weight: "21%" },
  { name: "Departmental Considerations", weight: "15%" },
  { name: "Sterile Storage & Inventory", weight: "9%" },
  { name: "Professional Development", weight: "8%" },
  { name: "Patient Care Equipment", weight: "5%" },
];

export default function CRCSTLandingPage() {
  return (
    <div data-theme="crcst" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CRCST Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/crcst/dashboard"
            shortName="CRCST"
            subtitle="Try 50 questions across all seven HSPA exam domains. Free to start, no account needed."
            shots={{ mobile: "/landing/crcst-mobile.png", desktop: "/landing/crcst-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="crcst" />

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
                Start with three free sets covering departmental and professional practice, cleaning and
                decontamination, and preparation and packaging. Each answer comes with an explanation.
                Questions you miss come back for another try.
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
                Each of the four practice tests has 50 questions. Practice Test 1 is free. Premium opens
                the other three tests and the remaining two training sets, covering sterilization,
                storage, inventory and patient equipment.
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
                Built on the Official HSPA Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The <a href="https://myhspa.org/wp-content/uploads/2024/01/HSPA_CRCST_Content_Outline_2023.Revision.pdf" className="text-brand-dark underline">HSPA exam content outline</a> gives
                each domain a share of the certification exam. Tigertest uses those weights to build
                its shorter, 50-question practice tests.
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
                src={getTigerAsset("crcst", 3)}
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
            How to Pass the CRCST Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the exam format</h3>
              <p>
                Allow three hours for the certification exam. HSPA also requires 400 hours of hands-on
                experience in a sterile processing department. You can complete the hours before the
                exam or document them within six months after passing for full certification.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Weight your study like the exam</h3>
              <p>
                Decontamination, preparation and packaging, and sterilization are 21 percent each, so
                every practice test gives them the most questions. Departmental considerations is next at 15 percent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study from the HSPA manual</h3>
              <p>
                HSPA lists the Sterile Processing Technical Manual (9th edition), ANSI/AAMI ST79 and
                the AORN Guidelines for Perioperative Practice as references for the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                After each practice test, review the questions you missed and revisit the relevant
                training set. Tigertest uses 70% as a practice target. The <a href="https://myhspa.org/wp-content/uploads/2024/01/2024-Certification-Handbook.pdf" className="text-brand-dark underline">HSPA Certification Handbook</a> explains
                how the certification exam is scored.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CRCST Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="crcst" />
        </div>
      </div>

      <ExamSampleQuestions examId="crcst" />

      <ExamRelatedTests examId="crcst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start your CRCST practice test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Take the first 50-question test for free. No account required.</p>
          <ExamLandingCTA dashboardHref="/crcst/dashboard" />
        </div>
      </div>
    </div>
  );
}
