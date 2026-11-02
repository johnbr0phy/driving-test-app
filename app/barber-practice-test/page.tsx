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
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free Barber Practice Test 2026 - State Board Theory Exam Prep";
const metaDescription =
  "Free barber state board practice tests: 200 original questions on infection control, anatomy, implements, haircutting, chemical services, shaving and facials. All explained.";
const description =
  "Free barber state board practice tests with 200 original questions on infection control and safety, anatomy and physiology, basic chemistry, barbering implements and equipment, client consultation and shampooing, haircutting and head shaving, styling and natural hair, chemical services, shaving and facial hair design, and facials and electrotherapy, weighted like the NIC National Barber Theory Examination. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "barber practice test, barber state board practice test, NIC barber theory exam practice, barber written exam questions, barber license test prep 2026, free barber practice test",
  alternates: {
    canonical: `${siteUrl}/barber-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/barber-practice-test`,
    images: [{ url: shareImageUrl("barber"), width: 1200, height: 630, alt: "Tigertest free barber practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("barber")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the barber state board written exam?",
    a: "In states that use the NIC National Barber Theory Examination, the content outline (bulletin effective June 1, 2025) has four domains: Scientific Concepts 35 percent (infection control and safety, anatomy and physiology, and the chemistry of barbering products), Implements and Equipment 10 percent, Hair Care Services 40 percent (consultation, shampooing, haircutting, styling, head shaving and chemical services) and Facial Hair and Skin Care Services 15 percent (shaving, facial hair design, facials, electrotherapy and light therapy). These practice tests follow that outline.",
  },
  {
    q: "How many questions are on the NIC barber theory exam and how long is it?",
    a: "The NIC National Barber Theory Examination has 60 multiple-choice questions, 50 of which are scored, and you have 90 minutes. Each practice test here is 50 questions in the NIC proportions, the same as the scored part of the real exam.",
  },
  {
    q: "What score do I need to pass the barber written exam?",
    a: "NIC reports a scaled score, and many state boards that use it pass at 75. Because the score is scaled, 75 is not exactly 75 percent correct, and the passing mark varies by state. The practice tests here use a 75 percent pass line; aim for 85 percent or better before test day.",
  },
  {
    q: "Does every state use the NIC barber exam?",
    a: "No. Many state boards use the NIC barber exams, but some write their own or use another testing company with a different outline, time limit and pass mark. NIC also offers a no-chemical barber theory exam for states with a limited barber license. Check your state board's candidate bulletin before you study, and use these tests for the shared theory every barber exam covers.",
  },
  {
    q: "Does this cover the practical exam or my state's laws?",
    a: "No. Most states also give a practical exam, and many add a separate laws and rules test. This prep is for the written theory exam only. Training hours, fees, license renewal and state rules vary by state, so they are not asserted here; your barber school and your state board cover them.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Barber Practice Tests",
      description,
      url: `${siteUrl}/barber-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original barber theory practice questions",
        "4 practice tests weighted like the NIC barber theory exam",
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
        classFaqJsonLd("barber"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Infection Control & Safety", weight: "16%" },
  { name: "Anatomy, Hair & Skin Disorders", weight: "14%" },
  { name: "Chemistry of Barbering Products", weight: "6%" },
  { name: "Implements & Equipment", weight: "10%" },
  { name: "Consultation, Shampoo & Scalp Care", weight: "10%" },
  { name: "Haircutting & Head Shaving", weight: "14%" },
  { name: "Hairstyling & Natural Hair", weight: "6%" },
  { name: "Haircolor, Perms & Relaxers", weight: "10%" },
  { name: "Shaving & Facial Hair Design", weight: "8%" },
  { name: "Facials & Electrotherapy", weight: "6%" },
];

export default function BarberLandingPage() {
  return (
    <div data-theme="barber" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Barber Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/barber/dashboard"
            shortName="Barber"
            subtitle="200 original state board theory questions on infection control, anatomy, clippers and razors, fades and tapers, color and relaxers, shaves and facials. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/barber-mobile.png", desktop: "/landing/barber-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="barber" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, then take Test 1 and aim for 75 percent. Questions you miss come back until you have mastered them.
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
                Four 50-question tests, the length of the scored part of the NIC barber theory exam and in its proportions, with a 75 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the NIC Barber Theory Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are original practice questions written to the NIC National Barber Theory Examination outline (bulletin effective June 1, 2025): 60 questions, 50 scored, in 90 minutes. NIC weights Scientific Concepts 35 percent, Implements and Equipment 10 percent, Hair Care Services 40 percent, and Facial Hair and Skin Care Services 15 percent. The percentages below are the share of each practice test. If you teach at a barber school, you can assign it to your class for free at{" "}
                <Link href="/teach" className="text-brand-dark font-medium underline underline-offset-2">
                  tigertest.io/teach
                </Link>
                .
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
                src={getTigerAsset("barber", 1)}
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
            How to Pass the Barber State Board Written Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own infection control first</h3>
              <p>
                Scientific concepts are over a third of the exam, and infection control is the easiest part to score on. Know the ladder: cleaning removes debris, disinfecting kills most pathogens on nonporous tools, sterilizing kills everything including spores. Clean first, then immerse in an EPA-registered disinfectant for the label&apos;s full contact time. Know the blood exposure steps in order, which conditions mean you refuse service (lice, ringworm, barber&apos;s itch) and where the SDS lives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn your tools by their parts</h3>
              <p>
                Expect questions on shear parts and grips, razor grinds, honing versus stropping, clipper blade sizes and guards, and how each tool is cleaned and stored. Honing leads with the edge; stropping leads with the back. A changeable-blade razor gets a new blade for every client.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep shaving and chemicals straight</h3>
              <p>
                The shave is barbering&apos;s own territory: steam towel to soften, lather to lubricate, skin held taut, first time over with the grain, cool towel to finish, and no hot towel on chapped or inflamed skin. For chemicals, know that perms and hydroxide relaxers both break disulfide bonds but never mix, that a patch test comes 24 to 48 hours before an aniline derivative color, and that complementary colors cancel each other.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest to 90 percent</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each practice test, drill the questions you missed, retrain that test&apos;s set, and retake until you clear 90 percent. Each practice test is the length of the scored part of the real exam, so a full test is a good timing check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Barber Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="barber" />
        </div>
      </div>

      <ExamRelatedTests examId="barber" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Barber Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all ten topics.</p>
          <ExamLandingCTA dashboardHref="/barber/dashboard" />
        </div>
      </div>
    </div>
  );
}
