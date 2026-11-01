# CSAT (General Studies Paper II) drill: comprehension, reasoning and basic numeracy.
# Paper II is qualifying (33 percent), so these items are drill only (test 0) and never part of a GS test.
P_REPAIR = ("Many household goods today are designed to be replaced rather than repaired. Parts are glued "
            "instead of screwed, spare parts are hard to find, and repair manuals are kept from the public. A "
            "fan, a phone or a mixer that fails after a few years is often cheaper to throw away than to fix. Yet "
            "every discarded machine carries the energy and materials used to make it, and much of that ends up "
            "as waste. A right to repair would require makers to sell spare parts and share manuals for a fixed "
            "number of years. Supporters argue that this would also keep alive the small repair shops that once "
            "stood in every market.")
P_WATER = ("Groundwater is often described as a hidden reservoir, but it behaves more like a bank account. "
           "Each monsoon makes a deposit, and every pump makes a withdrawal. In many districts the withdrawals "
           "have exceeded the deposits for decades, so the water table falls a little every year and wells must "
           "be dug deeper. Because the account is invisible, the losses go unnoticed until wells run dry. Cheap or "
           "free electricity for pumps has made withdrawal easy, while recharge depends on rain soaking into soil "
           "that is increasingly paved, compacted or cleared of vegetation.")
P_TRUST = ("A democracy does not run on laws alone. It depends on citizens believing that institutions will "
           "treat them fairly even when they lose an election or a court case. This trust is built slowly, "
           "through many small experiences: a complaint that is answered, a licence issued without a bribe, a "
           "dispute settled on time. It can be lost much faster. When people come to expect that rules apply "
           "only to the powerless, they stop using official channels and turn to personal connections, and the "
           "institutions grow weaker still.")
P_MILLET = ("For decades farm policy favoured rice and wheat, which received assured procurement and the bulk of "
            "irrigation. Millets such as jowar, bajra and ragi, once staples across dry regions, lost ground. Yet "
            "millets need far less water, tolerate heat and grow on poor soils, qualities that matter more as "
            "rainfall becomes less predictable. Their revival, however, depends less on their merits than on "
            "demand: unless consumers buy them and processors find them worth handling, farmers will keep "
            "growing what the market and the procurement system reward.")

