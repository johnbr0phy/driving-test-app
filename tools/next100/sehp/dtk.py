# DTK (diagram, tabeller och kartor). Original, invented data; diagrams and maps
# are given as tables with a sentence saying what the figure shows. Key first;
# all-number options are sorted and locked by the build.

STIMULI = [
    {"id": "SEHP-T1-D1", "title": "Hushållsavfall i en kommun", "text": (
        "Tabellen visar hur många kilogram avfall per invånare som hushållen i en kommun lämnade 2022 och 2024, fördelat på avfallsslag.\n\n"
        "| Avfallsslag | 2022 (kg) | 2024 (kg) |\n|---|---|---|\n"
        "| Matavfall | 96 | 84 |\n| Pappersförpackningar | 58 | 62 |\n| Plastförpackningar | 22 | 26 |\n"
        "| Glas | 20 | 18 |\n| Restavfall | 164 | 150 |\n| Totalt | 360 | 340 |")},
    {"id": "SEHP-T1-D2", "title": "Besökare på ett museum", "text": (
        "Stapeldiagrammet visar antalet besökare på ett museum under varje kvartal 2025, i tusental, och hur stor andel av besökarna som var barn. "
        "Här återges diagrammets värden i en tabell.\n\n"
        "| Kvartal | Besökare (tusental) | Andel barn |\n|---|---|---|\n"
        "| 1 | 18 | 20 % |\n| 2 | 24 | 25 % |\n| 3 | 36 | 50 % |\n| 4 | 22 | 15 % |")},
    {"id": "SEHP-T1-D3", "title": "Vägar mellan fem orter", "text": (
        "Kartan visar fem orter, Ås, Berg, Dal, Ek och Fors, och vägarna mellan dem. Varje väg går direkt mellan två orter utan att passera "
        "någon annan ort. Tabellen anger vägarnas längder. Orter som inte står i samma rad har ingen direkt väg mellan sig.\n\n"
        "| Väg | Längd (km) |\n|---|---|\n"
        "| Ås till Berg | 24 |\n| Ås till Ek | 15 |\n| Berg till Ek | 12 |\n| Berg till Dal | 18 |\n"
        "| Ek till Dal | 30 |\n| Ek till Fors | 40 |\n| Dal till Fors | 22 |")},
    {"id": "SEHP-T1-D4", "title": "Väder på en ort", "text": (
        "Diagrammet visar medeltemperaturen (linje) och nederbörden (staplar) månad för månad under första halvåret ett visst år på en ort i "
        "Norrland. Värdena återges i tabellen.\n\n"
        "| Månad | Medeltemperatur (°C) | Nederbörd (mm) |\n|---|---|---|\n"
        "| Januari | -4 | 42 |\n| Februari | -5 | 30 |\n| Mars | -1 | 33 |\n"
        "| April | 4 | 35 |\n| Maj | 10 | 41 |\n| Juni | 15 | 60 |")},
    {"id": "SEHP-T2-D1", "title": "Sökande och antagna", "text": (
        "Tabellen visar antalet sökande och antagna till fyra utbildningar vid ett lärosäte ett visst år, och hur stor andel av de antagna som var kvinnor.\n\n"
        "| Utbildning | Sökande | Antagna | Andel kvinnor bland antagna |\n|---|---|---|---|\n"
        "| Sjuksköterskeprogrammet | 2 400 | 300 | 85 % |\n| Civilingenjörsprogrammet | 1 800 | 450 | 30 % |\n"
        "| Juristprogrammet | 3 000 | 250 | 60 % |\n| Lärarprogrammet | 1 200 | 400 | 70 % |")},
    {"id": "SEHP-T2-D2", "title": "En kommuns budget", "text": (
        "Cirkeldiagrammet visar hur en kommun fördelade sin budget på 2,4 miljarder kronor ett visst år. Sektorernas andelar återges i tabellen.\n\n"
        "| Sektor | Andel av budgeten |\n|---|---|\n"
        "| Skola | 40 % |\n| Äldreomsorg | 25 % |\n| Socialtjänst | 15 % |\n| Kultur och fritid | 5 % |\n| Övrigt | 15 % |")},
    {"id": "SEHP-T2-D3", "title": "Tåg mellan fyra stationer", "text": (
        "Tabellen är ett utdrag ur en tidtabell för ett regionaltåg. Tåget stannar vid alla fyra stationerna. Avståndet längs spåret är "
        "22 km från Norrby till Mellanå, 36 km från Mellanå till Sörvik och 27 km från Sörvik till Västerå.\n\n"
        "| Station | Tåg 1 | Tåg 2 |\n|---|---|---|\n"
        "| Norrby, avgång | 07.12 | 08.42 |\n| Mellanå, avgång | 07.31 | 09.01 |\n"
        "| Sörvik, avgång | 07.58 | 09.28 |\n| Västerå, ankomst | 08.20 | 09.50 |")},
    {"id": "SEHP-T2-D4", "title": "Befolkning i fyra kommuner", "text": (
        "Tabellen visar folkmängden 2015 och 2025 i fyra kommuner och kommunernas landyta.\n\n"
        "| Kommun | Folkmängd 2015 | Folkmängd 2025 | Landyta (km²) |\n|---|---|---|---|\n"
        "| Alby | 12 000 | 15 000 | 300 |\n| Bergsjö | 40 000 | 38 000 | 800 |\n"
        "| Cedertorp | 8 000 | 9 600 | 120 |\n| Dalvik | 25 000 | 27 500 | 2 500 |")},
    {"id": "SEHP-D-D1", "title": "Försäljning i en butik", "text": (
        "Tabellen visar hur många exemplar av tre produkter, X, Y och Z, som en butik sålde under fyra veckor.\n\n"
        "| Vecka | X | Y | Z |\n|---|---|---|---|\n"
        "| 1 | 120 | 80 | 40 |\n| 2 | 100 | 95 | 55 |\n| 3 | 90 | 110 | 60 |\n| 4 | 110 | 115 | 75 |")},
    {"id": "SEHP-D-D2", "title": "Cykla till jobbet", "text": (
        "Diagrammet visar hur stor andel av de förvärvsarbetande i en stad som oftast cyklade till arbetet 2016 och 2026, fördelat på åldersgrupper. "
        "Värdena återges i tabellen.\n\n"
        "| Åldersgrupp | 2016 | 2026 |\n|---|---|---|\n"
        "| 16 till 29 år | 18 % | 24 % |\n| 30 till 49 år | 14 % | 21 % |\n| 50 till 64 år | 10 % | 12 % |\n| Över 64 år | 4 % | 9 % |")},
]

