# QA: algebra. Every answer asserted.
from fractions import Fraction as Fr
import math
assert 7 ** 2 - 2 * 10 == 29
g = lambda x: x * x + 1
f = lambda x: 3 * x + 2
assert f(g(2)) == 17 and g(f(2)) == 65
assert 3 * 6 + 2 * 3 == 24 and 6 - 3 == 3
assert 5 + 4 * 3 == 17 and 5 + 11 * 3 == 38 and 10 * (2 * 5 + 19 * 3) == 670
assert Fr(18) / (1 - Fr(1, 3)) == 27
assert len([x for x in range(-20, 30) if abs(x - 4) < 6]) == 11
assert math.log2(8) + round(math.log(81, 3)) - round(math.log(25, 5)) == 5
assert 8 * 8 - 4 * 16 == 0
assert min(x * x - 4 * x for x in range(-10, 10)) == -4
assert (52 + 14) // 2 == 33
assert sum(range(1, 40, 2)) == 400
assert 2 ** 6 == 64 and 3 ** 4 == 81
assert len(str(2 ** 50)) == 16
assert 5 ** 2 - 2 == 23
assert Fr(6, 4) == Fr(3, 2)
assert 4 * 7 - 7 == 21
assert 3 * 2 ** 2 == 12 and 3 * 2 ** 5 == 96 and 3 * (2 ** 6 - 1) == 189
assert max(-x * x + 6 * x + 7 for x in range(-10, 10)) == 16
assert len([(x, y) for x in range(1, 50) for y in range(1, 50) if 3 * x + 4 * y == 48]) == 3
assert 3 * 12 + 12 == 2 * (12 + 12)
assert 7 + (-2) == 5 and abs(2 * 7 - 5) == 9 and abs(2 * -2 - 5) == 9

