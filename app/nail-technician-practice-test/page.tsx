import "@/lib/banks/nailtech";
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

const title = "Free Nail Technician Practice Test 2026 - NIC Nail Technology Theory Exam";
const metaDescription =
  "Nail technician state board practice, free to start: 200 original questions on the NIC Nail Technology theory outline, four 50-question practice tests, every answer explained.";
const description =
  "Practice for the NIC National Nail Technology Theory Examination, the written state board exam for nail technicians in states that use NIC exams, free to start: 200 original questions written from the NIC content outline. Four 50-question practice tests weighted like the real exam, and four training sets covering infection control and product chemistry; nail anatomy, disorders and consultation; tools, manicures and pedicures; and nail enhancements.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nail technician practice test, nail tech practice test, nail technology theory exam, nic nail technology exam, manicurist exam practice, nail tech state board exam, nail technician written exam, nail technician license test",
  alternates: {
    canonical: `${siteUrl}/nail-technician-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nail-technician-practice-test`,
    images: [{ url: shareImageUrl("nailtech"), width: 1200, height: 630, alt: "Tigertest nail technician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nailtech")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NIC Nail Technology theory exam?",
    a: "The National Nail Technology Theory Examination is the written licensure exam for nail technicians developed by the National-Interstate Council of State Boards of Cosmetology (NIC). State boards that use NIC exams require it, usually with a practical exam, before they issue a nail technician or manicurist license. Some states use a different exam provider or their own exam, so check with your state board.",
  },
  {
    q: "How many questions are on the nail technician theory exam?",
    a: "The NIC Nail Technology theory exam has 110 multiple-choice questions, of which 100 are scored, with 90 minutes allowed. Each question has four answer options and only one is correct.",
  },
  {
    q: "What score do you need to pass?",
    a: "Each state board sets its passing score; NIC publishes no national pass mark. Many boards use 75, for example South Carolina, which requires a passing score of 75% on the NIC theory and practical exams. The practice tests here use 75% as a readiness line.",
  },
  {
    q: "What does the nail technician theory exam cover?",
    a: "The NIC content outline has eight areas: Infection Control and Safety Practices (15%), Anatomy and Physiology (15%), Chemistry of Nail Products (10%), Pre-service Process (5%), Nail Service Tools (13%), Manicure and Pedicure Services (18%), Nail Enhancement Services (20%), and Post-Service Procedures (4%).",
  },
  {
    q: "Are these the real NIC questions?",
    a: "No. Every question is original, written by Tigertest from the NIC content outline and US federal guidance from OSHA and the FDA. It is not affiliated with NIC or any state board, and no NIC sample question was used. Training hours, fees, licensing rules and the practical exam vary by state, so check your own state board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Nail Technician Practice Test",
      description,
      url: `${siteUrl}/nail-technician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nailtech"),
      featureList: [
        "200 nail technician practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
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
        classFaqJsonLd("nailtech"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Infection Control and Safety Practices", weight: "15%" },
  { name: "Anatomy and Physiology", weight: "15%" },
  { name: "Chemistry of Nail Products", weight: "10%" },
  { name: "Pre-service Process", weight: "5%" },
  { name: "Nail Service Tools", weight: "13%" },
  { name: "Manicure and Pedicure Services", weight: "18%" },
  { name: "Nail Enhancement Services", weight: "20%" },
  { name: "Post-Service Procedures", weight: "4%" },
];

export default function NailTechLandingPage() {
  return (
    <div data-theme="nailtech" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nail Technician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nail-technician/dashboard"
            shortName="Nail Tech"
            subtitle="200 questions on the NIC Nail Technology outline. Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nailtech-mobile.png", desktop: "/landing/nailtech-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nailtech" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: infection control and product chemistry; nail anatomy, disorders and consultation; tools, manicures and pedicures; and nail enhancements. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions in the content outline&apos;s proportions, each with a 75% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the NIC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NIC weights the nail technology theory exam across eight content areas. Each practice test keeps close to the same balance: 8 infection control, 8 anatomy and disorders, 5 chemistry, 4 consultation and post-service, 6 tools, 9 manicure and pedicure, and 10 enhancement questions in every 50.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("nailtech", 3)}
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
            How to Pass the Nail Technician Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put enhancements first</h3>
              <p>
                Nail enhancement services are the largest area (20%). Know tips, acrylic bead ratios, the apex and stress area, soft, hard and hybrid gels, dip systems, fills, rebalancing and safe soak-off removal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the onych- words by their parts</h3>
              <p>
                Onych means nail. Learn the endings, such as -phagy (eating), -auxis (growth), -lysis (loosening) and -madesis (shedding), and most disorder names explain themselves. Then decide for each one: service it, or refer the client to a doctor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the chemistry behind the products</h3>
              <p>
                Monomers, polymers, catalysts, solvents and photoinitiators explain why acrylic cures, why gel needs the right lamp and why acetone removes polish. Add the safety side: ventilation, gloves, closed bottles and keeping product off the skin.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                The NIC exam gives 90 minutes for 110 questions. Time yourself on the practice tests and aim for 85% or better on every one before you book your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nail Technician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nailtech" />
        </div>
      </div>

      <ExamSampleQuestions examId="nailtech" />

      <ExamRelatedTests examId="nailtech" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Nail Tech State Board?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all eight NIC content areas.</p>
          <ExamLandingCTA dashboardHref="/nail-technician/dashboard" />
        </div>
      </div>
    </div>
  );
}
