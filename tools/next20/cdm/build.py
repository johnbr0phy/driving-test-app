"""Original CDM items; each row owns its key and distractors. No option families."""
import json, runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent
SPEC=[('nutrition','cdmNutrition','NUT',40),('foodservice','cdmFoodservice','FOO',44),('personnel','cdmPersonnel','PER',40),('safety','cdmSafety','SAF',48),('business','cdmBusiness','BUS',28)]
rows=[]
for file,category,segment,count in SPEC:
 p=HERE/(file+'.py')
 if not p.exists(): continue
 items=runpy.run_path(str(p))['ITEMS']
 assert len(items)==count,(file,len(items),count)
 for i,(stem,key,wrong,explanation,source) in enumerate(items,1):
  assert len(wrong)==3
  options=wrong.copy(); index=(i-1)%4;options.insert(index,key)
  rows.append(dict(type='CDM',state='ALL',questionId=f'CDM-{segment}-{i:03}',category=category,question=stem,**dict(zip(['optionA','optionB','optionC','optionD'],options)),correctAnswer='ABCD'[index],correctIndex=index,explanation=explanation))
out=HERE.parents[2]/'data/cdm-questions.json';out.write_text(json.dumps(rows,indent=2,ensure_ascii=False)+'\n');print(len(rows),'items')
