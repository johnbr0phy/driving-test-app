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
(ROOT/'questions.json').write_text(json.dumps(rows,indent=2)+'\n')
(ROOT/'source-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
(ROOT.parents[2]/'data/epa609-questions.json').write_text(json.dumps(rows,indent=2)+'\n')
print(len(rows),'questions')
