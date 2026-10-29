import sys,re,html
s=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
m=re.search(r'<main.*?</main>',s,re.S)
s=m.group(0) if m else s
s=re.sub(r'<(script|style|nav|footer|header)[^>]*>.*?</\1>','',s,flags=re.S)
s=re.sub(r'<(br|/p|/li|/h\d|/tr|/div)[^>]*>','\n',s)
s=re.sub(r'<[^>]+>','',s)
s=html.unescape(s)
lines=[l.strip() for l in s.split('\n') if l.strip()]
print('\n'.join(lines))