ITEMS = {
    1: [
        DTK(2, "SEHP-T1-D1", "Ungefär hur många procent minskade restavfallet per invånare från 2022 till 2024?",
            ["9 %", "14 %", "5 %", "12 %"],
            "Minskningen är $164 - 150 = 14$ kg, och $\\frac{14}{164} \\approx 0{,}085$, alltså ungefär 9 %. Svaret 14 % blandar ihop kilogram och procent."),
        DTK(2, "SEHP-T1-D1", "Vilket avfallsslag ökade mest i procent från 2022 till 2024?",
            ["Plastförpackningar", "Pappersförpackningar", "Glas", "Matavfall"],
            "Både plast och papper ökade med 4 kg, men plasten från en lägre nivå: $\\frac{4}{22} \\approx 18$ % mot $\\frac{4}{58} \\approx 7$ %. Glas och matavfall minskade."),
        DTK(3, "SEHP-T1-D1", "Ungefär hur stor andel av hushållens totala avfall var matavfall 2024?",
            ["25 %", "27 %", "20 %", "30 %"],
            "$\\frac{84}{340} \\approx 0{,}247$, alltså ungefär 25 %. 27 % är andelen 2022, $\\frac{96}{360}$."),
        DTK(2, "SEHP-T1-D2", "Hur många barn besökte museet under kvartal 3?",
            ["18 000", "12 000", "9 000", "7 200"],
            "36 000 besökare varav 50 % barn ger 18 000. 7 200 får den som använder andelen 20 % från kvartal 1."),
        DTK(2, "SEHP-T1-D2", "Hur stor andel av årets besökare kom under kvartal 3?",
            ["36 %", "24 %", "22 %", "18 %"],
            "Årets besökare var $18 + 24 + 36 + 22 = 100$ tusen, så kvartal 3 med 36 tusen stod för 36 %."),
        DTK(3, "SEHP-T1-D2", "Under vilket kvartal var antalet vuxna besökare störst?",
            ["Kvartal 4", "Kvartal 3", "Kvartal 2", "Kvartal 1"],
            "Vuxna är besökarna minus barnen: kvartal 1 $18 \\cdot 0{,}8 = 14{,}4$, kvartal 2 $24 \\cdot 0{,}75 = 18$, kvartal 3 $36 \\cdot 0{,}5 = 18$ och kvartal 4 $22 \\cdot 0{,}85 = 18{,}7$ tusen. Kvartal 3 hade flest besökare totalt men hälften var barn."),
        DTK(1, "SEHP-T1-D3", "Hur lång är den kortaste vägen från Ås till Dal?",
            ["42 km", "45 km", "48 km", "66 km"],
            "Ås till Berg till Dal är $24 + 18 = 42$ km. Via Ek blir det $15 + 30 = 45$ km, och via Ek och Berg $15 + 12 + 18 = 45$ km."),
        DTK(2, "SEHP-T1-D3", "Hur lång är den kortaste vägen från Ås till Fors?",
            ["55 km", "62 km", "64 km", "67 km"],
            "Via Ek: $15 + 40 = 55$ km. Via Berg och Dal: $24 + 18 + 22 = 64$ km. Den direkta vägen från Ek är kortast trots att den är 40 km lång."),
        DTK(1, "SEHP-T1-D3", "Hur många vägar i tabellen utgår från Ek?",
            ["4", "3", "2", "5"],
            "Ek har vägar till Ås, Berg, Dal och Fors, alltså fyra."),
        DTK(2, "SEHP-T1-D4", "Under vilken månad steg medeltemperaturen mest jämfört med månaden innan?",
            ["Maj", "April", "Juni", "Mars"],
            "Ökningarna är mars 4, april 5, maj 6 och juni 5 grader. Maj har den största ökningen."),
        DTK(1, "SEHP-T1-D4", "Hur stor var den sammanlagda nederbörden från januari till juni?",
            ["241 mm", "231 mm", "251 mm", "221 mm"],
            "$42 + 30 + 33 + 35 + 41 + 60 = 241$ mm."),
        DTK(3, "SEHP-T1-D4", "Vilket värde ligger närmast medelvärdet av de sex månadernas medeltemperaturer?",
            ["3 grader", "5 grader", "6 grader", "1 grad"],
            "Summan är $-4 - 5 - 1 + 4 + 10 + 15 = 19$, och $\\frac{19}{6} \\approx 3{,}2$ grader. 5 grader är mitten mellan lägsta och högsta värdet, inte medelvärdet."),
    ],
    2: [
        DTK(1, "SEHP-T2-D1", "Vilken utbildning hade flest sökande per antagen?",
            ["Juristprogrammet", "Sjuksköterskeprogrammet", "Civilingenjörsprogrammet", "Lärarprogrammet"],
            "Sökande per antagen: sjuksköterska $\\frac{2\\,400}{300} = 8$, civilingenjör 4, juristprogrammet $\\frac{3\\,000}{250} = 12$ och lärare 3."),
        DTK(2, "SEHP-T2-D1", "Hur många kvinnor antogs sammanlagt till de fyra utbildningarna?",
            ["820", "860", "870", "920"],
            "$0{,}85 \\cdot 300 + 0{,}30 \\cdot 450 + 0{,}60 \\cdot 250 + 0{,}70 \\cdot 400 = 255 + 135 + 150 + 280 = 820$."),
        DTK(2, "SEHP-T2-D1", "Ungefär hur stor andel av alla antagna antogs till lärarutbildningen?",
            ["29 %", "25 %", "17 %", "33 %"],
            "Totalt antogs $300 + 450 + 250 + 400 = 1\\,400$, och $\\frac{400}{1\\,400} \\approx 0{,}29$. 17 % är lärarnas andel av de sökande."),
        DTK(1, "SEHP-T2-D2", "Hur många miljoner kronor gick till äldreomsorgen?",
            ["600", "250", "960", "240"],
            "25 % av 2 400 miljoner kronor är 600 miljoner. 960 miljoner är skolans del, 40 %."),
        DTK(2, "SEHP-T2-D2", "Hur många gånger så mycket gick till skolan som till kultur och fritid?",
            ["8", "4", "6", "5"],
            "$\\frac{40}{5} = 8$. Kvoten mellan andelarna är densamma som kvoten mellan beloppen."),
        DTK(3, "SEHP-T2-D2", "Hur många miljoner kronor mer hade kultur och fritid fått om sektorns andel hade varit lika stor som socialtjänstens?",
            ["240", "120", "360", "480"],
            "Skillnaden är 10 procentenheter, och 10 % av 2 400 miljoner är 240 miljoner."),
        DTK(1, "SEHP-T2-D3", "Hur många minuter tar resan från Norrby till Västerå med tåg 1?",
            ["68", "58", "78", "108"],
            "Från 07.12 till 08.20 är 48 minuter fram till 08.00 plus 20 minuter, alltså 68 minuter. 108 får den som räknar timmen som 100 minuter."),
        DTK(2, "SEHP-T2-D3", "Vilken är tågets medelhastighet mellan Mellanå och Sörvik?",
            ["80 km/h", "72 km/h", "65 km/h", "60 km/h"],
            "Tåget kör 36 km på 27 minuter, alltså $\\frac{36}{27} \\cdot 60 = 80$ km/h."),
        DTK(3, "SEHP-T2-D3", "På vilken sträcka har tåget lägst medelhastighet?",
            ["Norrby till Mellanå", "Mellanå till Sörvik", "Sörvik till Västerå", "Lika på alla sträckor"],
            "Norrby till Mellanå: 22 km på 19 minuter, ungefär 69 km/h. Mellanå till Sörvik: 80 km/h. Sörvik till Västerå: 27 km på 22 minuter, ungefär 74 km/h."),
        DTK(1, "SEHP-T2-D4", "Vilken kommun hade störst procentuell befolkningsökning från 2015 till 2025?",
            ["Alby", "Cedertorp", "Dalvik", "Bergsjö"],
            "Alby ökade med $\\frac{3\\,000}{12\\,000} = 25$ %, Cedertorp med 20 % och Dalvik med 10 %. Bergsjö minskade. Alby ökade också mest i antal, 3 000 mot Dalviks 2 500."),
        DTK(2, "SEHP-T2-D4", "Hur många invånare per kvadratkilometer hade Cedertorp 2025?",
            ["80", "67", "50", "75"],
            "$\\frac{9\\,600}{120} = 80$. 67 är tätheten 2015, $\\frac{8\\,000}{120}$."),
        DTK(3, "SEHP-T2-D4", "Hur mycket större var de fyra kommunernas sammanlagda folkmängd 2025 än 2015?",
            ["5 100", "5 000", "3 100", "7 100"],
            "2015: $12\\,000 + 40\\,000 + 8\\,000 + 25\\,000 = 85\\,000$. 2025: $15\\,000 + 38\\,000 + 9\\,600 + 27\\,500 = 90\\,100$. Skillnaden är 5 100. 7 100 får den som bara räknar med de tre kommuner som växte och hoppar över Bergsjö."),
    ],
    0: [
        DTK(1, "SEHP-D-D1", "Under vilken vecka sålde butiken flest exemplar sammanlagt?",
            ["Vecka 4", "Vecka 3", "Vecka 2", "Vecka 1"],
            "Summorna är 240, 250, 260 och 300 för vecka 1 till 4."),
        DTK(2, "SEHP-D-D1", "Ungefär hur många procent fler exemplar av Y såldes vecka 4 än vecka 1?",
            ["44 %", "35 %", "30 %", "70 %"],
            "Ökningen är $115 - 80 = 35$ exemplar, och $\\frac{35}{80} \\approx 0{,}44$. 30 % får den som delar med 115 i stället för 80."),
        DTK(2, "SEHP-D-D1", "Under hur många av veckorna såldes fler exemplar av Y än av X?",
            ["2", "1", "3", "4"],
            "Vecka 3 (110 mot 90) och vecka 4 (115 mot 110)."),
        DTK(2, "SEHP-D-D2", "Vilken åldersgrupp ökade sin andel cyklister mest räknat i procentenheter?",
            ["30 till 49 år", "16 till 29 år", "Över 64 år", "50 till 64 år"],
            "Ökningarna är 6, 7, 2 och 5 procentenheter. 30 till 49 år ökade mest med 7."),
        DTK(3, "SEHP-D-D2", "Vilken åldersgrupp ökade sin andel cyklister mest räknat i procent?",
            ["Över 64 år", "30 till 49 år", "16 till 29 år", "50 till 64 år"],
            "Från 4 till 9 % är en ökning med 125 %. 30 till 49 år ökade med 50 % och 16 till 29 år med 33 %."),
        DTK(2, "SEHP-D-D2", "I staden arbetade 40 000 personer i åldern 30 till 49 år 2026. Hur många av dem cyklade oftast till arbetet?",
            ["8 400", "5 600", "2 800", "4 200"],
            "21 % av 40 000 är 8 400. 5 600 är 14 %, andelen 2016."),
    ],
}
