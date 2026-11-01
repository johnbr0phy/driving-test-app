CAT = "cdcfibReasoning"; SEG = "RSN"
# Logical reasoning, text only. Computed answers asserted below.
import datetime, math

s = [4]
for _ in range(4): s.append(s[-1] * 2 + 3)
assert s == [4, 11, 25, 53, 109]
assert [n * (n + 1) for n in range(1, 7)] == [2, 6, 12, 20, 30, 42]
assert [7 + 3 * k * (k + 1) for k in range(6)] == [7, 13, 25, 43, 67, 97]
assert "".join(chr(ord(c) + 1) for c in "SAFE") == "TBGF"
assert "".join(str(ord(c) - 64) for c in "BEAD") == "2514"
assert 15 * 15 + 36 * 36 == 39 * 39
assert (datetime.date(2023, 3, 29) - datetime.date(2023, 3, 3)).days == 26 and 26 % 7 == 5
assert 47 - 19 + 1 == 29
assert sum(str(n).count("7") for n in range(1, 81)) == 18
assert 5 * 5 + 2 * 2 == 29
assert 51 == 3 * 17

Q = [
("What number comes next: 4, 11, 25, 53, ...?",
 "109", ["106", "81", "107"],
 "Each term is double the one before plus 3: 53 x 2 + 3 = 109. The differences 7, 14, 28 double, so the next difference is 56."),
("What number comes next: 7, 10, 15, 22, 31, ...?",
 "42", ["40", "41", "44"],
 "Each term is 6 more than a square: 1 + 6, 4 + 6, 9 + 6, 16 + 6, 25 + 6, so the next is 36 + 6 = 42. The differences 3, 5, 7, 9 lead to 11 as well."),
("What letter comes next: Z, U, P, K, ...?",
 "F", ["G", "E", "H"],
 "Each letter moves five places back: Z (26), U (21), P (16), K (11), F (6)."),
("What letter comes next: B, C, E, I, ...?",
 "Q", ["P", "R", "O"],
 "The gaps double: B to C is 1, C to E is 2, E to I is 4, so I (9) + 8 = Q (17)."),
("What number comes next: 7, 13, 25, 43, 67, ...?",
 "97", ["91", "95", "103"],
 "The differences are 6, 12, 18, 24, rising by 6, so the next difference is 30 and 67 + 30 = 97."),
("If FIRE is written in a code as HKTG, how is HOSE written in that code?",
 "JQUG", ["JQUF", "FMQC", "IPTF"],
 "Each letter moves two places forward: F to H, I to K, R to T, E to G. So HOSE becomes JQUG. FMQC moves each letter back instead, and IPTF moves only one place."),
("If LAGOS is written as SOGAL, how is KANO written?",
 "ONAK", ["OKAN", "NAKO", "KONA"],
 "The code writes the word backwards: LAGOS reversed is SOGAL, so KANO reversed is ONAK."),
("In a code, A = 26, B = 25, C = 24 and so on to Z = 1. How is BED written in that code?",
 "25-22-23", ["2-5-4", "24-21-22", "25-23-22"],
 "The alphabet is numbered backwards, so a letter's code is 27 minus its place: B = 27 - 2 = 25, E = 27 - 5 = 22, D = 27 - 4 = 23."),
("Fireman is to hose as surgeon is to:",
 "Scalpel", ["Hospital", "Patient", "Theatre"],
 "A hose is the fireman's working tool; a scalpel is the surgeon's. The hospital and theatre are places, and the patient is the person treated."),
("Passport is to travel abroad as licence is to:",
 "Drive", ["Road", "Vehicle", "Police"],
 "A passport permits you to travel abroad; a driving licence permits you to drive. Road and vehicle are things, not the permitted act."),
("Which one is the odd one out?",
 "Cylinder", ["Triangle", "Square", "Pentagon"],
 "A triangle, square and pentagon are flat shapes with straight sides; a cylinder is a solid with curved surfaces."),
("Which number is the odd one out: 23, 37, 47, 57?",
 "57", ["23", "37", "47"],
 "23, 37 and 47 are prime numbers. 57 = 3 x 19, so it is not prime."),
("Which one is the odd one out: mango, orange, pawpaw, cassava?",
 "Cassava", ["Mango", "Orange", "Pawpaw"],
 "Mango, orange and pawpaw are fruits that grow on trees; cassava is a root crop dug from the ground."),
("Ada walks 4 km east, turns left and walks 6 km, then turns right and walks 4 km. Where is she now, compared with her starting point?",
 "8 km east and 6 km north", ["6 km east and 8 km north", "8 km east and 6 km south", "4 km east and 6 km north"],
 "Facing east, a left turn faces north, and a right turn from north faces east again. She has gone 4 + 4 = 8 km east and 6 km north."),
("A guard faces south. He turns 90 degrees anticlockwise, then another 90 degrees anticlockwise. Which way is he facing now?",
 "North", ["East", "West", "South"],
 "Anticlockwise from south is east, and another quarter turn anticlockwise faces north. Two quarter turns in the same direction make a half turn."),
("A drone flies 20 km due east and then 48 km due north. How far is it, in a straight line, from where it started?",
 "52 km", ["68 km", "28 km", "50 km"],
 "The legs form a right angle, so the distance is the square root of 20 squared + 48 squared = the square root of 2,704 = 52 km. 68 km is the total path flown and 28 km the difference of the legs."),
("Femi, a man with no brothers or sisters, looks at a photograph and says: \"This woman is the mother of my father's only grandchild.\" How is the woman related to Femi?",
 "His wife", ["His mother", "His sister", "His daughter"],
 "Femi is his father's only child, so his father's only grandchild must be Femi's own child. The mother of Femi's child is his wife."),
("Musa's father and Aliyu's father are brothers. How is Musa related to Aliyu?",
 "Cousin", ["Brother", "Nephew", "Uncle"],
 "Musa and Aliyu have different fathers who are brothers, so each is the other's uncle's son: they are cousins."),
("If 3 March is a Friday, what day of the week is 29 March of the same year?",
 "Wednesday", ["Thursday", "Tuesday", "Friday"],
 "29 March is 26 days later: 3 weeks and 5 days. Five days after Friday is Wednesday."),
("What is the smaller angle between the hands of a clock at 11 o'clock?",
 "30 degrees", ["60 degrees", "45 degrees", "330 degrees"],
 "Each hour mark is 30 degrees apart. At 11 o'clock the hands are one mark apart, so the smaller angle is 30 degrees; 330 degrees is the larger angle the other way round."),
("In a row of 53 recruits, Emeka is 17th from the front. What is his position from the back?",
 "37th from the back", ["36th from the back", "38th from the back", "35th from the back"],
 "Position from the back = total - position from the front + 1 = 53 - 17 + 1 = 37th."),
("How many times does the digit 7 appear when you write the numbers from 1 to 80?",
 "18 times", ["17 times", "8 times", "19 times"],
 "As a units digit it appears 8 times (7, 17, ... 77), and as a tens digit 10 times (70 to 79). Counting 77 once for each digit gives 18."),
("If 2 # 3 = 11 and 4 # 1 = 9, what is 5 # 2?",
 "17", ["29", "13", "19"],
 "The rule is a x b + a + b: 6 + 5 = 11 and 4 + 5 = 9, so 10 + 7 = 17."),
("Five officers stand in a row. Efe is at the far left and Dayo at the far right. Bola stands just to the right of Ada, and Chika stands just to the left of Dayo. Who is in the middle?",
 "Bola", ["Ada", "Chika", "Efe"],
 "Efe is 1st and Dayo 5th, so Chika is 4th. Ada and Bola fill 2nd and 3rd with Bola on the right, so Bola is in the middle."),
]
