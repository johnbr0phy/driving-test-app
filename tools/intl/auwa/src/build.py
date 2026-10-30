import json, sys, importlib.util, os
HERE = os.path.dirname(os.path.abspath(__file__))
CATS = [("auwaLicence","LIC","lic",28),("auwaSafety","SAF","saf",28),("auwaSpeed","SPD","spd",24),
        ("auwaSigns","SGN","sgn",28),("auwaIntersect","INT","int",32),("auwaLanes","LAN","lan",20),
        ("auwaSharing","SHR","shr",20),("auwaParking","PRK","prk",20)]
out=[]; bad=False
for key,seg,mod,n in CATS:
    spec=importlib.util.spec_from_file_location(mod, os.path.join(HERE, mod+".py"))
    m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    items=m.ITEMS
    if len(items)!=n: print(f"{key}: {len(items)} items, want {n}"); bad=True
    for i,(stem,k,ds,ex) in enumerate(items):
        assert len(ds)==3, stem
        pos=i%4; opts=list(ds); opts.insert(pos,k)
        out.append({"type":"AUWA","state":"ALL","questionId":f"AUWA-{seg}-{i+1:03d}","category":key,
          "question":stem,"optionA":opts[0],"optionB":opts[1],"optionC":opts[2],"optionD":opts[3],
          "correctAnswer":"ABCD"[pos],"correctIndex":pos,"explanation":ex})
json.dump(out, open(sys.argv[1],"w",encoding="utf-8"), indent=2, ensure_ascii=False); open(sys.argv[1],"a").write("\n")
print(len(out), "rows", "BAD" if bad else "")
