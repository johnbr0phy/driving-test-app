CAT = "itb2Articoli"; SEG = "ART"
# Comprensione della lettura, prova 1: otto articoli (220-320 parole), tre domande ciascuno.
# 24 items, 6 per test: articles 1-2 test 1, 3-4 test 2, 5-6 test 3, 7-8 test 4.
# Every article, place, organisation and person is original and fictional.
# T = [(intro, title, text with paragraphs separated by \n\n, [(question, key, [3 wrong], explanation) x3])]
T = [
("Leggi l'articolo", "Università sotto casa: una scelta obbligata?",
 "Negli ultimi cinque anni il numero di studenti che si iscrivono all'università lontano da casa è diminuito in quasi tutte le regioni. Un'indagine dell'Osservatorio sul diritto allo studio di Valdora, condotta su quattromila diplomati, prova a spiegarne le ragioni. Contrariamente a quanto si potrebbe pensare, la qualità dei corsi c'entra poco: la maggior parte degli intervistati considera gli atenei delle grandi città migliori di quelli vicini a casa.\n\n"
 "Il motivo principale è un altro: il costo degli affitti nelle città universitarie, cresciuto molto più dei redditi delle famiglie. Una stanza singola a Valdora costa oggi quasi il doppio di dieci anni fa, mentre le borse di studio sono rimaste ferme. Così molti ragazzi rinunciano e scelgono l'ateneo più vicino, anche quando l'offerta formativa corrisponde poco ai loro interessi. «Mi sarebbe piaciuto studiare restauro», racconta Giulia, diciannove anni, «ma senza un posto letto pagato dalla regione non era possibile. Mi sono iscritta a economia, qui in città.»\n\n"
 "Gli autori dell'indagine non nascondono la loro preoccupazione. Se la scelta della facoltà dipende dal portafoglio dei genitori più che dal talento, sostengono, l'università smette di essere uno strumento di mobilità sociale e finisce per confermare le disuguaglianze di partenza. Per questo chiedono alla regione di raddoppiare i posti negli studentati pubblici e di legare gli aiuti al costo reale della vita in ciascuna città.\n\n"
 "Non tutti, però, condividono la loro ricetta. Secondo alcuni rettori sarebbe più utile portare i corsi più richiesti anche nelle sedi minori, invece di spendere per spostare gli studenti da una città all'altra.",
 [("Secondo l'indagine, perché molti studenti restano a studiare vicino a casa?",
   "Perché gli affitti costano troppo", ["Perché i corsi vicini sono migliori", "Perché preferiscono vivere in famiglia", "Perché temono di non trovare lavoro"],
   "L'indagine indica come motivo principale il costo degli affitti, cresciuto più dei redditi. Sulla qualità dei corsi il testo dice il contrario: gli atenei delle grandi città sono considerati migliori."),
  ("Che cosa si capisce dalla storia di Giulia?",
   "Ha scelto un corso diverso dal suo ideale", ["Ha cambiato facoltà dopo il primo semestre", "Studia restauro in una sede minore", "Lavora per pagarsi l'affitto in città"],
   "Giulia voleva studiare restauro ma si è iscritta a economia nella sua città. Non studia restauro altrove: senza un posto letto ha dovuto rinunciarvi."),
  ("Che cosa temono gli autori dell'indagine?",
   "Che l'università confermi le disuguaglianze", ["Che le sedi minori perdano i corsi migliori", "Che molti studenti lascino gli studi a metà", "Che i rettori blocchino i nuovi studentati"],
   "Gli autori temono che l'università, se dipende dal portafoglio dei genitori, finisca per confermare le disuguaglianze di partenza. Le sedi minori compaiono solo nella proposta dei rettori, non come timore."),
 ]),
("Leggi l'articolo", "Lavoro da casa e carriera: il prezzo dell'invisibilità",
 "Lavorare da casa due o tre giorni alla settimana è ormai normale per molti impiegati, e la maggior parte di loro dichiara di essere più soddisfatta di prima: meno ore perse nel traffico, più tempo per la famiglia. Una ricerca dell'Istituto di studi sul lavoro di Arelia, condotta su trecento aziende, mette però in luce un aspetto di cui si parla poco.\n\n"
 "Chi lavora sempre a distanza, infatti, riceve meno promozioni dei colleghi che vanno in ufficio, anche quando i risultati sono identici. I ricercatori non parlano di discriminazione voluta. Secondo loro i responsabili tendono semplicemente a premiare le persone che vedono più spesso, senza rendersene conto: chi è presente alle riunioni, chi si ferma a parlare in corridoio, chi si fa notare quando c'è un problema da risolvere. Il fenomeno è più forte nelle aziende piccole, dove le valutazioni dipendono quasi solo dal giudizio del capo.\n\n"
 "Per correggere questa distorsione gli autori suggeriscono di valutare il lavoro con criteri chiari e misurabili, stabiliti in anticipo, e non sulla base della presenza. Alcune imprese hanno già scelto anche un'altra strada. Martina Leoni, che dirige il personale di un'azienda di software, racconta di aver fissato due giornate al mese in cui tutti, capi compresi, lavorano in sede. «Non vogliamo riportare le persone in ufficio», spiega, «ma evitare che chi resta a casa sparisca dal nostro radar.»\n\n"
 "La ricerca non mette in discussione il lavoro a distanza. Ricorda soltanto che la flessibilità, senza regole, può avere un costo nascosto.",
 [("Qual è il risultato principale della ricerca?",
   "Chi lavora da casa fa meno carriera", ["Chi lavora da casa produce di meno", "Chi va in ufficio è più soddisfatto", "Chi lavora da casa cambia spesso azienda"],
   "La ricerca mostra che chi lavora sempre a distanza riceve meno promozioni. Non produce di meno: il testo precisa che i risultati sono identici."),
  ("Che cosa vuol dire che i responsabili premiano chi vedono senza rendersene conto?",
   "Che non lo fanno di proposito", ["Che nascondono le loro decisioni", "Che non conoscono i risultati", "Che lo fanno solo nelle riunioni"],
   "I ricercatori escludono una discriminazione voluta: i capi favoriscono chi vedono spesso senza saperlo, quindi non di proposito. Il testo non dice che ignorino i risultati."),
  ("Che cosa ha deciso l'azienda di Martina Leoni?",
   "Alcuni giorni in sede per tutti", ["Il ritorno in ufficio a tempo pieno", "Promozioni legate alla presenza", "Riunioni solo in videochiamata"],
   "Leoni ha fissato due giornate al mese in cui tutti, capi compresi, lavorano in sede. Esclude invece di voler riportare le persone in ufficio a tempo pieno."),
 ]),
("Leggi l'articolo", "Il Sarvo torna a vivere, ma la strada è lunga",
 "Per decenni il fiume Sarvo è stato considerato uno dei più inquinati della regione. Le fabbriche della valle vi scaricavano acque di lavorazione senza alcun trattamento, e d'estate l'odore arrivava fino alle case. Oggi, a dieci anni dalla costruzione di un nuovo depuratore e dall'avvio di controlli regolari sugli scarichi, il quadro è molto diverso: nelle sue acque sono tornati pesci e aironi che non si vedevano da una generazione.\n\n"
 "I pescatori della zona festeggiano, e un gruppo di volontari ha cominciato a raccogliere campioni d'acqua ogni mese per segnalare eventuali peggioramenti. Gli esperti dell'Agenzia regionale per l'ambiente riconoscono il miglioramento, ma invitano alla prudenza. I sedimenti sul fondo, spiegano, contengono ancora metalli pesanti accumulati in passato, che una piena potrebbe rimettere in circolo. Per questo la balneazione resta vietata e il consumo del pesce è sconsigliato. Secondo le loro stime ci vorranno almeno altri dieci anni perché il fiume possa dirsi davvero pulito.\n\n"
 "A preoccupare il sindaco di Sarvola, il comune più grande della valle, è invece una questione economica. Il depuratore è stato costruito in gran parte con fondi europei che si esauriranno il prossimo anno, e la manutenzione è costosa. «Abbiamo fatto la parte più difficile», dice, «ma se i comuni dovranno pagare tutto da soli, rischiamo di non riuscire a mantenere ciò che abbiamo ottenuto.»\n\n"
 "La regione ha promesso una risposta entro l'estate.",
 [("Qual è l'atteggiamento degli esperti dell'Agenzia?",
   "Soddisfatti, ma prudenti", ["Entusiasti e senza alcun dubbio", "Delusi dai risultati ottenuti", "Divisi sulle cause del cambiamento"],
   "Gli esperti riconoscono il miglioramento ma invitano alla prudenza per i sedimenti inquinati. Non sono entusiasti senza riserve: sono i pescatori a festeggiare."),
  ("Perché è ancora vietato fare il bagno nel fiume?",
   "Il fondo contiene sostanze nocive", ["Gli scarichi non sono controllati", "Il depuratore non funziona ancora", "La corrente è troppo forte d'estate"],
   "I sedimenti sul fondo contengono ancora metalli pesanti. Gli scarichi invece sono controllati regolarmente e il depuratore funziona da dieci anni."),
  ("Che cosa preoccupa il sindaco di Sarvola?",
   "I costi futuri della manutenzione", ["Il ritorno delle fabbriche inquinanti", "Le proteste dei pescatori della valle", "Il ritardo nella risposta della regione"],
   "Il sindaco teme che, finiti i fondi europei, i comuni non riescano a pagare da soli la manutenzione. La risposta della regione è solo attesa, non è la sua preoccupazione."),
 ]),
("Leggi l'articolo", "Il teatro salvato dagli spettatori",
 "Il teatro Verdi di Montecalvo, inaugurato alla fine dell'Ottocento, rischiava di chiudere dopo il taglio dei contributi regionali. La direttrice Elena Sarti, invece di limitarsi a protestare, ha scelto una strada insolita: ha chiesto aiuto direttamente al pubblico con una raccolta di fondi online.\n\n"
 "In tre mesi hanno risposto più di duemila persone. Pochissime hanno donato cifre importanti; la maggior parte ha versato somme piccole, spesso pari al prezzo di un biglietto. Molti hanno accompagnato il versamento con un messaggio: c'è chi ricorda il primo spettacolo visto da bambino, chi il giorno in cui ha conosciuto la moglie in platea. Il denaro raccolto non basta a coprire tutte le spese, ammette la direttrice, ma ha convinto due fondazioni locali a sostenere la nuova stagione. «La vera vittoria», dice, «è aver dimostrato che questo teatro conta per la comunità. Prima nessuno ci credeva.»\n\n"
 "Anche il cartellone è cambiato: accanto ai classici ci saranno spettacoli di giovani compagnie, e i biglietti per gli under venticinque costeranno la metà.\n\n"
 "Non tutti, però, vedono la vicenda come un modello. Il critico Bruno Fois apprezza l'entusiasmo ma mette in guardia. «Non possiamo chiedere ogni anno agli spettatori di salvare un teatro», scrive. «La cultura è un servizio pubblico, e deve essere finanziata con continuità, come la scuola o gli ospedali. Le donazioni sono un bel gesto, non una politica culturale.»",
 [("Perché la raccolta è stata importante secondo la direttrice?",
   "Ha mostrato il legame con il pubblico", ["Ha coperto tutte le spese della stagione", "Ha sostituito i contributi regionali", "Ha portato artisti più famosi in città"],
   "Per Sarti la vera vittoria è aver dimostrato che il teatro conta per la comunità. Non ha coperto tutte le spese: la direttrice ammette che il denaro non basta."),
  ("In che modo ha contribuito la maggior parte dei donatori?",
   "Con cifre modeste", ["Con abbonamenti annuali", "Con grandi somme private", "Con lavoro volontario"],
   "Il testo dice che la maggior parte ha versato somme piccole, spesso pari a un biglietto. Le cifre importanti sono state pochissime."),
  ("Qual è l'opinione del critico Bruno Fois?",
   "Servono finanziamenti pubblici stabili", ["Le donazioni vanno rese obbligatorie", "I biglietti dovrebbero costare di più", "I teatri piccoli vanno accorpati tra loro"],
   "Fois scrive che la cultura è un servizio pubblico e va finanziata con continuità. Non chiede donazioni obbligatorie: dice anzi che non si può chiederle ogni anno."),
 ]),
("Leggi l'articolo", "In corsia l'interprete arriva sullo schermo",
 "Negli ospedali della regione arriveranno entro l'anno i mediatori linguistici a distanza: uno schermo collegato in video con un interprete professionista, disponibile a ogni ora del giorno e della notte, in oltre venti lingue. Finora i pazienti stranieri dovevano spesso affidarsi a un parente, a volte a un figlio minorenne, per spiegare i sintomi o capire una terapia. Una soluzione di emergenza che poteva causare errori di traduzione e costringere il paziente a parlare di questioni intime davanti ai familiari.\n\n"
 "Il servizio è già stato sperimentato per un anno all'ospedale di Selva. I risultati, secondo la direzione sanitaria, sono incoraggianti: le visite con l'interprete durano in media sette minuti in più, ma i pazienti tornano molto meno spesso al pronto soccorso per lo stesso problema, segno che hanno capito meglio le indicazioni ricevute. I medici sottolineano soprattutto due vantaggi: la precisione della comunicazione e il rispetto della riservatezza.\n\n"
 "Gli interpreti in presenza non spariranno. Resteranno per i casi più delicati, come la comunicazione di una diagnosi grave o i colloqui nei reparti di psichiatria, dove anche il linguaggio del corpo ha un peso.\n\n"
 "Più cauta l'associazione dei mediatori culturali, che pure accoglie con favore la novità. «Uno schermo traduce le parole», osserva la presidente, «ma non sempre spiega perché una persona rifiuta un esame o non segue una dieta. Capirsi davvero richiede anche di conoscere le abitudini e le credenze di chi si ha davanti.»",
 [("Perché affidarsi ai parenti era un problema?",
   "Rischiava errori e imbarazzo", ["Allungava troppo le visite", "Costava molto all'ospedale", "Era vietato dalla legge"],
   "Il testo dice che poteva causare errori di traduzione e costringere a parlare di questioni intime davanti ai familiari. Le visite più lunghe riguardano invece il nuovo servizio."),
  ("Che cosa suggeriscono i dati della sperimentazione?",
   "Visite più lunghe, ma più utili", ["Visite più brevi e più economiche", "Più ritorni al pronto soccorso", "Meno pazienti stranieri in reparto"],
   "Le visite durano sette minuti in più, ma i pazienti tornano meno spesso al pronto soccorso perché hanno capito meglio. Non sono più brevi: sono più lunghe."),
  ("Che cosa sostiene la presidente dei mediatori culturali?",
   "Tradurre non sempre basta a capirsi", ["Gli schermi vanno tolti dai reparti", "I medici dovrebbero studiare le lingue", "Gli interpreti a distanza sbagliano spesso"],
   "Secondo la presidente lo schermo traduce le parole ma non spiega abitudini e credenze. L'associazione però accoglie con favore la novità, quindi non chiede di toglierla."),
 ]),
("Leggi l'articolo", "Belvedere, il centro storico senza abitanti",
 "Il turismo nelle città d'arte è tornato ai livelli di prima, ma non tutti ne sono contenti. Nel centro storico di Belvedere un appartamento su tre è oggi affittato ai turisti per pochi giorni alla volta. Molte famiglie, che non riuscivano più a pagare affitti in continuo aumento, si sono trasferite in periferia. Con loro sono scomparsi anche i negozi di quartiere: la merceria, il calzolaio, la ferramenta hanno lasciato il posto a bar, gelaterie e negozi di souvenir. Il mese scorso ha chiuso anche l'ultimo forno, aperto da quattro generazioni.\n\n"
 "Il Comune sta valutando di fissare un limite al numero di affitti brevi nelle vie del centro. Le associazioni di categoria si oppongono con decisione: il turismo, sostengono, porta lavoro e ricchezza a tutta la città, non solo ai proprietari, e un limite rischierebbe di spingere i visitatori verso altre destinazioni.\n\n"
 "Il comitato dei residenti respinge l'accusa di essere ostile ai visitatori. «Non siamo contro i turisti», dice la portavoce, «ma un centro senza abitanti diventa un museo a cielo aperto. Bello da fotografare, ma senza nessuno che ci viva.» Il comitato chiede anche di riservare alcuni locali comunali a botteghe artigiane con affitti agevolati.\n\n"
 "Tra le due posizioni si fa strada una terza proposta, sostenuta da alcuni consiglieri: una tassa di soggiorno più alta, i cui proventi servano a ristrutturare case da affittare ai residenti a prezzi controllati.",
 [("Perché le associazioni di categoria sono contrarie al limite?",
   "Il turismo dà lavoro alla città", ["Le famiglie sono già andate via", "Il limite non è previsto dalla legge", "Gli affitti brevi sono già in calo"],
   "Le associazioni sostengono che il turismo porta lavoro e ricchezza a tutta la città. Che le famiglie siano andate via è un fatto del testo, ma non è il loro argomento."),
  ("Che cosa intende la portavoce con museo a cielo aperto?",
   "Un luogo bello ma senza vita reale", ["Un luogo pieno di opere d'arte antica", "Un luogo chiuso al traffico", "Un luogo con ingresso a pagamento"],
   "La portavoce spiega subito dopo: bello da fotografare, ma senza nessuno che ci viva. Non parla di opere d'arte in senso letterale."),
  ("Qual è l'argomento principale dell'articolo?",
   "Gli effetti del turismo sui residenti", ["La storia del centro di Belvedere", "Le nuove regole per gli alberghi del centro", "Il calo dei visitatori in città"],
   "L'articolo racconta come gli affitti brevi abbiano allontanato famiglie e negozi e le proposte per rimediare. I visitatori non calano: il turismo è tornato ai livelli di prima."),
 ]),
("Leggi l'articolo", "L'intelligenza artificiale entra in classe, sotto la lente",
 "Quando si parla di intelligenza artificiale a scuola, il dibattito si divide quasi sempre in due campi: da una parte chi vorrebbe vietarla, convinto che gli studenti la useranno solo per copiare, dall'altra chi la considera la soluzione a ogni problema dell'insegnamento. Paola Neri, docente di storia in un liceo di Valdora, ha scelto una terza via: trasformarla in oggetto di studio.\n\n"
 "Nelle sue ore i ragazzi chiedono a un programma di scrivere un breve testo su un tema del corso, per esempio le cause di una rivoluzione, e poi lo confrontano con i documenti dell'epoca e con il manuale. Il risultato sorprende quasi sempre: accanto a passaggi corretti, emergono date sbagliate, citazioni attribuite a persone che non le hanno mai pronunciate, spiegazioni troppo semplici di fenomeni complessi. «Così imparano a non fidarsi ciecamente», spiega la professoressa, «che è forse la competenza più utile di tutte, e non solo con le macchine.»\n\n"
 "Non tutti i colleghi sono convinti. Alcuni le rimproverano di sottrarre tempo al programma, già lungo, per un'attività che a loro sembra una moda. Neri risponde che i ragazzi, alla fine, conoscono gli argomenti meglio di prima, perché per trovare un errore bisogna sapere qual è la risposta giusta.\n\n"
 "È proprio questo, ammette, il limite del metodo. Con le classi più giovani funziona meno: chi non ha ancora le conoscenze necessarie spesso non riconosce l'errore, e finisce per credere al testo della macchina più che al libro.",
 [("Qual è la posizione della professoressa Neri?",
   "Usarla per allenare lo spirito critico", ["Vietarla durante le verifiche in classe", "Adottarla per correggere i compiti", "Lasciare la scelta a ogni studente"],
   "Neri non vuole né vietarla né esaltarla: la studia con i ragazzi perché imparino a non fidarsi ciecamente. Il divieto è la posizione di uno dei due campi che lei supera."),
  ("Che cosa scoprono di solito gli studenti nei testi del programma?",
   "Errori e informazioni inventate", ["Fonti più recenti del manuale", "Idee più originali delle loro", "Spiegazioni più chiare del libro"],
   "Il testo cita date sbagliate e citazioni inventate. Le spiegazioni non sono più chiare ma troppo semplici rispetto a fenomeni complessi."),
  ("Perché il metodo funziona meno con gli studenti più giovani?",
   "Sanno troppo poco per notare gli errori", ["Usano il computer meno dei grandi", "Si stancano presto delle attività lunghe", "Si fidano poco delle nuove tecnologie"],
   "Neri spiega che chi non ha le conoscenze necessarie non riconosce l'errore. Non è vero che si fidino poco della tecnologia: finiscono anzi per credere alla macchina."),
 ]),
("Leggi l'articolo", "Due generazioni sotto lo stesso tetto",
 "Sempre più anziani vivono soli, spesso in case diventate troppo grandi dopo la partenza dei figli, mentre molti studenti fuori sede non trovano una stanza a un prezzo accessibile. A Torralba l'associazione Due Generazioni ha deciso di far incontrare questi due bisogni. Lo studente paga un affitto simbolico e in cambio passa qualche serata in compagnia della persona anziana, la accompagna a fare la spesa o la aiuta a usare il computer.\n\n"
 "Gli organizzatori insistono su un punto: non si tratta di assistenza sanitaria. Lo studente non sostituisce un infermiere né una badante, e se la persona anziana ha bisogno di cure, deve rivolgersi ai servizi competenti. «Proponiamo una convivenza, non un lavoro», spiega la coordinatrice. Prima di ogni abbinamento l'associazione organizza diversi colloqui, per capire abitudini, orari e aspettative di entrambi.\n\n"
 "In due anni sono nate oltre ottanta coppie. Non tutte hanno funzionato: circa un terzo si è sciolta entro il primo anno, di solito per orari troppo diversi o per piccoli conflitti domestici. La coordinatrice non lo considera un fallimento. «Anche tra coinquilini della stessa età succede», osserva, «e nessuno, per questo, smette di dividere un appartamento.»\n\n"
 "Il progetto ha attirato l'attenzione del Comune. I servizi sociali hanno notato che gli anziani coinvolti si rivolgono a loro molto meno spesso, perché hanno qualcuno con cui parlare e a cui chiedere un piccolo aiuto. Per questo l'assessore vorrebbe estendere l'esperienza ad altri quartieri già dal prossimo anno.",
 [("Che cosa precisano gli organizzatori sul ruolo dello studente?",
   "Non deve fornire cure mediche", ["Non deve pagare alcun affitto", "Non deve aiutare con la spesa", "Non deve dormire in quella casa"],
   "Gli organizzatori dicono che non si tratta di assistenza sanitaria: lo studente non sostituisce un infermiere. L'affitto invece esiste, anche se simbolico."),
  ("Come giudica la coordinatrice le convivenze finite presto?",
   "Un esito normale e prevedibile", ["Un fallimento dell'associazione", "Una colpa degli studenti", "Un motivo per cambiare regole"],
   "La coordinatrice non lo considera un fallimento e lo paragona a ciò che succede tra coinquilini della stessa età. Non attribuisce colpe agli studenti."),
  ("Perché il Comune vorrebbe estendere il progetto?",
   "Riduce le richieste ai servizi sociali", ["Fa salire gli affitti dei quartieri", "Porta nuovi iscritti all'università locale", "Crea posti di lavoro per i giovani"],
   "I servizi sociali hanno notato che gli anziani coinvolti si rivolgono a loro molto meno spesso. Il testo non parla di nuovi iscritti né di posti di lavoro."),
 ]),
]
