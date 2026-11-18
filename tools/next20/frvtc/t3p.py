"""Original source-backed items; corrective design in revision-plan-v2.md."""
ROWS = [('Quel trajet avec partage des frais relève du covoiturage au sens légal ?',
  ['Léa rejoint sa famille, même sans passager',
   'Marc rejoint la gare uniquement pour y déposer Paul',
   'Inès sort de chez elle à la demande de deux voisins',
   'Yann fait un détour complet sans destination personnelle'],
  0,
  'Le covoiturage suppose un déplacement que le conducteur effectue pour son propre compte, en '
  'plus du partage des frais. Léa conserve ici un motif de trajet indépendant de la demande des '
  'passagers.',
  'Identifier le trajet pour compte propre',
  'CARPOOL'),
 ('À qui peut revenir une rémunération distincte du partage des frais en covoiturage ?',
  ['Au conducteur pour sa disponibilité professionnelle',
   'Au site pour son service de mise en relation',
   'Au conducteur pour le temps de prise en charge',
   'Au conducteur pour une marge sur le transport'],
  1,
  'L3132-1 autorise une mise en relation à titre onéreux. Cela distingue la rémunération du site '
  'de celle du conducteur, dont le trajet reste personnel et limité au partage des frais.',
  "Distinguer rémunération de l'intermédiaire et du conducteur",
  'CARPOOL'),
 ('Quel service relève du transport public collectif plutôt que du T3P ?',
  ['Les taxis prenant des clients à leur station',
   'Les voitures réservées pour chaque déplacement',
   'La ligne desservant les arrêts à heures fixes',
   'Les motos transportant un client sur commande'],
  2,
  "La ligne d'autobus est un service collectif. Les taxis, VTC et véhicules motorisés à deux ou "
  'trois roues avec chauffeur relèvent des transports publics particuliers de personnes.',
  'Distinguer transport collectif et T3P',
  'T3P-SCOPE'),
 ('Un passant hèle un VTC libre. Quelle pièce manque pour autoriser sa prise en charge ?',
  ["L'attestation de RC professionnelle",
   "Le certificat d'immatriculation du véhicule",
   'La carte professionnelle du conducteur',
   'Un justificatif de réservation antérieure'],
  3,
  'Les documents professionnels permanents ne prouvent pas la réservation de cette course. Le VTC '
  "ne peut prendre en charge sur la voie publique un client qui n'a pas réservé préalablement.",
  'Reconnaître une prise en charge sans réservation',
  'T3P-MARAUDE'),
 ('Avant réservation, quel écran constitue une maraude électronique interdite pour un VTC sur la '
  'voie publique ?',
  ['Une carte situant une voiture marquée « libre »',
   'Un devis donnant prix et mode de règlement',
   'Une fiche indiquant places et bagages admis',
   'Un annuaire présentant entreprise et coordonnées'],
  0,
  "Avant réservation, informer simultanément sur la localisation et la disponibilité d'un VTC sur "
  "la voie publique relève de l'interdiction de maraude électronique. Les autres écrans "
  "n'associent pas ces deux renseignements.",
  'Reconnaître la maraude électronique',
  'T3P-MARAUDE'),
 ('Pendant son activité, quel document personnel le chauffeur doit-il rendre visible de '
  "l'extérieur ?",
  ['Son attestation de formation continue',
   'Sa carte professionnelle de conducteur VTC',
   "Son certificat d'aptitude médicale",
   'Son reçu de renouvellement du permis'],
  1,
  "La carte professionnelle doit être apposée de manière visible de l'extérieur pendant "
  "l'activité. Les autres pièces répondent à des fonctions distinctes et ne remplacent pas cet "
  'affichage.',
  'Appliquer la visibilité de la carte',
  'BPI-VTC'),
 ("Un chauffeur cesse définitivement le VTC. Quelle pièce doit-il restituer à l'administration ?",
  ["Le certificat d'immatriculation de sa voiture",
   'Les factures de ses anciennes prestations',
   'La carte professionnelle encore valable',
   "L'attestation de son dernier stage suivi"],
  2,
  "La cessation définitive de l'activité de conducteur entraîne la restitution de la carte "
  'professionnelle. Elle ne se confond pas avec la conservation des pièces du véhicule ou des '
  "archives de l'entreprise.",
  'Restituer une carte après cessation',
  'BPI-VTC'),
 ('Maya habite Lyon, travaille pour une société parisienne et conduit à Grenoble. Où demander sa '
  'carte professionnelle ?',
  ["La préfecture de la Côte-d'Or",
   'La préfecture de Paris',
   "La préfecture de l'Isère",
   'La préfecture du Rhône'],
  3,
  'La demande relève de la préfecture du département du domicile du conducteur : ici le Rhône. Le '
  "siège de l'employeur, le centre d'examen et le lieu des courses ne déterminent pas cette "
  'compétence.',
  'Identifier la préfecture compétente pour la carte',
  'BPI-VTC'),
 ("Quel rendez-vous satisfait au contrôle réglementaire d'aptitude médicale à la conduite VTC ?",
  ['La visite chez un médecin agréé par la préfecture',
   'La consultation du médecin traitant habituel',
   'Le contrôle ophtalmologique des lunettes',
   "La visite de santé auprès de l'employeur"],
  0,
  "L'avis réglementaire d'aptitude est délivré à l'issue du contrôle réalisé par un médecin agréé. "
  'Les autres consultations peuvent être utiles, mais ne remplissent pas cette fonction à elles '
  'seules.',
  'Identifier le contrôle médical professionnel',
  'BPI-VTC'),
 ("Quelle pièce prouve l'habilitation d'un organisme proposant un stage obligatoire de quatorze "
  'heures ?',
  ['Son inscription au registre des entreprises',
   'Son agrément de centre de formation VTC',
   'Son contrat avec une plateforme de réservation',
   "Son attestation d'assurance professionnelle"],
  1,
  'Le centre doit être agréé pour dispenser la formation réglementaire. Son immatriculation, son '
  'assurance ou ses partenaires ne prouvent pas cet agrément.',
  'Distinguer formation réglementaire et réunion commerciale',
  'BPI-VTC'),
 ("Quelle durée et quelle périodicité s'appliquent à la formation continue obligatoire des "
  'conducteurs VTC ?',
  ['7 heures / tous les deux ans',
   '14 heures / chaque année',
   '14 heures / tous les cinq ans',
   '35 heures / tous les cinq ans'],
  2,
  'Le stage obligatoire dure quatorze heures et doit être suivi tous les cinq ans. Il ne faut pas '
  "le confondre avec d'autres formations professionnelles ou réunions annuelles.",
  'Planifier la formation continue',
  'BPI-VTC'),
 ("Quel usage doit couvrir l'assurance automobile d'une voiture effectuant des courses VTC "
  'facturées ?',
  ['Déplacements privés et trajets domicile-travail',
   'Mise en location sans conducteur',
   'Transport de marchandises pour compte propre',
   'Transport de personnes à titre onéreux'],
  3,
  "Le contrat doit couvrir l'usage réel du véhicule : transporter des voyageurs contre "
  'rémunération. Les autres usages décrivent des risques différents.',
  "Adapter l'assurance à l'usage payant",
  'BPI-VTC'),
 ("L'exploitant possède sa couverture automobile. Quelle attestation distincte doit-il détenir "
  'pour les dommages liés à ses prestations ?',
  ["L'attestation de responsabilité civile professionnelle",
   "Le certificat de garantie de valeur d'achat",
   'Le contrat de prévoyance du dirigeant',
   "L'assurance des locaux de stationnement"],
  0,
  'L3120-4 impose de pouvoir justifier la RC professionnelle. Elle est distincte des garanties du '
  'véhicule, des locaux ou de la personne du dirigeant.',
  'Distinguer RC professionnelle et garanties facultatives',
  'T3P-INSURANCE'),
 ("Une condamnation pour conduite malgré l'annulation du permis figure au bulletin n° 2. Quel "
  'contrôle professionnel est concerné ?',
  ["La vérification de l'aptitude médicale",
   "Le contrôle de l'honorabilité du conducteur",
   "La vérification des garanties de l'exploitant",
   'Le contrôle des caractéristiques du véhicule'],
  1,
  "Cette condamnation fait partie des obstacles à l'honorabilité professionnelle. Les autres "
  "contrôles sont nécessaires mais portent sur d'autres pièces et conditions.",
  "Relier une condamnation à l'honorabilité",
  'BPI-VTC'),
 ('Quelle autorisation personnelle vérifier avant de confier des courses à un nouveau salarié déjà '
  'titulaire du permis adapté ?',
  ["L'inscription REVTC de l'employeur",
   "La licence de stationnement d'un taxi",
   'Sa carte professionnelle VTC',
   "L'immatriculation de sa propre entreprise"],
  2,
  "Le salarié doit posséder sa carte professionnelle. L'inscription de l'employeur autorise "
  "l'exploitation, sans se substituer à l'autorisation personnelle du conducteur ; le salarié n'a "
  'pas à créer une entreprise.',
  "Distinguer autorisation du conducteur et de l'entreprise",
  'BPI-VTC'),
 ("Une nouvelle demande de novembre 2026 invoque seulement l'expérience française. Quel traitement "
  'appliquer, sans dossier antérieur ni qualification européenne ?',
  ['Examiner le dossier sous le régime transitoire antérieur',
   'Instruire une reconnaissance de qualification européenne',
   "Renouveler une carte obtenue après réussite à l'examen",
   'Écarter la dispense nationale fondée sur cette expérience'],
  3,
  'La réforme applicable depuis le 12 août 2026 a supprimé cette voie nationale pour les nouvelles '
  'demandes. Les autres traitements correspondent à des situations expressément absentes du '
  'dossier.',
  "Appliquer la réforme de l'accès par expérience",
  'BPI-VTC',
  'REFORM-2026'),
 ('Distance et rémunération nette sont indiquées. Quelle autre information la plateforme doit-elle '
  "fournir avant l'acceptation d'une course ?",
  ['La destination du trajet proposé',
   'Le nom complet du client réservataire',
   'Le montant brut facturé avant commission',
   'Le mode de paiement choisi par le client'],
  0,
  'L1326-2 prévoit la communication de la distance, de la destination et du prix minimal garanti '
  "après commission avant que le travailleur choisisse d'accepter ou de refuser.",
  'Identifier une information préalable obligatoire',
  'PLATFORM-2'),
 ("Quel événement est protégé contre les pénalités lors d'une proposition de course par plateforme "
  '?',
  ['Le départ sans le client après acceptation de sa réservation',
   'Le refus avant tout engagement sur la course',
   'Le non-respect de la destination convenue pendant le trajet',
   "L'absence lors du rendez-vous déjà confirmé"],
  1,
  "La plateforme ne peut pénaliser le refus d'une proposition avant acceptation. Cette protection "
  'ne couvre pas les manquements à une prestation déjà acceptée.',
  'Distinguer refus de proposition et inexécution',
  'PLATFORM-2'),
 ("Quelle clause de plateforme porte atteinte au droit d'un chauffeur de commercialiser lui-même "
  'ses services ?',
  ['Une clause précisant le calcul de la commission',
   'Une clause décrivant les justificatifs de réservation',
   'Une clause interdisant de servir ses clients directs',
   "Une clause indiquant les moyens de joindre l'assistance"],
  2,
  'La plateforme ne peut interdire au conducteur de commercialiser lui-même ses services ni de '
  'recourir à plusieurs intermédiaires. Les autres objets contractuels ne constituent pas cette '
  'restriction.',
  "Reconnaître la pluralité des canaux d'activité",
  'PLATFORM-4'),
 ("Qui choisit l'itinéraire d'une course proposée par plateforme, en tenant compte des demandes du "
  'voyageur ?',
  ['Le service chargé des tarifs de la plateforme',
   'Le centre de contrôle des réservations',
   "L'exploitant de l'application de navigation",
   'Le conducteur qui réalise la prestation'],
  3,
  'L1326-4 laisse le conducteur choisir son itinéraire en tenant compte de la demande du client. '
  "Le parcours suggéré par l'application n'est pas une instruction intangible.",
  "Distinguer suggestion et liberté d'itinéraire",
  'PLATFORM-4'),
 ("Quel motif de refus relève d'un critère discriminatoire, plutôt que d'une contrainte matérielle "
  'réelle ?',
  ["L'origine supposée du voyageur",
   "L'absence de voiture disponible au créneau",
   'Un groupe dépassant les places homologuées',
   'Un chargement excédant la capacité du coffre'],
  0,
  "Refuser l'accès au service en raison de l'origine constitue une différence de traitement fondée "
  'sur un critère protégé. Les autres motifs décrivent ici des contraintes matérielles, si elles '
  'sont réelles et appliquées sans discrimination.',
  'Distinguer critère protégé et contrainte matérielle',
  'DISCRIMINATION'),
 ("Quel refus reste discriminatoire même lorsque le chauffeur s'est trompé sur la caractéristique "
  'supposée du client ?',
  ['Refuser un groupe dépassant les places disponibles',
   "Refuser une cliente pour une religion qu'on lui attribue",
   'Refuser des valises qui ne peuvent être arrimées',
   'Refuser un créneau déjà engagé pour un autre client'],
  1,
  'La religion réelle ou supposée est un critère protégé. Une erreur sur la religion ne transforme '
  'pas ce motif en contrainte objective de capacité ou de disponibilité.',
  'Reconnaître un critère supposé',
  'DISCRIMINATION'),
 ('Après un refus discriminatoire, quel organisme peut orienter une cliente sur ses droits, hors '
  'urgence ?',
  ["Le médiateur de l'assurance automobile",
   "La chambre de métiers et de l'artisanat",
   'Le Défenseur des droits',
   "L'autorité de régulation des plateformes"],
  2,
  'Le Défenseur des droits lutte contre les discriminations et accompagne les personnes '
  "concernées. Le 3928 permet de le contacter ; ce dispositif d'orientation n'est pas un service "
  'de secours.',
  'Identifier le recours spécialisé',
  'DISCRIMINATION'),
 ("Quelle pièce peut établir le droit d'accès d'une cliente accompagnée de son chien guide ?",
  ['La confirmation de réservation du transfert',
   'Le reçu du paiement anticipé de la course',
   'Son abonnement commercial auprès du transporteur',
   'Sa carte mobilité inclusion portant la mention invalidité'],
  3,
  'La CMI invalidité, dans la situation décrite avec un chien guide, relève des conditions légales '
  "du droit d'accès. La réservation, le paiement ou la fidélité commerciale ne remplacent pas "
  'cette qualité.',
  'Distinguer chien guide et animal de compagnie',
  'GUIDE-DOG'),
 ('Course : 38 € ; détour convenu : 6 € ; chien guide admis légalement : supplément de 8 €. Quel '
  'total est permis ?',
  ['44 €', '38 €', '46 €', '52 €'],
  0,
  "Le supplément de 8 € lié au chien guide est interdit. Le détour distinct et convenu n'est pas "
  'concerné par cette interdiction : 38 + 6 = 44 €.',
  "Appliquer l'absence de surfacturation du chien guide",
  'GUIDE-DOG'),
 ('Camille donne son numéro, sans accepter de geste intime. À quoi se limite son accord ?',
  ['Au rapprochement intime envisagé par Alex',
   'À la transmission des coordonnées de Camille',
   'À la poursuite physique de la rencontre',
   'À la répétition ultérieure du geste envisagé'],
  1,
  "Le consentement est spécifique : accepter de transmettre ses coordonnées n'établit pas un "
  "accord pour un acte sexuel. Il faut apprécier l'accord relatif à cet acte lui-même.",
  'Appliquer le caractère spécifique du consentement',
  'CONSENT'),
 ('Après un accord initial, une personne dit "je ne veux plus continuer". Quel événement retire '
  'son consentement ?',
  ['La décision initiale de se rencontrer',
   "L'échange préalable de coordonnées",
   "L'expression de son souhait d'arrêter",
   "L'arrivée à l'endroit convenu ensemble"],
  2,
  "Le consentement est révocable. La demande d'arrêter retire l'accord pour la poursuite, même si "
  'la rencontre et son début avaient été acceptés.',
  'Reconnaître la révocabilité du consentement',
  'CONSENT'),
 ('Le client confirme sa destination, puis reste figé face à un geste intime. Quel accord manque ?',
  ["L'accord sur le lieu de dépose prévu",
   "L'acceptation du déplacement professionnel",
   'La compréhension de la destination annoncée',
   "Un accord libre et spécifique à l'acte sexuel"],
  3,
  "L'accord relatif au transport n'est pas un consentement à un acte sexuel. L'immobilité ou le "
  'silence ne permettent pas de déduire cet accord.',
  'Ne pas déduire le consentement du silence',
  'CONSENT'),
 ('Un client impose des remarques sexuelles humiliantes lors de plusieurs trajets. Quel fait '
  'caractérise la forme répétée du harcèlement ?',
  ['Le retour des propos envers la même personne',
   'Une pression isolée pour obtenir un acte sexuel',
   'Un propos unique tenu par un groupe concerté',
   'Un contact sexuel imposé pendant le trajet'],
  0,
  'Le récit décrit une répétition de propos à connotation sexuelle portant atteinte à la dignité. '
  'Les autres circonstances correspondent à des mécanismes différents et ne sont pas établies ici.',
  'Reconnaître le harcèlement par propos répétés',
  'HARASSMENT'),
 ('Chaque passager fait une remarque sexuelle humiliante unique. Quelle pièce peut établir un '
  'harcèlement concerté envers la conductrice ?',
  ['Les relevés montrant des trajets différents',
   'Les messages établissant leur préparation commune',
   'Le reçu identifiant le payeur de la course',
   'La carte indiquant le domicile de la conductrice'],
  1,
  'La concertation entre plusieurs auteurs envers une même victime permet de retenir cette forme '
  'de harcèlement, même sans répétition individuelle. Les messages de préparation établissent ici '
  'cette concertation.',
  'Reconnaître le harcèlement concerté',
  'HARASSMENT'),
 ('Un responsable menace une conductrice de supprimer ses missions si elle refuse un acte sexuel. '
  'Quelle qualification correspond ?',
  ['Des propos sexuels renouvelés par un même auteur',
   'Des remarques concertées entre plusieurs auteurs',
   'Une pression grave visant à obtenir un acte sexuel',
   'Un acte sexuel imposé par un contact déjà réalisé'],
  2,
  'Une pression grave, même unique, visant réellement ou apparemment un acte sexuel est assimilée '
  'au harcèlement. Le récit ne décrit ni répétition, ni groupe concerté, ni contact réalisé.',
  'Reconnaître une pression grave non répétée',
  'HARASSMENT'),
 ('Un propos sexiste dégradant unique est imposé, sans geste ni pression sexuelle. Quelle '
  'infraction correspond ?',
  ['Une agression sexuelle sans pénétration',
   'Un harcèlement sexuel par propos répétés',
   'Un harcèlement par pression grave à but sexuel',
   'Un outrage sexiste ou sexuel'],
  3,
  "L'outrage sexiste ou sexuel peut être constitué par un propos ou comportement unique imposé et "
  "dégradant ou intimidant. Il se distingue ici du harcèlement par répétition et de l'acte sexuel "
  'non consenti.',
  'Distinguer outrage et harcèlement répété',
  'OUTRAGE'),
 ("Quelle pièce étaye la circonstance aggravante liée au lieu d'un outrage sexiste commis pendant "
  'une course ?',
  ['La trace situant les faits à bord du VTC',
   'Le reçu indiquant le moyen de paiement',
   "La réservation identifiant le donneur d'ordre",
   'Le tarif indiquant une prestation nocturne'],
  0,
  "Le fait que l'outrage ait été commis à bord d'un VTC constitue la circonstance de lieu visée. "
  "Le règlement, le réservataire et le tarif nocturne n'établissent pas cette circonstance à eux "
  'seuls.',
  'Identifier la circonstance de transport VTC',
  'OUTRAGE'),
 ("Un signalement est accompagné du reçu et de l'identité de l'exploitant. Que faut-il ajouter "
  'pour décrire les faits sexistes ?',
  ['Le montant réglé et la référence du paiement',
   "Les propos entendus, avec l'heure et le lieu",
   "Le numéro REVTC et l'adresse du siège",
   'La distance parcourue et le tarif kilométrique'],
  1,
  'Les mots entendus, le moment et le lieu décrivent les faits signalés. Les données de '
  "facturation et d'exploitation peuvent compléter le dossier, mais ne remplacent pas ce récit.",
  'Préserver des éléments factuels datés',
  'OUTRAGE'),
 ("Un passager menace d'agresser quelqu'un immédiatement. Quel contact privilégier pour obtenir "
  'une intervention policière ?',
  ["Le 3928 pour l'orientation sur les droits",
   "Le 3919 pour l'écoute et l'information",
   'Police Secours au 17',
   'Le service de médiation de la plateforme'],
  2,
  "Le 17 permet de demander une intervention urgente des forces de l'ordre. Les voies commerciales "
  'ou administratives ne remplissent pas cette fonction immédiate.',
  'Distinguer urgence et voies administratives',
  'OUTRAGE'),
 ("Une victime souhaite signaler des violences sexistes par écrit aux forces de l'ordre, sans "
  'urgence. Quel canal utiliser ?',
  ['Le numéro 17 pour une intervention urgente',
   "La ligne d'écoute Violences Femmes Info (3919)",
   "Le Défenseur des droits pour l'orientation juridique",
   'Le tchat officiel de signalement'],
  3,
  'Le tchat officiel permet cet échange écrit non urgent avec un policier ou un gendarme. Les '
  'autres canaux ont des missions ou modalités différentes ; le 17 vise une intervention urgente.',
  'Identifier le signalement officiel écrit',
  'OUTRAGE')]
