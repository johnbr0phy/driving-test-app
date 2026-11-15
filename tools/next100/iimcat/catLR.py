# DILR: logical reasoning sets (four questions each). Each set has exactly one
# solution, checked by brute force in checks.py.
A1, A2, A3 = "IIMCAT-T1-LR1", "IIMCAT-T1-LR2", "IIMCAT-T1-LR3"
B1, B2, B3 = "IIMCAT-T2-LR1", "IIMCAT-T2-LR2", "IIMCAT-T2-LR3"
D1 = "IIMCAT-D-LR1"

SEATS = ("Number the seats clockwise from Arjun (seat 0). Bela is opposite, in seat 3, and Chirag is in seat 1. "
         "Divya cannot be in seat 2, next to Chirag. If Divya were in seat 4, Esha would have to take seat 2 (next to Bela) and Farhan would be left with seat 5, next to Arjun, which is not allowed; so Divya is in seat 5. "
         "Esha must sit next to Bela but not next to Divya, so Esha is in seat 2 and Farhan in seat 4. ")
WEEK = ("Strategy follows Finance and is on neither Thursday nor Friday, so the pair is Monday-Tuesday or Tuesday-Wednesday; "
        "Operations comes before Finance, so it is Operations Monday, Finance Tuesday, Strategy Wednesday. "
        "Marketing cannot be Wednesday and must come before HR, so Marketing is Thursday and HR Friday. ")
LEAGUE = ("Orioles lost all three matches, so each other team beat them. Larks beat Mynas, so the single draw was Kestrels against Larks or Kestrels against Mynas. "
          "If Kestrels drew with Larks, both would have 5 points, which the no-tie rule forbids. So Kestrels drew with Mynas and beat Larks: "
          "Kestrels 5, Larks 4, Mynas 3, Orioles 0. ")
FLOORS = ("Lal, Gita and Kavya are on three consecutive floors starting on an odd floor, and Harsh is higher still, so Lal must be on 3 (Lal on 1 leaves no lower floor for Isha; Lal on 5 leaves no room above). "
          "Then Gita is on 4, Kavya on 5 and Harsh on 6. Isha's even floor below 3 is floor 2, and Jai takes floor 1. ")
FRIENDS = ("Pune is the lawyer, Surat the doctor and Agra the pilot, so Kochi is the chef. Nisha is not the doctor or lawyer and not in Kochi, so she is the pilot in Agra. "
           "Mohan is not in Pune or Agra and not the doctor, so he is the chef in Kochi. Pallavi is not the doctor, so she is the lawyer in Pune and Omkar the doctor in Surat. ")
GIVING = ("Work backwards. Before round 3, Kiran and Leela had half of 48, that is 24 each, and Manav had 48 + 24 + 24 = 96. "
          "Before round 2, Kiran had 12 and Manav 48, and Leela had 24 + 12 + 48 = 84. "
          "Before round 1, Leela had 42 and Manav 24, and Kiran had 12 + 42 + 24 = 78. ")
BOXES = ("Red and blue are a pair (blue directly on red) and green and white are a pair (white directly on green). Green is below red and yellow is above blue, "
         "so from the bottom the order is green, white, red, blue, yellow. ")

