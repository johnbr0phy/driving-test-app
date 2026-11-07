# ELF (engelsk läsförståelse). Original English texts and items, key first; the
# build shuffles. Questions and options in English as on the real delprov;
# explanations in Swedish.

STIMULI = [
    {"id": "SEHP-T1-E1", "title": "Waiting in line", "text": (
        "Few experiences are as universally disliked as waiting in a queue, yet research on queues suggests that the length of the wait "
        "matters less than how the wait feels. People consistently overestimate time spent waiting when they have nothing to do, and they "
        "tolerate long waits better when they know roughly how long the wait will be. An unexplained delay of ten minutes can feel worse than "
        "an announced delay of twenty.\n\n"
        "Fairness matters too. Shoppers in a store with several separate checkout lines often feel cheated when a neighbouring line moves "
        "faster, even if their own wait is short. A single line that feeds several counters is, on average, no faster, but it removes the "
        "sense that someone else has been luckier. For this reason, many banks and airports adopted single lines long before anyone measured "
        "whether customers actually spent less time in them.\n\n"
        "None of this means that operators can ignore the length of the wait. Distractions and information soften a moderate delay; they do "
        "little for a wait that is simply too long.")},
    {"id": "SEHP-T1-E2", "title": "Lights in the night", "text": (
        "Every spring and autumn, billions of birds migrate at night, navigating partly by the stars. Artificial light confuses them. Brightly "
        "lit buildings draw birds off course, and many die in collisions with glass or circle the lights until they are exhausted. In some "
        "cities, a single tall building has been found to cause hundreds of deaths in one season.\n\n"
        "The remedy is unusually cheap. Several cities now ask building owners to switch off or dim unnecessary lights during the peak "
        "weeks of migration, and the results have been encouraging. The challenge is less technical than practical: someone has to remember "
        "to do it, night after night, in buildings where no one may be responsible for the lights.")},
    {"id": "SEHP-T1-E3", "title": "Translating a joke", "text": (
        "Translators often say that humour is the hardest thing to carry across languages. A pun depends on two meanings sharing one sound, "
        "and the coincidence rarely survives translation. Faced with such a passage, a translator must decide what to keep: the literal "
        "meaning, which loses the joke, or the joke, which may require inventing a new pun with a different meaning altogether.\n\n"
        "Many translators choose the second option, arguing that a reader of the original laughed at that point and a reader of the "
        "translation deserves to laugh as well. Critics reply that this gives the translator too much freedom. The debate has no settled "
        "answer, but it reveals a broader truth: every translation is a series of choices about what matters most in a text.")},
    {"id": "SEHP-T2-E1", "title": "Bees on the roof", "text": (
        "Urban beekeeping has grown rapidly in recent years. Hives now sit on hotel roofs, office terraces and school buildings, and many "
        "people see them as a simple way to help pollinators in decline. Ecologists, however, have begun to urge caution.\n\n"
        "The bees in these hives are honeybees, a managed species kept for honey. The pollinators that are actually declining are mostly "
        "wild bees, many of which live alone and nest in the ground or in hollow stems. When too many honeybee hives are placed in a small "
        "area, the honeybees may compete with wild bees for the same flowers. In parts of some cities, researchers have estimated that the "
        "number of hives already exceeds what the local flowers can support.\n\n"
        "The ecologists' advice is not to abandon beekeeping but to plant first. A city that adds flowering plants and leaves patches of "
        "bare ground helps every kind of bee; a city that only adds hives may help one kind at the expense of others.")},
    {"id": "SEHP-T2-E2", "title": "The office question", "text": (
        "When large numbers of office workers began working from home, some predicted the slow decline of city centres. Shops and cafés that "
        "depended on lunchtime crowds did suffer. Yet the picture that has since emerged is mixed. Many employees now divide their week between "
        "home and office, and city centres have become busiest on the middle days of the week and quieter on Mondays and Fridays.\n\n"
        "This rhythm creates its own problems. Companies hesitate to give up office space they need on Wednesdays but not on Fridays, and "
        "public transport must still be built for peak days. Some planners now argue that the most useful change would be to convert part of "
        "the surplus office space into housing, so that city centres have residents every day of the week.")},
    {"id": "SEHP-T2-E3", "title": "Notes by hand", "text": (
        "Students who take notes on a laptop can type far more than those who write by hand, and one might expect that this would help them "
        "learn. Several studies have suggested the opposite. Because writing by hand is slow, students cannot record a lecture word for word; "
        "they are forced to choose what matters and put it in their own words. That act of selection appears to aid understanding.\n\n"
        "Later studies have found the effect smaller than first reported, and some found none at all. What seems clear is that the method "
        "matters less than the mental work it encourages. A student who types summaries rather than transcripts may gain the same benefit.")},
    {"id": "SEHP-D-E1", "title": "The cheap book", "text": (
        "For most of the history of printing, books were expensive objects, bound in leather or cloth and bought by a relatively small public. "
        "The modern paperback changed this. Printed in large numbers on cheap paper and sold in railway stations and newsagents as well as "
        "bookshops, it put serious literature within reach of readers who had never set foot in a bookshop.\n\n"
        "Not everyone welcomed the change. Some publishers feared that cheap editions would ruin the market for expensive ones, and some "
        "critics worried that books would be treated as disposable. Both fears proved largely unfounded: the paperback expanded the market "
        "rather than dividing it.")},
    {"id": "SEHP-D-E2", "title": "Ice that remembers", "text": (
        "Deep inside the ice sheets of Greenland and Antarctica lie layers of snow that fell thousands of years ago. As each year's snow was "
        "buried and compressed, it trapped tiny bubbles of air. By drilling cores of this ice and analysing the bubbles, scientists can measure "
        "the composition of the atmosphere long before anyone recorded it.\n\n"
        "The method has limits. Near the bottom of an ice sheet, the layers are squeezed so thin that individual years can no longer be told "
        "apart, and heat from the bedrock may melt the oldest ice altogether. Finding places where very old ice survives undisturbed has "
        "therefore become a project in itself.")},
]

