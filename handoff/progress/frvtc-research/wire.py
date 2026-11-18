from pathlib import Path
import json,re,runpy
R=Path('/Users/johnbrophy/tigertest-next20-frvtc')
def replace(f,a,b):
 p=R/f;s=p.read_text();assert a in s,(f,a);p.write_text(s.replace(a,b,1))
def write(f,s):
 p=R/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s)
def js(x):return json.dumps(x,ensure_ascii=False,indent=2)
labels={'frvtcT3p':'Réglementation du T3P','frvtcGestion':'Gestion','frvtcSecurite':'Sécurité routière','frvtcFrancais':'Compréhension du français','frvtcAnglais':'Anglais','frvtcCommercial':'Développement commercial','frvtcReglementation':'Réglementation VTC'}
english=dict(zip(labels,['T3P regulation','Business management','Road safety','French comprehension','English','Commercial development','VTC-specific regulation']))
config={'id':'frvtc','stateCode':'FRVTC','idBase':34100,'slug':'/vtc','landingPath':'/fr/examen-vtc','name':'Examen VTC','shortName':'VTC','examLabel':'Examen théorique VTC','fullName':"Examen d'accès à la profession de conducteur de voiture de transport avec chauffeur",'questionIdPrefix':'FRVTC-','icon':'car','testCount':4,'questionsPerTest':50,'passPct':70,'language':'fr','locale':'fr-FR','english':{'name':'French VTC Chauffeur Theory Exam','shortName':'French VTC exam','fullName':'French chauffeur (VTC) theory exam: common and VTC-specific subjects, in French'},'review':{'fr':'model'},'blueprint':dict(zip(labels,[9,6,9,6,3,9,8])),'trainingSets':[],'categoryLabels':labels,'copy':{'guestPrompt':'pour enregistrer tes progrès et retrouver les points à revoir','trainingHeading':"Séries d'entraînement",'trainingSub':"Travaille les thèmes à ton rythme. Chaque réponse est expliquée et les questions ratées reviennent pour consolider tes acquis.",'testsHeading':"Tests d'entraînement · 50 questions, objectif de travail : 35 bonnes réponses",'heroSubs':["Cinq séries d'entraînement, quatre tests. Commence par Réglementation T3P et gestion.","Termine les séries, puis fais un test pour repérer les points à revoir.","Continue avec les thèmes restants, puis vérifie tes acquis dans un test.","Reprends tes erreurs et compare tes résultats d'un test à l'autre.","Les étapes sont terminées. Complète ta préparation par les réponses rédigées et la conduite."],'sourceLine':"Questions originales fondées sur le programme VTC et les textes consultés le 17 novembre 2026. Une seule bonne réponse par question. L'objectif de 70 % est un repère de travail, sans équivalence avec les notes officielles.",'analyticsKey':'frvtc'}}
for i,(name,cats,size,n) in enumerate([('Réglementation T3P et gestion',list(labels)[:2],60,15),('Sécurité routière',[list(labels)[2]],36,9),('Français et anglais',list(labels)[3:5],36,9),('Développement commercial',[list(labels)[5]],36,9),('Réglementation VTC',[list(labels)[6]],32,8)],1):config['trainingSets'].append({'setNumber':i,'id':34100+i,'name':name,'categories':cats,'size':size,'weightLabel':f'{n} questions sur 50 par test'})
replace('lib/exams.ts','export type ExamId = ','export type ExamId = "frvtc" | ')
replace('lib/exams.ts','const htl: ExamConfig = {','// VTC: arrêté du 6 avril 2017, consolidated 2026-11-17, including the 2024 syllabus addition.\n// Editorial 9/6/9/6/3/9/8 split across the seven official subjects. Official theory:\n// 91 QCM + 16 QRC, 230 minutes; weighted mean >=10/20 with section minima 6/20\n// (English 4/20). This single-answer practice omits QRC production, section scoring\n// and the separate practical assessment. 70% is a study target, not a mark conversion.\nconst frvtc: ExamConfig = '+js(config)+';\n\nconst htl: ExamConfig = {')
replace('lib/exams.ts','export const EXAMS: ExamConfig[] = [','export const EXAMS: ExamConfig[] = [frvtc, ')
replace('types/index.ts','export type QuestionType = ','export type QuestionType = "FRVTC" | ')
replace('types/index.ts','export type QuestionCategory =','export type QuestionCategory =\n  // French VTC theory\n'+''.join('  | '+json.dumps(k)+'\n' for k in labels))
for lang in ['en','es','ko','vi','zh']:
 replace(f'i18n/{lang}.ts','    frCirculation:', ''.join(f'    {k}: {json.dumps(v)},\n' for k,v in english.items())+'    frCirculation:')
