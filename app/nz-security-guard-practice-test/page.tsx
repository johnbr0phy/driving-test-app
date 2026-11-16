import "@/lib/banks/nzsecurity";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "NZ Security Guard Practice Test 2026 - Free COA Training Questions (PSPLA)";
const metaDescription =
  "Free New Zealand security guard practice for the PSPLA certificate of approval training: 200 original questions on skill standards 40146, 40145 and 40147, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the minimum training New Zealand crowd controllers, property guards and personal guards complete before a PSPLA certificate of approval, NZQA skill standards 40146, 40145 and 40147: 200 original questions on COA rules and the ID badge, lawful force and citizen's arrest, trespass, searching and proof of age, health and safety at work, incidents and emergencies, reporting and privacy, and conflict management. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz security guard practice test, pspla certificate of approval, coa security nz, security guard test nz, crowd controller nz, 40146, 40145, 40147, unit standard 27364, nz certificate in security level 3, security guard licence nz 2026",
  alternates: {
    canonical: `${siteUrl}/nz-security-guard-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-security-guard-practice-test`,
    images: [{ url: shareImageUrl("nzsecurity"), width: 1200, height: 630, alt: "Tigertest free NZ security guard practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzsecurity")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What training do I need to work as a security guard in New Zealand?",
    a: "Crowd controllers, property guards and personal guards need a certificate of approval (COA) from the Private Security Personnel Licensing Authority (PSPLA). Before it is granted you complete the minimum training: NZQA skill standards 40146, 40145 and 40147, or the unit standards 27364, 27360 and 27361 they replaced. The New Zealand Certificate in Security (Level 3 or 4) also counts. A temporary COA lets you work for 3 months while you train.",
  },
  {
    q: "How is the training assessed, and what score do I need?",
    a: "Each standard is assessed by the accredited training provider and graded Achieved. 40146 and 40145 test what you know, often with scenarios, and 40147 is a practical role play of four conflict situations. No national question count or pass mark is published, so the mock tests here use Tigertest's own 80% readiness line.",
  },
  {
    q: "What do these practice questions cover?",
    a: "Each mock test covers COA rules and wearing your ID badge, lawful force, self-defence and citizen's arrest, trespass warnings, searching and proof of age, health and safety at work, first response to incidents and emergencies, incident reports, radio and privacy, and the theory of conflict management: the conflict cycle, TENR, OODA and AWOCA, tactical withdrawal and communication.",
  },
  {
    q: "Are these the real assessment questions?",
    a: "No. Every question is original, written by Tigertest from the NZQA skill standards, PSPLA guidance and decisions, New Zealand Police, WorkSafe and Privacy Commissioner guidance, and the NZ Security Association's good practice guidelines, checked in November 2026. It is free practice, not affiliated with the PSPLA, NZQA or any training provider, and it does not replace your course.",
  },
  {
    q: "Has the law on citizen's arrest changed?",
    a: "Yes. The Crimes Amendment Act 2026 changes the citizen's arrest and defence of property rules: it makes clear that reasonable force may be used when making an arrest or defending property, and anyone who makes an arrest must contact Police and follow their directions. Security staff still have no Police powers. Check the current guidance on the New Zealand Police website and with your training provider before you rely on a detail at work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Security Guard Practice Test",
      description,
      url: `${siteUrl}/nz-security-guard-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzsecurity", "NZD"),
      featureList: [
        "200 NZ security guard practice questions",
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
  { name: "PSPLA licensing and the Act", weight: "6 per test" },
  { name: "Use of force, arrest and detention", weight: "7 per test" },
  { name: "Trespass, entry, searching and ID", weight: "7 per test" },
  { name: "Health and safety at work", weight: "6 per test" },
  { name: "Incidents and emergencies", weight: "6 per test" },
  { name: "Reporting, radio and privacy", weight: "6 per test" },
  { name: "Conflict theory and tactical options", weight: "7 per test" },
  { name: "Communication and customer service", weight: "5 per test" },
];

export default function NzSecurityLandingPage() {
  return (
    <div data-theme="nzsecurity" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Security Guard Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-security-guard/dashboard"
            shortName="NZ Security Guard"
            subtitle="200 original questions for the PSPLA certificate of approval training, skill standards 40146, 40145 and 40147: licensing, lawful force and arrest, trespass and searching, health and safety, emergencies, reporting and conflict management. Four 50-question mock tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/nzsecurity-mobile.png", desktop: "/landing/nzsecurity-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzsecurity" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: licensing, the law and use of force, trespass, entry and reporting, health, safety and emergencies, and conflict management. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions across every topic, with an 80% readiness line set by Tigertest. No question appears in more than one test, and every answer is explained with the rule behind it.
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
                Built on the Three Guard Training Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                No national question count or topic weights are published, because each provider assesses its own course. The split below is Tigertest&apos;s, following the outcomes of skill standards 40146, 40145 and 40147.
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
                src={getTigerAsset("nzsecurity", 1)}
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
            How to Study for Your Security Guard Assessments
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your powers, and their limits</h3>
              <p>
                A guard has the same legal powers as any member of the public. Learn when force is lawful (reasonable, necessary and proportionate), what self-defence covers, and what Police ask of anyone who makes a citizen&apos;s arrest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn trespass and searching step by step</h3>
              <p>
                A warning to leave, then a warning to stay off for two years. Searches only with consent, and refusing entry when consent is refused. Know which documents prove age at licensed premises.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put your own safety first</h3>
              <p>
                Detect, deter, observe and report. Know your site&apos;s escalation plan, your safe haven and duress alarm, when to call 111 or 105, and how to keep a crime scene untouched until Police arrive.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the conflict models</h3>
              <p>
                Learn the conflict cycle, TENR, OODA and AWOCA until you can say what each letter means, then practise reports with when, where, what and who. Finish each training set, then aim for 80% on every mock test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ Security Guard Frequently Asked Questions
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

      <ExamSampleQuestions examId="nzsecurity" />

      <ExamRelatedTests examId="nzsecurity" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Security Guard Assessments?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the guard training standards.</p>
          <ExamLandingCTA dashboardHref="/nz-security-guard/dashboard" />
        </div>
      </div>
    </div>
  );
}
