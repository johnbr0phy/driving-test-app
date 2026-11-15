# Shared stimuli for the CAT bank: reading passages (stimuli_rc.py) and DILR
# sets. All data is made up; every answer is checked in checks.py.
import os
exec(open(os.path.join(HERE, "stimuli_rc.py")).read())

DILR = [
    # ---------------- Mock Test 1 ----------------
    {
        "id": "IIMCAT-T1-DI1",
        "title": "Set 1: quarterly sales",
        "text": (
            "The table shows a company's sales of four products in each quarter of a year, in Rs lakh.\n\n"
            "| Product | Q1 | Q2 | Q3 | Q4 |\n|---|---|---|---|---|\n"
            "| Alpha | 48 | 52 | 60 | 64 |\n| Beta | 36 | 45 | 42 | 51 |\n"
            "| Gamma | 30 | 33 | 48 | 39 |\n| Delta | 46 | 50 | 50 | 56 |"
        ),
    },
    {
        "id": "IIMCAT-T1-DI2",
        "title": "Set 2: app survey",
        "text": (
            "A company surveyed all 300 of its employees about three apps it provides: Mail, Chat and Video. "
            "The survey found that:\n\n"
            "- 160 employees use Mail, 140 use Chat and 100 use Video.\n"
            "- 70 use both Mail and Chat, 50 use both Mail and Video, and 40 use both Chat and Video.\n"
            "- 20 use all three apps.\n\n"
            "The remaining employees use none of the three."
        ),
    },
    {
        "id": "IIMCAT-T1-LR1",
        "title": "Set 3: the round table",
        "text": (
            "Six colleagues, Arjun, Bela, Chirag, Divya, Esha and Farhan, sit at a round table with six evenly spaced seats, all facing the centre. "
            "\"Opposite\" means the seat directly across the table.\n\n"
            "- Arjun sits opposite Bela.\n"
            "- Chirag sits in the seat next to Arjun in the clockwise direction.\n"
            "- Divya does not sit next to Chirag.\n"
            "- Esha sits next to Bela.\n"
            "- Farhan does not sit next to Arjun.\n"
            "- Esha does not sit next to Divya."
        ),
    },
    {
        "id": "IIMCAT-T1-LR2",
        "title": "Set 4: the training week",
        "text": (
            "A training week has five talks, Finance, HR, Marketing, Operations and Strategy, one on each day from Monday to Friday.\n\n"
            "- Finance is held on the day before Strategy.\n"
            "- HR is held on a later day than Marketing.\n"
            "- Operations is held on an earlier day than Finance.\n"
            "- Marketing is held on neither Monday nor Wednesday.\n"
            "- Strategy is held on neither Thursday nor Friday."
        ),
    },
    {
        "id": "IIMCAT-T1-LR3",
        "title": "Set 5: the league table",
        "text": (
            "Four teams, Kestrels, Larks, Mynas and Orioles, played a league in which every team played every other team once. "
            "A win earned 2 points, a draw 1 point each and a loss 0.\n\n"
            "- No two teams finished with the same number of points.\n"
            "- Orioles lost every match.\n"
            "- Kestrels did not lose a match and finished with the most points.\n"
            "- Exactly one match in the league was drawn.\n"
            "- Larks beat Mynas."
        ),
    },
    # ---------------- Mock Test 2 ----------------
    {
        "id": "IIMCAT-T2-DI1",
        "title": "Set 1: factory output",
        "text": (
            "The table shows the output of four factories in three months, in thousand units, and the percentage of each factory's June output that was found defective.\n\n"
            "| Factory | April | May | June | Defective in June |\n|---|---|---|---|---|\n"
            "| North | 40 | 45 | 50 | 6% |\n| South | 32 | 36 | 40 | 5% |\n"
            "| East | 20 | 24 | 30 | 10% |\n| West | 52 | 55 | 60 | 5% |"
        ),
    },
    {
        "id": "IIMCAT-T2-DI2",
        "title": "Set 2: test scores",
        "text": (
            "The table shows the marks, each out of 100, of five students in three tests.\n\n"
            "| Student | Maths | Reading | Science |\n|---|---|---|---|\n"
            "| Asha | 72 | 80 | 64 |\n| Bhanu | 85 | 70 | 76 |\n| Charu | 60 | 88 | 80 |\n"
            "| Dev | 90 | 64 | 86 |\n| Ela | 68 | 78 | 82 |"
        ),
    },
    {
        "id": "IIMCAT-T2-LR1",
        "title": "Set 3: the apartment block",
        "text": (
            "Six people, Gita, Harsh, Isha, Jai, Kavya and Lal, live on the six floors of a building, numbered 1 (lowest) to 6 (highest), one person to a floor.\n\n"
            "- Lal lives on an odd-numbered floor.\n"
            "- Gita lives on the floor directly above Lal.\n"
            "- Kavya lives on the floor directly above Gita.\n"
            "- Harsh lives on a higher floor than Kavya.\n"
            "- Isha lives on an even-numbered floor below Lal's floor."
        ),
    },
    {
        "id": "IIMCAT-T2-LR2",
        "title": "Set 4: four friends",
        "text": (
            "Four friends, Mohan, Nisha, Omkar and Pallavi, live in four different cities (Agra, Kochi, Pune and Surat) and have four different jobs (chef, doctor, lawyer and pilot).\n\n"
            "- The doctor lives in Surat.\n"
            "- The person who lives in Pune is the lawyer.\n"
            "- The pilot lives in Agra.\n"
            "- Nisha is neither the doctor nor the lawyer, and she does not live in Kochi.\n"
            "- Mohan lives in neither Pune nor Agra, and he is not the doctor.\n"
            "- Pallavi is not the doctor, and Omkar is not the chef."
        ),
    },
    {
        "id": "IIMCAT-T2-LR3",
        "title": "Set 5: three rounds of giving",
        "text": (
            "Kiran, Leela and Manav each start with some money. They play three rounds. In each round one player gives each of the other two an amount equal to what that person holds at that moment, so that each of them doubles their money. "
            "Kiran gives in round 1, Leela in round 2 and Manav in round 3. At the end of round 3, each of the three holds Rs 48."
        ),
    },
    # ---------------- Drill only ----------------
    {
        "id": "IIMCAT-D-DI1",
        "title": "Set: exports",
        "text": (
            "The table shows a state's exports of three commodities over four years, in Rs crore.\n\n"
            "| Commodity | 2021 | 2022 | 2023 | 2024 |\n|---|---|---|---|---|\n"
            "| Tea | 120 | 132 | 150 | 165 |\n| Coffee | 80 | 88 | 96 | 120 |\n| Spices | 100 | 90 | 108 | 135 |"
        ),
    },
    {
        "id": "IIMCAT-D-DI2",
        "title": "Set: hotel night",
        "text": (
            "The table shows a hotel's four room types on one night: the number of rooms, the percentage occupied and the room rate per night.\n\n"
            "| Room type | Rooms | Occupied | Rate (Rs per night) |\n|---|---|---|---|\n"
            "| Standard | 80 | 75% | 3,000 |\n| Deluxe | 50 | 80% | 4,500 |\n"
            "| Suite | 20 | 60% | 9,000 |\n| Family | 30 | 90% | 5,000 |"
        ),
    },
    {
        "id": "IIMCAT-D-LR1",
        "title": "Set: the stack of boxes",
        "text": (
            "Five boxes, coloured red, blue, green, yellow and white, are stacked one on top of another in positions 1 (bottom) to 5 (top).\n\n"
            "- The blue box is directly on top of the red box.\n"
            "- The yellow box is somewhere above the blue box.\n"
            "- The white box is directly on top of the green box.\n"
            "- The green box is somewhere below the red box."
        ),
    },
]

STIMULI = RC + DILR
