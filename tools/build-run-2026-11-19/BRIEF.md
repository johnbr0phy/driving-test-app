# Writer brief: two Italian practice tests (Tigertest)

You write original multiple-choice questions **in Italian** for one or more source files. Read this
whole brief, then look at one existing source file for the format:
`tools/next100/itcils/q_mail.py` (reading) and `tools/next100/itcils/q_passato.py` (grammar).

## File format

Each file is `tools/build-run-2026-11-19/<exam>/q_<module>.py`:

```python
CAT = "ita2Lessico"; SEG = "LES"
# one-line description
Q = [
("domanda ...?", "risposta giusta", ["sbagliata 1", "sbagliata 2", "sbagliata 3"],
 "Spiegazione in italiano, 1 a 3 frasi: perché la risposta è giusta e perché la sbagliata più tentatrice è sbagliata."),
...
]
```

- Key first, then three wrong options. The build puts the key in a rotating slot, so never
  mention positions ("la prima opzione", "risposta B") anywhere.
- Every stem ends with `?` or `:`.
- No straight double quotes `"` anywhere in the text. Quote passages and words with « ».
  Inside a passage use “ ” for inner quotes. No em-dash or en-dash (use commas or colons).
- Never "Tutte le precedenti", "Nessuna delle precedenti", "A e B", "entrambe".
- Run `python3 -I tools/build-run-2026-11-19/check.py <exam> <module> <pool>` from the repo root
  after every 10 items and at the end. It must print OK. Fix every ERR.

## House style (this is what reviewers fail)

- **Options are short phrases.** Average 15 to 35 characters. Put detail in the explanation.
- **The key must not stand out.** Write the key first and short, then three wrong options of the
  same shape and length. The key may be the single longest option in at most 25% of items, and
  more than 20% longer than the wrong-option average in at most 30%.
- **Every question gets its own options.** No option set may repeat inside a file. No key may be
  used twice word for word. No families of four questions sharing options.
- **The key must not echo the stem.** If a word from the question appears in the key, put it in
  wrong options too, or reword.
- **Distractors are plausible errors**: the wrong preposition, the wrong auxiliary, the wrong
  agreement, a detail that is in the passage but answers a different question, the near-synonym
  with the wrong register. Never silly strawmen.
- **Exactly one defensible answer.** For grammar, every wrong option must be wrong in standard
  written Italian (not just less elegant). For reading, the answer must be stated or clearly
  implied in the passage; wrong options must be contradicted by it or absent from it.
- **Stems short.** Grammar stems are one sentence with `___` for the gap, plus "Completa:" style
  framing only when needed. Do not wrap a fact in a story.
- Vary subjects, names (Italian and immigrant names: Amina, Yusuf, Ana, Li Wei, Olena, Kofi,
  Giulia, Marco...), places (invented or generic: "via Roma", "il Comune di Valdora"), situations.
- All passages are invented. Never copy or reword any CILS, CELI, Prefettura or textbook item.
- No question about the exam itself (how many questions, pass mark, booking).
- No current officeholders, fees, prices of real services, or laws that change. Fictional prices
  in a shop notice are fine.
- Write natural, correct Italian. Explanations in Italian, plain, 1 to 3 sentences.

---

## Exam A: `ita2`, Test di italiano A2 per il permesso di soggiorno UE di lungo periodo

The Prefettura test (D.M. 7 dicembre 2021, same rules as D.M. 4 giugno 2010) checks A2 Italian:
"comprendere frasi ed espressioni di uso frequente in ambiti correnti". The Ministry's vademecum
says the test covers listening, reading and written interaction (answer an email or invitation,
fill in a form) about everyday life of an adult immigrant in Italy. Domains: private (home,
family, free time, health), public (Comune, anagrafe, questura, prefettura, posta, banca, ASL,
medico di base, scuola dei figli, trasporti, negozi, mercato) and work (cantiere, ristorante,
fabbrica, pulizie, badante, colf, turni, busta paga, ferie, colloquio di lavoro, sicurezza).