ITEMS = {
    1: [
        ELF(1, "SEHP-T1-E1", "According to the text, what matters more than the actual length of a wait?",
            ["How the wait is experienced", "How many people are waiting", "Where the queue is located", "Who is serving the customers"],
            "Texten säger redan i första meningen att väntans längd betyder mindre än hur väntan känns. Antalet personer i kön nämns inte."),
        ELF(2, "SEHP-T1-E1", "Why can an unexplained ten-minute delay feel worse than an announced twenty-minute one?",
            ["Knowing the length makes waits easier", "Short delays are usually caused by mistakes",
             "Announced delays tend to end early", "People pay more attention to short delays"],
            "Texten säger att människor tål långa väntetider bättre när de ungefär vet hur länge de ska vänta. Det är ovissheten som gör den oförklarade väntan värre."),
        ELF(2, "SEHP-T1-E1", "What advantage of a single line feeding several counters does the text mention?",
            ["No one seems to be luckier than others", "It shortens the average wait considerably",
             "It needs fewer staff at each counter", "It was proven faster before it was adopted"],
            "En enda kö är enligt texten i genomsnitt inte snabbare, men den tar bort känslan av att någon annan haft mer tur. Den infördes innan någon mätt väntetiden."),
        ELF(3, "SEHP-T1-E1", "What is the main point of the final paragraph?",
            ["Making a wait feel shorter has limits", "Long waits are mostly the customers' fault",
             "Information is more useful than distraction", "Operators should stop measuring waiting times"],
            "Sista stycket säger att distraktioner och information mildrar en måttlig väntan men hjälper föga när väntan helt enkelt är för lång."),
        ELF(1, "SEHP-T1-E2", "Why are migrating birds harmed by brightly lit buildings?",
            ["The light draws them off their course", "The light makes them fly faster",
             "The buildings block their view of the ground", "The buildings are often warmer than the air"],
            "Fåglarna navigerar delvis efter stjärnorna, och starkt ljus drar dem ur kurs så att de kolliderar med glas eller cirklar tills de är utmattade."),
        ELF(2, "SEHP-T1-E2", "What does the text say about the cost of reducing the problem?",
            ["It is unusually low", "It is too high for most cities",
             "It is paid by the bird societies", "It has not yet been calculated"],
            "Texten säger \"The remedy is unusually cheap\": att släcka eller dämpa onödiga lampor under flyttningens toppveckor."),
        ELF(3, "SEHP-T1-E2", "What does the writer see as the main obstacle?",
            ["Remembering to switch lights off", "Developing new lighting technology",
             "Persuading cities to adopt the measure", "Measuring how many birds are killed"],
            "Utmaningen är enligt texten mer praktisk än teknisk: någon måste komma ihåg att släcka, natt efter natt, i byggnader där kanske ingen ansvarar för ljuset."),
        ELF(1, "SEHP-T1-E3", "Why are puns especially hard to translate?",
            ["They rely on one sound with two meanings", "They are often offensive in other cultures",
             "They are usually very long", "Translators rarely notice them"],
            "En ordvits bygger på att två betydelser delar samma ljud, och den slumpen överlever sällan en översättning."),
        ELF(2, "SEHP-T1-E3", "How do many translators justify inventing a new pun?",
            ["Readers of a translation deserve to laugh too", "The literal meaning of a pun is unimportant",
             "Authors usually ask them to do so", "New puns are easier to write than translations"],
            "Texten återger argumentet att läsaren av originalet skrattade på det stället och att läsaren av översättningen förtjänar att också göra det."),
        ELF(3, "SEHP-T1-E3", "What broader point does the writer draw from the debate?",
            ["Every translation is a series of choices", "Humour should be left out of translations",
             "Critics are right to limit translators' freedom", "Literal translation is usually best"],
            "Sista meningen säger att varje översättning är en serie val om vad som är viktigast i en text. Författaren tar inte ställning i själva debatten."),
    ],
    2: [
        ELF(1, "SEHP-T2-E1", "Which bees, according to the text, are mostly in decline?",
            ["Wild bees", "Honeybees", "Bees kept on roofs", "Bees that make honey"],
            "Texten säger att de pollinerare som minskar mest är vilda bin, ofta solitära och marklevande. Honungsbin är en hållen art."),
        ELF(2, "SEHP-T2-E1", "What problem can too many hives in a small area cause?",
            ["Less food for wild bees", "Less honey from each hive",
             "Wild bees moving into hives", "Damage to roofs and buildings"],
            "Enligt texten kan honungsbin konkurrera med vilda bin om samma blommor när det står för många kupor på en liten yta."),
        ELF(3, "SEHP-T2-E1", "What is the ecologists' main recommendation?",
            ["Plant flowers before adding hives", "Ban beekeeping in all city centres",
             "Replace honeybees with wild bees", "Move hives from roofs to parks"],
            "Ekologernas råd är att inte överge biodlingen utan att plantera först, eftersom blommor och bar mark hjälper alla sorters bin."),
        ELF(2, "SEHP-T2-E1", "What does the word \"managed\" suggest about honeybees in the text?",
            ["They are kept and cared for by people", "They are able to organise their own colonies",
             "They are controlled by law", "They are able to survive anywhere"],
            "Texten kallar honungsbiet \"a managed species kept for honey\", en art som människor håller och sköter, i motsats till de vilda bina."),
        ELF(1, "SEHP-T2-E2", "How has the pattern of city centre activity changed, according to the text?",
            ["It peaks in the middle of the week", "It has fallen equally on all days",
             "It is now highest on Mondays and Fridays", "It is unchanged since before remote work"],
            "Texten säger att stadskärnorna blivit livligast mitt i veckan och lugnare på måndagar och fredagar."),
        ELF(2, "SEHP-T2-E2", "Why are companies reluctant to reduce their office space?",
            ["They still need it on the busiest days", "Their leases cannot be ended before they expire",
             "Their staff prefer large offices", "Office rents have fallen sharply"],
            "Företagen tvekar att lämna lokaler som de behöver på onsdagar men inte på fredagar, alltså de mest belagda dagarna."),
        ELF(3, "SEHP-T2-E2", "What do some planners suggest as the most useful change?",
            ["Turning surplus offices into homes", "Running fewer trains on peak days",
             "Banning remote work on Fridays", "Building more shops and cafés in the centre"],
            "Vissa planerare vill göra om en del av de överflödiga kontoren till bostäder, så att stadskärnan har invånare alla dagar."),
        ELF(1, "SEHP-T2-E3", "Why, according to some studies, might writing notes by hand aid learning?",
            ["It makes students choose and rephrase", "It lets students record more words",
             "It is less tiring than typing", "It keeps students away from the internet"],
            "Handskrift är långsam, så studenterna måste välja ut det viktiga och formulera det med egna ord, och det urvalet verkar gynna förståelsen."),
        ELF(2, "SEHP-T2-E3", "What did later studies find?",
            ["The effect was smaller or absent", "The effect was larger than first reported",
             "Laptops harmed learning in every case", "Handwriting helped only in mathematics"],
            "Senare studier fann effekten mindre än först rapporterat, och vissa fann ingen effekt alls."),
        ELF(3, "SEHP-T2-E3", "What conclusion does the writer reach?",
            ["The mental work matters more than the tool", "Laptops should be banned in lectures",
             "Handwriting is always better than typing notes", "Transcripts are the best kind of notes"],
            "Författaren menar att metoden betyder mindre än det tankearbete den uppmuntrar, och att en student som skriver sammanfattningar på dator kan få samma nytta."),
    ],
    0: [
        ELF(1, "SEHP-D-E1", "What made the paperback different from earlier books?",
            ["It was cheap and widely sold", "It was bound in leather or cloth",
             "It was written for a small public", "It contained only light fiction"],
            "Pocketboken trycktes i stora upplagor på billigt papper och såldes även i järnvägsstationer och tidningskiosker. Läder och tyg beskriver de äldre böckerna."),
        ELF(2, "SEHP-D-E1", "What did some publishers fear?",
            ["Losing sales of expensive editions", "Bookshops refusing to stock paperbacks",
             "Readers giving up serious literature", "Paper becoming too costly to print"],
            "Vissa förläggare befarade att billiga utgåvor skulle förstöra marknaden för dyra utgåvor."),
        ELF(3, "SEHP-D-E1", "What does the writer conclude about those fears?",
            ["They were mostly mistaken", "They were fully justified",
             "They have not yet been tested", "They applied only to critics"],
            "Texten säger att båda farhågorna i stort sett visade sig obefogade: pocketboken utvidgade marknaden i stället för att dela den."),
        ELF(1, "SEHP-D-E2", "How do scientists learn about the atmosphere of the distant past?",
            ["By analysing air trapped in old ice", "By reading early weather records",
             "By measuring the thickness of glaciers", "By studying rocks under the ice"],
            "Snö som begravdes och pressades ihop fångade små luftbubblor, och genom att analysera dem i iskärnor kan man mäta atmosfärens sammansättning."),
        ELF(2, "SEHP-D-E2", "Why is the oldest ice hard to use?",
            ["Its layers are squeezed thin or melted", "It contains no air bubbles",
             "It is too hard to drill through", "It lies outside Greenland and Antarctica"],
            "Nära botten pressas skikten så tunna att enskilda år inte går att skilja åt, och värme från berggrunden kan smälta den äldsta isen."),
        ELF(3, "SEHP-D-E2", "What does the final sentence imply?",
            ["Locating suitable old ice takes real effort", "Old ice is no longer worth studying",
             "Most old ice has already been drilled", "Scientists have stopped drilling near bedrock"],
            "Att hitta platser där mycket gammal is finns kvar orörd har blivit \"a project in itself\", alltså ett arbete i sig."),
    ],
}
