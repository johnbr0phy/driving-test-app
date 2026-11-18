"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [("Message : « Votre consultation reste fixée jeudi à 8 h 30. L'entrée principale est fermée pour travaux. Le "
  'chauffeur vous déposera bâtiment B, rue des Tilleuls. Le départ du domicile reste à 8 heures. » Quelle '
  'modification doit figurer sur la fiche de course ?',
  ['Dépose entrée principale ; départ du domicile à 8 heures',
   'Dépose bâtiment B ; départ du domicile à 8 heures',
   'Dépose bâtiment B ; départ du domicile à 8 h 30',
   'Dépose entrée principale ; consultation à 8 heures'],
  1,
  "Le seul changement porte sur l'accès à la clinique. Le départ reste à 8 heures et la consultation à 8 h 30.",
  "Lire une modification d'itinéraire sans déplacer les horaires"),
 ("Note de réception : « Les congressistes réserveront eux-mêmes leur transfert depuis la gare. L'hôtel communiquera "
  "les coordonnées des chauffeurs. L'association réservera le trajet collectif vers le dîner. » Quel rôle revient à "
  "l'hôtel ?",
  ['Informer les participants sur les prestataires',
   'Commander les transferts individuels depuis la gare',
   'Réserver le déplacement collectif vers le dîner',
   'Choisir les horaires des arrivées ferroviaires'],
  0,
  "L'hôtel transmet les coordonnées. Les participants commandent leur transfert et l'association organise le "
  'déplacement vers le dîner.',
  "Distinguer les acteurs d'une organisation"),
 ("Courriel : « Notre réunion pourrait se terminer à 17 heures. Son président confirmera l'horaire à midi. Je vous "
  "transmettrai alors l'heure de départ et, dans un second message, l'adresse de la sortie. » Que doit attendre le "
  'chauffeur dans le premier message annoncé après midi ?',
  ["L'adresse précise de la sortie",
   'Le nom du président de séance',
   'Le compte rendu de la réunion',
   "L'heure retenue pour le départ"],
  3,
  "Le premier message annoncé transmettra l'heure de départ après confirmation. L'adresse est réservée au second "
  'message.',
  'Repérer une information dans une succession de messages'),
 ("Consigne objets trouvés : « Rédigez la fiche de découverte, déposez l'objet au bureau puis transmettez la fiche à "
  "l'accueil. Ne contactez le voyageur qu'après vérification de ses coordonnées par l'accueil. » Que faut-il avoir "
  "fait juste avant la transmission à l'accueil ?",
  ["Déposer l'objet au bureau et contacter le voyageur",
   'Faire vérifier les coordonnées et contacter le voyageur',
   "Rédiger la fiche de découverte et déposer l'objet au bureau",
   "Transmettre les coordonnées et remettre l'objet au voyageur"],
  2,
  "La transmission suit la rédaction de la fiche et le dépôt de l'objet. La vérification des coordonnées puis le "
  'contact viennent ensuite.',
  "Reconstituer l'ordre d'une consigne"),
 ("Compte rendu : « La cliente quitte la voiture et appelle l'accueil. Une réceptionniste prend sa demande. Celle-ci "
  'joint ensuite le chauffeur, qui retrouve le sac sous le siège. » À qui renvoie « celle-ci » ?',
  ['À la réceptionniste', 'À la cliente', 'À la voiture', 'À la conductrice'],
  0,
  "Celle-ci reprend la réceptionniste, sujet de la phrase précédente. C'est elle qui contacte ensuite le chauffeur "
  'pour traiter la demande reçue.',
  "Identifier le référent d'un pronom"),
 ("Avis d'itinéraire : « Empruntez le boulevard jusqu'au musée. Tournez à gauche avant le pont, puis suivez la rue "
  "des Écoles jusqu'à la pharmacie. Le dépôt se trouve derrière celle-ci. » Où faut-il quitter le boulevard ?",
  ['Après le pont, en tournant à gauche',
   'Avant le pont, en tournant à gauche',
   'Avant la pharmacie, en tournant à droite',
   'Après le musée, en tournant à droite'],
  1,
  'La consigne situe le changement de direction avant le pont et précise un virage à gauche. La pharmacie sert de '
  'repère plus loin sur le parcours.',
  'Suivre des repères spatiaux dans un itinéraire'),
 ("Échange : « Le garage garde le véhicule jusqu'à vendredi. Nous avons donc déplacé les courses du jeudi sur la "
  'voiture de réserve ; celles du samedi restent affectées au véhicule habituel. » Quelle relation le mot « donc » '
  'exprime-t-il ?',
  ['La cause de la visite du véhicule au garage',
   'La comparaison entre les deux voitures utilisées',
   "La conséquence de l'indisponibilité du véhicule",
   'La condition nécessaire pour accepter samedi'],
  2,
  "Donc introduit la conséquence de l'immobilisation : l'affectation des courses du jeudi à une autre voiture.",
  'Reconnaître une relation de conséquence'),
 ("Planning : « Nadia conduit le matin et prépare les devis l'après-midi. Samir assure les retours de soirée. "
  'Vendredi seulement, Nadia remplacera Samir le soir ; les autres créneaux ne changent pas. » Quel service '
  'supplémentaire Nadia assure-t-elle cette semaine ?',
  ['Les retours de chaque soir',
   'Les devis du vendredi matin',
   'Les départs du samedi matin',
   'Les retours du vendredi soir'],
  3,
  "L'exception porte uniquement sur le vendredi soir. Le texte ne modifie pas les autres créneaux de Nadia.",
  "Délimiter la portée d'une exception de planning"),
 ('Note : « Bien que la route soit plus longue, elle évite les travaux du centre. Nous la retiendrons pour le retour '
  'de ce groupe. » Quel inconvénient est accepté dans cette décision ?',
  ['Un passage dans la zone de travaux',
   'Une distance de trajet supérieure',
   'Un retour du groupe à une heure plus tardive',
   'Une prise en charge déplacée au centre'],
  1,
  'Bien que introduit la concession : la route plus longue est choisie pour éviter les travaux. Le texte ne chiffre '
  'pas le temps de retour.',
  'Comprendre une concession'),
 ('Instructions : « Les clés sont remises au chauffeur après le contrôle de la voiture. Le registre est signé par la '
  'personne qui remet les clés ; le chauffeur vérifie ensuite le numéro inscrit. » Qui signe le registre ?',
  ['Le chauffeur après avoir vérifié le numéro',
   'Le client qui attend le départ de la course',
   'La personne chargée de remettre les clés',
   'Le mécanicien après le retour de la voiture'],
  2,
  'La consigne attribue la signature à la personne qui remet les clés. Le chauffeur est chargé de vérifier le numéro '
  'ensuite.',
  'Attribuer une tâche dans une consigne procédurale'),
 ('Un client écrit : « Merci de me rappeler au sujet du devis, et non de la course de mardi : celle-ci est déjà '
  "confirmée. » Quel est l'objet du rappel demandé ?",
  ['Discuter du devis avec le client',
   "Confirmer l'horaire de la course de mardi",
   'Modifier la destination de la course confirmée',
   'Remercier le client après sa course de mardi'],
  0,
  'La négation oppose explicitement le devis à la course déjà confirmée. Le rappel concerne le devis.',
  'Interpréter une correction introduite par une négation'),
 ("Deux offres sont résumées : « Alpha comprend le transfert et trente minutes d'attente. Bêta comprend le transfert "
  "et une heure d'attente. Les deux prévoient le même véhicule et le même trajet. » Quelle différence est établie "
  'par le texte ?',
  ["Alpha utilise une voiture d'une catégorie supérieure",
   "Bêta prévoit un trajet plus long que celui d'Alpha",
   'Alpha facture trente minutes supplémentaires de trajet',
   "Bêta inclut trente minutes d'attente de plus"],
  3,
  "L'attente incluse passe de trente minutes à une heure, soit trente minutes de plus dans Bêta. Le véhicule et le "
  'trajet sont identiques.',
  'Comparer deux descriptions de prestation'),
 ('Courriel : « Vos deux transferts prévus restent confirmés. Le véhicule supplémentaire demandé pour vos collègues '
  'est encore en cours de recherche. » Quel résumé conserve ces deux statuts ?',
  ['Transferts initiaux en recherche ; véhicule supplémentaire confirmé',
   'Transferts initiaux confirmés ; véhicule supplémentaire en recherche',
   'Transferts initiaux et véhicule supplémentaire confirmés',
   'Transferts initiaux et véhicule supplémentaire en recherche'],
  1,
  'La confirmation concerne les deux transferts prévus. Seule la demande de véhicule supplémentaire reste en '
  'recherche.',
  'Distinguer deux statuts dans un même dossier'),
 ('Dans un rapport, on lit : « Le chauffeur a relevé le numéro du quai avant de rejoindre le groupe. » Quel sens de '
  '« relevé » convient ici ?',
  ['Augmenté la valeur attribuée au quai',
   'Remplacé le collègue présent sur le quai',
   "Noté l'information indiquée sur place",
   'Redressé un panneau tombé sur le quai'],
  2,
  'Dans ce contexte, relever un numéro signifie le noter ou le recueillir. Les autres sens du verbe ne correspondent '
  'pas à cette action.',
  "Choisir le sens d'un mot en contexte"),
 ("Bilan mensuel : « Les demandes d'aéroport ont augmenté en juillet ; les déplacements vers les bureaux ont "
  'diminué. Le nombre total de demandes est resté identique à juin. » Quel titre résume ce bilan ?',
  ['Une hausse générale des demandes de transport',
   "Une baisse des trajets d'aéroport et de bureau",
   'Un volume supérieur malgré une clientèle stable',
   'Un volume stable avec une répartition différente'],
  3,
  "Le total est stable, mais sa composition change. L'augmentation d'un type de demande est compensée par la "
  "diminution de l'autre.",
  'Synthétiser deux évolutions et un total'),
 ("Note d'incident : « À 18 h 10, le chauffeur a signalé un bagage oublié. À 18 h 20, l'accueil a identifié son "
  'propriétaire. Le client a récupéré le bagage à 19 heures. » Quelle information correspond à 18 h 20 ?',
  ["L'identification du propriétaire par l'accueil",
   'La découverte du bagage par le chauffeur',
   'La remise du bagage au client identifié',
   "L'appel du client à la société de transport"],
  0,
  "L'identification est datée de 18 h 20. Le signalement précède cette étape et la restitution a lieu à 19 heures.",
  'Associer un événement à son heure'),
 ('Consigne de planning : « Pour les réservations avant 7 heures, avertissez le chauffeur la veille. Pour les '
  'demandes reçues le matin même, téléphonez au responsable avant de confirmer. » Une demande pour 6 h 30 arrive à 6 '
  'heures. Quelle démarche est prévue pour ce cas ?',
  ['Avertir le chauffeur la veille du déplacement',
   'Téléphoner au responsable avant confirmation',
   'Confirmer au client puis appeler le responsable',
   'Reporter la demande au lendemain avant 7 heures'],
  1,
  "La demande arrive le matin même : la seconde consigne s'applique et impose l'appel avant confirmation. Il n'est "
  "plus possible d'avertir la veille.",
  'Appliquer une instruction à une chronologie particulière'),
 ('Une fiche tarifaire fictive indique : « Transfert : 52 €. Attente ajoutée : 12 €. Total payé : 64 €. Le client '
  "demande un duplicata du document. » Quelle demande doit traiter l'accueil ?",
  ["Ajouter les frais d'attente au montant de 64 €",
   'Préparer une nouvelle offre de transfert à 52 €',
   'Renvoyer une copie du document de paiement',
   'Demander au client de régler encore les 12 €'],
  2,
  'Un duplicata est une copie du document existant. Le texte précise que le total de 64 € a déjà été payé.',
  "Comprendre une demande à partir d'un document chiffré"),
 ('Message : « La visite se termine à 16 heures. Le groupe sera prêt à 16 h 15. Le chauffeur est confirmé pour 16 h '
  '30 devant le bâtiment A. » Quelle information décrit la prise en charge convenue ?',
  ['16 heures devant le bâtiment A',
   '16 h 15 devant le bâtiment A',
   '16 h 30 devant le bâtiment B',
   '16 h 30 devant le bâtiment A'],
  3,
  "La disponibilité du groupe à 16 h 15 n'est pas l'heure convenue avec le chauffeur, fixée à 16 h 30 devant le "
  'bâtiment A.',
  'Distinguer disponibilité du client et rendez-vous convenu'),
 ('À la réception, on lit : « Merci de fermer la porte du bureau en partant, pour éviter que les conversations '
  'téléphoniques soient entendues dans le hall. » Quel est le but de cette consigne ?',
  ['Préserver la confidentialité des conversations',
   "Réduire le nombre d'appels reçus au bureau",
   'Signaler au public la fermeture de la réception',
   "Empêcher les chauffeurs d'accéder au téléphone"],
  0,
  "La raison donnée est d'éviter que les conversations soient entendues dans le hall. Il s'agit donc de "
  'confidentialité.',
  "Identifier la finalité explicite d'une instruction"),
 ('Un brouillon indique : « Il nous manque le numéro du bâtiment. » Le départ et la destination générale ont déjà '
  'été validés. Quelle demande conserve le sens du brouillon ?',
  ["Pourriez-vous confirmer l'heure du départ ?",
   'Pourriez-vous préciser le numéro du bâtiment ?',
   'Pourriez-vous indiquer une autre destination ?',
   'Pourriez-vous confirmer le nombre de voyageurs ?'],
  1,
  'Seul le numéro du bâtiment manque. La reformulation doit demander cette précision, sans déplacer la demande vers '
  "l'horaire, la destination ou l'effectif.",
  'Reformuler une demande professionnelle précise'),
 ('Compte rendu : « Dix demandes sont arrivées. Huit dossiers étaient complets. Deux attendaient une précision ; une '
  "réponse vient d'arriver et complète l'un d'eux. » Combien de dossiers restent incomplets ?",
  ['Deux dossiers', 'Huit dossiers', 'Un dossier', 'Aucun dossier'],
  2,
  'Sur les deux dossiers incomplets, un a été complété. Il en reste donc un.',
  "Suivre une quantité au fil d'un récit"),
 ('Présentation : « Le questionnaire sera envoyé aux entreprises en septembre et aux particuliers en octobre. Les '
  'réponses seront regroupées en novembre. Les décisions seront prises après cette analyse. » Quelle étape est '
  'prévue en octobre ?',
  ["L'envoi du questionnaire aux entreprises",
   'Le regroupement des réponses des deux groupes',
   'La décision sur les prestations à modifier',
   "L'envoi du questionnaire aux particuliers"],
  3,
  "Le calendrier réserve octobre à l'envoi aux particuliers. Les entreprises sont sollicitées en septembre et "
  "l'analyse commence en novembre.",
  'Lire un calendrier de projet'),
 ('Le groupe peut repartir plus tôt si sa visite est terminée et si un véhicule est disponible. La visite est finie, '
  "mais aucun véhicule n'est encore confirmé. Quel état des deux conditions décrit la situation ?",
  ['Groupe prêt ; disponibilité du véhicule à confirmer',
   'Groupe à confirmer ; disponibilité du véhicule établie',
   'Groupe prêt ; disponibilité du véhicule établie',
   'Groupe à confirmer ; disponibilité du véhicule à confirmer'],
  0,
  "La fin de la visite établit la première condition. La disponibilité reste à vérifier : le départ anticipé n'est "
  'donc pas encore confirmé.',
  'Distinguer deux conditions cumulatives')]
