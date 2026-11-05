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

const title = "PSA Security Guard Practice Test 2026 - Free QQI Level 4 Security Guarding Questions";
const metaDescription =
  "Free practice for the QQI Level 4 Security Guarding Skills (4N20604) theory exam you need for a PSA security guard licence in Ireland: 200 original questions on the Private Security Services Act, arrest and reasonable force, access control, patrols, reports, emergencies, events and retail. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the theory examination of QQI Level 4 Security Guarding Skills (4N20604), the qualification the Private Security Authority requires for a security guard (guarding) licence in Ireland: 200 original questions on the Private Security Services Act 2004 and PSA licensing, arrest under section 4 of the Criminal Law Act 1997, reasonable force, search and trespass, access control, keys and confidentiality, patrols, alarms and radio, reports, evidence and court, fire, emergencies and first response, and event, crowd and retail security. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "psa licence exam, psa security guard test, qqi level 4 security guarding, 4n20604 exam questions, security guarding skills exam, security guard course ireland questions, psa licence ireland, security guard test ireland, qqi security exam practice, psa mock test 2026",
  alternates: {
    canonical: `${siteUrl}/psa-security-guard-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psa-security-guard-practice-test`,
    images: [{ url: shareImageUrl("iepsa"), width: 1200, height: 630, alt: "Tigertest free PSA security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iepsa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What qualification do I need for a PSA security guard licence?",
    a: "Under the Private Security (Licensing and Qualifications) Regulations 2022, as amended in 2024, a security guard (guarding) licence needs QQI Level 4 minor award 4N20604 Security Guarding Skills, or a qualification the Private Security Authority (PSA) accepts as equivalent. Door supervisors need 4N20611 Door Security Skills instead. Under section 22 of the Private Security Services Act 2004 the PSA must also refuse anyone under 18 or anyone who is not a fit and proper person.",
  },
  {
    q: "How is the QQI Security Guarding Skills award assessed?",
    a: "QQI's component specification for 4N20604 sets two assessments, a theory examination worth 50% and a skills demonstration worth 50%, and you must pass both. The training provider writes the exam paper, so the number of questions and the time vary by course. The award is graded Pass (50 to 64%), Merit (65 to 79%) and Distinction (80 to 100%). The mock tests here have 50 questions with 70% as Tigertest's own target; the skills demonstration is not modelled.",
  },
  {
    q: "What topics does the course cover?",
    a: "The award has two units. Private Security Sector covers the industry and its law, the guard's role, prevention, protection and detection, Irish criminal, civil, equality and safety law, court procedure, emergencies including terrorist threats, patrols and access control, documentation, alarms and evacuation, communication and conflict, and confidentiality. Security Guarding Skills covers the law on a guard's role, patrols, event security and crowd control, trespass, powers of arrest, search and detention, key handling, store detectives and cash handling.",
  },
  {
    q: "Can a security guard arrest someone in Ireland?",
    a: "Only as any person can, under section 4 of the Criminal Law Act 1997: someone in the act of an arrestable offence (one carrying 5 years' imprisonment or more, such as theft), or, where such an offence has been committed, someone reasonably suspected of it. A private person may arrest only where there is reasonable cause to suspect the person would otherwise avoid arrest by the Gardaí, and must hand them to the Gardaí as soon as practicable. Any force must be reasonable under the Non-Fatal Offences Against the Person Act 1997.",
  },
  {
    q: "Are these the real QQI exam questions?",
    a: "No. Every question is original, written by Tigertest from the QQI 4N20604 learning outcomes, the Private Security Services Act 2004 and the PSA regulations, the Criminal Law Act 1997, the Non-Fatal Offences Against the Person Act 1997 and standard guarding, fire and first response practice. It is free practice, not affiliated with the Private Security Authority, QQI or any training provider, and it does not replace a validated course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PSA Security Guard Practice Test",
      description,
      url: `${siteUrl}/psa-security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 QQI Security Guarding practice questions",
        "4 mock tests of 50 questions",
        "4 training sets on the course units",
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
  { name: "PSA licensing and the security sector", weight: "6 per test" },
  { name: "Role, conduct and customer care", weight: "6 per test" },
  { name: "Arrest, force, search and trespass", weight: "8 per test" },
  { name: "Access control, keys and confidentiality", weight: "6 per test" },
  { name: "Patrols, alarms and radio", weight: "6 per test" },
  { name: "Reports, evidence and court", weight: "6 per test" },
  { name: "Emergencies, fire and first response", weight: "6 per test" },
  { name: "Events, crowds and retail security", weight: "6 per test" },
];

export default function IePsaLandingPage() {
  return (
    <div data-theme="iepsa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSA Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psa-security-licence/dashboard"
            shortName="QQI Security Guarding"
            subtitle="200 original questions for the QQI Level 4 Security Guarding Skills theory exam you need for a PSA licence: the 2004 Act, arrest and reasonable force, access control, patrols, reports, fire, events and retail. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/iepsa-mobile.png", desktop: "/landing/iepsa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iepsa" />

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
                Four training sets: the sector, the PSA and your role; arrest, force and access control; patrols, reports and court; and emergencies, events and retail. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix every topic, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation set at an Irish shopping centre, office, warehouse or event.
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
                Built on the QQI 4N20604 Learning Outcomes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Training providers set the theory exam and QQI publishes no topic weights, so each 50-question test spreads the award&apos;s two units, Private Security Sector and Security Guarding Skills, as below. The law questions follow the Private Security Services Act 2004, the PSA&apos;s regulations, the Criminal Law Act 1997 and the Non-Fatal Offences Against the Person Act 1997.
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
                src={getTigerAsset("iepsa", 1)}
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
            How to Pass Your Security Guarding Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know that a licence adds no powers</h3>
              <p>
                A PSA licence lets you work in security; it does not make you a Garda. You arrest only as any person can under section 4 of the Criminal Law Act 1997, search only with consent, use only reasonable force, and hand anyone you arrest to the Gardaí as soon as practicable.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the licence rules you live by</h3>
              <p>
                Carry your PSA identity card on duty and show it when a client, a Garda or a PSA inspector asks; wear it as your badge unless the work is covert; tell the PSA about any conviction or pending case; and surrender the card when you stop working in security.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write reports that stand up in court</h3>
              <p>
                Exact times on the 24-hour clock, what you saw and heard, descriptions from head to toe, one line through any mistake, and no back-dating. Protect a scene for the Gardaí and keep a log of who goes in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each unit, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test, ask your training provider how its theory exam is set, and remember the skills demonstration is assessed separately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PSA Security Guard Frequently Asked Questions
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

      <ExamRelatedTests examId="iepsa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Security Guarding Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across both units of QQI 4N20604.</p>
          <ExamLandingCTA dashboardHref="/psa-security-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
