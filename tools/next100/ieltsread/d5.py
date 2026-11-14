# Drill-only passages: desalination, and the history of paper money.

D9 = {"id": "IELTSR-D-P09", "title": "Fresh Water from the Sea", "text": (
    "**A** Less than three per cent of the world's water is fresh, and much of that is locked in ice or deep underground. For countries with dry climates and long coastlines, the sea is an obvious alternative source, and desalination, the removal of salt from seawater, now supplies drinking water to millions of people. The process is far from new, but the methods used have changed greatly.\n\n"
    "**B** The oldest method is distillation. Seawater is heated until it turns to vapour, leaving the salt behind, and the vapour is then cooled so that it condenses as fresh water. Sailors used simple versions of this on board ship centuries ago. Large distillation plants are still found in some oil-producing regions, where cheap energy is available, but heating huge volumes of water uses a great deal of fuel.\n\n"
    "**C** Most new plants use reverse osmosis instead. In this process, seawater is pushed at high pressure against a membrane, a thin sheet with pores so small that water molecules can pass through but most dissolved salts cannot. The fresh water collects on one side, and a concentrated salty liquid, known as brine, is left on the other. Because no heating is needed, reverse osmosis generally uses much less energy than distillation, although the pumps that create the pressure still require a large and steady supply of electricity.\n\n"
    "**D** The membranes are delicate and easily blocked. Before seawater reaches them it must pass through a series of filters that remove sand, seaweed and tiny organisms. After treatment, the fresh water is so pure that it lacks the minerals found in natural drinking water, so small amounts of minerals are usually added back before it enters the supply, both for taste and to protect pipes from corrosion.\n\n"
    "**E** The brine creates a further problem. For every litre of fresh water produced, a plant may discharge more than a litre of brine back into the sea. Because brine is heavier than seawater, it can sink and spread along the seabed, where it may harm plants and animals if it is not mixed well. Engineers now design outlets that spread the brine through many small openings so that it mixes quickly with the surrounding water. Some researchers are also exploring ways to extract useful materials from brine, turning a waste product into a resource."
)}

DIAGRAM = ("A diagram of a reverse osmosis unit, described in words: seawater enters on the left under high pressure; "
           "in the middle is a thin {m} with tiny pores; fresh water collects on the right; the concentrated salty liquid left behind, called {b}, flows out on the left.")
D9_ITEMS = [
    TF(1, "Desalination is a recent invention.", "F",
       "Paragraph A says the process is far from new, and Paragraph B says sailors used simple distillation centuries ago."),
    TF(2, "Reverse osmosis membranes must be replaced every year.", "NG",
       "Paragraph D says the membranes are delicate and easily blocked, but nothing is said about how often they are replaced."),
    TF(2, "Minerals are added to desalinated water partly to protect pipes.", "T",
       "Paragraph D says minerals are added back both for taste and to protect pipes from corrosion."),
    TF(1, "Brine is lighter than seawater.", "F",
       "Paragraph E says brine is heavier than seawater, so it can sink and spread along the seabed."),
    CZ(2, "Diagram label completion", "Label the diagram. Choose ONE word from the list.\n\n" + DIAGRAM.format(m="[[1]]", b="brine"),
       "membrane", ["heater", "valve", "screen", "collector"],
       "Paragraph C says seawater is pushed against a membrane, a thin sheet with pores so small that water passes through but most salts do not. Reverse osmosis needs no heating."),
    CZ(1, "Diagram label completion", "Label the diagram. Choose ONE word from the list.\n\n" + DIAGRAM.format(m="membrane", b="[[1]]"),
       "brine", ["vapour", "sludge", "steam", "minerals"],
       "Paragraph C says the concentrated salty liquid left on the other side of the membrane is known as brine. Vapour belongs to distillation."),
    CZ(2, "Short-answer questions", "Answer the question. Choose ONE word from the list.\n\nWhat do the filters remove before seawater reaches the membranes? Sand, seaweed and tiny [[1]]",
       "organisms", ["minerals", "salts", "bubbles", "stones"],
       "Paragraph D says the filters remove sand, seaweed and tiny organisms. Salts are removed by the membrane itself."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nEngineers design outlets that release brine through many small [[1]] so that it mixes quickly.",
       "openings", ["chambers", "screens", "filters", "tanks"],
       "Paragraph E says outlets spread the brine through many small openings so it mixes quickly with the surrounding water."),
    MC(2, "Why does reverse osmosis usually use less energy than distillation?", "It does not need the water to be heated",
       ["Its pumps run for only part of every day", "It treats smaller volumes of water", "It produces no brine at all"],
       "Paragraph C says no heating is needed, although the pumps still need a large and steady supply of electricity. It does produce brine."),
    MC(1, "What do some researchers hope to do with brine?", "Extract useful materials from it",
       ["Use it to clean the blocked membranes", "Store it deep underground", "Turn it into drinking water"],
       "Paragraph E says some researchers are exploring ways to extract useful materials from brine, turning a waste product into a resource."),
    MI(2, "a reason why the water from a plant is not left completely pure", "D", "ABCDE",
       "Paragraph D says the treated water lacks minerals, so small amounts are added back for taste and to protect pipes."),
    MI(1, "a reference to desalination being used on ships long ago", "B", "ABCDE",
       "Paragraph B says sailors used simple versions of distillation on board ship centuries ago."),
]

