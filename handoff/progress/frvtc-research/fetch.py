import sys,subprocess,json
from pathlib import Path
from html.parser import HTMLParser
class Text(HTMLParser):
 def __init__(self):super().__init__();self.parts=[];self.skip=0
 def handle_starttag(self,t,a):
  if t in ('script','style'):self.skip+=1
  if t in ('p','li','h1','h2','h3','tr','article'):self.parts.append('\n')
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip:self.parts.append(d.strip()+' ')
p=Path(__file__).parent
for name,u in json.loads(sys.argv[1]).items():
 r=subprocess.run(['curl','-L','--fail','--silent','--show-error',u],capture_output=True)
 if r.returncode:print(name,'FAILED',r.stderr.decode()[:160]);continue
 raw=r.stdout.decode();p.joinpath(name+'.html').write_text(raw);t=Text();t.feed(raw);text='\n'.join(' '.join(s.split()) for s in ''.join(t.parts).split('\n') if s.strip());p.joinpath(name+'.txt').write_text(text);print(name,len(text))
