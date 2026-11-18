"""One-time registry wiring for this isolated worktree."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[3]
def patch(path,old,new,count=1):
 p=ROOT/path;s=p.read_text();assert old in s,(path,old);p.write_text(s.replace(old,new,count))
config='''const epa609: ExamConfig = {
  id: "epa609", stateCode: "EPA609", idBase: 34300,
  slug: "/epa609", landingPath: "/epa-609-practice-test",
  name: "EPA 609 Practice Test", shortName: "EPA 609", examLabel: "EPA 609 practice test",
  fullName: "EPA Section 609 MVAC Technician Certification",
  questionIdPrefix: "EPA609-", icon: "thermometer",
  testCount: 4, questionsPerTest: 25, passPct: 84,
  // EPA 40 CFR 82.40 subjects and MACS January 2025 manual, checked 2026-11-18.
  // Editorial allocation, not an official weighted outline. 25 items and 84% follow
  // MACS online/home testing only; other approved providers and delivery modes differ.
  blueprint: { epa609Rules: 7, epa609Equipment: 6, epa609Service: 8, epa609Yf: 4 },
  trainingSets: [
    { setNumber: 1, id: 34301, name: "Rules & Environmental Effects", categories: ["epa609Rules"], size: 28, weightLabel: "7 of 25 practice questions" },
    { setNumber: 2, id: 34302, name: "Equipment & Safe Handling", categories: ["epa609Equipment"], size: 24, weightLabel: "6 of 25 practice questions" },
    { setNumber: 3, id: 34303, name: "Recovery, Leaks & Charging", categories: ["epa609Service"], size: 32, weightLabel: "8 of 25 practice questions" },
    { setNumber: 4, id: 34304, name: "R-1234yf Procedures", categories: ["epa609Yf"], size: 16, weightLabel: "4 of 25 practice questions" },
  ],
  categoryLabels: {
    epa609Rules: "Rules & Environmental Effects",
    epa609Equipment: "Equipment & Safe Handling",
    epa609Service: "Recovery, Leaks & Charging",
    epa609Yf: "R-1234yf Procedures",
  },
  copy: {
    guestPrompt: "to save your EPA 609 practice progress and review missed questions",
    trainingHeading: "Train by topic",
    trainingSub: "Four topic sets covering refrigerant handling and recovery. Original questions with explanations and repeated practice for missed items.",
    testsHeading: "Four practice tests · 25 questions each · 84% study target",
    heroSubs: [
      "Four training sets, four practice tests. Start with Rules & Environmental Effects.",
      "Master each set, then take a practice test.",
      "Keep going. Take a practice test to see where you stand.",
      "The 84% target follows MACS online/home testing. Check your provider's requirements.",
      "All practice complete. Arrange certification through an EPA-approved program.",
    ],
    sourceLine: "Based on EPA Section 609 requirements and the MACS January 2025 training manual. Original practice with editorial weights; not an approved certification course or official exam.",
    analyticsKey: "epa609",
  },
};

'''
patch('lib/exams.ts','export type ExamId = ','export type ExamId = "epa609" | ')
patch('lib/exams.ts','const htl: ExamConfig = {',config+'const htl: ExamConfig = {')
patch('lib/exams.ts','export const EXAMS: ExamConfig[] = [','export const EXAMS: ExamConfig[] = [epa609, ')
patch('types/index.ts','export type QuestionType = ','export type QuestionType = "EPA609" | ')
keys={'epa609Rules':'Rules & Environmental Effects','epa609Equipment':'Equipment & Safe Handling','epa609Service':'Recovery, Leaks & Charging','epa609Yf':'R-1234yf Procedures'}
patch('types/index.ts','  // VTNE categories','  // EPA Section 609 categories\n'+''.join(f'  | "{k}"\n' for k in keys)+'\n  // VTNE categories')
for lang in ['en','es','ko','vi','zh']:
 p=ROOT/f'i18n/{lang}.ts';s=p.read_text();needle='    vtCare:'
 assert needle in s
 pos=s.index(needle)
 s=s[:pos]+''.join(f'    {k}: "{v}",\n' for k,v in keys.items())+s[pos:];p.write_text(s)
p=ROOT/'lib/banks/epa609.ts';p.write_text('import { Question } from "@/types";\nimport questions from "@/data/epa609-questions.json";\nimport { registerExamBanks } from "@/lib/examData";\n\nregisterExamBanks({ epa609: questions as Question[] });\n')
patch('lib/banks/all.ts','import "./vtne";','import "./vtne";\nimport "./epa609";')
for p in (ROOT/'app/vtne').rglob('*.tsx'):
 rel=p.relative_to(ROOT/'app/vtne');out=ROOT/'app/epa609'/rel;out.parent.mkdir(parents=True,exist_ok=True);out.write_text(p.read_text().replace('vtne','epa609').replace('Vtne','Epa609'))
patch('lib/testCatalog.ts','  epa608: "EPA Section','  epa609: "EPA Section 609 MVAC refrigerant handling and recovery practice. Four 25-question tests with original questions on rules, equipment, charging and R-1234yf procedures.",\n  epa608: "EPA Section')
patch('lib/testCatalog.ts','const EXAM_ORG: Record<string, string> = {','const EXAM_ORG: Record<string, string> = { epa609: "EPA Section 609 · approved training and certification programs",')
patch('lib/testCatalog.ts','"ham", "epa608",','"ham", "epa608", "epa609",')
patch('lib/testCatalog.ts','  epa608: "hvac','  epa609: "epa 609 section 609 mvac mobile motor vehicle automotive air conditioning refrigerant recovery recycling macs certification",\n  epa608: "hvac')
patch('lib/testCatalog.ts','  vtne: [','  epa609: ["epa608", "ase", "caauto"],\n  vtne: [')
patch('lib/tigerAssets.ts','  ase: "caauto",','  ase: "caauto",\n  epa609: "caauto", // Automotive refrigerant technician practice.')
patch('components/TeachNudge.tsx','"forklift", "epa608",','"forklift", "epa608", "epa609",')
patch('components/exam/ExamClassFaq.tsx','  epa608: "EPA 608 certification classes",','  epa608: "EPA 608 certification classes",\n  epa609: "Section 609 refrigerant handling classes",')
patch('lib/seoDates.ts','EXAM_LANDINGS_UPDATED_AT = "2026-11-17"; //','EXAM_LANDINGS_UPDATED_AT = "2026-11-18"; // EPA 609 MVAC practice;')
patch('.claude/skills/exam-bank/scripts/validate_bank.py','KNOWN_BANKS = {','KNOWN_BANKS = {\n    "epa609-questions.json": dict(rows=100, why="four 25-question tests matching MACS online/home question count; provider-specific format, not a universal EPA format"),')
patch('CLAUDE.md','### Additional Exams (CDL, HTL, CST, CRCST)','### Additional Exams (CDL, HTL, CST, CRCST)\n\n- EPA Section 609 MVAC Technician: `/epa609`, landing `/epa-609-practice-test`, bank `data/epa609-questions.json`; Rules28/Equipment24/Service32/R-1234yf16, four 25-question tests with editorial counts 7/6/8/4, tests/sets34301-34304, stateEPA609. MACS online/home-based84% target and25-item format, not universal EPA format; EPA required subjects/current rules and January2025 MACS manual. Premium; Aviation, radio & trade licenses. Sources/build: `tools/next20/epa609/`. Refrigerant handling scope, not general automotive diagnosis or certification training.')
facts='''  epa609: {
    answer: "EPA Section 609 certification covers motor vehicle air-conditioning refrigerant handling, recovery equipment, environmental effects and applicable rules. EPA-approved programs administer their own tests. MACS online/home testing uses 25 multiple-choice questions, is untimed and open book, and requires 21 correct (84%); classroom testing differs. Tigertest provides 100 original practice questions, not approved training or certification.",
    rows: [
      { label: "MACS online/home test", value: "25 multiple-choice questions" },
      { label: "MACS online/home conditions", value: "Untimed, open book" },
      { label: "MACS online/home passing score", value: "21 of 25 (84%)" },
      { label: "Tigertest practice", value: "Four 25-question tests; editorial weights" },
      { label: "Certification", value: "Through an EPA-approved program" },
    ],
    basedOn: "EPA Section 609 requirements and the January 2025 MACS training manual, checked November 18, 2026",
    source: { name: "MACS Section 609 certification information", url: "https://macsmobileairclimate.org/about-609-certification/" },
  },
'''
patch('lib/examFacts.ts','  epa608: {',facts+'  epa608: {')
# Both modes, using hue 112/saturation30/lightness38 after contrast and clash audit.
light='''  [data-theme="epa609"] {
    --brand: 112 30% 38%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 112 30% 95%;
    --brand-hover: 112 30% 30%;
    --brand-dark: 112 30% 24%;
    --brand-darker: 112 30% 16%;
    --brand-muted: 112 30% 65%;
    --brand-border: 112 30% 75%;
    --brand-border-light: 112 30% 86%;
    --brand-gradient-to: 112 30% 94%;
  }

'''
patch('app/globals.css','  [data-theme="epa608"] {',light+'  [data-theme="epa608"] {')
