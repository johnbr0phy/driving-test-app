import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "RTO Learner's Licence Test 2026 - Free LL Mock Test";
const metaDescription =
  "Free RTO learner's licence practice: 200 original LL test questions on road signs, traffic rules, helmets, seat belts and documents, all explained.";
const description =
  "Free practice for India's learner's licence (LL) test at the RTO or online through Sarathi Parivahan: 200 original questions on mandatory, cautionary and informatory road signs, traffic lights and hand signals, the rules of the road, parking and towing, helmets, seat belts and drink driving, and accident duties, insurance and PUC. Four 50-question mock tests with the 60 percent pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RTO exam questions, learner's licence test, learning licence test questions, LL test questions, LLR test, RTO mock test, Sarathi Parivahan mock test, road signs India quiz, driving licence test questions India",
  alternates: {
    canonical: `${siteUrl}/rto-learners-licence-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rto-learners-licence-test`,
    images: [{ url: shareImageUrl("inrto"), width: 1200, height: 630, alt: "Tigertest free RTO learner's licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("inrto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the learner's licence (LL) test?",
    a: "It is the short computer-based test you pass to get a learner's licence, the first step to a driving licence in India. It checks that you know road signs, traffic rules and safe driving before you practise on the road. You apply through Sarathi Parivahan and, depending on your state, take the test at the RTO or online from home after an Aadhaar check and a road safety tutorial. A learner's licence is valid for six months, and you can take the driving test once you have held it for 30 days.",
  },
  {
    q: "How many questions are in the RTO learner's licence test, and what is the pass mark?",
    a: "It varies by state: each state sets the number of questions and the time allowed, and few publish it. Kerala, for example, has asked 30 questions since October 2025, with 18 correct needed to pass. The central rules set the pass mark at 60 percent. A draft amendment reported in October 2026 proposes raising it to 75 percent; it is not in force yet. The mock tests here have 50 questions each and use 60 percent to pass.",
  },
  {
    q: "What topics does the learner's licence test cover?",
    a: "Mostly road signs and traffic rules. Expect the three kinds of road sign (mandatory, cautionary and informatory), traffic lights, hand signals and road markings, keeping left and overtaking on the right, giving way at junctions and to ambulances, parking, use of the horn and headlights, helmets, seat belts, drink driving and mobile phones, and what to do after an accident, along with documents such as the RC, insurance and the PUC certificate.",
  },
  {
    q: "Can I take the learner's licence test online from home?",
    a: "In many states, yes. Sarathi Parivahan offers an online, Aadhaar-based learner's licence test that you can take from home after watching the road safety tutorial, and the licence is then issued without a visit to the RTO. Some states still ask you to sit the test at the RTO, and the steps, fees and retest waiting period vary by state, so check your state's page on Sarathi before you book.",
  },
  {
    q: "Are these the official RTO exam questions?",
    a: "No. Every question is written by Tigertest from the Motor Vehicles Act 1988 as amended in 2019, the Central Motor Vehicles Rules, the Motor Vehicles (Driving) Regulations 2017 and the road signs in the Act's schedule, so it tests the same knowledge without copying any state's question bank. Road signs are described in words. Fines are not asked because states can raise them above the central minimums.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RTO Learner's Licence Practice Test",
      description,
      url: `${siteUrl}/rto-learners-licence-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "200 learner's licence practice questions",
        "4 mock tests of 50 questions with a 60% pass mark",
        "4 training sets, one per mock test",
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
  { name: "Licences, Learner Rules & Documents", weight: "12%" },
  { name: "Mandatory Road Signs", weight: "16%" },
  { name: "Cautionary & Informatory Signs", weight: "14%" },
  { name: "Traffic Lights, Hand Signals & Markings", weight: "12%" },
  { name: "Rules of the Road", weight: "18%" },
  { name: "Parking, Horn, Lights & Towing", weight: "10%" },
  { name: "Helmets, Seat Belts, Alcohol & Phones", weight: "10%" },
  { name: "Accidents, Insurance, PUC & RC", weight: "8%" },
];

// Examples only: each state transport department sets its own test, and formats change.
const stateFormats = [
  { where: "Every state", format: "60% to pass (central rules); number of questions varies by state", note: "A 75% draft (Oct 2026) is not in force" },
  { where: "Kerala (from Oct 2025)", format: "30 questions, 18 correct to pass", note: "30 seconds per question (press reports)" },
];

export default function RtoLearnersLicenceLandingPage() {
  return (
    <div data-theme="inrto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RTO Learner&apos;s Licence Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/india-learners-licence/dashboard"
            shortName="LL Test"
            subtitle="200 LL test questions on road signs, traffic rules, helmets, seat belts and documents, written from the Motor Vehicles Act and the Rules of the Road. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/inrto-mobile.png", desktop: "/landing/inrto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="inrto" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests, longer than the real LL test so every topic comes up, with the same 60 percent pass mark and an explanation of the right answer on every question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Format by state */}
      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          LL Test Format Varies by State
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
          The rules come from the centre, but each state transport department sets its own test. Few states publish their format, so check your state&apos;s page on Sarathi Parivahan before you book.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Where</th>
                <th className="px-4 py-3 font-semibold">Test</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {stateFormats.map((row) => (
                <tr key={row.where} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{row.where}</td>
                  <td className="px-4 py-3">{row.format}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the Motor Vehicles Act and the Rules of the Road
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every state draws its LL questions from the same central law: the Motor Vehicles Act 1988 as amended in 2019, the Central Motor Vehicles Rules, the Motor Vehicles (Driving) Regulations 2017 and the road signs in the Act&apos;s schedule. No state publishes how many questions each topic gets, so the mock tests here give the most weight to road signs and the rules of the road, where most real questions come from.
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
                src={getTigerAsset("inrto", 1)}
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
            How to Pass the Learner&apos;s Licence Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the three kinds of road sign</h3>
              <p>
                Circles give orders: red circles forbid (no entry, horn prohibited, no overtaking) and a blue circle commands (compulsory turn left, compulsory sound horn). Red triangles warn of a hazard ahead, such as a school, a narrow bridge or an unguarded level crossing. Blue rectangles inform, like a petrol pump, hospital or parking lot. The STOP sign is the only octagon and give way is the only upside-down triangle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the rules of the road by heart</h3>
              <p>
                Keep left and overtake on the right. Never overtake at a bend, near a zebra crossing or when the road ahead is not clear. At an uncontrolled junction, give way to traffic from your right; on entering a main road, give way to traffic on it. Always give way to ambulances and fire engines, and on a narrow hill road the vehicle going downhill gives way.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Remember the safety numbers</h3>
              <p>
                Helmets for everyone aged 4 and above on a two-wheeler. Seat belts for everyone in a car, with children under 14 in a belt or child seat. Blood alcohol over 30 mg per 100 ml is an offence. A learner&apos;s licence lasts 6 months, you need to hold it 30 days before the driving test, and an injury crash must be reported to the police within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 40 or more out of 50 on all four mock tests before you book your LL test. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Learner&apos;s Licence Test Frequently Asked Questions
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

      <ExamRelatedTests examId="inrto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your LL Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every LL test topic.</p>
          <ExamLandingCTA dashboardHref="/india-learners-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
