import { StateLandingInfo } from "./stateLandingData";

// Korean landing-page copy for TigerTest. Coverage is intentionally limited to
// the 10 states listed in koStates.ts. Only the same fields the Vietnamese
// mirror translates are localized here (retakeWaitTime, retakeInfo,
// notableRules, onlineTestInfo, examManualChapters); handbook names/URLs, state
// names, and neighboringSlugs stay in their standard English forms.
export const stateLandingDataKo: Record<string, StateLandingInfo> = {
  CA: {
    retakeWaitTime: "7일",
    retakeInfo: "캘리포니아 필기시험에 불합격하면 두 번째 응시까지 7일, 세 번째 응시까지 다시 7일을 기다려야 합니다. 3회 불합격하면 처음부터 다시 신청하고 신청 수수료를 다시 납부해야 합니다.",
    handbookUrl: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/",
    handbookName: "California Driver Handbook",
    notableRules: [
      "캘리포니아는 도로주행 시험 전에 50시간의 보호자 동반 운전 연습(야간 10시간 포함)을 요구합니다.",
      "18세 미만 임시 면허 소지자는 첫 12개월 동안 25세 이상 정식 면허 소지자가 동승하지 않으면 20세 미만 승객을 태울 수 없습니다.",
      "캘리포니아 필기시험은 46문제로 전국에서 가장 많으며, 합격하려면 39문제(83%)를 맞혀야 합니다."
    ],
    neighboringSlugs: ["oregon", "nevada", "arizona"],
    onlineTestInfo: "아니요. 캘리포니아 DMV 필기시험은 DMV 사무소를 직접 방문해서 봐야 합니다. 온라인으로 방문 예약을 하면 대기 시간을 줄일 수 있습니다."
  },
  NY: {
    retakeWaitTime: "1일",
    retakeInfo: "뉴욕 필기시험에 불합격하면 다음 영업일에 아무 DMV 사무소에서나 다시 응시할 수 있습니다. 일부 사무소에서는 시간이 허락하면 당일 재응시도 가능합니다.",
    handbookUrl: "https://dmv.ny.gov/driver-license/drivers-manual",
    handbookName: "New York State Driver's Manual",
    notableRules: [
      "뉴욕 필기시험은 20문제(그중 4문제는 도로 표지판)뿐이고 합격 기준은 70%로, 문제 수와 합격 기준 모두 전국에서 가장 낮은 편입니다.",
      "뉴욕 DMV 시험은 14개 이상의 언어로 제공되어 대부분의 다른 주보다 선택지가 많습니다.",
      "18세 미만 주니어 면허 소지자에게는 지역에 따라 운전 가능 지역과 시간대 제한이 적용됩니다."
    ],
    neighboringSlugs: ["new-jersey", "pennsylvania", "connecticut", "massachusetts", "vermont"],
    onlineTestInfo: "아니요. 뉴욕 DMV 필기시험은 DMV 사무소를 직접 방문해서 봐야 합니다.",
    examManualChapters: "뉴욕주 DMV에 따르면 필기시험 문제는 New York State Driver's Manual의 4장부터 11장까지에서 출제됩니다. 도로 표지판·신호·차선 표시, 교차로와 회전, 안전 운전과 추월 요령, 방어 운전, 도로 함께 쓰기, 음주 및 약물의 영향, 주차 규정, 비상 상황 대처가 여기에 포함됩니다. TigerTest의 뉴욕 연습문제 200개도 같은 자료를 바탕으로 만들었기 때문에, 틀린 문제는 공식 교본에서 바로 찾아 확인할 수 있습니다."
  },
  NJ: {
    retakeWaitTime: "14일",
    retakeInfo: "뉴저지 필기시험에 불합격하면 최소 14일을 기다려야 다시 응시할 수 있습니다. 전국에서 가장 긴 대기 기간입니다.",
    handbookUrl: "https://www.nj.gov/mvc/pdf/license/drivermanual.pdf",
    handbookName: "New Jersey Driver Manual",
    notableRules: [
      "뉴저지는 전국에서 가장 엄격한 단계별 면허(GDL) 제도를 운영하며, 성인을 포함한 모든 초보 운전자는 번호판에 빨간색 스티커를 부착해야 합니다.",
      "뉴저지 필기시험은 50문제이며 합격하려면 80%를 받아야 합니다.",
      "GDL 임시 면허 소지자는 오후 11시 1분부터 오전 5시까지 운전할 수 없고 승객도 1명까지만 태울 수 있습니다."
    ],
    neighboringSlugs: ["new-york", "pennsylvania", "delaware"],
    onlineTestInfo: "아니요. 뉴저지 MVC 필기시험은 MVC 사무소를 직접 방문해서 봐야 합니다."
  },
  VA: {
    retakeWaitTime: "15일",
    retakeInfo: "버지니아 필기시험에 불합격하면 15일을 기다려야 다시 응시할 수 있습니다. 전국에서 대기 기간이 가장 긴 주 중 하나입니다.",
    handbookUrl: "https://www.dmv.virginia.gov/drivers/manuals.asp",
    handbookName: "Virginia Driver's Manual",
    notableRules: [
      "버지니아는 도로주행 시험을 보기 전에 임시 면허를 최소 9개월간 보유하도록 요구합니다.",
      "버지니아는 45시간의 보호자 동반 운전(야간 15시간)을 요구하며, 야간 운전 시간 요건이 전국에서 가장 많은 편입니다.",
      "버지니아 임시 면허는 만 15세 6개월부터 취득할 수 있으며, 면허 발급 전에 필기시험에 합격해야 합니다."
    ],
    neighboringSlugs: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "north-carolina"],
    onlineTestInfo: "아니요. 버지니아 DMV 필기시험은 DMV 고객 서비스 센터를 직접 방문해서 봐야 합니다."
  },
  WA: {
    retakeWaitTime: "1일",
    retakeInfo: "워싱턴 필기시험에 불합격하면 다음 영업일에 아무 DOL 사무소에서나 다시 응시할 수 있습니다.",
    handbookUrl: "https://www.dol.wa.gov/driver-licenses-permits-ids/drivers-guide",
    handbookName: "Washington Driver Guide",
    notableRules: [
      "워싱턴은 18세 미만 초보 운전자 전원에게 중간 단계 면허(IDL)를 요구하며, 승객과 야간 운전에 제한이 적용됩니다.",
      "임시 면허 소지자는 면허를 최소 6개월간 보유하고 승인된 운전 교육을 이수해야 합니다.",
      "워싱턴은 최소 50시간의 보호자 동반 운전 연습(야간 10시간)을 요구합니다."
    ],
    neighboringSlugs: ["oregon", "idaho"],
    onlineTestInfo: "아니요. 워싱턴 DOL 필기시험은 DOL 사무소나 승인된 시험 장소를 직접 방문해서 봐야 합니다."
  },
  GA: {
    retakeWaitTime: "1일",
    retakeInfo: "조지아 필기시험에 불합격하면 다음 영업일에 다시 응시할 수 있습니다. 재응시할 때마다 수수료가 발생합니다.",
    handbookUrl: "https://dds.georgia.gov/drivers-manual",
    handbookName: "Georgia DDS Driver's Manual",
    notableRules: [
      "조지아의 'Joshua's Law'에 따라 18세 미만 운전자는 40시간의 보호자 동반 운전(야간 6시간)을 이수해야 합니다.",
      "조지아의 합격 기준은 75%로, 대부분의 주 가운데 가장 낮은 편입니다.",
      "18세 미만 운전자는 첫 6개월 동안 가족이 아닌 21세 미만 승객을 3명 넘게 태울 수 없습니다."
    ],
    neighboringSlugs: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
    onlineTestInfo: "아니요. 조지아 DDS 필기시험은 DDS 고객 서비스 센터를 직접 방문해서 봐야 합니다."
  },
  IL: {
    retakeWaitTime: "1일",
    retakeInfo: "일리노이 필기시험에 불합격하면 다음 영업일에 아무 주무장관실(Secretary of State) 사무소에서나 다시 응시할 수 있습니다.",
    handbookUrl: "https://www.ilsos.gov/publications/pdf_publications/dsd_a112.pdf",
    handbookName: "Illinois Rules of the Road",
    notableRules: [
      "일리노이는 18세 미만 임시 면허 소지자에게 시험 전 최소 9개월간 면허를 보유하도록 요구합니다.",
      "18세 미만 운전자는 오후 10시(주말은 오후 11시)부터 오전 6시까지 운전할 수 없습니다.",
      "일리노이의 모든 운전자는 면허를 갱신할 때마다 시력 검사를 통과해야 합니다."
    ],
    neighboringSlugs: ["indiana", "wisconsin", "iowa", "missouri", "kentucky"],
    onlineTestInfo: "아니요. 일리노이 필기시험은 주무장관실 운전자 서비스 사무소를 직접 방문해서 봐야 합니다."
  },
  MD: {
    retakeWaitTime: "7일",
    retakeInfo: "메릴랜드 필기시험에 불합격하면 7일을 기다려야 다시 응시할 수 있습니다. 여러 번 불합격하면 추가 대기 기간이 적용될 수 있습니다.",
    handbookUrl: "https://mva.maryland.gov/pages/driver-manuals.aspx",
    handbookName: "Maryland Driver's Manual",
    notableRules: [
      "메릴랜드의 합격 기준은 85%로 전국에서 가장 높은 편에 속합니다.",
      "임시 면허 신청자는 만 15세 9개월 이상이어야 하며, 이는 다른 주에서 보기 드문 연령 기준입니다.",
      "메릴랜드는 도로주행 시험 전에 60시간의 보호자 동반 운전(야간 10시간)을 요구합니다."
    ],
    neighboringSlugs: ["delaware", "pennsylvania", "virginia", "west-virginia", "district-of-columbia"],
    onlineTestInfo: "아니요. 메릴랜드 필기시험은 MVA 사무소를 직접 방문해서 봐야 합니다. 시험은 여러 언어로 제공됩니다."
  },
  TX: {
    retakeWaitTime: "1일",
    retakeInfo: "텍사스 필기시험에 불합격하면 다음 영업일에 다시 응시할 수 있습니다. 응시할 때마다 시험 수수료를 다시 납부해야 합니다.",
    handbookUrl: "https://www.dps.texas.gov/section/driver-license/texas-driver-handbook",
    handbookName: "Texas Driver Handbook",
    notableRules: [
      "텍사스는 주의 분산 운전에 관한 무료 온라인 교육인 Impact Texas Drivers(iTD) 과정 이수를 요구합니다.",
      "텍사스는 25세 미만 운전자에게 30시간의 이론 교육과 44시간의 실습 운전 교육을 요구합니다.",
      "18세 미만 임시 면허 소지자는 자정부터 오전 5시까지 운전할 수 없고 21세 미만 승객을 1명 넘게 태울 수 없습니다."
    ],
    neighboringSlugs: ["new-mexico", "oklahoma", "arkansas", "louisiana"],
    onlineTestInfo: "네. 텍사스에서는 25세 미만 최초 신청자에 한해 승인된 운전 교육 과정 제공업체를 통해 온라인으로 필기시험을 볼 수 있습니다."
  },
  PA: {
    retakeWaitTime: "1일",
    retakeInfo: "펜실베이니아 필기시험에 불합격하면 다음 영업일에 아무 PennDOT 운전면허 센터에서나 다시 응시할 수 있습니다.",
    handbookUrl: "https://www.dot.state.pa.us/Public/DVSPubsForms/BDL/BDL%20Manuals/Manuals/PA%20Drivers%20Manual%20By%20Chapter/English/PUB%2095.pdf",
    handbookName: "Pennsylvania Driver's Manual",
    notableRules: [
      "펜실베이니아 필기시험은 18문제로 전국에서 가장 적으며, 합격하려면 83%(15문제)를 맞혀야 합니다.",
      "임시 면허 소지자는 65시간의 보호자 동반 운전(야간 10시간, 악천후 5시간)을 기록해야 하며, 전국에서 가장 세부적인 요건 중 하나입니다.",
      "주니어 면허 소지자는 오후 11시부터 오전 5시까지 운전할 수 없습니다."
    ],
    neighboringSlugs: ["new-york", "new-jersey", "delaware", "maryland", "ohio"],
    onlineTestInfo: "아니요. 펜실베이니아 PennDOT 필기시험은 운전면허 센터를 직접 방문해서 봐야 합니다."
  }
};

export function getStateLandingInfoKo(code: string): StateLandingInfo | undefined {
  return stateLandingDataKo[code];
}
