# Mathematics: coordinate geometry, three-dimensional geometry, vector
# algebra, statistics and probability, and trigonometry (JEE (Main) 2027
# syllabus units 10 to 14). Key written first; numerical value answers are
# computed here and asserted by N().
from fractions import Fraction as F
from math import sqrt, sin, cos, pi


def det3(a, b, c):
    return (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0])
            + a[2] * (b[0] * c[1] - b[1] * c[0]))


def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


# Diagonals of the parallelogram in Test 1: area = |d1 x d2| / 2 = 5 sqrt 3.
_d = cross((3, 1, -2), (1, -3, 4))
assert _d == (-2, -14, -10) and sum(v * v for v in _d) == 300
# Mean and variance item: the two unknown observations.
_s, _sq = 5 * 6 - (2 + 5 + 9), 5 * (8 + 36) - (4 + 25 + 81)
_ab = (_s * _s - _sq) // 2
# Solutions of sin 2x = cos x in [0, 2 pi].
_sols = {round(x, 6) for x in (pi / 2, 3 * pi / 2, pi / 6, 5 * pi / 6)}
assert all(abs(sin(2 * x) - cos(x)) < 1e-5 for x in _sols) and len(_sols) == 4
# Bayes item.
assert F(1, 2) * F(3, 5) / (F(1, 2) * F(3, 5) + F(1, 2) * F(2, 5)) == F(3, 5)

ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 2, "Trigonometric equations", "How many solutions does $\\sin 2x = \\cos x$ have in the interval $[0, 2\\pi]$?",
      ["4", "2", "6", "8"],
      "$\\sin 2x - \\cos x = \\cos x(2\\sin x - 1) = 0$. $\\cos x = 0$ gives $\\frac{\\pi}{2}, \\frac{3\\pi}{2}$, and $\\sin x = \\frac{1}{2}$ gives $\\frac{\\pi}{6}, \\frac{5\\pi}{6}$: four solutions. Dividing by $\\cos x$ loses the first two and leaves 2."),
    S(1, 2, "Straight lines", "What is the distance between the parallel lines $3x + 4y - 7 = 0$ and $6x + 8y + 11 = 0$?",
      ["5/2", "2/5", "4/5", "18/5"],
      "Write the second line as $3x + 4y + \\frac{11}{2} = 0$. The distance is $\\frac{|-7 - 11/2|}{\\sqrt{3^2 + 4^2}} = \\frac{25/2}{5} = \\frac{5}{2}$. 18/5 uses 11 without first halving the equation."),
    S(1, 1, "Circles", "Which is the equation of the circle on the segment joining $(1, 2)$ and $(5, -4)$ as diameter?",
      ["$x^2 + y^2 - 6x + 2y - 3 = 0$", "$x^2 + y^2 + 6x - 2y - 3 = 0$", "$x^2 + y^2 - 6x + 2y + 13 = 0$", "$x^2 + y^2 - 6x - 2y - 3 = 0$"],
      "The diameter form is $(x - 1)(x - 5) + (y - 2)(y + 4) = 0$, which expands to $x^2 - 6x + 5 + y^2 + 2y - 8 = 0$, that is $x^2 + y^2 - 6x + 2y - 3 = 0$. The centre is $(3, -1)$."),
    S(1, 1, "Conic sections", "What is the eccentricity of the hyperbola $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$?",
      ["$\\frac{5}{4}$", "$\\frac{4}{5}$", "$\\frac{\\sqrt{7}}{4}$", "$\\frac{5}{3}$"],
      "For a hyperbola, $e^2 = 1 + \\frac{b^2}{a^2} = 1 + \\frac{9}{16} = \\frac{25}{16}$, so $e = \\frac{5}{4}$. $\\frac{\\sqrt{7}}{4}$ uses the ellipse rule $1 - \\frac{b^2}{a^2}$, and a hyperbola's $e$ is always above 1."),
    S(1, 2, "Three-dimensional geometry", "What is the angle between two lines with direction ratios $1, 2, 2$ and $2, 2, 1$?",
      ["$\\cos^{-1}\\frac{8}{9}$", "$\\cos^{-1}\\frac{4}{9}$", "$\\cos^{-1}\\frac{2}{3}$", "$\\frac{\\pi}{2}$"],
      "$\\cos\\theta = \\frac{1 \\cdot 2 + 2 \\cdot 2 + 2 \\cdot 1}{\\sqrt{9}\\sqrt{9}} = \\frac{8}{9}$. Each set of ratios has length 3, so the denominator is 9. Taking the middle product as $-4$ gives 0 and the wrong answer $\\frac{\\pi}{2}$."),
    S(1, 3, "Vector product", "The diagonals of a parallelogram are $3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\hat{i} - 3\\hat{j} + 4\\hat{k}$. What is its area?",
      ["$5\\sqrt{3}$", "$10\\sqrt{3}$", "$5\\sqrt{2}$", "$\\sqrt{75}/2$"],
      "With diagonals $\\vec{d_1}$ and $\\vec{d_2}$, the area is $\\frac{1}{2}|\\vec{d_1} \\times \\vec{d_2}|$. The cross product is $-2\\hat{i} - 14\\hat{j} - 10\\hat{k}$, of length $\\sqrt{300} = 10\\sqrt{3}$, so the area is $5\\sqrt{3}$. $10\\sqrt{3}$ forgets the $\\frac{1}{2}$ that applies to diagonals."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 3, "Statistics", "Five observations have mean 6 and variance 8. Three of them are 2, 5 and 9. What is the product of the other two?",
      _ab, 43,
      "The sum is $5 \\times 6 = 30$, so the other two add to $30 - 16 = 14$. The sum of squares is $5(8 + 6^2) = 220$, so theirs is $220 - 110 = 110$. Then $2ab = 14^2 - 110 = 86$ and $ab = 43$."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 2, "Trigonometric ratios", "What is the value of $\\tan 75^\\circ - \\cot 75^\\circ$?",
      ["$2\\sqrt{3}$", "$\\sqrt{3}$", "$4$", "$2 + \\sqrt{3}$"],
      "$\\tan 75^\\circ = 2 + \\sqrt{3}$ and $\\cot 75^\\circ = 2 - \\sqrt{3}$, so the difference is $2\\sqrt{3}$. 4 is their sum, and $2 + \\sqrt{3}$ is $\\tan 75^\\circ$ alone."),
    S(2, 2, "Straight lines", "What is the foot of the perpendicular from $(2, 3)$ to the line $x + y - 11 = 0$?",
      ["$(5, 6)$", "$(8, 9)$", "$(6, 5)$", "$(4, 7)$"],
      "The foot is $(2, 3) - \\frac{2 + 3 - 11}{1^2 + 1^2}(1, 1) = (2, 3) + 3(1, 1) = (5, 6)$, which lies on the line. $(8, 9)$ is the mirror image, twice as far along the normal."),
    S(2, 2, "Conic sections", "Which line is a tangent to the parabola $y^2 = 8x$ with slope 2?",
      ["$y = 2x + 1$", "$y = 2x + 4$", "$y = 2x + 2$", "$y = 2x - 1$"],
      "For $y^2 = 4ax$ the tangent with slope $m$ is $y = mx + \\frac{a}{m}$. Here $a = 2$ and $m = 2$, so $y = 2x + 1$. Substituting gives $(2x + 1)^2 = 8x$, that is $(2x - 1)^2 = 0$, a double root."),
    S(2, 2, "Conic sections", "What is the length of the latus rectum of the ellipse $9x^2 + 25y^2 = 225$?",
      ["18/5", "9/5", "6", "50/3"],
      "Divide by 225: $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, so $a = 5$ and $b = 3$. The latus rectum is $\\frac{2b^2}{a} = \\frac{18}{5}$. 6 is the minor axis $2b$, and 50/3 is $\\frac{2a^2}{b}$, with $a$ and $b$ swapped."),
    S(2, 3, "Bayes' theorem", "Bag I has 3 red and 2 black balls; bag II has 2 red and 3 black balls. A bag is chosen at random and one ball drawn from it is red. What is the probability that it came from bag I?",
      ["3/5", "3/10", "2/5", "1/2"],
      "$P(I \\mid R) = \\frac{\\frac{1}{2} \\cdot \\frac{3}{5}}{\\frac{1}{2} \\cdot \\frac{3}{5} + \\frac{1}{2} \\cdot \\frac{2}{5}} = \\frac{3}{5}$. 3/10 is $P(I \\cap R)$, the joint probability, not the conditional one."),
    S(2, 2, "Statistics", "Statement I: Adding 5 to every observation leaves the variance unchanged. Statement II: Multiplying every observation by 2 doubles the variance. Which is correct?",
      [STATEMENTS[2], STATEMENTS[0], STATEMENTS[1], STATEMENTS[3]],
      "A shift moves the mean by the same amount, so deviations and the variance are unchanged. Multiplying by 2 doubles each deviation, so the variance is multiplied by $2^2 = 4$; it is the standard deviation that doubles."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 2, "Vectors", "The vectors $2\\hat{i} - \\hat{j} + 3\\hat{k}$, $\\hat{i} + 4\\hat{j} - 2\\hat{k}$ and $\\lambda\\hat{i} + 5\\hat{j} + 5\\hat{k}$ are coplanar. What is $\\lambda$?",
      next(l for l in range(-20, 21) if det3((2, -1, 3), (1, 4, -2), (l, 5, 5)) == 0), 8,
      "Coplanar vectors have a zero scalar triple product: $2(20 + 10) + 1(5 + 2\\lambda) + 3(5 - 4\\lambda) = 60 + 5 + 2\\lambda + 15 - 12\\lambda = 80 - 10\\lambda = 0$, so $\\lambda = 8$."),
    # ---------- Drill only ----------
    S(0, 1, "Trigonometric equations", "What is the general solution of $\\tan\\theta = -1$, where $n$ is any integer?",
      ["$n\\pi - \\frac{\\pi}{4}$", "$2n\\pi - \\frac{\\pi}{4}$", "$n\\pi + \\frac{\\pi}{4}$", "$\\frac{n\\pi}{2} - \\frac{\\pi}{4}$"],
      "$\\tan$ has period $\\pi$ and $\\tan\\left(-\\frac{\\pi}{4}\\right) = -1$, so $\\theta = n\\pi - \\frac{\\pi}{4}$. $2n\\pi - \\frac{\\pi}{4}$ misses half the solutions, such as $\\frac{3\\pi}{4}$."),
    S(0, 2, "Circles", "What is the length of the tangent from the point $(6, 1)$ to the circle $x^2 + y^2 - 4x + 2y - 4 = 0$?",
      ["$\\sqrt{11}$", "$11$", "$\\sqrt{13}$", "$3$"],
      "The tangent length is $\\sqrt{S_1}$, where $S_1 = 36 + 1 - 24 + 2 - 4 = 11$. So it is $\\sqrt{11}$; 11 forgets the square root."),
    S(0, 2, "Probability", "Two fair dice are thrown. What is the probability that the sum of the numbers is a prime number?",
      ["5/12", "1/3", "7/18", "1/2"],
      "The prime sums are 2, 3, 5, 7 and 11, which occur in 1, 2, 4, 6 and 2 ways: 15 of the 36 outcomes, so $\\frac{15}{36} = \\frac{5}{12}$. Forgetting the sum 2 gives $\\frac{14}{36} = \\frac{7}{18}$."),
    S(0, 1, "Direction cosines", "A line makes equal acute angles with all three coordinate axes. What are its direction cosines?",
      ["$\\frac{1}{\\sqrt{3}}, \\frac{1}{\\sqrt{3}}, \\frac{1}{\\sqrt{3}}$", "$\\frac{1}{3}, \\frac{1}{3}, \\frac{1}{3}$", "$1, 1, 1$", "$\\frac{1}{\\sqrt{2}}, \\frac{1}{\\sqrt{2}}, 0$"],
      "With $l = m = n$ and $l^2 + m^2 + n^2 = 1$, $3l^2 = 1$ and $l = \\frac{1}{\\sqrt{3}}$ for acute angles. $1, 1, 1$ are direction ratios, not cosines."),
    N(0, 2, "Probability", "A fair coin is tossed $n$ times. What is the least $n$ for which the probability of at least one head is at least 0.99?",
      next(n for n in range(1, 30) if 1 - 0.5**n >= 0.99), 7,
      "$1 - \\left(\\frac{1}{2}\\right)^n \\geq 0.99$ means $2^n \\geq 100$. $2^6 = 64$ is too small and $2^7 = 128$ is enough, so $n = 7$."),
    N(0, 2, "Statistics", "What is the variance of the seven numbers 2, 4, 6, 8, 10, 12 and 14?",
      round(sum((x - 8)**2 for x in range(2, 15, 2)) / 7), 16,
      "The mean is 8 and the squared deviations are 36, 16, 4, 0, 4, 16, 36, which add to 112. The variance is $\\frac{112}{7} = 16$."),
]
