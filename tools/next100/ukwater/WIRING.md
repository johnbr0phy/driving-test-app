# ukwater wiring notes

## (a) CLAUDE.md bullet
- **Water Regulations** (`ukwater`, the UK plumber's Water Regulations / water fittings certificate, e.g. City & Guilds 3345 unit 301/304 and the BPEC Water Regulations & Byelaws course, the knowledge an approved contractor scheme asks for, `/water-regulations/*`, landing `/water-regulations-practice-test`): `data/uk-water-regulations-questions.json` (200 original questions on the Water Supply (Water Fittings) Regulations 1999 (England and Wales) and Schedules 1 and 2, the Defra regulator's Specification on the Prevention of Backflow (6 May 2026 edition; types and categories as before, Type AUK4 not asked until it takes effect on 6 May 2027) and Water Regs UK guidance, with the Scottish Byelaws 2014 and the NI 2009 Regulations stated where they differ (20°C, Scottish Water and NI Water): the Regulations and notification 24, water fittings and materials 28, system design, testing and flushing 32, fluid categories and cross connection 24, backflow prevention 40, cold water services 16, hot water services 16, WCs, taps, appliances and outside use 20), test IDs 26701-26704, sets 26701-26704 (by topic: the Regulations and fluid categories 48, water fittings and system design 60, cold, hot and sanitary services 52, backflow prevention 40), state `UKWATER`, prefix `UKWATER-`, 80% pass (BPEC's mark: 52 open-book MCQs in 104 minutes, 42 to pass; City & Guilds 3345 is 50 open-book MCQs in 105 minutes with no published mark). 6/7/8/6/10/4/4/5 per test, Tigertest's split based on the C&G 3345 test specification. Temperatures for Legionella control from HSE HSG274 Part 2. No fees, penalties or BS clause text. Built by `tools/next100/ukwater/build.py`; sources in `tools/next100/ukwater/sources.md`. Region UK, hub group "UK workplace and trade certificates", `[data-theme="ukwater"]` deep water blue (195 70% 28%), borrows the Red Seal plumber (`caplumb`) tiger, teacher-led (FE colleges and plumbing training centres).

## (b) lib/examFacts.ts entry (draft)
Answer: "The Water Regulations certificate shows a plumber knows the Water Supply (Water Fittings) Regulations 1999 in England and Wales, and the matching Scottish Byelaws 2014 and Northern Ireland 2009 Regulations: what must be notified to the water company, the five fluid categories, which backflow device or air gap suits each, and the Schedule 2 rules for pipework, cisterns, hot water, WCs and taps. Awarding bodies such as City & Guilds and BPEC run it as an open-book multiple-choice test after a short course, and it is the usual evidence for joining an approved contractors' scheme such as WIAPS, APHC, CIPHE or SNIPEF."

Facts rows:
- Who sets it: awarding bodies (City & Guilds 3345, BPEC, LCL Awards) to a common UK water industry training and assessment strategy; the law is set by Defra and the Welsh Government (England and Wales), Scottish Water byelaws (Scotland) and the NI 2009 Regulations.
- Format: open-book multiple choice. City & Guilds 3345 unit 301/304: 50 questions in 105 minutes, Water Regulations Guide allowed. BPEC: 52 questions in 104 minutes, training manual and notes allowed.
- Pass mark: BPEC 42 of 52 (80%); a score of 37 to 41 allows a second attempt at the missed questions. City & Guilds publishes no figure.
- Source: City & Guilds 3345 handbook v1.8, https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-industry/plumbing/3345-water-regulations-unvented-hot-water-systems ; BPEC, https://bpec.org.uk/water-regulations-england-and-wales-and-water-byelaws-scotland-and-ni/ ; SI 1999/1148, https://www.legislation.gov.uk/uksi/1999/1148/contents/made (checked 12 November 2026).

## (c) Landing FAQ
1. Q: Is the Water Regulations test open book?
   A: Yes. City & Guilds lets candidates take the Water Regulations Guide into the 3345 test, and BPEC allows its training manual and course notes. You still need to know where things are, because there is not time to look up every answer.
2. Q: What pass mark do I need?
   A: BPEC's Water Regulations & Byelaws test needs 42 of 52 (80%), with a second attempt on the missed questions if you score 37 to 41. City & Guilds does not publish its mark. Tigertest uses 80% as the line.
3. Q: Does this cover Scotland and Northern Ireland?
   A: The questions follow the 1999 Regulations for England and Wales. Scotland's Byelaws 2014 and Northern Ireland's 2009 Regulations are almost the same; where they differ, such as the 20°C cold water limit and notifying Scottish Water or NI Water, the question says so.
4. Q: Does passing make me an approved plumber?
   A: No. The certificate is the evidence most approved contractors' schemes ask for, but you join a scheme (WIAPS, APHC, CIPHE or SNIPEF) separately. Approved contractors can skip notifying some jobs and issue compliance certificates.
5. Q: Is the new backflow specification included?
   A: Defra published a new Specification on the Prevention of Backflow on 6 May 2026, which takes effect on 6 May 2027. The device types and fluid categories asked here are the same in both; the new Type AUK4 air gap for WC suites is left out until it is in force.

## (d) Catalog
- Blurb: "Practice the Water Regulations: notification, fluid categories, backflow devices and air gaps, and the Schedule 2 rules plumbers are tested on."
- Org line: "City & Guilds · BPEC · Water Regulations certificate"
- Search aliases: "water regulations water regs wras water fittings regulations 1999 water byelaws backflow fluid categories city and guilds 3345 bpec water regs lcl water regulations wiaps approved plumber water regulations course"

## Notes for the wirer
- Hot water items stay at Schedule 2 paragraphs 17 to 24 (vent pipes, expansion valve 0.5 bar, T&P valve over 15 litres, 100°C). The ukg3 sibling covers G3 unvented installation; check for overlapping stems if both ship.
- Category label keys need entries in types/index.ts and the i18n files.
