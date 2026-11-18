from pathlib import Path
import runpy,json,subprocess,sys,re,colorsys
R=Path('/Users/johnbrophy/tigertest-next20-frvtc');out=Path('/Users/johnbrophy/tigertest-next20-progress/frvtc-research');b=runpy.run_path(str(R/'tools/next20/frvtc/build.py'))
for module,_,_,count in b['CATEGORIES']:
 bank,m=b['build'](module);p=out/(module+'-final.json');p.write_text(json.dumps(bank,ensure_ascii=False,indent=2))
 for cmd in [[sys.executable,'.claude/skills/exam-bank/scripts/validate_bank.py',str(p),'--rows',str(count),'--lang','fr'],[sys.executable,'tools/check_answer_patterns.py',str(p)],[sys.executable,'tools/check_option_reuse.py',str(p),'--list']]:
  subprocess.run(cmd,cwd=R,check=True)
for script,args in [('.claude/skills/exam-bank/scripts/validate_bank.py',['--lang','fr']),('tools/check_answer_patterns.py',[]),('tools/check_option_reuse.py',['--list'])]:subprocess.run([sys.executable,script,'data/france-vtc-questions.json',*args],cwd=R,check=True)
# Check short pool directly because CLI intentionally excludes banks smaller than 20.
m=runpy.run_path(str(R/'tools/check_option_reuse.py'))
print('Direct analysis functions:',[k for k,v in m.items() if callable(v) and not k.startswith('_')])
