# Mathematics: calculus. Functions, limits, continuity and differentiability;
# differentiation and its applications; integral calculus and areas;
# differential equations (JEE (Main) 2027 syllabus units 7 to 9). Key written
# first; numerical value answers are computed here and asserted by N().
from math import sqrt, sin, cos, pi, log, exp


def integrate(f, a, b, n=20000):
    """Simpson's rule, for checking definite integrals."""
    h = (b - a) / n
    s = f(a) + f(b) + sum((4 if i % 2 else 2) * f(a + i * h) for i in range(1, n))
    return s * h / 3


ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 2, "Limits", "What is $\\lim_{x \\to 0} \\dfrac{\\tan x - \\sin x}{x^3}$?",
      ["1/2", "0", "1/6", "1/3"],
      "$\\tan x - \\sin x = \\tan x(1 - \\cos x) \\approx x \\cdot \\frac{x^2}{2}$, so the limit is $\\frac{1}{2}$. 1/3 is the $x^3$ coefficient of $\\tan x - x$ and 1/6 that of $x - \\sin x$; neither is the difference asked for."),
    S(1, 2, "Limits", "What is $\\lim_{x \\to \\infty} \\left(1 + \\dfrac{3}{x}\\right)^{2x}$?",
      ["$e^6$", "$e^3$", "$e^{3/2}$", "$e^5$"],
      "$\\left(1 + \\frac{3}{x}\\right)^{2x} = \\left[\\left(1 + \\frac{3}{x}\\right)^{x}\\right]^2 \\to (e^3)^2 = e^6$. $e^3$ ignores the power 2, and $e^5$ adds the exponents instead of multiplying them."),
    S(1, 2, "Differentiability", "$f(x) = ax + b$ for $x < 1$ and $f(x) = x^2 + 1$ for $x \\geq 1$. For which $a$ and $b$ is $f$ differentiable at $x = 1$?",
      ["$a = 2,\\ b = 0$", "$a = 1,\\ b = 1$", "$a = 2,\\ b = 1$", "$a = 0,\\ b = 2$"],
      "Continuity at 1 needs $a + b = 2$. Equal one-sided derivatives need $a = 2x = 2$ at $x = 1$. So $a = 2$ and $b = 0$. $a = 1, b = 1$ is continuous but has a corner."),
    S(1, 2, "Derivatives", "What is the derivative of $\\ln\\left(x + \\sqrt{x^2 + 1}\\right)$?",
      ["$\\dfrac{1}{\\sqrt{x^2 + 1}}$", "$\\dfrac{1}{x + \\sqrt{x^2 + 1}}$", "$\\dfrac{x}{\\sqrt{x^2 + 1}}$", "$\\sqrt{x^2 + 1}$"],
      "The chain rule gives $\\frac{1 + \\frac{x}{\\sqrt{x^2 + 1}}}{x + \\sqrt{x^2 + 1}} = \\frac{\\sqrt{x^2 + 1} + x}{\\sqrt{x^2 + 1}\\,(x + \\sqrt{x^2 + 1})} = \\frac{1}{\\sqrt{x^2 + 1}}$. $\\frac{1}{x + \\sqrt{x^2 + 1}}$ forgets to differentiate the inside."),
    S(1, 2, "Maxima and minima", "What is the local maximum value of $f(x) = x^3 - 6x^2 + 9x + 4$?",
      ["8", "1", "3", "4"],
      "$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$. $f''(1) = -6 < 0$, so $x = 1$ gives a local maximum, $f(1) = 1 - 6 + 9 + 4 = 8$. 4 is the local minimum value $f(3)$; 1 and 3 are the $x$ values."),
    S(1, 2, "Definite integrals", "What is $\\displaystyle\\int_0^{\\pi/2} \\cos^3 x \\, dx$?",
      ["$\\dfrac{2}{3}$", "$\\dfrac{1}{3}$", "$\\dfrac{3\\pi}{16}$", "$\\dfrac{\\pi}{4}$"],
      "Write $\\cos^3 x = (1 - \\sin^2 x)\\cos x$ and put $t = \\sin x$: $\\int_0^1 (1 - t^2)\\,dt = 1 - \\frac{1}{3} = \\frac{2}{3}$. $\\frac{3\\pi}{16}$ is $\\int_0^{\\pi/2}\\cos^4 x\\,dx$, where the even power brings in a factor $\\frac{\\pi}{2}$."),
    S(1, 2, "Area under curves", "What is the area of the region enclosed by the curve $y = x^2 - 4$ and the $x$-axis?",
      ["32/3", "16/3", "8", "28/3"],
      "The curve cuts the axis at $x = \\pm 2$ and lies below it between them. Area $= \\int_{-2}^{2}(4 - x^2)\\,dx = 16 - \\frac{16}{3} = \\frac{32}{3}$. 16/3 is half of it, the part from 0 to 2 only."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 2, "Definite integrals", "What is the value of $\\displaystyle\\int_0^4 |x - 1| \\, dx$?",
      round(integrate(lambda x: abs(x - 1), 0, 4, 40000)), 5,
      "Split at $x = 1$: $\\int_0^1 (1 - x)\\,dx = \\frac{1}{2}$ and $\\int_1^4 (x - 1)\\,dx = \\frac{9}{2}$. The total is 5."),
    N(1, 3, "Maxima and minima", "A rectangle is inscribed in a semicircle of radius 6, with one side along the diameter. What is the largest possible area of the rectangle?",
      round(max(2 * x * sqrt(36 - x * x) for x in [i / 1000 for i in range(6001)])), 36,
      "With half-width $x$, the area is $A = 2x\\sqrt{36 - x^2}$. $A^2 = 4x^2(36 - x^2)$ is greatest at $x^2 = 18$, giving $A = 2 \\cdot 18 = 36$, which is $r^2$."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 2, "Domain", "What is the domain of $f(x) = \\dfrac{1}{\\sqrt{x^2 - 5x + 6}}$?",
      ["$(-\\infty, 2) \\cup (3, \\infty)$", "$(-\\infty, 2] \\cup [3, \\infty)$", "$(2, 3)$", "$[2, 3]$"],
      "The square root must be of a positive number (it is in the denominator), so $(x - 2)(x - 3) > 0$, which holds for $x < 2$ or $x > 3$. Including 2 and 3 would make the denominator zero."),
    S(2, 3, "Limits", "What is $\\lim_{x \\to 0} \\dfrac{e^{3x} - 1 - 3x}{x^2}$?",
      ["9/2", "3/2", "9/4", "3"],
      "$e^{3x} = 1 + 3x + \\frac{9x^2}{2} + \\cdots$, so the numerator is $\\frac{9x^2}{2} + \\cdots$ and the limit is $\\frac{9}{2}$. 3/2 uses $\\frac{3x^2}{2}$, squaring $x$ but not the 3."),
    S(2, 2, "Implicit differentiation", "The curve $x^2 + xy + y^2 = 7$ passes through $(1, 2)$. What is $\\dfrac{dy}{dx}$ there?",
      ["-4/5", "-1", "-2/5", "4/5"],
      "Differentiate: $2x + y + xy' + 2yy' = 0$. At $(1, 2)$: $2 + 2 + y'(1 + 4) = 0$, so $y' = -\\frac{4}{5}$. Dropping the $xy'$ term gives $-1$, and dropping the $y$ from the product rule gives $-\\frac{2}{5}$."),
    S(2, 2, "Monotonicity", "What is the largest open interval on which $f(x) = xe^{-x}$ is increasing?",
      ["$(-\\infty, 1)$", "$(1, \\infty)$", "$(0, \\infty)$", "$(-\\infty, 0)$"],
      "$f'(x) = e^{-x} - xe^{-x} = e^{-x}(1 - x)$. Since $e^{-x} > 0$, $f'(x) > 0$ exactly when $x < 1$. On $(1, \\infty)$ the function decreases, and $(-\\infty, 0)$ is only part of the interval where it increases."),
    S(2, 2, "Integration by parts", "What is $\\displaystyle\\int xe^{2x} \\, dx$?",
      ["$\\frac{e^{2x}}{4}(2x - 1) + C$", "$\\frac{e^{2x}}{2}(x - 1) + C$", "$\\frac{e^{2x}}{4}(2x + 1) + C$", "$\\frac{e^{2x}}{2}(2x - 1) + C$"],
      "By parts with $u = x$: $\\frac{xe^{2x}}{2} - \\int \\frac{e^{2x}}{2}dx = \\frac{xe^{2x}}{2} - \\frac{e^{2x}}{4} = \\frac{e^{2x}}{4}(2x - 1)$. Differentiating it gives back $xe^{2x}$."),
    S(2, 2, "Properties of definite integrals", "What is $\\displaystyle\\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x + \\cos x} \\, dx$?",
      ["$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$", "$1$", "$\\dfrac{\\pi}{8}$"],
      "Call it $I$. Replacing $x$ by $\\frac{\\pi}{2} - x$ gives the same integral with $\\cos x$ on top. Adding the two forms, $2I = \\int_0^{\\pi/2} 1\\,dx = \\frac{\\pi}{2}$, so $I = \\frac{\\pi}{4}$."),
    S(2, 2, "Differential equations", "What is the general solution of $\\dfrac{dy}{dx} + \\dfrac{y}{x} = x^2$ for $x > 0$?",
      ["$xy = \\frac{x^4}{4} + C$", "$y = \\frac{x^3}{3} + C$", "$xy = \\frac{x^3}{3} + C$", "$y = \\frac{x^4}{4} + Cx$"],
      "It is linear with integrating factor $e^{\\int dx/x} = x$. Then $\\frac{d}{dx}(xy) = x \\cdot x^2 = x^3$, so $xy = \\frac{x^4}{4} + C$. $\\frac{x^3}{3}$ forgets to multiply the right side by the integrating factor."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 2, "Definite integrals", "What is the value of $\\displaystyle\\int_1^{e^4} \\frac{\\ln x}{x} \\, dx$?",
      round(integrate(lambda x: log(x) / x, 1, exp(4), 40000)), 8,
      "Put $t = \\ln x$, $dt = \\frac{dx}{x}$: the limits become 0 and 4 and the integral is $\\int_0^4 t\\,dt = \\frac{16}{2} = 8$."),
    N(2, 2, "Maxima and minima", "$f(x) = x^3 + ax^2 + bx$ has turning points at $x = 1$ and $x = 3$. What is $b - a$?",
      9 - (-6), 15,
      "$f'(x) = 3x^2 + 2ax + b$ must equal $3(x - 1)(x - 3) = 3x^2 - 12x + 9$. So $2a = -12$, $a = -6$, and $b = 9$, giving $b - a = 15$."),
    # ---------- Drill only ----------
    S(0, 2, "Limits", "What is $\\lim_{x \\to \\pi/2} \\dfrac{1 - \\sin x}{\\left(\\frac{\\pi}{2} - x\\right)^2}$?",
      ["1/2", "0", "1/8", "1/4"],
      "Put $h = \\frac{\\pi}{2} - x$. Then $1 - \\sin x = 1 - \\cos h \\approx \\frac{h^2}{2}$, so the limit is $\\frac{1}{2}$."),
    S(0, 1, "Derivatives", "What is $\\dfrac{d}{dx}\\ln(\\sec x + \\tan x)$?",
      ["$\\sec x$", "$\\tan x$", "$\\sec x \\tan x$", "$\\sec^2 x$"],
      "The chain rule gives $\\frac{\\sec x\\tan x + \\sec^2 x}{\\sec x + \\tan x} = \\frac{\\sec x(\\tan x + \\sec x)}{\\sec x + \\tan x} = \\sec x$."),
    S(0, 2, "Mean value theorem", "For $f(x) = x^3$ on $[0, 3]$, which $c$ satisfies the conclusion of Lagrange's mean value theorem?",
      ["$\\sqrt{3}$", "$\\frac{3}{2}$", "$\\sqrt{2}$", "$1$"],
      "The mean slope is $\\frac{27 - 0}{3 - 0} = 9$. $f'(c) = 3c^2 = 9$ gives $c = \\sqrt{3}$, which lies in $(0, 3)$. $\\frac{3}{2}$ is the midpoint, which works only for quadratics."),
    S(0, 1, "Continuity", "Statement I: $f(x) = |x|$ is continuous at $x = 0$. Statement II: $f(x) = |x|$ is differentiable at $x = 0$. Which is correct?",
      [STATEMENTS[2], STATEMENTS[0], STATEMENTS[1], STATEMENTS[3]],
      "$|x| \\to 0 = f(0)$ from both sides, so it is continuous. But the left derivative is $-1$ and the right derivative is $+1$, a corner, so it is not differentiable there."),
    N(0, 1, "Area under curves", "What is the area of the region bounded by $y = |x|$ and the line $y = 4$?",
      round(integrate(lambda x: 4 - abs(x), -4, 4, 40000)), 16,
      "The region is a triangle with vertices $(0, 0)$, $(-4, 4)$ and $(4, 4)$: base 8 and height 4, so the area is $\\frac{1}{2} \\cdot 8 \\cdot 4 = 16$."),
    N(0, 2, "Definite integrals", "What is the value of $\\displaystyle\\int_0^{3\\pi} |\\sin x| \\, dx$?",
      round(integrate(lambda x: abs(sin(x)), 0, 3 * pi, 60000)), 6,
      "$|\\sin x|$ has period $\\pi$ and $\\int_0^{\\pi}\\sin x\\,dx = 2$, so over three periods the integral is $3 \\times 2 = 6$."),
]
