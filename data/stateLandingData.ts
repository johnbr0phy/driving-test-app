export interface StateLandingInfo {
  retakeWaitTime: string;
  retakeInfo: string;
  handbookUrl: string;
  handbookName: string;
  notableRules: string[];
  neighboringSlugs: string[];
  onlineTestInfo: string;
  // Optional: which chapters of the official manual the written test draws
  // from. When present, the state page renders a manual-citation block that
  // anchors TigerTest to the official source (GEO/authority signal).
  examManualChapters?: string;
}

export const stateLandingData: Record<string, StateLandingInfo> = {
  AL: {
    retakeWaitTime: "Next business day",
    retakeInfo: "If you fail the Alabama written test, you can retake it the next business day. There is no limit on the number of attempts, but you must pay the testing fee each time.",
    handbookUrl: "https://www.alea.gov/dps/driver-license/driver-manual",
    handbookName: "Alabama Driver Manual",
    notableRules: [
      "Alabama uses a Graduated Driver License (GDL) system for drivers under 18, with restrictions on nighttime driving and passengers.",
      "New drivers under 18 cannot have more than 1 non-family passenger under 21 for the first 6 months.",
      "All permit holders under 18 must complete a minimum of 30 hours of supervised driving practice, including 4 hours at night."
    ],
    neighboringSlugs: ["mississippi", "tennessee", "georgia", "florida"],
    onlineTestInfo: "No, the Alabama written knowledge test must be taken in person at an ALEA driver license office. You cannot take the permit test online."
  },
  AK: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Alaska written test, you can retake it the following day. You will need to pay the testing fee again for each attempt.",
    handbookUrl: "https://doa.alaska.gov/dmv/dlmanual/dlman.pdf",
    handbookName: "Alaska Driver Manual",
    notableRules: [
      "Alaska allows learner's permits at age 14, one of the youngest ages in the country.",
      "Permit holders under 18 must hold the permit for at least 6 months before taking the road test.",
      "New drivers under 18 have a curfew restriction and cannot drive between 1:00 AM and 5:00 AM."
    ],
    neighboringSlugs: ["washington", "hawaii"],
    onlineTestInfo: "No, Alaska does not offer the written knowledge test online. You must visit a DMV office in person to take the test."
  },
  AZ: {
    retakeWaitTime: "Next business day",
    retakeInfo: "If you fail the Arizona written test, you can return the next business day to retake it. After 3 failures, you may need to wait 30 days before trying again.",
    handbookUrl: "https://azdot.gov/mvd/driver-services/driver-license-information/arizona-driver-license-manual",
    handbookName: "Arizona Driver License Manual",
    notableRules: [
      "Arizona driver licenses do not expire until age 65 — one of the longest validity periods in the U.S.",
      "Arizona's Graduated Driver License restricts passengers under 18 and nighttime driving for the first 6 months.",
      "Arizona prohibits handheld cell phone use while driving for all drivers."
    ],
    neighboringSlugs: ["california", "nevada", "utah", "new-mexico", "colorado"],
    onlineTestInfo: "No, the Arizona MVD written test must be taken in person at an MVD office or authorized third-party testing location."
  },
  AR: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Arkansas written test, you can retake it the next day. You must pay the testing fee each time you take the test.",
    handbookUrl: "https://www.dfa.arkansas.gov/driver-services/driver-license/study-materials/",
    handbookName: "Arkansas Driver License Study Guide",
    notableRules: [
      "Arkansas allows learner's permits at age 14 with a parent or guardian's consent.",
      "Permit holders under 18 must complete a driver education course and log supervised driving hours.",
      "Intermediate license holders under 18 cannot drive between 11:00 PM and 4:00 AM except for work or emergencies."
    ],
    neighboringSlugs: ["missouri", "tennessee", "mississippi", "louisiana", "texas", "oklahoma"],
    onlineTestInfo: "No, the Arkansas written knowledge test must be taken in person at a DFA Revenue Office."
  },
  CA: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the California written test, you must wait 7 days before your second attempt and another 7 days before your third. After 3 failures, you must reapply and pay the application fee again.",
    handbookUrl: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/",
    handbookName: "California Driver Handbook",
    notableRules: [
      "California requires 50 hours of supervised driving practice (10 hours at night) before taking the road test.",
      "Provisional license holders under 18 cannot carry passengers under 20 for the first 12 months unless accompanied by a licensed driver 25 or older.",
      "California's written test has 46 questions — the most among all states — and you need to answer 39 correctly (83%) to pass."
    ],
    neighboringSlugs: ["oregon", "nevada", "arizona"],
    onlineTestInfo: "No, the California DMV written test must be taken in person at a DMV office. You can make an appointment online to reduce wait times."
  },
  CO: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Colorado written test, you can retake it the next business day. There is no limit to the number of attempts.",
    handbookUrl: "https://dmv.colorado.gov/driver-guide",
    handbookName: "Colorado Driver Handbook",
    notableRules: [
      "Colorado requires permit holders under 16 to hold their permit for 12 months before taking the road test.",
      "Minor drivers have a nighttime curfew: no driving between midnight and 5:00 AM for the first year.",
      "Colorado requires all permit holders under 18 to complete 50 hours of supervised driving (10 hours at night)."
    ],
    neighboringSlugs: ["wyoming", "nebraska", "kansas", "new-mexico", "utah"],
    onlineTestInfo: "No, the Colorado written knowledge test must be taken in person at a DMV office or driver license office."
  },
  CT: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Connecticut written test, you can retake it as early as the next business day at any DMV branch office.",
    handbookUrl: "https://portal.ct.gov/dmv/licenses/license-manuals",
    handbookName: "Connecticut Driver's Manual",
    notableRules: [
      "Connecticut requires learner's permit holders under 18 to complete a minimum of 40 hours of supervised driving (8 hours at night).",
      "New drivers under 18 may not carry passengers (other than parents or a driving instructor) for the first 6 months.",
      "Connecticut requires all permit holders to wait at least 120 days before scheduling a road test."
    ],
    neighboringSlugs: ["new-york", "massachusetts", "rhode-island"],
    onlineTestInfo: "No, the Connecticut DMV written test must be taken in person at a DMV office."
  },
  DE: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Delaware written test, you must wait 7 days before retaking it. You will need to pay the test fee again.",
    handbookUrl: "https://www.dmv.de.gov/driver-services/licenses/delaware-driver-manual",
    handbookName: "Delaware Driver Manual",
    notableRules: [
      "Delaware requires learner's permit holders to be at least 16 years old.",
      "Permit holders must complete a minimum of 50 hours of supervised driving practice (10 at night) before testing.",
      "New drivers under 18 cannot carry more than 1 passenger under 18 who is not a family member for the first 6 months."
    ],
    neighboringSlugs: ["maryland", "pennsylvania", "new-jersey"],
    onlineTestInfo: "No, the Delaware DMV written test must be taken in person at a DMV office."
  },
  DC: {
    retakeWaitTime: "3 days",
    retakeInfo: "If you fail the DC written test, you must wait at least 3 days before retaking it. After 6 failed attempts, you may be required to complete a driver education course.",
    handbookUrl: "https://dmv.dc.gov/page/driver-knowledge-test",
    handbookName: "DC Driver Knowledge Test Guide",
    notableRules: [
      "DC requires learner's permit holders to be at least 16 years old.",
      "Permit holders must complete an approved driver education course before scheduling the road test.",
      "Provisional license holders under 21 cannot drive between midnight and 6:00 AM."
    ],
    neighboringSlugs: ["maryland", "virginia"],
    onlineTestInfo: "No, the DC DMV knowledge test must be taken in person at a DC DMV service center."
  },
  FL: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Florida written test, you can retake it the next business day. You must pay the test fee each time.",
    handbookUrl: "https://www.flhsmv.gov/driver-licenses-id-cards/handbooks-manuals/",
    handbookName: "Florida Driver's Handbook",
    notableRules: [
      "Florida requires completion of a Traffic Law and Substance Abuse Education (TLSAE) course before getting a learner's permit.",
      "Florida's written test has 50 questions — one of the longest in the nation — and requires 80% to pass.",
      "Drivers under 18 cannot drive between 11:00 PM and 6:00 AM (or 1:00 AM to 5:00 AM with a valid work permit)."
    ],
    neighboringSlugs: ["georgia", "alabama"],
    onlineTestInfo: "No, the Florida Class E knowledge exam must be taken in person at a FLHSMV office or authorized testing center. The TLSAE course can be completed online."
  },
  GA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Georgia written test, you can retake it the following business day. There is a fee for each retake attempt.",
    handbookUrl: "https://dds.georgia.gov/drivers-manual",
    handbookName: "Georgia DDS Driver's Manual",
    notableRules: [
      "Georgia's Joshua's Law requires drivers under 18 to complete 40 hours of supervised driving (6 hours at night).",
      "Georgia requires a passing score of only 75%, the lowest threshold among most states.",
      "Drivers under 18 cannot carry more than 3 passengers under 21 who are not family members for the first 6 months."
    ],
    neighboringSlugs: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
    onlineTestInfo: "No, the Georgia DDS knowledge test must be taken in person at a DDS customer service center."
  },
  HI: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Hawaii written test, you must wait 7 days before taking it again. You must pay the test fee for each attempt.",
    handbookUrl: "https://hidot.hawaii.gov/highways/home/driver-licensing/hawaii-drivers-manual/",
    handbookName: "Hawaii Driver's Manual",
    notableRules: [
      "Hawaii requires permit holders to hold their permit for at least 180 days before taking the road test.",
      "New drivers under 18 cannot drive between 11:00 PM and 5:00 AM unless traveling to or from work.",
      "Hawaii allows learner's permits starting at age 15 years and 6 months."
    ],
    neighboringSlugs: ["california"],
    onlineTestInfo: "No, the Hawaii written knowledge test must be taken in person at a county driver licensing office."
  },
  ID: {
    retakeWaitTime: "3 days",
    retakeInfo: "If you fail the Idaho written test, you must wait 3 business days before retaking. You must pay the test fee each time.",
    handbookUrl: "https://itd.idaho.gov/drive/manuals/",
    handbookName: "Idaho Driver's Manual",
    notableRules: [
      "Idaho requires a passing score of 85%, one of the highest thresholds in the country.",
      "Idaho allows learner's permits at 14 years and 6 months with a completed driver education course.",
      "Supervised instruction permit holders must complete driver training, including 50 hours of practice driving (10 at night)."
    ],
    neighboringSlugs: ["montana", "wyoming", "utah", "nevada", "oregon", "washington"],
    onlineTestInfo: "No, the Idaho knowledge test must be taken in person at an Idaho Transportation Department office."
  },
  IL: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Illinois written test, you can retake it the next business day at any Secretary of State facility.",
    handbookUrl: "https://www.ilsos.gov/publications/pdf_publications/dsd_a112.pdf",
    handbookName: "Illinois Rules of the Road",
    notableRules: [
      "Illinois requires permit holders under 18 to hold their permit for at least 9 months before testing.",
      "Drivers under 18 cannot drive between 10:00 PM (11:00 PM on weekends) and 6:00 AM.",
      "All Illinois drivers must pass a vision screening at each license renewal."
    ],
    neighboringSlugs: ["indiana", "wisconsin", "iowa", "missouri", "kentucky"],
    onlineTestInfo: "No, the Illinois written test must be taken in person at a Secretary of State driver services facility."
  },
  IN: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Indiana written test, you can retake it the following business day. Each attempt requires payment of the test fee.",
    handbookUrl: "https://www.in.gov/bmv/licenses-permits-ids/files/drivers-manual.pdf",
    handbookName: "Indiana Driver's Manual",
    notableRules: [
      "Indiana requires permit holders to log 50 hours of supervised driving (10 hours at night) before the road test.",
      "Drivers under 18 with a probationary license cannot drive between 10:00 PM and 5:00 AM except for work or school.",
      "Indiana allows learner's permits at age 15 with enrollment in a certified driver education course."
    ],
    neighboringSlugs: ["illinois", "michigan", "ohio", "kentucky"],
    onlineTestInfo: "Indiana offers the written knowledge test at BMV branches. Some approved driver education courses include online components, but the official knowledge exam is taken in person."
  },
  IA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Iowa written test, you can retake it the following business day. There is no additional fee for retakes within the permit application period.",
    handbookUrl: "https://iowadot.gov/mvd/driverslicense/manual",
    handbookName: "Iowa Driver's Manual",
    notableRules: [
      "Iowa allows learner's permits at age 14, one of the youngest minimum ages in the U.S.",
      "Iowa's knowledge test has 35 questions, and you must answer 28 correctly (80%) to pass.",
      "Intermediate license holders under 18 are restricted from driving between 12:30 AM and 5:00 AM."
    ],
    neighboringSlugs: ["minnesota", "wisconsin", "illinois", "missouri", "nebraska", "south-dakota"],
    onlineTestInfo: "Iowa does offer an online option for the knowledge test through some approved driver education providers. Check with your local DOT office for availability."
  },
  KS: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Kansas written test, you can retake it the following business day at any driver's license office.",
    handbookUrl: "https://www.ksrevenue.gov/dovmanuals.html",
    handbookName: "Kansas Driving Handbook",
    notableRules: [
      "Kansas allows learner's permits at age 14, one of the youngest ages in the country.",
      "Restricted license holders under 16 cannot drive between 9:00 PM and 5:00 AM.",
      "Kansas requires permit holders under 16 to hold their permit for 12 months before upgrading."
    ],
    neighboringSlugs: ["nebraska", "missouri", "oklahoma", "colorado"],
    onlineTestInfo: "No, the Kansas knowledge test must be taken in person at a Kansas driver's license office."
  },
  KY: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Kentucky written test, you must wait 7 days before you can retake it. You must pay the test fee for each attempt.",
    handbookUrl: "https://drive.ky.gov/driver-licensing/Pages/Driver-Manual.aspx",
    handbookName: "Kentucky Driver Manual",
    notableRules: [
      "Kentucky requires permit holders to hold their permit for at least 180 days before taking the road test.",
      "Drivers under 18 have a nighttime curfew and cannot drive between midnight and 6:00 AM.",
      "Kentucky requires 60 hours of supervised driving practice (10 hours at night) before the road test."
    ],
    neighboringSlugs: ["indiana", "ohio", "west-virginia", "virginia", "tennessee"],
    onlineTestInfo: "No, the Kentucky written knowledge test must be taken in person at a circuit clerk's office."
  },
  LA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Louisiana written test, you can retake it the following business day at any OMV office.",
    handbookUrl: "https://www.expresslane.org/Pages/Driver-Guide.aspx",
    handbookName: "Louisiana Driver's Guide",
    notableRules: [
      "Louisiana requires all first-time drivers under 18 to complete a state-approved driver education course.",
      "Permit holders must hold the permit for at least 180 days before taking the road test.",
      "Intermediate license holders under 17 cannot drive between 11:00 PM and 5:00 AM."
    ],
    neighboringSlugs: ["texas", "arkansas", "mississippi"],
    onlineTestInfo: "No, the Louisiana knowledge test must be taken in person at an Office of Motor Vehicles (OMV) location."
  },
  ME: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Maine written test, you can retake it the following business day. The test fee applies each time.",
    handbookUrl: "https://www.maine.gov/sos/bmv/licenses/motorist-handbook.html",
    handbookName: "Maine Motorist Handbook and Study Guide",
    notableRules: [
      "Maine requires permit holders under 18 to hold their permit for at least 6 months before taking the road test.",
      "New drivers under 21 may not carry passengers under 20 (other than family) for the first 270 days.",
      "Maine requires 70 hours of supervised driving (10 hours at night) — one of the highest in the nation."
    ],
    neighboringSlugs: ["new-hampshire", "massachusetts", "vermont"],
    onlineTestInfo: "No, the Maine knowledge test must be taken in person at a BMV office."
  },
  MD: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Maryland written test, you must wait 7 days before retaking it. After multiple failures, an additional wait period may apply.",
    handbookUrl: "https://mva.maryland.gov/pages/driver-manuals.aspx",
    handbookName: "Maryland Driver's Manual",
    notableRules: [
      "Maryland requires a passing score of 85%, one of the highest thresholds in the country.",
      "Permit holders must be at least 15 years and 9 months old — an unusual age requirement.",
      "Maryland requires 60 hours of supervised driving (10 at night) before taking the road test."
    ],
    neighboringSlugs: ["delaware", "pennsylvania", "virginia", "west-virginia", "district-of-columbia"],
    onlineTestInfo: "No, the Maryland knowledge test must be taken in person at an MVA office. The test is available in multiple languages."
  },
  MA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Massachusetts written test, you can retake it the next business day at any RMV location.",
    handbookUrl: "https://www.mass.gov/lists/drivers-manuals",
    handbookName: "Massachusetts Driver's Manual",
    notableRules: [
      "Massachusetts requires a passing score of only 72%, the lowest in the country.",
      "Drivers under 18 hold a Junior Operator License (JOL) with restrictions on passengers and nighttime driving.",
      "JOL holders cannot drive between 12:30 AM and 5:00 AM and cannot carry passengers under 18 (except siblings) for the first 6 months."
    ],
    neighboringSlugs: ["connecticut", "rhode-island", "new-hampshire", "new-york", "vermont"],
    onlineTestInfo: "No, the Massachusetts RMV knowledge test must be taken in person at an RMV service center."
  },
  MI: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Michigan written test, you can retake it the following business day at any Secretary of State branch office.",
    handbookUrl: "https://www.michigan.gov/sos/resources/read-the-drivers-manual",
    handbookName: "What Every Driver Must Know (Michigan)",
    notableRules: [
      "Michigan uses a two-level graduated licensing system (Level 1 and Level 2) for drivers under 18.",
      "Michigan's knowledge test has 50 questions, one of the longest in the nation.",
      "Level 1 (permit) holders must log 50 hours of supervised driving (10 at night) and hold the permit for at least 180 days."
    ],
    neighboringSlugs: ["ohio", "indiana", "wisconsin"],
    onlineTestInfo: "No, the Michigan knowledge test must be taken in person at a Secretary of State branch office."
  },
  MN: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Minnesota written test, you can retake it the following business day at any DVS exam station.",
    handbookUrl: "https://dps.mn.gov/divisions/dvs/forms-documents/Pages/drivers-manual.aspx",
    handbookName: "Minnesota Driver's Manual",
    notableRules: [
      "Minnesota prohibits all cell phone use (handheld and hands-free) for drivers under 18.",
      "Provisional license holders under 18 cannot drive between midnight and 5:00 AM for the first 6 months.",
      "Minnesota requires permit holders to hold the permit for at least 6 months and complete 40 hours of supervised driving."
    ],
    neighboringSlugs: ["wisconsin", "iowa", "south-dakota", "north-dakota"],
    onlineTestInfo: "Minnesota offers a Class D knowledge test online through an approved pilot program at some exam stations. Check DVS for current availability."
  },
  MS: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Mississippi written test, you can retake it the following business day.",
    handbookUrl: "https://www.dps.ms.gov/driver-services/new-licenses",
    handbookName: "Mississippi Driver's Manual",
    notableRules: [
      "Mississippi allows learner's permits at age 15 with parental consent.",
      "Intermediate license holders under 16 cannot drive between 10:00 PM and 6:00 AM.",
      "Mississippi requires permit holders to hold the permit for at least 12 months before testing for a full license."
    ],
    neighboringSlugs: ["alabama", "tennessee", "arkansas", "louisiana"],
    onlineTestInfo: "No, the Mississippi knowledge test must be taken in person at a DPS driver license office."
  },
  MO: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Missouri written test, you can retake it the next business day at any license office.",
    handbookUrl: "https://dor.mo.gov/driver-license/manuals/",
    handbookName: "Missouri Driver Guide",
    notableRules: [
      "Missouri requires permit holders to hold their permit for at least 182 days before taking the road test.",
      "Intermediate license holders under 18 cannot drive between 1:00 AM and 5:00 AM.",
      "Missouri requires 40 hours of supervised driving (10 at night) before the road test."
    ],
    neighboringSlugs: ["iowa", "illinois", "kentucky", "tennessee", "arkansas", "kansas"],
    onlineTestInfo: "No, the Missouri knowledge test must be taken in person at a license office."
  },
  MT: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Montana written test, you can retake it the following business day.",
    handbookUrl: "https://dojmt.gov/driving/driver-licensing/",
    handbookName: "Montana Driver Manual",
    notableRules: [
      "Montana requires a passing score of 82%, slightly above the national average.",
      "Montana allows learner's permits at 14 years and 6 months with a completed driver education course.",
      "Montana does not have a statewide handheld cell phone ban for adult drivers, though texting while driving is prohibited."
    ],
    neighboringSlugs: ["north-dakota", "south-dakota", "wyoming", "idaho"],
    onlineTestInfo: "No, the Montana knowledge test must be taken in person at a Montana Motor Vehicle Division office."
  },
  NE: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Nebraska written test, you can retake it the next business day. A fee applies for each attempt.",
    handbookUrl: "https://dmv.nebraska.gov/dl/drivers-manuals",
    handbookName: "Nebraska Driver's Manual",
    notableRules: [
      "Nebraska allows learner's permits (Provisional Operator's Permit) at age 14.",
      "POP holders must be accompanied by a licensed driver who is at least 21 years old.",
      "Nebraska requires drivers under 18 to complete driver education and log supervised driving hours."
    ],
    neighboringSlugs: ["south-dakota", "iowa", "missouri", "kansas", "colorado", "wyoming"],
    onlineTestInfo: "No, the Nebraska knowledge test must be taken in person at a DMV office."
  },
  NV: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Nevada written test, you must wait 7 days before retaking it. After 3 failures, you may need to wait 6 months.",
    handbookUrl: "https://dmvnv.com/dlstudyguide.htm",
    handbookName: "Nevada Driver's Handbook",
    notableRules: [
      "Nevada's written test has 50 questions and requires an 80% passing score.",
      "Permit holders must hold the permit for at least 6 months and log 50 hours of supervised driving (10 at night).",
      "Nevada prohibits all handheld cell phone use while driving, including at red lights."
    ],
    neighboringSlugs: ["california", "oregon", "idaho", "utah", "arizona"],
    onlineTestInfo: "No, the Nevada DMV knowledge test must be taken in person at a DMV office."
  },
  NH: {
    retakeWaitTime: "10 days",
    retakeInfo: "If you fail the New Hampshire written test, you must wait 10 days before retaking it.",
    handbookUrl: "https://www.dmv.nh.gov/driver-licensing/drivers-manuals",
    handbookName: "New Hampshire Driver's Manual",
    notableRules: [
      "New Hampshire is the only state that does not require adult drivers to wear seat belts (though drivers under 18 must).",
      "Permit holders must hold the permit for at least 40 days before the road test.",
      "New drivers under 18 have passenger restrictions for the first 6 months of licensure."
    ],
    neighboringSlugs: ["maine", "vermont", "massachusetts"],
    onlineTestInfo: "No, the New Hampshire DMV knowledge test must be taken in person at a DMV office."
  },
  NJ: {
    retakeWaitTime: "14 days",
    retakeInfo: "If you fail the New Jersey written test, you must wait at least 14 days before retaking it — the longest wait in the country.",
    handbookUrl: "https://www.nj.gov/mvc/pdf/license/drivermanual.pdf",
    handbookName: "New Jersey Driver Manual",
    notableRules: [
      "New Jersey has the strictest GDL program: all new drivers (including adults) must display red decals on their license plates.",
      "New Jersey's written test has 50 questions, requiring 80% to pass.",
      "GDL permit holders cannot drive between 11:01 PM and 5:00 AM and can only have 1 additional passenger."
    ],
    neighboringSlugs: ["new-york", "pennsylvania", "delaware"],
    onlineTestInfo: "No, the New Jersey MVC knowledge test must be taken in person at an MVC agency."
  },
  NM: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the New Mexico written test, you can retake it the following business day.",
    handbookUrl: "https://www.mvd.newmexico.gov/drivers/driver-manuals/",
    handbookName: "New Mexico Driver Manual",
    notableRules: [
      "New Mexico allows learner's permits at age 15 with parent consent.",
      "Permit holders must hold the permit for at least 6 months and log supervised driving hours.",
      "Provisional license holders cannot drive between midnight and 5:00 AM and are limited to 1 passenger under 21."
    ],
    neighboringSlugs: ["arizona", "utah", "colorado", "oklahoma", "texas"],
    onlineTestInfo: "No, the New Mexico MVD knowledge test must be taken in person at an MVD field office."
  },
  NY: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the New York written test, you can retake it the following business day at any DMV office. Some offices may allow a same-day retake if time permits.",
    handbookUrl: "https://dmv.ny.gov/driver-license/drivers-manual",
    handbookName: "New York State Driver's Manual",
    notableRules: [
      "New York's knowledge test has only 20 questions (with 4 on road signs), requiring 70% to pass — one of the shortest and lowest thresholds.",
      "The DMV test is available in 14+ languages, more than most other states.",
      "Junior license holders (under 18) have geographic and time-of-day restrictions that vary by region."
    ],
    neighboringSlugs: ["new-jersey", "pennsylvania", "connecticut", "massachusetts", "vermont"],
    onlineTestInfo: "No, the New York DMV knowledge test must be taken in person at a DMV office.",
    examManualChapters: "According to the New York State DMV, the material on the written knowledge test is drawn from Chapters 4 through 11 of the New York State Driver's Manual — covering traffic signs, signals and lane markings, intersections and turns, safe driving and passing techniques, defensive driving, sharing the road, the effects of alcohol and other drugs, parking rules, and handling emergencies. TigerTest's 200 New York practice questions are built from this same material, so anything you miss can be cross-checked directly against the official manual."
  },
  NC: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the North Carolina written test, you can retake it the following business day at any DMV office.",
    handbookUrl: "https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/handbook.aspx",
    handbookName: "North Carolina Driver's Handbook",
    notableRules: [
      "North Carolina requires permit holders under 18 to hold the permit for at least 12 months — one of the longest holding periods.",
      "Limited provisional license holders cannot drive between 9:00 PM and 5:00 AM for the first 6 months.",
      "All permit applicants under 18 must have a parent or guardian sign the application."
    ],
    neighboringSlugs: ["virginia", "tennessee", "georgia", "south-carolina"],
    onlineTestInfo: "No, the North Carolina DMV knowledge test must be taken in person at a DMV office."
  },
  ND: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the North Dakota written test, you can retake it the next business day.",
    handbookUrl: "https://www.dot.nd.gov/divisions/driverslicense/manuals.htm",
    handbookName: "North Dakota Non-Commercial Drivers License Manual",
    notableRules: [
      "North Dakota allows learner's permits at age 14, one of the youngest ages in the country.",
      "Permit holders under 16 must complete a state-approved driver education course.",
      "North Dakota is one of the least populated states, but still requires full knowledge testing for all permit applicants."
    ],
    neighboringSlugs: ["montana", "south-dakota", "minnesota"],
    onlineTestInfo: "No, the North Dakota knowledge test must be taken in person at a DOT driver's license site."
  },
  OH: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Ohio written test, you can retake it the next business day at any BMV deputy registrar location.",
    handbookUrl: "https://www.bmv.ohio.gov/dl-manuals.aspx",
    handbookName: "Ohio's Digest of Motor Vehicle Laws",
    notableRules: [
      "Ohio requires a passing score of only 75%, one of the lowest in the nation.",
      "Temporary permit holders must hold the permit for at least 6 months and log 50 hours of supervised driving (10 at night).",
      "Ohio has a probationary license period for drivers under 18 with nighttime and passenger restrictions."
    ],
    neighboringSlugs: ["michigan", "indiana", "kentucky", "west-virginia", "pennsylvania"],
    onlineTestInfo: "No, the Ohio BMV knowledge test must be taken in person at a deputy registrar location."
  },
  OK: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Oklahoma written test, you can retake it the following business day at a DPS testing location.",
    handbookUrl: "https://oklahoma.gov/dps/obtain-a-driver-license-id-card/handbooks.html",
    handbookName: "Oklahoma Driver's Manual",
    notableRules: [
      "Oklahoma's written test has 50 questions, one of the longest in the country.",
      "Learner's permit holders must be at least 15 years and 6 months old.",
      "Intermediate license holders under 16 and a half cannot drive between 10:00 PM and 5:00 AM."
    ],
    neighboringSlugs: ["kansas", "missouri", "arkansas", "texas", "new-mexico", "colorado"],
    onlineTestInfo: "No, the Oklahoma DPS knowledge test must be taken in person at a DPS driver license examination site."
  },
  OR: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Oregon written test, you can retake it the next business day. After 3 failures, you may need to wait longer.",
    handbookUrl: "https://www.oregon.gov/odot/dmv/pages/driverid/manual.aspx",
    handbookName: "Oregon Driver Manual",
    notableRules: [
      "Oregon prohibits self-service gasoline (drivers cannot pump their own gas in most areas).",
      "Permit holders must log 50 hours of supervised driving (10 at night) and hold the permit for at least 6 months.",
      "Provisional license holders under 18 cannot carry passengers under 20 for the first 6 months."
    ],
    neighboringSlugs: ["washington", "idaho", "nevada", "california"],
    onlineTestInfo: "No, the Oregon DMV knowledge test must be taken in person at a DMV office."
  },
  PA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Pennsylvania written test, you can retake it the next business day at any PennDOT driver license center.",
    handbookUrl: "https://www.dot.state.pa.us/Public/DVSPubsForms/BDL/BDL%20Manuals/Manuals/PA%20Drivers%20Manual%20By%20Chapter/English/PUB%2095.pdf",
    handbookName: "Pennsylvania Driver's Manual",
    notableRules: [
      "Pennsylvania's written test has only 18 questions, the fewest of any state, requiring 83% (15 correct) to pass.",
      "Permit holders must log 65 hours of supervised driving (10 at night, 5 in bad weather) — one of the most detailed requirements.",
      "Junior license holders cannot drive between 11:00 PM and 5:00 AM."
    ],
    neighboringSlugs: ["new-york", "new-jersey", "delaware", "maryland", "ohio"],
    onlineTestInfo: "No, the Pennsylvania PennDOT knowledge test must be taken in person at a driver license center."
  },
  RI: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Rhode Island written test, you can retake it the following business day.",
    handbookUrl: "https://dmv.ri.gov/licenses-permits-ids/licenses-permits/drivers-manual",
    handbookName: "Rhode Island Driver's Manual",
    notableRules: [
      "Rhode Island requires learner's permit holders to be at least 16 years old.",
      "Permit holders must hold the permit for at least 6 months before taking the road test.",
      "Limited provisional license holders under 18 cannot drive between 1:00 AM and 5:00 AM."
    ],
    neighboringSlugs: ["connecticut", "massachusetts"],
    onlineTestInfo: "No, the Rhode Island DMV knowledge test must be taken in person at a DMV office."
  },
  SC: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the South Carolina written test, you can retake it the following business day at any DMV branch.",
    handbookUrl: "https://www.scdmvonline.com/Driver-Services/Drivers-License/Drivers-License-Manual",
    handbookName: "South Carolina Driver's Manual",
    notableRules: [
      "South Carolina requires permit holders to hold the permit for at least 180 days before taking the road test.",
      "Conditional license holders under 17 cannot drive between midnight and 6:00 AM.",
      "Drivers under 18 cannot carry more than 2 passengers under 21 who are not family members."
    ],
    neighboringSlugs: ["north-carolina", "georgia"],
    onlineTestInfo: "No, the South Carolina DMV knowledge test must be taken in person at a DMV branch office."
  },
  SD: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the South Dakota written test, you can retake it the following business day.",
    handbookUrl: "https://dps.sd.gov/driver-licensing/south-dakota-driver-license-manual",
    handbookName: "South Dakota Driver License Manual",
    notableRules: [
      "South Dakota allows instruction permits at age 14, one of the youngest in the nation.",
      "South Dakota has relatively few GDL restrictions compared to other states.",
      "Permit holders must pass both a written and vision test before receiving their instruction permit."
    ],
    neighboringSlugs: ["north-dakota", "minnesota", "iowa", "nebraska", "wyoming", "montana"],
    onlineTestInfo: "No, the South Dakota knowledge test must be taken in person at a DPS driver license station."
  },
  TN: {
    retakeWaitTime: "7 days",
    retakeInfo: "If you fail the Tennessee written test, you must wait 7 days before retaking it. You must pay the test fee again.",
    handbookUrl: "https://www.tn.gov/safety/driver-services/classd/dlmanual.html",
    handbookName: "Tennessee Comprehensive Driver License Manual",
    notableRules: [
      "Tennessee requires permit holders to hold the permit for at least 180 days before taking the road test.",
      "Intermediate restricted license holders under 18 cannot drive between 11:00 PM and 6:00 AM.",
      "Tennessee requires 50 hours of supervised driving (10 at night) for permit holders under 18."
    ],
    neighboringSlugs: ["kentucky", "virginia", "north-carolina", "georgia", "alabama", "mississippi", "arkansas"],
    onlineTestInfo: "No, the Tennessee knowledge test must be taken in person at a DDS driver license center."
  },
  TX: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Texas written test, you can retake it the next business day. You must pay the test fee again for each attempt.",
    handbookUrl: "https://www.dps.texas.gov/section/driver-license/texas-driver-handbook",
    handbookName: "Texas Driver Handbook",
    notableRules: [
      "Texas requires completion of the Impact Texas Drivers (iTD) course, a free online awareness course about distracted driving.",
      "Texas requires 30 hours of classroom instruction and 44 hours of behind-the-wheel training for drivers under 25.",
      "Provisional license holders under 18 cannot drive between midnight and 5:00 AM or carry more than 1 passenger under 21."
    ],
    neighboringSlugs: ["new-mexico", "oklahoma", "arkansas", "louisiana"],
    onlineTestInfo: "Yes, Texas allows the knowledge test to be taken online through approved driver education course providers for first-time applicants under 25."
  },
  UT: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Utah written test, you can retake it the following business day at any DLD office.",
    handbookUrl: "https://dld.utah.gov/driver-resources/driver-handbooks/",
    handbookName: "Utah Driver Handbook",
    notableRules: [
      "Utah has the strictest DUI law in the U.S. with a BAC limit of 0.05%, lower than the national standard of 0.08%.",
      "Utah's written test has 50 questions and requires 80% to pass.",
      "Permit holders must log 40 hours of supervised driving (10 at night) before the road test."
    ],
    neighboringSlugs: ["idaho", "wyoming", "colorado", "new-mexico", "arizona", "nevada"],
    onlineTestInfo: "No, the Utah DLD knowledge test must be taken in person at a Driver License Division office."
  },
  VT: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Vermont written test, you can retake it the next business day at any DMV office.",
    handbookUrl: "https://dmv.vermont.gov/licenses/drivers-license/manual",
    handbookName: "Vermont Driver's Manual",
    notableRules: [
      "Vermont requires permit holders under 18 to hold the permit for at least 12 months — one of the longest holding periods.",
      "New drivers under 18 cannot carry passengers under 20 (other than family) during the first 6 months.",
      "Vermont's road test includes a winter driving component when conditions warrant."
    ],
    neighboringSlugs: ["new-hampshire", "massachusetts", "new-york"],
    onlineTestInfo: "No, the Vermont DMV knowledge test must be taken in person at a DMV office."
  },
  VA: {
    retakeWaitTime: "15 days",
    retakeInfo: "If you fail the Virginia written test, you must wait 15 days before retaking it — one of the longest wait times in the country.",
    handbookUrl: "https://www.dmv.virginia.gov/drivers/manuals.asp",
    handbookName: "Virginia Driver's Manual",
    notableRules: [
      "Virginia requires permit holders to hold the permit for at least 9 months before taking the road test.",
      "Virginia requires 45 hours of supervised driving (15 at night) — one of the most night-hour requirements.",
      "Virginia's learner's permit can be obtained at 15 years and 6 months, and the written test must be passed before the permit is issued."
    ],
    neighboringSlugs: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "north-carolina"],
    onlineTestInfo: "No, the Virginia DMV knowledge test must be taken in person at a DMV customer service center."
  },
  WA: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Washington written test, you can retake it the following business day at any DOL office.",
    handbookUrl: "https://www.dol.wa.gov/driver-licenses-permits-ids/drivers-guide",
    handbookName: "Washington Driver Guide",
    notableRules: [
      "Washington requires an intermediate license (IDL) for all new drivers under 18, with passenger and nighttime restrictions.",
      "Permit holders must hold the permit for at least 6 months and complete approved driver training.",
      "Washington requires a minimum of 50 hours of supervised driving practice (10 at night)."
    ],
    neighboringSlugs: ["oregon", "idaho"],
    onlineTestInfo: "No, the Washington DOL knowledge test must be taken in person at a DOL office or approved testing location."
  },
  WV: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the West Virginia written test, you can retake it the next business day at any DMV regional office.",
    handbookUrl: "https://transportation.wv.gov/DMV/Drivers-Licensing/Pages/Drivers-Licensing.aspx",
    handbookName: "West Virginia Driver's Licensing Handbook",
    notableRules: [
      "West Virginia uses a Graduated Driver Licensing (GDL) program with Level 1 (instruction permit), Level 2 (intermediate), and Level 3 (full) licenses.",
      "Level 1 permit holders must hold the permit until age 16 before upgrading.",
      "Level 2 drivers under 18 cannot drive between 10:00 PM and 5:00 AM."
    ],
    neighboringSlugs: ["ohio", "pennsylvania", "maryland", "virginia", "kentucky"],
    onlineTestInfo: "No, the West Virginia knowledge test must be taken in person at a DMV regional office."
  },
  WI: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Wisconsin written test, you can retake it the following business day at any DMV service center.",
    handbookUrl: "https://wisconsindot.gov/Pages/dmv/teen-driver/yr-fsrt-lcns/study-guide.aspx",
    handbookName: "Wisconsin Motorists' Handbook",
    notableRules: [
      "Wisconsin's written test has 50 questions, one of the longest in the nation.",
      "Permit holders must hold the permit for at least 6 months and log 30 hours of supervised driving (10 at night).",
      "Probationary license holders under 18 have a midnight curfew for the first 9 months."
    ],
    neighboringSlugs: ["michigan", "minnesota", "iowa", "illinois"],
    onlineTestInfo: "No, the Wisconsin DMV knowledge test must be taken in person at a DMV service center."
  },
  WY: {
    retakeWaitTime: "1 day",
    retakeInfo: "If you fail the Wyoming written test, you can retake it the following business day.",
    handbookUrl: "https://www.dot.state.wy.us/home/driver_license_records/manuals.html",
    handbookName: "Wyoming Rules of the Road",
    notableRules: [
      "Wyoming allows learner's permits at age 15 with parental consent.",
      "Wyoming has relatively relaxed GDL restrictions compared to many other states.",
      "Permit holders must complete a state-approved driver education course or supervised driving practice."
    ],
    neighboringSlugs: ["montana", "south-dakota", "nebraska", "colorado", "utah", "idaho"],
    onlineTestInfo: "No, the Wyoming knowledge test must be taken in person at a WYDOT driver license office."
  }
};

// Helper to get landing data by state code
export function getStateLandingInfo(code: string): StateLandingInfo | undefined {
  return stateLandingData[code];
}
