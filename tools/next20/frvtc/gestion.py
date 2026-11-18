"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [('Dans un exercice simplifié, une entreprise comptabilise 96 000 € de produits et 79 500 € de charges, tous '
  'éléments de résultat compris. Quel est son bénéfice ?',
  ['79 500 €', '16 500 €', '96 000 €', '175 500 €'],
  1,
  'Le résultat est la différence entre produits et charges : 96 000 − 79 500 = 16 500 €. Ni les recettes seules ni '
  'le montant des charges ne représentent ce bénéfice.',
  "Calculer le résultat d'un exercice",
  'BPI-RESULT'),
 ("La banque verse 20 000 € au titre d'un prêt. Aucun achat n'a encore été réglé. Quel couple de variations décrit "
  'uniquement cette opération au bilan ?',
  ['Banque +20 000 € ; créance client −20 000 €',
   'Banque +20 000 € ; capital social +20 000 €',
   'Voiture +20 000 € ; banque −20 000 €',
   'Banque +20 000 € ; dette bancaire +20 000 €'],
  3,
  "Le versement augmente les disponibilités et crée une dette bancaire. L'encaissement d'une créance réduit un "
  "compte client ; un apport augmente le capital ; l'achat comptant d'un véhicule diminue la banque. Ce sont "
  "d'autres opérations.",
  'Distinguer financement et produit',
  'BPI-RESULT',
  'BILAN'),
 ("Une mensualité d'emprunt de 620 € comprend 560 € de capital et 60 € d'intérêts, sans assurance ni frais. Quelle "
  'somme constitue ici une charge financière du compte de résultat ?',
  ['60 €', '560 €', '620 €', '500 €'],
  0,
  'Les intérêts constituent une charge financière de 60 €. Le remboursement des 560 € de principal réduit une dette '
  '; le décaissement total reste de 620 €.',
  'Séparer remboursement et intérêts',
  'BPI-RESULT'),
 ("Au journal figurent quatre opérations de décembre. Laquelle réduit le résultat de l'exercice sans correspondre à "
  'une sortie de trésorerie lors de son enregistrement ?',
  ["Le paiement comptant d'une réparation réalisée",
   "Le remboursement du capital d'un emprunt",
   "La dotation annuelle d'amortissement de la voiture",
   "Le règlement d'une dette fournisseur antérieure"],
  2,
  'La dotation aux amortissements est une charge calculée sans décaissement immédiat. La réparation payée est une '
  'charge décaissée ; le principal et une dette antérieure ne sont pas une nouvelle charge de décembre.',
  'Reconnaître une charge calculée',
  'BPI-RESULT'),
 ("À la clôture, une société tient une comptabilité d'engagement. Elle a réalisé et facturé un transfert de 240 € à "
  "une entreprise qui paiera le mois suivant. Où retrouve-t-on le droit d'obtenir ce paiement ?",
  ['Dans les dettes fournisseurs',
   'Dans les créances clients',
   'Dans les disponibilités bancaires',
   'Dans les apports en capital'],
  1,
  "La prestation facturée mais non encaissée crée une créance sur le client. L'argent ne figure pas encore parmi les "
  'disponibilités.',
  'Identifier une créance non encaissée',
  'BILAN',
  'BPI-RESULT'),
 ('Une société achète une voiture durablement affectée aux courses. Le vendeur est payé par un emprunt bancaire. Au '
  'bilan établi juste après, où inscrire ces deux éléments ?',
  ['Voiture : stock ; financement : dette fournisseur',
   'Voiture : immobilisation ; financement : capital',
   'Voiture : créance ; financement : avance client',
   'Voiture : immobilisation ; financement : emprunt'],
  3,
  'Le véhicule durable est une immobilisation et la somme due à la banque un emprunt. Les autres postes peuvent '
  'exister dans un bilan, mais ne décrivent pas cet achat financé par la banque.',
  'Classer investissement et financement',
  'BILAN'),
 ('Pour son budget de trésorerie de mars, un exploitant prévoit 3 200 € disponibles au départ, 7 800 € réellement '
  "encaissés et 8 500 € effectivement payés. Une facture de 1 400 € ne sera encaissée qu'en avril. Quel solde "
  'prévisionnel clôt mars ?',
  ['3 900 €', '−700 €', '2 500 €', '1 100 €'],
  2,
  "La trésorerie de mars vaut 3 200 + 7 800 − 8 500 = 2 500 €. La facture encaissée en avril n'entre pas dans les "
  'encaissements de mars.',
  'Affecter un mouvement au mois du paiement',
  'BPI-RESULT'),
 ("Dans un cas simplifié sans stocks ni autres postes d'exploitation, une entreprise a 9 600 € de créances clients "
  "et 3 400 € de dettes fournisseurs. Quel besoin d'exploitation reste à financer ?",
  ['6 200 €', '13 000 €', '9 600 €', '−6 200 €'],
  0,
  'Le besoin en fonds de roulement simplifié est créances moins dettes fournisseurs : 9 600 − 3 400 = 6 200 €. Les '
  'fournisseurs financent déjà une partie du décalage.',
  "Calculer un besoin de financement d'exploitation",
  'BILAN'),
 ('Deux prévisionnels ont les mêmes ventes, coûts et paiements fournisseurs. Dans le second, les clients paient à '
  "trente jours au lieu de comptant. Quel poste explique le financement d'exploitation supplémentaire à prévoir ?",
  ['Les apports des associés au capital social',
   'Les amortissements annuels du véhicule',
   'Le principal des emprunts déjà remboursés',
   "Les créances clients en attente d'encaissement"],
  3,
  'Le décalage des encaissements crée davantage de créances à financer, sans décaler les paiements fournisseurs. Le '
  'besoin supplémentaire vient donc du crédit accordé aux clients.',
  'Relier délai client et besoin de financement',
  'BILAN'),
 ('Les quatre contrats de stationnement suivants couvrent le même mois. Quel contrat produit une charge fixe sur ce '
  'mois, quel que soit le nombre de courses réalisé ?',
  ['6 € par journée effectivement stationnée',
   "240 € pour le mois, sans part liée à l'usage",
   '2 € par entrée enregistrée dans le parking',
   '90 € de base plus 1 € par passage du véhicule'],
  1,
  "Le forfait de 240 € ne varie pas avec l'activité dans la période considérée. Les deux contrats à l'usage sont "
  'variables ; celui à base fixe et supplément est mixte.',
  'Distinguer coût fixe et coût variable',
  'BPI-BREAKEVEN'),
 ("Une activité réalise 45 000 € de chiffre d'affaires HT et supporte 18 000 € de charges variables. Quelle somme "
  'reste pour couvrir les charges fixes puis produire un bénéfice ?',
  ['27 000 €', '18 000 €', '63 000 €', '45 000 €'],
  0,
  "La marge sur coûts variables est de 45 000 − 18 000 = 27 000 €. Elle doit d'abord absorber les charges fixes ; "
  "elle n'est pas encore le bénéfice net.",
  'Calculer la marge sur coûts variables',
  'BPI-BREAKEVEN'),
 ('Un prévisionnel comporte 36 000 € de charges fixes annuelles. Les charges variables représentent 40 % du chiffre '
  "d'affaires HT. Quel chiffre d'affaires couvre exactement l'ensemble de ces charges ?",
  ['90 000 €', '50 400 €', '60 000 €', '21 600 €'],
  2,
  'Le taux de marge sur coûts variables est 60 %. Le seuil de rentabilité vaut 36 000 ÷ 0,60 = 60 000 €. Diviser par '
  '40 % utiliserait le taux des coûts au lieu de celui de la marge.',
  'Déterminer le seuil de rentabilité',
  'BPI-BREAKEVEN'),
 ('Dans un modèle mensuel simplifié, chaque course apporte 18 € après ses coûts variables. Les charges fixes '
  "totalisent 2 700 €. Quel résultat obtient-on avec 170 courses, en l'absence d'autres charges ?",
  ['3 060 €', '360 €', '150 €', '5 760 €'],
  1,
  'Les courses apportent 170 × 18 = 3 060 €. Après 2 700 € de charges fixes, il reste 360 €. Le nombre de courses au '
  "seuil serait 150, mais ce n'est pas un montant de résultat.",
  'Calculer le résultat après couverture des coûts fixes',
  'BPI-BREAKEVEN'),
 ("Pour un exercice conventionnel de 360 jours avec des ventes régulières, le chiffre d'affaires annuel prévu est de "
  '90 000 € et le seuil de rentabilité de 60 000 €. Au bout de combien de jours le seuil serait-il atteint ?',
  ['120 jours', '180 jours', '300 jours', '240 jours'],
  3,
  "Le point mort se calcule ici par 60 000 ÷ 90 000 × 360 = 240 jours. L'hypothèse de ventes régulières est "
  'nécessaire à cette conversion en durée.',
  'Convertir un seuil en point mort dans un modèle régulier',
  'BPI-BREAKEVEN'),
 ('Un chauffeur sous le régime micro encaisse 4 600 € de recettes professionnelles hors taxes sur la période. Il '
  "règle 900 € de carburant et 300 € d'entretien. Quel montant de recettes doit-il déclarer avant tout abattement "
  'forfaitaire ?',
  ['3 400 €', '3 700 €', '4 600 €', '4 300 €'],
  2,
  'Les dépenses réelles ne se déduisent pas des recettes déclarées sous le régime micro. Le montant est donc 4 600 '
  '€, et non le solde disponible après carburant ou entretien.',
  'Déclarer le montant brut encaissé en micro',
  'MICRO'),
 ('Un entrepreneur au régime micro souhaite que ses frais professionnels soient déduits pour leur montant réel dans '
  'le calcul du bénéfice imposable. Quelle voie fiscale doit-il examiner ?',
  ["L'option pour un régime réel d'imposition",
   "L'option pour la franchise en base de TVA",
   "Le versement libératoire de l'impôt sur le revenu",
   'Le maintien du régime micro avec son abattement'],
  0,
  "Le régime micro repose sur un abattement forfaitaire, pas sur la déduction des charges réelles. L'administration "
  'invite à examiner le régime réel lorsque ces charges sont importantes ; le choix nécessite une comparaison de la '
  'situation.',
  'Distinguer abattement micro et frais réels',
  'MICRO'),
 ("Ana crée seule une personne morale et souhaite en être la présidente. Elle écarte l'entreprise en nom propre et "
  'les formes dirigées par un gérant. Quel statut correspond à son projet ?',
  ['La forme EURL', "L'exercice en entreprise individuelle", 'Une SARL à plusieurs associés', 'La forme SASU'],
  3,
  "La SASU est la SAS à associé unique. L'EURL est une autre société unipersonnelle, rattachée à la SARL ; "
  "l'entreprise individuelle n'est pas une société.",
  'Reconnaître les sociétés unipersonnelles',
  'FORMS'),
 ('Trois personnes veulent être associées dans la même société, avec un gérant et des parts sociales. Elles écartent '
  'la société par actions. Quelle structure correspond à leur projet ?',
  ['Une EURL', 'Une SARL', 'Une SASU', 'Une entreprise individuelle'],
  1,
  "Une SARL peut réunir plusieurs associés. L'EURL n'en a qu'un, la SASU relève d'une autre forme et l'entreprise "
  "individuelle ne réunit pas d'associés.",
  'Identifier une forme pluripersonnelle',
  'FORMS'),
 ('Un entrepreneur individuel possède une voiture exclusivement professionnelle et une résidence sans usage '
  'professionnel. Pour des dettes professionnelles ordinaires, sans exception ni engagement particulier, quelle '
  'distinction gouverne la protection de la résidence ?',
  ["L'appartenance aux patrimoines professionnel et personnel",
   'La répartition entre actions majoritaires et minoritaires',
   'Le montant du capital souscrit et du capital libéré',
   'Le partage des réserves entre plusieurs associés'],
  0,
  "La séparation automatique des patrimoines de l'entrepreneur individuel protège en principe son patrimoine "
  "personnel, sous réserve des exceptions. Il n'y a ici ni actions ni associés à répartir.",
  'Comprendre le principe de séparation patrimoniale en EI',
  'FORMS'),
 ('Deux dossiers concernent une EURL dirigée par son associé unique et une SASU dont le président rémunéré exerce '
  "seulement son mandat. Lequel relève du statut d'assimilé salarié sans assurance chômage attachée au seul mandat ?",
  ["Le gérant associé unique de l'EURL",
   'Les deux dirigeants du fait de leur rémunération',
   'Le président rémunéré de la SASU',
   "Aucun des deux du fait de l'associé unique"],
  2,
  'Le président rémunéré de SASU relève du régime assimilé salarié, sans assurance chômage au titre du seul mandat. '
  "Le gérant associé unique d'EURL relève du régime des travailleurs indépendants.",
  'Distinguer assimilation sociale et assurance chômage',
  'FORMS'),
 ('Une entreprise emploie deux séries de factures distinctes et justifiées : WEB et PRO. Les dernières émissions '
  'sont WEB-2026-118 et PRO-2026-042. La nouvelle facture appartient à PRO, sans autre émission depuis. Quel numéro '
  'doit-elle porter ?',
  ['WEB-2026-119', 'PRO-2026-043', 'PRO-2026-119', 'WEB-2026-043'],
  1,
  'Chaque série suit sa propre séquence continue. La facture PRO suivante succède à PRO-2026-042, indépendamment du '
  'numéro atteint par WEB.',
  "Appliquer la continuité d'une série de factures",
  'INVOICE'),
 ("Un client a payé sa course. L'entreprise accepte ensuite une réduction de 15 € sur le prix facturé. Quelle pièce "
  'constate cette réduction dans la comptabilité, en référence à la facture initiale ?',
  ['Un devis pour le prochain déplacement du client',
   "Une facture d'acompte sur une future réservation",
   'Une quittance confirmant le règlement initial',
   "Une facture d'avoir pour les 15 € corrigés"],
  3,
  "L'avoir constate la correction de la facture déjà payée. Un devis ou un acompte concerne un autre stade de "
  'commande ; une quittance atteste le paiement sans corriger le prix.',
  'Corriger une facture déjà réglée',
  'INVOICE'),
 ("Un client demande un document présentant le prix proposé pour un déplacement qu'il n'a pas encore accepté. Quel "
  'document correspond à ce stade de la relation ?',
  ['Une quittance', 'Un avoir', 'Un devis', 'Une facture acquittée'],
  2,
  'Le devis présente une proposition avant la prestation et engage les parties une fois accepté. Une quittance ou '
  'une facture acquittée suppose un paiement ; un avoir corrige une facturation.',
  "Choisir le document adapté avant l'accord",
  'INVOICE'),
 ('Un chauffeur crée son entreprise individuelle de transport. Par quel service effectue-t-il la formalité donnant '
  'une existence légale à cette entreprise ?',
  ['Le guichet unique électronique des formalités',
   "Le portail de déclaration de recettes de l'Urssaf",
   'Le service préfectoral des cartes professionnelles',
   'Le portail du registre sectoriel des VTC'],
  0,
  "La création de l'entreprise passe par le guichet unique électronique de l'Inpi. Cette formalité ne se confond pas "
  "avec l'inscription sectorielle de l'exploitant au registre des VTC.",
  "Identifier la formalité de création d'entreprise",
  'BPI-VTC')]
