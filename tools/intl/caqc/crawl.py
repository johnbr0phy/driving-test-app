import re,subprocess,os,sys
base="https://www.quebec.ca"
seen=set(); queue=list(sys.argv[1:])
os.makedirs("pages",exist_ok=True)
while queue and len(seen)<120:
    p=queue.pop(0)
    p=p.split('#')[0]
    if p in seen: continue
    seen.add(p)
    fn="pages/"+p.strip('/').replace('/','__')+".html"
    subprocess.run(["curl","-sSL","-A","Mozilla/5.0 Chrome/124",base+p,"-o",fn])
    try: s=open(fn,encoding='utf-8',errors='ignore').read()
    except: continue
    for l in re.findall(r'href="(/en/transports/(?:traffic-road-safety|driving-licence|winter|vehicles)[^"#?]*)',s):
        if l not in seen: queue.append(l)
print(len(seen))
