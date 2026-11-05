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

const title = "SIRA Security Guard Practice Test 2026 - Free Dubai Guard Licence Questions";
const metaDescription =
  "Free practice for the Dubai SIRA security guard licensing exam: 200 original questions on SIRA law and licences, access control, patrols, reports, legal limits, emergencies, fire safety and first aid. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the written test a security guard takes for a SIRA individual licence in Dubai: 200 original questions on Dubai Law No. (12) of 2016 and its 2026 executive regulation, the guard's role and conduct, access control, patrols and CCTV, incident reports and evidence, a guard's legal limits, emergencies and evacuation, fire safety, first aid and working in the heat. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "sira exam, sira test questions, sira security guard exam, sira practice test, dubai security guard test, sira licence exam, sira exam questions and answers, dubai security licence, sira mock test, security guard exam dubai 2026",
  alternates: {
    canonical: `${siteUrl}/sira-security-guard-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sira-security-guard-practice-test`,
    images: [{ url: shareImageUrl("aesira"), width: 1200, height: 630, alt: "Tigertest free SIRA security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aesira")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SIRA security guard exam?",
    a: "In Dubai, nobody may work as a security guard without an individual licence from the Security Industry Regulatory Agency (SIRA), set up under Law No. (12) of 2016. Under the executive regulation issued in 2026, an applicant must be at least 18, hold valid UAE residence if not a UAE national, know the basics of Arabic or English, be of good conduct, and pass the theoretical and practical tests SIRA approves. The written test usually follows a basic guard course at a SIRA-accredited training centre.",
  },
  {
    q: "How many questions are on the SIRA exam and what is the pass mark?",
    a: "SIRA does not publish the question count, time or pass mark. Guides say the written test is multiple choice, about 60 questions in English or Arabic, with a pass mark commonly reported around 70%. Each mock test here has 50 questions and uses 70% as Tigertest's target, not an official figure. Check the current format with your training centre.",
  },
  {
    q: "What topics does the SIRA guard test cover?",
    a: "The basic guard course and test cover the guard's role and code of conduct, the SIRA licence rules, access control and patrolling, report writing, what a guard may and may not do under UAE law, emergencies such as bomb threats and evacuation, fire safety and basic first aid. The training sets here follow those topics, with Dubai scenarios such as malls, hotels, towers and labour accommodation.",
  },
  {
    q: "How long is a SIRA individual licence valid?",
    a: "Under the 2026 executive regulation an individual licence is valid for two years and can be renewed for the same period; the renewal application goes in at least 30 days before it expires. SIRA can also grant a security company a temporary licence for a new recruit for up to 90 days while they complete the requirements, and the company is responsible for the recruit during that time.",
  },
  {
    q: "Are these the real SIRA exam questions?",
    a: "No. Every question is original, written by Tigertest from Dubai Law No. (12) of 2016, the 2026 executive regulation and standard guarding, fire safety and first aid practice. The fitness assessment and the practical test are not modelled. It is free practice, not affiliated with SIRA, Dubai Police or any training centre, and it does not replace an accredited SIRA course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SIRA Security Guard Practice Test",
      description,
      url: `${siteUrl}/sira-security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
      featureList: [
        "200 SIRA security guard practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
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
  { name: "SIRA law, licences and conduct", weight: "6 per test" },
  { name: "The guard's role and standards", weight: "6 per test" },
  { name: "Access control, patrols and CCTV", weight: "8 per test" },
  { name: "Observation, reports and evidence", weight: "7 per test" },
  { name: "Legal limits, arrest and use of force", weight: "5 per test" },
  { name: "Emergencies, threats and evacuation", weight: "7 per test" },
  { name: "Fire safety", weight: "5 per test" },
  { name: "First aid, heat and health and safety", weight: "6 per test" },
];

export default function SiraSecurityLandingPage() {
  return (
    <div data-theme="aesira" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SIRA Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sira-security/dashboard"
            shortName="SIRA Guard"
            subtitle="200 original questions for the Dubai security guard licence: SIRA law and licences, access control and patrols, reports and evidence, a guard's legal limits, emergencies, fire safety and first aid in the heat. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aesira-mobile.png", desktop: "/landing/aesira-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aesira" />

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
                Four training sets: SIRA law and the guard&apos;s role, access control and reports, legal limits and emergencies, and fire safety and first aid. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix every topic, with a 70% target. No question appears in more than one test, and every answer comes with a short explanation set in a Dubai mall, hotel, tower or work site.
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
                Built on the SIRA Guard Course Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SIRA does not publish topic weights, so each 50-question test spreads the topics of the basic guard course as below. The law questions follow Dubai Law No. (12) of 2016 and the executive regulation issued in June 2026.
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
                src={getTigerAsset("aesira", 1)}
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
            How to Pass the SIRA Guard Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know what a guard may and may not do</h3>
              <p>
                A SIRA licence gives no police powers. Searches are by consent, force is only what is necessary, and a person caught in the act is handed to the police without delay. When a question tempts you to search, fine, confiscate or hold someone, the right answer is usually to observe, record and call 999.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers once</h3>
              <p>
                999 police, 998 ambulance, 997 Civil Defence. Licence holders are at least 18, the licence lasts two years, renewal goes in 30 days before expiry, a temporary licence runs up to 90 days, and an incident needs a preliminary report to SIRA within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write reports as facts</h3>
              <p>
                Exact times, what you saw and heard, descriptions from head to toe, plate number and emirate. No opinions, no guesses, no back-dating, and CCTV saved unedited.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test before your SIRA test, and confirm the current format with your training centre.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SIRA Security Guard Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="aesira" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your SIRA Guard Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every topic of the Dubai guard course.</p>
          <ExamLandingCTA dashboardHref="/sira-security/dashboard" />
        </div>
      </div>
    </div>
  );
}
