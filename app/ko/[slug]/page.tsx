import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  FileText,
  Target,
  Clock,
  BookOpen,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { getStateBySlug, getStateByCode } from "@/data/states";
import { getStateLandingInfoKo } from "@/data/stateLandingDataKo";
import { KO_STATE_CODES } from "@/data/koStates";
import { isViState } from "@/data/viStates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Mirrors the English state page so AI engines see a consistent publish date
// across language variants.
const STATE_PAGE_PUBLISHED_AT = "2026-03-13";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseStateSlug(slug: string): string | null {
  const match = slug.match(/^(.+)-dmv-pilgi-siheom$/);
  return match ? match[1] : null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return KO_STATE_CODES.map((code) => ({
    slug: `${getStateByCode(code)!.slug}-dmv-pilgi-siheom`,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    return { title: "해당 주를 찾을 수 없습니다" };
  }

  const title = `${state.name} DMV 필기시험 연습문제 2026 - 무료 | TigerTest`;
  const description = `${state.name} 운전면허 필기시험을 한 번에 합격하세요. 실제 시험은 ${state.writtenTestQuestions}문제이며, ${state.name} 운전자 교본을 바탕으로 만든 무료 연습문제 200개로 대비할 수 있습니다. 지금 바로 연습을 시작하세요.`;
  const canonicalUrl = `${siteUrl}/ko/${state.slug}-dmv-pilgi-siheom`;
  const enUrl = `${siteUrl}/${state.slug}-dmv-practice-test`;
  const esUrl = `${siteUrl}/es/${state.slug}-examen-practica-dmv`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": enUrl,
        "es": esUrl,
        ...(isViState(state.code)
          ? { "vi": `${siteUrl}/vi/${state.slug}-thi-thu-dmv` }
          : {}),
        "ko": canonicalUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      locale: "ko_KR",
      siteName: "TigerTest",
      images: [
        {
          url: "/tiger.png",
          width: 512,
          height: 512,
          alt: `${state.name} DMV 필기시험 연습문제 - TigerTest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/tiger.png"],
    },
  };
}

export default async function KoreanStateDMVPage({ params }: PageProps) {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    notFound();
  }

  const landingInfo = getStateLandingInfoKo(state.code);
  if (!landingInfo) {
    notFound();
  }

  const rawPassing = Math.ceil(
    (state.writtenTestQuestions * state.passingScore) / 100
  );

  const neighboringStates = landingInfo.neighboringSlugs
    .map((s) => getStateBySlug(s))
    .filter(Boolean);

  // FAQ data in Korean
  const faqItems = [
    {
      question: `${state.name} 운전면허 필기시험은 몇 문제인가요?`,
      answer: `${state.name} ${state.dmvName}의 필기시험은 ${state.writtenTestQuestions}문제입니다. 합격하려면 최소 ${rawPassing}문제(${state.passingScore}%)를 맞혀야 합니다. TigerTest는 충분히 대비할 수 있도록 200개의 연습문제를 제공합니다.`,
    },
    {
      question: `${state.name} DMV 시험은 몇 점을 받아야 합격인가요?`,
      answer: `${state.name} ${state.dmvName} 필기시험에 합격하려면 ${state.passingScore}% 이상을 받아야 합니다. 즉 ${state.writtenTestQuestions}문제 중 최소 ${rawPassing}문제를 맞혀야 합니다.`,
    },
    {
      question: `${state.name} 필기시험을 온라인으로 볼 수 있나요?`,
      answer: landingInfo.onlineTestInfo,
    },
    {
      question: `${state.name}에서 임시 면허는 몇 살부터 받을 수 있나요?`,
      answer: `${state.name}에서는 만 ${state.minPermitAge}세부터 임시 면허를 신청할 수 있습니다. 면허를 받으려면 필기시험과 시력 검사를 모두 통과해야 합니다.`,
    },
    {
      question: `${state.name} 필기시험에 불합격하면 어떻게 되나요?`,
      answer: landingInfo.retakeInfo,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
        name: "주별 DMV 필기시험 연습문제",
        item: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${state.name} DMV 필기시험 연습문제`,
        item: `${siteUrl}/ko/${state.slug}-dmv-pilgi-siheom`,
      },
    ],
  };

  // Build-time timestamp; baked into the static page on each deploy.
  const lastModifiedIso = new Date().toISOString();

  // JSON-LD: WebApplication / LearningResource — mirrors the English page so
  // Korean results are equally citable in AI answers.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "LearningResource"],
    name: `${state.name} DMV 필기시험 연습문제 - TigerTest`,
    description: `${state.name} ${state.dmvName}의 공식 운전자 교본을 바탕으로 만든 200개의 문제로 구성된 무료 ${state.name} DMV 필기시험 연습문제입니다.`,
    url: `${siteUrl}/ko/${state.slug}-dmv-pilgi-siheom`,
    inLanguage: "ko",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    educationalLevel: "Beginner",
    learningResourceType: "Practice test",
    teaches: `${state.name} DMV 필기시험 학습 내용`,
    datePublished: STATE_PAGE_PUBLISHED_AT,
    dateModified: lastModifiedIso,
    author: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: HowTo — targets "[주] DMV 필기시험 합격 방법" queries.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${state.name} DMV 운전면허 필기시험 합격하는 방법`,
    description: `${state.name} ${state.dmvName}의 필기시험을 첫 응시에 합격하기 위한 단계별 안내입니다.`,
    totalTime: "PT2H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    supply: [
      { "@type": "HowToSupply", name: `${landingInfo.handbookName}` },
      { "@type": "HowToSupply", name: "TigerTest 연습문제" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "공식 운전자 교본을 읽으세요",
        text: `${landingInfo.handbookName}을 내려받아 읽어보세요. ${state.name} 필기시험의 모든 문제는 이 교본에서 나옵니다.`,
        url: landingInfo.handbookUrl,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "학습 모드로 연습하세요",
        text: `TigerTest의 ${state.name} 맞춤 연습문제 200개를 하나씩 풀어보세요. 답할 때마다 즉시 결과와 해설이 나옵니다.`,
        url: `${siteUrl}/ko/${state.slug}-dmv-pilgi-siheom`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "전체 모의고사를 시간 내에 풀어보세요",
        text: `50문제 모의고사로 실제 시험을 연습해 보세요. ${state.name} ${state.dmvName} 시험은 합격하려면 ${state.passingScore}%(${state.writtenTestQuestions}문제 중 ${rawPassing}문제)가 필요합니다.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "틀린 문제를 모두 복습하세요",
        text: "틀린 문제의 해설을 다시 읽어보세요. TigerTest는 틀린 문제를 복습 목록에 넣어 더 자주 다시 보여줍니다.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: `${state.name} ${state.dmvName} 방문을 예약하세요`,
        text: `연습에서 꾸준히 ${state.passingScore}% 이상이 나오면 ${state.dmvName} 방문 시험을 예약하세요. 필요한 신분증과 거주지 증명 서류, 신청 수수료를 준비해 가세요.`,
      },
    ],
  };

  const testimonials = [
    {
      quote: "이걸로 공부했어요. 오늘 합격했습니다! 감사합니다 :)",
      author: "Naive_Usual1910",
    },
    {
      quote: "7분 만에 합격했어요",
      author: "vivacious-vi",
    },
    {
      quote: "준비하는 데 정말 도움이 됐고, 오늘 시험에 합격했어요",
      author: "Big-Burrito-8765",
    },
    {
      quote: "전날 공부한 것만으로도 자신감이 생겼어요",
      author: "JayjayX12",
    },
    {
      quote: "3분 만에 합격했어요",
      author: "Curdled_Cave",
    },
    {
      quote: "많은 도움이 됐어요",
      author: "WorthEducational523",
    },
  ];

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand">
                홈
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li>
              <Link
                href="/ko/juibyeol-dmv-pilgi-siheom"
                className="hover:text-brand"
              >
                주별 연습문제
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">{state.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {state.name} DMV 필기시험 무료 연습문제 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {state.name} {state.dmvName} 필기시험을 한 번에 합격하세요. 공식
            운전자 교본을 바탕으로 만든 {state.name} 맞춤 연습문제 200개로
            대비할 수 있습니다.
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              무료로 연습 시작하기
            </Button>
          </Link>
        </div>

        {/* State Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">시험 문제 수</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-sm text-gray-600">합격 기준 점수</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.minPermitAge}
              </div>
              <div className="text-sm text-gray-600">임시 면허 최소 연령</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {rawPassing}/{state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">합격에 필요한 정답 수</div>
            </CardContent>
          </Card>
        </div>

        {/* State-Specific Content Section */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {state.name} {state.dmvName} 필기시험, 꼭 알아야 할 것들
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  시험 형식
                </h3>
                <p className="text-gray-600">
                  {state.name} {state.dmvName}의 필기시험은{" "}
                  <strong>{state.writtenTestQuestions}개의 객관식 문제</strong>로
                  구성되며, 교통법규와 도로 표지판, 안전 운전 요령, {state.name}{" "}
                  고유의 규정을 다룹니다. 합격하려면{" "}
                  <strong>
                    {state.passingScore}%({rawPassing}문제 정답)
                  </strong>{" "}
                  이상을 받아야 합니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  최소 연령 및 응시 자격
                </h3>
                <p className="text-gray-600">
                  {state.name}에서 임시 면허를 신청하려면 만{" "}
                  <strong>{state.minPermitAge}세</strong> 이상이어야 합니다.
                  면허가 발급되기 전에 필기시험과 시력 검사를 모두 통과해야
                  합니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  불합격했을 때
                </h3>
                <p className="text-gray-600">{landingInfo.retakeInfo}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {state.name} 고유 규정
                </h3>
                <ul className="space-y-2">
                  {landingInfo.notableRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {landingInfo.examManualChapters && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    시험에 나오는 교본 범위
                  </h3>
                  <p className="text-gray-600">
                    {landingInfo.examManualChapters}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  공식 운전자 교본
                </h3>
                <p className="text-gray-600 mb-3">
                  필기시험을 준비하려면{" "}
                  <strong>{landingInfo.handbookName}</strong>을 공부하세요.
                  TigerTest의 연습문제도 이 교본의 내용을 바탕으로 만들었습니다.
                </p>
                <a
                  href={landingInfo.handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  {landingInfo.handbookName} 내려받기
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {state.name} 연습문제에 포함된 내용
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>연습문제 200개</strong> — {state.name} 고유 법규를
                  포함해 {state.dmvName} 필기시험의 모든 주제를 다룹니다
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>50문제짜리 모의고사 4회</strong> — 실제{" "}
                  {state.dmvName} 시험과 똑같은 환경을 연습할 수 있습니다
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>학습 모드</strong> — 문제마다 즉시 결과와 자세한
                  해설을 확인할 수 있습니다
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>진행 상황 추적</strong> — 공부하는 동안 합격 가능성이
                  어떻게 올라가는지 확인할 수 있습니다
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>모바일 최적화</strong> — 침대에서, 소파에서, 어디서든
                  휴대폰으로 공부하세요
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {state.name} DMV 시험, 합격할 준비 되셨나요?
          </h2>
          <p className="text-brand-light text-lg mb-6">
            TigerTest로 첫 응시에 합격한 수많은 {state.name} 운전자들과 함께하세요
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-brand-dark hover:bg-gray-100 font-bold rounded-xl"
            >
              지금 연습 시작하기 — 무료입니다
            </Button>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            사용자 후기
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
              >
                <p className="text-gray-800 mb-3 italic">
                  &quot;{t.quote}&quot;
                </p>
                <p className="text-gray-500 text-sm">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {state.name} DMV 시험 자주 묻는 질문
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related State Pages */}
        {neighboringStates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              주변 주의 연습문제
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {neighboringStates.slice(0, 5).map(
                (neighbor) =>
                  neighbor && (
                    <Link
                      key={neighbor.slug}
                      href={
                        getStateLandingInfoKo(neighbor.code)
                          ? `/ko/${neighbor.slug}-dmv-pilgi-siheom`
                          : `/${neighbor.slug}-dmv-practice-test`
                      }
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {neighbor.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            {state.name} 운전면허 필기시험 공부, 지금 시작해 볼까요?
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              무료로 연습 시작하기
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            계정이 필요 없습니다. 무료로 시작하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
