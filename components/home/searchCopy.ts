// The words of the search homepage (components/home/SearchHome.tsx) in every
// homepage language (lib/homeLanguages.ts). Strings it shares with the rest of
// the homepage (the placeholder, "questions answered this week") come from
// homeCopy. Everything but English is machine-translated.

import type { HomeLanguage } from "@/lib/homeLanguages";

export interface SearchCopy {
  tagline: string;
  /** Read after the wordmark on the US page: ": free practice tests for N exams". */
  srExams: (n: number) => string;
  notYet: (q: string) => string;
  closest: string;
  voice: string;
  listening: string;
  worldwide: string;
  pickUp: string;
  trending: string;
  mastered: (n: number) => string;
  questionsMastered: (n: number) => string;
  testsTaken: (n: number) => string;
  started: string;
  missing: {
    title: string;
    body: string;
    email: string;
    send: string;
    sending: string;
    thanks: string;
    willEmail: (email: string, q: string) => string;
    error: string;
    cantWait: string;
    makeQuiz: string;
  };
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const en: SearchCopy = {
  tagline: "Any test, anywhere. Start free.",
  srExams: (n) => `: free practice tests for ${n} exams`,
  notYet: (q) => `We don’t have “${q}” yet. Closest matches:`,
  closest: "Closest matches:",
  voice: "Search by voice",
  listening: "Listening",
  worldwide: "Worldwide",
  pickUp: "Pick up where you left off",
  trending: "Trending searches",
  mastered: (n) => `${n} mastered`,
  questionsMastered: (n) => `${plural(n, "question", "questions")} mastered`,
  testsTaken: (n) => `${plural(n, "test", "tests")} taken`,
  started: "Started",
  missing: {
    title: "Are we missing your test?",
    body: "Let us know and we’ll build it for you. Add your email address and we’ll let you know when it ships.",
    email: "Email address",
    send: "Let me know",
    sending: "Sending...",
    thanks: "Thanks! We’re on it.",
    willEmail: (email, q) => `We’ll email ${email} when “${q}” ships.`,
    error: "That didn’t go through. Please try again.",
    cantWait: "Can’t wait?",
    makeQuiz: "Make your own quiz now",
  },
};

const de: SearchCopy = {
  tagline: "Jede Prüfung, überall. Kostenlos starten.",
  srExams: (n) => `: kostenlose Übungstests für ${n} Prüfungen`,
  notYet: (q) => `„${q}“ haben wir noch nicht. Ähnliche Treffer:`,
  closest: "Ähnliche Treffer:",
  voice: "Per Sprache suchen",
  listening: "Hört zu",
  worldwide: "Weltweit",
  pickUp: "Weitermachen, wo du aufgehört hast",
  trending: "Beliebte Suchen",
  mastered: (n) => `${n} gelernt`,
  questionsMastered: (n) => `${plural(n, "Frage", "Fragen")} gelernt`,
  testsTaken: (n) => `${plural(n, "Test", "Tests")} gemacht`,
  started: "Begonnen",
  missing: {
    title: "Fehlt deine Prüfung?",
    body: "Sag uns Bescheid, dann bauen wir sie. Gib deine E-Mail-Adresse an und wir melden uns, sobald sie fertig ist.",
    email: "E-Mail-Adresse",
    send: "Benachrichtigen",
    sending: "Wird gesendet...",
    thanks: "Danke! Wir kümmern uns darum.",
    willEmail: (email, q) => `Wir schreiben an ${email}, sobald „${q}“ fertig ist.`,
    error: "Das hat nicht geklappt. Bitte versuch es noch einmal.",
    cantWait: "Keine Lust zu warten?",
    makeQuiz: "Erstelle jetzt dein eigenes Quiz",
  },
};

const es: SearchCopy = {
  tagline: "Cualquier examen, en cualquier lugar. Empieza gratis.",
  srExams: (n) => `: tests de práctica gratis para ${n} exámenes`,
  notYet: (q) => `Aún no tenemos «${q}». Lo más parecido:`,
  closest: "Lo más parecido:",
  voice: "Buscar por voz",
  listening: "Escuchando",
  worldwide: "Internacional",
  pickUp: "Sigue donde lo dejaste",
  trending: "Búsquedas populares",
  mastered: (n) => `${n} dominadas`,
  questionsMastered: (n) => `${plural(n, "pregunta dominada", "preguntas dominadas")}`,
  testsTaken: (n) => `${plural(n, "test hecho", "tests hechos")}`,
  started: "Empezado",
  missing: {
    title: "¿No encuentras tu examen?",
    body: "Dínoslo y lo prepararemos. Deja tu correo y te avisaremos cuando esté listo.",
    email: "Correo electrónico",
    send: "Avísame",
    sending: "Enviando...",
    thanks: "¡Gracias! Nos ponemos con ello.",
    willEmail: (email, q) => `Te escribiremos a ${email} cuando «${q}» esté listo.`,
    error: "No se ha podido enviar. Inténtalo de nuevo.",
    cantWait: "¿No puedes esperar?",
    makeQuiz: "Crea tu propio cuestionario ahora",
  },
};

const pt: SearchCopy = {
  tagline: "Qualquer exame, em qualquer lugar. Comece grátis.",
  srExams: (n) => `: testes de treino grátis para ${n} exames`,
  notYet: (q) => `Ainda não temos «${q}». O mais parecido:`,
  closest: "O mais parecido:",
  voice: "Pesquisar por voz",
  listening: "A ouvir",
  worldwide: "Internacional",
  pickUp: "Continue onde parou",
  trending: "Pesquisas populares",
  mastered: (n) => `${n} dominadas`,
  questionsMastered: (n) => `${plural(n, "pergunta dominada", "perguntas dominadas")}`,
  testsTaken: (n) => `${plural(n, "teste feito", "testes feitos")}`,
  started: "Começado",
  missing: {
    title: "Não encontra o seu exame?",
    body: "Diga-nos e nós preparamo-lo. Deixe o seu e-mail e avisamos quando estiver pronto.",
    email: "Endereço de e-mail",
    send: "Avisem-me",
    sending: "A enviar...",
    thanks: "Obrigado! Vamos tratar disso.",
    willEmail: (email, q) => `Vamos escrever para ${email} quando «${q}» estiver pronto.`,
    error: "Não foi possível enviar. Tente novamente.",
    cantWait: "Não pode esperar?",
    makeQuiz: "Crie já o seu próprio quiz",
  },
};

const fr: SearchCopy = {
  tagline: "Tous les examens, partout. Commence gratuitement.",
  srExams: (n) => ` : tests d’entraînement gratuits pour ${n} examens`,
  notYet: (q) => `Nous n’avons pas encore « ${q} ». Résultats les plus proches :`,
  closest: "Résultats les plus proches :",
  voice: "Recherche vocale",
  listening: "À l’écoute",
  worldwide: "International",
  pickUp: "Reprends là où tu t’es arrêté",
  trending: "Recherches populaires",
  mastered: (n) => `${n} maîtrisées`,
  questionsMastered: (n) => `${plural(n, "question maîtrisée", "questions maîtrisées")}`,
  testsTaken: (n) => `${plural(n, "test passé", "tests passés")}`,
  started: "Commencé",
  missing: {
    title: "Ton examen n’y est pas ?",
    body: "Dis-le-nous et nous le créerons. Laisse ton adresse e-mail et nous te préviendrons quand il sera prêt.",
    email: "Adresse e-mail",
    send: "Préviens-moi",
    sending: "Envoi...",
    thanks: "Merci ! On s’en occupe.",
    willEmail: (email, q) => `Nous écrirons à ${email} quand « ${q} » sera prêt.`,
    error: "L’envoi a échoué. Réessaie.",
    cantWait: "Pas envie d’attendre ?",
    makeQuiz: "Crée ton propre quiz maintenant",
  },
};

const it: SearchCopy = {
  tagline: "Ogni esame, ovunque. Inizia gratis.",
  srExams: (n) => `: test di esercitazione gratuiti per ${n} esami`,
  notYet: (q) => `Non abbiamo ancora «${q}». I risultati più vicini:`,
  closest: "I risultati più vicini:",
  voice: "Cerca con la voce",
  listening: "In ascolto",
  worldwide: "Internazionale",
  pickUp: "Riprendi da dove avevi lasciato",
  trending: "Ricerche di tendenza",
  mastered: (n) => `${n} imparate`,
  questionsMastered: (n) => `${plural(n, "domanda imparata", "domande imparate")}`,
  testsTaken: (n) => `${plural(n, "test svolto", "test svolti")}`,
  started: "Iniziato",
  missing: {
    title: "Manca il tuo esame?",
    body: "Faccelo sapere e lo prepariamo noi. Lascia la tua email e ti avvisiamo quando è pronto.",
    email: "Indirizzo email",
    send: "Avvisami",
    sending: "Invio...",
    thanks: "Grazie! Ce ne occupiamo.",
    willEmail: (email, q) => `Scriveremo a ${email} quando «${q}» sarà pronto.`,
    error: "Invio non riuscito. Riprova.",
    cantWait: "Non puoi aspettare?",
    makeQuiz: "Crea subito il tuo quiz",
  },
};

const nl: SearchCopy = {
  tagline: "Elk examen, overal. Gratis beginnen.",
  srExams: (n) => `: gratis oefentoetsen voor ${n} examens`,
  notYet: (q) => `‘${q}’ hebben we nog niet. Wat er het dichtst bij komt:`,
  closest: "Wat er het dichtst bij komt:",
  voice: "Zoeken met je stem",
  listening: "Luistert",
  worldwide: "Wereldwijd",
  pickUp: "Ga verder waar je gebleven was",
  trending: "Populaire zoekopdrachten",
  mastered: (n) => `${n} beheerst`,
  questionsMastered: (n) => `${plural(n, "vraag", "vragen")} beheerst`,
  testsTaken: (n) => `${plural(n, "toets", "toetsen")} gemaakt`,
  started: "Begonnen",
  missing: {
    title: "Staat je examen er niet bij?",
    body: "Laat het ons weten, dan maken we het. Geef je e-mailadres en we laten je weten wanneer het klaar is.",
    email: "E-mailadres",
    send: "Laat het me weten",
    sending: "Versturen...",
    thanks: "Bedankt! We gaan ermee aan de slag.",
    willEmail: (email, q) => `We mailen ${email} zodra ‘${q}’ klaar is.`,
    error: "Dat is niet gelukt. Probeer het opnieuw.",
    cantWait: "Kun je niet wachten?",
    makeQuiz: "Maak nu je eigen quiz",
  },
};

const pl: SearchCopy = {
  tagline: "Każdy egzamin, wszędzie. Zacznij za darmo.",
  srExams: (n) => `: darmowe testy próbne do ${n} egzaminów`,
  notYet: (q) => `Nie mamy jeszcze „${q}”. Najbliższe wyniki:`,
  closest: "Najbliższe wyniki:",
  voice: "Szukaj głosem",
  listening: "Słucham",
  worldwide: "Na całym świecie",
  pickUp: "Kontynuuj tam, gdzie skończyłeś",
  trending: "Popularne wyszukiwania",
  mastered: (n) => `opanowane: ${n}`,
  questionsMastered: (n) => `opanowane pytania: ${n}`,
  testsTaken: (n) => `rozwiązane testy: ${n}`,
  started: "Rozpoczęty",
  missing: {
    title: "Brakuje Twojego egzaminu?",
    body: "Daj nam znać, a go przygotujemy. Podaj adres e-mail, a powiadomimy Cię, gdy będzie gotowy.",
    email: "Adres e-mail",
    send: "Powiadom mnie",
    sending: "Wysyłanie...",
    thanks: "Dziękujemy! Zajmiemy się tym.",
    willEmail: (email, q) => `Napiszemy na ${email}, gdy „${q}” będzie gotowy.`,
    error: "Nie udało się wysłać. Spróbuj ponownie.",
    cantWait: "Nie możesz czekać?",
    makeQuiz: "Stwórz teraz własny quiz",
  },
};

const sv: SearchCopy = {
  tagline: "Alla prov, var som helst. Börja gratis.",
  srExams: (n) => `: gratis övningsprov för ${n} prov`,
  notYet: (q) => `Vi har inte ”${q}” än. Närmaste träffar:`,
  closest: "Närmaste träffar:",
  voice: "Sök med rösten",
  listening: "Lyssnar",
  worldwide: "Internationellt",
  pickUp: "Fortsätt där du slutade",
  trending: "Populära sökningar",
  mastered: (n) => `${n} klara`,
  questionsMastered: (n) => `${plural(n, "fråga", "frågor")} klara`,
  testsTaken: (n) => `${plural(n, "prov", "prov")} gjorda`,
  started: "Påbörjat",
  missing: {
    title: "Saknas ditt prov?",
    body: "Säg till så bygger vi det. Lämna din e-postadress så hör vi av oss när det är klart.",
    email: "E-postadress",
    send: "Meddela mig",
    sending: "Skickar...",
    thanks: "Tack! Vi tar hand om det.",
    willEmail: (email, q) => `Vi mejlar ${email} när ”${q}” är klart.`,
    error: "Det gick inte att skicka. Försök igen.",
    cantWait: "Kan du inte vänta?",
    makeQuiz: "Gör ditt eget quiz nu",
  },
};

const da: SearchCopy = {
  tagline: "Alle prøver, overalt. Start gratis.",
  srExams: (n) => `: gratis øvelsesprøver til ${n} prøver`,
  notYet: (q) => `Vi har ikke „${q}“ endnu. Nærmeste resultater:`,
  closest: "Nærmeste resultater:",
  voice: "Søg med stemmen",
  listening: "Lytter",
  worldwide: "Internationalt",
  pickUp: "Fortsæt hvor du slap",
  trending: "Populære søgninger",
  mastered: (n) => `${n} lært`,
  questionsMastered: (n) => `${plural(n, "spørgsmål", "spørgsmål")} lært`,
  testsTaken: (n) => `${plural(n, "prøve", "prøver")} taget`,
  started: "Startet",
  missing: {
    title: "Mangler din prøve?",
    body: "Sig til, så laver vi den. Skriv din e-mailadresse, så giver vi besked, når den er klar.",
    email: "E-mailadresse",
    send: "Giv mig besked",
    sending: "Sender...",
    thanks: "Tak! Vi går i gang.",
    willEmail: (email, q) => `Vi skriver til ${email}, når „${q}“ er klar.`,
    error: "Det gik ikke igennem. Prøv igen.",
    cantWait: "Kan du ikke vente?",
    makeQuiz: "Lav din egen quiz nu",
  },
};

const fi: SearchCopy = {
  tagline: "Mikä tahansa koe, missä tahansa. Aloita ilmaiseksi.",
  srExams: (n) => `: ilmaiset harjoituskokeet ${n} kokeeseen`,
  notYet: (q) => `Meillä ei vielä ole hakua ”${q}” vastaavaa koetta. Lähimmät osumat:`,
  closest: "Lähimmät osumat:",
  voice: "Hae puhumalla",
  listening: "Kuuntelee",
  worldwide: "Kansainvälinen",
  pickUp: "Jatka siitä, mihin jäit",
  trending: "Suositut haut",
  mastered: (n) => `${n} osattu`,
  questionsMastered: (n) => `${n} kysymystä osattu`,
  testsTaken: (n) => `${n} koetta tehty`,
  started: "Aloitettu",
  missing: {
    title: "Puuttuuko kokeesi?",
    body: "Kerro meille, niin teemme sen. Jätä sähköpostiosoitteesi, niin ilmoitamme, kun se on valmis.",
    email: "Sähköpostiosoite",
    send: "Ilmoita minulle",
    sending: "Lähetetään...",
    thanks: "Kiitos! Hoidamme asian.",
    willEmail: (email, q) => `Lähetämme viestin osoitteeseen ${email}, kun ”${q}” on valmis.`,
    error: "Lähetys epäonnistui. Yritä uudelleen.",
    cantWait: "Etkö jaksa odottaa?",
    makeQuiz: "Tee oma visa nyt",
  },
};

const hu: SearchCopy = {
  tagline: "Bármilyen vizsga, bárhol. Kezdd ingyen.",
  srExams: (n) => `: ingyenes gyakorló tesztek ${n} vizsgához`,
  notYet: (q) => `A(z) „${q}” még nincs meg nálunk. A legközelebbi találatok:`,
  closest: "A legközelebbi találatok:",
  voice: "Keresés hanggal",
  listening: "Figyel",
  worldwide: "Nemzetközi",
  pickUp: "Folytasd, ahol abbahagytad",
  trending: "Népszerű keresések",
  mastered: (n) => `${n} megtanulva`,
  questionsMastered: (n) => `${n} kérdés megtanulva`,
  testsTaken: (n) => `${n} teszt kitöltve`,
  started: "Elkezdve",
  missing: {
    title: "Hiányzik a vizsgád?",
    body: "Szólj, és elkészítjük. Add meg az e-mail-címed, és szólunk, amikor elkészült.",
    email: "E-mail-cím",
    send: "Értesítést kérek",
    sending: "Küldés...",
    thanks: "Köszönjük! Foglalkozunk vele.",
    willEmail: (email, q) => `Írunk a(z) ${email} címre, amikor a(z) „${q}” elkészül.`,
    error: "Nem sikerült elküldeni. Próbáld újra.",
    cantWait: "Nem tudsz várni?",
    makeQuiz: "Készítsd el most a saját kvízed",
  },
};

const ro: SearchCopy = {
  tagline: "Orice examen, oriunde. Începe gratuit.",
  srExams: (n) => `: teste de exersare gratuite pentru ${n} examene`,
  notYet: (q) => `Încă nu avem „${q}”. Cele mai apropiate rezultate:`,
  closest: "Cele mai apropiate rezultate:",
  voice: "Caută vocal",
  listening: "Ascultă",
  worldwide: "Internațional",
  pickUp: "Continuă de unde ai rămas",
  trending: "Căutări populare",
  mastered: (n) => `${n} învățate`,
  questionsMastered: (n) => `${plural(n, "întrebare învățată", "întrebări învățate")}`,
  testsTaken: (n) => `${plural(n, "test dat", "teste date")}`,
  started: "Început",
  missing: {
    title: "Nu-ți găsești examenul?",
    body: "Spune-ne și îl pregătim. Lasă-ne adresa de e-mail și te anunțăm când e gata.",
    email: "Adresă de e-mail",
    send: "Anunță-mă",
    sending: "Se trimite...",
    thanks: "Mulțumim! Ne ocupăm.",
    willEmail: (email, q) => `Îți scriem la ${email} când „${q}” e gata.`,
    error: "Nu s-a putut trimite. Încearcă din nou.",
    cantWait: "Nu poți aștepta?",
    makeQuiz: "Fă-ți acum propriul quiz",
  },
};

const el: SearchCopy = {
  tagline: "Κάθε εξέταση, παντού. Ξεκίνα δωρεάν.",
  srExams: (n) => `: δωρεάν τεστ εξάσκησης για ${n} εξετάσεις`,
  notYet: (q) => `Δεν έχουμε ακόμη «${q}». Τα πιο κοντινά αποτελέσματα:`,
  closest: "Τα πιο κοντινά αποτελέσματα:",
  voice: "Αναζήτηση με φωνή",
  listening: "Ακούει",
  worldwide: "Διεθνές",
  pickUp: "Συνέχισε από εκεί που σταμάτησες",
  trending: "Δημοφιλείς αναζητήσεις",
  mastered: (n) => `${n} κατακτημένες`,
  questionsMastered: (n) => `${plural(n, "ερώτηση κατακτημένη", "ερωτήσεις κατακτημένες")}`,
  testsTaken: (n) => `${n} τεστ ολοκληρωμένα`,
  started: "Ξεκίνησε",
  missing: {
    title: "Λείπει η εξέτασή σου;",
    body: "Πες μας και θα τη φτιάξουμε. Άφησε το email σου και θα σε ενημερώσουμε όταν είναι έτοιμη.",
    email: "Διεύθυνση email",
    send: "Ενημέρωσέ με",
    sending: "Αποστολή...",
    thanks: "Ευχαριστούμε! Το αναλαμβάνουμε.",
    willEmail: (email, q) => `Θα στείλουμε email στο ${email} όταν το «${q}» είναι έτοιμο.`,
    error: "Η αποστολή απέτυχε. Δοκίμασε ξανά.",
    cantWait: "Δεν μπορείς να περιμένεις;",
    makeQuiz: "Φτιάξε τώρα το δικό σου quiz",
  },
};

const vi: SearchCopy = {
  tagline: "Mọi bài thi, ở mọi nơi. Bắt đầu miễn phí.",
  srExams: (n) => `: bài thi thử miễn phí cho ${n} kỳ thi`,
  notYet: (q) => `Chúng tôi chưa có “${q}”. Kết quả gần nhất:`,
  closest: "Kết quả gần nhất:",
  voice: "Tìm bằng giọng nói",
  listening: "Đang nghe",
  worldwide: "Quốc tế",
  pickUp: "Tiếp tục từ chỗ bạn dừng",
  trending: "Tìm kiếm phổ biến",
  mastered: (n) => `${n} đã thuộc`,
  questionsMastered: (n) => `${n} câu đã thuộc`,
  testsTaken: (n) => `${n} bài đã làm`,
  started: "Đã bắt đầu",
  missing: {
    title: "Chưa có bài thi của bạn?",
    body: "Hãy cho chúng tôi biết và chúng tôi sẽ làm. Để lại email, chúng tôi sẽ báo khi bài thi sẵn sàng.",
    email: "Địa chỉ email",
    send: "Báo cho tôi",
    sending: "Đang gửi...",
    thanks: "Cảm ơn bạn! Chúng tôi sẽ làm ngay.",
    willEmail: (email, q) => `Chúng tôi sẽ gửi email tới ${email} khi “${q}” sẵn sàng.`,
    error: "Gửi không thành công. Vui lòng thử lại.",
    cantWait: "Không muốn chờ?",
    makeQuiz: "Tự tạo bài quiz ngay",
  },
};

const ko: SearchCopy = {
  tagline: "어떤 시험이든, 어디서나. 무료로 시작하세요.",
  srExams: (n) => `: ${n}개 시험의 무료 모의고사`,
  notYet: (q) => `아직 “${q}” 시험은 없습니다. 가장 비슷한 결과:`,
  closest: "가장 비슷한 결과:",
  voice: "음성으로 검색",
  listening: "듣는 중",
  worldwide: "국제",
  pickUp: "하던 곳에서 계속하기",
  trending: "인기 검색어",
  mastered: (n) => `${n}개 익힘`,
  questionsMastered: (n) => `${n}문제 익힘`,
  testsTaken: (n) => `시험 ${n}회 응시`,
  started: "시작함",
  missing: {
    title: "찾는 시험이 없나요?",
    body: "알려 주시면 만들어 드릴게요. 이메일을 남겨 주시면 준비되는 대로 알려 드립니다.",
    email: "이메일 주소",
    send: "알림 받기",
    sending: "보내는 중...",
    thanks: "감사합니다! 바로 준비할게요.",
    willEmail: (email, q) => `“${q}” 시험이 준비되면 ${email}(으)로 알려 드릴게요.`,
    error: "전송하지 못했습니다. 다시 시도해 주세요.",
    cantWait: "기다리기 어렵다면?",
    makeQuiz: "지금 나만의 퀴즈 만들기",
  },
};

const zh: SearchCopy = {
  tagline: "任何考试，随时随地。免费开始。",
  srExams: (n) => `：${n} 种考试的免费模拟测试`,
  notYet: (q) => `我们还没有“${q}”。最接近的结果：`,
  closest: "最接近的结果：",
  voice: "语音搜索",
  listening: "正在聆听",
  worldwide: "国际",
  pickUp: "从上次停下的地方继续",
  trending: "热门搜索",
  mastered: (n) => `已掌握 ${n}`,
  questionsMastered: (n) => `已掌握 ${n} 道题`,
  testsTaken: (n) => `已做 ${n} 套测试`,
  started: "已开始",
  missing: {
    title: "没有找到你的考试？",
    body: "告诉我们，我们来做。留下你的电子邮箱，做好后我们会通知你。",
    email: "电子邮箱",
    send: "通知我",
    sending: "正在发送...",
    thanks: "谢谢！我们会尽快安排。",
    willEmail: (email, q) => `“${q}”做好后，我们会发邮件到 ${email}。`,
    error: "发送失败，请重试。",
    cantWait: "等不及？",
    makeQuiz: "现在就自己做一个测验",
  },
};

const SEARCH_COPY: Record<HomeLanguage, SearchCopy> = { en, de, es, pt, fr, it, nl, pl, vi, ko, zh, sv, da, fi, hu, ro, el };

export function searchCopy(lang: string): SearchCopy {
  return SEARCH_COPY[lang as HomeLanguage] ?? en;
}
