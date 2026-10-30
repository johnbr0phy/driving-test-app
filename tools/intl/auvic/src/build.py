import json, sys, importlib.util, os
HERE = os.path.dirname(os.path.abspath(__file__))
CATS = [("c1_licence","auvicLicence","LIC"),("c2_alcohol","auvicAlcohol","ALC"),("c3_safe","auvicSafe","SAF"),
        ("c4_speed","auvicSpeed","SPD"),("c5_signs","auvicSigns","SGN"),("c6_giveway","auvicGiveWay","GIV"),
        ("c7_turning","auvicTurning","TRN"),("c8_sharing","auvicSharing","SHR")]
rows=[]
for mod,key,seg in CATS:
    spec=importlib.util.spec_from_file_location(mod, os.path.join(HERE,mod+".py")); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for i,(stem,k,wrong,expl) in enumerate(m.ITEMS):
        assert len(wrong)==3, stem
        slot=i%4; opts=list(wrong); opts.insert(slot,k)
        r={"type":"AUVIC","state":"ALL","questionId":f"AUVIC-{seg}-{i+1:03d}","category":key,"question":stem}
        for L,o in zip("ABCD",opts): r["option"+L]=o
        r["correctAnswer"]="ABCD"[slot]; r["correctIndex"]=slot; r["explanation"]=expl
        rows.append(r)
    print(key, len(m.ITEMS))
out=sys.argv[1]
json.dump(rows, open(out,"w",encoding="utf-8"), indent=2, ensure_ascii=False); open(out,"a").write("\n")
print(len(rows))
