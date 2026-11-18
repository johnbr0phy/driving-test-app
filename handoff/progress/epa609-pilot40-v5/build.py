from pathlib import Path
import json,hashlib,copy,collections,statistics
P=Path(__file__).parent;V=P.parent/'epa609-pilot40-v4'
raw=(V/'pilot-questions.json').read_bytes();assert hashlib.sha256(raw).hexdigest()=='171de3a21f2dbb2ff7a1279d46ce4316789e13aa2c96cbda26d14dfab87d3c4a'
qs=json.loads(raw);old=copy.deepcopy(qs);ev=json.loads((V/'authoring-evidence.json').read_text());by={q['questionId']:q for q in qs};es={e['questionId']:e for e in ev['items']}
changes={
'EPA609-YF-003':'Parallelized all four answers as service purposes; removed the keyed option’s extra pressure-mechanism detail. The unchanged explanation retains that mechanism and the qualified staged-procedure scope.',
'EPA609-EQP-004':'Clarified standardized as non-refrigerant-specific without changing connection alternatives or the legal rule.',
'EPA609-EQP-002':'Removed dangling cited; retained the same combustion mechanism, options and explanation.'}
q=by['EPA609-YF-003'];q['question']='What is the purpose of the partial R-1234yf charge after a successful vacuum check?'
for l,t in zip('ABCD',['Measuring cabin cooling performance','Determining required refrigerant capacity','Checking evaporator refrigerant leakage','Evaluating compressor operating performance']):q['option'+l]=t
q=by['EPA609-EQP-004'];q['question']='Where does EPA permit a standardized, non-refrigerant-specific connection on a manifold hose used for MVAC service?'
q=by['EPA609-EQP-002'];q['question']=q['question'].replace('the cited combustion hazard','a combustion hazard')
for ident,reason in changes.items():
 q=by[ident];e=es[ident];e['change']=reason;e['discriminatingFact']=q['question']
 for o in e['options']:
  o['text']=q['option'+o['option']]
  if o['role']=='key':o['support']=q['explanation']
# Update the changed option's rationale without asserting a new procedure.
e=es['EPA609-YF-003']
for o in e['options']:
 if o['option']=='D':o['whyCandidateMightChoose']='Treats a partial charge as sufficient for operating and evaluating the compressor.'
actual=[q['questionId'] for q,o in zip(qs,old) if q!=o]
assert set(actual)==set(changes) and len(actual)==3
assert all(q['correctAnswer']==o['correctAnswer'] and q['correctIndex']==o['correctIndex'] for q,o in zip(qs,old))
assert all(q['explanation']==o['explanation'] for q,o in zip(qs,old))
assert all([o['text'] for o in e['options']]==[by[e['questionId']]['option'+l] for l in 'ABCD'] for e in ev['items'])
ev.update(parentPilotSha256=hashlib.sha256(raw).hexdigest(),changedQuestionIds=list(changes),status='V5 three minor wording repairs only. V4 fresh review remains 40/40 blind keys, 24/40 options-only FAIL; no new scoring or approval claim. User workflow decision remains pending.')
(P/'pilot-questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,ensure_ascii=False,indent=2)+'\n')
(P/'before-after.md').write_text('# V5 minimal changes\n\nOnly three rows changed. The other 37 rows, all 40 explanations and all key positions remain identical to v4.\n\n'+''.join('## '+i+'\n\n'+r+'\n\n' for i,r in changes.items())+'Prior review remains 40/40 blind answers and 24/40 options-only FAIL. No new score cycle, full-bank expansion or inferred user workflow decision.\n')
counts=[len(q['question'].split()) for q in qs]
r={'status':'Minimal structural verification only; no new blind or options-only review','rows':len(qs),'changedRows':actual,'unchangedRows':37,'allExplanationsUnchanged':True,'allKeysUnchanged':True,'categoryCounts':dict(collections.Counter(q['category'] for q in qs)),'stemWords':{'median':statistics.median(counts),'maximum':max(counts)},'YF003OptionWords':{l:len(by['EPA609-YF-003']['option'+l].split()) for l in 'ABCD'},'YF003OptionCharacters':{l:len(by['EPA609-YF-003']['option'+l]) for l in 'ABCD'},'sha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()}
(P/'diagnostics.json').write_text(json.dumps(r,indent=2)+'\n')
hashes=json.loads((V/'freeze-hashes.json').read_text())
for file,sha in hashes.items():assert hashlib.sha256(Path(file).read_bytes()).hexdigest()==sha
hashes[str(P/'pilot-questions.json')]=r['sha256'];(P/'freeze-hashes.json').write_text(json.dumps(hashes,indent=2)+'\n')
print(json.dumps(r,indent=2))
