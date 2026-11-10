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
const path = "/pharmacist-board-exam-reviewer-practice-test";

const title = "Pharmacist Board Exam Reviewer 2026 - Free PhLE Practice Test";
const metaDescription =
  "Free pharmacist board exam reviewer: 200 original PhLE questions on all six PRC subjects, four 50-question mock exams weighted like the real exam, every answer explained.";
const description =
  "Free practice for the Philippine Pharmacist Licensure Examination (PhLE): 200 original questions on the six subjects in the PRC Board of Pharmacy exam program. Four 50-question mock exams weighted like the real exam and six training sets covering pharmaceutical chemistry, pharmacognosy and biochemistry, dispensing, clinical and hospital pharmacy, pharmaceutical calculations, pharmacology and toxicology, pharmaceutics and manufacturing, pharmacy law and ethics, and quality control, microbiology and public health.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pharmacist board exam reviewer, phle reviewer, pharmacist licensure exam reviewer 2026, pharmacy board exam philippines, phle practice test, pharmacy board exam questions, prc pharmacist exam, pharmacist licensure examination mock exam",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("phpharm"), width: 1200, height: 630, alt: "Tigertest free pharmacist board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phpharm")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Pharmacist Board Exam Reviewer",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 pharmacist board exam practice questions",
        "4 mock exams of 50 questions weighted like the six PhLE subjects",
        "6 training sets, one per PhLE subject",
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
          name: "What is the Pharmacist Licensure Examination?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Pharmacist Licensure Examination (PhLE) is the board exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Pharmacy give to pharmacy graduates. Under R.A. 10918, the Philippine Pharmacy Act, you must pass it and register before you can practice as a pharmacist in the Philippines. The law has it given twice a year.",
          },
        },
        {
          "@type": "Question",
          name: "What subjects are on the PhLE and how are they weighted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Six subjects over two days. In the PRC program for April 2026: day one is Pharmaceutical Chemistry (20%: inorganic, organic and qualitative pharmaceutical chemistry), Pharmacognosy and Biochemistry (15%) and Practice of Pharmacy (17.5%: compounding and dispensing, clinical and hospital pharmacy, pharmaceutical calculations); day two is Pharmacology and Pharmacokinetics (15%: toxicology, incompatibilities and adverse drug reactions), Pharmaceutics (17.5%: manufacturing pharmacy, dosage forms, physical pharmacy, jurisprudence and ethics) and Quality Control and Quality Assurance (15%: drug testing with instrumentation, microbiology and public health).",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the PhLE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under Section 17 of R.A. 10918 you need a general weighted average of at least 75%, with no rating below 50% in any subject. An examinee who fails three times must complete a refresher program before taking the exam again. Each 50-question mock exam here uses 75% as its pass line; the 50% subject floor is not modelled.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use a calculator on the PhLE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only a basic calculator, according to the PRC exam program: one with keys for adding, subtracting, multiplying and dividing, and optionally memory keys and square root. Phones, smart watches and programmable calculators are not allowed, so practice pharmaceutical calculations by hand and with a simple calculator.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real PhLE questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the subjects and weights in the PRC exam program and from Philippine pharmacy law, so it practices the same knowledge without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Pharmacy; check prc.gov.ph for exam dates, requirements and the current program.",
          },
        },
        classFaqJsonLd("phpharm"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Pharmaceutical Chemistry", weight: "20%" },
  { name: "Practice of Pharmacy", weight: "17.5%" },
  { name: "Pharmaceutics (with Jurisprudence & Ethics)", weight: "17.5%" },
  { name: "Pharmacognosy & Biochemistry", weight: "15%" },
  { name: "Pharmacology & Pharmacokinetics", weight: "15%" },
  { name: "Quality Control & Quality Assurance", weight: "15%" },
];

