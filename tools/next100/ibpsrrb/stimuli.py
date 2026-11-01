# Shared stimuli for the IBPS RRB Office Assistant Prelims bank: puzzles and
# data tables. All original. Every puzzle was checked for a unique solution
# by brute force before its questions were written.
STIMULI = [
    # ---------------- Mock Test 1: Reasoning ----------------
    {
        "id": "IBPSRRB-T1-PZ1",
        "title": "Puzzle: stacked boxes",
        "text": (
            "Seven boxes J, K, L, M, N, O and P are kept one above another in a single stack. The bottom position is numbered 1 and the top position is numbered 7.\n\n"
            "- Only two boxes are kept between K and M, and M is kept above K.\n"
            "- J is kept immediately below M.\n"
            "- O is kept immediately above L.\n"
            "- L is kept above M.\n"
            "- P is kept immediately above K.\n"
            "- N is not kept above P."
        ),
    },
    {
        "id": "IBPSRRB-T1-PZ2",
        "title": "Puzzle: linear seating",
        "text": (
            "Six friends Harish, Meena, Sunil, Gita, Pavan and Rani sit in a straight row, all facing north. Positions are counted from the left end.\n\n"
            "- Gita sits fourth from the left end.\n"
            "- Only two persons sit between Gita and Harish.\n"
            "- Rani sits at one of the ends.\n"
            "- Pavan sits immediately to the left of Rani.\n"
            "- Meena is not an immediate neighbour of Gita."
        ),
    },
    {
        "id": "IBPSRRB-T1-PZ3",
        "title": "Puzzle: sowing schedule",
        "text": (
            "Six farmers Ajay, Balu, Chitra, Dinesh, Elina and Feroz each sow a different crop (wheat, mustard, gram, maize, paddy and cotton) on a different day of one week, from Monday to Saturday.\n\n"
            "- Ajay sows on Thursday.\n"
            "- Only two farmers sow between Ajay and Dinesh.\n"
            "- Elina sows on the day after Ajay, and Balu sows on some day after Elina.\n"
            "- Chitra sows on some day before Feroz.\n"
            "- Wheat is sown on Tuesday, and paddy on the last day.\n"
            "- Dinesh sows gram.\n"
            "- Mustard is sown on the day immediately after maize.\n"
            "- Cotton is not sown on Friday."
        ),
    },
    # ---------------- Mock Test 1: Numerical Ability ----------------
    {
        "id": "IBPSRRB-T1-DI1",
        "title": "Data interpretation: loans by branch",
        "text": (
            "The table shows the number of crop loans and tractor loans sanctioned by five branches of a regional rural bank in one year.\n\n"
            "| Branch | Crop loans | Tractor loans |\n|---|---|---|\n| Rampur | 420 | 60 |\n| Sitapur | 360 | 90 |\n| Kheda | 480 | 72 |\n| Nandgaon | 300 | 45 |\n| Bhimtal | 240 | 33 |"
        ),
    },
    {
        "id": "IBPSRRB-T1-DI2",
        "title": "Data interpretation: milk collection",
        "text": (
            "The table shows the milk collected in one day at five village collection centres and the percentage of it that came from cows. The rest came from buffaloes.\n\n"
            "| Centre | Total milk (litres) | From cows |\n|---|---|---|\n| A | 1200 | 45% |\n| B | 900 | 60% |\n| C | 1500 | 40% |\n| D | 800 | 75% |\n| E | 1000 | 52% |"
        ),
    },
    # ---------------- Mock Test 2: Reasoning ----------------
    {
        "id": "IBPSRRB-T2-PZ1",
        "title": "Puzzle: circular seating",
        "text": (
            "Six persons Ravi, Sona, Tarun, Uma, Vimal and Wahida sit around a circular table at equal distances, all facing the centre. (For a person facing the centre, the seat to the left is the next seat clockwise.)\n\n"
            "- Wahida sits opposite Ravi.\n"
            "- Uma sits immediately to the left of Ravi.\n"
            "- Sona sits second to the right of Uma.\n"
            "- Tarun is not an immediate neighbour of Sona."
        ),
    },
    {
        "id": "IBPSRRB-T2-PZ2",
        "title": "Puzzle: comparison",
        "text": (
            "Five persons Imran, Jaya, Kamal, Lokesh and Neha each carry one bag of rice, and no two bags weigh the same.\n\n"
            "- Imran's bag is heavier than Jaya's but lighter than Neha's.\n"
            "- Kamal's bag is the heaviest.\n"
            "- Lokesh's bag is lighter than Jaya's.\n"
            "- Neha's bag weighs 42 kg and the lightest bag weighs 18 kg.\n"
            "- Imran's bag weighs 12 kg more than Lokesh's.\n"
            "- Jaya's bag is 6 kg lighter than Imran's."
        ),
    },
    {
        "id": "IBPSRRB-T2-PZ3",
        "title": "Puzzle: floors and fruits",
        "text": (
            "Five persons Gopal, Asha, Mohan, Kiran and Leela live on the five floors of a building, one on each floor. The lowest floor is numbered 1 and the top floor 5. Each likes a different fruit: guava, banana, mango, apple or orange.\n\n"
            "- Leela lives on the top floor, and only one person lives between Mohan and Leela.\n"
            "- Asha lives immediately below Mohan.\n"
            "- Kiran lives on a floor above Gopal.\n"
            "- The person who likes guava lives on the lowest floor.\n"
            "- Kiran likes apple.\n"
            "- The person who likes mango lives immediately above the person who likes banana.\n"
            "- Leela does not like mango."
        ),
    },
    # ---------------- Mock Test 2: Numerical Ability ----------------
    {
        "id": "IBPSRRB-T2-DI1",
        "title": "Data interpretation: Kisan Credit Card applications",
        "text": (
            "The table shows the number of Kisan Credit Card applications received and approved at five bank branches in one quarter.\n\n"
            "| Branch | Received | Approved |\n|---|---|---|\n| P | 250 | 210 |\n| Q | 320 | 256 |\n| R | 180 | 162 |\n| S | 400 | 300 |\n| T | 150 | 129 |"
        ),
    },
    {
        "id": "IBPSRRB-T2-DI2",
        "title": "Data interpretation: wheat production",
        "text": (
            "The table shows the wheat produced (in tonnes) by four villages in three years.\n\n"
            "| Village | 2023 | 2024 | 2025 |\n|---|---|---|---|\n| Alipur | 120 | 135 | 150 |\n| Belwa | 96 | 108 | 132 |\n| Chandi | 150 | 140 | 168 |\n| Dharpur | 84 | 102 | 90 |"
        ),
    },
    # ---------------- Drill only ----------------
    {
        "id": "IBPSRRB-D-PZ1",
        "title": "Puzzle: meeting months",
        "text": (
            "Six persons P, Q, R, S, T and U each attend a village meeting in a different month of the same year. The meetings are held only in February, April, June, August, October and December.\n\n"
            "- P attends in a month that has 30 days.\n"
            "- Only one person attends between P and Q.\n"
            "- Q attends in some month after U.\n"
            "- S attends in the last of these months.\n"
            "- T attends in some month before R, and R attends immediately before P."
        ),
    },
    {
        "id": "IBPSRRB-D-DI1",
        "title": "Data interpretation: self-help groups",
        "text": (
            "The table shows the number of members in five self-help groups of a village and the percentage of members who are women. The rest are men.\n\n"
            "| Group | Members | Women |\n|---|---|---|\n| Lotus | 40 | 75% |\n| Jasmine | 50 | 60% |\n| Marigold | 36 | 50% |\n| Rose | 45 | 80% |\n| Tulsi | 30 | 70% |"
        ),
    },
]
