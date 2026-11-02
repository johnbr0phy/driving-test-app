import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "TExES PPR Practice Test 2026 - Free PPR EC-12 (160) Questions";
const metaDescription =
  "Free TExES PPR EC-12 (160) practice: 200 original scenario questions across all 13 competencies, four 50-question tests weighted like the real domains, every answer explained.";
const description =
  "Free practice for the TExES Pedagogy and Professional Responsibilities EC-12 (160) exam: 200 original questions written from the official exam framework. Four 50-question practice tests weighted like the four real domains, and six training sets covering human development and learning, student diversity, planning, classroom environment, communication and engagement, technology, assessment and feedback, families, and Texas legal and ethical requirements.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "texes ppr practice test, ppr practice test, texes 160, ppr ec-12, pedagogy and professional responsibilities practice test, texes ppr questions, ppr exam texas, texas teacher certification practice test, ppr study guide, free ppr practice test",
  alternates: {
    canonical: `${siteUrl}/texes-ppr-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/texes-ppr-practice-test`,
    images: [{ url: shareImageUrl("texesppr"), width: 1200, height: 630, alt: "Tigertest free TExES PPR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("texesppr")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free TExES PPR Practice Test",
      description,
      url: `${siteUrl}/texes-ppr-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 TExES PPR practice questions",
        "4 practice tests of 50 questions weighted like the four PPR domains",
        "6 training sets covering all 13 competencies",
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
          name: "What is the TExES PPR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The TExES Pedagogy and Professional Responsibilities EC-12 (160) is the pedagogy exam most Texas teacher candidates take for a standard classroom certificate, alongside a content exam. It is part of the Texas Educator Certification Examination Program for the Texas Education Agency (TEA) and tests how to plan, teach, assess, manage a classroom, work with families and meet a Texas teacher's legal and ethical duties, for every grade from early childhood to 12.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the PPR and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The PPR is a computer-administered test of 100 selected-response questions. The appointment is 5 hours: a 15-minute tutorial and compliance agreement, then 4 hours and 45 minutes of testing. Some questions may be unscored, and many come in decision sets, a teaching scenario followed by several questions. Each practice test here has 50 questions weighted like the real domains.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass the PPR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TExES scores are reported on a scale of 100 to 300, and the passing score for the PPR is 240. The scale is not a percent correct, so there is no fixed number of questions you must get right. Tigertest's practice tests use 80% as a readiness line.",
          },
        },
        {
          "@type": "Question",
          name: "What does the PPR cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Four domains: Designing Instruction and Assessment to Promote Student Learning (34%), Creating a Positive, Productive Classroom Environment (13%), Implementing Effective, Responsive Instruction and Assessment (33%) and Fulfilling Professional Roles and Responsibilities (20%), split into 13 competencies from human development and student diversity to technology, families, the Educators' Code of Ethics and the structure of education in Texas.",
          },
        },
        {
          "@type": "Question",
          name: "Is the PPR being replaced?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TEA plans a performance-based Texas Test of Educator Proficiency (T-TEP) to become the required pedagogy assessment, pending action by the State Board for Educator Certification. Its launch has moved: TEA's 2026 newsletters list it for 2029. New Texas pedagogy standards took effect in May 2025 and will shape exams launched after that date. As of November 2026 the PPR (160) is still offered year round, and edTPA remains an option alongside it. Check TEA before you register.",
          },
        }
      ],
    },
  ],
};

const contentAreas = [
  { name: "Domain I: Designing Instruction and Assessment", weight: "34%" },
  { name: "Domain II: Classroom Environment", weight: "13%" },
  { name: "Domain III: Responsive Instruction and Assessment", weight: "33%" },
  { name: "Domain IV: Professional Roles and Responsibilities", weight: "20%" },
];

export default function TexesPprLandingPage() {
  return (
    <div data-theme="texesppr" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free TExES PPR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/texes-ppr/dashboard"
            shortName="PPR"
            subtitle="200 original scenario questions on all 13 competencies of the Pedagogy and Professional Responsibilities EC-12 (160) exam. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/texesppr-mobile.png", desktop: "/landing/texesppr-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="texesppr" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Competency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets follow the 13 competencies of the PPR framework, from human development to the Educators&apos; Code of Ethics. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, half the length of the real 100-question exam, with each domain at its real weight. Aim for 80% or better. No question appears in more than one test.
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
                Built on the PPR Exam Framework
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The official framework splits the PPR into four domains and 13 competencies. Every practice test here keeps each domain close to its real share. Questions are short teaching scenarios like the real exam&apos;s; the real decision sets, several questions on one longer scenario, are written here as single questions. Every question is original. Tigertest is not affiliated with the Texas Education Agency, the State Board for Educator Certification or Pearson.
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
                src={getTigerAsset("texesppr", 1)}
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
            How to Pass the PPR
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put Domains I and III first</h3>
              <p>
                Designing instruction and implementing it make up about two thirds of the exam. Know how to write measurable objectives, match assessments to them, engage students actively and use formative data to adjust teaching.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer as the ideal teacher</h3>
              <p>
                Most questions describe a classroom. The best answer usually puts the student first, is proactive rather than punitive, involves families and colleagues, and is something the teacher can do right away.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the Texas rules in Domain IV</h3>
              <p>
                Learn the Educators&apos; Code of Ethics, the 48-hour duty to report suspected abuse, FERPA, IDEA and Section 504, the ARD committee and the LPAC, and who does what in Texas education: the SBOE, the SBEC, TEA, the regional service centers and local school boards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build stamina, then retest</h3>
              <p>
                The real exam is 100 questions in one sitting. Take each practice test in one go, drill the questions you missed, retrain your weakest competency and aim for 80% or better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          TExES PPR Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the TExES PPR?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The TExES Pedagogy and Professional Responsibilities EC-12 (160) is the pedagogy exam most Texas teacher candidates take for a standard classroom certificate, alongside a content exam. It is part of the Texas Educator Certification Examination Program for the Texas Education Agency (TEA) and tests how to plan, teach, assess, manage a classroom, work with families and meet a Texas teacher&apos;s legal and ethical duties, for every grade from early childhood to 12.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the PPR and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The PPR is a computer-administered test of 100 selected-response questions. The appointment is 5 hours: a 15-minute tutorial and compliance agreement, then 4 hours and 45 minutes of testing. Some questions may be unscored, and many come in decision sets, a teaching scenario followed by several questions. Each practice test here has 50 questions weighted like the real domains.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the PPR?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TExES scores are reported on a scale of 100 to 300, and the passing score for the PPR is 240. The scale is not a percent correct, so there is no fixed number of questions you must get right. Tigertest&apos;s practice tests use 80% as a readiness line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the PPR cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Four domains: Designing Instruction and Assessment to Promote Student Learning (34%), Creating a Positive, Productive Classroom Environment (13%), Implementing Effective, Responsive Instruction and Assessment (33%) and Fulfilling Professional Roles and Responsibilities (20%), split into 13 competencies from human development and student diversity to technology, families, the Educators&apos; Code of Ethics and the structure of education in Texas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the PPR being replaced?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TEA plans a performance-based Texas Test of Educator Proficiency (T-TEP) to become the required pedagogy assessment, pending action by the State Board for Educator Certification. Its launch has moved: TEA&apos;s 2026 newsletters list it for 2029. New Texas pedagogy standards took effect in May 2025 and will shape exams launched after that date. As of November 2026 the PPR (160) is still offered year round, and edTPA remains an option alongside it. Check TEA before you register.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="texesppr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PPR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all 13 PPR competencies.</p>
          <ExamLandingCTA dashboardHref="/texes-ppr/dashboard" />
        </div>
      </div>
    </div>
  );
}