D10 = {"id": "IELTSR-D-P10", "title": "Before Banknotes", "text": (
    "**A** Today most people think of money as notes, coins and numbers on a screen, but for much of history the idea that a piece of paper could be worth something would have seemed strange. Early forms of money were valuable in themselves: grain, cattle, shells and, above all, metals such as silver and gold. A coin was trusted because the metal it contained had value, whoever had made it.\n\n"
    "**B** The first paper money appeared in China. During the Song dynasty, in the province of Sichuan, merchants used heavy iron coins, which were so awkward to carry in large amounts that traders began leaving them with trusted dealers in exchange for written receipts. These receipts could be passed from person to person, and in the early eleventh century the government took over their issue, creating what is generally regarded as the world's first official paper currency.\n\n"
    "**C** Paper money offered clear advantages. It was light, easy to transport and cheap to produce compared with coins. But it also carried a new risk. Because the notes had no value in themselves, people accepted them only as long as they trusted the government that issued them. When rulers printed more notes to pay for wars or other expenses, the value of each note fell and prices rose.\n\n"
    "**D** European travellers who reached China were astonished by the system. Marco Polo, who visited the court of the Mongol emperor in the late thirteenth century, described how paper made from the bark of mulberry trees was cut into notes, stamped with the emperor's seal and accepted throughout the empire. Many of his readers in Europe found the account hard to believe.\n\n"
    "**E** Europe was slow to follow. Banks in several cities issued receipts for deposits of coin, but the first banknotes issued by a European bank are usually dated to 1661, when a bank in Stockholm began printing them. The experiment ended badly: too many notes were issued and the bank failed within a few years. Even so, the idea spread, and by the eighteenth century banknotes were in use across much of Europe.\n\n"
    "**F** For centuries, many governments promised that their paper money could be exchanged for a fixed amount of gold or silver, which helped to reassure the public. That link has now been abandoned almost everywhere. Modern currencies are backed not by metal but by the confidence of the people who use them, which is perhaps the strongest evidence that trust, rather than any material, is what gives money its value."
)}

D10_ITEMS = [
    TF(1, "Early coins were trusted because of the metal they contained.", "T",
       "Paragraph A says a coin was trusted because the metal it contained had value, whoever had made it."),
    TF(2, "The Chinese government created the receipts before merchants began to use them.", "F",
       "Paragraph B says traders began using receipts first, and the government took over their issue later, in the early eleventh century."),
    TF(2, "Marco Polo brought paper notes back with him to Europe.", "NG",
       "Paragraph D says Marco Polo described the notes, but not whether he brought any home."),
    SE(1, "Traders in Sichuan left their coins with dealers because",
       "the coins were heavy to carry",
       ["the coins were often stolen", "the government told them to", "the dealers paid them interest"],
       "Paragraph B says the iron coins were so awkward to carry in large amounts that traders left them with dealers for written receipts."),
    SE(2, "When rulers printed more notes,",
       "each note lost some of its value",
       ["people trusted the notes even more", "coins became lighter to carry", "prices began to fall"],
       "Paragraph C says that when rulers printed more notes, the value of each note fell and prices rose."),
    SE(2, "Many of Marco Polo's readers in Europe",
       "found his account hard to believe",
       ["began printing their own paper notes", "travelled to China to see it", "asked for notes made of bark"],
       "Paragraph D ends: many of his readers in Europe found the account hard to believe."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nThe notes Marco Polo described were made from the bark of [[1]] trees.",
       "mulberry", ["oak", "chestnut", "olive", "cherry"],
       "Paragraph D says the paper was made from the bark of mulberry trees."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nThe bank in Stockholm failed after it issued too many [[1]].",
       "notes", ["coins", "loans", "receipts", "shares"],
       "Paragraph E says too many notes were issued and the bank failed within a few years."),
    CZ(2, "Note completion", "Complete the note. Choose ONE word from the list.\n\nModern currencies: backed by the [[1]] of the people who use them, not by metal",
       "confidence", ["taxes", "gold", "debts", "votes"],
       "Paragraph F says modern currencies are backed not by metal but by the confidence of the people who use them."),
    MC(2, "What is the writer's main point in Paragraph F?", "Trust is what gives money its value",
       ["Gold is the safest form of money", "Paper money should be linked to metal", "Modern currencies are less stable"],
       "Paragraph F concludes that trust, rather than any material, is what gives money its value. The link to gold has been abandoned, and the writer does not call for it back."),
    MI(2, "an account of how one European experiment with banknotes failed", "E", "ABCDEF",
       "Paragraph E says the Stockholm bank issued too many notes and failed within a few years."),
    MI(2, "the disadvantages as well as the advantages of paper money", "C", "ABCDEF",
       "Paragraph C lists the advantages (light, easy to transport, cheap) and the new risk of falling value when rulers print more notes."),
]

PASSAGES = [(D9, D9_ITEMS), (D10, D10_ITEMS)]
