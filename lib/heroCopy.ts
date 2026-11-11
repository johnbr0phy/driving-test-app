// The line under the hero title on every exam, v2 and quiz dashboard. Like
// the DMV dashboard, it is picked at random from a few lines for where the
// person is, so it changes on each visit: the exam's own line for that stage
// (ExamConfig.copy.heroSubs) plus four encouraging ones shared by every exam.
// {done}, {left} and {total} are step counts. Every language but English is
// machine-translated, pending native review.

import type { Language } from "@/i18n";

export type HeroStage = "start" | "early" | "mid" | "late" | "last" | "done";

type Pool = Record<HeroStage, [string, string, string, string]>;

const en: Pool = {
  start: [
    "Each step gets you closer to passing first time.",
    "Start with step 1. Every one counts.",
    "Work down the list and you'll walk in ready.",
    "The steps are here. Your test is waiting.",
  ],
  early: [
    "Nice start. Each step builds real knowledge.",
    "You've started. That's the hardest part.",
    "{done} done, {left} to go. You're on your way.",
    "Good progress. Keep ticking them off.",
  ],
  mid: [
    "{done} of {total} done. You're building serious knowledge.",
    "The second half goes faster. Keep going.",
    "You're in good shape. Keep pushing.",
    "You already know more than most people who sit this test.",
  ],
  late: [
    "{left} more and you'll be fully prepared.",
    "You can see the finish line from here.",
    "You're doing really well. Almost there.",
    "{done} done. You're so close.",
  ],
  last: [
    "One more step and you're ready.",
    "Finish the last one and go pass your test.",
    "You've come too far to stop now.",
    "Last one. You've got this.",
  ],
  done: [
    "You've done the work. Go pass that test.",
    "All {total} complete. You're as prepared as you can be.",
    "That's everything. Time for the real thing.",
    "Nothing left to do here. Go pass your test.",
  ],
};

const es: Pool = {
  start: [
    "Cada paso te acerca a aprobar a la primera.",
    "Empieza por el paso 1. Todos cuentan.",
    "Sigue la lista y llegarás con todo listo.",
    "Los pasos están aquí. Tu examen te espera.",
  ],
  early: [
    "Buen comienzo. Cada paso te deja algo aprendido.",
    "Ya empezaste. Eso es lo más difícil.",
    "{done} hechos, faltan {left}. Vas por buen camino.",
    "Buen avance. Sigue tachando pasos.",
  ],
  mid: [
    "{done} de {total} hechos. Ya sabes mucho.",
    "La segunda mitad pasa más rápido. Sigue así.",
    "Vas muy bien. No aflojes.",
    "Ya sabes más que la mayoría de quienes hacen este examen.",
  ],
  late: [
    "{left} más y tendrás todo preparado.",
    "Ya se ve la meta desde aquí.",
    "Lo estás haciendo muy bien. Ya casi.",
    "{done} hechos. Estás muy cerca.",
  ],
  last: [
    "Un paso más y lo tienes.",
    "Termina el último y ve a aprobar tu examen.",
    "Has llegado demasiado lejos para parar ahora.",
    "El último. Tú puedes.",
  ],
  done: [
    "Hiciste el trabajo. Ve a aprobar ese examen.",
    "Los {total} completos. No puedes ir mejor preparado.",
    "Eso es todo. Ahora, el examen de verdad.",
    "Aquí ya no queda nada por hacer. Ve a aprobar.",
  ],
};

