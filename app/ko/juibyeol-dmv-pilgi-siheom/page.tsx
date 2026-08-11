import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { getStateByCode } from "@/data/states";
import { KO_STATE_CODES } from "@/data/koStates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title: "주별 DMV 필기시험 연습문제 2026 - 무료 | TigerTest",
  description:
    "미국 주별 무료 DMV 운전면허 필기시험 연습문제. 각 주의 공식 운전자 교본을 바탕으로 주당 200문제를 제공합니다. 한 번에 합격하세요.",
  alternates: {
    canonical: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
    languages: {
      en: `${siteUrl}/practice-tests-by-state`,
      es: `${siteUrl}/es/examenes-practica-por-estado`,
      vi: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      ko: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
      "x-default": `${siteUrl}/practice-tests-by-state`,
    },
  },
  openGraph: {
    title: "주별 DMV 필기시험 연습문제 2026 | TigerTest",
    description:
      "무료 DMV 운전면허 필기시험 연습문제. 주당 200문제, 풀 때마다 즉시 해설을 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
    images: [{ url: "/tiger.png", width: 512, height: 512 }],
  },
};

const koStates = KO_STATE_CODES.map((code) => getStateByCode(code)!).sort(
  (a, b) => a.name.localeCompare(b.name)
);

export default function KoreanPracticeTestsByStatePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "주별 필기시험 연습문제",
        item: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
      },
    ],
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

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
                홈
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">주별 필기시험 연습문제</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            주별 DMV 필기시험 연습문제
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            아래에서 주를 선택하면 해당 주의 공식 운전자 교본을 바탕으로 만든
            문제로 무료로 연습할 수 있습니다.
          </p>
        </div>

        {/* Why these states */}
        <div className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <Info className="h-7 w-7 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">
            아래 주들은 한국어 사용 인구가 많은 곳으로, 안내 페이지를 한국어로
            제공하고 있습니다. 찾으시는 주가 목록에 없다면{" "}
            <Link
              href="/practice-tests-by-state"
              className="text-brand hover:text-brand-dark font-medium underline"
            >
              TigerTest 영어 페이지
            </Link>
            에서 50개 주 전체를 확인하실 수 있습니다. 실제 DMV 필기시험을 어떤
            언어로 볼 수 있는지는 주마다 다르므로, 해당 주 DMV에 직접 확인하시기
            바랍니다.
          </p>
        </div>

        {/* State Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {koStates.map((state) => (
            <Link
              key={state.slug}
              href={`/ko/${state.slug}-dmv-pilgi-siheom`}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-brand-border hover:bg-brand-light transition-colors group"
            >
              <div>
                <span className="font-medium text-gray-900 group-hover:text-brand-dark">
                  {state.name}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {state.writtenTestQuestions}문제 &middot; {state.passingScore}%
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand" />
            </Link>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            TigerTest 주별 연습문제 소개
          </h2>
          <div className="text-gray-600 space-y-3">
            <p>
              주마다 교통법규와 시험 형식, 합격 기준 점수가 다릅니다. TigerTest는{" "}
              <strong>주당 200문제</strong>를 제공하며, 지역 법규와 제한 속도 등
              해당 주에만 적용되는 규정을 다루는 문제도 함께 담고 있습니다.
            </p>
            <p>
              모든 모의고사는 해당 주 DMV 필기시험의 실제 형식을 그대로 따릅니다.
              휴대폰으로 학습 모드를 이용해 빠르게 익힌 다음, 준비가 되면 50문제
              모의고사로 실제 시험을 연습해 보세요.
            </p>
            <p>
              모든 연습문제는 <strong>무료로 시작</strong>할 수 있고 계정을 만들
              필요도 없습니다. 진행 상황을 확인하고 자세한 해설을 읽으며 시험
              당일까지 자신감을 쌓으세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
