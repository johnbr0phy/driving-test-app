import "@/lib/banks/nzboat";
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

const title = "NZ Day Skipper Practice Test 2026 - Free Boating Rules Questions";
const metaDescription =
  "Free-to-start practice for the Coastguard Boating Education Day Skipper course assessment: 200 original questions on New Zealand's boating rules, give-way rules, lights, IALA A buoys, tides, weather and emergencies, in four 50-question tests.";
const description =
  "Practice for the online assessment at the end of the Day Skipper course run by Coastguard Boating Education: 200 original questions on the parts of a boat and its equipment, boat handling, anchoring and knots, charts and compass, tides and marine weather, IALA A navigational marks, the Part 22 collision rules, lights and sound signals, the Part 91 navigation safety rules and local bylaws, and emergencies and VHF communications. Four tests of 50 questions and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "day skipper practice test nz, day skipper nz, coastguard day skipper, day skipper course questions, nz boating rules test, boating test nz, skipper course nz, 5 knot rule nz, nz day skipper practice test 2026, boatmaster nz",
  alternates: {
    canonical: `${siteUrl}/nz-day-skipper-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-day-skipper-practice-test`,
    images: [{ url: shareImageUrl("nzboat"), width: 1200, height: 630, alt: "Tigertest NZ Day Skipper practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzboat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Day Skipper course?",
    a: "Day Skipper is Coastguard Boating Education's introductory course for recreational boaties and crew, especially people new to being skipper of their own boat. It covers the general knowledge needed to run a pleasure craft in familiar waters in daylight: the parts of a boat and its equipment, basic boat handling, charts, basic tide and weather terms, navigational marks, Maritime Rules and Regulations, emergencies and common knots. You can do it in a classroom over about two days, in a virtual classroom, or online at your own pace within four weeks.",
  },
  {
    q: "Do you need a licence to drive a boat in New Zealand?",
    a: "No. New Zealand has no licence for skippering a recreational boat, but every skipper must follow the Maritime Rules and the regional council's navigation bylaws, such as the 5 knot rule, carrying a lifejacket for everyone on board and, since 9 October 2026, wearing one on boats 6 m or under whenever they are underway. Coastguard Boating Education calls Day Skipper the minimum training it recommends. Operating a marine VHF radio, except in an emergency, does need an operator's qualification.",
  },
  {
    q: "How is the Day Skipper assessed?",
    a: "Every version of the course ends with an online assessment. Coastguard Boating Education does not publish its number of questions or a pass mark. Its learner handbook says that if you do not reach the required level you get feedback and a second try at the questions you got wrong. The certificate is Coastguard Education's own internal certificate, not an NZQA qualification. Tigertest's four tests of 50 questions and 80% line are its own target, not the real format.",
  },
  {
    q: "What do these practice tests cover?",
    a: "The 200 questions follow the course's learning outcomes and the rules behind them: Maritime Rules Part 22 (collision prevention, lights and sound signals), Part 91 (navigation safety, including the 5 knot rule and lifejackets), the IALA A buoyage system used in New Zealand, LINZ tide guidance, marine forecasts, and emergencies such as Mayday and Pan-pan calls. A few questions are labelled as Hawke's Bay rules, because each region's bylaws differ, so check your own regional council's rules too.",
  },
  {
    q: "Are these the real Day Skipper questions?",
    a: "No. Every question is original, written by Tigertest from the Maritime Rules, regional council harbourmaster guidance and LINZ tide information. Tigertest is not affiliated with Coastguard Boating Education, Coastguard New Zealand or Maritime New Zealand, and this practice does not replace the course or its certificate.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - NZ Day Skipper Practice Test",
      description,
      url: `${siteUrl}/nz-day-skipper-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzboat", "NZD"),
      featureList: [
        "200 New Zealand boating practice questions",
        "4 tests of 50 questions",
        "5 training sets by topic",
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
  { name: "The boat and its equipment", weight: "5 per test" },
  { name: "Boat handling, anchoring and knots", weight: "6 per test" },
  { name: "Charts and compass", weight: "5 per test" },
  { name: "Tides and marine weather", weight: "5 per test" },
  { name: "Navigational marks (IALA A)", weight: "6 per test" },
  { name: "Give-way and collision rules", weight: "7 per test" },
  { name: "Lights, shapes and sound signals", weight: "5 per test" },
  { name: "Maritime Rules and local bylaws", weight: "5 per test" },
  { name: "Emergencies and communications", weight: "6 per test" },
];

export default function NzBoatLandingPage() {
  return (
    <div data-theme="nzboat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Day Skipper Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-day-skipper/dashboard"
            shortName="Day Skipper"
            subtitle="200 New Zealand boating questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nzboat-mobile.png", desktop: "/landing/nzboat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzboat" />

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
                Five training sets: the boat, handling and knots; charts, tides and weather; navigational marks and lights; the rules of the road and local rules; and emergencies and communications. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, each drawn across every topic of the course with an 80% target. No question appears in more than one test, and every answer explains the rule behind it.
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
                Built on the Day Skipper Learning Outcomes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Coastguard Boating Education lists what the course teaches but publishes no topic weights, so each test here gives every learning outcome its share, with extra weight on the rules of the road:
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
                src={getTigerAsset("nzboat", 3)}
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
            How to Get Ready for Day Skipper
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the 5 knot rule first</h3>
              <p>
                No more than 5 knots within 200 m of the shore or any structure, within 200 m of a boat flying the diver&apos;s flag, within 50 m of another boat or a person in the water, and while anyone has part of their body over the bow or side. Your region may add its own speed zones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who gives way</h3>
              <p>
                Power gives way to sail unless it is being overtaken, the overtaking boat always keeps clear, power boats meeting head-on both turn to starboard, and in a crossing you give way to a boat on your starboard side by passing astern of it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Picture the marks and lights</h3>
              <p>
                Entering harbour, keep red port marks to port and green starboard marks to starboard. Cardinal marks follow a clock face (three flashes east, six south, nine west, continuous north), and at night red over white means fishing while two reds mean not under command.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Rehearse an emergency</h3>
              <p>
                Remember LIFES (Lifejackets, Investigate, Fix, Emit a signal, Stay with the boat), the Mayday call on channel 16, *500 for non-urgent help and 111 in an emergency. Then check your own regional council&apos;s bylaws before you head out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Day Skipper Frequently Asked Questions
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

      <ExamSampleQuestions examId="nzboat" />

      <ExamRelatedTests examId="nzboat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Skipper Your Own Boat?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every Day Skipper topic.</p>
          <ExamLandingCTA dashboardHref="/nz-day-skipper/dashboard" />
        </div>
      </div>
    </div>
  );
}
