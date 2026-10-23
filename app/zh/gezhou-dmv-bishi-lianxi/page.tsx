import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { getStateByCode } from "@/data/states";
import { ZH_STATE_CODES } from "@/data/zhStates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title: { absolute: "各州DMV笔试模拟考试 2026 - 免费 | Tigertest" },
  description:
    "美国各州免费DMV驾照笔试模拟考试。根据各州官方驾驶手册编写，每州200道题。一次通过笔试。",
  alternates: {
    canonical: `${siteUrl}/zh/gezhou-dmv-bishi-lianxi`,
    languages: {
      en: `${siteUrl}/practice-tests-by-state`,
      es: `${siteUrl}/es/examenes-practica-por-estado`,
      vi: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      ko: `${siteUrl}/ko/juibyeol-dmv-pilgi-siheom`,
      "zh-Hans": `${siteUrl}/zh/gezhou-dmv-bishi-lianxi`,
      "x-default": `${siteUrl}/practice-tests-by-state`,
    },
  },
  openGraph: {
    title: "各州DMV笔试模拟考试 2026 | Tigertest",
    description:
      "免费DMV驾照笔试模拟考试。每州200道题，每道题都能立即查看解析。",
    type: "website",
    locale: "zh_CN",
    url: `${siteUrl}/zh/gezhou-dmv-bishi-lianxi`,
    images: [{ url: "/tiger.png", width: 512, height: 512 }],
  },
};

const zhStates = ZH_STATE_CODES.map((code) => getStateByCode(code)!).sort(
  (a, b) => a.name.localeCompare(b.name)
);

export default function ChinesePracticeTestsByStatePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "各州笔试模拟考试",
        item: `${siteUrl}/zh/gezhou-dmv-bishi-lianxi`,
      },
    ],
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand">
                首页
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 dark:text-gray-50 font-medium">各州笔试模拟考试</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            各州DMV笔试模拟考试
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            在下方选择你所在的州，即可免费练习根据该州官方驾驶手册编写的题目。
          </p>
        </div>

        {/* Why these states */}
        <div className="flex items-start gap-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-10">
          <Info className="h-7 w-7 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 dark:text-gray-200">
            以下各州的DMV提供中文笔试，因此我们提供了中文说明页面。考试形式因州而异，可能是笔试试卷、语音考试或由口译员协助。如果你所在的州不在列表中，可以在
            <Link
              href="/practice-tests-by-state"
              className="text-brand-dark hover:text-brand-darker font-medium underline"
            >
              Tigertest英文页面
            </Link>
            查看全部50个州。各州可选择的考试语言可能会有变化，请向你所在州的DMV确认最新的语言选项。
          </p>
        </div>

        {/* State Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {zhStates.map((state) => (
            <Link
              key={state.slug}
              href={`/zh/${state.slug}-dmv-bishi-lianxi`}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:border-brand-border hover:bg-brand-light transition-colors group"
            >
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-50 group-hover:text-brand-dark">
                  {state.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {state.writtenTestQuestions}道题 &middot; {state.passingScore}%
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-brand" />
            </Link>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            关于Tigertest各州模拟考试
          </h2>
          <div className="text-gray-600 dark:text-gray-300 space-y-3">
            <p>
              每个州的交通法规、考试形式和及格分数线都不一样。Tigertest为
              <strong>每个州提供200道题</strong>
              ，其中包括当地法规、限速等只适用于该州的规定。
            </p>
            <p>
              所有模拟考试都完全按照该州DMV笔试的真实形式设计。先用手机上的学习模式快速掌握内容，准备好之后，再用50道题的模拟考试来练习真实考试。
            </p>
            <p>
              所有模拟考试都可以<strong>免费开始</strong>
              ，无需注册账户。查看学习进度，阅读详细解析，到考试那天信心满满。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
