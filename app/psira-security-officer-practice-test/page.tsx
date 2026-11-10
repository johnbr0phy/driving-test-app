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

const title = "PSIRA Security Officer Practice Test 2026 - Free Grade E, D and C Questions";
const metaDescription =
  "Free practice for the PSIRA Grade E, D and C security officer assessments in South Africa: 200 original questions on the PSIRA Act, arrest and use of force, access control, patrols, occurrence books, first response and OHS. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the written assessments South African security officers take on the PSIRA Grade E, D and C courses: 200 original questions on the Private Security Industry Regulation Act 56 of 2001 and the code of conduct, a private person's arrest powers and use of force under the Criminal Procedure Act, access control and searching, patrols and radio, occurrence books, reports and crime scenes, first response, fire and first aid, and the Occupational Health and Safety Act. Four 50-question mock tests and four training sets grouped by grade.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "psira exam, psira test questions, psira grade e questions and answers, psira grade d, psira grade c, security officer exam south africa, psira practice test, security guard test south africa, psira training questions, psira mock test 2026",
  alternates: {
    canonical: `${siteUrl}/psira-security-officer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psira-security-officer-practice-test`,
    images: [{ url: shareImageUrl("zapsira"), width: 1200, height: 630, alt: "Tigertest free PSIRA security officer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zapsira")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What do I need to register with PSIRA as a security officer?",
    a: "Under section 20 of the Private Security Industry Regulation Act 56 of 2001, nobody may work as a security officer for pay unless registered with the Private Security Industry Regulatory Authority (PSIRA). Section 23 says a person applying must be a fit and proper person, a South African citizen or permanent resident, at least 18, mentally sound, and must have met the prescribed training requirements, with no conviction for an offence listed in the Act's Schedule in the 10 years before applying (the Amendment Act 18 of 2014 drops that time limit once it comes into operation). The training is done at a PSIRA-accredited training centre.",
  },
  {
    q: "How many questions are in the PSIRA Grade E, D or C assessment and what is the pass mark?",
    a: "Each grade's assessment is set by the accredited training centre that runs the course, and Tigertest could not confirm an official question count, time or pass mark from PSIRA. Each mock test here has 50 questions and uses 70% as Tigertest's target, not an official figure. Ask your training centre how its assessment works.",
  },
  {
    q: "What topics do the Grade E, D and C courses cover?",
    a: "The courses cover the PSIRA Act and code of conduct, the security officer's role, a private person's arrest powers and the limits on force, access control and searching, patrols, observation and radio work, occurrence books and incident reports, crime scene protection, first response to emergencies, fire safety, basic first aid and occupational health and safety. The four training sets here group those topics by grade, as Tigertest's own grouping.",
  },
  {
    q: "Can a security officer arrest someone in South Africa?",
    a: "A security officer has the arrest powers of any private person under section 42 of the Criminal Procedure Act: for example, someone committing a Schedule 1 offence such as theft in their presence, someone in an affray, and, when authorised by the owner, someone found committing an offence on the property. Force must be reasonably necessary and proportional under section 49, and the suspect is handed to SAPS as soon as possible.",
  },
  {
    q: "Are these the real PSIRA assessment questions?",
    a: "No. Every question is original, written by Tigertest from the Private Security Industry Regulation Act, the Criminal Procedure Act, the Occupational Health and Safety Act and standard guarding, fire and first aid practice. There is no firearm content: that is the separate firearm competency course. It is free practice, not affiliated with PSIRA, SAPS or any training centre, and it does not replace an accredited course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PSIRA Security Officer Practice Test",
      description,
      url: `${siteUrl}/psira-security-officer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      featureList: [
        "200 PSIRA security officer practice questions",
        "4 mock tests of 50 questions",
        "4 training sets grouped by grade",
        "Instant feedback with explanations",
        "Auto-save progress",
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

const contentAreas = [
  { name: "PSIRA, the Act and the code of conduct", weight: "6 per test" },
  { name: "The security officer's role and conduct", weight: "6 per test" },
  { name: "Legal powers: arrest, search and force", weight: "7 per test" },
  { name: "Access control and searching", weight: "7 per test" },
  { name: "Patrols, observation and radio", weight: "6 per test" },
  { name: "Occurrence books, reports and evidence", weight: "6 per test" },
  { name: "First response, fire and first aid", weight: "7 per test" },
  { name: "Occupational health and safety", weight: "5 per test" },
];

export default function PsiraSecurityLandingPage() {
  return (
    <div data-theme="zapsira" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSIRA Security Officer Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psira-security/dashboard"
            shortName="PSIRA Grades E-C"
            subtitle="200 original questions for the PSIRA Grade E, D and C courses: the PSIRA Act, arrest and use of force, access control, patrols and radio, occurrence books, first response, fire, first aid and OHS. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/zapsira-mobile.png", desktop: "/landing/zapsira-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="zapsira" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Grade by Grade</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: the PSIRA Act and your role, legal powers and access control (Grade E), patrols, radio and reports (Grade D), and first response and safety (Grade C). Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix every topic, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation set at a South African mall, estate, warehouse or office park.
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
                Built on the Grade E to C Course Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Training centres set the assessments and no official topic weights were found, so each 50-question test spreads the course topics as below. The law questions follow the Private Security Industry Regulation Act 56 of 2001, the Criminal Procedure Act 51 of 1977 and the Occupational Health and Safety Act 85 of 1993.
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
                src={getTigerAsset("zapsira", 1)}
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
            How to Pass Your PSIRA Grade Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know a private person&apos;s powers</h3>
              <p>
                PSIRA registration does not make you a peace officer. You arrest as a private person under section 42 of the Criminal Procedure Act, use only force that is reasonably necessary and proportional, search by consent, and hand a suspect to SAPS as soon as possible.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the key numbers once</h3>
              <p>
                10111 for SAPS, 10177 for an ambulance, 112 from a cellphone. To register you must be at least 18, and a conviction for an offence listed in the Act&apos;s Schedule or improper conduct in the last 5 years can stop registration. An arrested person goes before a court within 48 hours, and an injury at work is reported before the end of the shift.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write the occurrence book as facts</h3>
              <p>
                Exact times, what you saw and heard, descriptions from head to toe, registration numbers and direction of travel. No opinions, no back-dating, no torn-out pages, and protect the scene for SAPS.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each grade, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test before your assessment, and ask your training centre how its assessment is set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PSIRA Security Officer Frequently Asked Questions
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

      <ExamRelatedTests examId="zapsira" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PSIRA Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic of the Grade E to C courses.</p>
          <ExamLandingCTA dashboardHref="/psira-security/dashboard" />
        </div>
      </div>
    </div>
  );
}