ITEMS = [
    # ---------- Comprehension ----------
    S(0, 2, "Comprehension", "Which of the following is the most logical inference from the passage?",
      ["Discarded goods waste the energy and materials that made them", "Repair shops have disappeared because people no longer buy machines", "Glued parts make modern goods last longer than older ones", "Repair manuals are freely available for most goods today"],
      "The passage says every discarded machine carries the energy and materials used to make it and much of it ends up as waste. It says parts are glued to discourage repair and manuals are kept from the public, so the last two options contradict it.",
      passage=P_REPAIR),
    S(0, 2, "Comprehension", "According to the passage, a right to repair would require manufacturers to:",
      ["Sell spare parts and share repair manuals for a set period", "Repair every faulty product free of charge", "Stop making fans, phones and mixers", "Buy back old machines from their owners"],
      "The passage defines the right to repair as requiring makers 'to sell spare parts and share manuals for a fixed number of years'. It does not mention free repairs, buy-backs or ending production.",
      passage=P_REPAIR),
    S(0, 2, "Comprehension", "The comparison of groundwater with a bank account is used mainly to stress that:",
      ["Unseen losses build up when withdrawals exceed deposits", "Groundwater should be bought and sold like money", "Banks should pay farmers for digging deeper wells", "Monsoon rain is no longer needed to refill the aquifers"],
      "The analogy is about deposits (monsoon recharge) and withdrawals (pumping): when one exceeds the other for years, the balance falls, and because the account is invisible the loss goes unnoticed.",
      passage=P_WATER),
    S(0, 3, "Comprehension", "Which of the following assumptions is made in the passage?",
      ["Paved and compacted ground lets less rain soak in", "Free electricity is the only cause of falling water tables", "Wells in every district have already run dry", "Groundwater cannot be recharged once it is used"],
      "The last sentence says recharge depends on rain soaking into soil that is increasingly paved or compacted, which assumes such ground absorbs less. The passage calls cheap power one factor, not the only one, and treats recharge as possible.",
      passage=P_WATER),
    S(0, 2, "Comprehension", "What is the central idea of the passage?",
      ["Trust in fair treatment sustains institutions", "Elections are the only real test of a democracy", "Personal connections make institutions work faster", "Laws are unnecessary where citizens trust each other"],
      "The passage argues that democracy depends on citizens trusting institutions to be fair, that the trust is built slowly through everyday experience and lost quickly, and that its loss weakens institutions further.",
      passage=P_TRUST),
    S(0, 3, "Comprehension", "Which of the following, according to the passage, is a likely result of people believing that rules apply only to the powerless?",
      ["People bypass official channels and institutions weaken", "Institutions become stronger as more complaints are filed", "Court cases are settled more quickly", "Citizens vote in larger numbers in elections"],
      "The passage says such people stop using official channels and turn to personal connections, 'and the institutions grow weaker still', a cycle of falling trust.",
      passage=P_TRUST),
    S(0, 2, "Comprehension", "According to the passage, the revival of millets depends mainly on:",
      ["Demand from buyers and processors", "Their need for less water than rice", "Breeding new varieties of millet", "More irrigation for dry regions"],
      "The author grants millets' merits (less water, heat tolerance) but says their revival 'depends less on their merits than on demand' from consumers and processors.",
      passage=P_MILLET),
    S(0, 3, "Comprehension", "Which of the following best reflects the author's view?",
      ["Farmers grow what markets and procurement reward", "Millets should replace rice and wheat in all regions", "Rainfall has become more predictable in recent decades", "Procurement of rice and wheat should be stopped"],
      "The final clause says farmers 'will keep growing what the market and the procurement system reward'. The author does not call for replacing rice and wheat everywhere or ending procurement, and says rainfall is becoming less predictable.",
      passage=P_MILLET),

    # ---------- Reasoning ----------
    S(0, 2, "Syllogism", "Statements: All engineers are cyclists. Some cyclists are painters.\n\nWhich of the following conclusions follows definitely from the statements?",
      ["No definite conclusion follows", "Some of the engineers are painters", "Some of the painters are engineers", "All painters are cyclists"],
      "The painters among the cyclists may or may not include any engineers, so neither 'some engineers are painters' nor its converse is certain. 'All painters are cyclists' does not follow either, because only some cyclists are known to be painters."),
    S(0, 2, "Number series", "Find the next number in the series: 3, 10, 21, 36, 55, ?",
      ["78", "72", "74", "76"],
      "The gaps are 7, 11, 15, 19, growing by 4 each time, so the next gap is 23: 55 + 23 = 78. 74 repeats the last gap of 19."),
    S(0, 2, "Seating arrangement", "Five friends P, Q, R, S and T sit in a row facing north. S sits at the left end. T sits immediately to the right of S. Q sits second from the right end. R does not sit at either end.\n\nWho sits at the right end?",
      ["P", "R", "Q", "T"],
      "Number the seats 1 to 5 from the left. S is in seat 1 and T in seat 2. Q, second from the right end, is in seat 4. R is not at an end, so R takes seat 3 and P is left with seat 5, the right end."),
    S(0, 2, "Blood relations", "Pointing to a woman, Kabir said, 'Her mother's husband is my father's father.' How is the woman related to Kabir?",
      ["Aunt", "Sister", "Mother", "Cousin"],
      "Her mother's husband is her father, and he is Kabir's paternal grandfather. So she is a daughter of Kabir's grandfather, that is, his father's sister: his aunt."),
    L(0, 3, "Data sufficiency", "Question: What is Arun's age?\n\nStatement I: Arun is 6 years younger than Bina.\n\nStatement II: Bina's age is one-third of Chitra's, and Chitra is 66.\n\nWhich of the following is correct?",
      ["Statement I alone is sufficient", "Statement II alone is sufficient", "Both statements together are needed", "Both together are still not sufficient"], 2,
      "Statement I links Arun to Bina but gives no number. Statement II gives Bina's age (66 / 3 = 22) but says nothing about Arun. Together, Arun is 22 - 6 = 16, so both are needed."),
    S(0, 1, "Coding-decoding", "In a certain code BRAIN is written as DTCKP. How is STORM written in that code?",
      ["UVQTO", "UVQSO", "TUPSN", "UWQTO"],
      "Each letter moves two places forward: B to D, R to T, A to C, I to K, N to P. So S to U, T to V, O to Q, R to T and M to O, giving UVQTO."),

    # ---------- Basic numeracy ----------
    S(0, 1, "Numbers", "How many numbers from 1 to 100 are divisible by both 4 and 6?",
      ["8", "6", "12", "16"],
      "A number divisible by both 4 and 6 is divisible by their LCM, 12. The multiples of 12 up to 100 are 12, 24, ..., 96, which is 96 / 12 = 8 numbers. Dividing 100 by 4 and by 6 separately leads to the wrong counts."),
    S(0, 2, "Distance", "A man walks 16 km north and then 63 km east. How far is he now from his starting point in a straight line?",
      ["65 km", "79 km", "47 km", "71 km"],
      "The two legs are at right angles, so the distance is the square root of (256 + 3,969) = the square root of 4,225 = 65 km. 79 km is the total distance walked, not the straight-line distance, and 47 km is the difference of the legs."),
    S(0, 2, "Averages", "The average of five consecutive odd numbers is 27. What is the largest of them?",
      ["31", "27", "29", "30"],
      "For consecutive odd numbers the average is the middle one, 27, so the numbers are 23, 25, 27, 29 and 31. The largest is 31."),
    S(0, 2, "Percentages", "A trader marks a bicycle 25% above its cost price and then gives a discount of 12% on the marked price. What is the profit percent?",
      ["10%", "13%", "25%", "37%"],
      "Take the cost as 100. The marked price is 125, and 12% off gives 125 x 0.88 = 110, so the profit is 10%. Subtracting 12 from 25 to get 13% is the common mistake; 25% ignores the discount and 37% adds it."),
    S(0, 2, "Clocks", "What is the angle between the hour and minute hands of a clock at 8:10?",
      ["175 degrees", "160 degrees", "170 degrees", "185 degrees"],
      "At 8:10 the hour hand is at 8 x 30 + 10 x 0.5 = 245 degrees from 12, and the minute hand at 10 x 6 = 60 degrees. The difference is 185 degrees, so the smaller angle between the hands is 360 - 185 = 175 degrees. Forgetting the hour hand's movement past 8 gives 240 - 60 = 180, and 185 is the reflex side."),
    S(0, 3, "Work", "3 men alone or 5 women alone can finish a piece of work in 30 days. In how many days will 3 men and 5 women together finish it?",
      ["15 days", "7.5 days", "10 days", "12 days"],
      "3 men do as much work as 5 women, so 3 men and 5 women together are twice the workforce of either group alone. Twice the workforce finishes in half the time: 30 / 2 = 15 days."),
]
