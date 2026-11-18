"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [('Pour étudier ses transferts individuels entre une ville et son aéroport, un exploitant distingue concurrence '
  'directe et indirecte. Quel service relève surtout de la concurrence indirecte ?',
  ['Une autre entreprise de VTC sur ce trajet',
   "Une navette collective desservant l'aéroport",
   'Un chauffeur indépendant proposant le même transfert',
   'Une centrale de réservation de voitures avec chauffeur'],
  1,
  'La navette répond au même besoin de déplacement avec une offre différente, collective. Les autres offres sont '
  'proches du transfert individuel étudié et relèvent davantage de la concurrence directe.',
  'Distinguer solutions concurrentes directes et indirectes',
  'MARKET'),
 ('Une entreprise réserve les trajets de ses techniciens. Mme Roux, aux achats, choisit le prestataire ; M. Diallo '
  'voyage ; Mme Blanc à la comptabilité paie ; un hôtel a recommandé le chauffeur. Qui faut-il interroger pour '
  'comprendre les critères de sélection du prestataire ?',
  ['M. Diallo, technicien transporté',
   'Mme Blanc, chargée du règlement comptable',
   'Le réceptionniste qui a recommandé le chauffeur',
   'Mme Roux, responsable du choix aux achats'],
  3,
  'Le décideur acheteur fixe ici les critères de choix. Le voyageur, la personne qui règle et le prescripteur ont '
  "d'autres rôles, même s'ils peuvent fournir des informations complémentaires.",
  'Séparer achat et utilisation',
  'MARKET'),
 ('Un exploitant veut regrouper ses clients selon les contraintes des trajets, pour adapter véhicules et horaires. '
  "Quel couple d'informations permet cette segmentation plutôt qu'une segmentation par origine publicitaire ou "
  'localisation ?',
  ['Fréquence des départs matinaux et volume de bagages',
   'Publicité consultée et coût du premier contact',
   'Code postal et quartier de résidence',
   'Moyen de règlement et référence du paiement'],
  0,
  'La fréquence, les horaires et les bagages décrivent les usages et contraintes du déplacement. Les autres couples '
  "renseignent le canal d'acquisition, la géographie ou le paiement.",
  'Segmenter selon les besoins',
  'MARKET'),
 ("L'étude vise tous les usagers de la zone, mais les réponses proviennent uniquement d'un hôtel haut de gamme le "
  "samedi soir. Quelle modification répond directement au biais de recrutement de l'échantillon ?",
  ['Conserver ce lieu et raccourcir chaque question',
   'Conserver ce créneau et changer la couleur du formulaire',
   "Interroger aussi d'autres lieux, clientèles et créneaux",
   'Réinterroger les mêmes personnes sur une seconde grille'],
  2,
  'Le problème tient à la couverture insuffisante du marché visé. Diversifier les lieux, personnes et horaires '
  'répond à ce biais ; modifier le formulaire ne suffit pas.',
  "Repérer un biais d'échantillonnage",
  'MARKET'),
 ("Un prévisionnel annuel utilise une semaine de festival dont les recettes sont très élevées. Le chargé d'étude "
  "dispose déjà du tarif moyen et du nombre de courses du festival. Quel relevé complète le mieux l'estimation des "
  'semaines ordinaires ?',
  ['Les courses de la journée record du festival',
   'Les courses et recettes de périodes sans événement',
   'Les majorations appliquées pendant les concerts',
   'Les réservations de la dernière soirée festive'],
  1,
  "L'activité hors événement permet d'estimer les périodes ordinaires. Les autres données détaillent le pic déjà "
  "observé, sans établir sa représentativité sur l'année.",
  'Distinguer pic ponctuel et demande régulière',
  'MARKET'),
 ("Dans son étude, un exploitant classe quatre changements : ouverture d'une liaison ferroviaire vers l'aéroport, "
  "hausse de sa facture d'entretien, achat d'une voiture et retard de règlement d'un client. Lequel modifie l'offre "
  'de substitution disponible pour les voyageurs ?',
  ["La hausse des frais d'entretien du véhicule",
   "L'acquisition d'une voiture pour son propre parc",
   "Le décalage d'un règlement de client professionnel",
   "La nouvelle desserte ferroviaire de l'aéroport"],
  3,
  'La liaison ferroviaire offre une solution de transport concurrente. Les autres changements concernent les coûts, '
  "la capacité interne ou la trésorerie de l'exploitant.",
  "Identifier un changement de l'environnement du marché",
  'MARKET'),
 ("Deux offres de transfert annoncent 75 € et 90 €. La seconde inclut trente minutes d'attente et les péages ; la "
  'première ne les précise pas. Quel relevé permet de comparer le prix de la prestation comprenant les mêmes '
  'services et frais ?',
  ['Les deux totaux incluant cette attente et ces péages',
   "Les deux prix d'appel avant ajout des suppléments",
   'Les seuls tarifs kilométriques annoncés',
   'Les remises maximales proposées à de nouveaux clients'],
  0,
  'Une comparaison utile doit porter sur un périmètre identique. Il faut donc reconstituer les deux totaux incluant '
  'les mêmes services et frais.',
  'Comparer des prix à périmètre équivalent',
  'PRICE'),
 ("Un acheteur explique que son problème principal est l'arrivée tardive des chauffeurs, et non la réservation ou la "
  'facturation. Quel engagement mesurable répond le plus directement à cette priorité ?',
  ["Un délai documenté d'envoi des factures",
   'Un taux documenté de réponses aux devis',
   "Un taux documenté de prises en charge à l'heure",
   'Un délai documenté de remboursement des frais'],
  2,
  'La ponctualité des prises en charge répond au problème exprimé. Les autres indicateurs sont mesurables et utiles, '
  "mais portent sur d'autres étapes du service.",
  'Relier prix et bénéfice perçu par la cible',
  'PRICE'),
 ('Une jeune entreprise choisit des prix bas pour gagner rapidement beaucoup de clients, avec une marge réduite par '
  "course et un besoin de volume élevé. De quelle politique de prix s'agit-il ?",
  ['Une politique de pénétration',
   "Une politique d'écrémage",
   "Une politique d'alignement",
   'Une politique de prix de prestige'],
  0,
  "La pénétration cherche à attirer un volume important par un prix relativement bas. L'écrémage vise au contraire "
  'une clientèle plus restreinte avec un prix élevé.',
  'Identifier une stratégie tarifaire',
  'PRICE'),
 ('Un client choisit un chauffeur conseillé par la réception de son hôtel. Il réserve et paie lui-même la course ; '
  "l'hôtel n'achète ni ne revend le transport. Quel acteur joue ici le rôle de prescripteur ?",
  ['Le voyageur qui a accepté puis payé la course',
   'La réception qui a recommandé le prestataire',
   'Le chauffeur qui exécute le déplacement',
   'Le service bancaire qui traite le règlement'],
  1,
  'Le prescripteur influence le choix par sa recommandation. Le client achète, le chauffeur fournit la prestation et '
  'la banque traite le paiement.',
  'Identifier un intermédiaire prescripteur',
  'MARKET'),
 ('Sur 160 demandes de devis qualifiées, 40 deviennent des réservations. Quel est le taux de transformation de ces '
  'demandes en réservations ?',
  ['4 %', '40 %', '75 %', '25 %'],
  3,
  'Le taux vaut 40 ÷ 160 × 100 = 25 %. Il mesure les réservations obtenues parmi les demandes considérées, pas leur '
  'nombre brut.',
  'Calculer une conversion commerciale',
  'DIGITAL'),
 ("Une campagne coûte 720 € au total et apporte 24 nouveaux clients identifiés. Quel est son coût d'acquisition par "
  'nouveau client ?',
  ['24 €', '17 280 €', '30 €', '696 €'],
  2,
  "Le coût d'acquisition moyen est 720 ÷ 24 = 30 €. Ce montant ne renseigne pas à lui seul sur la rentabilité future "
  'de ces clients.',
  "Calculer un coût d'acquisition",
  'DIGITAL'),
 ('Une cohorte de 80 nouveaux clients a effectué une première course en janvier. Parmi ces mêmes personnes, 28 '
  'commandent de nouveau avant fin mars. Quelle part de cette cohorte a renouvelé son achat sur cette période ?',
  ['35 %', '28 %', '65 %', '80 %'],
  0,
  "Le taux de réachat de la cohorte est 28 ÷ 80 = 35 %. Il ne faut pas y inclure d'autres clients arrivés après "
  'janvier.',
  "Mesurer le réachat d'une cohorte",
  'DIGITAL'),
 ("Le responsable veut mesurer si les demandes reçues correspondent réellement à la zone et aux horaires qu'il "
  'dessert. Quel rapport doit-il suivre ?',
  ['Réservations payées divisées par devis acceptés',
   'Demandes réalisables divisées par demandes reçues',
   'Clients récurrents divisés par clients de la cohorte',
   'Dépenses publicitaires divisées par nouveaux clients'],
  1,
  "La part des demandes réalisables mesure leur adéquation à l'offre. Les autres rapports portent sur le paiement, "
  "la récurrence ou le coût d'acquisition.",
  'Mesurer la qualité des contacts',
  'DIGITAL'),
 ('Une page passe de 1 000 visiteurs et 40 réservations à 400 visiteurs et 24 réservations. Quel bilan décrit '
  'correctement ces seuls résultats ?',
  ['Le taux et le nombre de réservations augmentent',
   'Le taux diminue alors que le volume augmente',
   'Le nombre de réservations reste identique',
   'Le taux augmente mais le nombre de réservations baisse'],
  3,
  'Le taux passe de 4 % à 6 %, mais les réservations diminuent de 40 à 24. Un taux meilleur ne suffit donc pas à '
  'conclure à une hausse du volume commercial.',
  'Interpréter simultanément taux et volume',
  'DIGITAL'),
 ('Le parcours compte 500 visiteurs sur la page tarif, 120 débuts de formulaire, 12 formulaires envoyés et 9 '
  "réservations. Quelle transition présente le plus faible taux de passage à l'étape suivante ?",
  ['De la page tarif au début de formulaire',
   'Du formulaire envoyé à la réservation',
   'Du début de formulaire à son envoi',
   'Les trois transitions ont le même taux'],
  2,
  'Les taux sont 120/500 = 24 %, 12/120 = 10 % et 9/12 = 75 %. La finalisation du formulaire est la transition la '
  'plus faible.',
  'Localiser une difficulté dans le parcours client',
  'DIGITAL'),
 ('Une entreprise veut capter les personnes qui tapent déjà « transfert gare aéroport » avec le nom de leur ville '
  'dans un moteur de recherche. Quelle action cible directement cette recherche active ?',
  ['Publier une page locale décrivant ce transfert',
   'Adresser une offre de retour à ses anciens clients',
   'Distribuer une carte de fidélité après chaque course',
   "Présenter ses services dans une réunion d'hôteliers"],
  0,
  'La page locale répond à une recherche portant sur le service et le lieu. Les autres actions ciblent des clients '
  "connus ou des prescripteurs, par d'autres canaux.",
  "Choisir un canal selon l'intention d'achat",
  'DIGITAL'),
 ("Un exploitant veut mesurer l'effet du seul titre d'une page sur les demandes reçues. Quel protocole isole le "
  'mieux cette variable ?',
  ['Deux titres et deux tarifs, sur des visiteurs répartis ensemble',
   'Deux titres, même page et répartition simultanée des visiteurs',
   "Un titre en semaine et l'autre pendant un festival",
   "Un titre pour les anciens clients et l'autre pour les nouveaux"],
  1,
  'Le titre doit être la différence testée. Modifier en même temps le tarif, la période ou la clientèle confond son '
  "effet avec d'autres facteurs.",
  'Isoler un facteur dans un test commercial',
  'DIGITAL'),
 ("L'entreprise souhaite modifier elle-même ses horaires et son formulaire de réservation, sans attendre l'accord "
  "d'un éditeur tiers. Sur quel support dispose-t-elle directement de cette maîtrise ?",
  ['La fiche éditoriale publiée par un journal local',
   "L'avis qu'un client a laissé sur un annuaire",
   "La page de résultats d'un comparateur indépendant",
   'Le site dont elle gère le contenu et le formulaire'],
  3,
  "Son propre site est un support qu'elle contrôle. Les publications, avis et pages de tiers dépendent de leurs "
  'auteurs ou éditeurs.',
  'Distinguer médias détenus, payants et gagnés',
  'DIGITAL'),
 ("Deux commerciaux ont relancé le même prospect : chacun ignorait l'appel de l'autre. Quel champ partagé dans le "
  'CRM traite le plus directement la cause de ce doublon ?',
  ['Code postal du prospect et zone desservie',
   'Montant du budget publicitaire par campagne',
   'Date du dernier contact, auteur et prochaine action',
   'Catégorie et capacité du véhicule proposé'],
  2,
  "L'historique du contact, son auteur et la prochaine action permettent de coordonner le suivi. Les autres champs "
  "renseignent le marché ou l'offre, pas la relance déjà effectuée.",
  'Utiliser un suivi commercial partagé',
  'DIGITAL'),
 ("Un particulier a créé un compte sans acheter de course ni donner d'accord publicitaire distinct. L'entreprise "
  'veut lui envoyer une première promotion. Quelle donnée devrait-elle pouvoir produire pour fonder cette '
  'prospection par courriel ?',
  ["La trace d'un consentement spécifique à ces offres",
   "La référence d'un achat de service analogue déjà réalisé",
   "La preuve du lien de l'offre avec ses fonctions professionnelles",
   "Le numéro d'une course en cours nécessitant une confirmation"],
  0,
  'Dans ce cas de prospect particulier sans achat, il faut normalement son consentement spécifique. Les autres '
  'éléments renvoient à des situations différentes : client existant, destinataire professionnel ou message de '
  'service.',
  'Distinguer compte créé et consentement publicitaire',
  'CNIL-MAIL'),
 ("Un particulier a acheté un transfert. L'entreprise propose ses propres transferts similaires, avec information et "
  'opposition possible dès la collecte puis à chaque message. Quel élément du dossier permet ici de distinguer cette '
  "situation d'un simple compte sans achat ?",
  ['La date de création du compte sans commande',
   'La facture du transfert précédemment acheté',
   'La fonction professionnelle du destinataire',
   "La confirmation technique d'un mot de passe"],
  1,
  "L'achat antérieur permet d'envisager l'exception pour les services analogues du même prestataire, sous les "
  "conditions d'information et d'opposition données. Créer un compte ne vaut pas achat.",
  "Appliquer l'exception des services analogues",
  'CNIL-MAIL'),
 ("Une offre de transferts d'affaires est envoyée à l'adresse professionnelle de quatre salariés. Pour lequel le "
  "lien avec les fonctions est-il directement établi, sous réserve d'information et d'opposition simple ?",
  ['Le technicien chargé des réparations informatiques',
   'La graphiste chargée des visuels du catalogue',
   'Le responsable chargé de la maintenance des machines',
   "La responsable chargée des voyages de l'entreprise"],
  3,
  'Le service proposé est directement lié à la fonction de gestion des voyages. Une adresse professionnelle seule ne '
  "suffit pas à rendre l'offre pertinente pour n'importe quelle fonction.",
  'Reconnaître une sollicitation professionnelle pertinente',
  'CNIL-MAIL'),
 ("Une cliente s'est opposée aux courriels commerciaux. Lors d'un nouvel import, son adresse réapparaît. Quel "
  "fichier doit être rapproché de l'import pour empêcher une nouvelle sollicitation publicitaire ?",
  ['Le fichier des factures arrivées à échéance',
   'Le planning des courses déjà confirmées',
   'Le fichier des oppositions à la prospection',
   'Le catalogue des prestations proposées'],
  2,
  "La liste d'opposition permet d'exclure les adresses désinscrites, même lorsqu'un nouveau fichier les réintroduit. "
  "Une suppression ponctuelle n'assure pas cette protection lors des imports futurs.",
  "Rendre durable le droit d'opposition",
  'CNIL-COMMUNICATION'),
 ("Pour proposer un devis de transfert ordinaire, un formulaire exige la destination, l'horaire, les coordonnées de "
  "contact et le revenu annuel du voyageur. Aucune finalité liée au revenu n'est justifiée. Quel champ pose un "
  'problème de proportionnalité ?',
  ['La destination du trajet', "L'horaire de départ souhaité", 'Les coordonnées de réponse', 'Le revenu annuel'],
  3,
  'Les données collectées doivent être nécessaires à la finalité. Le revenu annuel ne sert pas ici à établir ou '
  'transmettre le devis, contrairement aux informations de trajet et de contact.',
  'Limiter les données à une finalité déterminée',
  'CNIL-DATA'),
 ('Une cliente refuse les publicités mais réserve une course. Parmi les messages envisagés, lequel est strictement '
  "lié à l'exécution de cette réservation, sans prospection ajoutée ?",
  ["La confirmation de l'heure et du lieu de rendez-vous",
   'La remise proposée sur son prochain transfert',
   "La présentation d'un nouveau circuit touristique",
   "L'invitation à parrainer une autre personne"],
  0,
  'La confirmation de la course est un message de service nécessaire à la demande. Les trois autres messages '
  'cherchent à susciter de nouveaux achats ou recommandations.',
  'Distinguer message transactionnel et promotion',
  'CNIL-COMMUNICATION'),
 ('Un consommateur a adressé une réclamation au prestataire pour une course facturée. Le litige persiste et il '
  'cherche la voie amiable de consommation prévue pour ce professionnel. Quel contact doit-il utiliser ?',
  ['Le gestionnaire du REVTC pour une mise à jour de véhicule',
   'Le médiateur de la consommation indiqué par le prestataire',
   'La préfecture compétente pour la carte du conducteur',
   "La CMA organisatrice de la session d'examen"],
  1,
  'Après la réclamation préalable non résolue, le consommateur peut saisir le médiateur de la consommation '
  "compétent. Les autres organismes interviennent dans les formalités d'exploitation ou d'accès à la profession.",
  'Identifier le recours amiable après réclamation',
  'CONSUMER'),
 ('Pour une prestation, un véhicule parcourt 45 km avec le client et 25 km de retour à vide. Le coût retenu est de '
  '0,40 € par kilomètre réellement parcouru, sans autre poste dans ce calcul. Quel coût kilométrique faut-il imputer '
  '?',
  ['18 €', '10 €', '28 €', '8 €'],
  2,
  'Les 70 km parcourus coûtent 70 × 0,40 = 28 €. Le retour à vide consomme aussi des ressources ; ne compter que les '
  'kilomètres occupés donnerait 18 €.',
  'Inclure les kilomètres à vide dans le coût',
  'PRICE'),
 ('Un tarif fictif prévoit 12 € de prise en charge, 1,20 € par kilomètre et 0,40 € par minute, ces trois composantes '
  "s'ajoutant. Pour 18 km et 25 minutes, quel prix résulte de ce tarif, sans autre frais ?",
  ['43,60 €', '33,60 €', '31,60 €', '53,60 €'],
  0,
  'Le prix est 12 + (18 × 1,20) + (25 × 0,40) = 43,60 €. Oublier le temps donne 33,60 € ; oublier la prise en charge '
  'donne 31,60 €.',
  'Calculer un tarif à composantes temporelle et kilométrique',
  'BPI-VTC'),
 ('Une prestation revient à 80 € HT et se vend 100 € HT. Quel est son taux de marque, calculé sur le prix de vente ?',
  ['25 %', '20 %', '80 %', '125 %'],
  1,
  'La marge vaut 20 €. Le taux de marque est 20 ÷ 100 = 20 %. Le résultat de 25 % correspondrait au taux de marge, '
  'calculé sur le coût de 80 €.',
  'Distinguer taux de marque et taux de marge',
  'MARGIN'),
 ("Le coût de revient d'une course est estimé à 72 € HT. L'exploitant vise un taux de marge de 25 % sur ce coût, "
  'sans commission supplémentaire. Quel prix HT doit-il retenir ?',
  ['96 €', '75 €', '54 €', '90 €'],
  3,
  'Un taux de marge de 25 % sur 72 € ajoute 18 €, soit 90 €. Diviser par 0,75 donnerait 96 €, prix associé à un taux '
  'de marque de 25 %, ce qui est différent.',
  "Former un prix à partir d'un taux de marge",
  'MARGIN'),
 ('Dans un calcul HT simplifié, une plateforme retient 20 % du prix payé par le client. Une course coûte 48 € à '
  "l'exploitant et il vise 12 € de marge après commission. Quel prix client faut-il fixer ?",
  ['60 €', '72 €', '75 €', '62,40 €'],
  2,
  'Il faut conserver 48 + 12 = 60 € après commission. Comme 80 % du prix lui revient, le prix doit être 60 ÷ 0,80 = '
  '75 €. Ajouter simplement 20 % à 60 € donnerait seulement 57,60 € après retenue.',
  'Intégrer une commission proportionnelle au prix',
  'PRICE'),
 ("Une course vendue 100 € HT a un coût inchangé de 70 € HT. L'exploitant accorde une remise de 10 % sur le prix. "
  'Quelle diminution de sa marge en euros en résulte ?',
  ['10 €', '3 €', '7 €', '30 €'],
  0,
  'La marge passe de 30 € à 20 € puisque le prix baisse de 10 € et le coût ne change pas. La réduction de marge '
  "n'est pas 10 % de l'ancienne marge.",
  "Mesurer l'effet d'une remise sur la marge",
  'PRICE',
  'MARGIN'),
 ('Un forfait de quatre transferts comprend trois trajets dont le coût de revient est de 40 € chacun et un trajet '
  'coûtant 80 €. Quel coût moyen par transfert faut-il retenir pour ce forfait ?',
  ['60 €', '50 €', '40 €', '200 €'],
  1,
  'Le coût total est 3 × 40 + 80 = 200 €, soit 50 € par transfert. La moyenne simple des deux tarifs de coût, 60 €, '
  'ignorerait leurs fréquences différentes.',
  "Pondérer les coûts d'un ensemble de prestations",
  'PRICE'),
 ('Une voiture disponible deux heures peut assurer soit une longue course apportant 46 € après coûts variables, soit '
  "deux courses successives apportant chacune 27 €. Les charges fixes et le risque d'annulation sont identiques. "
  'Quel choix apporte le plus pour couvrir ces charges ?',
  ['La longue course, avec 8 € de plus',
   'Les deux courses, avec 19 € de plus',
   'Les deux solutions, à contribution égale',
   'Les deux courses, avec 8 € de plus'],
  3,
  'Les deux courses apportent 2 × 27 = 54 €, contre 46 €, soit 8 € de plus. Le calcul compare ici la contribution '
  'sur la même capacité disponible, sous les hypothèses précisées.',
  "Arbitrer l'usage d'une capacité limitée",
  'PRICE'),
 ("Un devis forfaitaire ferme a été accepté. Aucune clause de révision ni cause légale particulière n'est "
  'applicable. Parmi quatre échanges ultérieurs, lequel établit une modification du prix par consentement mutuel ?',
  ['Une nouvelle grille de prix publiée sur le site',
   'Une facture au montant supérieur envoyée au client',
   'Un avenant de prix accepté par le client et le prestataire',
   "Un message de l'assureur modifiant la prime annuelle"],
  2,
  "Le contrat peut être modifié par accord mutuel. L'avenant accepté établit cet accord ; un tarif publié, une "
  "facture unilatérale ou la prime d'assurance ne modifient pas à eux seuls le devis convenu.",
  'Distinguer nouveau tarif et modification contractuelle',
  'CONTRACT-1193')]
