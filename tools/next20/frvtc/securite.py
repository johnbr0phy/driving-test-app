"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [('Deux voitures arrivent à une intersection sans signalisation. La voiture bleue circule sur la rue large ; la '
  'rouge débouche de la rue étroite, à droite de la bleue. Elles vont tout droit et leurs trajectoires se coupent. '
  'Quel ordre découle de la priorité ?',
  ['La bleue, puis la rouge',
   'La rouge, puis la bleue',
   "La première arrivée, puis l'autre",
   'La première engagée, quelle que soit son origine'],
  1,
  'À défaut de signalisation, la bleue doit céder à la voiture venant de sa droite. La largeur de la rue ne donne '
  'pas priorité.',
  'Appliquer la priorité à droite',
  'PRIORITY'),
 ("La voiture A sort d'un parking privé ; la voiture B roule sur la rue, venant de la gauche de A. Leurs "
  'trajectoires se croisent. Le chauffeur de A hésite parce que B le voit arriver de sa droite. Quel ordre doit-il '
  'respecter ?',
  ['A passe avant B qui arrive de gauche',
   'A passe dès que B a vu son clignotant',
   "B passe seulement si A n'a pas franchi le trottoir",
   'B passe avant A qui quitte le parking'],
  3,
  "En sortant d'un accès privé, A doit céder aux usagers de la rue. La priorité à droite ordinaire ne lui donne pas "
  'priorité dans cette situation.',
  'Distinguer sortie privée et intersection ordinaire',
  'PRIORITY'),
 ("Dans un carrefour à sens giratoire, A arrive à l'entrée et B circule sur l'anneau à gauche de A. A souhaite "
  'prendre la première sortie. Quel véhicule doit céder dans cette rencontre ?',
  ['A, malgré sa sortie prévue à proximité',
   "B, puisqu'il voit A sur sa droite",
   'B, si A a déjà annoncé sa sortie',
   "A, seulement s'il vise une sortie plus éloignée"],
  0,
  "Le véhicule qui entre dans un giratoire cède à ceux qui circulent sur l'anneau. Le choix de la première sortie ne "
  'modifie pas cette règle.',
  "Connaître la priorité à l'entrée du giratoire",
  'PRIORITY'),
 ('Pour tourner à droite, vous devez couper une piste cyclable à double sens qui longe la chaussée. Un cycliste '
  'arrive sur cette piste en sens opposé à votre circulation. Que devez-vous faire avant de traverser sa trajectoire '
  '?',
  ['Passer avant lui comme dans une insertion ordinaire',
   'Céder uniquement aux cycles allant dans votre sens',
   'Lui céder le passage même dans ce sens de circulation',
   'Appliquer la priorité à droite entre les deux véhicules'],
  2,
  "Le conducteur qui tourne cède aux cycles circulant sur la piste qu'il coupe, dans les deux sens. Il faut donc "
  'contrôler aussi le sens opposé.',
  'Traverser une piste cyclable bidirectionnelle',
  'PRIORITY'),
 ("Le feu est vert, mais la file s'arrête juste après le carrefour. Si vous avancez, votre voiture restera au milieu "
  'et gênera la circulation transversale. Où devez-vous attendre ?',
  ["Après le feu, en avançant jusqu'à la file arrêtée",
   "Avant de vous engager dans l'intersection",
   'Au point de croisement, sans dépasser la ligne médiane',
   "À la sortie du carrefour, même en gênant l'autre voie"],
  1,
  "Même avec un feu vert, il ne faut pas s'engager lorsqu'on risque d'être immobilisé dans l'intersection et "
  "d'empêcher le passage des autres voies.",
  'Ne pas bloquer une intersection autorisée par un feu',
  'PRIORITY'),
 ("Quatre personnes se trouvent près d'un passage piéton sans feu. Laquelle manifeste dans la scène décrite une "
  'intention de traverser à laquelle le conducteur doit céder le passage ?',
  ['Celle qui poursuit sa marche parallèle au bord de la rue',
   'Celle qui attend devant une vitrine, dos à la chaussée',
   "Celle qui s'éloigne du passage en suivant le trottoir",
   'Celle qui fait signe et se prépare à franchir la chaussée'],
  3,
  'Le conducteur doit céder à la personne manifestant clairement son intention de traverser, même avant son '
  "engagement. Les autres comportements décrits n'établissent pas cette intention.",
  "Reconnaître l'intention claire d'un piéton",
  'PRIORITY'),
 ('Sur un trajet, le chauffeur rencontre successivement un STOP avec ligne, un cédez-le-passage dégagé, un feu vert '
  "sans encombrement et une intersection sans signalisation libre. À quel endroit l'immobilisation est-elle exigée "
  'même sans autre usager ?',
  ['À la ligne du STOP',
   "À l'approche du cédez-le-passage",
   'Avant le franchissement du feu vert',
   "À l'entrée du croisement non signalé"],
  0,
  "Le STOP exige un arrêt effectif à la limite prescrite. Aux autres lieux, l'absence d'usagers ou d'obstacle peut "
  'permettre de poursuivre après les contrôles nécessaires.',
  'Distinguer arrêt obligatoire et simple cédez-le-passage',
  'PRIORITY'),
 ('Hors agglomération, vous vous apprêtez à dépasser un cycliste. Quelle distance latérale minimale devez-vous '
  'conserver entre votre véhicule et lui ?',
  ['0,50 m', '1 m', '1,50 m', '2 m'],
  2,
  'Le minimum est de 1,50 m hors agglomération, contre 1 m en agglomération. Si cet écart ne peut pas être assuré, '
  'le dépassement doit attendre.',
  'Appliquer la marge latérale hors agglomération',
  'PASS'),
 ("Le véhicule devant vous a signalé son intention de tourner à gauche et s'est placé pour cela. Un espace suffisant "
  'existe à sa droite sur la chaussée, sans voie réservée ni danger. De quel côté son dépassement doit-il '
  "s'effectuer ?",
  ['À droite, dans les conditions décrites',
   "À gauche, même s'il est déjà engagé dans son virage",
   'Du côté choisi par le conducteur qui dépasse',
   "Sur l'accotement uniquement"],
  0,
  "Le Code prévoit le dépassement par la droite lorsque le conducteur dépassé a signalé qu'il tourne à gauche. Il "
  'faut néanmoins que la manœuvre puisse se réaliser sans danger sur un espace autorisé.',
  'Appliquer une exception au dépassement par la gauche',
  'PASS'),
 ("Vous roulez à 70 km/h sur la moitié droite d'une route à double sens. Une voiture commence à vous dépasser. La "
  'route et la visibilité restent bonnes. Quel couple position/allure respecte votre obligation pendant cette '
  'manœuvre ?',
  ["Se rapprocher de l'axe ; garder les 70 km/h initiaux",
   'Rester à droite ; ne pas dépasser les 70 km/h initiaux',
   'Rester à droite ; monter progressivement à 80 km/h',
   "Se placer sur l'accotement ; conserver 70 km/h"],
  1,
  "Le conducteur dépassé doit tenir sa droite sans augmenter sa vitesse. Il n'a pas à rejoindre l'accotement ; la "
  'vitesse de départ sert ici de référence pour ne pas accélérer.',
  'Agir correctement pendant un dépassement subi',
  'PASS'),
 ('Quatre portions successives sont décrites avant un dépassement exigeant la voie opposée. Laquelle impose de '
  "différer la manœuvre pour un défaut de visibilité vers l'avant ?",
  ['La ligne droite visible et libre sur la distance utile',
   'La portion découverte sans véhicule venant en face',
   'La section plane permettant de voir la fin de manœuvre',
   'La montée masquant la chaussée au-delà du sommet'],
  3,
  "La chaussée masquée au-delà du sommet ne permet pas de vérifier l'absence de danger sur la voie opposée. Le "
  'dépassement doit attendre une portion offrant la visibilité nécessaire.',
  'Relier dépassement et visibilité de la voie opposée',
  'PASS'),
 ('Sur une chaussée à plusieurs voies de même sens, la circulation dense forme des files ininterrompues. Sans '
  'changer de file, celle de droite avance momentanément plus vite que celle de gauche. Comment cette progression '
  'est-elle qualifiée par le Code ?',
  ['Un dépassement par la droite soumis à dérogation',
   'Un changement de voie autorisé par la densité',
   "Une simple avance d'une file sur une autre",
   'Une manœuvre réservée aux voies pour véhicules lents'],
  2,
  "Lorsque la circulation s'établit en files ininterrompues, l'avance d'une file par rapport à l'autre n'est pas "
  "considérée comme un dépassement. Cela n'autorise pas les changements de file dangereux.",
  'Distinguer progression en files et dépassement',
  'PASS'),
 ("Vous conduisez une voiture légère sur une section d'autoroute normalement limitée à 130 km/h. Il pleut, la "
  "visibilité dépasse 50 m et aucune limitation locale plus basse n'est indiquée. Quel plafond national s'applique ?",
  ['110 km/h', '130 km/h', '100 km/h', '90 km/h'],
  0,
  "En cas de pluie, le plafond passe de 130 à 110 km/h sur ces sections. Ce plafond ne dispense pas d'adapter "
  "davantage l'allure si les conditions l'exigent.",
  'Appliquer la limitation sous la pluie',
  'SPEED'),
 ("Sur autoroute, un brouillard réduit la visibilité à environ 35 m. Aucun panneau n'impose une vitesse inférieure. "
  'Quelle vitesse maximale résulte de cette visibilité ?',
  ['80 km/h', '50 km/h', '70 km/h', '110 km/h'],
  1,
  "Quand la visibilité est inférieure à 50 m, le maximum est de 50 km/h sur tous les réseaux, y compris l'autoroute. "
  'Il peut être nécessaire de rouler encore moins vite selon la situation.',
  'Appliquer le plafond de visibilité très réduite',
  'FOG'),
 ("À 90 km/h, votre voiture parcourt 25 mètres par seconde. Quelle distance correspond à l'intervalle minimal "
  'général de sécurité entre deux véhicules qui se suivent ?',
  ['25 m', '75 m', '90 m', '50 m'],
  3,
  "L'intervalle minimal général est de deux secondes. À 25 m/s, il représente 25 × 2 = 50 m ; les circonstances "
  'peuvent imposer davantage.',
  'Convertir deux secondes de suivi en distance',
  'DRIVING'),
 ('En agglomération, un bus à son arrêt annonce sa réinsertion dans votre voie. Vous pouvez ralentir sans danger. '
  "Sur quel usager porte ici l'obligation de faciliter le départ du véhicule de transport en commun ?",
  ['Le seul véhicule qui vient en sens inverse',
   'Le passager qui attend encore sur le trottoir',
   "Vous, qui approchez derrière l'autobus",
   'Le conducteur situé sur une rue non débouchante'],
  2,
  "Les conducteurs approchant doivent faciliter le départ de l'autobus de son arrêt en agglomération, notamment en "
  "ralentissant et au besoin en s'arrêtant.",
  "Faciliter la sortie d'un autobus urbain",
  'DRIVING'),
 ("Sur une route à deux voies de même sens, vous approchez d'un véhicule immobilisé sur la bande d'arrêt d'urgence "
  'avec ses feux de détresse. La voie gauche est occupée et un changement de voie serait dangereux. Comment '
  'appliquer le corridor de sécurité ?',
  ["Réduire l'allure et s'écarter dans sa voie autant que possible",
   "Maintenir l'allure tant qu'aucun changement de voie n'est possible",
   'Se déporter immédiatement à gauche malgré le véhicule présent',
   "Passer sur la bande d'arrêt d'urgence avant le véhicule arrêté"],
  0,
  "Il faut ralentir. Si le changement de voie ne peut être effectué sans danger, le conducteur s'éloigne autant que "
  'possible du véhicule immobilisé tout en restant dans sa voie.',
  "Adapter le corridor de sécurité à l'impossibilité de changer de voie",
  'DRIVING'),
 ("Un contrôle porte sur les équipements sonores utilisés en roulant. Quelle configuration entre dans l'interdiction "
  "des dispositifs portés à l'oreille, y compris pour le guidage ?",
  ['Le haut-parleur intégré au tableau de bord',
   'Une oreillette Bluetooth diffusant le GPS',
   "Une aide auditive portée pour corriger l'audition",
   'Le haut-parleur du GPS fixé au véhicule'],
  1,
  "Le dispositif audio porté à l'oreille est interdit en conduite, même pour le GPS. Le texte distingue notamment "
  "les appareils correcteurs de surdité ; la diffusion par haut-parleur n'est pas un dispositif porté à l'oreille.",
  'Distinguer oreillette et audio intégré',
  'DRIVING'),
 ('Un écran dans le champ de vision du conducteur affiche des images pendant que la voiture roule. Quel contenu '
  "relève de l'exception prévue pour les aides à la conduite ou à la navigation ?",
  ['Le suivi vidéo de la prochaine prise en charge',
   'Le tableau des recettes du chauffeur',
   'La visioconférence avec le client à venir',
   'La carte de guidage du trajet'],
  3,
  "Les écrans de navigation ou d'aide à la conduite relèvent de l'exception. Un divertissement, une publicité ou une "
  "visioconférence ne devient pas un outil de navigation du seul fait qu'il est utile à l'activité.",
  'Identifier un affichage de navigation autorisé',
  'DRIVING'),
 ('Vous terminez un dépassement sur une chaussée à deux voies dans votre sens. La droite redevient libre, aucun '
  'véhicule ne sera à dépasser prochainement et vous continuez tout droit. Quelle voie devez-vous reprendre après '
  'vérification ?',
  ['La voie de gauche du dépassement achevé',
   "La voie de gauche jusqu'à la prochaine sortie",
   'La voie de droite désormais disponible',
   "L'une ou l'autre selon la destination finale"],
  2,
  'En marche normale, le conducteur reprend la droite après le dépassement lorsque cela peut être fait sans danger. '
  "Aucun motif de rester à gauche n'est décrit.",
  'Revenir à la position normale de circulation',
  'DRIVING'),
 ("A roule à l'intérieur d'un giratoire et veut traverser la voie extérieure pour sortir. B circule déjà sur cette "
  "voie, à la hauteur de A. A met son clignotant. Qui doit laisser l'autre poursuivre dans sa voie ?",
  ['A doit laisser B poursuivre sur la voie extérieure',
   'B doit laisser A sortir dès le clignotant',
   "B doit céder parce que A est à l'intérieur",
   'Le premier véhicule entré dans le giratoire est prioritaire'],
  0,
  'Le clignotant annonce une intention mais ne donne pas priorité pour changer de voie. A doit vérifier que la voie '
  'extérieure peut être rejointe sans gêner B.',
  'Changer de voie dans un giratoire',
  'PRIORITY'),
 ("Un feu devient jaune fixe lorsque vous êtes si proche qu'un arrêt imposerait un freinage dangereux. Votre vitesse "
  "était adaptée et le carrefour est dégagé. Quelle conduite correspond à l'exception du Code ?",
  ["Freiner fortement pour respecter l'arrêt au jaune",
   'Poursuivre le franchissement sans accélération brusque',
   'Freiner à la ligne même si le véhicule reste engagé',
   "S'arrêter après le feu dès que la chaussée le permet"],
  1,
  "L'arrêt au jaune fixe est la règle, sauf si le conducteur ne peut plus s'arrêter dans des conditions de sécurité "
  'suffisantes lors de son allumage. La situation décrite correspond à cette exception.',
  "Appliquer l'exception de sécurité au jaune fixe",
  'AMBER'),
 ('Une famille prépare un transfert VTC avec un enfant de trois ans, sans exemption médicale. Parmi les préparatifs '
  'suivants, lequel correspond à la retenue exigée pour cet enfant ?',
  ['Prévoir la ceinture adulte seule sur la banquette arrière',
   'Partager la ceinture du parent installé à côté de lui',
   'Appliquer la dispense propre au transport par taxi',
   'Réserver une retenue homologuée adaptée à sa morphologie'],
  3,
  "Un VTC ne bénéficie pas de la dispense prévue pour le taxi. L'enfant doit disposer d'une retenue homologuée "
  "adaptée ; partager une ceinture ou utiliser seulement la ceinture adulte n'y répond pas ici.",
  'Distinguer les règles enfant du taxi et du VTC',
  'BELT'),
 ("Deux chauffeurs, sans exemption médicale, circulent en service : l'un conduit un taxi, l'autre un VTC vide entre "
  "deux réservations. Lequel peut invoquer l'exemption professionnelle de ceinture liée à la profession exercée ?",
  ['Le chauffeur de VTC entre ses courses',
   'Les deux chauffeurs professionnels',
   'Le chauffeur de taxi en service',
   'Aucun des deux chauffeurs en service'],
  2,
  "L'exemption professionnelle vise le conducteur de taxi en service. Elle ne s'étend pas au chauffeur de VTC, même "
  'lorsque son véhicule est vide.',
  'Appliquer la ceinture au chauffeur VTC',
  'BELT'),
 ("Un chauffeur prépare différentes configurations selon les passagers. Dans laquelle la désactivation de l'airbag "
  "frontal passager est-elle indispensable à l'installation décrite ?",
  ['Bébé dos à la route installé sur le siège avant',
   'Bébé dos à la route installé sur un siège arrière',
   'Adulte ceinturé installé sur le siège avant',
   "Enfant en retenue adaptée installé à l'arrière"],
  0,
  "Le siège bébé dos à la route à l'avant impose de désactiver l'airbag frontal passager. Son déclenchement mettrait "
  "en danger l'enfant. Les autres installations ne placent pas un enfant dos à la route devant cet airbag.",
  "Installer un siège dos à la route à l'avant",
  'BELT'),
 ("Un médicament nouveau porte le pictogramme orange de niveau 2. Le chauffeur n'a pas encore vérifié sa "
  'compatibilité avec la conduite. Quel interlocuteur doit-il consulter pour interpréter ce risque dans son '
  'traitement ?',
  ['Le responsable commercial de sa plateforme',
   'Son médecin ou son pharmacien',
   'Le technicien chargé du contrôle du véhicule',
   "L'assureur chargé des dommages matériels"],
  1,
  "Le niveau 2 appelle une appréciation avec le médecin ou le pharmacien. Les autres professionnels n'évaluent pas "
  "l'effet du traitement sur la conduite.",
  'Interpréter le niveau 2 des médicaments',
  'MEDS'),
 ("Un chauffeur est sous traitement. Quel changement pendant un trajet justifie d'interrompre la conduite en "
  'sécurité, puis de demander un avis professionnel sur le traitement ?',
  ['Un changement de couleur de la boîte délivrée',
   "La réception du rappel de renouvellement d'ordonnance",
   "La découverte d'un nouveau conditionnement du produit",
   "L'apparition d'une somnolence après la prise"],
  3,
  "Une somnolence altère la vigilance et impose d'arrêter la conduite en sécurité. Un changement de boîte ou un "
  'rappel administratif ne démontre pas cet effet ; il ne faut pas modifier seul le traitement.',
  'Réagir à une somnolence pendant le trajet',
  'MEDS'),
 ("Dans un exemple à vitesse constante de 20 m/s, un temps de réaction passe de 1 seconde à 1,5 seconde sous l'effet "
  "d'une altération de la vigilance. Quelle distance supplémentaire est parcourue avant le début du freinage ?",
  ['30 m', '20 m', '10 m', '5 m'],
  2,
  "Le retard supplémentaire est de 0,5 seconde, soit 20 × 0,5 = 10 m. L'alcool peut notamment augmenter le temps de "
  'réaction ; les valeurs de cet exemple sont fictives, pas un délai universel.',
  'Relier temps de réaction et distance avant freinage',
  'ALCOHOL'),
 ("Le contrôle technique périodique d'un VTC déjà en exploitation a été réalisé le 10 avril 2026. Quel mois doit "
  'servir de repère pour son prochain contrôle périodique ?',
  ['Avril 2027', 'Octobre 2026', 'Avril 2028', 'Avril 2031'],
  0,
  "Le contrôle technique d'un VTC est annuel. Le renouvellement se prépare donc pour avril 2027, sans attendre le "
  "rythme d'une voiture particulière ou celui du registre.",
  'Connaître la périodicité technique professionnelle',
  'INSPECTION'),
 ("Après le chargement, le chauffeur constate quatre changements. Lequel empêche directement de respecter l'exigence "
  'de liberté de manœuvre au poste de conduite ?',
  ['Le coffre contient une valise de plus que prévu au devis',
   "Une valise bloque le déplacement nécessaire d'une commande",
   'Le client demande une autre adresse de dépose',
   'La répartition des sacs change entre deux places arrière'],
  1,
  "Le conducteur doit rester en position d'exécuter commodément et sans délai les manœuvres nécessaires. Le blocage "
  "d'une commande est l'obstacle direct décrit ; les autres changements appellent d'autres vérifications.",
  'Préserver la liberté de mouvement du conducteur',
  'DRIVING'),
 ('Une voiture consomme davantage et son comportement routier se dégrade. Parmi les relevés suivants, lequel '
  "correspond à une cause liée au gonflage qu'il faut corriger ?",
  ['Les pressions à froid correspondent aux valeurs prescrites',
   "Les valeurs prescrites figurent sur l'étiquette constructeur",
   "Le contrôle a été consigné au carnet d'entretien",
   'Les pressions sont inférieures aux valeurs préconisées'],
  3,
  'Le sous-gonflage favorise la surconsommation et dégrade la tenue de route. Les valeurs doivent être vérifiées '
  'selon les préconisations ; les autres relevés ne décrivent pas un manque de pression.',
  "Comprendre l'effet du sous-gonflage",
  'ECO'),
 ('Vous voyez de loin une file ralentir. Vous avez une marge suffisante et personne ne vous suit de trop près. '
  "Quelle conduite réduit les freinages brusques et les dépenses d'énergie inutiles ?",
  ["Garder la vitesse puis freiner à l'approche de la file",
   'Rouler au point mort pour laisser le moteur au ralenti',
   "Relâcher tôt l'accélérateur et anticiper le ralentissement",
   'Conserver un régime élevé pour disposer de reprise'],
  2,
  "L'anticipation permet une décélération progressive et l'utilisation du frein moteur. Elle évite de fournir une "
  "énergie qu'il faudrait dissiper immédiatement par un freinage tardif.",
  'Anticiper pour une conduite souple',
  'ECO'),
 ("Un chauffeur compare des équipements qu'il pourrait laisser installés entre deux prestations. Lequel accroît "
  "inutilement la résistance à l'air s'il reste monté alors qu'il n'est plus utile ?",
  ['Le porte-bagages extérieur de toit',
   'Le tapis de protection posé dans le coffre',
   'Le support de téléphone fixé au tableau de bord',
   "Le dispositif de retenue enfant à l'arrière"],
  0,
  "Un équipement extérieur de toit inutilisé augmente la résistance à l'air et la consommation. Les autres "
  "accessoires cités restent à l'intérieur de la carrosserie et ne créent pas cet effet aérodynamique.",
  "Réduire la charge et l'équipement inutiles",
  'ECO'),
 ('Après un accident sur voie rapide, quatre emplacements sont accessibles sans traverser les voies. Lequel offre '
  "l'abri adapté aux passagers qui peuvent évacuer le véhicule ?",
  ["L'accotement juste devant le véhicule arrêté",
   'Le terrain situé derrière la glissière de sécurité',
   "L'espace entre deux voitures sur la bande d'arrêt",
   'La ligne de rive à hauteur du coffre ouvert'],
  1,
  'Les passagers doivent se placer derrière la glissière, à distance de la circulation. Rester près des véhicules ou '
  'sur la ligne de rive expose au trafic.',
  'Protéger les passagers après immobilisation',
  'ACCIDENT'),
 ('Au téléphone, les secours connaissent déjà le nombre de blessés. Ils demandent maintenant quel accès emprunter '
  'pour vous rejoindre sur la voie rapide. Quel relevé leur transmettez-vous en priorité ?',
  ['Deux voitures impliquées, un passager se plaint du bras',
   'Voiture grise, coffre endommagé, feux de détresse actifs',
   'Deux conducteurs présents, coordonnées des témoins notées',
   'A86, sens extérieur, point kilométrique repéré'],
  3,
  "Le numéro de route, le sens et le point kilométrique permettent de situer l'accident et de choisir l'accès. Les "
  'autres renseignements peuvent être utiles, mais ne répondent pas à la demande de localisation.',
  'Donner une localisation exploitable aux secours',
  'ACCIDENT'),
 ('Les secours sont prévenus. Une personne blessée reste dans une voiture, sans feu ni danger immédiat. Quelle tâche '
  'convient au témoin dans cette attente, conformément aux consignes reçues ?',
  ["L'aider à marcher jusqu'au véhicule du témoin",
   "La transférer sur le siège arrière pour l'allonger",
   'Surveiller la personne en évitant de la déplacer',
   "La sortir pour examiner sa mobilité sur l'accotement"],
  2,
  'Sans danger immédiat nécessitant une extraction, déplacer la victime peut aggraver ses blessures. Il faut éviter '
  'ces déplacements et suivre les consignes des secours.',
  "Éviter un déplacement aggravant d'un blessé",
  'ACCIDENT')]