const vi: Pool = {
  start: [
    "Mỗi bước đưa bạn đến gần hơn việc đậu ngay lần đầu.",
    "Bắt đầu từ bước 1. Bước nào cũng quan trọng.",
    "Làm lần lượt theo danh sách và bạn sẽ sẵn sàng.",
    "Các bước đã có ở đây. Bài thi đang chờ bạn.",
  ],
  early: [
    "Khởi đầu tốt. Mỗi bước cho bạn thêm kiến thức.",
    "Bạn đã bắt đầu. Đó là phần khó nhất.",
    "Xong {done}, còn {left}. Bạn đang đi đúng hướng.",
    "Tiến bộ tốt. Cứ làm tiếp từng bước.",
  ],
  mid: [
    "Xong {done} trên {total}. Bạn đã biết khá nhiều rồi.",
    "Nửa sau sẽ nhanh hơn. Cứ tiếp tục.",
    "Bạn đang làm rất tốt. Cố lên.",
    "Bạn đã biết nhiều hơn phần lớn người đi thi bài này.",
  ],
  late: [
    "Thêm {left} bước nữa là bạn sẵn sàng.",
    "Đích đến đã ở ngay trước mắt.",
    "Bạn làm rất tốt. Sắp xong rồi.",
    "Xong {done}. Bạn đã rất gần.",
  ],
  last: [
    "Thêm một bước nữa là bạn sẵn sàng.",
    "Làm xong bước cuối rồi đi thi đậu nhé.",
    "Bạn đã đi quá xa để dừng lại lúc này.",
    "Bước cuối cùng. Bạn làm được.",
  ],
  done: [
    "Bạn đã học xong. Giờ đi thi đậu thôi.",
    "Đủ cả {total} bước. Bạn đã chuẩn bị tốt nhất có thể.",
    "Vậy là xong hết. Đến lúc thi thật rồi.",
    "Ở đây không còn gì để làm. Đi thi đậu nhé.",
  ],
};

const ko: Pool = {
  start: [
    "한 단계씩 할 때마다 한 번에 합격에 가까워져요.",
    "1단계부터 시작하세요. 모든 단계가 중요해요.",
    "목록대로 따라가면 준비가 끝나요.",
    "단계는 여기 있어요. 시험이 기다리고 있어요.",
  ],
  early: [
    "좋은 출발이에요. 단계마다 실력이 쌓여요.",
    "시작했어요. 그게 가장 어려운 부분이에요.",
    "{done}개 완료, {left}개 남았어요. 잘 가고 있어요.",
    "잘하고 있어요. 하나씩 계속 끝내 보세요.",
  ],
  mid: [
    "{total}개 중 {done}개 완료. 실력이 탄탄해지고 있어요.",
    "나머지 절반은 더 빨리 지나가요. 계속하세요.",
    "아주 잘하고 있어요. 조금만 더 힘내요.",
    "이미 이 시험을 보는 대부분의 사람보다 많이 알아요.",
  ],
  late: [
    "{left}개만 더 하면 준비 끝이에요.",
    "결승선이 보여요.",
    "정말 잘하고 있어요. 거의 다 왔어요.",
    "{done}개 완료. 정말 얼마 안 남았어요.",
  ],
  last: [
    "한 단계만 더 하면 준비 끝이에요.",
    "마지막 하나를 끝내고 시험에 합격하세요.",
    "여기까지 왔는데 멈출 수 없죠.",
    "마지막이에요. 할 수 있어요.",
  ],
  done: [
    "할 일을 다 했어요. 이제 합격하러 가세요.",
    "{total}개 모두 완료. 더 이상 준비할 게 없어요.",
    "이게 전부예요. 이제 진짜 시험이에요.",
    "여기서 할 일은 끝났어요. 합격하러 가세요.",
  ],
};

const zh: Pool = {
  start: [
    "每完成一步，离一次通过就更近一步。",
    "从第 1 步开始。每一步都算数。",
    "按顺序做完，你就准备好了。",
    "步骤都在这里。考试在等你。",
  ],
  early: [
    "开头不错。每一步都在积累真本事。",
    "你已经开始了。这是最难的一步。",
    "完成 {done} 步，还剩 {left} 步。你在路上了。",
    "进展不错。继续一步步完成。",
  ],
  mid: [
    "已完成 {done}/{total}。你已经掌握了不少。",
    "后半程会更快。继续加油。",
    "状态很好。再接再厉。",
    "你已经比大多数参加这项考试的人懂得多了。",
  ],
  late: [
    "再完成 {left} 步，你就完全准备好了。",
    "终点已经在眼前了。",
    "你做得很好。快到了。",
    "已完成 {done} 步。就差一点了。",
  ],
  last: [
    "再完成一步就准备好了。",
    "完成最后一步，然后去通过考试吧。",
    "都走到这里了，别停下。",
    "最后一步。你可以的。",
  ],
  done: [
    "该做的都做了。去通过考试吧。",
    "{total} 步全部完成。你已经准备得够充分了。",
    "全部完成。该上真正的考场了。",
    "这里没有要做的了。去通过考试吧。",
  ],
};

