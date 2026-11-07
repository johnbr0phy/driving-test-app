import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/rotaxi";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Romania Taxi Driver Attestation Test 2026 in English - Free ARR Practice";
const metaDescription =
  "Free practice in English for the ARR taxi and ride-hailing driver attestation test in Romania: 200 original questions on Law 38/2003, eight 20-question mock tests, 14 to pass.";
const description =
  "Free practice in English for the Romanian Road Authority (ARR) professional attestation test for taxi drivers and drivers in rental mode, the attestation ride-hailing drivers also need: 200 original questions on Law 38/2003, taxi authorisations and documents, the taximeter, tariffs and receipts, rental and alternative transport (OUG 49/2019), customer service, taxi stands and bus lanes, road safety and driver security. Eight mock tests of 20 questions with 14 to pass, like the real test, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "arr taxi test english, atestat taxi arr, romania taxi driver attestation, atestat inchiriere arr, uber bolt driver romania atestat, taxi licence romania english, test grila atestat taxi, legea 38/2003 taxi, ride-hailing driver romania, testare arr taxi",
  alternates: {
    canonical: `${siteUrl}/romania-taxi-driver-attestation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/romania-taxi-driver-attestation-practice-test`,
    images: [{ url: shareImageUrl("rotaxi"), width: 1200, height: 630, alt: "Tigertest free Romania taxi driver attestation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rotaxi")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ARR taxi driver attestation test like?",
    a: "It is a written multiple-choice test (test-grila) of 20 questions, set by the Romanian Road Authority (ARR) and taken at its county agencies after a 30-hour training course at an authorised driving school. You need 70 percent, so 14 correct answers, to pass. The same test, with its own question base, exists for taxi drivers and for drivers in rental mode (inchiriere). Questions cover Law 38/2003, the taxi and its taximeter, tariffs and receipts, customer service, driving and road safety, and driver security.",
  },
  {
    q: "Can I take the taxi attestation test in English?",
    a: "Yes. The ARR training norms allow the test in Romanian or English, and the ARR has held English theory exams for taxi and rental drivers, and for their five-yearly endorsement, since the March 2025 session, with the English question base published on its testing platform. You sit the test in the language of your training course. Applications for taxi attestations are made online.",
  },
  {
    q: "Do Uber and Bolt drivers need this attestation?",
    a: "Yes. Under OUG 49/2019 on alternative transport, ride-hailing drivers must hold the ARR professional attestation for transport in rental mode, be at least 21, have held a category B licence for at least two years, be medically and psychologically fit and have no relevant criminal record. Rides may only be booked through an approved digital platform, and the car needs an ARR badge at the front and rear.",
  },
  {
    q: "What else do I need to work as a taxi driver in Romania?",
    a: "Law 38/2003 requires a valid category B licence held for at least two years, a valid attestation certificate, medical and psychological fitness, a minimum age of 21 and a clean criminal record for the offences the law lists. To join the course you also need a police certificate showing no licence suspension for alcohol or drugs and no injury crash caused by you in the last year. The certificate has no end date but must be endorsed every five years.",
  },
  {
    q: "Are these the real ARR questions?",
    a: "No. The ARR publishes the question base its test draws from, and Tigertest does not copy it. Every question here is original, written by Tigertest from Law 38/2003, the ARR training norms and their tematica, and OUG 49/2019, so it tests the same knowledge in fresh words. Fares, fees and fines are left out, and local council rules such as tariff levels vary by municipality. Tigertest is free practice, not affiliated with the ARR or the Ministry of Transport, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Romania Taxi Driver Attestation Practice Test",
      description,
      url: `${siteUrl}/romania-taxi-driver-attestation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "RON" },
      featureList: [
        "200 Romanian taxi and rental transport questions in English",
        "8 mock tests of 20 questions, 14 to pass",
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
  { name: "Law 38/2003, Authorisation & Documents", weight: "3 of 20" },
  { name: "Driver Attestation & Duties", weight: "3 of 20" },
  { name: "Taximeter, Tariffs & Receipts", weight: "3 of 20" },
  { name: "Customer Service & Accessibility", weight: "3 of 20" },
  { name: "Taxi Vehicle, Roof Light & Markings", weight: "2 of 20" },
  { name: "Rental & Ride-Hailing Transport", weight: "2 of 20" },
  { name: "Taxi Driving, Stands & Road Safety", weight: "2 of 20" },
  { name: "Driver & Passenger Security", weight: "2 of 20" },
];

export default function RomaniaTaxiAttestationLandingPage() {
  return (
    <div data-theme="rotaxi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Romania Taxi Driver Attestation Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/romania-taxi-attestation/dashboard"
            shortName="Taxi test"
            subtitle="200 original questions in English for the ARR professional attestation test for taxi, rental and ride-hailing drivers: Law 38/2003, the taximeter and receipts, tariffs, customers, stands and bus lanes, safety and security. Eight 20-question mock tests with 14 to pass, like the real one. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rotaxi-mobile.png", desktop: "/landing/rotaxi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rotaxi" />

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
                Four training sets cover the law and your attestation, the taxi and its taximeter, rental transport and customers, and road safety and security. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight tests of 20 questions, the length of the real ARR test, with 14 correct to pass. No question repeats across tests, and every answer explains the rule behind it.
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
                Built on Law 38/2003 and the ARR Course
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions follow Law 38/2003 on taxi and rental transport, the ARR training norms and their course topics (law, customer service, taxi practice, driving and road safety, security), and OUG 49/2019 on ride-hailing, as in force in 2026. The ARR publishes no topic split, so each mock test follows the weights below, set from the course hours. Local rules such as tariff levels and taxi colours vary by municipality and are not asked.
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
                src={getTigerAsset("rotaxi", 1)}
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
            How to Pass the ARR Taxi Attestation Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the meter and the receipt</h3>
              <p>
                Many questions turn on the fare device: the Free, Busy, Payment and Private positions, when a ride starts and ends, the 10 km/h switching speed, day and night tariffs, and the client receipt as the only document you may charge on.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your duties and the client&apos;s</h3>
              <p>
                Law 38/2003 lists what a taxi driver must and must not do, from not refusing a ride in town and taking the best route to no smoking or radio without the client&apos;s consent, and what the client must do too, such as keeping the receipt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep taxi, rental and ride-hailing apart</h3>
              <p>
                A taxi works on a meter and receipts and may use stands and bus lanes; a rental car with driver works on a prepaid contract per hour or day with no taxi signs; a ride-hailing car takes bookings only through its platform. Questions often test where the lines fall.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim for 17 or more</h3>
              <p>
                You may get only six questions wrong. Aim for 17 or more in every mock test, drill the questions you missed, retrain the weakest set, then take all eight tests before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Romania Taxi Attestation Frequently Asked Questions
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

      <ExamSampleQuestions examId="rotaxi" />

      <ExamRelatedTests examId="rotaxi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your ARR Taxi Attestation Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English for taxi, rental and ride-hailing drivers.</p>
          <ExamLandingCTA dashboardHref="/romania-taxi-attestation/dashboard" />
        </div>
      </div>
    </div>
  );
}
