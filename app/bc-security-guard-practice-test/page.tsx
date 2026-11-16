import "@/lib/banks/cabcguard";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free BC Security Guard Practice Test 2026 - BST Exam Questions";
const metaDescription =
  "Free practice for the BC Basic Security Training (BST) exam for a security worker licence: 200 original questions on the Security Services Act, arrest and use of force, BC's Trespass Act, the Code of Conduct, privacy, report writing and personal safety. Four 50-question tests, every answer explained.";
const description =
  "Free practice for the Basic Security Training (BST) exam, the training standard for a security guard worker licence in British Columbia: 200 original questions written from the Security Services Act and Regulation, the registrar's licence policies, BC's Trespass Act, the Criminal Code, BC's Personal Information Protection Act and WorkSafeBC rules. Four 50-question practice tests at the BST exam's 70% pass mark, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "bc security guard test, bst exam, basic security training bc, bc security licence test, bc security worker licence, security guard practice test bc, jibc bst exam, british columbia security guard exam",
  alternates: {
    canonical: `${siteUrl}/bc-security-guard-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/bc-security-guard-practice-test`,
    images: [{ url: shareImageUrl("cabcguard"), width: 1200, height: 630, alt: "Tigertest free BC security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cabcguard")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the BST exam?",
    a: "Basic Security Training (BST) is the training standard the BC Registrar of Security Services accepts for a security guard worker licence. It has two parts: a 40-hour theory course, in person or online, and a final exam, the BST Assessment. The Justice Institute of British Columbia (JIBC) delivers the training and invigilates the exam on the registrar's behalf, and approved security training schools also teach the course.",
  },
  {
    q: "How many questions are on the BST exam and what is the pass mark?",
    a: "JIBC lists the exam as 75 questions in 90 minutes, with 70% needed to pass. It is written in person at JIBC in New Westminster on your own laptop, or by online proctoring for some students outside the Lower Mainland, within six months of finishing the theory course. You have two attempts before you must retake the theory course. Check JIBC for current dates and details before you book.",
  },
  {
    q: "What do I need for a BC security guard licence?",
    a: "Under the Security Services Act you must be at least 19 and ordinarily resident in Canada, pass the background checks (fingerprinting is part of the process), meet the English fluency standard and have the training: BST, or training the registrar accepts as equal. You apply to the Security Programs Division. A licence from another province does not replace a BC licence.",
  },
  {
    q: "What does the BST exam cover?",
    a: "JIBC names professionalism and ethics, legal studies, report writing and personal safety, and says the exam focuses on a guard's legal authority to act and on public and personal safety coming first. The practice tests here cover the legal system and the regulator, the Security Services Act and licence rules, arrest, use of force and equipment, trespass and common offences, the Code of Conduct and privacy, notes and reports, and personal safety. JIBC publishes no topic weights, so the split here is Tigertest's.",
  },
  {
    q: "Are these the real BST exam questions?",
    a: "No. Every question is original, written by Tigertest from the Security Services Act and Regulation, the registrar's published licence policies, BC's Trespass Act, the Criminal Code, BC's Personal Information Protection Act and WorkSafeBC's rules. No JIBC course material or exam question was used. This is free revision, not affiliated with JIBC or the BC government, and it does not replace the BST course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free BC Security Guard Practice Test",
      description,
      url: `${siteUrl}/bc-security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cabcguard", "CAD"),
      featureList: [
        "200 BC security guard practice questions",
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
        classFaqJsonLd("cabcguard"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "The legal system and the regulator", weight: "6 per test" },
  { name: "Security Services Act and licensing", weight: "8 per test" },
  { name: "Arrest and legal authority", weight: "6 per test" },
  { name: "Use of force and equipment", weight: "6 per test" },
  { name: "Trespass and common offences", weight: "6 per test" },
  { name: "Code of Conduct and privacy", weight: "8 per test" },
  { name: "Notes, reports and evidence", weight: "5 per test" },
  { name: "Personal safety and emergencies", weight: "5 per test" },
];

export default function BcSecurityGuardLandingPage() {
  return (
    <div data-theme="cabcguard" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free BC Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bc-security-guard/dashboard"
            shortName="BST"
            subtitle="200 original questions for the BC Basic Security Training (BST) exam: the Security Services Act, arrest and use of force, BC's Trespass Act, the Code of Conduct and privacy, reports and personal safety. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cabcguard-mobile.png", desktop: "/landing/cabcguard-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cabcguard" />

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
                Four training sets: the legal system and licensing, arrest and use of force, trespass, conduct and privacy, and reports and personal safety. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions that mix all eight topics, with the BST exam&apos;s 70% pass mark. No question appears in more than one test, and every answer comes with a short explanation from BC law and the registrar&apos;s rules.
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
                Built on BC Security Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                JIBC publishes no topic weights, so each 50-question test leans on a guard&apos;s legal authority, as the BST exam does, and covers every topic as below. The questions follow the Security Services Act, the registrar&apos;s policies, BC&apos;s Trespass Act and the Criminal Code.
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
                src={getTigerAsset("cabcguard", 1)}
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
            How to Pass the BST Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know where your powers come from</h3>
              <p>
                The Security Services Act licenses you but gives you no arrest power. Arrest comes from section 494 of the Criminal Code, and force from sections 25 to 35. BC&apos;s Trespass Act lets you tell a trespasser to leave and ask for a name and address, but only a peace officer may arrest for trespass.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the licence rules</h3>
              <p>
                Carry your physical licence and show it on request, report charges and address changes within 14 days, and know the uniform and vehicle markings. Badges, batons, pepper spray and the Sam Browne belt are out, and handcuffs need the registrar&apos;s authorization.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put safety first</h3>
              <p>
                Public and personal safety come before property. Know the Code of Conduct, record every use of force, and know WorkSafeBC&apos;s rules for working alone, violence and refusing unsafe work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the practice tests. Aim for at least 35 out of 50 on every test, and keep your BST course notes close, because the course is what the exam is written from.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          BC Security Guard Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cabcguard" />
        </div>
      </div>

      <ExamSampleQuestions examId="cabcguard" />

      <ExamRelatedTests examId="cabcguard" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the BST Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every BST topic.</p>
          <ExamLandingCTA dashboardHref="/bc-security-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
