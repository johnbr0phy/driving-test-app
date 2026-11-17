"""Original reasoning questions, key first; build.py rotates the key into place."""
from itertools import permutations

ITEMS = [
 ('Ravi walks 10 m north, turns right and walks 6 m, turns right again and walks 18 m, then turns left and walks 9 m. How far is he from his starting point, and in which direction?',
  ['17 m south-east', '17 m north-east', '15 m south-east', '23 m south-east'],
  'Taking the start as (0, 0), he reaches (0, 10), (6, 10), (6, -8) and finally (15, -8). That is 15 m east and 8 m south, a straight-line distance of 17 m to the south-east. 15 m counts only the eastward part.'),
 ('Early one morning, Gita stands so that her shadow falls directly to her left. Which direction is she facing?',
  ['North', 'South', 'East', 'North-east'],
  'In the morning the sun is in the east, so shadows point west. If west is on her left, she is facing north.'),
 ('B is 8 km east of A. C is 6 km north of B. D is 14 km west of C. Where is D from A?',
  ['About 8.5 km north-west', 'About 8.5 km north-east', '6 km due north', 'About 10 km north-west'],
  'D is 8 - 14 = 6 km west and 6 km north of A, so it lies north-west at the square root of 72, about 8.5 km.'),
 ('A cyclist facing south turns right, then turns 135° clockwise, then turns 90° anticlockwise. Which direction is the cyclist now facing?',
  ['North-west', 'North-east', 'South-west', 'South-east'],
  'A right turn from south faces west. 135° clockwise from west is north-east, and 90° anticlockwise from north-east is north-west.'),
 ('Statements: All clerks are typists. Some typists are drivers. No driver is a cashier. Which conclusion definitely follows?',
  ['Some typists are not cashiers.', 'Some clerks are drivers.', 'No clerk is a cashier.', 'Some drivers are clerks.'],
  'The typists who are drivers cannot be cashiers, so some typists are not cashiers. The drivers among the typists need not be clerks, so nothing about clerks follows.'),
 ('Statements: No pen is a pencil. All pencils are erasers. Some erasers are rulers. Which conclusion definitely follows?',
  ['Some erasers are not pens.', 'No eraser is a pen.', 'Some rulers are pencils.', 'Some pens are rulers.'],
  'Every pencil is an eraser and no pencil is a pen, so at least those erasers are not pens. Other erasers could still be pens, so "No eraser is a pen" does not follow.'),
 ('Statements: Some officers are lawyers. All lawyers are graduates. No graduate is illiterate. Which conclusion definitely follows?',
  ['Some officers are not illiterate.', 'All graduates are lawyers.', 'Some officers are illiterate.', 'No officer is illiterate.'],
  'The officers who are lawyers are graduates, and no graduate is illiterate. That settles only those officers, so "No officer is illiterate" goes too far.'),
 ('Statements: All buses are vehicles. Some vehicles are trucks. All trucks are heavy. Which conclusion definitely follows?',
  ['Some vehicles are heavy.', 'Some buses are trucks.', 'All vehicles are heavy.', 'Some buses are heavy.'],
  'The vehicles that are trucks are heavy, so some vehicles are heavy. The buses need not overlap with the trucks, so nothing about buses being heavy follows.'),
 ('Six people A, B, C, D, E and F sit in a row facing north. C is third from the left end. A is immediately to the right of C and B immediately to its left. F is not at either end, and D sits to the left of B. Who is second from the right end?',
  ['F', 'A', 'E', 'B'],
  'C is 3rd, A 4th and B 2nd. D must be 1st, F cannot take an end so is 5th, and E is 6th. Second from the right is the 5th seat, F.'),
 ('Pointing to a man, Meena says, "His mother is the only daughter of my mother." How is the man related to Meena?',
  ['Son', 'Brother', 'Nephew', 'Cousin'],
  "The only daughter of Meena's mother is Meena herself, so the man's mother is Meena and he is her son."),
 ("A is B's brother. C is A's father. D is C's sister. E is D's son. How is E related to B?",
  ['Cousin', 'Nephew', 'Brother', 'Uncle'],
  "C is the father of A and B, D is their aunt, and E is the aunt's son, so E is B's cousin."),
 ('In a row of 40 students, Ravi is 12th from the left and Sunil is 18th from the right. How many students sit between them?',
  ['10', '11', '9', '12'],
  'Sunil is 40 - 18 + 1 = 23rd from the left. Between the 12th and 23rd places are 23 - 12 - 1 = 10 students.'),
 ('Find the next number: 3, 7, 15, 31, 63, ___',
  ['127', '125', '126', '95'],
  'Each term is double the previous one plus 1: 63 times 2 + 1 = 127. The gaps 4, 8, 16, 32 double each time, so the next gap is 64.'),
 ('Find the next number: 2, 6, 12, 20, 30, ___',
  ['42', '40', '44', '36'],
  'The terms are 1×2, 2×3, 3×4, 4×5, 5×6, so the next is 6×7 = 42. The gaps 4, 6, 8, 10 also give 30 + 12 = 42.'),
 ('Find the next number: 5, 11, 23, 47, ___',
  ['95', '94', '93', '71'],
  'Each term is double the previous one plus 1: 47 times 2 + 1 = 95.'),
 ('Find the next letter: B, E, J, Q, ___',
  ['Z', 'Y', 'X', 'W'],
  'The letters are in positions 2, 5, 10 and 17, rising by 3, 5 and 7. Adding 9 gives position 26, which is Z.'),
 ('Is the whole number n divisible by 6? I: n is divisible by 3. II: n is divisible by 4. Which data are sufficient to answer?',
  ['Both facts together are needed', 'The fact about 3 alone is enough', 'The fact about 4 alone is enough', 'Even both facts are not enough'],
  'Divisible by 3 alone allows 9, which is not divisible by 6; divisible by 4 alone allows 8. Together n is a multiple of 12, so it is divisible by 6.'),
 ('How many students are in a class? I: Ravi ranks 9th from the top and 14th from the bottom. II: There are 12 girls in the class. Which data are sufficient?',
  ['The fact about ranks alone is enough', 'The fact about girls alone is enough', 'Both facts together are needed', 'Even both facts are not enough'],
  'From the ranks alone the class has 9 + 14 - 1 = 22 students. The number of girls says nothing about the total.'),
 ('What is the cost of one pen? I: 3 pens and 2 pencils cost ₹46. II: 6 pens and 4 pencils cost ₹92. Which data are sufficient?',
  ['Even both equations are not enough', 'The first equation alone is enough', 'The second equation alone is enough', 'Both equations together are needed'],
  'The second equation is the first one doubled, so together they still give only one equation in two unknowns.'),
 ('In which direction is Q from P? I: Q is 5 km north of R. II: R is 5 km east of P. Which data are sufficient?',
  ['Both facts together are needed', 'The fact about Q and R alone is enough', 'The fact about R and P alone is enough', 'Neither fact is of any use'],
  'Neither statement on its own links P with Q. Together they place Q 5 km east and 5 km north of P, that is north-east.'),
 ('In an examination, P scored more than Q but less than R. S scored less than Q. T scored more than R. Who scored the third highest?',
  ['P', 'R', 'Q', 'T'],
  'The order from highest is T, R, P, Q, S, so P is third.'),
 ('In a certain code, TABLE is written as UBCMF. How is CHAIR written in that code?',
  ['DIBJS', 'DIBIS', 'BGZHQ', 'DJBJS'],
  'Each letter moves one place forward: C to D, H to I, A to B, I to J, R to S. BGZHQ moves each letter back instead.'),
 ('If CAT is coded as 24, adding the positions of its letters in the alphabet (3 + 1 + 20), what is the code for DOG?',
  ['26', '24', '27', '25'],
  'D, O and G are the 4th, 15th and 7th letters, and 4 + 15 + 7 = 26.'),
 ('Six friends P, Q, R, S, T and U sit around a circular table facing the centre. P sits opposite S. Q is on the immediate right of P. R sits between Q and S. T is not next to S. Who is on the immediate left of P?',
  ['T', 'U', 'Q', 'R'],
  "Q and R fill the two seats between P and S on one side. On the other side, the seat next to S is U's, because T may not sit by S, so T sits next to P on his left."),
]

# Check the seating puzzles have one solution.
row = [p for p in permutations('ABCDEF') if p[2] == 'C' and p[3] == 'A' and p[1] == 'B'
       and p.index('F') not in (0, 5) and p.index('D') < p.index('B')]
assert len(row) == 1 and row[0][4] == 'F'
ring = []
for p in permutations('QRSTU'):
    s = ('P',) + p  # seats 0..5 in one direction; right of P taken as seat 5
    if s[3] == 'S' and s[5] == 'Q' and s[4] == 'R' and s.index('T') not in (2, 4):
        ring.append(s)
assert len(ring) == 1 and ring[0][1] == 'T'
assert 2 ** 7 - 1 == 127 and 47 * 2 + 1 == 95
assert len(ITEMS) == 24
