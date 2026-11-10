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

const title = "Singapore Vocational Licence Practice Test 2026 - Free TDVL and PDVL Questions";
const metaDescription =
  "Free practice for Singapore's taxi and private hire car vocational licence test (TDVL and PDVL): 200 original questions on road safety, passenger handling, VL rules and demerit points, bookings, decals, fares and routes. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the e-test a taxi or private hire car driver takes for an LTA vocational licence in Singapore: 200 original questions across the three papers, on-the-road safety and passenger engagement, rules and regulations for taxi and private hire drivers (vocational licences, the Vocational Licence Points System, the point-to-point framework, decals, fares, pick-up and set-down rules) and route planning. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "tdvl test, pdvl test, tdvl practice test, pdvl practice test, vocational licence test singapore, taxi vocational licence, private hire car vocational licence, pdvl exam questions, tdvl exam questions, vlps demerit points, private hire driver licence singapore, taxi driver test singapore 2026",
  alternates: {
    canonical: `${siteUrl}/singapore-vocational-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-vocational-licence-practice-test`,
    images: [{ url: shareImageUrl("sgvl"), width: 1200, height: 630, alt: "Tigertest free Singapore TDVL and PDVL practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgvl")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the TDVL and PDVL test?",
    a: "To drive a taxi or a private hire car for hire in Singapore you need a vocational licence from the Land Transport Authority (LTA): a Taxi Driver's Vocational Licence (TDVL), which covers taxis and private hire cars, or a Private Hire Car Driver's Vocational Licence (PDVL), which covers private hire cars only. After LTA approves the application you attend the vocational licence course with an LTA-listed provider and then sit an e-test at an LTA-appointed test centre. LTA lists the TDVL test as three papers.",
  },
  {
    q: "What do the three papers cover?",
    a: "The course providers describe Paper A as on-the-road safety practices and passenger engagement and handling, Paper B as the rules and regulations for taxi and private hire car drivers, and Paper C as routes: route planning with a printed street directory and digital navigation tools (the TDVL paper also covers key routes and landmarks). The training sets here follow those papers.",
  },
  {
    q: "How many questions are on the test and what is the pass mark?",
    a: "LTA and the course providers do not publish the number of questions, the time for each paper or the pass mark. Each mock test here has 50 questions mixing all three papers and uses 80% as Tigertest's target, not an official figure. Your course provider will explain the current format before the e-test.",
  },
  {
    q: "How long does a vocational licence last?",
    a: "A TDVL or PDVL is issued and renewed for three years, with a shorter period from age 67. Holders attend a refresher course once every six years, must be certified medically fit before renewal from age 50, pass an on-road Assessment of Fitness to Drive before their 70th, 73rd and 74th birthdays, and may hold the licence only up to the statutory age limit of 75. Demerit points under the Vocational Licence Points System can lead to suspension or revocation.",
  },
  {
    q: "Are these the real TDVL or PDVL test questions?",
    a: "No. Every question is original, written by Tigertest from LTA's published rules: the vocational licence pages on OneMotoring, the demerit points rules for taxi and private hire car drivers, LTA's private hire car and point-to-point pages, and standard safe driving and passenger service practice. Paper C's street directory lookups are only partly modelled. It is free practice, not affiliated with LTA, the Traffic Police or any course provider, and it does not replace the vocational licence course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore Vocational Licence Practice Test",
      description,
      url: `${siteUrl}/singapore-vocational-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SGD" },
      featureList: [
        "200 TDVL and PDVL practice questions",
        "4 mock tests of 50 questions",
        "4 training sets following the three papers",
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
  { name: "Paper A: on-the-road safety", weight: "8 per test" },
  { name: "Paper A: passenger engagement and handling", weight: "8 per test" },
  { name: "Paper A: passengers with disabilities, seniors and children", weight: "5 per test" },
  { name: "Paper B: vocational licences and renewal", weight: "6 per test" },
  { name: "Paper B: conduct rules and demerit points", weight: "8 per test" },
  { name: "Paper B: bookings, decals and fares", weight: "6 per test" },
  { name: "Paper B: pick-up, set-down and taxi stands", weight: "4 per test" },
  { name: "Paper C: routes and route planning", weight: "5 per test" },
];

export default function SgVocationalLicenceLandingPage() {
  return (
    <div data-theme="sgvl" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Singapore TDVL and PDVL Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-vocational-licence/dashboard"
            shortName="TDVL / PDVL"
            subtitle="200 original questions for the taxi and private hire car vocational licence: road safety, passenger handling, licence rules and demerit points, bookings, decals, fares, pick-up rules and routes. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sgvl-mobile.png", desktop: "/landing/sgvl-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgvl" />

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
                Four training sets: road safety and stopping rules, passenger engagement, licences and demerit points, and fares, bookings and routes. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix all three papers, with an 80% target. No question appears in more than one test, and every answer comes with a short explanation set on Singapore&apos;s roads, taxi stands and expressways.
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
                Built on the Three Papers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                LTA does not publish how many questions each paper has, so each 50-question test spreads the three papers as below (Tigertest&apos;s split). The rules questions follow LTA&apos;s vocational licence pages and the demerit points rules for taxi and private hire car drivers.
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
                src={getTigerAsset("sgvl", 1)}
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
            How to Pass the Vocational Licence Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know which licence covers which car</h3>
              <p>
                A TDVL covers taxis and private hire cars; a PDVL covers private hire cars only. Only taxis may be hailed on the street. A private hire car carries passengers only on a booking through a licensed or licence-exempt operator, and its passengers may not board or alight at a taxi stand.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the demerit points bands</h3>
              <p>
                Points count over any 24 months: 6 to 10 can mean a 2-week suspension, 11 to 15 four weeks, 16 or more eight weeks, and more than 20 revocation. The heaviest offences, at 21 points, include lending your licence, unauthorised recording in the car, tampering with the meter and keeping a passenger&apos;s property for a week.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put the passenger&apos;s safety first</h3>
              <p>
                Set down at taxi stands, taxi stops or driveways, never in a bus lane during its hours or right at a bus stop, and check for riders before a door opens. When a question offers a shortcut that saves time but bends a rule, the safe and lawful choice is the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each paper, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 80% or better on every mock test, and use your course provider&apos;s street directory practice for the route-finding part of Paper C.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          TDVL and PDVL Test Frequently Asked Questions
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

      <ExamRelatedTests examId="sgvl" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Vocational Licence Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all three papers of the TDVL and PDVL test.</p>
          <ExamLandingCTA dashboardHref="/singapore-vocational-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
