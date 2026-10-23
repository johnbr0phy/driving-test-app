import type { Firestore } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { getExamById } from '@/lib/exams';
import { catalogProgress, startedCatalogExams, type CatalogUserData } from '@/lib/server/mcpCatalogPractice';
import { discoverV2Practice } from '@/lib/server/mcpV2Practice';
import { loadPlayableQuiz, getPlayState, playProgress } from '@/lib/server/mcpQuizPlay';
import { quizQuestionId, normalizeQuizCode, isQuizCode } from '@/lib/quizzes';
import type { QuizCodeProgress } from '@/store/useQuizStore';

type StudyData = CatalogUserData & { quizProgress?: {progress?:Record<string,QuizCodeProgress>;recent?:{code:string}[]}; v2?:Record<string,unknown> };
const publicUrl=(path:string)=>`${(process.env.MCP_OAUTH_ISSUER_URL||'https://www.tigertest.io').replace(/\/$/,'')}${path}`;
const fail=(code:string,message:string)=>({ok:false as const,code,message});
async function userData(uid:string,db:Firestore){const s=await db.collection('users').doc(uid).get();return s.exists?s.data() as StudyData:null;}

/** Uses only this account's synced records, never other users or the public catalog. */
export async function listInProgressTests(uid:string,db:Firestore=getAdminDb()){
 const data=await userData(uid,db);if(!data)return fail('USER_NOT_FOUND','User not found.');
 const entries:unknown[]=[];
 if(data.selectedState)entries.push({id:'dmv',title:`${data.selectedState} DMV permit test`,kind:'dmv',dashboard:publicUrl('/dmv/dashboard'),practice:{tool:'quiz_me',quiz:'dmv'},progress:{tool:'get_progress'},weakTopics:{tool:'get_weak_areas'},tests:{tool:'start_practice_test'},webSessions:Object.keys(data.currentTests??{}).filter(id=>[1,2,3,4].includes(Number(id))).map(id=>({testNumber:Number(id),url:publicUrl(`/test/${id}`)}))});
 for(const exam of startedCatalogExams(data))entries.push(catalogProgress(exam,data));
 entries.push(...discoverV2Practice(data as Record<string,unknown>));
 const codes=[...new Set([...Object.keys(data.quizProgress?.progress??{}),...(data.quizProgress?.recent??[]).map(x=>x.code)])].slice(0,100);
 for(const code of codes){
  if(!isQuizCode(normalizeQuizCode(code)))continue;
  const found=await loadPlayableQuiz(uid,code,db);if('error' in found)continue;
  entries.push({id:`quiz:${found.quiz.code}`,title:found.quiz.title,kind:'quiz',dashboard:publicUrl(`/q/${found.quiz.code}/dashboard`),practice:{tool:'quiz_me',quiz:found.quiz.code},hasActiveTest:!!data.quizProgress?.progress?.[code]?.current,testUrl:publicUrl(`/q/${found.quiz.code}/test`)});
 }
 return {ok:true as const,data:{tests:entries,scope:'Signed-in progress synced to this Tigertest account. Guest-only or unsynced browser progress is not visible. In progress follows the site switcher: started exams may already have completed steps.',instruction:'Ask which test if several are listed. Use exact id, not a guessed title. start_study_practice is untimed training, not a timed test sitting. Reopen the website to load account changes; an older browser save pauses instead of overwriting newer chat progress. Unsynced browser changes may need repeating.'}};
}

export async function studyProgress(uid:string,id:string,db:Firestore=getAdminDb()){
 const data=await userData(uid,db);if(!data)return fail('USER_NOT_FOUND','User not found.');
 const exam=getExamById(id);if(exam)return {ok:true as const,data:catalogProgress(exam,data)};
 const v2=discoverV2Practice(data as Record<string,unknown>).find((x:{id?:string;examId?:string})=>x.id===id||x.examId===id);if(v2)return {ok:true as const,data:v2};
 if(id.startsWith('quiz:')){
  const found=await loadPlayableQuiz(uid,id.slice(5),db);if('error'in found)return fail(found.error,'Quiz unavailable or private.');
  const quiz=found.quiz;const saved=data.quizProgress?.progress?.[quiz.code];const topics=new Map<string,{answered:number;correct:number}>();
  for(const a of saved?.answers??[]){const q=quiz.questions.find(q=>quizQuestionId(quiz.code,q.id)===a.q);if(!q)continue;const topic=q.topic??'General';const r=topics.get(topic)??{answered:0,correct:0};r.answered++;if(a.ok)r.correct++;topics.set(topic,r);}
  return {ok:true as const,data:{id,title:quiz.title,progress:playProgress(quiz,await getPlayState(uid,quiz.code,db)),weakTopics:[...topics].map(([topic,r])=>({topic,...r,accuracy:Math.round(r.correct/r.answered*100)})).sort((a,b)=>a.accuracy-b.accuracy),webSessions:saved?.current?[{url:publicUrl(`/q/${quiz.code}/test`)}]:[],practice:{tool:'quiz_me',quiz:quiz.code}}};
 }
 return fail('EXAM_NOT_FOUND','Use an exact id returned by list_in_progress_tests. DMV progress uses get_progress and get_weak_areas.');
}
