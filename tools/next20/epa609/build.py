"""Rebuild the EPA609 bank and objective/source map from original item source."""
import json
from pathlib import Path
import runpy
ROOT=Path(__file__).resolve().parent
ITEMS=runpy.run_path(str(ROOT/'items.py'))['ITEMS']
MORE=runpy.run_path(str(ROOT/'more_items.py'))['MORE']
for category,items in MORE.items():
 ITEMS[category].extend(items)
SEG={'epa609Rules':'REG','epa609Equipment':'EQP','epa609Service':'SRV','epa609Yf':'YF'}
rows=[]
mapping=[]
for category,items in ITEMS.items():
 for n,item in enumerate(items,1):
  objective,source,question,key,*rest=item
  wrong=rest[:3]; explanation=rest[3]
  index=(n-1)%4
  options=wrong.copy();options.insert(index,key)
  qid=f'EPA609-{SEG[category]}-{n:03}'
  rows.append(dict(type='EPA609',state='ALL',questionId=qid,category=category,question=question,**dict(zip(('optionA','optionB','optionC','optionD'),options)),correctAnswer='ABCD'[index],correctIndex=index,explanation=explanation))
  if source.startswith('MACS'):
   url='https://macsmobileairclimate.org/wp-content/uploads/2025/01/MACS-609-CertTrainingManual-2025.pdf'
  elif source.startswith('EPA overlap'):
   url='https://www.epa.gov/section608/section-608-and-section-609-overlap'
  elif source.startswith('EPA impacts'):
   url='https://www.epa.gov/mvac/acceptable-refrigerants-and-their-impacts'
  elif source.startswith('EPA sales'):
   url='https://www.epa.gov/section608/refrigerant-sales-restriction'
  elif source.startswith('EPA retrofit'):
   url='https://www.epa.gov/mvac/choosing-and-using-retrofit-refrigerant-cfc-12-mvac'
  elif source.startswith('EPA servicing'):
   url='https://www.epa.gov/mvac/regulatory-requirements-mvac-system-servicing'
  else:
   url='https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B'
  mapping.append(dict(questionId=qid,objective=objective,sourceURL=url,sourceLocator=source,fetched='2026-11-18'))
# Overlay the revised 40-item pilot (v5, Nov 18 2026) by question ID: these rows replaced
# rejected originals and carry their own key positions, objectives and source locators.
PILOT={q['questionId']:q for q in json.loads((ROOT/'pilot_v5.json').read_text())}
EVID={e['questionId']:e for e in json.loads((ROOT/'pilot_v5_evidence.json').read_text())['items']}
URLS={'Robinair SP':'https://www.robinair.com/sites/default/files/documents/SP01972025%2520VER%252001_EN.pdf',
 'Robinair AC':'https://www.robinair.com/sites/default/files/documents/567817%20REV%20F%20EN.pdf',
 'MACS':'https://macsmobileairclimate.org/wp-content/uploads/2025/01/MACS-609-CertTrainingManual-2025.pdf',
 'EPA Choosing':'https://www.epa.gov/mvac/choosing-and-using-retrofit-refrigerant-cfc-12-mvac',
 'EPA Section 608':'https://www.epa.gov/section608/section-608-and-section-609-overlap',
 'EPA Regulatory':'https://www.epa.gov/mvac/regulatory-requirements-mvac-system-servicing',
 'EPA Unique Fittings':'https://www.epa.gov/mvac/unique-fittings-and-label-colors',
 'EPA Acceptable':'https://www.epa.gov/mvac/acceptable-refrigerants-and-their-impacts',
 'Robinair 34788':'https://www.robinair.com/sites/default/files/documents/SP01972025%2520VER%252001_EN.pdf',
 'Robinair 22791':'https://www.robinair.com/sites/default/files/documents/550029_EN_0.pdf',
 '49 CFR':'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-178/subpart-C/section-178.65',
 'DENSO':'https://www.denso-am.eu/news/dont-overlook-compressor-oil-reminds-denso',
 'Tesla':'https://service.tesla.com/docs/Model3/ServiceManual/2024/en-us/GUID-3C5B5D4F-24A7-4EAE-B382-C93A2DEC1BFA.html',
 'Honeywell Solstice yf SDS v3.4, section 4':'https://openstax.org/books/college-physics-2e/pages/14-3-phase-change-and-latent-heat',
 'Honeywell Solstice yf SDS sections':'https://macsmobileairclimate.org/wp-content/uploads/2025/01/MACS-609-CertTrainingManual-2025.pdf'}
for i,row in enumerate(rows):
 q=PILOT.get(row['questionId'])
 if not q: continue
 rows[i]=q
 e=EVID[q['questionId']]; loc=e['sourcePassageLocator']
 url=next((u for k,u in URLS.items() if loc.startswith(k)),'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B' if loc.startswith('40') else '')
 mapping[i]=dict(questionId=q['questionId'],objective=e['objective'],sourceURL=url,sourceLocator=loc,fetched='2026-11-18')
assert len(PILOT)==40 and sum(r['questionId'] in PILOT for r in rows)==40
(ROOT/'questions.json').write_text(json.dumps(rows,indent=2)+'\n')
(ROOT/'source-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
(ROOT.parents[2]/'data/epa609-questions.json').write_text(json.dumps(rows,indent=2)+'\n')
print(len(rows),'questions')
