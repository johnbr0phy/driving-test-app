import { StateLandingInfo } from "./stateLandingData";

// Simplified Chinese (简体中文) landing-page copy for Tigertest. Coverage is
// intentionally limited to the states listed in zhStates.ts. Only the same
// fields the Korean and Vietnamese mirrors translate are localized here
// (retakeWaitTime, retakeInfo, notableRules, onlineTestInfo,
// examManualChapters); handbook names/URLs, state names, and neighboringSlugs
// stay in their standard English forms. The copy is machine-translated and
// pending native review.
export const stateLandingDataZh: Record<string, StateLandingInfo> = {
  CA: {
    retakeWaitTime: "7天",
    retakeInfo: "如果您没有通过加州笔试，第二次考试前需要等待7天，第三次考试前还要再等7天。3次不及格后，您必须重新申请并再次缴纳申请费。",
    handbookUrl: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/",
    handbookName: "California Driver Handbook",
    notableRules: [
      "加州要求在参加路考之前完成50小时有人监督的驾驶练习（其中10小时为夜间驾驶）。",
      "18岁以下的临时驾照持有人在前12个月内不得搭载20岁以下的乘客，除非有25岁或以上的持照驾驶人陪同。",
      "加州笔试共46道题，是全美各州中题目最多的，您需要答对39题（83%）才能通过。"
    ],
    neighboringSlugs: ["oregon", "nevada", "arizona"],
    onlineTestInfo: "不可以。加州DMV笔试必须亲自到DMV办公室参加。您可以在网上预约，以缩短等候时间。"
  },
  NY: {
    retakeWaitTime: "1天",
    retakeInfo: "如果您没有通过纽约州笔试，可以在下一个工作日到任何一家DMV办公室重考。如果时间允许，部分办公室也可能允许当天重考。",
    handbookUrl: "https://dmv.ny.gov/driver-license/drivers-manual",
    handbookName: "New York State Driver's Manual",
    notableRules: [
      "纽约州的知识考试只有20道题（其中4道关于道路标志），70%即可通过，是题目最少、及格线最低的州之一。",
      "纽约州DMV考试提供14种以上的语言，比大多数其他州都多。",
      "18岁以下的初级驾照持有人在驾驶地区和时段上有限制，具体规定因地区而异。"
    ],
    neighboringSlugs: ["new-jersey", "pennsylvania", "connecticut", "massachusetts", "vermont"],
    onlineTestInfo: "不可以。纽约州DMV知识考试必须亲自到DMV办公室参加。",
    examManualChapters: "根据纽约州DMV的说明，笔试内容出自New York State Driver's Manual的第4章至第11章，涵盖交通标志、信号和车道标线，路口与转弯，安全驾驶与超车技巧，防御性驾驶，与其他道路使用者共享道路，酒精和其他药物的影响，停车规定以及紧急情况的处理。Tigertest的200道纽约州练习题也是根据同样的资料编写的，因此答错的题目都可以直接对照官方手册查证。"
  },
  NJ: {
    retakeWaitTime: "14天",
    retakeInfo: "如果您没有通过新泽西州笔试，必须等待至少14天才能重考，这是全美最长的等待期。",
    handbookUrl: "https://www.nj.gov/mvc/pdf/license/drivermanual.pdf",
    handbookName: "New Jersey Driver Manual",
    notableRules: [
      "新泽西州实行全美最严格的分级驾照（GDL）制度：所有新驾驶人（包括成年人）都必须在车牌上贴红色标贴。",
      "新泽西州笔试共50道题，需要达到80%才能通过。",
      "GDL临时驾照持有人不得在晚上11:01至早上5:00之间驾驶，并且只能搭载1名额外乘客。"
    ],
    neighboringSlugs: ["new-york", "pennsylvania", "delaware"],
    onlineTestInfo: "不可以。新泽西州MVC知识考试必须亲自到MVC办事处参加。"
  },
  MA: {
    retakeWaitTime: "1天",
    retakeInfo: "如果您没有通过马萨诸塞州笔试，可以在下一个工作日到任何一个RMV服务点重考。",
    handbookUrl: "https://www.mass.gov/lists/drivers-manuals",
    handbookName: "Massachusetts Driver's Manual",
    notableRules: [
      "马萨诸塞州的及格分数只需72%，是全美最低的。",
      "18岁以下的驾驶人持有青少年驾照（JOL），在搭载乘客和夜间驾驶方面有限制。",
      "JOL持有人不得在凌晨12:30至早上5:00之间驾驶，并且在前6个月内不得搭载18岁以下的乘客（兄弟姐妹除外）。"
    ],
    neighboringSlugs: ["connecticut", "rhode-island", "new-hampshire", "new-york", "vermont"],
    onlineTestInfo: "不可以。马萨诸塞州RMV知识考试必须亲自到RMV服务中心参加。"
  },
  WA: {
    retakeWaitTime: "1天",
    retakeInfo: "如果您没有通过华盛顿州笔试，可以在下一个工作日到任何一家DOL办公室重考。",
    handbookUrl: "https://www.dol.wa.gov/driver-licenses-permits-ids/drivers-guide",
    handbookName: "Washington Driver Guide",
    notableRules: [
      "华盛顿州要求所有18岁以下的新驾驶人持有中级驾照（IDL），并对搭载乘客和夜间驾驶有限制。",
      "临时驾照持有人必须持证至少6个月，并完成经批准的驾驶培训。",
      "华盛顿州要求至少50小时有人监督的驾驶练习（其中10小时为夜间驾驶）。"
    ],
    neighboringSlugs: ["oregon", "idaho"],
    onlineTestInfo: "不可以。华盛顿州DOL知识考试必须亲自到DOL办公室或经批准的考试地点参加。"
  },
  PA: {
    retakeWaitTime: "1天",
    retakeInfo: "如果您没有通过宾夕法尼亚州笔试，可以在下一个工作日到任何一个PennDOT驾照中心重考。",
    handbookUrl: "https://www.dot.state.pa.us/Public/DVSPubsForms/BDL/BDL%20Manuals/Manuals/PA%20Drivers%20Manual%20By%20Chapter/English/PUB%2095.pdf",
    handbookName: "Pennsylvania Driver's Manual",
    notableRules: [
      "宾夕法尼亚州笔试只有18道题，是全美各州中最少的，需要达到83%（答对15题）才能通过。",
      "临时驾照持有人必须记录65小时有人监督的驾驶（其中10小时为夜间驾驶，5小时在恶劣天气下驾驶），这是全美最详细的要求之一。",
      "初级驾照持有人不得在晚上11:00至早上5:00之间驾驶。"
    ],
    neighboringSlugs: ["new-york", "new-jersey", "delaware", "maryland", "ohio"],
    onlineTestInfo: "不可以。宾夕法尼亚州PennDOT知识考试必须亲自到驾照中心参加。"
  },
  MD: {
    retakeWaitTime: "7天",
    retakeInfo: "如果您没有通过马里兰州笔试，必须等待7天才能重考。多次不及格后，可能还需要额外的等待期。",
    handbookUrl: "https://mva.maryland.gov/pages/driver-manuals.aspx",
    handbookName: "Maryland Driver's Manual",
    notableRules: [
      "马里兰州的及格分数为85%，是全美最高的之一。",
      "临时驾照申请人必须年满15岁9个月，这是一个不常见的年龄要求。",
      "马里兰州要求在参加路考之前完成60小时有人监督的驾驶（其中10小时为夜间驾驶）。"
    ],
    neighboringSlugs: ["delaware", "pennsylvania", "virginia", "west-virginia", "district-of-columbia"],
    onlineTestInfo: "不可以。马里兰州知识考试必须亲自到MVA办公室参加。考试提供多种语言版本。"
  },
  VA: {
    retakeWaitTime: "15天",
    retakeInfo: "如果您没有通过弗吉尼亚州笔试，必须等待15天才能重考，这是全美最长的等待期之一。",
    handbookUrl: "https://www.dmv.virginia.gov/drivers/manuals.asp",
    handbookName: "Virginia Driver's Manual",
    notableRules: [
      "弗吉尼亚州要求临时驾照持有人在参加路考前持证至少9个月。",
      "弗吉尼亚州要求45小时有人监督的驾驶（其中15小时为夜间驾驶），是夜间驾驶时数要求最多的州之一。",
      "弗吉尼亚州的学习驾照最早可在15岁6个月时申请，并且必须先通过笔试才能领取。"
    ],
    neighboringSlugs: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "north-carolina"],
    onlineTestInfo: "不可以。弗吉尼亚州DMV知识考试必须亲自到DMV客户服务中心参加。"
  }
};

export function getStateLandingInfoZh(code: string): StateLandingInfo | undefined {
  return stateLandingDataZh[code];
}