const de: Pool = {
  start: [
    "Jeder Schritt bringt dich näher ans Bestehen beim ersten Versuch.",
    "Fang mit Schritt 1 an. Jeder zählt.",
    "Arbeite die Liste durch, dann bist du bereit.",
    "Die Schritte stehen bereit. Deine Prüfung wartet.",
  ],
  early: [
    "Guter Start. Mit jedem Schritt weißt du mehr.",
    "Du hast angefangen. Das ist das Schwerste.",
    "{done} geschafft, noch {left}. Du bist auf dem Weg.",
    "Es geht voran. Hak weiter ab.",
  ],
  mid: [
    "{done} von {total} geschafft. Du weißt schon richtig viel.",
    "Die zweite Hälfte geht schneller. Weiter so.",
    "Du liegst gut im Rennen. Bleib dran.",
    "Du weißt schon mehr als die meisten, die diese Prüfung ablegen.",
  ],
  late: [
    "Noch {left}, dann bist du komplett vorbereitet.",
    "Von hier aus siehst du schon das Ziel.",
    "Du machst das richtig gut. Fast geschafft.",
    "{done} geschafft. Du bist ganz nah dran.",
  ],
  last: [
    "Noch ein Schritt, dann bist du bereit.",
    "Mach den letzten fertig und besteh deine Prüfung.",
    "Du bist zu weit gekommen, um jetzt aufzuhören.",
    "Der letzte. Du schaffst das.",
  ],
  done: [
    "Du hast die Arbeit gemacht. Jetzt besteh die Prüfung.",
    "Alle {total} geschafft. Besser vorbereitet geht nicht.",
    "Das war alles. Jetzt kommt die echte Prüfung.",
    "Hier gibt es nichts mehr zu tun. Geh bestehen.",
  ],
};

const fr: Pool = {
  start: [
    "Chaque étape vous rapproche de la réussite du premier coup.",
    "Commencez par l'étape 1. Chacune compte.",
    "Suivez la liste et vous arriverez prêt.",
    "Les étapes sont là. Votre examen vous attend.",
  ],
  early: [
    "Bon début. Chaque étape vous apprend quelque chose.",
    "Vous avez commencé. C'est le plus difficile.",
    "{done} faites, encore {left}. Vous êtes sur la bonne voie.",
    "Belle progression. Continuez à les cocher.",
  ],
  mid: [
    "{done} sur {total} faites. Vous en savez déjà beaucoup.",
    "La seconde moitié va plus vite. Continuez.",
    "Vous êtes bien parti. Ne lâchez rien.",
    "Vous en savez déjà plus que la plupart des candidats.",
  ],
  late: [
    "Encore {left} et vous serez tout à fait prêt.",
    "On voit la ligne d'arrivée d'ici.",
    "Vous vous en sortez très bien. Presque fini.",
    "{done} faites. Vous y êtes presque.",
  ],
  last: [
    "Encore une étape et vous êtes prêt.",
    "Terminez la dernière et allez réussir votre examen.",
    "Vous êtes allé trop loin pour vous arrêter.",
    "La dernière. Vous allez y arriver.",
  ],
  done: [
    "Le travail est fait. Allez réussir cet examen.",
    "Les {total} sont terminées. Vous ne pouvez pas être mieux préparé.",
    "C'est tout. Place au vrai examen.",
    "Plus rien à faire ici. Allez réussir.",
  ],
};

const it: Pool = {
  start: [
    "Ogni passo ti avvicina a passare al primo colpo.",
    "Parti dal passo 1. Contano tutti.",
    "Segui la lista e arriverai pronto.",
    "I passi sono qui. Il tuo esame ti aspetta.",
  ],
  early: [
    "Buon inizio. Ogni passo ti lascia qualcosa.",
    "Hai iniziato. È la parte più difficile.",
    "{done} fatti, ne mancano {left}. Sei sulla strada giusta.",
    "Bei progressi. Continua a spuntarli.",
  ],
  mid: [
    "{done} su {total} fatti. Sai già parecchio.",
    "La seconda metà va più veloce. Continua così.",
    "Sei messo bene. Non mollare.",
    "Sai già più della maggior parte di chi fa questo esame.",
  ],
  late: [
    "Ancora {left} e sarai del tutto pronto.",
    "Da qui si vede il traguardo.",
    "Stai andando davvero bene. Ci sei quasi.",
    "{done} fatti. Manca pochissimo.",
  ],
  last: [
    "Ancora un passo e sei pronto.",
    "Finisci l'ultimo e vai a passare l'esame.",
    "Sei arrivato troppo lontano per fermarti.",
    "L'ultimo. Ce la fai.",
  ],
  done: [
    "Il lavoro l'hai fatto. Vai a passare l'esame.",
    "Tutti e {total} completati. Più pronto di così non si può.",
    "È tutto. Ora tocca all'esame vero.",
    "Qui non c'è più niente da fare. Vai a passarlo.",
  ],
};

