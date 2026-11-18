from pathlib import Path
import runpy, pprint, json
root=Path('/Users/johnbrophy/tigertest-next20-frvtc/tools/next20/frvtc')
def revise(name, changes):
 p=root/(name+'.py'); rows=runpy.run_path(str(p))['ROWS']
 for n, fields in changes.items():
  row=list(rows[n-1])
  for field,value in fields.items(): row[field]=value
  rows[n-1]=tuple(row)
 p.write_text('"""Original items; see category plan and item source map."""\nROWS = '+pprint.pformat(rows,width=118,sort_dicts=False)+'\n')
revise('t3p',{
 23:{1:["Le médiateur de l'assurance automobile", "La chambre de métiers et de l'artisanat", "Le Défenseur des droits", "L'autorité de régulation des plateformes"]},
 29:{1:["Le renouvellement d'agissements humiliants", "La seule intention de séduire exprimée", "L'exigence d'un contact corporel préalable", "La diffusion obligatoire devant des tiers"]},
 30:{1:["Le nombre de trajets déjà effectués ensemble", "La coordination des auteurs envers la victime", "Le dépôt d'une plainte avant le dernier propos", "La répétition personnelle par chacun des auteurs"]},
 31:{1:["Une relation salariée est indispensable", "La pression doit avoir obtenu l'acte recherché", "Un fait unique peut suffire à la qualification", "La menace doit être répétée devant un témoin"]},
 32:{1:["Toute parole sexuelle constitue un acte physique", "La qualité de passager crée une répétition légale", "Le dépôt de plainte remplace l'élément matériel", "Un outrage peut résulter d'un fait unique"]},
 33:{1:["Le cadre professionnel du transport concerné", "Le caractère nocturne de la prestation facturée", "L'absence de réservation au nom de l'auteur", "Le tarif majoré appliqué pour la prise en charge"]},
 35:{1:["Le 3928 pour l'orientation sur les droits", "Le 3919 pour l'écoute et l'information", "Police Secours au 17", "Le service de médiation de la plateforme"]},
 36:{1:["La réclamation électronique auprès du médiateur", "Le signalement commercial sur SignalConso", "La saisine en ligne du registre des exploitants", "Le tchat officiel avec un policier ou un gendarme"]},
})
revise('securite',{
 1:{1:["Votre voiture, car sa voie est plus large", "La voiture venant de droite", "Le véhicule arrivé le premier au carrefour", "Le véhicule circulant sur la rue la plus fréquentée"]},
 4:{1:["Passer avant lui comme dans une insertion ordinaire", "Céder uniquement aux cycles allant dans votre sens", "Lui céder le passage même dans ce sens de circulation", "Appliquer la priorité à droite entre les deux véhicules"]},
 5:{1:["Après le feu, en avançant jusqu'à la file arrêtée", "Avant de vous engager dans l'intersection", "Au point de croisement, sans dépasser la ligne médiane", "À la sortie du carrefour, même en gênant l'autre voie"]},
 10:{1:["Augmenter l'allure pour abréger son dépassement", "Tenir votre droite sans augmenter votre vitesse", "Freiner fortement dès qu'elle arrive à votre hauteur", "Déborder sur l'accotement pour lui laisser votre voie"]},
 12:{1:["Un dépassement par la droite soumis à dérogation", "Un changement de voie autorisé par la densité", "Une simple avance d'une file sur une autre", "Une manœuvre réservée aux voies pour véhicules lents"]},
 16:{1:["Continuer car vous circulez déjà sur la chaussée", "Céder seulement après son engagement dans votre voie", "Ralentir pour lui permettre de repartir", "Céder uniquement si vous êtes sur une voie de bus"]},
 19:{1:["Le suivi vidéo de la prochaine prise en charge", "Le tableau des recettes du chauffeur", "La visioconférence avec le client à venir", "La carte de guidage du trajet"]},
 20:{1:["La voie gauche jusqu'au prochain dépassement prévu", "La voie centrale si la route en possède trois", "La voie droite après les contrôles nécessaires", "La voie empruntée par le véhicule précédent"]},
 22:{1:["Freiner fortement pour respecter l'arrêt au jaune", "Poursuivre le franchissement sans accélération brusque", "Freiner à la ligne même si le véhicule reste engagé", "S'arrêter après le feu dès que la chaussée le permet"]},
 24:{1:["Oui, si la prochaine réservation est confirmée", "Oui, tant qu'aucun passager n'est présent", "Non, le port reste obligatoire dans ce cas", "Oui, si les arrêts sont espacés de moins d'un kilomètre"]},
 27:{0:"Un chauffeur sous traitement se sent somnolent après une prise, alors que la précédente n'avait provoqué aucun symptôme. Quelle décision immédiate est adaptée à ce changement ?",1:["Reporter la vérification au prochain rendez-vous", "Réduire la dose lui-même avant la prochaine course", "Poursuivre si le trajet restant est uniquement urbain", "Interrompre le trajet dans un endroit sûr"],3:"Une somnolence ou une difficulté de concentration impose d'arrêter la conduite en sécurité. L'absence de symptôme lors d'une prise antérieure ne garantit pas la compatibilité ; le traitement doit être discuté avec un professionnel, sans modification autonome."},
 30:{0:"Après chargement, une valise empêche le conducteur d'adopter sa position habituelle. Quel contrôle porte directement sur la conformité de sa position de conduite ?",1:["La répartition du poids entre les sièges arrière", "La liberté d'exécuter toutes les manœuvres", "Le volume inscrit dans les conditions commerciales", "Le nombre de valises indiqué lors de la commande"]},
 32:{1:["Garder la vitesse puis freiner à l'approche de la file", "Rouler au point mort pour laisser le moteur au ralenti", "Relâcher tôt l'accélérateur et anticiper le ralentissement", "Conserver un régime élevé pour disposer de reprise"]},
 33:{0:"Un chauffeur compare des équipements qu'il pourrait laisser installés entre deux prestations. Lequel accroît inutilement la résistance à l'air s'il reste monté alors qu'il n'est plus utile ?",1:["Le porte-bagages extérieur de toit", "Le tapis de protection posé dans le coffre", "Le support de téléphone fixé au tableau de bord", "Le dispositif de retenue enfant à l'arrière"],3:"Un équipement extérieur de toit inutilisé augmente la résistance à l'air et la consommation. Les autres accessoires cités restent à l'intérieur de la carrosserie et ne créent pas cet effet aérodynamique."},
 35:{1:["Le nom de la commune et la couleur du véhicule", "Le numéro de route et la destination du client", "Le sens du trajet et le nom de l'exploitant VTC", "Le numéro de route, le sens et le point kilométrique"]},
})
p=Path('/Users/johnbrophy/tigertest-next20-progress/progress.json')
d=json.loads(p.read_text()); e=next(x for x in d['exams'] if x.get('id')=='frvtc')
e.update(status='Active: 200-question draft under full self-review; wiring not started',bankRows=200,authoredCategories=['T3P 36','Gestion 24','Sécurité 36','Français 24','Anglais 12','Commercial 36','Réglementation VTC 32'],sourceGate='Primary sources fetched for authored rules; source map reconciliation and final source-specific checks in progress. Official QCM multiple-answer detail unconfirmed; app explicitly single-answer.',research='Current official syllabus plus transport laws/orders, road code, government guidance, BPI business sources, CNIL, current criminal-law provisions, and CEFR descriptors read.')
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
