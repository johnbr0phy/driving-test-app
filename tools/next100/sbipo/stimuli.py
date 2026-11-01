# Shared stimuli for the SBI PO Prelims bank: reading passages, para jumbles,
# cloze passages, data tables and puzzles. All original.
RC_HEAD = "Read the passage and answer the questions that follow.\n\n"
PJ_HEAD = "The six sentences below, labelled A to F, can be arranged to form a meaningful paragraph. Arrange them and answer the questions that follow.\n\n"
CZ_HEAD = "Read the passage. Each numbered blank has a question below asking which word fits it best.\n\n"

STIMULI = [
    # ---------------- Mock Test 1: English ----------------
    {
        "id": "SBIPO-T1-RC1",
        "title": "Reading comprehension: passage 1",
        "text": RC_HEAD + (
            "India grows more fruit and vegetables than almost any other country, yet a large share never reaches a plate. Tomatoes split in the heat of a truck, bananas ripen too fast in an open godown, and peas lose their sweetness long before they reach a market a few hundred kilometres away. The loss is counted in rupees, but it is also counted in the water, fertiliser and labour that went into growing food nobody eats.\n\n"
            "The usual answer is a cold chain: a series of cooled spaces that carries produce from the field to the shop without a break. The weak link is rarely the large cold store in the city. It is the first mile, the hours between picking and the first cool room, when the produce is still warm from the field and most of the damage is done.\n\n"
            "Small pack-houses near the farm, where crops are washed, sorted and pre-cooled, address exactly this gap. Some run on solar power and are owned by farmer producer organisations, so that the members share the cost. Farmers who use them report that they can wait for a better price instead of selling the same evening at whatever the trader offers.\n\n"
            "The obstacle is less the machinery than its use through the year. A pack-house built for a single crop sits idle for months, and its owners struggle to repay the loan. Planners now favour units that can handle several crops in turn, so that the cooling never stops paying for itself."
        ),
    },
    {
        "id": "SBIPO-T1-RC2",
        "title": "Reading comprehension: passage 2",
        "text": RC_HEAD + (
            "For most of history, the question of how to pay for old age was answered by the family. Parents looked after their children, and children, in turn, looked after their parents. That arrangement is changing in India. Families are smaller, young people move to distant cities for work, and people live many years longer than their grandparents did.\n\n"
            "Only a minority of workers, mostly in government or large companies, can count on a regular pension. The rest, including shopkeepers, farm workers and the self-employed, must save for themselves, and many do not start until they are well into middle age. By then, the power of compounding, which turns small, early savings into a large sum over decades, has had too little time to work.\n\n"
            "Several government-backed schemes now allow even a small monthly contribution, and digital payments have made it easier to keep paying without a trip to a branch. Yet enrolment is one thing and staying enrolled is another. A household that loses a month's income often stops contributing and never restarts.\n\n"
            "Researchers suggest a modest change in design: make the next payment automatic unless the saver chooses to stop. People tend to stick with whatever happens by default, and a habit that needs no fresh decision each month is far more likely to survive a difficult year."
        ),
    },
    {
        "id": "SBIPO-T1-PJ",
        "title": "Para jumble",
        "text": PJ_HEAD + (
            "A. Her daughter suggested photographing the saris and listing them on a selling website.\n\n"
            "B. For thirty years, Meena sold the saris she wove only at the weekly market in her town.\n\n"
            "C. The first order came from a buyer in another state within a week.\n\n"
            "D. She was doubtful, since she had never sold anything to a customer she could not see.\n\n"
            "E. When the market was shut for several months, her income stopped almost overnight.\n\n"
            "F. Today, more than half of her sales are to people she has never met."
        ),
    },
    {
        "id": "SBIPO-T1-CZ",
        "title": "Cloze test",
        "text": CZ_HEAD + (
            "When a bank decides whether to lend, it wants to know how a borrower has ........ (1) past loans. A credit score sums up that record in a single number. Paying instalments on time ........ (2) the score, while missed payments pull it down. Many young people are surprised to learn that having no record at all can be a ........ (3), because the lender has nothing to judge them by. A small loan or a credit card used ........ (4) and repaid in full can help build a record. Borrowers are also entitled to check their own report and ask for any error to be ........ (5). A wrong entry left ........ (6) can cost a borrower a loan years later."
        ),
    },
    # ---------------- Mock Test 1: Quantitative Aptitude ----------------
    {
        "id": "SBIPO-T1-DI1",
        "title": "Data interpretation: deposits by branch",
        "text": (
            "The table shows the fixed deposits (in ₹ lakh) received by five branches of a bank in two quarters.\n\n"
            "| Branch | Quarter 1 | Quarter 2 |\n|---|---|---|\n| K | 250 | 300 |\n| L | 320 | 288 |\n| M | 180 | 234 |\n| N | 400 | 440 |\n| O | 150 | 138 |"
        ),
    },
    {
        "id": "SBIPO-T1-DI2",
        "title": "Data interpretation: books sold",
        "text": (
            "The table shows the number of books sold by four shops in a month and the percentage of them sold online. Every book was sold either online or in the shop.\n\n"
            "| Shop | Books sold | Sold online (%) |\n|---|---|---|\n| W | 800 | 35 |\n| X | 640 | 25 |\n| Y | 900 | 40 |\n| Z | 560 | 50 |"
        ),
    },
    # ---------------- Mock Test 1: Reasoning ----------------
    {
        "id": "SBIPO-T1-PZ1",
        "title": "Puzzle: floors and departments",
        "text": (
            "Seven persons K, L, M, N, P, R and T live on the seven floors of a building, one on each floor. The lowest floor is numbered 1 and the top floor 7. Each works in a different department: Loans, Audit, Treasury, IT, HR, Legal and Sales.\n\n"
            "- R lives on the middle floor.\n"
            "- Only two persons live between R and the person who works in Treasury.\n"
            "- N works in Treasury and lives above R.\n"
            "- L lives immediately below N.\n"
            "- The person who works in Audit lives on the lowest floor.\n"
            "- P works in Legal and lives immediately above the person who works in Audit.\n"
            "- Only one person lives between K and M, and K lives below M.\n"
            "- M works in IT and lives below R.\n"
            "- The person who works in HR lives immediately above R.\n"
            "- L does not work in Loans."
        ),
    },
    {
        "id": "SBIPO-T1-PZ2",
        "title": "Puzzle: circular seating",
        "text": (
            "Eight persons A, B, C, D, E, F, G and H sit around a circular table, equally spaced and all facing the centre, not necessarily in that order.\n\n"
            "- A sits opposite E.\n"
            "- C sits second to the left of A.\n"
            "- F sits between A and C.\n"
            "- H sits immediately to the right of E.\n"
            "- D sits immediately to the right of A.\n"
            "- B sits second to the right of D."
        ),
    },
    {
        "id": "SBIPO-T1-PZ3",
        "title": "Puzzle: training months and cities",
        "text": (
            "Six officers P, Q, R, S, T and U attend a training programme in six different months of the same year: January, March, April, June, September and November. Each goes to a different city: Delhi, Pune, Bhopal, Kochi, Ranchi and Shimla.\n\n"
            "- S goes to Bhopal and attends in the last of these months.\n"
            "- Only two persons attend between P and the person who goes to Bhopal.\n"
            "- The person who goes to Kochi attends in the first of these months.\n"
            "- T attends immediately after the person who goes to Kochi.\n"
            "- U attends immediately before R.\n"
            "- R goes to Ranchi.\n"
            "- P goes to neither Delhi nor Pune.\n"
            "- T does not go to Delhi."
        ),
    },
    # ---------------- Mock Test 2: English ----------------
    {
        "id": "SBIPO-T2-RC1",
        "title": "Reading comprehension: passage 1",
        "text": RC_HEAD + (
            "Along parts of India's eastern coast, villages that sit behind a belt of mangrove forest have often come through cyclones better than villages a short distance away that have none. The trees do not stop a storm, but their tangled roots slow the water that a cyclone pushes onto the land, and the forest takes the first blow of the wind.\n\n"
            "For decades, mangroves were treated as wasteland. They were cleared for fish and shrimp ponds, for salt pans and for new roads and houses. The ponds earned money quickly, but many were abandoned after a few years when disease struck or the soil turned too salty, leaving neither forest nor farm.\n\n"
            "Replanting has since become popular, and some projects have done well. Others have planted a single fast-growing species in neat rows on mudflats where mangroves never grew naturally, and most of the saplings died. Experts say the more reliable approach is to restore the flow of tidal water to areas where mangroves once stood, and let the forest return largely by itself.\n\n"
            "The forests also support local livelihoods. Crabs, fish and honey from healthy mangroves provide income year after year, which gives villagers a reason to protect the forest long after a planting project has ended."
        ),
    },
    {
        "id": "SBIPO-T2-RC2",
        "title": "Reading comprehension: passage 2",
        "text": RC_HEAD + (
            "Each year, millions of young Indians finish school or college and go looking for work, and employers in many industries still say they cannot find people with the right skills. The two complaints sound contradictory, but they point to the same gap: what is learnt in a classroom is often not what is needed on a factory floor or in a hospital ward.\n\n"
            "Apprenticeships try to close that gap by letting a young person learn on the job while earning a stipend. The trainee works under an experienced employee, and the classroom part of the course is tied to tasks the trainee actually does. In countries where such training is common, a large share of apprentices are hired by the firm that trained them.\n\n"
            "In India the numbers have grown, but they remain small for an economy of its size. Many smaller firms see apprentices as a cost rather than an investment, and fear that a worker they train will simply leave for a better offer. Large companies find the paperwork easier to manage.\n\n"
            "Supporters argue that the fear of losing trained workers is overstated. A trainee who has learnt the firm's own machines and methods is often more valuable to it than to anyone else, and many stay for that reason."
        ),
    },
    {
        "id": "SBIPO-T2-PJ",
        "title": "Para jumble",
        "text": PJ_HEAD + (
            "A. They agreed to pool their milk and sell it together to a dairy in the nearest town.\n\n"
            "B. Each family in the village owned one or two cows and sold its milk to a trader who set the price.\n\n"
            "C. With a steady buyer, the society was soon able to install a cooling tank of its own.\n\n"
            "D. The price was low, and the families had no choice but to accept it.\n\n"
            "E. Some of them decided that the only way to bargain was as a group.\n\n"
            "F. Now the milk stays fresh for longer, and the society earns a better rate for it."
        ),
    },
    {
        "id": "SBIPO-T2-CZ",
        "title": "Cloze test",
        "text": CZ_HEAD + (
            "Many Indian cities are replacing old diesel buses with electric ones. The new buses are quiet and give out no ........ (1) on the street, which matters in cities where the air is already heavily polluted. Their running costs are lower too, since electricity is cheaper per kilometre than diesel and the motors need less ........ (2). The main difficulty is the high price of the bus itself, most of which comes from the battery. To ........ (3) this, several cities now lease buses from private operators and pay them for every kilometre run, rather than buying the vehicles ........ (4). Charging also needs ........ (5) planning, because a large depot of buses can draw as much power as a small town. If the depot is not ready, new buses may stand ........ (6) for weeks."
        ),
    },
    # ---------------- Mock Test 2: Quantitative Aptitude ----------------
    {
        "id": "SBIPO-T2-DI1",
        "title": "Data interpretation: visitors to museums",
        "text": (
            "The table shows the number of visitors (in thousands) to five museums in 2024 and 2025.\n\n"
            "| Museum | 2024 | 2025 |\n|---|---|---|\n| A | 120 | 150 |\n| B | 200 | 170 |\n| C | 160 | 192 |\n| D | 90 | 117 |\n| E | 140 | 161 |"
        ),
    },
    {
        "id": "SBIPO-T2-DI2",
        "title": "Data interpretation: factory output",
        "text": (
            "The table shows the number of units made by four factories in a month and the ratio of units passed to units rejected at the quality check. Every unit was either passed or rejected.\n\n"
            "| Factory | Units made | Passed : Rejected |\n|---|---|---|\n| F1 | 1,200 | 9 : 1 |\n| F2 | 900 | 7 : 2 |\n| F3 | 1,500 | 4 : 1 |\n| F4 | 1,050 | 13 : 2 |"
        ),
    },
    # ---------------- Mock Test 2: Reasoning ----------------
    {
        "id": "SBIPO-T2-PZ1",
        "title": "Puzzle: linear seating",
        "text": (
            "Eight persons J, K, L, M, N, O, Q and W sit in a straight row, all facing north, not necessarily in that order.\n\n"
            "- K sits fourth from the right end of the row.\n"
            "- Only two persons sit between K and Q.\n"
            "- Q does not sit at either end of the row.\n"
            "- M sits immediately to the left of Q.\n"
            "- N sits at one of the extreme ends of the row.\n"
            "- L sits immediately to the left of N.\n"
            "- O sits immediately to the left of K.\n"
            "- J is not an immediate neighbour of K."
        ),
    },
    {
        "id": "SBIPO-T2-PZ2",
        "title": "Puzzle: floors and cars",
        "text": (
            "Six persons Rohit, Sana, Tanvi, Uday, Vivek and Zara live on the six floors of a building, one on each floor. The lowest floor is numbered 1 and the top floor 6. Each owns a car of a different colour: White, Red, Blue, Silver, Black and Grey.\n\n"
            "- Tanvi lives on the top floor.\n"
            "- Only two persons live between Tanvi and the owner of the Blue car.\n"
            "- Zara owns the Blue car.\n"
            "- Rohit lives immediately above Zara and owns the Silver car.\n"
            "- The owner of the Black car lives immediately below Tanvi.\n"
            "- Sana lives on an even-numbered floor, and Vivek lives below Sana.\n"
            "- The owner of the Red car lives immediately above the owner of the White car."
        ),
    },
    {
        "id": "SBIPO-T2-PZ3",
        "title": "Puzzle: comparison of savings",
        "text": (
            "Six friends F, G, H, I, J and K have different amounts of savings.\n\n"
            "- F has more savings than J but less than K.\n"
            "- H has more savings than K.\n"
            "- G has more savings than only one person.\n"
            "- I has the least savings.\n"
            "- J has more savings than G."
        ),
    },
    # ---------------- Drill only ----------------
    {
        "id": "SBIPO-D-RC",
        "title": "Short passage",
        "text": RC_HEAD + (
            "In many villages the nearest bank branch is a bus ride away, and a day's wages can be lost just to deposit a small sum. Business correspondents help to fill this gap. They are local agents, often running a small shop, who open accounts, accept deposits and pay out withdrawals on behalf of a bank using a hand-held device.\n\n"
            "The model works best where the agent is trusted and earns enough to stay in business. Where commissions are thin, agents tend to drift away to other work, and customers who had begun to save are left without a nearby point of service. Some banks now pay agents a small fixed amount each month as well as a commission, so that a quiet month does not drive them out."
        ),
    },
    {
        "id": "SBIPO-D-DI",
        "title": "Data interpretation: crop area",
        "text": (
            "The table shows the area (in hectares) sown with wheat and with mustard in four villages.\n\n"
            "| Village | Wheat | Mustard |\n|---|---|---|\n| Rampur | 360 | 120 |\n| Sitapur | 280 | 140 |\n| Devgarh | 450 | 90 |\n| Kalapur | 210 | 210 |"
        ),
    },
    {
        "id": "SBIPO-D-PZ",
        "title": "Puzzle: meeting schedule",
        "text": (
            "Five officers A, B, C, D and E each hold one meeting on a different day from Monday to Friday of the same week. Each meeting is on a different topic: Savings, Loans, Insurance, Pensions and Cards.\n\n"
            "- Only two meetings are held between C's meeting and B's meeting.\n"
            "- D's meeting is on Friday.\n"
            "- C's meeting is held before A's meeting.\n"
            "- E's meeting is immediately before A's meeting.\n"
            "- The Loans meeting is held immediately after C's meeting.\n"
            "- B's meeting is on Pensions.\n"
            "- The Cards meeting is the last of the week.\n"
            "- The Insurance meeting is not on Monday."
        ),
    },
]