ITEMS = [
    # ---------- Test 1 ----------
    T(1, 2, "Quadratic equations", "If $a$ and $b$ are the roots of $x^2 - 7x + 10 = 0$, what is the value of $a^2 + b^2$?",
      "29", "The roots sum to 7 and multiply to 10, so $a^2 + b^2 = (a + b)^2 - 2ab = 49 - 20 = 29$. Directly, the roots are 2 and 5, and 4 + 25 = 29."),
    N(1, 2, "Functions", "If $f(x) = 3x + 2$ and $g(x) = x^2 + 1$, what is $f(g(2))$?",
      "17", ["15", "19", "65"], "$g(2) = 4 + 1 = 5$, and $f(5) = 15 + 2 = 17$. Applying the functions in the other order, $g(f(2)) = g(8) = 65$."),
    T(1, 1, "Linear equations", "If $3x + 2y = 24$ and $x - y = 3$, what is the value of $xy$?",
      "18", "From the second equation $x = y + 3$. Substituting, $3y + 9 + 2y = 24$, so $y = 3$ and $x = 6$. Then $xy = 18$."),
    T(1, 3, "Arithmetic progressions", "The 5th term of an arithmetic progression is 17 and its 12th term is 38. What is the sum of its first 20 terms?",
      "670", "Seven steps raise the term by 21, so the common difference is 3 and the first term is 17 - 12 = 5. The 20th term is 5 + 57 = 62, and the sum is 20/2 x (5 + 62) = 670."),
    N(1, 2, "Geometric progressions", "What is the sum to infinity of the series 18 + 6 + 2 + ... ?",
      "27", ["24", "30", "36"], "The common ratio is 1/3, so the sum is 18 / (1 - 1/3) = 18 x 3/2 = 27."),
    T(1, 3, "Inequalities", "How many integers $x$ satisfy $|x - 4| < 6$?",
      "11", "$|x - 4| < 6$ means $-6 < x - 4 < 6$, that is $-2 < x < 10$. The integers from -1 to 9 number 11. The end points -2 and 10 are excluded because the inequality is strict."),
    N(1, 2, "Logarithms", "What is the value of $\\log_2 8 + \\log_3 81 - \\log_5 25$?",
      "5", ["4", "6", "7"], "$\\log_2 8 = 3$, $\\log_3 81 = 4$ and $\\log_5 25 = 2$, so the value is 3 + 4 - 2 = 5."),
    # ---------- Test 2 ----------
    T(2, 2, "Quadratic equations", "The equation $x^2 + kx + 16 = 0$ has two equal roots, and $k$ is positive. What is $k$?",
      "8", "Equal roots need a zero discriminant: $k^2 - 4 \\times 16 = 0$, so $k^2 = 64$ and, since $k$ is positive, $k = 8$."),
    N(2, 2, "Functions", "What is the minimum value of $f(x) = x^2 - 4x$?",
      "-4", ["-8", "0", "4"], "Completing the square, $x^2 - 4x = (x - 2)^2 - 4$, which is smallest, -4, when $x = 2$."),
    T(2, 1, "Linear equations", "The sum of two numbers is 52 and their difference is 14. What is the larger number?",
      "33", "Adding the two equations gives twice the larger number: 52 + 14 = 66, so the larger is 33 and the smaller 19."),
    T(2, 2, "Series", "The sum of the first $n$ odd natural numbers is 400. What is $n$?",
      "20", "The first $n$ odd numbers add up to $n^2$, so $n^2 = 400$ and $n = 20$."),
    N(2, 2, "Exponents", "If $2^{x + 1} = 64$, what is the value of $3^{x - 1}$?",
      "81", ["9", "27", "243"], "$64 = 2^6$, so $x + 1 = 6$ and $x = 5$. Then $3^{x - 1} = 3^4 = 81$."),
    S(2, 2, "Quadratic inequalities", "Which values of $x$ satisfy $x^2 - 7x + 12 < 0$?",
      ["$3 < x < 4$", "$x < 3$ or $x > 4$", "$-4 < x < -3$", "$x > 4$ only"],
      "$x^2 - 7x + 12 = (x - 3)(x - 4)$, which is negative only between its roots, so $3 < x < 4$. Outside the roots the product is positive."),
    T(2, 3, "Logarithms", "Given that $\\log_{10} 2 = 0.301$, how many digits does $2^{50}$ have?",
      "16", "$\\log_{10} 2^{50} = 50 \\times 0.301 = 15.05$, so $2^{50}$ lies between $10^{15}$ and $10^{16}$ and has 15 + 1 = 16 digits."),
    # ---------- Drill only ----------
    T(0, 2, "Algebraic identities", "If $x + \\frac{1}{x} = 5$, what is $x^2 + \\frac{1}{x^2}$?",
      "23", "Squaring, $x^2 + 2 + \\frac{1}{x^2} = 25$, so $x^2 + \\frac{1}{x^2} = 23$."),
    N(0, 2, "Quadratic equations", "If $p$ and $q$ are the roots of $x^2 - 6x + 4 = 0$, what is $\\frac{1}{p} + \\frac{1}{q}$?",
      "1.5", ["0.75", "2", "2.5"], "$\\frac{1}{p} + \\frac{1}{q} = \\frac{p + q}{pq} = \\frac{6}{4} = 1.5$."),
    T(0, 1, "Functions", "If $f(x) = 4x - 7$, for what value of $x$ is $f(x) = 21$?",
      "7", "$4x - 7 = 21$ gives $4x = 28$ and $x = 7$."),
    T(0, 3, "Geometric progressions", "The 3rd term of a geometric progression is 12 and its 6th term is 96. What is the sum of its first 6 terms?",
      "189", "Three steps multiply the term by 8, so the ratio is 2 and the first term is 12/4 = 3. The sum is 3 x (2^6 - 1)/(2 - 1) = 3 x 63 = 189."),
    N(0, 2, "Maxima and minima", "What is the greatest value of $-x^2 + 6x + 7$?",
      "16", ["7", "9", "25"], "$-x^2 + 6x + 7 = 16 - (x - 3)^2$, so the greatest value is 16, at $x = 3$."),
    T(0, 3, "Integer solutions", "How many ordered pairs of positive integers $(x, y)$ satisfy $3x + 4y = 48$?",
      "3", "$4y = 48 - 3x$, so $3x$ and therefore $x$ must be a multiple of 4: $x = 4, 8, 12$ give $y = 9, 6, 3$. $x = 16$ gives $y = 0$, which is not positive. Three pairs."),
    T(0, 2, "Word problems", "A father is three times as old as his son. In 12 years he will be twice as old as his son. How old is the son now, in years?",
      "12", "Let the son be $s$: $3s + 12 = 2(s + 12)$, so $s = 12$ and the father is 36."),
    N(0, 2, "Modulus equations", "What is the sum of all values of $x$ that satisfy $|2x - 5| = 9$?",
      "5", ["2", "7", "9"], "$2x - 5 = 9$ gives $x = 7$ and $2x - 5 = -9$ gives $x = -2$. Their sum is 5; 7 is only the larger value."),
]
