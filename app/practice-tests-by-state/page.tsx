import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { states } from "@/data/states";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title: "DMV Practice Tests by State 2026 - Free Permit Practice | TigerTest",
  description:
    "Free DMV practice tests for all 50 states. Choose your state and start practicing with 200 questions based on your state's driver's manual. Pass your permit test on the first try.",
  alternates: {
    canonical: `${siteUrl}/practice-tests-by-state`,
    languages: {
      en: `${siteUrl}/practice-tests-by-state`,
      es: `${siteUrl}/es/examenes-practica-por-estado`,
      vi: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      "x-default": `${siteUrl}/practice-tests-by-state`,
    },
  },
  openGraph: {
    title: "DMV Practice Tests by State 2026 | TigerTest",
    description:
      "Free DMV practice tests for all 50 states. 200 questions per state with instant feedback.",
    type: "website",
    url: `${siteUrl}/practice-tests-by-state`,
    images: [{ url: "/tiger.png", width: 512, height: 512 }],
  },
};

// Group states by first letter for organized display
function groupStatesByLetter() {
  const groups: Record<string, typeof states> = {};
  for (const state of states) {
    const letter = state.name[0];
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  }
  return groups;
}

export default function PracticeTestsByStatePage() {
  const grouped = groupStatesByLetter();
  const letters = Object.keys(grouped).sort();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DMV Practice Tests by State",
    description:
      "Comparison of DMV written knowledge test requirements across all 50 US states plus Washington D.C., including the number of questions, passing score, and minimum permit age.",
    numberOfItems: states.length,
    itemListElement: states.map((state, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${state.name} DMV Practice Test`,
      url: `${siteUrl}/${state.slug}-dmv-practice-test`,
    })),
  };

  // Computed total used in the answer-first lead and the table caption.
  const totalQuestions = states.reduce(
    (sum, s) => sum + s.writtenTestQuestions,
    0
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Practice Tests by State",
        item: `${siteUrl}/practice-tests-by-state`,
      },
    ],
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">
              Practice Tests by State
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            DMV Practice Tests by State
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            DMV written knowledge tests vary by state: most require a{" "}
            <strong>20–50 question</strong> exam with a{" "}
            <strong>70%–85% passing score</strong>. Minimum permit age ranges
            from <strong>14 to 16</strong>. The table below compares all 50
            states plus Washington D.C., and TigerTest provides 200 free
            practice questions for each.
          </p>
        </div>

        {/* Comparison Table — all states at a glance (AI-parseable) */}
        <div className="mb-12 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <caption className="sr-only">
              DMV written knowledge test requirements for all {states.length}{" "}
              US states and territories ({totalQuestions} total questions
              across all official state exams). Sorted alphabetically.
            </caption>
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  State
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">
                  Questions
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">
                  Passing Score
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">
                  Correct to Pass
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Min. Permit Age
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Practice Test
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {states.map((state) => {
                const correctToPass = Math.ceil(
                  (state.writtenTestQuestions * state.passingScore) / 100
                );
                return (
                  <tr key={state.slug} className="hover:bg-brand-light">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {state.name}
                    </th>
                    <td className="px-4 py-3 text-right text-gray-700 tabular-nums">
                      {state.writtenTestQuestions}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 tabular-nums">
                      {state.passingScore}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 tabular-nums">
                      {correctToPass}/{state.writtenTestQuestions}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {state.minPermitAge}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${state.slug}-dmv-practice-test`}
                        className="text-brand hover:text-brand-dark font-medium inline-flex items-center gap-1"
                      >
                        Start free
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* State Grid */}
        <div className="space-y-8 mb-16">
          {letters.map((letter) => (
            <div key={letter}>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {grouped[letter].map((state) => (
                  <Link
                    key={state.slug}
                    href={`/${state.slug}-dmv-practice-test`}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-brand-border hover:bg-brand-light transition-colors group"
                  >
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-brand-dark">
                        {state.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {state.writtenTestQuestions}q &middot;{" "}
                        {state.passingScore}%
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About TigerTest State Practice Tests
          </h2>
          <div className="text-gray-600 space-y-3">
            <p>
              Every state has different driving laws, test formats, and passing
              requirements. TigerTest provides <strong>200 questions per state</strong>,
              including state-specific questions about local traffic laws, speed
              limits, and regulations unique to your state.
            </p>
            <p>
              Each practice test mirrors the format of your state&apos;s actual
              DMV written exam. Study in training mode on your phone for quick
              practice, then take full 50-question tests when you&apos;re ready
              to simulate the real exam.
            </p>
            <p>
              All practice tests are <strong>free to start</strong> with no
              account required. Track your progress, see detailed explanations,
              and build confidence before test day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
