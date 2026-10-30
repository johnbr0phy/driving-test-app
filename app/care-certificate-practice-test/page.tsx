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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Care Certificate Practice Test 2026 - Free Questions on All 16 Standards";
const metaDescription =
  "Free Care Certificate practice: 200 original questions on all 16 standards (2025 update), from duty of care and safeguarding to infection control, with every answer explained.";
const description =
  "Free practice for the Care Certificate knowledge checks in England: 200 original questions on all 16 standards as updated in March 2025, including your role and personal development, duty of care, equality and human rights, person-centred care and mental capacity, communication and handling information, privacy and dignity, fluids and nutrition, mental health and dementia, learning disability and autism, safeguarding adults and children, basic life support, health and safety and infection prevention and control. Four 50-question practice tests with an explanation on every question.";

const faqs = [
  {
    q: "What is the Care Certificate?",
    a: "The Care Certificate is a set of 16 standards that new health and social care support workers in England are expected to meet during their induction. It was introduced in 2015 by Skills for Care, Skills for Health and Health Education England, and the standards were updated in March 2025, adding a 16th standard on awareness of learning disability and autism. It is not a qualification; it shows you have the knowledge, skills and behaviours to give safe, compassionate care.",
  },
  {
    q: "Is there a Care Certificate exam or pass mark?",
    a: "No. There is no national exam and no official pass mark. Your employer's assessor checks what you know, often with workbooks or written questions, and watches you in real work before signing off each standard. The 80 percent target on these practice tests is a readiness line for your knowledge checks, not an official score.",
  },
  {
    q: "How long does the Care Certificate take?",
    a: "Guidance for employers says the standards should be met within 12 weeks of starting. You learn the knowledge through induction training, workbooks or e-learning, then show your skills in practice while being observed. Some standards, such as basic life support, need practical training that meets current Resuscitation Council UK guidelines.",
  },
  {
    q: "What are the 16 Care Certificate standards?",
    a: "Understand your role; your personal development; duty of care; equality, diversity, inclusion and human rights; work in a person-centred way; communication; privacy and dignity; fluids and nutrition; awareness of mental health and dementia; adult safeguarding; safeguarding children; basic life support; health and safety; handling information; infection prevention and control; and awareness of learning disability and autism. These practice tests group them into eight categories.",
  },
  {
    q: "How does the Care Certificate relate to the Level 2 Adult Social Care Certificate?",
    a: "The Level 2 Adult Social Care Certificate is a regulated qualification built on the Care Certificate standards, first offered in 2024 to deepen and recognise that learning. Completing the Care Certificate is a good foundation for it. The questions here are written by Tigertest, follow the law and guidance in England, and are not taken from any training provider's workbook.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Care Certificate practice test, Care Certificate questions and answers, Care Certificate 16 standards, Care Certificate 2025, care certificate quiz, health and social care induction test, Skills for Care Care Certificate, care worker test UK",
  alternates: {
    canonical: `${siteUrl}/care-certificate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/care-certificate-practice-test`,
    images: [{ url: shareImageUrl("ukcare"), width: 1200, height: 630, alt: "Tigertest free Care Certificate practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukcare")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Care Certificate Practice Test",
      description,
      url: `${siteUrl}/care-certificate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 Care Certificate practice questions",
        "All 16 standards, including the 2025 learning disability and autism standard",
        "4 practice tests of 50 questions",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
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
        classFaqJsonLd("ukcare"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Your Role & Personal Development (1, 2)", weight: "10%" },
  { name: "Duty of Care & Equality (3, 4)", weight: "12%" },
  { name: "Person-Centred Care, Privacy & Dignity (5, 7)", weight: "16%" },
  { name: "Communication & Handling Information (6, 14)", weight: "12%" },
  { name: "Fluids, Nutrition & Basic Life Support (8, 12)", weight: "10%" },
  { name: "Mental Health, Dementia, Learning Disability & Autism (9, 16)", weight: "12%" },
  { name: "Safeguarding Adults & Children (10, 11)", weight: "14%" },
  { name: "Health & Safety, Infection Control (13, 15)", weight: "14%" },
];

export default function CareCertificateLandingPage() {
  return (
    <div data-theme="ukcare" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Care Certificate Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/care-certificate/dashboard"
            shortName="Care Certificate"
            subtitle="200 questions on all 16 Care Certificate standards, updated for 2025: duty of care, person-centred care, safeguarding, dementia, learning disability and autism, and infection control. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukcare-mobile.png", desktop: "/landing/ukcare-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukcare" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Each set covers all 16 standards. Questions you miss come back until you have mastered them, so short sessions between shifts add up.
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
                Four 50-question practice tests with an explanation on every question. Aim for 80 percent before your assessor&apos;s knowledge checks. There is no official exam or pass mark, so the 80 percent line is a readiness target.
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
                Built on the 16 Care Certificate Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow the Care Certificate standards as updated in March 2025, grouped into eight categories (standard numbers in brackets). Safeguarding, health and safety, infection control and person-centred care carry the most questions because they hold the most rules a new worker must apply on day one. Every question is original and follows the law and guidance in England, including the Care Act 2014, the Mental Capacity Act 2005 and the Equality Act 2010. Care providers, colleges and trainers running induction can assign Tigertest as a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which standards new starters miss most.
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
                src={getTigerAsset("ukcare", 1)}
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
            How to Complete the Care Certificate
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the laws by what they do</h3>
              <p>
                A few laws come up again and again: the Care Act 2014 for adult safeguarding, the Mental Capacity Act 2005 and its five principles, the Equality Act 2010 and its nine protected characteristics, the Human Rights Act 1998, UK GDPR and the Data Protection Act 2018 for records, and the Health and Safety at Work etc. Act 1974. Know what each one is for, not its section numbers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Put the person first in every answer</h3>
              <p>
                Most scenario questions turn on the same idea: the person&apos;s choices, consent, privacy and dignity come first, and risks are talked through rather than used as a reason to take control. When unsure, ask what the person wants, check the care plan and report concerns to your manager.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know when to report and who to tell</h3>
              <p>
                Safeguarding concerns, errors, near misses, changes in eating or drinking, signs of pain and data breaches all get reported promptly, through your agreed ways of working. Never promise to keep abuse a secret, never investigate it yourself, and escalate if nothing is done.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by standard group. Aim for 80 percent or more on all four practice tests, then drill the questions you missed. Remember that your assessor also needs to see you put the standards into practice at work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Care Certificate Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ukcare" />
        </div>
      </div>

      <ExamRelatedTests examId="ukcare" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Care Certificate?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all 16 standards.</p>
          <ExamLandingCTA dashboardHref="/care-certificate/dashboard" />
        </div>
      </div>
    </div>
  );
}
