import json, sys, os, importlib.util
HERE=os.path.dirname(os.path.abspath(__file__))
CATS=[("uklgvHours","HRS","q_hours"),("uklgvVehicle","VEH","q_vehicle"),("uklgvLoading","LOAD","q_load"),
      ("uklgvRoad","ROAD","q_road"),("uklgvDocs","DOC","q_docs"),("uklgvIncidents","INC","q_incidents"),
      ("uklgvSigns","SIGN","q_signs")]
rows=[]
for key,seg,mod in CATS:
    spec=importlib.util.spec_from_file_location(mod,os.path.join(HERE,mod+".py")); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for i,(q,k,ds,ex) in enumerate(m.ITEMS):
        assert len(ds)==3, q
        slot=i%4; opts=list(ds); opts.insert(slot,k)
        L="ABCD"[slot]
        rows.append({"type":"UKLGV","state":"ALL","questionId":f"UKLGV-{seg}-{i+1:03d}","category":key,"question":q,
          "optionA":opts[0],"optionB":opts[1],"optionC":opts[2],"optionD":opts[3],"correctAnswer":L,"correctIndex":slot,"explanation":ex})
        lens=[len(o) for o in opts]; wa=sum(len(d) for d in ds)/3
        if len(k)==max(lens) and lens.count(len(k))==1 or len(k)>1.2*wa: print("LONGKEY",f"{seg}-{i+1:03d}",len(k),round(wa),k)
    print(key,len(m.ITEMS))
out=sys.argv[1]
json.dump(rows,open(out,"w"),indent=2,ensure_ascii=False); open(out,"a").write("\n")
