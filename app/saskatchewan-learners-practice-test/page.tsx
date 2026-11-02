import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/cask";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "SGI Learner's Practice Test 2026 - Saskatchewan Class 7";
const metaDescription =
  "Free Saskatchewan Class 7 learner's practice test: 200 original questions from the SGI Driver's Handbook on signs, rules of the road and GDL rules, all explained.";
const description =
  "Free Saskatchewan Class 7 learner's licence practice tests with 200 original questions from the 2026-27 Saskatchewan Driver's Handbook: traffic signs, lights and pavement markings, right-of-way and turns, sharing the road, the Graduated Driver Licensing program, safe driving, and winter driving and emergencies. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SGI practice test, Saskatchewan learner's test, Class 7 practice test, SGI written test, Saskatchewan driver's licence test, SGI sign test, Saskatchewan knowledge test 2026, free SGI practice questions",
  alternates: {
    canonical: `${siteUrl}/saskatchewan-learners-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/saskatchewan-learners-practice-test`,
    images: [{ url: shareImageUrl("cask"), width: 1200, height: 630, alt: "Tigertest free Saskatchewan Class 7 learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cask")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Saskatchewan Class 7 Learner's Practice Tests",
      description,
      url: `${siteUrl}/saskatchewan-learners-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 original Saskatchewan Class 7 practice questions",
        "4 practice tests on signs and rules of the road",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What score do I need to pass the SGI learner's test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SGI's Driver's Handbook does not publish a pass mark or a question count. Prep sites usually report that you need about 80 percent on each part, so the practice tests here use 80 percent as a target. If you fail one part, you rewrite only that part, and you may write once per day.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the Saskatchewan Class 7 knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Class 7 knowledge tests are Basic and Sign: driving situations and the rules of the road, and sign identification. Everything comes from the Saskatchewan Driver's Handbook, including the Graduated Driver Licensing rules, right-of-way, school buses and emergency vehicles, winter driving and impaired driving. Passing results are valid for one year.",
          },
        },
        {
          "@type": "Question",
          name: "What do I need to write the learner's test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be 16, or 15 if you are in a high school driver education program. Bring original ID showing your full name and date of birth, such as a birth certificate, passport or immigration documents, and if you are under 18 a completed Signature/Guarantor form from a parent or guardian. You also take a vision test. Book through a motor licence issuer or MySGI; in Regina and Saskatoon written tests are also offered without an appointment.",
          },
        },
        {
          "@type": "Question",
          name: "What can I do with a Class 7 learner's licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You may drive a Class 5 vehicle only with a supervising driver in the front passenger seat who holds a Class 5 or higher licence, has held a valid licence for 365 days in the past three years and is not a novice. You must have zero alcohol and drugs, may not use any cellphone, even hands-free, may carry no more passengers than there are seatbelts and may not drive a right-hand drive vehicle. After nine months and driver education you can take the Class 5 road test.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real SGI test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. SGI does not publish its question bank. Every question here is an original practice question written from the 2026-27 Saskatchewan Driver's Handbook. Signs are described in words, so study the pictures in the handbook too, and try SGI's own practice quiz. It is a study tool, not a licence.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Traffic Signs", weight: "28%" },
  { name: "Lights, Markings & Railway Crossings", weight: "14%" },
  { name: "GDL, Licensing & the Law", weight: "14%" },
  { name: "Right-of-Way & Turns", weight: "14%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Safe Driving Skills", weight: "10%" },
  { name: "Winter, Emergencies & Impairment", weight: "8%" },
];

export default function SaskatchewanLearnersLandingPage() {
  return (
    <div data-theme="cask" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SGI Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/saskatchewan-learners/dashboard"
            shortName="SK Class 7"
            subtitle="200 original questions on Saskatchewan road signs, traffic lights, right-of-way, the GDL program, winter driving and impaired driving, all from the SGI Driver's Handbook. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cask-mobile.png", desktop: "/landing/cask-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cask" />

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
                Four 50-question tests mixing signs and rules of the road, with an 80 percent target and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Saskatchewan Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real Class 7 test has two parts, Basic (the rules of the road) and Sign. Here signs, lights, markings and railway crossings make up 42 percent of every practice test, and the rules of the road the rest. Every rule is Saskatchewan&apos;s own: the nine-month learner stage, the 60 km/h rule for stopped plows and tow trucks, the 80 km/h unposted limit, crossroad delineators and grid road driving.
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
                src={getTigerAsset("cask", 1)}
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
            How to Pass the SGI Learner&apos;s Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour first</h3>
              <p>
                The Sign part is its own test, so start with the families: the red octagon stop sign, the red-bordered yield triangle, white regulatory rectangles, yellow warning diamonds, orange construction diamonds, the five-sided school zone sign and the crossbuck. Then learn what each colour means: red for stop or prohibition, green for allowed movement, blue for services. Look at the pictures in the handbook as you go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The Basic part loves numbers: 80 km/h where no limit is posted, 60 km/h past stopped emergency vehicles, tow trucks and plows, 5 m behind a stopped school bus, 3 m or 10 m from an intersection with no stop line, 30 m and 150 m for signalling, 200 m for dimming high beams and a three-second following distance. Write them in one table and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your own GDL rules cold</h3>
              <p>
                Expect questions on the Graduated Driver Licensing program: nine months as a learner, six as Novice 1 and 12 incident-free months as Novice 2, who can supervise you, zero alcohol and drugs, no cellphones at all and the novice passenger limits. These are the rules you will drive under for the next two years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, then take its practice test and aim well above 80 percent. After each test, drill the questions you missed and retrain that test&apos;s set, then take all four tests back to back before you go to write.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SGI Learner&apos;s Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the SGI learner&apos;s test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              SGI&apos;s Driver&apos;s Handbook does not publish a pass mark or a question count. Prep sites usually report that you need about 80 percent on each part, so the practice tests here use 80 percent as a target. If you fail one part, you rewrite only that part, and you may write once per day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Saskatchewan Class 7 knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Class 7 knowledge tests are Basic and Sign: driving situations and the rules of the road, and sign identification. Everything comes from the Saskatchewan Driver&apos;s Handbook, including the Graduated Driver Licensing rules, right-of-way, school buses and emergency vehicles, winter driving and impaired driving. Passing results are valid for one year.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What do I need to write the learner&apos;s test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be 16, or 15 if you are in a high school driver education program. Bring original ID showing your full name and date of birth, such as a birth certificate, passport or immigration documents, and if you are under 18 a completed Signature/Guarantor form from a parent or guardian. You also take a vision test. Book through a motor licence issuer or MySGI; in Regina and Saskatoon written tests are also offered without an appointment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What can I do with a Class 7 learner&apos;s licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You may drive a Class 5 vehicle only with a supervising driver in the front passenger seat who holds a Class 5 or higher licence, has held a valid licence for 365 days in the past three years and is not a novice. You must have zero alcohol and drugs, may not use any cellphone, even hands-free, may carry no more passengers than there are seatbelts and may not drive a right-hand drive vehicle. After nine months and driver education you can take the Class 5 road test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real SGI test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. SGI does not publish its question bank. Every question here is an original practice question written from the 2026-27 Saskatchewan Driver&apos;s Handbook. Signs are described in words, so study the pictures in the handbook too, and try SGI&apos;s own practice quiz. It is a study tool, not a licence.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="cask" />

      <ExamRelatedTests examId="cask" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Learner&apos;s?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Saskatchewan signs and rules of the road.</p>
          <ExamLandingCTA dashboardHref="/saskatchewan-learners/dashboard" />
        </div>
      </div>
    </div>
  );
}
