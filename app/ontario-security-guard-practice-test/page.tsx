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

const title = "Ontario Security Guard Practice Test 2026 - Free Licence Test";
const metaDescription =
  "Free Ontario security guard practice test: 200 questions on the PSISA, arrest and trespass powers, use of force, reports and emergencies, all explained.";
const description =
  "Free Ontario security guard licence practice tests with 200 original questions on the ministry's basic training syllabus: the PSISA and Code of Conduct, patrol and access control, report writing, health and safety and emergency response, the Criminal Code and Trespass to Property Act, communication and sensitivity, use of force and emergency first aid. Explanations on every question.";

// One list feeds both the visible FAQ and the FAQPage JSON-LD, so the two never drift apart.
const faqs = [
  {
    q: "What score do I need to pass the Ontario security guard test?",
    a: "The ministry's cut score is 62 percent. Results are available within five business days, and if you do not pass you can book the test again, paying the fee each time. The practice tests here use the same 62 percent pass line, but aim well above it before you book.",
  },
  {
    q: "How many questions are on the test and how long do I get?",
    a: "The basic test for security guards has 60 multiple-choice questions, and you have 75 minutes to answer them within a 2-hour appointment. You book it with the training completion number your training provider gives you, and you can take it online or at select DriveTest centres across Ontario.",
  },
  {
    q: "How do I get a security guard licence in Ontario?",
    a: "You must be 18 or older, legally entitled to work in Canada and have a clean criminal record. Complete at least 40 hours of basic training with an approved provider, including emergency level first aid and CPR (33.5 hours if you already hold a valid certificate), pass the ministry test, then apply online with a Criminal Record and Judicial Matters Check issued within six months. The licence fee is 80 dollars, and the licence is digital and runs until two birthdays after it is issued.",
  },
  {
    q: "What does the test cover?",
    a: "Questions come from the ministry's Training Syllabus for Security Guards: the security industry, the Private Security and Investigative Services Act and Code of Conduct, basic security procedures, report writing, health and safety, emergency response, the Canadian legal system, legal authorities such as citizen's arrest and the Trespass to Property Act, communication, sensitivity, use of force and first aid. Legal authorities is the largest section of the syllabus.",
  },
  {
    q: "Are these the real ministry test questions?",
    a: "No. The ministry does not publish its question bank. Every question here is original, written from the official training syllabus and study guide and the laws they cite, and weighted by the syllabus's suggested hours. It is a study tool, not a licence or a substitute for the mandatory training course.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Ontario security guard practice test, Ontario security guard test, security guard licence test Ontario, PSISA practice test, Ontario security guard exam 2026, security guard test questions Ontario, Serco security guard test, 40 hour security guard course",
  alternates: {
    canonical: `${siteUrl}/ontario-security-guard-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ontario-security-guard-practice-test`,
    images: [{ url: shareImageUrl("caguard"), width: 1200, height: 630, alt: "Tigertest free Ontario security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caguard")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ontario Security Guard Practice Tests",
      description,
      url: `${siteUrl}/ontario-security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Ontario security guard practice questions",
        "4 practice tests weighted by the ministry training syllabus",
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
        classFaqJsonLd("caguard"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Canadian Law & Legal Authorities", weight: "26%" },
  { name: "The Industry, PSISA & Code of Conduct", weight: "14%" },
  { name: "Health, Safety & Emergency Response", weight: "14%" },
  { name: "Communication & Sensitivity", weight: "12%" },
  { name: "Basic Security Procedures", weight: "10%" },
  { name: "Report Writing", weight: "8%" },
  { name: "Use of Force", weight: "8%" },
  { name: "Emergency First Aid", weight: "8%" },
];

export default function OntarioSecurityGuardLandingPage() {
  return (
    <div data-theme="caguard" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ontario Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ontario-security-guard/dashboard"
            shortName="Security Guard"
            subtitle="200 questions on the PSISA, citizen's arrest and trespass, use of force, reports, emergencies and first aid, written from the ministry's training syllabus. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/caguard-mobile.png", desktop: "/landing/caguard-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caguard" />

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
                Four 50-question tests covering all twelve syllabus sections, with the ministry&apos;s 62 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Ministry Training Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The ministry&apos;s Training Syllabus for Security Guards suggests hours for each of its twelve sections, and the practice tests here are weighted the same way. Legal authorities alone is the biggest block of the course, so the Criminal Code, the Trespass to Property Act and the Canadian legal system make up a quarter of every test. Training providers running the 40-hour course can assign Tigertest as a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which sections their students miss most.
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
                src={getTigerAsset("caguard", 1)}
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
            How to Pass the Ontario Security Guard Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master your arrest and trespass powers</h3>
              <p>
                Legal authorities is the largest syllabus section. Know the difference between section 494(1) of the Criminal Code (anyone, an indictable offence, found committing) and 494(2) (the owner or their agent, any criminal offence on or in relation to the property), that you must hand an arrested person to police forthwith, and how the Trespass to Property Act works: notice by word, writing or signs, red and yellow markings, and arrest only while the person is on the premises unlawfully.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the PSISA rules word for word</h3>
              <p>
                Expect direct questions on the Act: 18 to be licensed, carry your licence and show it on request, SECURITY or SECURITY GUARD on the chest, no metal badges or police-style caps, never call yourself an officer or detective, report a listed conviction within 5 days, and penalties of up to 25,000 dollars and a year in jail. Know which guards may work in plain clothes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think safety first, then report</h3>
              <p>
                In emergency and use of force questions the safe, reasonable answer wins: check for hazards, call 911, contain, activate and evacuate, use only as much force as is necessary and stop when resistance stops. In report writing, facts beat opinions, notes are in ink and in time order, and errors get one line and your initials.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by syllabus section. Master each training set, then take its practice test and aim well above 62 percent. After each test, drill the questions you missed and retrain that set, then take all four tests back to back before you book the ministry test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Ontario Security Guard Test FAQ
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="caguard" />
        </div>
      </div>

      <ExamRelatedTests examId="caguard" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Security Guard Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on the Ontario training syllabus.</p>
          <ExamLandingCTA dashboardHref="/ontario-security-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
