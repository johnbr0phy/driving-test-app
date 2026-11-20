import "@/lib/banks/iehcap";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free HCAP Practice Test 2026 - Irish Deer Hunter Competence Questions";
const metaDescription =
  "Free practice for the HCAP written test, the Deer Alliance deer hunter competence assessment accepted by NPWS: 200 original questions on Irish deer species, deer management, rifles, firearms safety, the Wildlife Acts and carcase handling. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for HCAP, the Hunter Competence Assessment Programme run by the Deer Alliance for people who want to hunt wild deer in Ireland: 200 original questions across the twelve chapters of the HCAP Stalker Manual, written from the Wildlife Acts, the Firearms Acts, the Garda firearms guidance and FSAI wild game guidance. Four 50-question mock tests at the written stage's 40 out of 50, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hcap, hcap test, hcap practice test, hcap questions, hunter competence assessment programme, deer stalking ireland, deer hunting licence ireland, deer alliance hcap, hcap mcq, deer stalker training ireland",
  alternates: {
    canonical: `${siteUrl}/hcap-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hcap-practice-test`,
    images: [{ url: shareImageUrl("iehcap"), width: 1200, height: 630, alt: "Tigertest free HCAP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iehcap")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is HCAP?",
    a: "HCAP, the Hunter Competence Assessment Programme, is Ireland's deer hunter certification. It is run by the Deer Alliance HCAP Assessment Committee, which was formed in 2003 when Coillte asked for independent certification of people hunting wild deer on its forests, and the programme launched in April 2005. The Deer Alliance's Stalker Training Manual is its core text. NPWS lists HCAP as one of the approved courses for first-time Deer Hunting Licence applicants.",
  },
  {
    q: "How is HCAP assessed?",
    a: "The first stage is a written multiple-choice test of 50 questions, and you need 40 correct, which is 80%. The Deer Alliance draws the questions from a bank of about 300 and does not publish it. Candidates who pass go on to a Range Test, which asks for a three-shot group in a four-inch bull at 100 metres from prone and then shots on a deer target, and an oral safety examination. The mock tests here cover the written stage only. Check the Deer Alliance website for dates and the current fee.",
  },
  {
    q: "Do I need HCAP to get a deer hunting licence?",
    a: "NPWS says first-time applicants for a Deer Hunting Licence must show a certificate from one of three approved deer hunting training courses: Deer Alliance HCAP, Country Sports Ireland Deer Stalking Training or NARGC Deer Stalking Training. The licence is a Section 29 licence applied for online through the Heritage Licensing Portal and it runs from 1 August to 31 July. You also need a firearm certificate for your rifle from the Gardai and permission to hunt on the land. Check NPWS for current requirements.",
  },
  {
    q: "What does the HCAP written test cover?",
    a: "The Stalker Manual has twelve chapters: principles of deer management, basic deer biology, red, sika and fallow deer, stalking aids and techniques, rifles, ballistics and zeroing, firearms safety, deer hunting and the law, carcase handling, forestry and deer, and the impact of deer on nature conservation habitats. The Deer Alliance publishes no topic weights, so each 50-question mock test here spreads the chapters across eight topics, and the manual itself is sold in print by the Deer Alliance.",
  },
  {
    q: "Are these the real HCAP questions?",
    a: "No. Every question is original, written by Tigertest from the Deer Alliance's published chapters and certification procedure, the Wildlife Act 1976 and its regulations, the Garda guidance on the Firearms Acts and the FSAI wild game guidance. The Deer Alliance does not publish its question bank and none of it was used. This is free revision, not affiliated with the Deer Alliance, NPWS or Coillte, and it does not replace the manual, a training course or the range test. Rules and seasons change, so always check the current Open Seasons Order and NPWS licence terms.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HCAP Practice Test",
      description,
      url: `${siteUrl}/hcap-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("iehcap", "EUR"),
      featureList: [
        "200 HCAP practice questions",
        "4 mock tests of 50 questions",
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
        classFaqJsonLd("iehcap"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Irish deer species and identification", weight: "7 per test" },
  { name: "Deer biology, antlers and the rut", weight: "7 per test" },
  { name: "Principles of deer management", weight: "8 per test" },
  { name: "Rifles, ballistics and shot placement", weight: "5 per test" },
  { name: "Firearms safety and storage", weight: "7 per test" },
  { name: "Deer hunting and the law", weight: "8 per test" },
  { name: "Carcase handling and food safety", weight: "4 per test" },
  { name: "Forestry, habitats and conservation", weight: "4 per test" },
];

export default function HcapLandingPage() {
  return (
    <div data-theme="iehcap" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HCAP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hcap/dashboard"
            shortName="HCAP"
            subtitle="200 questions for the HCAP written test. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/iehcap-mobile.png", desktop: "/landing/iehcap-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iehcap" />

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
                Four training sets: deer management and biology, Irish deer species and habitat, rifles, firearms and field safety, and deer hunting law and carcase handling. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions that mix all eight topics, with the written stage&apos;s 80% target, 40 out of 50. No question appears in more than one test, and every answer comes with a short explanation from Irish law and the Deer Alliance chapters.
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
                Built on the HCAP Stalker Manual
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Deer Alliance publishes no topic weights, so each 50-question test spreads the manual&apos;s twelve chapters across eight topics as below. The law questions follow the Wildlife Act 1976, the firearms regulations and the Garda guidance on the Firearms Acts.
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
                src={getTigerAsset("iehcap", 3)}
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
            How to Pass HCAP
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Tell the three species apart</h3>
              <p>
                Red deer are the largest, with a cream rump patch that runs up the rump. Sika are the smallest, with rounded ears, a short tail and a white rump disc that flares and is ringed with black. Fallow have palmate antlers, a long tail and long pointed ears. Know each species&apos; rut sound and the names of the sexes and young.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the cull logic</h3>
              <p>
                The number of adult females drives growth, so culling males barely slows a herd. Where numbers are a problem, take females of any age first, then juveniles, and shoot the calf before an accompanying hind. Counts are estimates, so repeat them the same way each year and keep records.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the legal rules once</h3>
              <p>
                You need a firearm certificate and a Section 29 deer hunting licence, permission for the land, a rifle that meets the 1977 Regulations, and you may not shoot from a vehicle, at night or with a lamp except under licence. Out-of-season control needs a Section 42 permission.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the mock tests. Aim for 40 out of 50 on every mock test, and keep reading the Stalker Manual and practising at the range, because the written test is only the first stage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HCAP Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="iehcap" />
        </div>
      </div>

      <ExamSampleQuestions examId="iehcap" />

      <ExamRelatedTests examId="iehcap" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for HCAP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all twelve HCAP manual chapters.</p>
          <ExamLandingCTA dashboardHref="/hcap/dashboard" />
        </div>
      </div>
    </div>
  );
}