const pl: Pool = {
  start: [
    "Każdy krok przybliża cię do zdania za pierwszym razem.",
    "Zacznij od kroku 1. Każdy się liczy.",
    "Przejdź całą listę, a będziesz gotowy.",
    "Kroki są tutaj. Egzamin czeka.",
  ],
  early: [
    "Dobry początek. Każdy krok to nowa wiedza.",
    "Zacząłeś. To najtrudniejsza część.",
    "Zrobione: {done}, zostało: {left}. Jesteś na dobrej drodze.",
    "Dobre tempo. Odhaczaj kolejne.",
  ],
  mid: [
    "Zrobione: {done} z {total}. Wiesz już naprawdę dużo.",
    "Druga połowa idzie szybciej. Tak trzymaj.",
    "Jest dobrze. Nie odpuszczaj.",
    "Wiesz już więcej niż większość zdających ten egzamin.",
  ],
  late: [
    "Jeszcze {left} i będziesz w pełni przygotowany.",
    "Stąd widać już metę.",
    "Idzie ci naprawdę dobrze. Prawie koniec.",
    "Zrobione: {done}. Jesteś bardzo blisko.",
  ],
  last: [
    "Jeszcze jeden krok i jesteś gotowy.",
    "Skończ ostatni i idź zdać egzamin.",
    "Zaszedłeś za daleko, żeby teraz przestać.",
    "Ostatni. Dasz radę.",
  ],
  done: [
    "Praca wykonana. Idź zdać ten egzamin.",
    "Wszystkie {total} ukończone. Lepiej się nie da przygotować.",
    "To wszystko. Czas na prawdziwy egzamin.",
    "Tu nie ma już nic do zrobienia. Idź zdać.",
  ],
};

const nl: Pool = {
  start: [
    "Elke stap brengt je dichter bij slagen in één keer.",
    "Begin bij stap 1. Elke stap telt.",
    "Werk de lijst af en je bent er klaar voor.",
    "De stappen staan klaar. Je examen wacht.",
  ],
  early: [
    "Mooi begin. Van elke stap leer je iets.",
    "Je bent begonnen. Dat is het moeilijkste.",
    "{done} gedaan, nog {left} te gaan. Je bent op weg.",
    "Het gaat goed. Blijf ze afvinken.",
  ],
  mid: [
    "{done} van {total} gedaan. Je weet al heel wat.",
    "De tweede helft gaat sneller. Ga zo door.",
    "Je ligt goed op koers. Hou vol.",
    "Je weet al meer dan de meeste mensen die dit examen doen.",
  ],
  late: [
    "Nog {left} en je bent helemaal voorbereid.",
    "Je ziet de eindstreep al.",
    "Je doet het heel goed. Bijna klaar.",
    "{done} gedaan. Je bent er bijna.",
  ],
  last: [
    "Nog één stap en je bent klaar.",
    "Maak de laatste af en ga slagen voor je examen.",
    "Je bent te ver gekomen om nu te stoppen.",
    "De laatste. Je kunt het.",
  ],
  done: [
    "Het werk is gedaan. Ga slagen voor dat examen.",
    "Alle {total} afgerond. Beter voorbereid kan niet.",
    "Dat was alles. Tijd voor het echte examen.",
    "Hier valt niets meer te doen. Ga slagen.",
  ],
};

