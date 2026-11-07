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

const title = "Malta Private Guard Licence Practice Test 2026 - Free Award in Private Security Guard Services Questions";
const metaDescription =
  "Free practice for the Award in Private Security Guard Services you need for a private guard licence in Malta: 200 original questions on Cap. 389 and the Private Guards Regulations, arrest by a private person, minimum force, patrols, CCTV, fire classes, fire and flood drills, bomb threats and reports. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the two module assessments of the Award in Private Security Guard Services, the course behind a private guard licence from the Commissioner of Police in Malta: 200 original questions on the Private Guards and Community Officers Act (Cap. 389) and the Private Guards Regulations, legal terms, arrest under article 355W of the Criminal Code, minimum force and searches, communication, conflict and customer care, security risk and patrols, CCTV, alarms and access control, fire classes, fire and flood drills, bomb threats, initial investigations and reports. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "malta private guard licence, private guard course malta questions, award in private security guard services, security guard exam malta, private guard licence test, jobsplus security course, cap 389 private guards, security guard malta practice test, private guard mock test 2026",
  alternates: {
    canonical: `${siteUrl}/malta-private-guard-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malta-private-guard-licence-practice-test`,
    images: [{ url: shareImageUrl("mtguard"), width: 1200, height: 630, alt: "Tigertest free Malta private guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mtguard")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Who issues a private guard licence in Malta?",
    a: "The Commissioner of Police, under the Private Guards and Community Officers Act (Cap. 389, formerly the Private Guards and Local Wardens Act). No one may act as a private guard, and no agency may provide a guard, without a licence. Under the Private Guards Regulations an applicant shows a certificate from a training course the Commissioner has approved, such as the Award in Private Security Guard Services, unless he has served with the police, the armed forces or the prison services.",
  },
  {
    q: "How is the Award in Private Security Guard Services assessed?",
    a: "Jobsplus describes a 40-hour course in two modules of 20 hours: Private Guard Legislation and Occupational Skills, and Security Risk and Security Practices. Each module ends with a 1-hour written paper in three sections, true or false, multiple choice and short answers, with a pass mark of 45%. Training providers write their own papers, so there is no fixed number of questions. The mock tests here have 50 multiple-choice questions with 70% as Tigertest's readiness line; true or false items are written as four-option questions and short answers are not modelled.",
  },
  {
    q: "What topics does the course cover?",
    a: "Module 1 covers the licensing rules for private guards under Cap. 389, legal terms, a guard's duties and the laws that apply on duty, verbal and non-verbal communication, negotiating to resolve conflict, customer care, avoiding stereotypes, teamwork and personal initiative. Module 2 covers monitoring for security risks, patrol equipment, surveillance with electronic systems, security and fire prevention patrols, fire and flood drills, choosing the right fire extinguisher, bomb threats, searches within the law, initial investigations and reports.",
  },
  {
    q: "Can a private guard arrest someone in Malta?",
    a: "Only as any private person can, under article 355W of the Criminal Code: someone in the act of committing, or who has just committed, a sexual offence, wilful homicide or bodily harm, theft, or wilful unlawful entry or damage to property. The guard must inform the Police without delay and may hold the person only until the Police take over. A licence adds no rights over other people (article 12(3) of Cap. 389); guards at places of entertainment and specialised guards have the extra detention and search powers in articles 12A and 12B, using minimum force only.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Jobsplus course outcomes, the Private Guards and Community Officers Act, the Private Guards Regulations, the Criminal Code and standard guarding, fire and emergency practice. It is free practice, not affiliated with the Malta Police Force, Jobsplus or any training provider, and it does not replace an approved course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malta Private Guard Practice Test",
      description,
      url: `${siteUrl}/malta-private-guard-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 private guard practice questions",
        "4 mock tests of 50 questions",
        "4 training sets, two per module",
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
  { name: "Private guard licensing and Cap. 389", weight: "6 per test" },
  { name: "Arrest, force and search powers", weight: "8 per test" },
  { name: "Duties, legal terms and compliance", weight: "6 per test" },
  { name: "Communication, conflict and customer care", weight: "6 per test" },
  { name: "Security risk and patrols", weight: "6 per test" },
  { name: "CCTV, alarms, access and searches", weight: "6 per test" },
  { name: "Fire classes, fire and flood drills", weight: "6 per test" },
  { name: "Bomb threats, investigations and reports", weight: "6 per test" },
];

export default function MtGuardLandingPage() {
  return (
    <div data-theme="mtguard" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malta Private Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malta-private-guard/dashboard"
            shortName="Malta private guard exam"
            subtitle="200 original questions for both modules of the Award in Private Security Guard Services you need for a private guard licence in Malta: Cap. 389, arrest and minimum force, patrols, CCTV, fire and flood drills, bomb threats and reports. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mtguard-mobile.png", desktop: "/landing/mtguard-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mtguard" />

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
                Four training sets, two per module: licensing, law and powers; duties and people skills; risk, patrols and surveillance; and fire, floods, threats and reports. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix both modules, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the Course&apos;s Two Modules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Approved training providers write their own papers and no topic weights are published, so each 50-question test spreads the two modules, Private Guard Legislation and Occupational Skills and Security Risk and Security Practices, as below. The law questions follow the Private Guards and Community Officers Act (Cap. 389), the Private Guards Regulations and the Criminal Code.
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
                src={getTigerAsset("mtguard", 1)}
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
            How to Pass Your Private Guard Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know that a licence adds no powers</h3>
              <p>
                A licence lets you work as a private guard; it does not make you a police officer. You arrest only as any private person can under article 355W of the Criminal Code, search only with consent unless you hold a specialised licence, use only the force that is indispensable, and inform the Police without delay.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the licence rules you live by</h3>
              <p>
                Wear the Commissioner&apos;s identity card in a conspicuous place on duty, wear the approved uniform unless you are exempt, tell the Commissioner when your details change, and do at least ten hours of continuing training each year so your licence can be renewed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write reports that stand up in court</h3>
              <p>
                Exact times on the 24-hour clock, what you saw and heard rather than opinions, measurable descriptions, and notebook entries in ink with no blank lines left. Keep a scene untouched for the Police and note anything you had to move.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each module, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 70% or better on every mock test, Tigertest&apos;s target, even though each module passes at 45%, and ask your training provider how its true or false and short-answer sections are set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Malta Private Guard Frequently Asked Questions
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

      <ExamRelatedTests examId="mtguard" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Private Guard Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across both modules of the course.</p>
          <ExamLandingCTA dashboardHref="/malta-private-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
