from pathlib import Path
import json,sys,hashlib,collections,statistics,subprocess
P=Path(__file__).parent; R=Path('/Users/johnbrophy/tigertest-next20-epa609')
sys.path.insert(0,str(R/'tools'))
from check_option_reuse import analyse
from check_answer_patterns import load_items
p=P/'pilot-questions.json';qs=json.loads(p.read_text());items=load_items(str(p));ev=json.loads((P/'authoring-evidence.json').read_text())
prior=json.loads((P.parent/'epa609-pilot40-v3/pilot-questions.json').read_text());by={q['questionId']:q for q in qs}
assert len(qs)==40 and len(by)==40
assert all(q['correctAnswer']=='ABCD'[q['correctIndex']] for q in qs)
assert all([e['text'] for e in x['options']]==[by[x['questionId']]['option'+l] for l in 'ABCD'] for x in ev['items'])
assert all(next(o for o in x['options'] if o['role']=='key')['support']==by[x['questionId']]['explanation'] for x in ev['items'])
counts=[len(q['question'].split()) for q in qs]
report={'status':'Descriptive diagnostics only; no independent gate approval','rows':len(qs),'categoryCounts':dict(collections.Counter(q['category'] for q in qs)),'answerPositions':dict(collections.Counter(q['correctAnswer'] for q in qs)),'stemWords':{'median':statistics.median(counts),'maximum':max(counts),'over20':{q['questionId']:len(q['question'].split()) for q in qs if len(q['question'].split())>20}},'articleOpeningOptions':sum(q['option'+l].split()[0].lower() in ('a','an','the') for q in qs for l in 'ABCD'),'totalOptions':160,'changedFromV3':[q['questionId'] for q in prior if by[q['questionId']]!=q],'full40':analyse(items),'directCategoryDiagnostics':{c:analyse([i for i in items if i[1]==c]) for c in sorted({i[1] for i in items})},'hashes':{str(path):hashlib.sha256(path.read_bytes()).hexdigest() for path in [p,R/'data/epa609-questions.json',P.parent/'epa609-pilot-v1/pilot-questions.json',P.parent/'epa609-pilot-v2/pilot-questions.json',P.parent/'epa609-pilot-v3/pilot-questions.json',P.parent/'epa609-pilot-v4/pilot-questions.json',P.parent/'epa609-pilot40-selection.json']}}
assert set(report['changedFromV3'])==set(ev['changedQuestionIds'])
assert report['hashes'][str(R/'data/epa609-questions.json')]=='f6ec41e703f3b3c26900ce00c5bbad9ffdc1f5488abcc1202896542cbaffe8a7'
(P/'diagnostics.json').write_text(json.dumps(report,indent=2)+'\n')
for name,cmd in [('validator.txt',[sys.executable,'-I',str(R/'.claude/skills/exam-bank/scripts/validate_bank.py'),str(p),'--rows','40']),('option-reuse.txt',[sys.executable,'-I',str(R/'tools/check_option_reuse.py'),str(p),'--list'])]:
 result=subprocess.run(cmd,cwd=R,capture_output=True,text=True);(P/name).write_text(result.stdout+result.stderr+'\nExit code: '+str(result.returncode)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ('hashes','full40','directCategoryDiagnostics')},indent=2))
for c,r in [('all40',report['full40'])]+list(report['directCategoryDiagnostics'].items()):print(c,json.dumps(r))
