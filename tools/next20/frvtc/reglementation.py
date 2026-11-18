"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [('Au jour du contrôle, quatre berlines diesel non hybrides, non classées en collection, remplissent les autres '
  "caractéristiques VTC. Laquelle respecte encore la limite d'ancienneté ?",
  ['La voiture mise en circulation il y a sept ans et un mois',
   'La voiture mise en circulation il y a six ans et neuf mois',
   'La voiture mise en circulation il y a huit ans et deux mois',
   'La voiture mise en circulation il y a neuf ans et six mois'],
  1,
  'Une voiture thermique non hybride et non de collection doit avoir moins de sept ans. Seule la fiche à six ans et '
  'neuf mois reste sous cette limite ; les autres conditions sont données conformes.',
  "Appliquer la limite d'ancienneté thermique",
  'VEH-1'),
 ('Quatre voitures de cinq places, conformes sur les autres points, mesurent chacune 4,30 m. Laquelle bénéficie de '
  "l'exception aux dimensions minimales prévue pour les VTC ?",
  ['La voiture diesel non hybride',
   'La voiture essence non hybride',
   'La voiture GPL non hybride',
   'La voiture entièrement électrique'],
  3,
  "Les véhicules électriques et hybrides bénéficient de l'exception aux caractéristiques visées par l'arrêté, dont "
  "les dimensions. Les motorisations thermiques non hybrides proposées n'en bénéficient pas.",
  'Distinguer exception électrique et règle générale',
  'VEH-2',
  'CODE-VEH-6'),
 ('Un véhicule homologué pour neuf places au total est utilisé comme VTC. Combien de clients peut-il transporter au '
  'maximum en plus du chauffeur ?',
  ['Huit', 'Neuf', 'Sept', 'Six'],
  0,
  'La limite de neuf places comprend le conducteur. Il reste donc huit places pour les passagers, sous réserve de '
  "l'homologation et des équipements du véhicule.",
  'Compter le conducteur dans les places',
  'CODE-VEH-6'),
 ('Un exploitant compare quatre berlines thermiques non hybrides, conformes par ailleurs. Quelle fiche atteint le '
  'minimum de puissance nette VTC ?',
  ['82 kW pour une puissance fiscale de 7 CV',
   '80 kW pour une puissance fiscale de 8 CV',
   '85 kW pour une puissance fiscale de 6 CV',
   '83 kW pour une puissance fiscale de 9 CV'],
  2,
  'Le minimum est de 84 kW de puissance nette. Les CV fiscaux ne remplacent pas cette mesure : la fiche à 85 kW '
  'convient, même avec une puissance fiscale inférieure aux autres.',
  'Utiliser la bonne mesure de puissance',
  'VEH-1'),
 ('Quatre berlines thermiques non hybrides ont quatre portes, cinq places, 90 kW et trois ans. Quelle fiche respecte '
  'aussi les dimensions minimales VTC, mesurées hors tout ?',
  ['Longueur 4,48 m ; largeur 1,78 m',
   'Longueur 4,62 m ; largeur 1,72 m',
   'Longueur 4,70 m ; largeur 1,68 m',
   'Longueur 4,49 m ; largeur 1,69 m'],
  1,
  'Il faut au moins 4,50 m de longueur et 1,70 m de largeur. La fiche 4,62 × 1,72 m respecte les deux seuils ; les '
  'autres échouent sur un ou deux, malgré leurs autres caractéristiques conformes.',
  'Vérifier deux dimensions indépendantes',
  'VEH-1'),
 ('Un garage propose quatre véhicules thermiques non hybrides, tous conformes en dimensions, puissance, places et '
  'âge. Quel véhicule respecte également le minimum de portes pour le VTC ?',
  ['Un coupé à deux portes',
   'Une citadine à trois portes',
   'Un cabriolet à deux portes',
   'Une berline à quatre portes'],
  3,
  'Le véhicule doit avoir au moins quatre portes. La berline satisfait ce critère ; les autres caractéristiques sont '
  'indiquées conformes pour isoler cette comparaison.',
  'Distinguer portes et places',
  'VEH-1'),
 ('Un exploitant prépare quatre aménagements pour sa voiture VTC. Lequel présente un risque de confusion avec un '
  'équipement propre au taxi et doit être écarté ?',
  ['Un dispositif lumineux de toit semblable au taxi',
   'Un support intérieur pour le guidage du chauffeur',
   "Un panneau amovible au nom du client à l'accueil",
   'Un rangement intérieur pour les justificatifs'],
  0,
  "Un VTC ne doit pas être équipé d'un dispositif extérieur lumineux pouvant créer une confusion avec un taxi. Les "
  'autres aménagements décrits ne sont pas de tels dispositifs.',
  'Reconnaître un équipement réservé aux taxis',
  'CODE-VEH-7'),
 ('Un professionnel compare des modes de pose pour ses vignettes VTC définitives. Quel montage répond à la fixation '
  'réglementaire ?',
  ['Une pochette fixée par deux ventouses au vitrage',
   'Un porte-document détachable sur la plage arrière',
   'Une pose collée dont le retrait détruit la vignette',
   'Une fixation magnétique retirée après le service'],
  2,
  "Les vignettes doivent être fixées de sorte qu'elles ne puissent pas être retirées sans être détruites. Une pose "
  'dans un support récupérable ne satisfait pas cette exigence.',
  'Appliquer la fixation obligatoire actualisée',
  'SIGN-4'),
 ('Sur un VTC avec conduite à gauche, où faut-il placer les deux vignettes définitives ?',
  ["En bas à gauche à l'avant et en bas à droite à l'arrière",
   "En haut à droite à l'avant et en haut à gauche à l'arrière",
   'En bas à droite sur les deux vitrages avant et arrière',
   'En bas à gauche sur les deux vitrages avant et arrière'],
  0,
  "L'arrêté prévoit l'angle inférieur gauche du pare-brise avant, côté conducteur, et l'angle inférieur droit du "
  "vitrage arrière, à l'opposé du conducteur.",
  'Situer la signalétique définitive',
  'SIGN-4'),
 ("Une société utilise régulièrement une voiture qu'elle ne possède pas. Elle choisit de justifier sa capacité "
  'financière par la durée du bail, sans garantie bancaire. Quel engagement locatif minimal satisfait cette voie ?',
  ['Un trimestre ferme', 'Un semestre ferme', 'Un mois renouvelable', 'Une année indivisible'],
  1,
  "Le Code accepte un contrat de location d'au moins six mois. Un semestre ferme atteint ce minimum ; un trimestre "
  "ou un mois renouvelable ne le garantit pas, et une année n'est pas le minimum requis.",
  "Reconnaître le justificatif d'une location longue",
  'CODE-VEH-9'),
 ("Une vignette temporaire a été envoyée le 2 juin pour un recours exceptionnel déclaré jusqu'au 12 juin. "
  "L'exploitant ne dispose d'aucune autre déclaration pour cette voiture. Jusqu'à quelle date cette vignette "
  'peut-elle être utilisée ?',
  ['Le 2 juillet', 'Le 30 juin', 'Le 12 juillet', 'Le 12 juin'],
  3,
  'La validité temporaire ne peut dépasser la fin du recours exceptionnel, même si le plafond de trente jours ouvrés '
  "calculé depuis l'envoi tombe plus tard. Elle s'arrête donc ici au 12 juin.",
  'Articuler deux limites de validité',
  'SIGN-3'),
 ("Une conductrice crée son activité indépendante. Sa carte professionnelle et sa déclaration d'entreprise sont "
  'obtenues ; son véhicule et ses garanties sont prêts. Quelle démarche distincte doit compléter le dossier '
  "d'exploitation ?",
  ['Le renouvellement du permis de conduire',
   "La déclaration périodique des recettes à l'Urssaf",
   "L'inscription de l'exploitant au registre VTC",
   'La demande de carte professionnelle personnelle'],
  2,
  "L'inscription sectorielle au registre VTC reste nécessaire. La création d'entreprise et la carte du conducteur ne "
  "se substituent pas à cette inscription de l'exploitant.",
  'Distinguer conducteur, entreprise et exploitant inscrit',
  'BPI-VTC'),
 ('Un exploitant a remplacé définitivement une voiture inscrite. Il classe cette formalité parmi quatre échéances de '
  'son agenda. Laquelle correspond à la transmission électronique du changement au gestionnaire du REVTC ?',
  ['Dans les quinze jours francs du changement',
   "Au moins trois mois avant l'échéance d'inscription",
   'À la prochaine échéance quinquennale du registre',
   'Au terme du mois de remplacement exceptionnel'],
  0,
  'Le changement des informations du dossier doit être signalé dans les quinze jours francs. Les autres délais '
  'proposés concernent le renouvellement ou le recours exceptionnel à un véhicule.',
  'Respecter le délai de mise à jour du registre',
  'CODE-REG-1'),
 ('Une inscription REVTC expire le 30 novembre. Quelle date de dépôt respecte le délai minimal pour demander son '
  'renouvellement avant cette échéance ?',
  ['Le 30 septembre', 'Le 30 août', 'Le 30 octobre', 'Le 30 novembre'],
  1,
  "La demande doit précéder l'échéance d'au moins trois mois. Le 30 août respecte ce délai pour une échéance au 30 "
  'novembre ; les autres dates sont trop tardives.',
  "Anticiper le renouvellement de l'inscription",
  'CODE-REG-2'),
 ("Une entreprise est inscrite au REVTC le 15 mars 2026. Sans modification de la durée normale de l'inscription, "
  'quelle année correspond à son prochaine échéance de renouvellement ?',
  ['2027', '2029', '2031', '2033'],
  2,
  "L'inscription a une durée de cinq ans : mars 2026 conduit à mars 2031. L'âge du véhicule ou la date de la carte "
  'du chauffeur ne modifient pas cette durée.',
  "Identifier la période de l'inscription",
  'L3122-3'),
 ("Une panne rend une voiture inscrite au registre inutilisable. L'exploitant déclare un véhicule supplémentaire au "
  'titre du remplacement exceptionnel prévu par R3122-1 III. Quelle est la durée maximale de ce recours exceptionnel '
  '?',
  ['Quinze jours ouvrés',
   'Trois mois renouvelables automatiquement',
   'Six mois si la location est écrite',
   'Un mois'],
  3,
  "Le recours exceptionnel prévu pour l'impossibilité matérielle d'utiliser une voiture inscrite ne peut excéder un "
  'mois. Un besoin plus durable nécessite de traiter la situation dans le cadre normal du registre.',
  'Distinguer remplacement exceptionnel et flotte régulière',
  'CODE-REG-1-III'),
 ('Pour quatre jours de festival, une entreprise déjà inscrite ajoute deux voitures et deux chauffeurs qui ne '
  'figurent pas dans son dossier. Quel ensemble de copies doit accompagner les dates de début et de fin du renfort '
  'déclaré ?',
  ['Permis des chauffeurs et devis acceptés des clients',
   'Cartes grises des voitures et cartes professionnelles des chauffeurs',
   'Contrats de réservation et factures de location des voitures',
   "Attestations de stage et relevés de chiffre d'affaires"],
  1,
  'La déclaration préalable du recours exceptionnel comporte les cartes grises, les cartes professionnelles et les '
  "dates prévues. Les documents commerciaux ou de formation ne remplacent pas ces pièces d'identification.",
  'Déclarer préalablement un renfort événementiel',
  'CODE-REG-1-III'),
 ('Deux entreprises préparent une coopération. Chacune garde ses chauffeurs et sa comptabilité. Quelle proposition '
  'constitue précisément le prêt de numéro REVTC interdit, même sans paiement ?',
  ['La seconde adresse un client à la première',
   'La première demande un devis à la seconde',
   "La seconde exploite sous l'inscription de la première",
   'Les deux entreprises comparent leurs disponibilités'],
  2,
  "Le numéro d'inscription ne peut être prêté, même gratuitement. Une mise en relation ou un échange commercial "
  "entre entreprises ne se confond pas avec l'utilisation du numéro de l'autre pour exploiter.",
  "Appliquer l'interdiction de prêt d'inscription",
  'L3122-3'),
 ("Une société de VTC établie à Toulouse cherche l'autorité compétente pour gérer son inscription au registre "
  "national. Quelle autorité assure cette gestion sur l'ensemble du territoire ?",
  ['La préfecture de région Occitanie',
   'La chambre de métiers de chaque département',
   "La mairie du siège de l'entreprise",
   "Le préfet de la région d'Île-de-France"],
  3,
  "R3122-5 attribue cette compétence nationale au préfet de la région d'Île-de-France. Elle se distingue des "
  'démarches de carte professionnelle auprès de la préfecture de domicile du conducteur.',
  'Identifier le gestionnaire national du REVTC',
  'CODE-REG-5'),
 ('La SAS Horizon prépare son inscription au registre VTC. Son président est Éric, sa principale actionnaire sans '
  'mandat est Salomé, son conducteur référent est Karim et son comptable est Luc. Qui présente la demande en qualité '
  'de représentant légal décrite ici ?',
  ['Éric, le président de la SAS',
   "Salomé, l'actionnaire principale",
   'Karim, le conducteur référent',
   'Luc, le comptable de la société'],
  0,
  "La demande d'une personne morale est présentée par son représentant légal. Dans le dossier décrit, cette qualité "
  'appartient à Éric, président de la SAS.',
  "Distinguer représentation légale et participation à l'activité",
  'CODE-REG-1-I'),
 ("Le gestionnaire constate que le dossier d'inscription ne justifie pas une obligation requise. L'exploitant reçoit "
  'une invitation formelle à transmettre la pièce. À quelle étape de traitement cette invitation correspond-elle ?',
  ['La notification du renouvellement quinquennal',
   "La radiation après cessation définitive d'activité",
   'La régularisation du dossier avant un éventuel refus',
   "La validation d'une déclaration de renfort temporaire"],
  2,
  "Avant de refuser pour défaut de justification, le gestionnaire invite l'exploitant à fournir les pièces "
  "manquantes. Il ne s'agit ni d'une inscription déjà acquise ni d'une cessation d'activité.",
  "Comprendre la procédure d'un dossier incomplet",
  'CODE-REG-2'),
 ('Une société cesse définitivement le VTC mais continue une autre activité. Quelle opération sur son dossier '
  'sectoriel correspond à cette situation ?',
  ["La mise à jour d'une voiture remplacée",
   "Le renouvellement de l'inscription existante",
   "La déclaration d'un renfort exceptionnel",
   'La radiation de son inscription VTC'],
  3,
  'La cessation définitive du VTC entraîne la radiation du registre sectoriel. La conservation de la société pour '
  'une autre activité ne justifie pas le maintien de cette inscription.',
  'Relier cessation sectorielle et radiation',
  'CODE-REG-4'),
 ('Une cliente réserve lundi à 14 h une prise en charge mardi à 9 h. Pour les informations temporelles du '
  'justificatif de réservation, que doit distinguer le document ?',
  ['Lundi 14 h : commande ; mardi 9 h : départ demandé',
   'Mardi 9 h : commande ; lundi 14 h : départ demandé',
   'Lundi 14 h : commande ; lundi 14 h : départ demandé',
   'Mardi 9 h : commande ; mardi 9 h : départ demandé'],
  0,
  "Le justificatif comporte la date et l'heure de la réservation ainsi que la date et l'heure souhaitées de prise en "
  'charge. Ces deux événements sont distincts.',
  "Distinguer enregistrement et exécution d'une réservation",
  'RES-1'),
 ('Une assistante réserve une course au nom de son entreprise pour un visiteur. Lors du contrôle, les coordonnées '
  'requises du client réservataire manquent au justificatif. Quelle possibilité doit être offerte sans délai à '
  "l'agent dans le cadre de l'exception prévue par l'arrêté de 2025 ?",
  ['Joindre le seul visiteur transporté',
   'Joindre directement le client réservataire',
   "Joindre l'assureur professionnel du chauffeur",
   'Joindre le gestionnaire du registre VTC'],
  1,
  "L'exception impose de donner à l'agent les moyens de contacter directement le client sans délai. Le client qui "
  "réserve n'est pas nécessairement le passager : joindre seulement le visiteur ne suffit pas à établir cette "
  'possibilité.',
  "Appliquer l'alternative de contact immédiat du client",
  'RES-1'),
 ("Un contrôle concerne une course réservée pour aujourd'hui à 9 heures. Quel document peut établir cette "
  'réservation, quelle que soit sa forme papier ou numérique ?',
  ['Une impression complète de la course faite hier pour le même client',
   'Un document papier donnant uniquement le prix et le moyen de paiement',
   "Une capture montrant uniquement la demande d'un client non confirmée",
   'Un fichier consultable de cette course, avec toutes les mentions requises'],
  3,
  'Le justificatif peut être numérique, à condition de concerner la réservation contrôlée et de comporter les '
  "mentions nécessaires. Le papier n'est pas suffisant si la course ou les informations ne correspondent pas.",
  'Reconnaître les supports de preuve autorisés',
  'RES-1'),
 ("Le modèle de réservation comporte déjà l'identité et les contacts de l'exploitant, son SIREN, les données du "
  "client et les deux dates-heures avec le lieu. Pour compléter l'identification réglementaire de l'exploitant, quel "
  'numéro doit encore y figurer ?',
  ['Le numéro de carte du conducteur affecté',
   "Le numéro du contrat d'assurance automobile",
   "Son numéro d'inscription au REVTC",
   'Le numéro de série du véhicule utilisé'],
  2,
  "Le justificatif doit aussi porter le numéro d'inscription de l'exploitant au registre VTC. Le SIREN et les "
  "numéros de conducteur, d'assurance ou de véhicule ne le remplacent pas.",
  "Distinguer identifiant d'entreprise et inscription VTC",
  'RES-1'),
 ("Une voiture vient d'être validée au registre. L'exploitant a besoin de la signalétique temporaire pendant "
  "l'attente des vignettes définitives. Quel envoi contient le document à afficher à ce titre ?",
  ["L'envoi de la signalétique temporaire par l'Imprimerie nationale",
   'La notification préfectorale de la carte personnelle du chauffeur',
   "L'attestation d'inscription de l'entreprise reçue du registre",
   "L'attestation de couverture transmise par l'assureur automobile"],
  0,
  "La signalétique temporaire est transmise par l'Imprimerie nationale. Les autres envois attestent une situation "
  'professionnelle ou une garantie, mais ne constituent pas cette signalétique.',
  "Identifier l'origine de la vignette temporaire",
  'SIGN-1',
  'SIGN-2'),
 ('Un chauffeur doit prendre en charge à 16 h un client ayant réservé à la gare. Il arrive à proximité à 14 h 40. À '
  "partir de quelle heure la règle nationale lui permet-elle d'y stationner en attente de cette prise en charge, "
  'sous réserve des règles locales ?',
  ['14 h 40', '15 h', '15 h 30', '16 h uniquement'],
  1,
  "Le stationnement lié à une réservation aux abords ou dans l'enceinte d'une gare ne peut dépasser une heure avant "
  'la prise en charge. Pour 16 h, cette période commence à 15 h ; les règles locales de stationnement restent '
  'applicables.',
  "Calculer la période d'attente liée à une réservation en gare",
  'BPI-VTC'),
 ("Après une dépose, un chauffeur n'a ni nouvelle réservation ni contrat avec le client final. Son établissement est "
  "éloigné. Quelle destination satisfait à la solution de stationnement permise par l'obligation nationale de "
  'retrait ?',
  ['La station de taxis située devant la gare',
   "La chaussée devant l'hôtel du dernier client",
   "Le parking autorisé hors chaussée d'un partenaire",
   "Le boulevard parcouru dans l'attente d'une demande"],
  2,
  'Sans réservation ni contrat avec le client final, le chauffeur doit rejoindre son établissement ou un lieu '
  'autorisé hors de la chaussée. Le parking proposé remplit cette seconde possibilité.',
  'Choisir un lieu de retrait autorisé',
  'RETURN'),
 ("Quatre chauffeurs viennent de déposer leur client. Lequel bénéficie de l'exception permettant de rejoindre "
  "directement une prochaine prise en charge, sans retour préalable à l'établissement ou stationnement hors chaussée "
  '?',
  ['Celui qui espère une demande via son application',
   'Celui qui voit des clients attendre devant un hôtel',
   "Celui qui prévoit de se rapprocher d'une gare",
   'Celui qui détient une nouvelle réservation confirmée'],
  3,
  'Une réservation préalable pour une autre course permet de rejoindre la prise en charge suivante. Une simple '
  "possibilité de trouver un client n'est pas cette réservation.",
  "Appliquer l'exception de réservation suivante",
  'RETURN'),
 ("Le barème indicatif d'un VTC mentionne 2 € par kilomètre et 0,50 € par minute. Le client accepte toutefois un "
  'forfait ferme de 75 € pour sa réservation, sans supplément convenu. La course dure 40 minutes pour 30 km. Quel '
  'prix correspond à cette commande ?',
  ['75 €', '60 €', '20 €', '80 €'],
  0,
  'Un forfait peut être fixé dès la commande. Ici le prix accepté est 75 € ; il ne faut ni retenir seulement les '
  'kilomètres ou le temps, ni ajouter un supplément non convenu.',
  'Appliquer le forfait convenu à la réservation',
  'BPI-VTC'),
 ('Quatre voitures portent des vignettes définitives intactes. Dans quel dossier leur validité cesse-t-elle en '
  "raison de l'inscription de l'exploitant ?",
  ['Carte du chauffeur renouvelée la semaine précédente',
   'Inscription arrivée à échéance sans renouvellement',
   'Facture de location réglée avec quelques jours de retard',
   "Nouveau téléphone déclaré pour joindre l'entreprise"],
  1,
  "La validité des vignettes est liée à l'inscription de l'exploitant. Une inscription expirée sans renouvellement "
  'met fin à leur validité, même si les vignettes sont intactes.',
  "Relier la signalétique à l'inscription de l'exploitant",
  'SIGN-3')]
