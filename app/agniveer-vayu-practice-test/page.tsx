import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free Agniveer Vayu Mock Test 2026 - Science (English, Physics, Maths)";
const metaDescription =
  "Free Agniveer Vayu Science mock tests: 204 original questions on English, Physics and Mathematics to the 10+2 CBSE syllabus, with two full 70-question tests in 60 minutes and an explanation on every answer.";
const description =
  "Free Agniveervayu practice for the Indian Air Force Science subjects online test: 204 original questions on English, Physics and Mathematics written to the 10+2 CBSE syllabus. Two full mock tests of 70 questions in 60 minutes, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the Agniveer Vayu Science exam pattern?",
    a: "The Science subjects online test in Phase I lasts 60 minutes and covers English, Physics and Mathematics to the 10+2 CBSE syllabus. The IAF notification gives the time and subjects but not the number of questions; guides report 70 questions: 20 English, 25 Physics and 25 Mathematics. Questions are objective, and every paper except English is bilingual, in English and Hindi.",
  },
  {
    q: "Is there negative marking in Agniveer Vayu?",
    a: "Yes. Each right answer earns 1 mark, each wrong answer loses 0.25 marks, and a question left blank scores zero. A blind guess among four options gains only about a sixteenth of a mark on average (a quarter of the time +1, otherwise -0.25), while ruling out even one option makes a guess clearly worth it. Tigertest mock tests score percent correct and do not deduct marks, so note which answers were guesses.",
  },
  {
    q: "What is the cut-off for Agniveer Vayu?",
    a: "There is no fixed pass mark. Marks are normalised across exam sessions, candidates must qualify in each paper they take, and candidates are shortlisted for Phase II state by state, so the cut-off can differ from one state to another. Cut-offs change with every intake, so aim well above the minimum and check your result on the CASB portal.",
  },
  {
    q: "What happens after the online test?",
    a: "Shortlisted candidates go to Phase II at an Airmen Selection Centre: a Physical Fitness Test (a 1.6 km run within 7 minutes for men and 8 minutes for women, then push-ups, sit-ups and squats for men and sit-ups and squats for women) and Adaptability Tests I and II. Phase III is the medical examination. Tigertest covers only the Phase I Science subjects test; the Other than Science subjects test (English and Reasoning and General Awareness) is not modelled.",
  },
  {
    q: "Are these the same questions as the real Agniveer Vayu exam?",
    a: "No. These are original practice questions written to the 10+2 CBSE English, Physics and Mathematics syllabus that the notification names, not questions copied from past papers or the real exam. Tigertest is not affiliated with the Indian Air Force or CASB. Both mock tests and all eight drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Agniveer Vayu mock test, Agniveer Vayu mock test free, Agniveervayu practice test, Agniveer Vayu science, Air Force Agniveer mock test, Agniveer Vayu 2026, Agniveer Vayu physics questions, Agniveer Vayu maths questions, Agniveer Vayu English, IAF Group X mock test, Agniveer Vayu online test",
  alternates: {
    canonical: `${siteUrl}/agniveer-vayu-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/agniveer-vayu-practice-test`,
    images: [{ url: shareImageUrl("agniveervayu"), width: 1200, height: 630, alt: "Tigertest free Agniveer Vayu mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("agniveervayu")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Agniveer Vayu Mock Test",
      description,
      url: `${siteUrl}/agniveer-vayu-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "204 original Agniveer Vayu Science practice questions with explanations",
        "2 full mock tests of 70 questions in 60 minutes: English, Physics and Mathematics",
        "8 topic drills across English, Physics and Mathematics",
        "Reading comprehension passages",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("agniveervayu"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "English: grammar, vocabulary and a reading passage", weight: "20 Qs" },
  { name: "Physics: mechanics, heat, waves, optics, electricity, modern physics", weight: "25 Qs" },
  { name: "Mathematics: algebra, trigonometry, coordinates, calculus, probability", weight: "25 Qs" },
];

export default function AgniveerVayuLandingPage() {
  return (
    <div data-theme="agniveervayu" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Agniveer Vayu Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/agniveer-vayu/dashboard"
            shortName="Agniveer Vayu"
            subtitle="204 original Science questions on English, Physics and Maths. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/agniveervayu-mobile.png", desktop: "/landing/agniveervayu-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="agniveervayu" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills: English grammar, vocabulary and comprehension, three in Physics (mechanics; heat, waves and optics; electricity and modern physics) and three in Mathematics (algebra; trigonometry, coordinates and vectors; calculus and probability). Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two mock tests of 70 questions in 60 minutes, English, then Physics, then Mathematics, each with its share of the time. Move freely and flag questions inside a subject. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Science Subjects Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The IAF notification sets the Science subjects test at 60 minutes on English, Physics and Mathematics to the 10+2 CBSE syllabus, with 1 mark for a right answer and 0.25 off for a wrong one. Guides report 70 questions, split as below, and every mock test follows that split. Tigertest scores percent correct; to see an exam-style score, take your correct answers and subtract a quarter of your wrong ones. The Other than Science subjects test, the combined option and the Phase II fitness and adaptability tests are not part of this practice.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("agniveervayu", 1)}
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
            How to Prepare for Agniveer Vayu
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Mind the clock</h3>
              <p>
                Seventy questions in 60 minutes is under a minute each. Take English first while you are fresh, answer the one-step Physics and Maths questions quickly, and come back to the long calculations at the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Guess with care</h3>
              <p>
                A wrong answer costs a quarter of a mark. If you can rule out one or two options, a guess is clearly worth taking; a blind guess gains almost nothing on average and only adds risk. Accuracy matters more than the number of questions attempted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your formulas cold</h3>
              <p>
                Equations of motion, work and power, lens and mirror formulas, Ohm&apos;s law and resistor combinations, trigonometric values, the distance and section formulas, standard derivatives and integrals, and nCr and nPr come up again and again. Tigertest&apos;s explanations show the formula and the common slip, so drill a topic until it is fast as well as right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read English every day</h3>
              <p>
                The English paper is in English only, with grammar, vocabulary and a reading passage. Read a newspaper editorial daily, note new words, and practise spotting errors in subject-verb agreement, tenses and prepositions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Agniveer Vayu Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="agniveervayu" />
        </div>
      </div>

      <ExamRelatedTests examId="agniveervayu" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Agniveer Vayu Online Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 204 questions across English, Physics and Mathematics.</p>
          <ExamLandingCTA dashboardHref="/agniveer-vayu/dashboard" />
        </div>
      </div>
    </div>
  );
}
