import json,hashlib,sys,statistics,urllib.request
from pathlib import Path
P=Path(__file__).parent; qs=json.loads((P/'pilot-questions.json').read_text());ev=json.loads((P/'authoring-evidence.json').read_text());es={e['questionId']:e for e in ev['items']}
q=next(q for q in qs if q['questionId']=='EPA609-REG-004');q['question']='Which business qualifies for the equipment exception specifically granted to top-off-only facilities?';es[q['questionId']]['discriminatingFact']=q['question']
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'));r={'fullPilot':analyse(items),'categories':{c:analyse([it for it in items if it[1]==c]) for c in sorted({it[1] for it in items})},'stemWordCounts':{q['questionId']:len(q['question'].split()) for q in qs},'articleOpeningOptions':sum(q['option'+l].split()[0].lower() in ['a','an','the'] for q in qs for l in 'ABCD'),'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()};(P/'diagnostics.json').write_text(json.dumps(r,indent=2)+'\n')
old={q['questionId']:q for q in json.loads(Path('/Users/johnbrophy/tigertest-next20-epa609/data/epa609-questions.json').read_text())}
(P/'before-after.md').write_text('# EPA 609 pilot: before and after\n\nProduction bank remains frozen and rejected. Raw independent options-only result remains 94/100. This pilot is not approval for expansion. Reproduction order: build_pilot.py, revise_pilot.py, finalize_pilot.py, last_review.py, finish_report.py. All outputs remain outside the repository.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+old[q['questionId']]['question']+'\n\nAfter: '+q['question']+'\n\n'+es[q['questionId']]['change']+'\n\nOverlap: '+(es[q['questionId']]['existingBankOverlap'] or 'No same-decision overlap identified in this pilot.') for q in qs)+'\n')
print(json.dumps(r,indent=2))
