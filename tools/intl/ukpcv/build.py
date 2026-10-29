import json, importlib.util, sys, os
D=os.path.dirname(os.path.abspath(__file__))
CATS=[("ukpcvHours","HRS","q_hours"),("ukpcvVehicle","VEH","q_vehicle"),("ukpcvPassengers","PAS","q_passengers"),
("ukpcvDriver","DRV","q_driver"),("ukpcvRoad","ROAD","q_road"),("ukpcvIncidents","INC","q_incidents"),("ukpcvSigns","SGN","q_signs")]
rows=[]
for cat,seg,mod in CATS:
    spec=importlib.util.spec_from_file_location(mod,os.path.join(D,mod+".py"));m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
    for i,(q,k,w1,w2,w3,ex) in enumerate(m.ITEMS):
        pos=i%4; opts=[w1,w2,w3]; opts.insert(pos,k)
        r={"type":"UKPCV","state":"ALL","questionId":f"UKPCV-{seg}-{i+1:03d}","category":cat,"question":q}
        for L,o in zip("ABCD",opts): r["option"+L]=o
        r["correctAnswer"]="ABCD"[pos]; r["correctIndex"]=pos; r["explanation"]=ex
        rows.append(r)
    print(cat,len(m.ITEMS))
out=sys.argv[1]
json.dump(rows,open(out,"w"),indent=2,ensure_ascii=False); open(out,"a").write("\n")
# report long keys
import statistics
for r in rows:
    k=r["correctAnswer"]; ln={L:len(r["option"+L]) for L in "ABCD"}; oth=[v for L,v in ln.items() if L!=k]
    flag=[]
    if ln[k]>1.2*statistics.mean(oth): flag.append("far")
    if ln[k]==max(ln.values()) and list(ln.values()).count(ln[k])==1: flag.append("longest")
    if flag: print(r["questionId"],flag,r["option"+k])
