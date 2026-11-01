// Simplified Chinese homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.

import type { HomeCopy } from "../homeCopy";

export const zh: HomeCopy = {
  heroTitle: "帮你顺利通过的免费模拟考试",
  findYourTest: "找到你的考试",
  answeredThisWeek: "本周已答题数",
  popularThisWeek: "本周热门",
  popularTests: "热门考试",
  allTests: (n) => `全部 ${n} 个考试`,
  aboutTheTest: "关于考试",
  aboutEachTest: "关于各项考试",
  howItWorks: "Tigertest 如何帮你",
  steps: [
    {
      label: "第 1 步",
      title: "用手机学",
      body: "点一个答案，马上就知道对不对，以及为什么。答错的题会反复出现，直到你答对为止，所以坐公交车的几分钟也能真正学到东西。",
    },
    {
      label: "第 2 步",
      title: "像正式考试一样做一遍",
      body: "当题目变得简单时，就做一套完整的模拟考试。它按照真实考试的大纲编写，各主题的比例也一样。这样在正式考试前你就知道自己的分数。",
    },
    {
      label: "第 3 步",
      title: "知道自己何时准备好了",
      body: "每完成一组练习、通过一套考试，你的主页就会变成绿色。全部变绿后，就去预约考试吧。",
    },
  ],
  shotAlts: {
    phones: ["手机上的 SAT 数学练习", "手机上的外科技术员考题", "手机上的 CNA 练习题"],
    desktop: "电脑上限时的 SAT 模拟考试",
    dashboard: "Tigertest DMV 主页，包含练习组和模拟考试",
  },
  everyTest: "全部模拟考试",
  testsFor: (inName) => `${inName}的模拟考试`,
  usExamPrompt: "要搬到美国，或者在准备美国的考试？",
  seeAllTests: (n) => `查看全部 ${n} 个考试`,
  faqTitle: "常见问题",
  requestTitle: "没有找到你的考试？",
  requestBody: "我们会根据大家的需求增加新的考试。告诉我们你在准备哪一个。",
  requestCta: "申请新考试",
  usLead: (examCount) =>
    `${examCount} 项考试，从 DMV 驾照笔试（学习驾照）到 SAT、护理和 IT 证书。每道题都有解析。无需注册。`,
  countryLead: (countryName) =>
    `${countryName}的免费模拟考试：驾驶理论考试，以及全球通用的证书考试。每道题都有解析。无需注册。`,
  usFaqs: (examCount) => [
    {
      q: "Tigertest 是什么？",
      a: `Tigertest 是一个免费的模拟考试网站，涵盖 ${examCount} 项考试：从每个州的 DMV 学习驾照笔试，到 SAT、ACT，以及护理、医疗、IT、技工和执照考试。每套考试都按照真实考试公布的大纲编写，每道题都会解释正确答案。`,
    },
    {
      q: "Tigertest 免费吗？",
      a: "是的。几乎所有考试都完全免费。DMV 部分有免费的模拟考试和练习，另有可选的 Premium，一次性 $9.99（不是订阅），可再解锁两套考试和练习组，以及所有美国考试的完整统计。",
    },
    {
      q: "需要注册账户吗？",
      a: "不需要。你无需注册就可以开始任何考试。如果想在多台设备上保存进度，可以创建一个免费账户。",
    },
    {
      q: "Tigertest 如何帮我通过考试？",
      a: "练习模式会即时给出反馈，并让答错的题反复出现，直到你掌握为止。之后，完整的模拟考试会模拟真实考试，你的成绩会显示哪些主题还需要加强。",
    },
    {
      q: "Tigertest 和 DMV 或任何考试机构有关系吗？",
      a: "没有。Tigertest 是独立网站，与任何 DMV、考试机构或认证机构都没有关系。",
    },
  ],
  dmv: {
    cta: "DMV 学习驾照笔试",
    title: "要考 DMV 学习驾照笔试？",
    body: "200 道题，根据你所在州的驾驶手册编写，覆盖全部 50 个州和华盛顿特区。",
    about: "关于 DMV 模拟考试",
    questionsOnTest: (n) => `笔试共 ${n} 道题`,
    viewAll: "查看全部 50 个州",
  },
  listName: (inName) => `${inName}的 Tigertest 模拟考试`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Tigertest 是什么？",
      a:
        local === 0
          ? `Tigertest 是一个免费的模拟考试网站。在${inName}，我们提供全球通用的证书考试，例如 CompTIA 和 AWS。每道题都会解释正确答案。`
          : `Tigertest 是一个免费的模拟考试网站。在${inName}，我们提供 ${local} 套根据官方${local === 1 ? "规则" : "手册"}编写的驾驶考试，以及全球通用的证书考试，例如 CompTIA 和 AWS。每道题都会解释正确答案。`,
    },
    { q: "Tigertest 免费吗？", a: `是的。${inName}的所有考试都免费，没有订阅。` },
    {
      q: "需要注册账户吗？",
      a: "不需要。你无需注册就可以开始任何考试。如果想在多台设备上保存进度，可以创建一个免费账户。",
    },
    {
      q: "Tigertest 如何帮我通过考试？",
      a: "练习模式会即时给出反馈，并让答错的题反复出现，直到你掌握为止。之后，完整的模拟考试会模拟真实考试，你的成绩会显示哪些主题还需要加强。",
    },
    {
      q: "Tigertest 是官方考试吗？",
      a: `不是。Tigertest 是独立网站，与${authority}或任何考试机构都没有关系。题目是我们根据官方手册原创编写的。`,
    },
  ],
  card: {
    questions: (n) => `${n} 道题`,
    free: "免费",
    freePlusPremium: "免费 + Premium",
    answeredThisWeek: "本周答题",
    availableIn: (names) => `语言：${names}`,
  },
  search: {
    placeholder: "搜索考试或职业",
    label: "搜索模拟考试",
    clear: "清除搜索",
    countOf: (count, total) => `${total} 个考试中的 ${count} 个`,
    allFree: (n) => `${n} 个模拟考试，全部免费开始`,
    noMatch: (q) => `没有与“${q}”匹配的考试`,
    noMatchHint: "试试考试名称、职业名称或认证机构。",
  },
  pills: {
    showTestsFor: "显示考试：",
    testsByCountry: "按国家查看考试",
    countryTests: (name) => `${name}考试`,
    moreCountries: "更多国家",
    saved: "已保存，下次也会记住。你的进度在每个国家都一样。",
    geo: (inName) => `因为你现在在${inName}，所以显示这里的考试。你可以随时选择其他国家。`,
  },
};

/** Every country's name in Simplified Chinese, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "美国", CA: "加拿大", UK: "英国", IE: "爱尔兰", AU: "澳大利亚", NZ: "新西兰", IN: "印度", PH: "菲律宾", MY: "马来西亚", SG: "新加坡", HK: "香港",
  AE: "阿联酋", ZA: "南非", NG: "尼日利亚", KE: "肯尼亚", PK: "巴基斯坦", ES: "西班牙", PT: "葡萄牙", RO: "罗马尼亚", SE: "瑞典", GR: "希腊", DK: "丹麦",
  HU: "匈牙利", BE: "比利时", FI: "芬兰", MT: "马耳他", DE: "德国",
};