const pt: Pool = {
  start: [
    "Cada passo deixa-o mais perto de passar à primeira.",
    "Comece pelo passo 1. Todos contam.",
    "Siga a lista e chegará preparado.",
    "Os passos estão aqui. O seu exame está à espera.",
  ],
  early: [
    "Bom começo. Cada passo ensina alguma coisa.",
    "Já começou. Essa é a parte mais difícil.",
    "{done} feitos, faltam {left}. Está no bom caminho.",
    "Bom progresso. Continue a riscá-los da lista.",
  ],
  mid: [
    "{done} de {total} feitos. Já sabe bastante.",
    "A segunda metade passa mais depressa. Continue.",
    "Está bem encaminhado. Não abrande.",
    "Já sabe mais do que a maioria de quem faz este exame.",
  ],
  late: [
    "Mais {left} e fica totalmente preparado.",
    "Daqui já se vê a meta.",
    "Está a ir muito bem. Falta pouco.",
    "{done} feitos. Está mesmo perto.",
  ],
  last: [
    "Mais um passo e está pronto.",
    "Termine o último e vá passar no exame.",
    "Chegou longe demais para parar agora.",
    "O último. Consegue.",
  ],
  done: [
    "O trabalho está feito. Vá passar nesse exame.",
    "Os {total} concluídos. Não podia estar mais preparado.",
    "É tudo. Agora, o exame a sério.",
    "Aqui já não há nada a fazer. Vá passar.",
  ],
};

const sv: Pool = {
  start: [
    "Varje steg tar dig närmare att klara det på första försöket.",
    "Börja med steg 1. Alla räknas.",
    "Gå igenom listan så är du redo.",
    "Stegen finns här. Ditt prov väntar.",
  ],
  early: [
    "Bra start. Varje steg ger dig riktig kunskap.",
    "Du har börjat. Det är det svåraste.",
    "{done} klara, {left} kvar. Du är på väg.",
    "Det går framåt. Fortsätt bocka av.",
  ],
  mid: [
    "{done} av {total} klara. Du kan redan mycket.",
    "Andra halvan går fortare. Fortsätt så.",
    "Du ligger bra till. Håll i.",
    "Du kan redan mer än de flesta som gör det här provet.",
  ],
  late: [
    "{left} till, sedan är du helt förberedd.",
    "Du ser mållinjen härifrån.",
    "Det går riktigt bra. Nästan framme.",
    "{done} klara. Du är så nära.",
  ],
  last: [
    "Ett steg till och du är redo.",
    "Gör klart det sista och gå och klara provet.",
    "Du har kommit för långt för att sluta nu.",
    "Det sista. Du klarar det.",
  ],
  done: [
    "Du har gjort jobbet. Gå och klara provet.",
    "Alla {total} klara. Bättre förberedd blir du inte.",
    "Det var allt. Dags för det riktiga provet.",
    "Här finns inget kvar att göra. Gå och klara det.",
  ],
};

const da: Pool = {
  start: [
    "Hvert trin bringer dig tættere på at bestå i første forsøg.",
    "Begynd med trin 1. Alle tæller.",
    "Tag listen fra en ende af, så er du klar.",
    "Trinene er her. Din prøve venter.",
  ],
  early: [
    "God start. Hvert trin giver dig ny viden.",
    "Du er i gang. Det er det sværeste.",
    "{done} klaret, {left} tilbage. Du er på vej.",
    "Det går fremad. Bliv ved med at krydse af.",
  ],
  mid: [
    "{done} af {total} klaret. Du ved allerede meget.",
    "Anden halvdel går hurtigere. Bliv ved.",
    "Du ligger godt. Hold fast.",
    "Du ved allerede mere end de fleste, der går til prøven.",
  ],
  late: [
    "{left} mere, så er du helt forberedt.",
    "Du kan se målstregen herfra.",
    "Det går rigtig godt. Næsten i mål.",
    "{done} klaret. Du er så tæt på.",
  ],
  last: [
    "Et trin mere, så er du klar.",
    "Gør det sidste færdigt, og gå ud og bestå.",
    "Du er nået for langt til at stoppe nu.",
    "Det sidste. Du kan godt.",
  ],
  done: [
    "Du har gjort arbejdet. Gå ud og bestå.",
    "Alle {total} klaret. Bedre forberedt bliver du ikke.",
    "Det var det hele. Nu gælder det den rigtige prøve.",
    "Her er ikke mere at gøre. Gå ud og bestå.",
  ],
};

