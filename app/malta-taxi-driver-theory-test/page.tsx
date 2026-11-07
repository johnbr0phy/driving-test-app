import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import "@/lib/banks/mttaxi";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Malta Taxi Driver Theory Test Practice 2026 - Free Mock Tests (Transport Malta)";
const metaDescription =
  "Free practice for the Malta taxi driver theory test: 200 original questions on the Taxi Services Regulations, passengers, safety and the places of Malta and Gozo, five 35-question mock tests with 30 to pass, every answer explained.";
const description =
  "Free practice for the theory test that leads to the Taxi Driver and Area Knowledge Certificate and the taxi driver's tag in Malta: 200 original practice questions written from the Taxi Services Regulations (S.L. 499.59) and the subjects in their Third Schedule. Five mock tests of 35 questions with 30 to pass, and four training sets covering the taxi driver permit and tag, the taxi and its equipment, hiring rules and fares, customer care and passengers with disabilities, emergencies and safety, professional driving, and routes and places in Malta and Gozo.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "malta taxi theory test, taxi driver theory test malta, tdakc, taxi driver and area knowledge certificate, malta taxi driver tag, transport malta taxi test, malta taxi licence, taxi driver permit malta, malta taxi course, gozo taxi driver test 2026",
  alternates: {
    canonical: `${siteUrl}/malta-taxi-driver-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malta-taxi-driver-theory-test`,
    images: [{ url: shareImageUrl("mttaxi"), width: 1200, height: 630, alt: "Tigertest free Malta taxi driver theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mttaxi")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Malta taxi driver theory test?",
    a: "It is the theory examination you sit after the taxi driver course to earn the Taxi Driver and Area Knowledge Certificate, which you need, with a practical test and 40 hours accompanying a working taxi driver, for a taxi driver permit and the driver's tag from Transport Malta. The Taxi Services Regulations set the subjects: vehicle and safety knowledge, the law on carrying passengers, emergencies and crime, routes and the main tourist and commercial places of Malta and Gozo, customer care and languages.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "The Taxi Services Regulations set the theory examination at 45 minutes. Transport Malta's guidance for approved training providers describes 35 multiple-choice questions with 30 correct needed to pass, which Transport Malta also gives as 85 percent. Transport Malta's own pages could not be read directly when this was written, so check the format with your training provider. Each mock test here has 35 questions with the same 30 to pass.",
  },
  {
    q: "What do I need to do before the theory test?",
    a: "You attend a taxi driver training course of at least 46 hours with a training provider approved by Transport Malta. To get the permit you must also be 19 or over, hold a driving licence for the vehicle, be medically fit and of good conduct, pass the practical examination and accompany a taxi driver on duty for at least 40 hours, ten of them at night. Holders of a driver certificate of professional competence are exempt from the course and the examination.",
  },
  {
    q: "Does this cover Y-plate (light passenger transport) drivers?",
    a: "Not directly. Y-plate, chauffeur and ride-hailing drivers need a separate Light Passenger Transport Vehicle driver permit with its own course and examination; a taxi driver permit holder is exempt from that course. This practice follows the white taxi rules, though the passenger care, safety, driving and area knowledge sets are useful for both.",
  },
  {
    q: "Are these the real taxi theory test questions?",
    a: "No. Every question is original, written by Tigertest from the Taxi Services Regulations and the subjects of the taxi course, to test the same knowledge without copying the real test or any course material. Places and routes are described in words, with no maps. Tigertest is free revision and is not affiliated with Transport Malta or any training provider; it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malta Taxi Driver Theory Test Practice",
      description,
      url: `${siteUrl}/malta-taxi-driver-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 original Malta taxi driver theory practice questions",
        "5 mock tests of 35 questions with 30 to pass",
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
        classFaqJsonLd("mttaxi"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Taxi Driver Permit & Tag", weight: "5 of 35" },
  { name: "The Taxi & Its Equipment", weight: "4 of 35" },
  { name: "Hiring, Stands & Plying for Hire", weight: "5 of 35" },
  { name: "Fares, Taximeter & Receipts", weight: "3 of 35" },
  { name: "Customer Care & Passengers with Disabilities", weight: "4 of 35" },
  { name: "Emergencies, First Aid & Difficult Passengers", weight: "5 of 35" },
  { name: "Professional Driving, Vehicle Care & Fuel", weight: "3 of 35" },
  { name: "Routes & Places in Malta and Gozo", weight: "6 of 35" },
];

export default function MaltaTaxiDriverLandingPage() {
  return (
    <div data-theme="mttaxi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malta Taxi Driver Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malta-taxi-driver/dashboard"
            shortName="Malta taxi theory test"
            subtitle="200 original practice questions written from the Taxi Services Regulations: permits and the driver's tag, stands and hiring, fares, passengers, safety and the places of Malta and Gozo. Five 35-question mock tests, 30 to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mttaxi-mobile.png", desktop: "/landing/mttaxi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mttaxi" />

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
                Four training sets follow the subjects of the taxi course: permits, tags and the taxi itself; hiring rules and fares; passengers and safety; and driving and area knowledge. Questions you miss come back until you have mastered them.
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
                Five mock tests of 35 questions, each needing 30 correct to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Taxi Services Regulations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport Malta does not publish how many questions come from each subject, so each mock test here follows the subject list in the Third Schedule of the Taxi Services Regulations. Routes and places, the permit rules, hiring rules and safety get the most questions. The practical examination is not modelled.
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
                src={getTigerAsset("mttaxi", 1)}
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
            How to Pass the Taxi Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the stand and plying rules</h3>
              <p>
                Only the first taxi on a stand takes the hire, the first three drivers stay with their taxis, and a plying taxi keeps 100 metres from a taxi stand and 15 metres from a bus stop. A wheelchair accessible taxi on the stand goes first for a wheelchair user.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the permit and tag numbers</h3>
              <p>
                Many questions turn on one figure: age 19, a permit of up to five years, renewal from three months before expiry, 21 days to report a conviction, 48 hours to return a tag, 40 accompanied hours with ten at night, and a refresher course every five years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know Malta and Gozo</h3>
              <p>
                Learn where the hospitals, ferry terminals, cruise port, airport and main sights are, and which island your taxi may work on. Malta taxis never carry passengers between the islands; Gozo taxis may go directly to the airport or a hospital in Malta.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 32 or more out of 35 on every mock test before the real one, then drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Malta Taxi Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mttaxi" />
        </div>
      </div>

      <ExamSampleQuestions examId="mttaxi" />

      <ExamRelatedTests examId="mttaxi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Taxi Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every subject of the taxi course.</p>
          <ExamLandingCTA dashboardHref="/malta-taxi-driver/dashboard" />
        </div>
      </div>
    </div>
  );
}
