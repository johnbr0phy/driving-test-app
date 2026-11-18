import json,hashlib,copy,sys
from pathlib import Path
P=Path(__file__).parent; V2=P.parent/'epa609-pilot-v2'; source=V2/'pilot-questions.json'
assert hashlib.sha256(source.read_bytes()).hexdigest()=='1af7f800953571a59a19677baf3e40bc52df08d695c57630c121062ad3d94655'
qs=json.loads(source.read_text());before=copy.deepcopy(qs);ev=json.loads((V2/'authoring-evidence.json').read_text());es={e['questionId']:e for e in ev['items']}
def revise(qid,stem,opts,exp,obj,loc,rats,change,overlap=None):
 q=next(q for q in qs if q['questionId']==qid);k=q['correctIndex'];q.update(question=stem,explanation=exp)
 e=es[qid];e.update(objective=obj,discriminatingFact=stem,sourcePassageLocator=loc,change=change,existingBankOverlap=overlap,options=[])
 for i,t in enumerate(opts):
  q['option'+'ABCD'[i]]=t;o={'option':'ABCD'[i],'text':t,'role':'key' if i==k else 'distractor','sourcePassageLocator':loc}
  if i==k:o['support']=exp
  else:o.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes','sourcePassageLocator'],rats[i]))
  e['options'].append(o)
revise('EPA609-REG-015','Written statement: buyer name, business address, “resale or shop use.” For small CFC-12 cans, what correction enables the exception?',
 ['State and follow resale-only intent','Supply the purchaser’s business address','Identify the purchaser instead of the supplier','Provide the declaration in writing'],
 'The statement already identifies the purchaser, includes its business address and is written. Its defect is the proposed shop use. For the under-20-pound CFC-12 resale exception, the purchase must be solely for resale, and the written statement must accurately reflect that intent. Changing words while retaining shop use would not qualify.',
 'Identify the actual defect in a proposed purchaser declaration, rather than reconstruct a checklist from options.','40 CFR 82.42(b)(3), with 82.34(b)',{
 1:('Recognizes the address requirement but fails to check the supplied declaration.','A declaration omitting the purchaser’s business address needs that information.','The stem already supplies the business address.','40 CFR 82.42(b)(3); hypothetical statement in stem'),
 2:('Anticipates a common invoice-header identity error.','A statement giving only the supplier’s identity must identify the purchaser instead.','The supplied declaration gives the buyer’s own name.','40 CFR 82.42(b)(3); hypothetical statement in stem'),
 3:('Remembers that an oral assurance does not satisfy this record requirement.','An oral resale assurance must be documented in writing.','The stem explicitly supplies a written statement.','40 CFR 82.42(b)(3); hypothetical statement in stem')},
 'Replaced majority-component reconstruction with a supplied declaration and four actual corrective actions. Only one correction addresses the supplied defect.',
 'Related to REG-018 and REG-020 purchaser routes, but this is document defect identification. Review the cluster before any expansion.')
revise('EPA609-EQP-022','Rae operates the garage and owns its recover-only machine; Lee owns the off-site recycler. Which arrangement permits recycling there?',
 ['Lee buys Rae’s recovery machine','Rae leases Lee’s recycling machine','Rae buys Lee’s recycling machine','Rae contracts recycling work to Lee'],
 'Rae already operates the extraction establishment and owns the recovery machine. Buying Lee’s recycler gives Rae ownership of both machines, satisfying the off-site recycling ownership condition. Lee buying the recovery machine leaves the common equipment owner separate from the garage operator. Leasing or contracting access does not establish the required ownership. Reclamation is a separate route.',
 'Resolve a concrete equipment acquisition against the common-owner and establishment-operator requirements.','40 CFR 82.32(e)(2)',{
 0:('Checks ownership of both machines but overlooks who operates the extraction establishment.','This acquisition could satisfy the relationship if Lee also owned or operated the extraction establishment.','The stated operator is Rae; Lee only owns the off-site recycler.','40 CFR 82.32(e)(2); hypothetical ownership facts in stem'),
 1:('Treats possession or exclusive access to the second machine as ownership.','Leasing supplies access to equipment, but is not the ownership specified by this exception.','The clause requires the same person to own both machines.','40 CFR 82.32(e)(2)'),
 3:('Assumes a commercial recycling contract can substitute for the ownership chain.','A separate reclamation arrangement is possible; contracting ordinary recycling alone does not meet this exception.','Lee would remain the separate owner of the recycler.','40 CFR 82.32(e)(1)–(2)')},
 'Replaced remote ownership actors with four plausible transactions between the same two parties. The stem’s operator and ownership roles determine which transaction qualifies.',
 'Consolidate with frozen REG-025. These are the same legal ownership objective, not additional coverage.')