const fi: Pool = {
  start: [
    "Jokainen vaihe vie sinua lähemmäs läpäisyä ensimmäisellä kerralla.",
    "Aloita vaiheesta 1. Jokainen on tärkeä.",
    "Käy lista läpi, niin olet valmis.",
    "Vaiheet ovat tässä. Kokeesi odottaa.",
  ],
  early: [
    "Hyvä alku. Jokainen vaihe opettaa jotain.",
    "Olet aloittanut. Se on vaikein osa.",
    "{done} tehty, {left} jäljellä. Olet hyvässä vauhdissa.",
    "Hyvin etenee. Jatka samaan tahtiin.",
  ],
  mid: [
    "{done}/{total} tehty. Osaat jo paljon.",
    "Toinen puolisko menee nopeammin. Jatka vain.",
    "Hyvältä näyttää. Älä hellitä.",
    "Osaat jo enemmän kuin useimmat tähän kokeeseen tulevat.",
  ],
  late: [
    "Vielä {left}, niin olet täysin valmis.",
    "Maali näkyy jo.",
    "Sinulla menee todella hyvin. Melkein perillä.",
    "{done} tehty. Olet jo todella lähellä.",
  ],
  last: [
    "Vielä yksi vaihe, niin olet valmis.",
    "Tee viimeinen loppuun ja mene läpäisemään koe.",
    "Olet tullut liian pitkälle lopettaaksesi nyt.",
    "Viimeinen. Sinä pystyt tähän.",
  ],
  done: [
    "Työ on tehty. Mene läpäisemään koe.",
    "Kaikki {total} tehty. Paremmin ei voi valmistautua.",
    "Siinä kaikki. Nyt on oikean kokeen vuoro.",
    "Täällä ei ole enää tehtävää. Mene läpäisemään.",
  ],
};

const hu: Pool = {
  start: [
    "Minden lépéssel közelebb kerülsz ahhoz, hogy elsőre átmenj.",
    "Kezdd az 1. lépéssel. Mindegyik számít.",
    "Menj végig a listán, és felkészülten érkezel.",
    "A lépések itt vannak. A vizsgád vár.",
  ],
  early: [
    "Jó kezdés. Minden lépéssel többet tudsz.",
    "Elkezdted. Ez a legnehezebb része.",
    "{done} kész, {left} van hátra. Jó úton jársz.",
    "Szépen haladsz. Pipáld ki a többit is.",
  ],
  mid: [
    "{total}-ból {done} kész. Már nagyon sokat tudsz.",
    "A második fele gyorsabban megy. Csak így tovább.",
    "Jól állsz. Ne hagyd abba.",
    "Már többet tudsz, mint a legtöbben, akik erre a vizsgára mennek.",
  ],
  late: [
    "Még {left}, és teljesen felkészültél.",
    "Innen már látszik a cél.",
    "Nagyon jól csinálod. Mindjárt kész.",
    "{done} kész. Már nagyon közel vagy.",
  ],
  last: [
    "Még egy lépés, és kész vagy.",
    "Fejezd be az utolsót, és menj átmenni a vizsgán.",
    "Túl messzire jutottál ahhoz, hogy most megállj.",
    "Az utolsó. Menni fog.",
  ],
  done: [
    "Megtetted, amit kellett. Menj és vizsgázz le.",
    "Mind a {total} kész. Ennél jobban nem lehet felkészülni.",
    "Ennyi volt. Jöhet az igazi vizsga.",
    "Itt már nincs több teendő. Menj és vizsgázz le.",
  ],
};

const ro: Pool = {
  start: [
    "Fiecare pas te aduce mai aproape de a lua examenul din prima.",
    "Începe cu pasul 1. Fiecare contează.",
    "Parcurge lista și vei fi pregătit.",
    "Pașii sunt aici. Examenul te așteaptă.",
  ],
  early: [
    "Început bun. Cu fiecare pas știi mai mult.",
    "Ai început. Asta e partea cea mai grea.",
    "{done} făcuți, mai sunt {left}. Ești pe drumul bun.",
    "Mergi bine. Bifează-i mai departe.",
  ],
  mid: [
    "{done} din {total} făcuți. Știi deja foarte mult.",
    "A doua jumătate merge mai repede. Continuă.",
    "Stai bine. Nu te opri.",
    "Știi deja mai mult decât majoritatea celor care dau acest examen.",
  ],
  late: [
    "Încă {left} și ești complet pregătit.",
    "De aici se vede linia de sosire.",
    "Te descurci foarte bine. Aproape gata.",
    "{done} făcuți. Ești foarte aproape.",
  ],
  last: [
    "Încă un pas și ești gata.",
    "Termină-l pe ultimul și du-te să iei examenul.",
    "Ai ajuns prea departe ca să te oprești acum.",
    "Ultimul. Poți.",
  ],
  done: [
    "Ai făcut treaba. Du-te și ia examenul.",
    "Toți cei {total} sunt gata. Mai pregătit de atât nu se poate.",
    "Asta e tot. Urmează examenul adevărat.",
    "Aici nu mai e nimic de făcut. Du-te și ia examenul.",
  ],
};

