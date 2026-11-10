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

const siteUrl = SITE_URL;

const title = "RD Exam Practice Test 2026 - Free Registered Dietitian Exam Questions";
const metaDescription =
  "Free RD exam practice test: 200 original questions on the CDR test specifications, four 50-question mock exams and six training sets, every answer explained.";
const description =
  "Free practice for the CDR Registration Examination for Dietitians (the RD exam): 200 original questions written from the Commission on Dietetic Registration's test specifications. Four 50-question mock exams weighted like the 2027 to 2031 domains, and six training sets covering management and research, community nutrition and education, human nutrition, screening and assessment, medical nutrition therapy and nutrition support, and food science and foodservice.";

const faqs = [
  {
    q: "What is the RD exam?",
    a: "The Registration Examination for Dietitians is the national credentialing exam of the Commission on Dietetic Registration (CDR), the credentialing agency of the Academy of Nutrition and Dietetics. Passing it earns the Registered Dietitian (RD) or Registered Dietitian Nutritionist (RDN) credential. Candidates first complete an accredited program with a graduate degree, required since January 1, 2024, and supervised practice. Most states that license dietitians also accept the RD exam.",
  },
  {
    q: "How many questions are on the RD exam?",
    a: "The RD exam is computer adaptive and variable in length. Every candidate answers at least 125 questions (100 scored and 25 unscored pretest questions) and at most 145 (120 scored and 25 pretest) within 3 hours, at a Pearson VUE test center. Each question has four answer options, an on-screen calculator is provided, and you cannot go back to change an answer once you move on.",
  },
  {
    q: "What score do you need to pass the RD exam?",
    a: "Results are reported as a scaled score from 1 to 50, and the minimum passing scaled score is 25. You get the score report as you leave the test center. Because the score is scaled and the test is adaptive, the 70 percent line on these practice tests is a readiness target, not the CDR standard.",
  },
  {
    q: "What is on the RD exam?",
    a: "From January 1, 2027 the CDR test specifications have four domains: Fundamentals of Dietetics Practice 23 percent, Community and Public Health Nutrition 22 percent, Human Nutrition and Medical Nutrition Therapy 40 percent, and Food Science and Food Systems 15 percent. Exams taken through December 31, 2026 follow the 2022 to 2026 outline: Principles of Dietetics 21 percent, Nutrition Care for Individuals and Groups 45 percent, Management of Food and Nutrition Programs and Services 21 percent and Foodservice Systems 13 percent. The topics overlap almost completely, and the mock exams here follow the 2027 weights.",
  },
  {
    q: "Are these the real RD exam questions?",
    a: "No. Every question is original, written by Tigertest from the CDR's published test specifications and current references such as the Dietary Reference Intakes, the FDA Food Code and the ASPEN and Academy malnutrition criteria. Each mock exam is a fixed 50-question form rather than an adaptive test, and calculations use the formulas a dietitian works by hand. Tigertest is not affiliated with the Commission on Dietetic Registration or the Academy of Nutrition and Dietetics.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rd exam practice test, registered dietitian exam practice questions, cdr exam practice, rdn exam practice test, dietitian registration exam questions, rd exam 2026, rd exam 2027 test specifications, free rd exam questions",
  alternates: {
    canonical: `${siteUrl}/registered-dietitian-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/registered-dietitian-exam-practice-test`,
    images: [{ url: shareImageUrl("rdexam"), width: 1200, height: 630, alt: "Tigertest free RD exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rdexam")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RD Exam Practice Test",
      description,
      url: `${siteUrl}/registered-dietitian-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 RD exam practice questions",
        "4 mock exams of 50 questions weighted like the CDR test specifications",
        "6 training sets by domain",
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
        classFaqJsonLd("rdexam"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Fundamentals of Dietetics Practice", weight: "23%" },
  { name: "Community and Public Health Nutrition", weight: "22%" },
  { name: "Human Nutrition and Medical Nutrition Therapy", weight: "40%" },
  { name: "Food Science and Food Systems", weight: "15%" },
];

export default function RdExamLandingPage() {
  return (
    <div data-theme="rdexam" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RD Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/registered-dietitian/dashboard"
            shortName="RD exam"
            subtitle="200 original questions on the CDR test specifications: medical nutrition therapy, nutrition support, community nutrition, management, research and foodservice. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rdexam-mobile.png", desktop: "/landing/rdexam-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rdexam" />

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
                Six training sets follow the CDR domains: management, research and professional practice; community nutrition and education; human nutrition and physiology; screening, assessment and diagnosis; medical nutrition therapy and nutrition support; and food science and foodservice. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the four domains of the CDR test specifications. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CDR Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The CDR publishes the share of the exam that comes from each domain, and every mock exam here keeps the 2027 to 2031 balance, scaled to 50 questions: 12 fundamentals of practice, 11 community and public health, 20 human nutrition and medical nutrition therapy, and 7 food science and food systems. The real exam is adaptive with 125 to 145 questions; these fixed forms keep the same mix at a shorter length. Dietetics program faculty can set Tigertest as RD exam review at{" "}
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
                src={getTigerAsset("rdexam", 1)}
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
            How to Pass the RD Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put medical nutrition therapy first</h3>
              <p>
                Human nutrition and medical nutrition therapy is 40% of the 2027 exam. Know the Nutrition Care Process, the malnutrition criteria, nutrition-focused physical findings and the diet for each major condition, from kidney disease and diabetes to cirrhosis, dysphagia and refeeding.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work every calculation by hand</h3>
              <p>
                Energy needs with Mifflin-St Jeor, BMI and ideal body weight, percent weight loss, tube feeding volumes and free water, PN kilocalories, recipe conversion factors and food cost percentages all come up. Set each one up on paper until the steps are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not neglect management and community</h3>
              <p>
                Together, fundamentals of practice and community nutrition are almost half the exam. Learn the management functions and labor laws, budgets and productivity, research designs and statistics, the Code of Ethics, the federal food programs, the DRIs and the education theories.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice without going back</h3>
              <p>
                The real exam does not let you return to a question. Tigertest tracks your accuracy by category; aim for 70% or better on every mock exam, then drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RD Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rdexam" />
        </div>
      </div>

      <ExamRelatedTests examId="rdexam" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RD Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the CDR test specifications.</p>
          <ExamLandingCTA dashboardHref="/registered-dietitian/dashboard" />
        </div>
      </div>
    </div>
  );
}
