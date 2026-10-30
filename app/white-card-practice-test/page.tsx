import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "White Card Practice Test 2026 - Free CPCWHS1001 Questions";
const metaDescription =
  "Free White Card practice test for CPCWHS1001: 200 original questions on WHS laws, hazards, SWMS, asbestos, silica, signs, PPE and emergencies, with every answer explained.";
const description =
  "Free practice for the White Card course, CPCWHS1001 Prepare to work safely in the construction industry: 200 original questions on WHS laws, duties and rights, risk management and SWMS, working at heights and excavations, electrical, plant and traffic, asbestos, silica dust, chemicals and confined spaces, manual handling, noise and sun, safety signs and PPE, and incidents, emergencies and first aid. Four 50-question practice tests with an 80 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  alternates: { canonical: `${siteUrl}/white-card-practice-test` },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/white-card-practice-test`,
    siteName: "Tigertest",
    type: "website",
    images: [{ url: shareImageUrl("auwhite"), width: 1200, height: 630, alt: "White Card construction safety practice tests | Tigertest" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: metaDescription,
    images: [shareImageUrl("auwhite")],
  },
};

const faqs = [
  {
    q: "Is there a pass mark for the White Card?",
    a: "No set percentage. CPCWHS1001 is a competency-based unit, so your trainer decides whether you are competent from written and oral questions and practical tasks, such as fitting a hard hat, eye and hearing protection and a hi-vis vest, and reporting two construction hazards. The 80 percent line on these practice tests is a readiness target, not an official pass mark.",
  },
  {
    q: "How is the White Card course run and assessed?",
    a: "Only a registered training organisation (RTO) can deliver and assess CPCWHS1001, and courses usually run face to face in a single day. The unit requires the assessor to watch you directly, in person or over live video, and to use a mix of practical demonstration, oral and written reporting. Rules on online delivery vary by state, so check with your state regulator or the RTO before you book.",
  },
  {
    q: "What does the White Card course cover?",
    a: "The unit covers the roles, rights and duties of businesses and workers under WHS law, hazard and risk, the five steps of risk management, and construction hazards: asbestos, confined spaces, electricity, excavations and underground services, dust, falling objects, hazardous substances, heat and cold, manual handling, noise, plant, traffic, unplanned collapse, UV and working at heights. It also covers PPE, safety signs and tags, JSAs, SWMS and SDSs, incident reporting, emergencies, first aid and fire extinguishers.",
  },
  {
    q: "Does my White Card work in every state, and does it expire?",
    a: "A general construction induction card is recognised in every Australian state and territory, so you do not need a new one when you move. It has no printed expiry date, but in most states it is no longer valid if you have not done construction work for 2 years, and you must do the course again. You also need a site-specific induction on each new site.",
  },
  {
    q: "Is this the official course, and which state's laws does it follow?",
    a: "No. Tigertest is a free study tool and cannot issue a White Card; only an RTO can. Every question is original and follows the model Work Health and Safety Act and Regulations, which most states and territories use, including Western Australia since March 2022. Victoria has its own Occupational Health and Safety Act with similar duties. Where a rule changes from state to state, such as powerline no-go zones, the question says so.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free White Card Practice Test",
      description,
      url: `${siteUrl}/white-card-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 White Card (CPCWHS1001) practice questions",
        "4 practice tests of 50 questions across all eight topic areas",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("auwhite"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "WHS Laws, Duties & Rights", weight: "16%" },
  { name: "Risk Management & SWMS", weight: "12%" },
  { name: "Heights, Collapse & Excavations", weight: "12%" },
  { name: "Electrical, Plant & Traffic", weight: "12%" },
  { name: "Asbestos, Dust, Chemicals & Confined Spaces", weight: "14%" },
  { name: "Manual Handling, Noise, Sun & Fitness", weight: "10%" },
  { name: "Safety Signs & PPE", weight: "12%" },
  { name: "Incidents, Emergencies & First Aid", weight: "12%" },
];

export default function WhiteCardLandingPage() {
  return (
    <div data-theme="auwhite" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free White Card Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/white-card/dashboard"
            shortName="White Card"
            subtitle="200 questions for CPCWHS1001 on WHS laws, hazards and risk control, SWMS, asbestos and silica, working at heights, plant, signs, PPE and emergencies. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auwhite-mobile.png", desktop: "/landing/auwhite-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auwhite" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests across all eight topic areas, with an 80 percent readiness line and an explanation of the right answer on every question. The real course is assessed by your trainer, not by a set score.
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
                Built on the CPCWHS1001 Unit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The unit of competency on training.gov.au lists what every White Card candidate must know: duties and rights under WHS law, risk management, the construction hazards, PPE, safety signs and tags, safety documents and emergency procedures. It sets no question count or topic weights, so the practice tests here spread their questions across those areas, leaning on the laws and the health hazards that carry the most rules. Every question is original and follows the model WHS laws.
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
                src={getTigerAsset("auwhite", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For trainers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For RTO Trainers</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running White Card courses? Set Tigertest as pre-course reading or a revision round for your group at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          . Learners join from their phones with just a name, and you see who practised and which topics the group misses most before the assessment. It is free and does not replace your assessment tools.
        </p>
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
            How to Get Ready for Your White Card
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn who has which duty</h3>
              <p>
                The PCBU has the primary duty of care, officers must exercise due diligence, and workers must take reasonable care, follow reasonable instructions and cooperate with safety procedures. Know what an HSR, a health and safety committee, a first aid officer and a supervisor each do, and when you may stop unsafe work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the hierarchy and the five steps</h3>
              <p>
                Identify, assess, consult and report, control, review. Then the controls from best to worst: eliminate, substitute, isolate, engineer, administer, and PPE last. Most trainer questions about a hazard come down to naming it and saying which control would remove or reduce it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the numbers and the signs</h3>
              <p>
                High risk construction work starts at a fall of more than 2 metres or a trench deeper than 1.5 metres. Ladders go 1 out for every 4 up and 1 metre past the landing. Noise is capped at 85 dB(A) over 8 hours, sun protection starts at UV index 3, and asbestos was banned at the end of 2003. Read signs by colour and shape: red circle and bar forbids, blue circle instructs, yellow triangle warns, green shows exits and first aid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the hands-on parts</h3>
              <p>
                On the day you will fit a hard hat, safety glasses, hearing protection and a hi-vis vest, and explain two construction hazards and how to control them. Try it at home with whatever PPE you have, and aim for 45 or more out of 50 on all four practice tests here before your course.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          White Card Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="auwhite" />
        </div>
      </div>

      <ExamRelatedTests examId="auwhite" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your White Card?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every CPCWHS1001 topic.</p>
          <ExamLandingCTA dashboardHref="/white-card/dashboard" />
        </div>
      </div>
    </div>
  );
}
