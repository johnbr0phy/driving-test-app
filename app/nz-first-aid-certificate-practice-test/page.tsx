import "@/lib/banks/nzfirstaid";
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
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = SITE_URL;

const title = "Free NZ First Aid Practice Test 2026 - Unit Standards 6401 and 6402";
const metaDescription =
  "Free-to-start practice for the New Zealand workplace first aid course: 200 original questions on NZQA skill standards 41052 and 41053 (formerly 6401 and 6402), written to the ANZCOR guidelines, in four 50-question tests.";
const description =
  "Practice for the theory side of a New Zealand workplace first aid course: 200 original questions written from NZQA skill standards 41052 Administer first aid and 41053 Administer basic life support, which replaced unit standards 6401 and 6402, and from the ANZCOR guidelines that assessment must follow. Four 50-question practice tests and four training sets cover scene safety, DRSABCD and calling 111, CPR and AED use for adults, children and babies, choking and drowning, bleeding, tourniquets and shock, fractures, head, spinal and eye injuries, burns and poisoning, heart attack, stroke, asthma, anaphylaxis, seizures and diabetic emergencies, and heat, cold, bites and stings.";

const faqs = [
  {
    q: "What are unit standards 6401 and 6402?",
    a: "They are the NZQA unit standards behind most workplace first aid certificates in New Zealand: 6401 Provide first aid and 6402 Provide basic life support, with 6400 for managing first aid in emergency situations. In November 2025 NZQA registered new skill standards to replace them: 41052 Administer first aid, 41053 Administer basic life support and 41051 Manage first aid during emergency situations. The old unit standards expire on 31 December 2027, so courses may use either set until then. These practice tests cover the content of both.",
  },
  {
    q: "Is there a written exam with a pass mark?",
    a: "No. There is no national exam. Your training provider assesses you against the standards using simulated first aid incidents and scenarios, and the result is Achieved or not. For basic life support that includes DRSABCD, CPR on an adult or child and an infant, using an AED, choking, severe bleeding including a tourniquet, and the recovery position. Some providers add a short written quiz of their own. The 80% on these tests is Tigertest's readiness line, not an official mark.",
  },
  {
    q: "Which first aid guidelines do these questions follow?",
    a: "The ANZCOR guidelines, which NZQA's April 2026 update made the reference for assessing all three first aid standards, plus the New Zealand resources the standards list, such as Hato Hone St John's first aid library and Stroke Foundation NZ's FAST message. That means 111 for emergencies, 30 compressions to 2 breaths at 100 to 120 a minute, back blows then chest thrusts for choking with no abdominal thrusts, no semi-rigid neck collars for first aiders, and the National Poisons Centre on 0800 764 766.",
  },
  {
    q: "What do the practice tests cover?",
    a: "Each 50-question test mixes eight topics: scene safety, DRSABCD and calling 111; CPR and AED use; airway, choking and drowning; bleeding, tourniquets, shock and fainting; fractures, head, spinal and eye injuries; burns and poisoning; heart attack, stroke, asthma, anaphylaxis, seizures and diabetes; and heat, cold, bites and stings. NZQA publishes no topic weights, so the split is Tigertest's.",
  },
  {
    q: "Is this an official first aid course or certificate?",
    a: "No. Every question is original, written by Tigertest from the NZQA standards and the ANZCOR guidelines. It is free revision for the theory side of the course, not a certificate, and it cannot replace the hands-on practice and assessment of an accredited training provider. Tigertest is not affiliated with NZQA, the New Zealand Resuscitation Council or any training provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz first aid practice test, first aid certificate nz, unit standard 6401, unit standard 6402, 41052 administer first aid, 41053 basic life support, nzqa first aid, workplace first aid nz, first aid course quiz nz, anzcor cpr nz",
  alternates: {
    canonical: `${siteUrl}/nz-first-aid-certificate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-first-aid-certificate-practice-test`,
    images: [{ url: shareImageUrl("nzfirstaid"), width: 1200, height: 630, alt: "Tigertest free NZ first aid practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzfirstaid")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ First Aid Practice Test",
      description,
      url: `${siteUrl}/nz-first-aid-certificate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzfirstaid"),
      featureList: [
        "200 New Zealand first aid practice questions",
        "4 practice tests of 50 questions",
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
        classFaqJsonLd("nzfirstaid"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scene safety, DRSABCD & 111", weight: "6 of 50" },
  { name: "CPR & AED", weight: "8 of 50" },
  { name: "Airway, choking & drowning", weight: "6 of 50" },
  { name: "Bleeding, shock & fainting", weight: "7 of 50" },
  { name: "Fractures, head, spine & eyes", weight: "6 of 50" },
  { name: "Burns & poisoning", weight: "5 of 50" },
  { name: "Heart, stroke, asthma, allergy & diabetes", weight: "8 of 50" },
  { name: "Heat, cold, bites & stings", weight: "4 of 50" },
];

export default function NzFirstAidLandingPage() {
  return (
    <div data-theme="nzfirstaid" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ First Aid Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-first-aid/dashboard"
            shortName="NZ First Aid"
            subtitle="200 questions on NZQA first aid standards 41052 and 41053 (formerly 6401 and 6402). Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nzfirstaid-mobile.png", desktop: "/landing/nzfirstaid-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzfirstaid" />

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
                Four training sets follow the first aid standards: DRSABCD, CPR and AED; choking, bleeding and shock; injuries, burns and poisoning; and medical and environmental emergencies. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each mixing every topic. Your course is assessed with practical scenarios rather than a national exam, so aim for 80% here as a readiness line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on NZQA 41052, 41053 and ANZCOR
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZQA&apos;s first aid skill standards say what you must be able to do: assess and manage injuries and medical conditions, and give basic life support to adults, children and infants. Assessment must follow the ANZCOR guidelines. NZQA publishes no topic weights, so this split is Tigertest&apos;s.
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
                src={getTigerAsset("nzfirstaid", 3)}
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
            How to Prepare for Your First Aid Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn DRSABCD until it is automatic</h3>
              <p>
                Danger, Response, Send for help, Airway, Breathing, CPR, Defibrillation. Every scenario in your assessment starts with it, so practise saying each step aloud, including ringing 111 and asking for an AED.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the numbers</h3>
              <p>
                30 compressions to 2 breaths at 100 to 120 a minute for every age; about 4 cm deep for an infant, about 5 cm for a child and more than 5 cm for an adult; up to 5 back blows then up to 5 chest thrusts for choking; 20 minutes of cool running water for a burn.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Unlearn the old advice</h3>
              <p>
                ANZCOR no longer uses abdominal thrusts for choking, raising a bleeding limb, semi-rigid neck collars for first aiders, or leaving a crushing load in place. Ice, butter and popping blisters are out for burns, and vinegar is only for tropical jellyfish, never bluebottles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then practise hands-on</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed. Then put the theory into your hands on the course: compressions on a manikin, an AED trainer and the recovery position are what you are assessed on.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ First Aid Course Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nzfirstaid" />
        </div>
      </div>

      <ExamSampleQuestions examId="nzfirstaid" />

      <ExamRelatedTests examId="nzfirstaid" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your First Aid Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on NZQA first aid standards and the ANZCOR guidelines.</p>
          <ExamLandingCTA dashboardHref="/nz-first-aid/dashboard" />
        </div>
      </div>
    </div>
  );
}