ITEMS = [
    # ---------- Test 1, set 3: round table ----------
    S(1, 2, "Circular arrangement", "Who sits opposite Chirag?",
      ["Farhan", "Divya", "Esha", "Bela"], SEATS + "Seat 4, opposite Chirag's seat 1, is Farhan's.", A1),
    S(1, 2, "Circular arrangement", "Who are Divya's two neighbours?",
      ["Arjun and Farhan", "Bela and Farhan", "Arjun and Chirag", "Esha and Bela"],
      SEATS + "Divya in seat 5 sits between Farhan (seat 4) and Arjun (seat 0).", A1),
    T(1, 3, "Circular arrangement", "Counting clockwise from Arjun, how many people sit between Arjun and Esha?",
      "1", SEATS + "Going clockwise from Arjun (seat 0) to Esha (seat 2), only Chirag (seat 1) is passed.", A1),
    S(1, 3, "Circular arrangement", "Who sits between Esha and Farhan?",
      ["Bela", "Divya", "Chirag", "Arjun"], SEATS + "Esha is in seat 2 and Farhan in seat 4, so Bela in seat 3 sits between them.", A1),
    # ---------- Test 1, set 4: training week ----------
    S(1, 2, "Scheduling", "On which day is the Strategy talk held?",
      ["Wednesday", "Tuesday", "Thursday", "Monday"], WEEK + "Strategy is on Wednesday.", A2),
    T(1, 2, "Scheduling", "How many talks are held between the Operations talk and the HR talk?",
      "3", WEEK + "Operations is Monday and HR Friday; Finance, Strategy and Marketing fall between them.", A2),
    S(1, 2, "Scheduling", "Which talk is held on Thursday?",
      ["Marketing", "HR", "Strategy", "Finance"], WEEK + "Thursday is Marketing.", A2),
    S(1, 3, "Scheduling", "Which of the following must be true?",
      ["HR is the last talk of the week", "Marketing is held on Tuesday",
       "Operations is held on Wednesday", "Finance is held on Thursday"],
      WEEK + "HR on Friday is the last talk; the other three statements contradict the schedule.", A2),
    # ---------- Test 1, set 5: league ----------
    T(1, 2, "Tournaments", "How many points did Mynas finish with?",
      "3", LEAGUE + "Mynas drew with Kestrels (1) and beat Orioles (2): 3 points.", A3),
    S(1, 3, "Tournaments", "Which match was drawn?",
      ["Kestrels v Mynas", "Kestrels v Larks", "Larks v Mynas", "Mynas v Orioles"], LEAGUE, A3),
    T(1, 2, "Tournaments", "How many matches did Larks win?",
      "2", LEAGUE + "Larks beat Mynas and Orioles and lost to Kestrels: two wins.", A3),
    S(1, 3, "Tournaments", "What was the result of the match between Kestrels and Larks?",
      ["Kestrels won", "Larks won", "It was drawn", "It cannot be determined"],
      LEAGUE + "A draw between them would leave Kestrels and Larks level on 5 points, so Kestrels must have won.", A3),
    # ---------- Test 2, set 3: apartment block ----------
    S(2, 2, "Floor arrangement", "Who lives on floor 1?",
      ["Jai", "Isha", "Lal", "Kavya"], FLOORS + "Jai is on floor 1.", B1),
    T(2, 2, "Floor arrangement", "On which floor does Gita live?",
      "4", FLOORS + "Gita is on floor 4.", B1),
    N(2, 2, "Floor arrangement", "How many people live on the floors between Isha's floor and Harsh's floor?",
      "3", ["2", "4", "5"], FLOORS + "Isha is on 2 and Harsh on 6, so Lal, Gita and Kavya (floors 3, 4 and 5) are between them.", B1),
    S(2, 3, "Floor arrangement", "Who lives on the floor directly below Kavya?",
      ["Gita", "Lal", "Harsh", "Isha"], FLOORS + "Kavya is on floor 5 and Gita on floor 4.", B1),
    # ---------- Test 2, set 4: four friends ----------
    S(2, 2, "Matching", "Who is the doctor?",
      ["Omkar", "Mohan", "Nisha", "Pallavi"], FRIENDS, B2),
    S(2, 2, "Matching", "In which city does Mohan live?",
      ["Kochi", "Pune", "Agra", "Surat"], FRIENDS, B2),
    S(2, 3, "Matching", "What is Pallavi's job?",
      ["Lawyer", "Doctor", "Chef", "Pilot"], FRIENDS, B2),
    S(2, 3, "Matching", "Which person is correctly matched with their job?",
      ["Nisha, pilot", "Mohan, lawyer", "Omkar, chef", "Pallavi, doctor"], FRIENDS, B2),
    # ---------- Test 2, set 5: three rounds of giving ----------
    T(2, 3, "Working backwards", "How many rupees did Kiran have at the start?",
      "78", GIVING + "Kiran started with Rs 78.", B3),
    T(2, 3, "Working backwards", "How many rupees did Leela have at the start?",
      "42", GIVING + "Leela started with Rs 42.", B3),
    T(2, 3, "Working backwards", "How many rupees did Manav have at the end of round 2?",
      "96", GIVING + "At the end of round 2 (just before round 3) Manav had Rs 96.", B3),
    S(2, 3, "Working backwards", "Who held the most money at the end of round 1?",
      ["Leela", "Kiran", "Manav", "Kiran and Manav equally"],
      GIVING + "After round 1 the holdings were Kiran 12, Leela 84 and Manav 48, so Leela held the most.", B3),
    # ---------- Drill set: boxes ----------
    S(0, 1, "Stacking", "Which box is at the top of the stack?",
      ["Yellow", "Blue", "White", "Red"], BOXES + "Yellow is at the top.", D1),
    T(0, 2, "Stacking", "In which position (1 to 5) is the red box?",
      "3", BOXES + "Red is third from the bottom.", D1),
    S(0, 2, "Stacking", "Which box is directly below the red box?",
      ["White", "Green", "Blue", "Yellow"], BOXES + "White is in position 2, directly below red.", D1),
    T(0, 2, "Stacking", "How many boxes are above the white box?",
      "3", BOXES + "Red, blue and yellow are above white.", D1),
]
