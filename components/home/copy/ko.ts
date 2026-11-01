// Korean homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.

import type { HomeCopy } from "../homeCopy";

export const ko: HomeCopy = {
  heroTitle: "합격까지 이끌어 주는 무료 모의고사",
  findYourTest: "내 시험 찾기",
  answeredThisWeek: "이번 주에 푼 문제",
  popularThisWeek: "이번 주 인기",
  popularTests: "인기 시험",
  allTests: (n) => `전체 시험 ${n}개`,
  aboutTheTest: "시험 안내",
  aboutEachTest: "시험별 안내",
  howItWorks: "Tigertest 이용 방법",
  steps: [
    {
      label: "1단계",
      title: "휴대폰으로 익히기",
      body: "답을 누르면 맞았는지, 왜 그런지 바로 알 수 있습니다. 틀린 문제는 맞힐 때까지 다시 나오기 때문에 버스에서 보내는 몇 분도 제대로 공부가 됩니다.",
    },
    {
      label: "2단계",
      title: "실전처럼 풀어 보기",
      body: "문제가 쉽게 느껴지면 실제 시험의 출제 범위와 주제 비율 그대로 만든 모의고사를 끝까지 풀어 보세요. 실제 시험 전에 내 점수를 미리 알 수 있습니다.",
    },
    {
      label: "3단계",
      title: "준비가 됐는지 확인하기",
      body: "학습 세트를 마치고 모의고사에 합격할 때마다 대시보드가 초록색으로 바뀝니다. 모두 초록색이 되면 시험을 예약하세요.",
    },
  ],
  shotAlts: {
    phones: ["휴대폰으로 푸는 SAT 수학 연습", "휴대폰으로 보는 수술 기사 시험 문제", "휴대폰으로 보는 CNA 연습 문제"],
    desktop: "컴퓨터로 푸는 시간 제한 SAT 모의고사",
    dashboard: "학습 세트와 모의고사가 있는 Tigertest DMV 대시보드",
  },
  everyTest: "전체 모의고사",
  testsFor: (inName) => `${inName} 모의고사`,
  usExamPrompt: "미국으로 이주하거나 미국 시험을 준비하고 계신가요?",
  seeAllTests: (n) => `전체 시험 ${n}개 보기`,
  faqTitle: "자주 묻는 질문",
  requestTitle: "찾는 시험이 없나요?",
  requestBody: "요청을 바탕으로 새 시험을 추가합니다. 어떤 시험을 준비하고 계신지 알려 주세요.",
  requestCta: "시험 요청하기",
  usLead: (examCount) =>
    `DMV 운전 필기시험(퍼밋)부터 SAT, 간호, IT 자격증까지 ${examCount}개 시험. 모든 답에 해설이 있습니다. 가입은 필요 없습니다.`,
  countryLead: (countryName) =>
    `${countryName} 무료 모의고사: 운전면허 필기시험과 어디서나 똑같은 자격증 시험. 모든 답에 해설이 있습니다. 가입은 필요 없습니다.`,
  usFaqs: (examCount) => [
    {
      q: "Tigertest는 무엇인가요?",
      a: `Tigertest는 ${examCount}개 시험을 위한 무료 모의고사 사이트입니다. 모든 주의 DMV 퍼밋 시험부터 SAT, ACT, 간호, 의료, IT, 기술직, 면허 시험까지 다룹니다. 각 시험은 실제 시험의 공식 출제 범위를 따르며, 모든 문제에 정답 해설이 있습니다.`,
    },
    {
      q: "Tigertest는 무료인가요?",
      a: "네. 거의 모든 시험이 완전히 무료입니다. DMV는 무료 모의고사와 학습 모드를 제공하며, 선택 사항인 $9.99 일회 결제 프리미엄(구독 아님)으로 모의고사 2개와 학습 세트를 더 열고 모든 미국 시험의 전체 통계를 볼 수 있습니다.",
    },
    {
      q: "계정이 필요한가요?",
      a: "아니요. 가입하지 않고도 어떤 시험이든 시작할 수 있습니다. 여러 기기에서 진행 상황을 저장하고 싶다면 무료 계정을 만드세요.",
    },
    {
      q: "Tigertest는 합격에 어떻게 도움이 되나요?",
      a: "학습 모드는 바로 해설을 보여 주고, 틀린 문제는 알 때까지 다시 내 줍니다. 그다음 모의고사로 실제 시험을 연습하면, 결과에서 아직 더 공부해야 할 주제를 확인할 수 있습니다.",
    },
    {
      q: "Tigertest는 DMV나 시험 기관과 관련이 있나요?",
      a: "아니요. Tigertest는 독립적인 서비스이며 어떤 DMV, 시험 기관, 자격 인증 기관과도 관련이 없습니다.",
    },
  ],
  dmv: {
    cta: "DMV 퍼밋 시험",
    title: "DMV 퍼밋 시험을 보시나요?",
    body: "내 주의 운전자 교본을 바탕으로 만든 200문제. 50개 주와 DC 모두 있습니다.",
    about: "DMV 모의고사 안내",
    questionsOnTest: (n) => `필기시험 ${n}문제`,
    viewAll: "50개 주 모두 보기",
  },
  listName: (inName) => `${inName} Tigertest 모의고사`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Tigertest는 무엇인가요?",
      a:
        local === 0
          ? `Tigertest는 무료 모의고사 사이트입니다. ${inName}에서는 CompTIA, AWS처럼 어디서나 똑같은 자격증 시험을 제공합니다. 모든 문제에 정답 해설이 있습니다.`
          : `Tigertest는 무료 모의고사 사이트입니다. ${inName}에서는 공식 ${local === 1 ? "규정" : "교본"}을 바탕으로 만든 운전면허 시험 ${local}개와, CompTIA, AWS처럼 어디서나 똑같은 자격증 시험을 제공합니다. 모든 문제에 정답 해설이 있습니다.`,
    },
    { q: "Tigertest는 무료인가요?", a: `네. ${inName}의 모든 시험은 무료이며 구독도 없습니다.` },
    {
      q: "계정이 필요한가요?",
      a: "아니요. 가입하지 않고도 어떤 시험이든 시작할 수 있습니다. 여러 기기에서 진행 상황을 저장하고 싶다면 무료 계정을 만드세요.",
    },
    {
      q: "Tigertest는 합격에 어떻게 도움이 되나요?",
      a: "학습 모드는 바로 해설을 보여 주고, 틀린 문제는 알 때까지 다시 내 줍니다. 그다음 모의고사로 실제 시험을 연습하면, 결과에서 아직 더 공부해야 할 주제를 확인할 수 있습니다.",
    },
    {
      q: "Tigertest는 공식 시험인가요?",
      a: `아니요. Tigertest는 독립적인 서비스이며 ${authority}나 다른 시험 기관과 관련이 없습니다. 문제는 공식 교본을 바탕으로 직접 만든 것입니다.`,
    },
  ],
  card: {
    questions: (n) => `${n}문제`,
    free: "무료",
    freePlusPremium: "무료 + 프리미엄",
    answeredThisWeek: "이번 주 풀이",
    availableIn: (names) => `${names} 지원`,
  },
  search: {
    placeholder: "시험 또는 직업 검색",
    label: "모의고사 검색",
    clear: "검색 지우기",
    countOf: (count, total) => `시험 ${total}개 중 ${count}개`,
    allFree: (n) => `모의고사 ${n}개, 모두 무료로 시작`,
    noMatch: (q) => `“${q}”에 맞는 시험이 없습니다`,
    noMatchHint: "시험 이름, 직업 이름 또는 인증 기관 이름으로 검색해 보세요.",
  },
  pills: {
    showTestsFor: "국가별 시험 보기",
    testsByCountry: "국가별 시험",
    countryTests: (name) => `${name} 시험`,
    moreCountries: "다른 국가",
    saved: "다음에도 기억해 둘게요. 진행 상황은 어느 국가에서나 똑같습니다.",
    geo: (inName) => `현재 위치에 맞춰 ${inName} 시험을 보여 드립니다. 언제든 다른 국가를 선택할 수 있습니다.`,
  },
};

/** Every country's name in Korean, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "미국", CA: "캐나다", UK: "영국", IE: "아일랜드", AU: "호주", NZ: "뉴질랜드", IN: "인도", PH: "필리핀", MY: "말레이시아", SG: "싱가포르", HK: "홍콩",
  AE: "아랍에미리트", ZA: "남아프리카공화국", NG: "나이지리아", KE: "케냐", PK: "파키스탄", ES: "스페인", PT: "포르투갈", RO: "루마니아", SE: "스웨덴", GR: "그리스", DK: "덴마크",
  HU: "헝가리", BE: "벨기에", FI: "핀란드", MT: "몰타", DE: "독일",
};
