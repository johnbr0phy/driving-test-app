import sys, subprocess, re, hashlib, os
from bs4 import BeautifulSoup
out = sys.argv[1]
mode = sys.argv[2]  # text or links
for url in sys.argv[3:]:
    h = subprocess.run(["curl","-sSL",url],capture_output=True).stdout.decode("utf8","replace")
    s = BeautifulSoup(h,"lxml")
    main = s.find("main") or s.find(id="content") or s.body
    if mode=="links":
        for a in main.find_all("a",href=True):
            print(a["href"], "|", a.get_text(" ",strip=True)[:80])
    else:
        for t in main(["script","style","nav"]): t.decompose()
        txt = re.sub(r"\n\s*\n+","\n",main.get_text("\n",strip=True))
        name = re.sub(r"[^a-z0-9]+","_",url.split("qld.gov.au")[-1].lower()).strip("_")[:90]
        open(os.path.join(out,name+".txt"),"w").write(url+"\n"+txt)
        print(name, len(txt))
