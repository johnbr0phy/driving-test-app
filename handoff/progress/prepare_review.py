import argparse,json,pathlib
p=argparse.ArgumentParser();p.add_argument('bank');p.add_argument('out');a=p.parse_args()
rows=json.loads(pathlib.Path(a.bank).read_text());out=pathlib.Path(a.out);out.mkdir(parents=True,exist_ok=True)
fields=['questionId','category','optionA','optionB','optionC','optionD']
(out/'options-only.json').write_text(json.dumps([{k:q[k] for k in fields} for q in rows],ensure_ascii=False,indent=2)+'\n')
(out/'blind-questions.json').write_text(json.dumps([{k:q[k] for k in ['questionId','category','question','optionA','optionB','optionC','optionD']} for q in rows],ensure_ascii=False,indent=2)+'\n')
print(len(rows),'questions prepared')