revise('EPA609-REG-026','EPA investigates a certified technician’s recovery practices. Which verification procedure is authorized by Section 82.40(f)?',
 ['Retake the certification test through its issuer','Operate recovery equipment at the business premises','Repeat practical training with the course provider','Have the shop owner demonstrate for the technician'],
 'Section 82.40(f) permits EPA to require the technician’s own demonstration at the business premises. It does not specify a substitute demonstration by the owner, repeat training, or an automatic certification retest for this verification. Separate recertification provisions apply in their own circumstances, including after revocation.',
 'Distinguish the verification procedure authorized by 82.40(f) from retraining, recertification and substitution of another demonstrator.','40 CFR 82.40(a)(1), (a)(3)–(4), (d), (f)',{
 0:('Equates an enforcement check of current technique with repeating the certification examination.','Certification testing and recertification are addressed separately; revocation requires recertification before further service.','The question concerns the on-site demonstration provision for a presently certified technician.','40 CFR 82.40(a)(3)–(4), (d), (f)'),
 2:('Treats referral to an instructor as the required way to verify practical competence.','Instructor-led or on-the-job training is an approved means of training.','The specified provision authorizes direct demonstration at the business premises.','40 CFR 82.40(a)(1), (f)'),
 3:('Assumes the owner can demonstrate the business’s competence on an employee’s behalf.','The owner could demonstrate their own competence if they were the technician being checked.','The inquiry concerns the named technician’s ability, not another operator’s ability.','40 CFR 82.40(f)')},
 'Removed the live-act versus three-paperwork partition. All alternatives now describe verification or training procedures involving a person performing a task.')
revise('EPA609-SRV-029','Condenser C205 revision B replaces C101. Which hypothetical record supplies the applicable charge specification?',
 ['VIN label: C101 original assembly','Installation sheet: C205 revision B','Service bulletin: C205 revision A','Workshop table: C101 original assembly'],
 'The installation sheet matches both the installed C205 component and revision B. The VIN label and workshop table describe C101, while the bulletin concerns C205 revision A. These are hypothetical records illustrating applicability, not real manufacturer part numbers or bulletins. The lesson is to match current instructions to the installed configuration, not to rank document types universally.',
 'Match charge information to the installed component and its revision.','MACS January 2025, printed page 25, service revisions and replacement condenser instructions; original hypothetical record data',{
 0:('Gives the vehicle-linked label priority without checking the component change.','The VIN label can govern the original C101 assembly.','C101 has been replaced by C205 revision B.','MACS page 25; hypothetical record identity supplied in option'),
 2:('Recognizes the matching part number but overlooks the revision difference.','A bulletin for C205 revision A applies when that revision is installed.','The stem identifies revision B.','MACS page 25, late component changes and revised charge instructions; hypothetical revision facts'),
 3:('Uses the model-level workshop capacity without checking the installed assembly.','The workshop table can govern the C101 assembly it describes.','The installed assembly is C205 revision B.','MACS page 25; hypothetical configuration facts')},
 'Replaced predeclared obsolete references with neutral records carrying component and revision identifiers. No refrigerant quantity or real technical bulletin was invented.')
