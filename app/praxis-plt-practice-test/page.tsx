import "@/lib/banks/praxisplt";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Praxis PLT K-6 Practice Test 2026 (5622) - Free Questions";
const metaDescription =
  "Free Praxis PLT K-6 (5622) practice test: 200 original selected-response questions on all four ETS content categories, four 50-question tests, every answer explained.";
const description =
  "Free practice for the Praxis Principles of Learning and Teaching: Grades K-6 (5622): 200 original selected-response questions written from the ETS test specifications. Four 50-question practice tests weighted like the real selected-response section, and four training sets covering students as learners, the instructional process, assessment, and professional development, leadership and community, including the laws and court decisions teachers must know.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "praxis plt k-6 practice test, praxis 5622 practice test, principles of learning and teaching k-6, praxis plt practice questions, plt 5622 study guide, praxis plt free practice test, praxis principles of learning and teaching practice test",
  alternates: {
    canonical: `${siteUrl}/praxis-plt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/praxis-plt-practice-test`,
    images: [{ url: shareImageUrl("praxisplt"), width: 1200, height: 630, alt: "Tigertest free Praxis PLT K-6 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("praxisplt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Praxis PLT K-6 Practice Test",
      description,
      url: `${siteUrl}/praxis-plt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("praxisplt"),
      featureList: [
        "200 Praxis PLT K-6 practice questions",
        "4 practice tests of 50 selected-response questions weighted like the ETS content categories",
        "4 training sets, one per content category",
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
          name: "What is the Praxis PLT K-6 (5622)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Principles of Learning and Teaching: Grades K-6 (test code 5622) is a Praxis test from ETS that many states require for an elementary teaching license. It checks a beginning teacher's knowledge of human development, learning, instruction, diverse learners, assessment and professional issues, and it is built on the InTASC Model Core Teaching Standards.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the Praxis 5622 and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test lasts 2 hours and has 70 selected-response questions plus 4 constructed-response questions about two case histories. ETS expects about 70 minutes on the selected-response section and about 50 minutes on the constructed-response section, but the sections are not timed separately. It is computer delivered, at a test center or at home online.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the Praxis PLT K-6?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ETS does not set a passing score. Each state or licensing agency sets its own qualifying score, so check your state's requirement on the ETS score requirements page. Guides report a qualifying score of 160 on the 100 to 200 scale in many states. Each practice test here uses 70% as a readiness line, not an official cut.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test include the case histories and written responses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest models the 70-question selected-response part only, which is 75% of the score: Students as Learners, Instructional Process, Assessment, and Professional Development, Leadership and Community. Many questions describe a short classroom scenario, but the two case histories with four written responses (Analysis of Instructional Scenarios, 25% of the score) are not modelled; practice those by writing answers to case studies from the ETS study companion.",
          },
        },
        {
          "@type": "Question",
          name: "Are these real Praxis questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the published ETS test specifications for 5622, so it practices the same content without copying any ETS item. Tigertest is not affiliated with ETS or the Praxis program; check ets.org for test dates, registration and any changes to the test.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "I. Students as Learners", weight: "22.5%" },
  { name: "II. Instructional Process", weight: "22.5%" },
  { name: "III. Assessment", weight: "15%" },
  { name: "IV. Professional Development, Leadership & Community", weight: "15%" },
  { name: "V. Analysis of Instructional Scenarios (written, not modelled)", weight: "25%" },
];

export default function PraxisPltLandingPage() {
  return (
    <div data-theme="praxisplt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Praxis PLT K-6 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/praxis-plt/dashboard"
            shortName="Praxis PLT"
            subtitle="200 original selected-response questions for the Principles of Learning and Teaching: Grades K-6 (5622), on all four ETS content categories. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/praxisplt-mobile.png", desktop: "/landing/praxisplt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="praxisplt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the ETS content categories: students as learners, the instructional process, assessment, and professional development, leadership and community. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 selected-response questions: 15 on students as learners, 15 on the instructional process, 10 on assessment and 10 on professional issues, the same proportions as the real 70. Aim for 70% or better. No question appears in more than one test.
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
                Built on the ETS Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ETS splits the 5622 into five content categories. The first four are the 70 selected-response questions, and every practice test here keeps their proportions. The fifth is the four written responses on two case histories, which Tigertest does not model: practice it by writing answers to case studies and checking them against the ETS scoring guides. Teacher preparation programs can set Tigertest as class practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("praxisplt", 1)}
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
            How to Pass the Praxis PLT K-6
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the theorists and their classroom meaning</h3>
              <p>
                Piaget, Vygotsky, Bruner, Dewey, Bandura, Erikson, Kohlberg, Maslow, Skinner and Bloom appear by name in the ETS specifications. Learn what each idea looks like in a K-6 classroom, not just the definitions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the assessment vocabulary cold</h3>
              <p>
                Formative, summative and diagnostic; norm- and criterion-referenced; validity and reliability; percentile, scaled and grade-equivalent scores; holistic and analytic scoring. These terms decide many questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read scenarios as a beginning teacher</h3>
              <p>
                The best answer usually puts the student first, uses evidence, follows the law (IDEA, Section 504, FERPA, mandated reporting) and is something a teacher can do now. Practice the case histories too: about 50 of the 120 minutes go to four written responses.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Praxis PLT K-6 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Praxis PLT K-6 (5622)?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Principles of Learning and Teaching: Grades K-6 (test code 5622) is a Praxis test from ETS that many states require for an elementary teaching license. It checks a beginning teacher&apos;s knowledge of human development, learning, instruction, diverse learners, assessment and professional issues, and it is built on the InTASC Model Core Teaching Standards.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Praxis 5622 and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test lasts 2 hours and has 70 selected-response questions plus 4 constructed-response questions about two case histories. ETS expects about 70 minutes on the selected-response section and about 50 minutes on the constructed-response section, but the sections are not timed separately. It is computer delivered, at a test center or at home online.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the Praxis PLT K-6?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ETS does not set a passing score. Each state or licensing agency sets its own qualifying score, so check your state&apos;s requirement on the ETS score requirements page. Guides report a qualifying score of 160 on the 100 to 200 scale in many states. Each practice test here uses 70% as a readiness line, not an official cut.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test include the case histories and written responses?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest models the 70-question selected-response part only, which is 75% of the score: Students as Learners, Instructional Process, Assessment, and Professional Development, Leadership and Community. Many questions describe a short classroom scenario, but the two case histories with four written responses (Analysis of Instructional Scenarios, 25% of the score) are not modelled; practice those by writing answers to case studies from the ETS study companion.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these real Praxis questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the published ETS test specifications for 5622, so it practices the same content without copying any ETS item. Tigertest is not affiliated with ETS or the Praxis program; check ets.org for test dates, registration and any changes to the test.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="praxisplt" />

      <ExamRelatedTests examId="praxisplt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Praxis PLT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every selected-response category of the 5622.</p>
          <ExamLandingCTA dashboardHref="/praxis-plt/dashboard" />
        </div>
      </div>
    </div>
  );
}
