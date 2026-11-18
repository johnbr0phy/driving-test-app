from pathlib import Path
import runpy,pprint
R=Path('/Users/johnbrophy/tigertest-next20-frvtc/tools/next20/frvtc')
def revise(name,changes):
 p=R/(name+'.py');rows=runpy.run_path(str(p))['ROWS']
 for n,fields in changes.items():
  r=list(rows[n-1])
  for field,value in fields.items():
   if field=='key':r[1][r[2]]=value
   else:r[field]=value
  rows[n-1]=tuple(r)
 p.write_text('"""Original source-backed items; corrective design in revision-plan-v2.md."""\nROWS = '+pprint.pformat(rows,width=118,sort_dicts=False)+'\n')
revise('t3p',{
4:{0:"Un passant hèle un VTC libre. Quelle pièce manque pour autoriser sa prise en charge ?"},
10:{0:"Comment vérifier l'habilitation d'un organisme proposant un stage obligatoire de quatorze heures ?"},
13:{0:"L'exploitant possède sa couverture automobile. Quelle garantie distincte doit-il détenir pour les dommages liés à ses prestations ?"},
18:{0:"Quelle décision peut prendre le chauffeur sans subir une pénalité de sa plateforme ?"},
28:{0:"Le voyageur reste figé face à un geste intime. Que son silence ne permet-il pas d'établir ?"},
36:{'key':"Le tchat officiel de signalement"},
})
revise('commercial',{
4:{'key':"Consulter d'autres clientèles et créneaux"},
6:{'key':"Une nouvelle liaison ferroviaire"},
19:{'key':"Son site internet administré en interne"},
27:{'key':"Le médiateur désigné par le professionnel"},
})
revise('reglementation',{
7:{'key':"Un lumineux de toit du type réservé aux taxis"},
17:{0:"Pour un festival, une entreprise prévoit un renfort exceptionnel. Quelles pièces joindre au calendrier déclaré ?"},
21:{'key':"La régularisation avant un éventuel refus"},
27:{'key':"Le document provisoire de l'Imprimerie nationale"},
})