# Minor targeted edits retain all other wording and option order.
q=next(q for q in qs if q['questionId']=='EPA609-REG-004')
q['question']='Which business receives an equipment exception under federal MVAC servicing requirements?'
e=es[q['questionId']];e['discriminatingFact']=q['question'];e['change']='Removed top-off-only from the stem so both service scope and appliance class must be assessed. Options and explanation unchanged.'
q=next(q for q in qs if q['questionId']=='EPA609-EQP-013')
q['question']='In Robinair 34788NI filter-replacement training, a valid code is entered. What must finish before the shutdown prompt?'
q['explanation']='After valid code entry, this model clears the existing filter before displaying acceptance and prompting shutdown. Filter capacity is a maintenance trigger, not a requirement to postpone early replacement. Oil warming and the leak check follow installation. Waiting for the prompt allows the prescribed refrigerant-clearing stage to finish before the connection is opened.'
e=es[q['questionId']];e['discriminatingFact']=q['question'];e['change']='Corrected chronology: valid code entry precedes clearing; the acceptance/shutdown display follows clearing. Explicitly scoped to model-specific training.'
for o in e['options']:
 if o['role']=='key':o['support']=q['explanation']
q=next(q for q in qs if q['questionId']=='EPA609-SRV-031')
q['optionA']='Days since the last pump oil change'
q['explanation']='MACS gives pump operating hours as a typical basis for vacuum-pump oil changes, with the pump’s own instructions controlling. Calendar days and vehicle counts are imperfect proxies for operating time. Refrigerant throughput instead concerns the recovery filter’s service interval.'
e=es[q['questionId']];e['change']='Replaced cylinder retest date with calendar time since the same pump’s last oil change. No change to the keyed operating-hours distinction.'
for o in e['options']:
 if o['role']=='key':o['support']=q['explanation']
 if o['option']=='A':o.update(text=q['optionA'],whyCandidateMightChoose='Uses elapsed calendar time as a proxy for pump workload.',validOtherCondition='Calendar time describes elapsed time since service; a manufacturer may specify its own schedule. No universal calendar interval is asserted.',whyStemExcludes='The cited typical schedule is based on pump operation, which can vary between days.',sourcePassageLocator='MACS January 2025, printed page 23, vacuum pump maintenance paragraph')
changed=[q['questionId'] for q,b in zip(qs,before) if q!=b]
assert set(changed)=={'EPA609-REG-015','EPA609-EQP-022','EPA609-REG-004','EPA609-REG-026','EPA609-SRV-029','EPA609-EQP-013','EPA609-SRV-031'}
assert all(q['correctAnswer']==b['correctAnswer'] and q['correctIndex']==b['correctIndex'] for q,b in zip(qs,before))
ev.update(status='V3 draft after v2 review; no pilot or full-bank approval',date='2026-11-18',parentPilotSha256=hashlib.sha256(source.read_bytes()).hexdigest())
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
(P/'before-after.md').write_text('# V3 targeted repairs\n\nSeven rows changed; seven rows and all fourteen answer positions are unchanged from v2. Prior raw scores remain 94/100, 8/14, and 9/14. None is a gate pass.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+b['question']+'\n\n'+ '\n'.join(l+'. '+b['option'+l] for l in 'ABCD')+'\n\nAfter: '+q['question']+'\n\n'+ '\n'.join(l+'. '+q['option'+l] for l in 'ABCD')+'\n\n'+es[q['questionId']]['change'] for q,b in zip(qs,before) if q!=b)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'));report={'changedIds':changed,'sevenRowsUnchanged':True,'allKeyPositionsUnchanged':True,'fullPilot':analyse(items),'categories':{c:analyse([it for it in items if it[1]==c]) for c in sorted({it[1] for it in items})},'stemWordCounts':{q['questionId']:len(q['question'].split()) for q in qs},'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()}
(P/'diagnostics.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
