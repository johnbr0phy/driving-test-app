import sys,re,html
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.out=[]; s.skip=0; s.inmain=False
    def handle_starttag(s,t,a):
        if t in('script','style','nav','header','footer'): s.skip+=1
        if t in('p','li','h1','h2','h3','h4','tr','br','div'): s.out.append('\n')
        if t=='img':
            d=dict(a); 
            if d.get('alt'): s.out.append(' [IMG: '+d['alt']+'] ')
    def handle_endtag(s,t):
        if t in('script','style','nav','header','footer'): s.skip=max(0,s.skip-1)
    def handle_data(s,d):
        if not s.skip: s.out.append(d)
for f in sys.argv[1:]:
    p=P(); p.feed(open(f).read())
    t=''.join(p.out); t=re.sub(r'[ \t]+',' ',t); t=re.sub(r'\n\s*\n+','\n',t)
    open(f.replace('.html','.txt'),'w').write(t)