export default function PharmacistBoardExamLandingPage() {
  return (
    <div data-theme="phpharm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Pharmacist Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pharmacist-board-exam/dashboard"
            shortName="PhLE"
            subtitle="200 original questions on all six subjects of the Philippine Pharmacist Licensure Examination. Four 50-question mock exams weighted like the PRC program. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phpharm-mobile.png", desktop: "/landing/phpharm-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phpharm" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets, one for each PhLE subject, from pharmaceutical chemistry to quality control. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions that mix all six subjects in close to their real weights: 10 chemistry, 9 practice of pharmacy, 9 pharmaceutics, 8 pharmacognosy, 7 pharmacology and 7 quality control. Aim for 75% or better. No question appears in more than one test.
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
                Built on the PRC Exam Program
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The PRC program for the April 2026 PhLE gives each of the six subjects a fixed weight, listed below, and every mock exam here keeps close to them. The Board may change subjects and weights with PRC approval, so check prc.gov.ph for the program of your exam. Pharmacy schools and review centers can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phpharm", 1)}
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
            How to Pass the Pharmacist Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the heaviest subjects</h3>
              <p>
                Pharmaceutical Chemistry is 20% of the rating, and Practice of Pharmacy and Pharmaceutics are 17.5% each. Together they are more than half the exam, so secure them first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Leave no subject behind</h3>
              <p>
                A rating below 50% in any one subject fails the exam even with a 75% average. Keep Pharmacognosy, Pharmacology and Quality Control up as well. Tigertest scores the average only, so watch your accuracy per subject on your stats page.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice calculations with a basic calculator</h3>
              <p>
                Only basic calculators are allowed. Work doses by weight, dilutions, alligation, IV flow rates and milliequivalents step by step until the setup is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know Philippine pharmacy law</h3>
              <p>
                Jurisprudence and ethics sit inside Pharmaceutics. Learn the Philippine Pharmacy Act (R.A. 10918), the Generics Act (R.A. 6675), the FDA Act (R.A. 9711) and the Dangerous Drugs Act (R.A. 9165), then fix your misses and retest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Pharmacist Board Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Pharmacist Licensure Examination?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Pharmacist Licensure Examination (PhLE) is the board exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Pharmacy give to pharmacy graduates. Under R.A. 10918, the Philippine Pharmacy Act, you must pass it and register before you can practice as a pharmacist in the Philippines. The law has it given twice a year.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What subjects are on the PhLE and how are they weighted?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Six subjects over two days. In the PRC program for April 2026: day one is Pharmaceutical Chemistry (20%: inorganic, organic and qualitative pharmaceutical chemistry), Pharmacognosy and Biochemistry (15%) and Practice of Pharmacy (17.5%: compounding and dispensing, clinical and hospital pharmacy, pharmaceutical calculations); day two is Pharmacology and Pharmacokinetics (15%: toxicology, incompatibilities and adverse drug reactions), Pharmaceutics (17.5%: manufacturing pharmacy, dosage forms, physical pharmacy, jurisprudence and ethics) and Quality Control and Quality Assurance (15%: drug testing with instrumentation, microbiology and public health).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the PhLE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under Section 17 of R.A. 10918 you need a general weighted average of at least 75%, with no rating below 50% in any subject. An examinee who fails three times must complete a refresher program before taking the exam again. Each 50-question mock exam here uses 75% as its pass line; the 50% subject floor is not modelled.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I use a calculator on the PhLE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Only a basic calculator, according to the PRC exam program: one with keys for adding, subtracting, multiplying and dividing, and optionally memory keys and square root. Phones, smart watches and programmable calculators are not allowed, so practice pharmaceutical calculations by hand and with a simple calculator.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real PhLE questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the subjects and weights in the PRC exam program and from Philippine pharmacy law, so it practices the same knowledge without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Pharmacy; check prc.gov.ph for exam dates, requirements and the current program.
            </p>
          </div>
          <ExamClassFaq examId="phpharm" />
        </div>
      </div>

      <ExamRelatedTests examId="phpharm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PhLE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six subjects of the Pharmacist Licensure Examination.</p>
          <ExamLandingCTA dashboardHref="/pharmacist-board-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