const el: Pool = {
  start: [
    "Κάθε βήμα σε φέρνει πιο κοντά στο να περάσεις με την πρώτη.",
    "Ξεκίνα από το βήμα 1. Όλα μετράνε.",
    "Ακολούθησε τη λίστα και θα είσαι έτοιμος.",
    "Τα βήματα είναι εδώ. Η εξέτασή σου περιμένει.",
  ],
  early: [
    "Καλή αρχή. Με κάθε βήμα μαθαίνεις κάτι.",
    "Ξεκίνησες. Αυτό είναι το πιο δύσκολο.",
    "Έγιναν {done}, μένουν {left}. Είσαι σε καλό δρόμο.",
    "Πας καλά. Συνέχισε να τα τσεκάρεις.",
  ],
  mid: [
    "Έγιναν {done} από {total}. Ξέρεις ήδη πολλά.",
    "Το δεύτερο μισό πάει πιο γρήγορα. Συνέχισε.",
    "Είσαι σε καλή θέση. Μην το αφήνεις.",
    "Ξέρεις ήδη περισσότερα από τους περισσότερους που δίνουν αυτή την εξέταση.",
  ],
  late: [
    "Άλλα {left} και είσαι απόλυτα έτοιμος.",
    "Από εδώ φαίνεται ο τερματισμός.",
    "Τα πας πολύ καλά. Σχεδόν τελείωσες.",
    "Έγιναν {done}. Είσαι πολύ κοντά.",
  ],
  last: [
    "Ένα βήμα ακόμα και είσαι έτοιμος.",
    "Τελείωσε το τελευταίο και πήγαινε να περάσεις.",
    "Έφτασες πολύ μακριά για να σταματήσεις τώρα.",
    "Το τελευταίο. Το έχεις.",
  ],
  done: [
    "Έκανες τη δουλειά. Πήγαινε να περάσεις την εξέταση.",
    "Και τα {total} έγιναν. Πιο έτοιμος δεν γίνεται.",
    "Αυτό ήταν όλο. Ώρα για την πραγματική εξέταση.",
    "Εδώ δεν μένει τίποτα άλλο. Πήγαινε να περάσεις.",
  ],
};

const POOLS: Record<Language, Pool> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt, sv, da, fi, hu, ro, el };

/** How many lines a stage has to pick from: the exam's own plus four shared. */
export const HERO_VARIANTS = 5;

export function heroStage(done: number, total: number): HeroStage {
  if (done <= 0 || total <= 0) return "start";
  if (done >= total) return "done";
  if (done === total - 1) return "last";
  const frac = done / total;
  if (frac < 0.4) return "early";
  if (frac < 0.7) return "mid";
  return "late";
}

/** Which of an exam's five heroSubs belongs to each stage. */
const OWN_LINE: Record<HeroStage, number> = { start: 0, early: 1, mid: 2, late: 3, last: 3, done: 4 };

/**
 * The hero line for this visit. `variant` is 0 to HERO_VARIANTS - 1
 * (useHeroVariant): 0 is the exam's own line for the stage, so the server
 * render and the first client render agree, and 1 to 4 are the shared ones.
 */
export function heroLine(
  own: readonly string[],
  done: number,
  total: number,
  variant: number,
  lang: Language = "en"
): string {
  const stage = heroStage(done, total);
  const ownLine = own[OWN_LINE[stage]] ?? own[0] ?? "";
  if (variant <= 0) return ownLine;
  const pool = POOLS[lang] ?? en;
  const line = pool[stage][(variant - 1) % pool[stage].length];
  return line
    .replace("{done}", String(done))
    .replace("{left}", String(total - done))
    .replace("{total}", String(total));
}
