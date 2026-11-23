import "@/lib/banks/eppp";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free EPPP Practice Test 2026 - Psychology Licensing Exam Questions";
const metaDescription =
  "Free EPPP practice test: 200 original Part 1 questions across all eight ASPPB content areas, four 50-question mock exams and four training sets, every answer explained.";
const description =
  "Free practice for EPPP Part 1 (Knowledge), the psychology licensing exam from the Association of State and Provincial Psychology Boards (ASPPB): 200 original questions written from the eight Part 1 content areas. Four 50-question mock exams weighted like the real exam, and four training sets covering biological and cognitive-affective bases of behavior, social, cultural and lifespan development, assessment, treatment and supervision, and research methods and ethics.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "eppp practice test, eppp practice questions, eppp part 1, eppp exam, psychology licensing exam, eppp mock exam, eppp 2026, asppb eppp, psychologist licensing exam practice, eppp study questions",
  alternates: {
    canonical: `${siteUrl}/eppp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/eppp-practice-test`,
    images: [{ url: shareImageUrl("eppp"), width: 1200, height: 630, alt: "Tigertest free EPPP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("eppp")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "What is the EPPP?",
    a: "The Examination for Professional Practice in Psychology (EPPP) is the licensing exam that psychology boards in the US and Canada use for psychologists. It is developed by the Association of State and Provincial Psychology Boards (ASPPB). Part 1 tests knowledge across eight content areas; some boards also require Part 2, which tests skills. Your board approves you to sit it, and you take it on a computer at a Pearson VUE test center.",
  },
  {
    q: "How many questions are on EPPP Part 1 and how long is it?",
    a: "Part 1 has 225 multiple-choice questions, and you have 4 hours and 15 minutes to answer them. Fifty are unscored pretest questions mixed in with the rest, so 175 count toward your score. Each question has one correct answer.",
  },
  {
    q: "What is on EPPP Part 1?",
    a: "ASPPB lists eight content areas: biological bases of behavior (10%), cognitive-affective bases of behavior (13%), social and cultural bases of behavior (11%), growth and lifespan development (12%), assessment and diagnosis (16%), treatment, intervention, prevention and supervision (15%), research methods and statistics (7%), and ethical, legal and professional issues (16%). Each 50-question practice test here keeps that balance.",
  },
  {
    q: "What score do you need to pass the EPPP?",
    a: "Scores are reported on a scale from 200 to 800. ASPPB recommends 500 as the passing score for independent practice, and each board sets its own standard. Because the scale adjusts for each version of the exam, there is no fixed percentage to aim for. The 70 percent line on these practice tests is a readiness target, not the official passing score.",
  },
  {
    q: "Is the EPPP changing?",
    a: "Yes. ASPPB plans to start an integrated EPPP, one exam covering both knowledge and skills, in the fourth quarter of 2027. Part 1 and Part 2 given in 2026 and 2027 still follow their published content areas. Candidates who fail Part 1 before the integrated exam starts may retake it until March 31, 2028. Tigertest is not affiliated with ASPPB, and every question here is original.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free EPPP Practice Test",
      description,
      url: `${siteUrl}/eppp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("eppp"),
      featureList: [
        "200 EPPP Part 1 practice questions",
        "4 mock exams of 50 questions weighted like the eight ASPPB content areas",
        "4 training sets by content area",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Biological Bases of Behavior", weight: "10%" },
  { name: "Cognitive-Affective Bases of Behavior", weight: "13%" },
  { name: "Social & Cultural Bases of Behavior", weight: "11%" },
  { name: "Growth & Lifespan Development", weight: "12%" },
  { name: "Assessment & Diagnosis", weight: "16%" },
  { name: "Treatment, Intervention & Supervision", weight: "15%" },
  { name: "Research Methods & Statistics", weight: "7%" },
  { name: "Ethical, Legal & Professional Issues", weight: "16%" },
];

export default function EpppLandingPage() {
  return (
    <div data-theme="eppp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free EPPP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/eppp/dashboard"
            shortName="EPPP"
            subtitle="200 EPPP Part 1 questions and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/eppp-mobile.png", desktop: "/landing/eppp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="eppp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets cover all eight content areas: biological and cognitive-affective bases; social, cultural and lifespan development; assessment, treatment and supervision; and research methods and ethics. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, each weighted like the 175 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the EPPP Part 1 Content Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ASPPB publishes the share of Part 1 questions from each of its eight content areas. Every mock exam here keeps that balance, scaled to 50 questions: 8 each on assessment and diagnosis and on ethics, 7 each on cognitive-affective bases and on treatment and supervision, 6 on lifespan development, 5 each on biological and on social and cultural bases, and 4 on research and statistics. Ethics items follow the APA Ethics Code (2017 amendments) and diagnosis items the DSM-5-TR.
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
                src={getTigerAsset("eppp", 3)}
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
            How to Prepare for EPPP Part 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the two biggest areas</h3>
              <p>
                Assessment and diagnosis and ethical, legal and professional issues are 16% each, almost a third of the exam between them. Know reliability, validity and the standard error of measurement, and know the APA Ethics Code standards on confidentiality, multiple relationships, test data and research.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn names with what they found</h3>
              <p>
                Many questions name a theorist or study and ask what it showed: Rescorla and Wagner, Festinger, Ainsworth, Holland, Minuchin, Meehl. Learn each name with its key idea and the term it is known for, not just the name.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the numbers</h3>
              <p>
                Expect short calculations and interpretations: the standard error of measurement, Spearman-Brown, predictive value at a given base rate, shared variance from a correlation, Type I and Type II errors and power. Work them by hand until they are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every mock exam before you sit the real one. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          EPPP Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="eppp" />

      <ExamRelatedTests examId="eppp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the EPPP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every Part 1 content area.</p>
          <ExamLandingCTA dashboardHref="/eppp/dashboard" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tigertest is not affiliated with the Association of State and Provincial Psychology Boards (ASPPB). EPPP is a trademark of its owner.
          </p>
        </div>
      </div>
    </div>
  );
}
