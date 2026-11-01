# Analytical Ability (Professional level only): word analogy, logic, assumptions and conclusions,
# data interpretation, abstract reasoning written as letter patterns. Key first.
# Data tables are invented for practice.

APPS = (
    "| Month | Applications received | Applications approved |\n"
    "|---|---|---|\n"
    "| January | 240 | 180 |\n"
    "| February | 300 | 210 |\n"
    "| March | 360 | 288 |\n"
    "| April | 200 | 170 |"
)
APPS_INTRO = "The table shows the business permit applications a municipal office received and approved in four months.\n\n" + APPS + "\n\n"

BUDGET = (
    "| Item | Amount per month |\n"
    "|---|---|\n"
    "| Food | ₱12,000 |\n"
    "| Rent | ₱7,500 |\n"
    "| Transportation | ₱3,000 |\n"
    "| Utilities | ₱4,500 |\n"
    "| Savings | ₱3,000 |"
)
BUDGET_INTRO = "The table shows how the Santos family divides its monthly income. The five items make up the whole income.\n\n" + BUDGET + "\n\n"

ITEMS = [
    # ---------- Practice Test 1 (Professional) ----------
    S(1, 1, "Word analogy", "CHEF : KITCHEN :: JUDGE : ?",
      ["Courtroom", "Lawyer", "Verdict", "Gavel"],
      "A chef works in a kitchen; a judge works in a courtroom. A lawyer, a verdict and a gavel are all linked to judges, but none is a workplace."),
    S(1, 1, "Word analogy", "BROOM : SWEEP :: SAW : ?",
      ["Cut", "Wood", "Sharp", "Carpenter"],
      "A broom is used to sweep; a saw is used to cut. Wood is what a saw cuts, and a carpenter is the person who uses it."),
    S(1, 2, "Word analogy", "CUB : LION :: FAWN : ?",
      ["Deer", "Horse", "Carabao", "Goat"],
      "A cub is a young lion; a fawn is a young deer. A young horse is a foal and a young goat is a kid."),
    S(1, 2, "Word analogy", "BLIND : SIGHT :: DEAF : ?",
      ["Hearing", "Sound", "Ear", "Silence"],
      "A blind person lacks sight; a deaf person lacks hearing. Sound is what is heard and the ear is the organ, but the pair is a condition and the sense it takes away."),
    S(1, 2, "Word analogy", "GOVERNOR : PROVINCE :: MAYOR : ?",
      ["Municipality", "Barangay", "Region", "Congress"],
      "A governor heads a province; a mayor heads a city or municipality. A barangay is headed by a punong barangay."),
    S(1, 2, "Word analogy", "ODOMETER : DISTANCE :: SPEEDOMETER : ?",
      ["Speed", "Fuel", "Distance", "Time"],
      "An odometer measures the distance a vehicle has traveled; a speedometer measures its speed. Fuel is shown by a fuel gauge, and distance belongs to the odometer."),
    S(1, 3, "Word analogy", "POTTER : CLAY :: CARPENTER : ?",
      ["Wood", "Hammer", "Chair", "Workshop"],
      "A potter shapes clay; a carpenter works with wood. The pair is worker to the material, so a tool (hammer), a product (chair) or a workplace does not fit."),
    S(1, 2, "Logic", "Statements: All inspectors are employees. All employees wear IDs.\n\nConclusions:\nI. All inspectors wear IDs.\nII. Everyone who wears an ID is an inspector.\n\nWhich conclusion follows?",
      ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
      "Inspectors are inside the group of employees, and all employees wear IDs, so I follows. II reverses the statement: other employees also wear IDs, so it does not follow."),
    S(1, 2, "Logic", "Statements: Some files are red. All red things in the office are labeled.\n\nConclusions:\nI. Some files are labeled.\nII. All files are labeled.\n\nWhich conclusion follows?",
      ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
      "The red files are labeled, so at least some files are labeled (I). Nothing is said about files that are not red, so II does not follow."),
    S(1, 3, "Logic", "Statements: No cashier is a guard. Some guards are drivers.\n\nConclusions:\nI. No driver is a cashier.\nII. Some drivers are not cashiers.\n\nWhich conclusion follows?",
      ["Only conclusion II follows", "Only conclusion I follows", "Both I and II follow", "Neither I nor II follows"],
      "The drivers who are guards cannot be cashiers, so some drivers are not cashiers (II). Other drivers who are not guards could still be cashiers, so I does not follow."),
    S(1, 3, "Logic", "Statements: All mangoes are fruits. Some fruits are sour.\n\nConclusions:\nI. Some mangoes are sour.\nII. Some fruits are mangoes.\n\nWhich conclusion follows?",
      ["Only conclusion II follows", "Only conclusion I follows", "Neither I nor II follows", "Both I and II follow"],
      "The sour fruits may all be other kinds of fruit, so I does not follow. Every mango is a fruit, so at least some fruits are mangoes (II)."),
    S(1, 2, "Conclusions", "Statement: The city will fine anyone caught throwing garbage on the street.\n\nConclusions:\nI. No one will ever throw garbage on the street again.\nII. The city wants to keep its streets clean.\n\nWhich conclusion follows?",
      ["Only conclusion II follows", "Only conclusion I follows", "Both I and II follow", "Neither I nor II follows"],
      "A fine for littering shows the city's aim of clean streets (II). A fine discourages littering but cannot guarantee that no one will ever do it, so I does not follow."),
    S(1, 2, "Conclusions", "Statement: Of the 40 employees in the division, 25 attended the training, and all of those who attended passed the test.\n\nConclusions:\nI. At least 25 employees in the division passed the test.\nII. Some employees in the division did not attend the training.\n\nWhich conclusion follows?",
      ["Both I and II follow", "Only conclusion I follows", "Only conclusion II follows", "Neither I nor II follows"],
      "All 25 attendees passed, so at least 25 passed (I). Only 25 of 40 attended, so 15 did not (II). Both follow."),
    S(1, 3, "Conclusions", "Statement: Every applicant who passed the written test was interviewed. Maria, an applicant, was not interviewed.\n\nConclusions:\nI. Maria failed her interview.\nII. Maria did not pass the written test.\n\nWhich conclusion follows?",
      ["Only conclusion II follows", "Only conclusion I follows", "Both I and II follow", "Neither I nor II follows"],
      "If Maria had passed, she would have been interviewed; she was not, so she did not pass (II). She had no interview, so she cannot have failed one (I)."),
    S(1, 2, "Conclusions", "Statement: In the town center, traffic is heavy only on weekdays.\n\nConclusions:\nI. Traffic in the town center is not heavy on Sundays.\nII. Traffic in the town center is heavy every day of the week.\n\nWhich conclusion follows?",
      ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
      "\"Only on weekdays\" means it is not heavy on weekends, which includes Sundays (I). II contradicts the statement."),
    S(1, 1, "Data interpretation", APPS_INTRO + "How many applications did the office receive in the four months altogether?",
      ["1,100", "848", "1,040", "1,060"],
      "240 + 300 + 360 + 200 = 1,100. 848 is the total approved, not received."),
    S(1, 2, "Data interpretation", APPS_INTRO + "In which month was the share of applications approved the highest?",
      ["April", "March", "January", "February"],
      "Approval rates: January 180/240 = 75%, February 210/300 = 70%, March 288/360 = 80%, April 170/200 = 85%. March approved the most applications, but April approved the largest share."),
    S(1, 2, "Data interpretation", APPS_INTRO + "By what percent did the number of applications received increase from January to March?",
      ["50%", "60%", "120%", "150%"],
      "The increase is 360 - 240 = 120, and 120 / 240 = 50%. 150% is March as a percent of January, not the increase, and 120% reads the increase of 120 as a percent."),
    S(1, 3, "Data interpretation", APPS_INTRO + "What was the average number of applications approved per month?",
      ["212", "225", "275", "288"],
      "Total approved = 180 + 210 + 288 + 170 = 848, and 848 / 4 = 212. 275 is the average received (1,100 / 4), and 288 is the highest single month."),
    S(1, 1, "Data interpretation", BUDGET_INTRO + "What percent of the family's monthly income goes to food?",
      ["40%", "12%", "25%", "30%"],
      "The total income is 12,000 + 7,500 + 3,000 + 4,500 + 3,000 = ₱30,000. Food is 12,000 / 30,000 = 40%."),
    S(1, 2, "Data interpretation", BUDGET_INTRO + "What is the ratio of rent to utilities?",
      ["5 : 3", "3 : 5", "3 : 2", "5 : 2"],
      "Rent : utilities = 7,500 : 4,500. Divide both by 1,500 to get 5 : 3."),
    S(1, 3, "Data interpretation", BUDGET_INTRO + "If the family's food spending rises by 10% and the other amounts stay the same, what will the family's total monthly spending and savings be?",
      ["₱31,200", "₱32,000", "₱33,000", "₱43,200"],
      "Food rises by 10% of 12,000 = ₱1,200, so the total goes from ₱30,000 to ₱31,200. ₱33,000 would be a 10% rise in the whole budget, and ₱43,200 adds the new food amount (₱13,200) to the old total."),
    S(1, 2, "Ordering", "Ana is taller than Ben. Ben is taller than Carlo. Dina is shorter than Carlo. Who is the tallest?",
      ["Ana", "Ben", "Carlo", "Dina"],
      "From tallest to shortest the order is Ana, Ben, Carlo, Dina."),
    S(1, 3, "Abstract reasoning", "What letter comes next in the series? A, D, I, P, ?",
      ["Y", "X", "W", "V"],
      "The letters stand at positions 1, 4, 9 and 16 of the alphabet, the square numbers. The next square is 25, which is Y."),
    S(1, 3, "Coding", "In a certain code, HAND is written as IBOE. How is FOOT written in the same code?",
      ["GPPU", "ENNS", "GPPT", "HQQV"],
      "Each letter moves one place forward: H to I, A to B, N to O, D to E. So F, O, O, T become G, P, P, U. ENNS moves each letter back instead."),

    # ---------- Drill only ----------
    S(0, 1, "Word analogy", "LOUD : QUIET :: FULL : ?",
      ["Empty", "Heavy", "Round", "Large"],
      "Loud and quiet are opposites; the opposite of full is empty."),
    S(0, 2, "Conclusions", "Statement: Some employees of the agency ride bicycles to work.\n\nConclusions:\nI. All employees of the agency own bicycles.\nII. No employee of the agency drives a car to work.\n\nWhich conclusion follows?",
      ["Neither I nor II follows", "Only conclusion I follows", "Only conclusion II follows", "Both I and II follow"],
      "\"Some\" says nothing about all employees, so I does not follow, and nothing is said about cars, so II does not follow."),
    S(0, 2, "Directions", "Lito walks 5 km north, then 3 km east, then 5 km south. How far is he from his starting point?",
      ["3 km", "5 km", "8 km", "13 km"],
      "The 5 km north and 5 km south cancel out, leaving him 3 km east of where he started. 13 km is the total distance walked."),
]
