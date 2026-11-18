"""Original source-backed items; review in REVIEW.md."""
ROWS = [
    ('"Consultation à 8 h 30. Entrée principale fermée : dépose au bâtiment B. Départ à 8 heures." '
     'Que noter sur la fiche ?',
     ['Dépose entrée principale ; départ du domicile à 8 heures',
      'Dépose bâtiment B ; départ du domicile à 8 heures',
      'Dépose bâtiment B ; départ du domicile à 8 h 30',
      'Dépose entrée principale ; consultation à 8 heures'],
     1,
     "Seul le lieu de dépose change : le bâtiment B remplace l'entrée principale. Le départ reste à "
     "8 heures, 8 h 30 étant l'heure de la consultation.",
     "Lire une modification d'itinéraire sans déplacer les horaires"),
    ('"Chacun réserve son transfert ; l\'hôtel communique les coordonnées des chauffeurs ; l\'association '
     'réserve le dîner." Rôle de l\'hôtel ?',
     ['Informer les participants sur les prestataires',
      'Commander les transferts individuels des congressistes',
      'Réserver le déplacement collectif vers le dîner',
      'Choisir les horaires des arrivées ferroviaires'],
     0,
     "L'hôtel transmet les coordonnées des chauffeurs. Les congressistes commandent eux-mêmes leur "
     "transfert et l'association réserve le trajet vers le dîner.",
     "Distinguer les acteurs d'une organisation"),
    ('"Fin vers 17 heures. À midi, je vous enverrai l\'heure de départ, puis l\'adresse de la sortie." '
     'Que contiendra le premier message ?',
     ["L'adresse de la sortie",
      "L'heure de fin de la réunion",
      "L'heure de départ",
      "L'heure de départ et l'adresse"],
     2,
     '"Puis" reporte l\'adresse à un second envoi : le premier message ne donne que l\'heure de départ. '
     "17 heures est l'heure de fin de la réunion, déjà connue.",
     'Repérer une information dans une succession de messages'),
    ('"Rédigez la fiche, déposez l\'objet au bureau, puis transmettez la fiche à l\'accueil." '
     'Que faut-il avoir fait avant la transmission ?',
     ["Déposer l'objet au bureau et contacter le voyageur",
      'Faire vérifier les coordonnées et contacter le voyageur',
      "Rédiger la fiche et déposer l'objet au bureau",
      "Transmettre les coordonnées et remettre l'objet"],
     2,
     "La transmission vient après la rédaction de la fiche et le dépôt de l'objet. La vérification "
     "des coordonnées est faite ensuite par l'accueil.",
     "Reconstituer l'ordre d'une consigne"),
    ('"La cliente a oublié sa valise et appelle la réceptionniste. Celle-ci prévient le chauffeur." '
     'À qui renvoie "celle-ci" ?',
     ['À la cliente', 'À la valise', 'À la réceptionniste', 'Au chauffeur'],
     2,
     '"Celle-ci" reprend le dernier nom féminin cité, la réceptionniste, et lève l\'ambiguïté qu\'aurait '
     'créée "elle", qui pourrait désigner la cliente. "Chauffeur" est masculin.',
     "Identifier le référent d'un pronom"),
    ('"Suivez le boulevard jusqu\'au musée, tournez à gauche avant le pont, puis allez jusqu\'à la '
     'pharmacie." Où quitter le boulevard ?',
     ['Après le pont, en tournant à gauche',
      'Avant le pont, en tournant à gauche',
      'Avant la pharmacie, en tournant à droite',
      'Après le musée, en tournant à droite'],
     1,
     "Le changement de direction se fait avant le pont, vers la gauche. La pharmacie est un repère "
     "situé plus loin sur le parcours.",
     'Suivre des repères spatiaux dans un itinéraire'),
    ('"Le véhicule est au garage ; nous avons donc confié les courses du jeudi à la voiture de '
     'réserve." Qu\'exprime "donc" ?',
     ['La cause', 'La concession', 'La conséquence', 'Le but'],
     2,
     '"Donc" introduit la conséquence de l\'immobilisation du véhicule. La cause serait introduite par '
     '"car" ou "parce que", le but par "pour que".',
     'Reconnaître une relation de conséquence'),
    ('"Nadia conduit le matin, Samir le soir. Vendredi seulement, Nadia remplacera Samir." Quel service '
     's\'ajoute pour Nadia ?',
     ['Les retours de chaque soir',
      'Les courses du vendredi matin',
      'Les départs du samedi matin',
      'Les retours du vendredi soir'],
     3,
     '"Vendredi seulement" limite le remplacement à un seul soir. Nadia conduisait déjà le matin, ce '
     "n'est donc pas un service ajouté.",
     "Délimiter la portée d'une exception de planning"),
    ('"Bien que cette route soit plus longue, elle évite les travaux du centre." Quel inconvénient est '
     'accepté ?',
     ['Un passage dans la zone de travaux',
      'Une distance de trajet supérieure',
      'Un retour du groupe à une heure plus tardive',
      'Une prise en charge déplacée au centre'],
     1,
     '"Bien que" introduit une concession : la longueur de la route est acceptée pour éviter les '
     'travaux. Le texte ne parle pas de l\'heure de retour.',
     'Comprendre une concession'),
    ('"Le registre est signé par la personne qui remet les clés ; le chauffeur vérifie ensuite le '
     'numéro." Qui signe le registre ?',
     ['Le chauffeur après avoir vérifié le numéro',
      'Le client qui attend le départ de la course',
      'La personne chargée de remettre les clés',
      'Le mécanicien après le retour de la voiture'],
     2,
     'La forme passive "est signé par" désigne la personne qui remet les clés. Le chauffeur, lui, '
     'vérifie le numéro.',
     'Attribuer une tâche dans une consigne procédurale'),
    ('"Rappelez-moi au sujet du devis, et non de la course de mardi, déjà confirmée." Objet du '
     'rappel ?',
     ['Discuter du devis',
      'Confirmer la course de mardi',
      'Annuler le devis et la course',
      'Modifier la course déjà confirmée'],
     0,
     '"Et non" écarte la course de mardi, déjà confirmée. Le rappel porte uniquement sur le devis.',
     'Interpréter une correction introduite par une négation'),
    ('"Alpha : transfert et trente minutes d\'attente. Bêta : même transfert et une heure d\'attente." '
     'Quelle différence ?',
     ["Alpha utilise une voiture d'une catégorie supérieure",
      "Bêta prévoit un trajet plus long que celui d'Alpha",
      'Alpha facture trente minutes supplémentaires de trajet',
      "Bêta inclut trente minutes d'attente de plus"],
     3,
     'Le transfert est "le même" : seule l\'attente diffère, une heure contre trente minutes, soit trente '
     'minutes de plus pour Bêta.',
     'Comparer deux descriptions de prestation'),
    ('"Vos deux transferts restent confirmés ; le véhicule supplémentaire est encore recherché." '
     'Quel résumé est exact ?',
     ['Transferts initiaux en recherche ; véhicule supplémentaire confirmé',
      'Transferts initiaux confirmés ; véhicule supplémentaire en recherche',
      'Transferts initiaux et véhicule supplémentaire confirmés',
      'Transferts initiaux et véhicule supplémentaire en recherche'],
     1,
     'La confirmation concerne les deux transferts prévus. Seul le véhicule supplémentaire reste en '
     'recherche.',
     'Distinguer deux statuts dans un même dossier'),
    ('"Le chauffeur a relevé le numéro du quai avant de rejoindre le groupe." Quel sens de "relevé" '
     'convient ici ?',
     ['Augmenté la valeur attribuée au quai',
      'Remplacé le collègue présent sur le quai',
      "Noté l'information indiquée sur place",
      'Redressé un panneau tombé sur le quai'],
     2,
     'Relever un numéro, c\'est le noter. Les autres sens du verbe (augmenter, relayer, redresser) ne '
     'conviennent pas à un numéro.',
     "Choisir le sens d'un mot en contexte"),
    ('"En juillet, les trajets d\'aéroport ont augmenté, ceux vers les bureaux ont baissé ; le total '
     'est inchangé." Quel titre convient ?',
     ['Une hausse générale des demandes de transport',
      "Une baisse des trajets d'aéroport et de bureau",
      'Un volume supérieur malgré une clientèle stable',
      'Un volume stable avec une répartition différente'],
     3,
     "Le total ne change pas, mais sa composition évolue : la hausse d'un type de demande compense la "
     "baisse de l'autre.",
     'Synthétiser deux évolutions et un total'),
    ('Quelle forme complète la phrase "Les valises que le chauffeur a ___ dans le coffre sont lourdes." ?',
     ['rangé', 'rangées', 'rangés', 'ranger'],
     1,
     'Avec l\'auxiliaire avoir, le participe passé s\'accorde avec le complément d\'objet placé avant : '
     '"que" reprend "les valises", féminin pluriel. "Ranger" est l\'infinitif.',
     'Accorder le participe passé employé avec avoir'),
    ('Quelle forme complète la phrase "Si le vol arrive en retard, le chauffeur ___ le client à la sortie." ?',
     ['attendra', 'attendrait', 'attende', 'attendait'],
     0,
     'Après "si" suivi du présent, la principale se met au futur. Le conditionnel "attendrait" '
     'correspond à "si" suivi de l\'imparfait.',
     'Employer le temps correct après "si"'),
    ('"Transfert 52 €, attente 12 €, total payé 64 €." Le client demande un duplicata de la facture. '
     'Que lui envoyer ?',
     ['Une facture rectifiée de 64 €',
      'Une copie de la facture de 64 €',
      'Un nouveau devis de 52 €',
      "Une facture d'acompte de 12 €"],
     1,
     'Un duplicata est une copie conforme d\'un document déjà émis. La facture de 64 € est réglée : il '
     'n\'y a rien à rectifier ni à facturer de nouveau.',
     "Comprendre une demande à partir d'un document chiffré"),
    ('"Visite finie à 16 heures, groupe prêt à 16 h 15, chauffeur confirmé pour 16 h 30 devant le '
     'bâtiment A." Rendez-vous convenu ?',
     ['16 heures devant le bâtiment A',
      '16 h 15 devant le bâtiment A',
      '16 h 30 devant le bâtiment B',
      '16 h 30 devant le bâtiment A'],
     3,
     '"Est confirmé pour" désigne le rendez-vous : 16 h 30 devant le bâtiment A. 16 h 15 indique seulement '
     "quand le groupe sera prêt.",
     'Distinguer disponibilité du client et rendez-vous convenu'),
    ('Quelle forme complète la phrase "Fermez la porte afin que les conversations ne ___ pas entendues dans le hall." ?',
     ['sont', 'seront', 'soient', 'seraient'],
     2,
     '"Afin que" exprime le but et impose le subjonctif : "soient". L\'indicatif et le conditionnel ne '
     'conviennent pas après cette locution.',
     'Employer le subjonctif après une conjonction de but'),
    ('Quelle question indirecte est correctement construite ?',
     ['Pourriez-vous me dire quel est le numéro du bâtiment ?',
      "Pourriez-vous me dire qu'est-ce qu'est le numéro du bâtiment ?",
      "Pourriez-vous me dire c'est quoi le numéro du bâtiment ?",
      'Pourriez-vous me dire quel est-ce le numéro du bâtiment ?'],
     0,
     'Dans une interrogation indirecte, on garde l\'ordre sujet-verbe sans "est-ce que" ni inversion : '
     '"quel est le numéro". "C\'est quoi" est familier et incorrect à l\'écrit.',
     'Formuler une question indirecte professionnelle'),
    ('Quelle forme complète la phrase "Le client ___ demandé si l\'autoroute était plus rapide." ?',
     ["c'est", 'ses', 'ces', "s'est"],
     3,
     '"Se demander" est un verbe pronominal conjugué avec être : "il s\'est demandé". "C\'est" signifie '
     '"cela est" ; "ses" et "ces" sont des déterminants.',
     'Distinguer des homophones grammaticaux'),
    ('Un message indique : "Votre prise en charge est différée." Que signifie "différée" ?',
     ['Remise à une heure plus tardive',
      'Assurée par un autre chauffeur',
      'Avancée à une heure plus tôt',
      'Annulée sans nouvelle date'],
     0,
     'Différer, c\'est remettre à plus tard. Le mot ne signifie ni "rendue différente" ni "annulée".',
     "Choisir le sens d'un mot en contexte"),
    ('Quelle forme complète la phrase "___ soit l\'heure de votre arrivée, un chauffeur vous attendra." ?',
     ['Quel que', 'Quelle que', 'Quelque', 'Quelles que'],
     1,
     'Devant le verbe être, "quel que" s\'écrit en deux mots et s\'accorde avec le sujet, ici "l\'heure", '
     'féminin singulier. "Quelque" en un mot se place devant un nom ou un adjectif.',
     'Accorder "quel que" devant le verbe être'),
]
