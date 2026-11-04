from fractions import Fraction as F
CAT = "px5Algebra"; SEG = "ALG"
p, q = 4, -2
assert p**2 - 3*q == 22
x = 5; assert 5*(x - 2) + 3 == 2*x + 8
assert all((4 - 3*y > 19) == (y < -5) for y in range(-20, 20))
assert 54 / 9 == 6
assert 5 + 19*4 == 81
assert all(3*k + 1 == v for k, v in zip([1, 2, 3, 4], [4, 7, 10, 13]))
assert F(2 - 8, 4 - 1) == -2
assert (6 - 4, 2 + 3) == (2, 5)
Q = [
("Which expression represents \"5 less than twice a number n\"?",
 "2n - 5", ["5 - 2n", "2(n - 5)", "5n - 2"],
 "Twice a number is 2n, and 5 less than that subtracts 5 from it: 2n - 5. \"5 less than\" reverses the order of the words, so 5 - 2n is the common mistake."),
("Which expression is equivalent to (6x + 2y) - (4x - 3y)?",
 "2x + 5y", ["2x - y", "10x - y", "2x + y"],
 "Subtracting the whole second group changes both signs: 6x + 2y - 4x + 3y = 2x + 5y. Forgetting to subtract -3y gives 2x - y."),
("Which expression is equivalent to 3(2a - 4)?",
 "6a - 12", ["6a - 4", "5a - 7", "6a + 12"],
 "The distributive property multiplies each term by 3: 3 x 2a = 6a and 3 x (-4) = -12. Distributing to only the first term gives 6a - 4."),
("If p = 4 and q = -2, what is the value of p^2 - 3q?",
 "22", ["10", "-22", "14"],
 "p^2 = 16 and 3q = -6, so 16 - (-6) = 22. Dropping the negative sign on q gives 16 - 6 = 10."),
("What value of x solves 5(x - 2) + 3 = 2x + 8?",
 "5", ["3", "1", "11/3"],
 "Distribute: 5x - 10 + 3 = 2x + 8, so 5x - 7 = 2x + 8, 3x = 15 and x = 5. Check: 5(3) + 3 = 18 and 2(5) + 8 = 18."),
("What is the solution of 4 - 3y > 19?",
 "y < -5", ["y > -5", "y < 5", "y > 5"],
 "Subtract 4: -3y > 15. Dividing both sides by -3 reverses the inequality sign, so y < -5."),
("A rectangle has an area of 54 square centimeters and a length of 9 centimeters. What is its width?",
 "6 cm", ["45 cm", "18 cm", "3 cm"],
 "Area = length x width, so width = 54 / 9 = 6 cm. Subtracting 9 from 54 confuses the inverse operation."),
("A phone plan costs t dollars, where t = 12 + 0.5m and m is the number of minutes used. Which is the dependent variable?",
 "t", ["m", "0.5", "12"],
 "The total cost t depends on the minutes m, so t is the dependent variable and m the independent one. 12 and 0.5 are constants."),
("In the expression 7x^2 - 3x + 9, the coefficient of x is:",
 "-3", ["7", "9", "3"],
 "The coefficient includes its sign, so the x-term -3x has coefficient -3. 7 is the leading coefficient and 9 is the constant term."),
("What is the 20th term of the arithmetic sequence 5, 9, 13, 17, ...?",
 "81", ["85", "80", "77"],
 "The nth term is 5 + 4(n - 1), so the 20th term is 5 + 4 x 19 = 81. Using 4 x 20 adds one difference too many and gives 85."),
("In a function table, x = 1, 2, 3, 4 gives y = 4, 7, 10, 13. Which rule fits the table?",
 "y = 3x + 1", ["y = x + 3", "y = 4x", "y = 3x - 1"],
 "y rises by 3 each time x rises by 1, so the rule is 3x plus a constant; 3(1) + 1 = 4 fixes the constant at 1. y = x + 3 fits only the first pair."),
("A line passes through the points (1, 8) and (4, 2). What is its slope?",
 "-2", ["2", "-1/2", "-6"],
 "Slope = change in y / change in x = (2 - 8) / (4 - 1) = -6 / 3 = -2. The line falls from left to right, so the slope is negative; flipping the fraction gives -1/2."),
]