**Level: A2.** Simple sentences, frequent words, present tense, passato prossimo, some
imperfetto, imperativo for instructions, "vorrei", "si può/non si può". No congiuntivo, no
periodo ipotetico beyond "se + presente". Learners are adults with modest schooling: keep
passages and questions plain.

Categories (file, CAT, SEG, pool):
1. `q_corrispondenza.py`, `ita2Corrispondenza`, `COR`, 20: read a short letter, email or text
   message (from the school of the children, the landlord, the employer, a friend, a Questura or
   Comune notice letter, a doctor's office) and answer one question about it. Passage 40 to 100
   words inside « ». Stem starts "Leggi il messaggio: «...» ..." etc.
2. `q_orientarsi.py`, `ita2Orientarsi`, `ORI`, 24: signs, notices, timetables, menus, shop ads,
   job ads, office opening hours, "vietato" signs, small ads for a room. 20 to 90 words. Ask for
   the specific fact (when, where, how much, what is not allowed).
3. `q_informarsi.py`, `ita2Informarsi`, `INF`, 16: short newspaper-style texts or leaflets (a new
   bus line, a free Italian course at the CPIA, a neighbourhood market, a health campaign).
   50 to 100 words. Ask the main point or one detail.
4. `q_istruzioni.py`, `ita2Istruzioni`, `IST`, 20: instructions and safety rules: using a ticket
   machine, a cash machine, a washing machine, how to book at the CUP, how to separate the
   rubbish, rules at work (helmet, gloves), a medicine leaflet in simple words. 40 to 100 words.
   Ask what to do first, what not to do, what happens if.
5. `q_interazione.py`, `ita2Interazione`, `INT`, 24: written interaction, A2. Types: choose the
   right reply to a short message or invitation; the right sentence to complete an email
   ("Gentile signora..., le scrivo per..."); what to write in a form field ("Luogo di nascita",
   "Stato civile", "Recapito telefonico", "Codice fiscale", "Firma"); the right opening or
   closing for formal vs informal messages. Short stems.
6. `q_azioni.py`, `ita2Azioni`, `AZI`, 24: everyday communicative acts: what you say to greet,
   thank, apologise, ask permission, ask to repeat, ask the way, accept or refuse an invitation,
   order at the bar, say you are late and why, at the doctor ("Mi fa male...") . Stem: a
   situation in one sentence; options are short Italian expressions; only one fits.
7. `q_lessico.py`, `ita2Lessico`, `LES`, 32: A2 words of the domains above: family, house
   (affitto, bolletta, riscaldamento), clothes, food, body and health (ricetta, pronto soccorso,
   farmacia), public offices (sportello, modulo, ricevuta, marca da bollo, francobollo, raccomandata),
   work (turno, busta paga, ferie, contratto, licenziare, assumere), transport (biglietto,
   fermata, binario, abbonamento), time and dates. Types: the word that fits a gap, the word for
   a definition, the odd one out is NOT allowed (avoid), the opposite.
8. `q_grammatica.py`, `ita2Grammatica`, `GRA`, 40: A2 grammar in short everyday sentences:
   articoli (il/lo/l'/la/i/gli/le, un/uno/una), preposizioni semplici e articolate (a, in, da, di,
   con, per; al, alla, dal, nel...), presente regolare e irregolare (essere, avere, andare, fare,
   venire, dovere, potere, volere), passato prossimo con essere/avere e accordo, possessivi
   (mio, mia, con i nomi di famiglia), pronomi diretti (lo, la, li, le), c'è/ci sono, imperativo
   tu e Lei di uso frequente, "mi piace / mi piacciono", plurali. 10 items per sub-area roughly.
   Distractors are the real learner errors.

## Exam B: `itcilsb2`, CILS DUE-B2 (Università per Stranieri di Siena)

CILS DUE-B2 certifies full autonomy in Italian; it is the minimum level for enrolling in an
Italian university and is used for study and work. The real exam has five tests: ascolto,
comprensione della lettura (3 prove: multiple choice on an article, choose the information
present in a text, put the parts of a text in order; 1 hour), analisi delle strutture di
comunicazione (4 prove: complete a text with adjectives and pronouns, with the right verb forms,
a multiple-choice cloze, and match each expression to its communicative situation; 1 hour 10
minutes), produzione scritta, produzione orale. We model reading and the structures test.

**Level: B2.** Newspaper and magazine register, university and work topics, society, culture,
environment, technology, consumer life, health. Full grammar: congiuntivo presente, passato,
imperfetto, trapassato; concordanza dei tempi; condizionale passato (futuro nel passato);
futuro anteriore; periodo ipotetico (1, 2, 3 tipo e misto); forma passiva (essere, venire,
andare + participio, si passivante); gerundio, participio e infinito passato; discorso
indiretto; pronomi combinati (glielo, me ne, ce la), ne e ci, relativi (cui, il quale, chi),
indefiniti; connettivi (benché, sebbene, affinché, a meno che, purché, nonostante, dal momento
che, pertanto, tuttavia, invece di, anziché).

Categories (file, CAT, SEG, pool):
1. `q_articoli.py`, `itb2Articoli`, `ART`, 24: an article excerpt of 80 to 150 words in « »,
   then one question (main idea, a detail, the writer's opinion, what a word or phrase means in
   context, the purpose of the text). Varied topics.
2. `q_informazioni.py`, `itb2Informazioni`, `INF`, 20: a text of 80 to 150 words, then "Quale
   informazione è presente nel testo?" or "Secondo il testo, quale affermazione è vera?". The
   wrong options look close but are false or not stated (wrong number, wrong subject, overgeneralised).
3. `q_coesione.py`, `itb2Coesione`, `COE`, 16: text reconstruction and cohesion. Types: three or
   four numbered sentences (1), (2), (3) of a short text, ask the right order (options like
   "2, 1, 3"); or a paragraph with a missing sentence, ask which sentence continues it; or what a
   pronoun or connective refers to. The text in « ». For order options use "1, 3, 2" format;
   make sure exactly one order is coherent (the connectives and pronouns must force it).
4. `q_pronomi.py`, `itb2Pronomi`, `PRO`, 24: pronomi combinati, ne, ci, relativi (cui, il
   quale/la quale, chi, quello che), possessivi con articolo, indefiniti (qualche, alcuni,
   nessuno, ciascuno, qualsiasi). One sentence with `___`.
5. `q_verbi.py`, `itb2Verbi`, `VER`, 40: the right verb form in context: congiuntivo after
   credo/penso/spero/è importante/prima che/benché (all four tenses), concordanza dei tempi,
   condizionale passato as future in the past ("Ha detto che sarebbe venuto"), futuro anteriore,
   passivo with venire/andare, gerundio presente/passato, participio passato assoluto, infinito
   passato ("dopo aver mangiato"). Distractors: the indicative, the wrong tense, the wrong mood.
6. `q_periodo.py`, `itb2Periodo`, `PER`, 28: periodo ipotetico (all types, misto), discorso
   indiretto (tense and pronoun shifts: "Disse che il giorno dopo..."), connettivi (benché vs
   perché vs dato che; tuttavia vs quindi; affinché, a meno che, purché, nonostante, anziché).
7. `q_situazioni.py`, `itb2Situazioni`, `SIT`, 20: an expression or short message in « » (a
   formal notice, a polite request, an ironic remark, a complaint, an apology, an advert slogan,
   an instruction from an office) and "In quale situazione si dice o si legge?" or "Che cosa
   esprime chi parla?" Options are short situations or functions. Also register: the most
   appropriate formal phrasing for a given context.
8. `q_lessico.py`, `itb2Lessico`, `LES`, 28: B2 vocabulary: collocations (prendere una
   decisione, svolgere un ruolo, fare fronte a), idioms in context (in bocca al lupo, essere al
   verde, prendere due piccioni con una fava), near synonyms in context, word formation
   (nominalizzazioni, prefissi), the word that fits a newspaper sentence.