write('lib/banks/frvtc.ts','import { Question } from "@/types";\nimport questions from "@/data/france-vtc-questions.json";\nimport { registerExamBanks } from "@/lib/examData";\n\nregisterExamBanks({ frvtc: questions as Question[] });\n')
replace('lib/banks/all.ts','import "./frcode";','import "./frvtc";\nimport "./frcode";')
replace('lib/testCatalog.ts','const EXAM_BLURBS: Record<string, string> = {','const EXAM_BLURBS: Record<string, string> = {\n  frvtc: "French-language practice across the seven common and VTC-specific theory subjects: transport law, management, road safety, French, English and commercial development. Four shorter single-answer tests; written responses, official section scoring and practical driving require separate preparation.",')
replace('lib/testCatalog.ts','const EXAM_ORG: Record<string, string> = {','const EXAM_ORG: Record<string, string> = { frvtc: "Chambres de métiers et de l’artisanat · French VTC theory examination",')
replace('lib/testCatalog.ts','"itpatente", "frcode"]','"itpatente", "frcode", "frvtc"]')
replace('lib/testCatalog.ts','const SEARCH_ALIASES: Record<string, string> = {','const SEARCH_ALIASES: Record<string, string> = {\n  frvtc: "examen vtc chauffeur vtc carte professionnelle vtc cma qcm vtc examen théorique vtc chauffeur privé france uber bolt T3P réglementation gestion anglais français",')
replace('lib/testCatalog.ts','const RELATED_OVERRIDES: Record<string, string[]> = {','const RELATED_OVERRIDES: Record<string, string[]> = {\n  frvtc: ["frcode", "pttvde", "ukseru", "rotaxi"],')
replace('lib/region.ts','  frcode: "FR",','  frvtc: "FR",\n  frcode: "FR",')
replace('lib/landingContent.ts','import frcodeFr from','import frvtcFr from "@/lib/landings/frvtc.fr.json";\nimport frcodeFr from')
replace('lib/landingContent.ts','  "frcode.fr":','  "frvtc.fr": frvtcFr as TranslatedLandingContent,\n  "frcode.fr":')
replace('lib/tigerAssets.ts','const BORROWED_SETS: Record<string, string> = {','const BORROWED_SETS: Record<string, string> = {\n  frvtc: "driving",')
replace('components/TeachNudge.tsx','const TEACHER_LED = new Set([','const TEACHER_LED = new Set([\n  "frvtc",')
replace('components/exam/ExamClassFaq.tsx','export const TEACHES: Record<string, string> = {','export const TEACHES: Record<string, string> = {\n  frvtc: "a French VTC chauffeur preparation course",')
replace('lib/seoDates.ts','EXAM_LANDINGS_UPDATED_AT = "2026-11-17"; //','EXAM_LANDINGS_UPDATED_AT = "2026-11-17"; // French VTC theory practice;')
for f in ['layout.tsx','page.tsx','dashboard/page.tsx','drill/page.tsx','stats/page.tsx']:
 write('app/vtc/'+f,(R/('app/code-de-la-route/'+f)).read_text().replace('frcode','frvtc').replace('Frcode','Frvtc').replace('/code-de-la-route','/vtc'))
write('app/fr/examen-vtc/page.tsx',(R/'app/fr/code-de-la-route-test/page.tsx').read_text().replace('frcode','frvtc'))
theme='''  /* French VTC: olive, distinct from existing themes and CDM. */
  [data-theme="frvtc"] {
    --brand: 76 40% 32%;
    --brand-foreground: 0 0% 100%;
    --brand-light: 76 40% 96%;
    --brand-hover: 76 40% 27%;
    --brand-dark: 76 40% 22%;
    --brand-darker: 76 40% 17%;
    --brand-muted: 76 30% 65%;
    --brand-border: 76 30% 78%;
    --brand-border-light: 76 30% 90%;
    --brand-gradient-to: 76 30% 98%;
  }

'''
replace('app/globals.css','  [data-theme="frcode"] {',theme+'  [data-theme="frcode"] {')
p=R/'tools/queue/backlog.json';d=json.loads(p.read_text());assert not any(x['id']=='frvtc' for x in d['candidates']);d['candidates'].append({'id':'frvtc','name':'French VTC Chauffeur Theory Exam','owner':'Chambres de métiers et de l’artisanat','region':'FR','engine':'v1','siblings':['frcode','pttvde','rotaxi'],'sells':1,'search':['examen vtc','qcm vtc','carte professionnelle vtc']});p.write_text(js(d)+'\n')
# Authored category sources remain canonical; bank and traceability map are derived.
b=runpy.run_path(str(R/'tools/next20/frvtc/build.py'));bank,mapping=b['build']();write('data/france-vtc-questions.json',js(bank)+'\n');write('tools/next20/frvtc/item-source-map.json',js(mapping)+'\n')
