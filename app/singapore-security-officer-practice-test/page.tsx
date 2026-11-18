import "@/lib/banks/sgsecurity";
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

const title = "Free Singapore Security Officer Practice Test 2026 - PLRD Licence Questions";
const metaDescription =
  "Free practice for the Singapore security officer licence: 200 original questions on the PSIA and licensing conditions, guard and patrol, access control, security equipment, incident response, recognising terrorist threats, fire safety and first aid. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the WSQ Basic Licensing Units a new security officer must pass before the Police Licensing and Regulatory Department (PLRD) grants a security officer licence under the Private Security Industry Act 2007: 200 original questions on the PSIA, the Conduct Regulations and the licensing conditions, guard and patrol duties, access control and security equipment, incident response, recognising terrorist threats, fire safety and emergencies, and first aid. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "singapore security officer test, security officer licence singapore, plrd security licence, basic licensing units, blu security course, provide guard and patrol services, handle security incidents and services, recognise terrorist threats, security officer refresher quiz, wsq security course questions",
  alternates: {
    canonical: `${siteUrl}/singapore-security-officer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-security-officer-practice-test`,
    images: [{ url: shareImageUrl("sgsecurity"), width: 1200, height: 630, alt: "Tigertest free Singapore security officer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgsecurity")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What do I need to pass to get a security officer licence in Singapore?",
    a: "Anyone paid to guard or patrol property, keep it under surveillance, act as a bodyguard or bouncer, screen people at an entrance or regulate traffic needs a security officer's licence from the Police Licensing and Regulatory Department (PLRD) under the Private Security Industry Act 2007. Since 1 January 2024, a new security officer must pass four WSQ Basic Licensing Units before being deployed: Provide Guard and Patrol Services and Operate Basic Security Equipment (Access Control Management), Handle Security Incidents and Services, and Recognise Terrorist Threats.",
  },
  {
    q: "How are the Basic Licensing Units assessed, and what is the pass mark?",
    a: "Each unit is a WSQ course run by an approved training provider, and you earn a Statement of Attainment when you are assessed competent. PLRD and SkillsFuture Singapore do not publish a question count or a pass mark, and each provider runs its own assessment. Each mock test here has 50 questions and uses 70% as Tigertest's target, not an official figure.",
  },
  {
    q: "What topics do these practice questions cover?",
    a: "The four training sets follow what PLRD's refresher training package says officers must know from the Basic Licensing Units: the PSIA, the Conduct Regulations and the licensing conditions; guard and patrol duties and access control; security equipment, CCTV and radio procedure; patrols, defects and incident reporting; detaining suspects and managing conflict; recognising terrorist threats, suspicious items and bomb threats; fire safety and emergencies; and first aid, workplace safety and personal data.",
  },
  {
    q: "Do existing security officers need the new access control unit?",
    a: "Yes. PLRD's FAQ says security officers licensed before 1 January 2024 must be certified competent in TSC Access Control Management (Operate Basic Security Equipment) by 31 December 2026, or they cannot be deployed for security officer duties from 1 January 2027. Officers who passed the old Guard and Patrol course take the standalone unit. Every officer must also pass PLRD's refresher e-quiz before renewing the licence.",
  },
  {
    q: "Are these the real assessment questions?",
    a: "No. Every question is original, written by Tigertest from the Private Security Industry Act 2007, the Private Security Industry (Conduct) Regulations 2009, PLRD's licensing conditions and refresher training package, the SCDF Civil Defence Emergency Handbook and SGSecure guidance. Practical assessments are not modelled. It is free practice, not affiliated with PLRD, the Singapore Police Force, SkillsFuture Singapore or any training provider, and it does not replace an approved WSQ course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore Security Officer Practice Test",
      description,
      url: `${siteUrl}/singapore-security-officer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgsecurity", "SGD"),
      featureList: [
        "200 Singapore security officer practice questions",
        "4 mock tests of 50 questions",
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
        classFaqJsonLd("sgsecurity"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "PSIA, licence and conduct", weight: "6 per test" },
  { name: "Guard duties and access control", weight: "7 per test" },
  { name: "Security equipment and communications", weight: "5 per test" },
  { name: "Patrols and incident reporting", weight: "7 per test" },
  { name: "Crime, detention and conflict", weight: "6 per test" },
  { name: "Terrorist threats and suspicious items", weight: "8 per test" },
  { name: "Fire and emergencies", weight: "6 per test" },
  { name: "First aid and workplace safety", weight: "5 per test" },
];

export default function SgSecurityLandingPage() {
  return (
    <div data-theme="sgsecurity" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Singapore Security Officer Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-security-officer/dashboard"
            shortName="SG Security Officer"
            subtitle="200 original questions for the PLRD security officer licence: the PSIA and licensing conditions, guard and patrol, access control, incident response, recognising terrorist threats, fire safety and first aid. Four 50-question mock tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/sgsecurity-mobile.png", desktop: "/landing/sgsecurity-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgsecurity" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Topic by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: licence, guarding and access control; equipment, patrols and reports; crime and terrorist threats; and fire, emergencies and first aid. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions that mix every topic, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation citing the PSIA, PLRD or SCDF guidance it rests on.
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
                Built on the Basic Licensing Units
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PLRD publishes no topic weights, so each 50-question test spreads the content of the four Basic Licensing Units as below. The law questions follow the Private Security Industry Act 2007, the Conduct Regulations 2009 and PLRD&apos;s licensing conditions.
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
                src={getTigerAsset("sgsecurity", 3)}
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
            How to Prepare for the Basic Licensing Units
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the limits of the role</h3>
              <p>
                A security officer protects lives and property within the law and the site&apos;s procedures. When a suspect is detained, guard the person so they cannot escape, destroy evidence or get hurt, and hand them to a police officer without delay. Record the officer&apos;s name, ID and division.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers once</h3>
              <p>
                999 for the Police, 70999 to SMS the Police when it is not safe to talk, 995 for SCDF fire and emergency ambulance, and 1777 for a non-emergency ambulance. Cordon at least 100 metres around a suspected bomb, and cool a burn for at least 10 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Report, then record</h3>
              <p>
                Most incident answers follow one order: make the scene safe, report to the Control Room, call the Police or SCDF when needed, hand over, then record in the Occurrence Book or an Incident Report according to your employer&apos;s procedures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test before your course assessment, and follow your training provider&apos;s materials for the practical parts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Singapore Security Officer Licence Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sgsecurity" />
        </div>
      </div>

      <ExamSampleQuestions examId="sgsecurity" />

      <ExamRelatedTests examId="sgsecurity" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Security Officer Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four Basic Licensing Units.</p>
          <ExamLandingCTA dashboardHref="/singapore-security-officer/dashboard" />
        </div>
      </div>
    </div>
  );
}
