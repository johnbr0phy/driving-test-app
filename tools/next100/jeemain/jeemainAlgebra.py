# Mathematics: algebra. Sets, relations and functions; complex numbers and
# quadratic equations; matrices and determinants; permutations and
# combinations; binomial theorem; sequences and series (JEE (Main) 2027
# syllabus units 1 to 6). Key written first; numerical value answers are
# computed here and asserted by N().
from math import comb, factorial

ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 2, "Relations", "How many relations on the set $A = \\{1, 2, 3\\}$ are both reflexive and symmetric?",
      ["8", "64", "27", "512"],
      "Reflexive fixes the 3 pairs $(a, a)$. Symmetric means the 3 off-diagonal pairs come in 3 matched couples, each in or out, so there are $2^3 = 8$ such relations. 64 counts the reflexive relations only ($2^6$) and 512 counts every relation ($2^9$)."),
    S(1, 2, "Complex numbers", "Which curve is the locus of the points $z$ in the Argand plane with $|z - 2 - 3i| = |z + 4 - 3i|$?",
      ["The line $x = -1$", "The line $y = 3$", "The line $x = 1$", "A circle centred at $(-1, 3)$"],
      "The points are equidistant from $(2, 3)$ and $(-4, 3)$, so they lie on the perpendicular bisector of that segment. Its midpoint is $(-1, 3)$ and the segment is horizontal, so the bisector is the vertical line $x = -1$."),
    S(1, 2, "Quadratic equations", "If $\\alpha$ and $\\beta$ are the roots of $x^2 - 7x + 11 = 0$, what is $\\alpha^3 + \\beta^3$?",
      ["112", "27", "310", "574"],
      "$\\alpha + \\beta = 7$ and $\\alpha\\beta = 11$. $\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta) = 343 - 231 = 112$. 27 is $\\alpha^2 + \\beta^2$, and 574 adds the 231 instead of subtracting it."),
    S(1, 3, "Determinants", "$A$ is a $3 \\times 3$ matrix with $|A| = 5$. What is $|\\text{adj}(2A)|$?",
      ["1600", "40", "100", "200"],
      "For an $n \\times n$ matrix $B$, $|\\text{adj}\\,B| = |B|^{n-1}$. Here $|2A| = 2^3 \\times 5 = 40$, so $|\\text{adj}(2A)| = 40^2 = 1600$. 40 is $|2A|$ itself, and 200 is $2^3 \\times |\\text{adj}\\,A|$, which scales by the wrong power of 2."),
    S(1, 2, "Permutations", "How many 5-digit numbers divisible by 4 can be formed from the digits 1, 2, 3, 4 and 5, each used exactly once?",
      ["24", "30", "36", "48"],
      "A number is divisible by 4 when its last two digits are. With distinct digits from 1 to 5 those endings are 12, 24, 32 and 52. Each ending leaves 3 digits to arrange in $3! = 6$ ways, so $4 \\times 6 = 24$."),
    S(1, 2, "Binomial theorem", "What is the term independent of $x$ in the expansion of $\\left(2x^2 - \\frac{1}{x}\\right)^9$?",
      ["672", "-672", "84", "5376"],
      "$T_{r+1} = \\binom{9}{r}(2x^2)^{9-r}\\left(-\\frac{1}{x}\\right)^r$ has power $18 - 3r$, which is 0 at $r = 6$. The term is $\\binom{9}{6} \\cdot 2^3 \\cdot (-1)^6 = 84 \\times 8 = 672$. The sign is $+$ because $r$ is even."),
    S(1, 2, "AM and GM", "$x$ and $y$ are positive real numbers with $xy = 9$. What is the least value of $4x + y$?",
      ["12", "13", "15", "37"],
      "By AM $\\geq$ GM, $4x + y \\geq 2\\sqrt{4xy} = 2\\sqrt{36} = 12$, with equality when $4x = y$, that is $x = \\frac{3}{2}$, $y = 6$. 15 is the value at $x = y = 3$, and 13 the value at $x = 1$, $y = 9$."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 2, "Arithmetic progression", "What is the sum of all two-digit numbers that leave a remainder of 3 when divided by 7?",
      sum(n for n in range(10, 100) if n % 7 == 3), 676,
      "The numbers are 10, 17, ..., 94, an AP with $d = 7$ and $\\frac{94 - 10}{7} + 1 = 13$ terms. Their sum is $\\frac{13}{2}(10 + 94) = 676$."),
    N(1, 3, "Systems of equations", "For what value of $k$ does the system $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + kz = 14$ have no solution?",
      next(k for k in range(-10, 11) if (2 * k - 6) - (k - 3) + 0 == 0), 3,
      "The coefficient determinant is $1(2k - 6) - 1(k - 3) + 1(2 - 2) = k - 3$, which is zero at $k = 3$. Then the second and third equations read $x + 2y + 3z = 10$ and $x + 2y + 3z = 14$, which contradict each other, so there is no solution."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 1, "Sets", "In a survey of 80 people, 52 read Hindi newspapers, 38 read English newspapers and 6 read neither. How many read both?",
      ["16", "10", "6", "8"],
      "74 people read at least one, and $n(H \\cup E) = n(H) + n(E) - n(H \\cap E)$, so $74 = 52 + 38 - n(H \\cap E)$ and $n(H \\cap E) = 16$. 10 is $90 - 80$, which forgets the 6 who read neither."),
    S(2, 2, "Cube roots of unity", "$\\omega$ is a complex cube root of unity. What is $(1 + \\omega - \\omega^2)^3$?",
      ["-8", "-4", "0", "8"],
      "$1 + \\omega + \\omega^2 = 0$, so $1 + \\omega = -\\omega^2$ and $1 + \\omega - \\omega^2 = -2\\omega^2$. Cubing gives $-8\\omega^6 = -8$, since $\\omega^3 = 1$. 8 drops the minus sign."),
    S(2, 2, "Quadratic equations", "How many real solutions does $x^2 - 5|x| + 6 = 0$ have?",
      ["4", "0", "2", "3"],
      "Write $x^2 = |x|^2$: $|x|^2 - 5|x| + 6 = 0$ gives $|x| = 2$ or $|x| = 3$, so $x = \\pm 2, \\pm 3$, four solutions. 2 counts only the positive roots."),
    S(2, 3, "Matrices", "The matrix $A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 2 \\end{pmatrix}$ satisfies $A^2 - 5A + 7I = O$. Which of these is $A^{-1}$?",
      ["$\\frac{1}{7}(5I - A)$", "$\\frac{1}{7}(A - 5I)$", "$\\frac{1}{5}(7I - A)$", "$7(5I - A)$"],
      "Multiply $A^2 - 5A + 7I = O$ by $A^{-1}$: $A - 5I + 7A^{-1} = O$, so $A^{-1} = \\frac{1}{7}(5I - A)$. Check: $|A| = 6 + 1 = 7$ and $5I - A$ is $\\text{adj}\\,A$."),
    S(2, 2, "Combinations", "In how many ways can 8 identical balls be put into 3 different boxes so that no box is empty?",
      ["21", "28", "45", "56"],
      "Give each box one ball first, then share the other 5 freely among 3 boxes: $\\binom{5 + 2}{2} = \\binom{7}{2} = 21$. 45 is $\\binom{10}{2}$, which allows empty boxes."),
    S(2, 2, "Binomial theorem", "In the expansion of $(1 + x)^n$, the coefficients of the 5th and 9th terms are equal. What is $n$?",
      ["12", "10", "13", "14"],
      "The 5th and 9th terms have coefficients $\\binom{n}{4}$ and $\\binom{n}{8}$. $\\binom{n}{4} = \\binom{n}{8}$ with $4 \\neq 8$ needs $4 + 8 = n$, so $n = 12$. 13 adds the term numbers instead of the indices $r$."),
    S(2, 2, "Geometric progression", "The 3rd and 7th terms of a GP of positive terms are 12 and 192. What is the sum of its first 6 terms?",
      ["189", "63", "93", "96"],
      "$ar^2 = 12$ and $ar^6 = 192$, so $r^4 = 16$, $r = 2$ and $a = 3$. $S_6 = 3 \\cdot \\frac{2^6 - 1}{2 - 1} = 189$. 93 is $S_5$, the sum of 5 terms, and 96 is the 6th term."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 2, "Functions", "How many onto (surjective) functions are there from $\\{1, 2, 3, 4\\}$ to $\\{a, b, c\\}$?",
      3**4 - 3 * 2**4 + 3 * 1**4, 36,
      "By inclusion and exclusion, onto maps from a 4-set to a 3-set number $3^4 - \\binom{3}{1}2^4 + \\binom{3}{2}1^4 = 81 - 48 + 3 = 36$."),
    N(2, 2, "Complex numbers", "What is the modulus of $\\dfrac{(\\sqrt{3} + i)^6}{(1 - i)^4}$?",
      round(abs((3**0.5 + 1j)**6 / (1 - 1j)**4)), 16,
      "$|\\sqrt{3} + i| = 2$ and $|1 - i| = \\sqrt{2}$. The modulus of a quotient of powers is $\\frac{2^6}{(\\sqrt{2})^4} = \\frac{64}{4} = 16$."),
    # ---------- Drill only ----------
    S(0, 1, "Relations", "$R$ is the relation on the integers given by $a\\,R\\,b$ when $a - b$ is divisible by 5. Which describes $R$?",
      ["An equivalence relation", "Reflexive and symmetric only", "Symmetric and transitive only", "Reflexive and transitive only"],
      "$a - a = 0$ is divisible by 5 (reflexive); if $5 \\mid a - b$ then $5 \\mid b - a$ (symmetric); and $a - c = (a - b) + (b - c)$ (transitive). So $R$ is an equivalence relation, congruence modulo 5."),
    S(0, 2, "Quadratic equations", "For which values of $k$ are the roots of $x^2 + kx + 9 = 0$ not real?",
      ["$-6 < k < 6$", "$k < -6$ or $k > 6$", "$-3 < k < 3$", "$k > 6$ only"],
      "The roots are not real when the discriminant is negative: $k^2 - 36 < 0$, so $-6 < k < 6$. $k < -6$ or $k > 6$ is where the roots are real and different."),
    S(0, 2, "Matrices", "Statement I: The determinant of every skew-symmetric matrix of odd order is zero. Statement II: Every square matrix is the sum of a symmetric matrix and a skew-symmetric matrix. Which is correct?",
      [STATEMENTS[0], STATEMENTS[1], STATEMENTS[2], STATEMENTS[3]],
      "For skew-symmetric $A$ of odd order $n$, $|A| = |A^T| = |-A| = (-1)^n|A| = -|A|$, so $|A| = 0$. And $A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)$ splits any square matrix that way. Both statements are true."),
    S(0, 2, "Series", "What is $\\sum_{k=1}^{20} k(k + 1)$?",
      [str(sum(k * (k + 1) for k in range(1, 21))), "1540", "2660", "2870"],
      "$\\sum k(k + 1) = \\sum k^2 + \\sum k = 2870 + 210 = 3080$, or directly $\\frac{n(n + 1)(n + 2)}{3} = \\frac{20 \\cdot 21 \\cdot 22}{3} = 3080$. 2870 is $\\sum k^2$ alone."),
    N(0, 2, "Combinations", "A committee of 4 is chosen from 6 men and 5 women. In how many ways can this be done if it has at least 3 women?",
      comb(5, 3) * comb(6, 1) + comb(5, 4), 65,
      "Exactly 3 women: $\\binom{5}{3}\\binom{6}{1} = 60$. All 4 women: $\\binom{5}{4} = 5$. Total $60 + 5 = 65$."),
    N(0, 3, "Series", "What is the sum of the infinite series $1 + \\frac{3}{2} + \\frac{5}{4} + \\frac{7}{8} + \\cdots$?",
      round(sum((2 * k + 1) / 2**k for k in range(200))), 6,
      "This is an arithmetico-geometric series with $a = 1$, $d = 2$, $r = \\frac{1}{2}$. Its sum is $\\frac{a}{1 - r} + \\frac{dr}{(1 - r)^2} = 2 + \\frac{1}{1/4} = 2 + 4 = 6$."),
]
assert sum(k * (k + 1) for k in range(1, 21)) == 3080
assert 52 + 38 - (80 - 6) == 16
assert comb(9, 6) * 8 == 672 and 7**3 - 3 * 11 * 7 == 112
