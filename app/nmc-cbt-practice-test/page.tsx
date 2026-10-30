import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free NMC CBT Practice Test 2026 - Numeracy and Clinical Mock";
const metaDescription =
  "Free NMC CBT mock tests for internationally educated nurses: Part A numeracy with typed answers and Part B clinical questions on the NMC Code, NEWS2 and UK practice, with rationales.";
const description =
  "Free NMC CBT practice for nurses trained in India, the Philippines, Nigeria, Kenya, Ghana, Zimbabwe and elsewhere who are joining the UK register. Two full mock tests of 115 questions in 3 hours, like the real Test of Competence Part 1: Part A numeracy with typed answers and Part B clinical questions weighted by the seven platforms of the NMC Future Nurse standards, plus drills for numeracy and every platform, all written for UK practice.";

const faqs = [
  {
    q: "What is the NMC CBT?",
    a: "The computer-based test is Part 1 of the NMC Test of Competence, which nurses trained outside the UK take before the practical OSCE when applying to join the NMC register. It has two parts sat together: Part A, 15 numeracy questions in 30 minutes, and Part B, 100 clinical multiple-choice questions in 2 hours 30 minutes. You take it at a Pearson VUE test centre, and most countries have one.",
  },
  {
    q: "What is the pass mark for the NMC CBT?",
    a: "Each part is passed or failed on its own. The NMC test specification gives the Part A numeracy pass mark as 87%, which is 13 of the 15 questions. Part B pass marks vary by field of nursing but are generally set between 60% and 70%. If you fail one part, you resit only that part.",
  },
  {
    q: "Can I use a calculator in the NMC CBT numeracy test?",
    a: "Yes. The candidate information booklet says an on-screen calculator is available and you can work on an erasable note board. You type each numeracy answer as a number, and you may need to give it in the right unit, so practise converting milligrams, micrograms, grams, litres and millilitres until it is automatic.",
  },
  {
    q: "What is on Part B of the NMC CBT?",
    a: "100 four-option questions with one correct answer, spread across the seven platforms of the NMC Standards of proficiency for registered nurses: being an accountable professional, promoting health, assessing needs and planning care, providing and evaluating care, leading and managing care, improving safety and quality, and coordinating care. Some questions target communication skills and nursing procedures. All of them follow UK practice and the NMC Code.",
  },
  {
    q: "Is the Tigertest NMC CBT practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account needed. The questions are original practice questions written from the NMC test specification and blueprint, not real exam questions. Create a free account to keep your progress in step between your phone and your computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NMC CBT practice test, NMC CBT mock test, NMC CBT questions, NMC test of competence part 1, NMC CBT numeracy practice, NMC CBT for Indian nurses, NMC CBT Philippines, NMC CBT Nigeria, NMC CBT Kenya, UK nursing registration exam, international nurses UK",
  alternates: {
    canonical: `${siteUrl}/nmc-cbt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nmc-cbt-practice-test`,
    images: [{ url: shareImageUrl("uknmc"), width: 1200, height: 630, alt: "Tigertest free NMC CBT practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uknmc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NMC CBT Practice Test",
      description,
      url: `${siteUrl}/nmc-cbt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "272 original NMC CBT practice questions with rationales, written for UK nursing practice",
        "Two full mock tests: 15 numeracy questions in 30 minutes and 100 clinical questions in 2 hours 30 minutes",
        "Typed numeracy answers with an on-screen calculator, like the real Part A",
        "Weighted by the seven platforms of the NMC Future Nurse standards",
        "Mastery drills for numeracy and every platform",
        "Progress syncs between phone and computer",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const partB = [
  { name: "Being an accountable professional", count: "17" },
  { name: "Promoting health and preventing ill health", count: "10" },
  { name: "Assessing needs and planning care", count: "14" },
  { name: "Providing and evaluating care", count: "15" },
  { name: "Leading and managing care and working in teams", count: "10" },
  { name: "Improving safety and quality of care", count: "10" },
  { name: "Coordinating care", count: "10" },
  { name: "Communication and relationship skills (Annexe A)", count: "7" },
  { name: "Nursing procedures (Annexe B)", count: "7" },
];

export default function NmcCbtLandingPage() {
  return (
    <div data-theme="uknmc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NMC CBT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nmc-cbt/dashboard"
            shortName="NMC CBT"
            subtitle="Numeracy and clinical mock tests for nurses joining the UK register from India, the Philippines, Nigeria, Kenya and around the world. 272 questions with rationales, written for UK practice. No account needed."
            shots={{ mobile: "/landing/uknmc-mobile.png", desktop: "/landing/uknmc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uknmc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A numeracy drill with typed answers, then one drill for each area of Part B, from the NMC Code to NEWS2 and discharge planning. Check each answer and read the rationale on the spot; every miss comes back until you have it right. Fits around shifts and study.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Part A then Part B in one sitting, timed like the real CBT: 15 numeracy questions in 30 minutes with a calculator, then 100 clinical questions in 2 hours 30 minutes, with flagging and review. Practice Test 2 questions never appear in the drills, so it is a fair check of your progress.
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
                Built on the NMC Test Specification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test follows the NMC&apos;s own blueprint. Part A covers doses, unit conversions, tablets and liquids, injections, infusions and fluid balance. Part B gives each platform of the Future Nurse standards the same number of questions as the real test:
              </p>
              <div className="space-y-3">
                {partB.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("uknmc", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          How to Prepare for the NMC CBT
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as a newly registered nurse in the UK</h3>
            <p>
              You may be an experienced nurse, but the CBT asks what a nurse should do in a UK hospital or community setting today. Some answers differ from practice at home: patients with capacity can refuse treatment, next of kin cannot consent for another adult, and nurses raise concerns and are open with patients when something goes wrong. When two options look right, choose the one that keeps the patient safe and follows the NMC Code.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the UK frameworks by name</h3>
            <p>
              NEWS2 and its escalation thresholds, the Mental Capacity Act 2005, safeguarding under the Care Act 2014, MUST, the Sepsis Six, SBAR and the five moments for hand hygiene come up again and again. Learn the numbers too: 14 units of alcohol a week, oxygen targets of 94 to 98% (88 to 92% for some patients with COPD), hypoglycaemia below 4.0 mmol/L.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make numeracy automatic</h3>
            <p>
              Part A needs 13 of 15, so a single slip matters. Use one formula every time (what you want, divided by what you have, times the volume), convert to the same unit before you divide, and read the rounding instruction twice. UK charts write micrograms in full, and a standard giving set delivers 20 drops per mL.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest platform, then take a full test</h3>
            <p>
              Tigertest shows your practice score by platform. Read the rationales in the area you miss most, then sit Practice Test 2 in one go to check your timing: about 2 minutes a numeracy question and 1.5 minutes a clinical one. These scores track your practice and do not predict your result.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            NMC CBT Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="uknmc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your NMC CBT Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account needed. 272 questions across numeracy and all seven platforms, written for nurses joining the UK register.</p>
          <ExamLandingCTA dashboardHref="/nmc-cbt/dashboard" />
        </div>
      </div>
    </div>
  );
}
