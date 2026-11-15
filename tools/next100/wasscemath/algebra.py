# B. Algebraic Processes (common areas): forming and evaluating expressions, expansion,
# factorisation, linear and simultaneous equations, change of subject, quadratic
# equations by factorisation and forming them from roots, graphs of linear and quadratic
# functions, linear inequalities in one variable and algebraic fractions. Binary
# operations, functions, completing the square and the formula, tangents to curves and
# graphical inequalities in two variables are not common to every country and are left
# out. Original items.


def _qr(a, b, c):
    d = b * b - 4 * a * c
    r = int(round(sqrt(d)))
    assert r * r == d
    return sorted([F(-b - r, 2 * a), F(-b + r, 2 * a)])


def _f(fr):
    if fr.denominator == 1:
        return str(fr.numerator)
    s = "-" if fr < 0 else ""
    return rf"{s}\frac{{{abs(fr.numerator)}}}{{{fr.denominator}}}"


def _pair(a, b, c):
    r1, r2 = _qr(a, b, c)
    return f"$x = {_f(r1)}$ or $x = {_f(r2)}$"


_int_set = {x for x in range(-10, 11) if -3 < 2 * x + 1 <= 9}
_sx = [(x, y) for x in range(-10, 11) for y in range(-10, 11) if 3 * x + 2 * y == 12 and x - y == -1]
_pen = [(p, e) for p in range(0, 1001, 25) for e in range(0, 1001, 25) if 3 * p + 2 * e == 850 and p + 4 * e == 700]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, "Forming and evaluating expressions",
      "A tailor charges ₦m for sewing a shirt and ₦n for a pair of trousers. Write an expression for the charge T, in naira, for 3 shirts and 4 pairs of trousers, and find T when m = 2,500 and n = 4,000.",
      ["₦23,500", "₦22,000", "₦16,000", "₦7,500"],
      r"$T = 3m + 4n = 3(2500) + 4(4000) = 7500 + 16000 = 23500$. Swapping the numbers ($4m + 3n$) gives ₦22,000.",
      chk=3 * 2500 + 4 * 4000, basics="substitution"),
    Q(1, 1, "Expansion",
      r"Expand $(2x - 3)(x + 5)$.",
      [r"$2x^{2} + 7x - 15$", r"$2x^{2} - 7x - 15$", r"$2x^{2} + 13x - 15$", r"$2x^{2} + 7x + 15$"],
      r"$(2x - 3)(x + 5) = 2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15$. The middle term combines $+10x$ and $-3x$.",
      chk=lambda x: (2 * x - 3) * (x + 5), basics="distributing"),
    Q(1, 2, "Factorising a quadratic expression",
      r"Factorise $6x^{2} - x - 2$.",
      [r"$(2x + 1)(3x - 2)$", r"$(2x - 1)(3x + 2)$", r"$(6x + 1)(x - 2)$", r"$(3x + 1)(2x - 2)$"],
      r"Find two numbers with product $6 \times (-2) = -12$ and sum $-1$: they are $-4$ and $3$. So $6x^2 - 4x + 3x - 2 = 2x(3x - 2) + 1(3x - 2) = (2x + 1)(3x - 2)$. Expanding $(2x - 1)(3x + 2)$ gives $+x$ in the middle, not $-x$.",
      chk=lambda x: 6 * x * x - x - 2, basics="factoring"),
    Q(1, 1, "Difference of two squares",
      r"Evaluate $63^{2} - 37^{2}$ without a calculator.",
      ["2600", "676", "2500", "3200"],
      r"$a^2 - b^2 = (a + b)(a - b)$, so $63^2 - 37^2 = (63 + 37)(63 - 37) = 100 \times 26 = 2600$. $(63 - 37)^2 = 676$ is a different thing.",
      chk=63 ** 2 - 37 ** 2, basics="factoring"),
    Q(1, 2, "Simultaneous linear equations",
      r"Solve the simultaneous equations $3x + 2y = 12$ and $x - y = -1$.",
      [f"$x = {_sx[0][0]}$, $y = {_sx[0][1]}$", r"$x = 3$, $y = 2$", r"$x = 2$, $y = -3$", r"$x = 4$, $y = 0$"],
      r"From the second equation $x = y - 1$. Substitute: $3(y - 1) + 2y = 12$, so $5y = 15$, $y = 3$ and $x = 2$. Check: $6 + 6 = 12$ and $2 - 3 = -1$. The pair $x = 4$, $y = 0$ fits only the first equation.",
      chk=f"$x = {_sx[0][0]}$, $y = {_sx[0][1]}$", basics="systems"),
    Q(1, 2, "Change of subject",
      r"Make $r$ the subject of the formula $A = P(1 + rt)$.",
      [r"$r = \frac{A - P}{Pt}$", r"$r = \frac{A - 1}{Pt}$", r"$r = \frac{A}{Pt} - P$", r"$r = \frac{A - P}{t}$"],
      r"Divide by $P$: $\frac{A}{P} = 1 + rt$. Subtract 1 and divide by $t$: $r = \frac{\frac{A}{P} - 1}{t} = \frac{A - P}{Pt}$. Check with $P = 100$, $r = 0.05$, $t = 2$: $A = 110$ and $\frac{110 - 100}{200} = 0.05$.",
      chk=ok(abs((110 - 100) / (100 * 2) - 0.05) < 1e-12, r"$r = \frac{A - P}{Pt}$")),
    Q(1, 2, "Quadratic equations by factorisation",
      r"Solve $x^{2} - 5x - 14 = 0$.",
      [_pair(1, -5, -14), r"$x = -7$ or $x = 2$", r"$x = 7$ or $x = 2$", r"$x = -14$ or $x = 1$"],
      r"$x^2 - 5x - 14 = (x - 7)(x + 2) = 0$, so $x = 7$ or $x = -2$. Check: $49 - 35 - 14 = 0$. The signs of the roots are the opposite of the signs in the factors.",
      chk=_pair(1, -5, -14)),
    Q(1, 1, "Linear inequalities",
      r"Solve the inequality $3 - 2x < 11$.",
      [r"$x > -4$", r"$x < -4$", r"$x > 4$", r"$x < 4$"],
      r"Subtract 3: $-2x < 8$. Dividing by $-2$ reverses the inequality: $x > -4$. Forgetting to reverse it gives $x < -4$. Check with $x = 0$: $3 < 11$ is true, and 0 is greater than $-4$.",
      chk=ok(all((3 - 2 * x < 11) == (x > -4) for x in range(-10, 10)), r"$x > -4$"), basics="inequalities"),

    # ---------------- Practice Test 2 ----------------
    Q(2, 2, "Linear equations with fractions",
      r"Solve $\frac{x + 2}{3} - \frac{x - 1}{4} = 2$.",
      ["13", "11", "5", "19"],
      r"Multiply by 12: $4(x + 2) - 3(x - 1) = 24$, so $4x + 8 - 3x + 3 = 24$ and $x = 13$. Writing $-3(x - 1)$ as $-3x - 3$ gives the wrong 19.",
      chk=[x for x in range(-30, 31) if F(x + 2, 3) - F(x - 1, 4) == 2][0], basics="solveX"),
    Q(2, 2, "Forming a quadratic equation",
      r"Find the quadratic equation whose roots are $-\frac{3}{2}$ and $4$.",
      [r"$2x^{2} - 5x - 12 = 0$", r"$2x^{2} + 5x - 12 = 0$", r"$2x^{2} - 11x + 12 = 0$", r"$x^{2} - 5x - 6 = 0$"],
      r"The roots give the factors $(2x + 3)$ and $(x - 4)$, so $(2x + 3)(x - 4) = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12 = 0$. Check: $2(16) - 20 - 12 = 0$.",
      chk=ok(2 * 16 - 5 * 4 - 12 == 0 and 2 * F(9, 4) + 5 * F(3, 2) - 12 == 0, r"$2x^{2} - 5x - 12 = 0$")),
    Q(2, 2, "Undefined algebraic fractions",
      r"For which values of $x$ is $\frac{2x + 1}{x^{2} + x - 12}$ undefined?",
      [_pair(1, 1, -12), r"$x = 4$ or $x = -3$", r"$x = -\frac{1}{2}$", r"$x = 12$ or $x = -1$"],
      r"A fraction is undefined when its denominator is zero: $x^2 + x - 12 = (x + 4)(x - 3) = 0$, so $x = -4$ or $x = 3$. A zero numerator ($x = -\frac{1}{2}$) makes the fraction equal to 0, which is defined.",
      chk=_pair(1, 1, -12)),
    Q(2, 3, "Fractions with binomial denominators",
      r"Simplify $\frac{2}{x - 1} - \frac{1}{x + 2}$.",
      [r"$\frac{x + 5}{(x - 1)(x + 2)}$", r"$\frac{x + 3}{(x - 1)(x + 2)}$", r"$\frac{1}{(x - 1)(x + 2)}$", r"$\frac{x + 5}{x^{2} + 1}$"],
      r"The common denominator is $(x - 1)(x + 2)$. The numerator is $2(x + 2) - 1(x - 1) = 2x + 4 - x + 1 = x + 5$. Writing $-(x - 1)$ as $-x - 1$ gives $x + 3$.",
      chk=lambda x: 2 / (x - 1) - 1 / (x + 2)),
    Q(2, 2, "Minimum point of a quadratic graph",
      r"Find the coordinates of the minimum point of the graph of $y = x^{2} - 6x + 5$.",
      ["(3, -4)", "(-3, 32)", "(3, 5)", "(6, 5)"],
      r"The axis of symmetry is halfway between the roots 1 and 5, at $x = 3$. Then $y = 9 - 18 + 5 = -4$, so the minimum point is $(3, -4)$.",
      chk=ok(min(x * x - 6 * x + 5 for x in range(-10, 11)) == -4, "(3, -4)")),
    Q(2, 3, "Graphical solution of equations",
      r"The graph of $y = x^{2} + 2x - 8$ has been drawn. Which line drawn on the same axes gives the solutions of $x^{2} + 2x - 5 = 0$?",
      [r"$y = -3$", r"$y = 3$", r"$y = -5$", r"$y = 5$"],
      r"Rewrite the equation to match the graph: $x^2 + 2x - 5 = 0$ means $x^2 + 2x - 8 = -3$. So the roots are the $x$-values where the curve meets the line $y = -3$.",
      chk=-8 - (-5)),
    Q(2, 2, "Quadratic word problem",
      "A rectangular school garden is 4 m longer than it is wide, and its area is 96 m². Find its width.",
      ["8 m", "12 m", "24 m", "10 m"],
      r"Let the width be $w$: $w(w + 4) = 96$, so $w^2 + 4w - 96 = 0$ and $(w + 12)(w - 8) = 0$. A width cannot be negative, so $w = 8$ m and the length is 12 m.",
      chk=[w for w in range(1, 30) if w * (w + 4) == 96][0]),
    Q(2, 2, "Evaluating expressions",
      r"If $a = -2$, $b = 3$ and $c = 4$, evaluate $\frac{a^{2}b - c}{b + ac}$.",
      [r"$-\frac{8}{5}$", r"$\frac{8}{5}$", r"$\frac{8}{11}$", r"$-\frac{8}{11}$"],
      r"$a^2b - c = 4 \times 3 - 4 = 8$ and $b + ac = 3 + (-2)(4) = -5$, so the value is $-\frac{8}{5}$. Taking $ac$ as $+8$ gives $\frac{8}{11}$.",
      chk=F((-2) ** 2 * 3 - 4, 3 + (-2) * 4), basics="substitution"),

    # ---------------- Drill only ----------------
    Q(0, 2, "Expanding and simplifying",
      r"Expand and simplify $(x + 3)^{2} - (x - 2)(x + 2)$.",
      [r"$6x + 13$", r"$6x + 5$", r"$2x^{2} + 6x + 5$", r"$13$"],
      r"$(x + 3)^2 = x^2 + 6x + 9$ and $(x - 2)(x + 2) = x^2 - 4$. Subtracting: $x^2 + 6x + 9 - x^2 + 4 = 6x + 13$. Subtracting $-4$ adds 4.",
      chk=lambda x: (x + 3) ** 2 - (x - 2) * (x + 2), basics="distributing"),
    Q(0, 2, "Factorising by grouping",
      r"Factorise $ab + 2a - 3b - 6$.",
      [r"$(a - 3)(b + 2)$", r"$(a + 3)(b - 2)$", r"$(a - 2)(b + 3)$", r"$(a + 2)(b - 3)$"],
      r"Group in pairs: $a(b + 2) - 3(b + 2) = (a - 3)(b + 2)$. Check with $a = 1$, $b = 1$: $1 + 2 - 3 - 6 = -6$ and $(1 - 3)(1 + 2) = -6$.",
      chk=ok(all(a * b + 2 * a - 3 * b - 6 == (a - 3) * (b + 2) for a in range(-3, 4) for b in range(-3, 4)), r"$(a - 3)(b + 2)$"), basics="factoring"),
    Q(0, 1, "Linear equations",
      r"Solve $5(x - 2) = 2(x + 7)$.",
      ["8", "4", "6", "-8"],
      r"$5x - 10 = 2x + 14$, so $3x = 24$ and $x = 8$. Check: $5(6) = 30$ and $2(15) = 30$.",
      chk=(14 + 10) / (5 - 2), basics="solveX"),
    Q(0, 2, "Simultaneous equations in context",
      "3 pens and 2 erasers cost ₦850. 1 pen and 4 erasers cost ₦700. Find the cost of one pen.",
      [f"₦{_pen[0][0]}", "₦125", "₦150", "₦250"],
      r"$3p + 2e = 850$ and $p + 4e = 700$. Doubling the first gives $6p + 4e = 1700$; subtracting the second gives $5p = 1000$, so $p = 200$ and $e = 125$. ₦125 is the cost of an eraser.",
      chk=_pen[0][0], basics="systems"),
    Q(0, 3, "Change of subject with the subject twice",
      r"Make $x$ the subject of $y = \frac{3x + 2}{x - 1}$.",
      [r"$x = \frac{y + 2}{y - 3}$", r"$x = \frac{y - 2}{y + 3}$", r"$x = \frac{y + 2}{3 - y}$", r"$x = \frac{2 - y}{y - 3}$"],
      r"Multiply up: $y(x - 1) = 3x + 2$, so $xy - y = 3x + 2$. Collect the $x$ terms: $xy - 3x = y + 2$, $x(y - 3) = y + 2$ and $x = \frac{y + 2}{y - 3}$. Check with $x = 2$: $y = 8$ and $\frac{10}{5} = 2$.",
      chk=ok(F(8 + 2, 8 - 3) == 2, r"$x = \frac{y + 2}{y - 3}$")),
    Q(0, 1, "Substitution into a formula",
      r"Given $v^{2} = u^{2} + 2as$, find $v$ when $u = 5$, $a = 3$ and $s = 4$ (take $v$ as positive).",
      ["7", "49", "11", "13"],
      r"$v^2 = 25 + 2(3)(4) = 25 + 24 = 49$, so $v = 7$. 49 is $v^2$, not $v$.",
      chk=sqrt(25 + 2 * 3 * 4), basics="substitution"),
    Q(0, 2, "Quadratic equations by factorisation",
      r"Solve $2x^{2} + 7x - 4 = 0$.",
      [_pair(2, 7, -4), r"$x = -\frac{1}{2}$ or $x = 4$", r"$x = 1$ or $x = -4$", r"$x = 2$ or $x = -1$"],
      r"$2x^2 + 7x - 4 = (2x - 1)(x + 4) = 0$, so $x = \frac{1}{2}$ or $x = -4$. Check: $2 \times \frac{1}{4} + \frac{7}{2} - 4 = 0$.",
      chk=_pair(2, 7, -4)),
    Q(0, 1, "Forming a quadratic equation",
      "Find the quadratic equation whose roots are 5 and $-2$.",
      [r"$x^{2} - 3x - 10 = 0$", r"$x^{2} + 3x - 10 = 0$", r"$x^{2} - 7x + 10 = 0$", r"$x^{2} - 3x + 10 = 0$"],
      r"$(x - 5)(x + 2) = x^2 + 2x - 5x - 10 = x^2 - 3x - 10 = 0$. The sum of the roots is 3 and their product is $-10$.",
      chk=ok(25 - 15 - 10 == 0 and 4 + 6 - 10 == 0, r"$x^{2} - 3x - 10 = 0$")),
    Q(0, 2, "Truth set of an inequality",
      r"Find the integer values of $x$ that satisfy $-3 < 2x + 1 \le 9$.",
      [setstr(_int_set), r"$\{-2, -1, 0, 1, 2, 3, 4\}$", r"$\{-1, 0, 1, 2, 3\}$", r"$\{-2, -1, 0, 1, 2, 3\}$"],
      r"Subtract 1: $-4 < 2x \le 8$. Divide by 2: $-2 < x \le 4$. The integers are $-1, 0, 1, 2, 3, 4$: $-2$ is excluded by the strict sign and 4 is included.",
      chk=setstr(_int_set), basics="inequalities"),
    Q(0, 1, "Inequalities in context",
      "Musa has ₦5,000 to spend on notebooks costing ₦450 each. What is the greatest number of notebooks he can buy?",
      ["11", "12", "10", "9"],
      r"$450n \le 5000$ gives $n \le 11.1$, so the greatest whole number is 11. Rounding 11.1 up to 12 would cost ₦5,400, more than he has.",
      chk=5000 // 450, basics="inequalities"),
    Q(0, 2, "Fractions with monomial denominators",
      r"Simplify $\frac{x}{3} + \frac{2x}{5} - \frac{x}{2}$.",
      [r"$\frac{7x}{30}$", r"$\frac{x}{3}$", r"$\frac{37x}{30}$", r"$\frac{7x}{10}$"],
      r"Use the common denominator 30: $\frac{10x}{30} + \frac{12x}{30} - \frac{15x}{30} = \frac{7x}{30}$. Adding the last term instead of subtracting gives $\frac{37x}{30}$.",
      chk=lambda x: x / 3 + 2 * x / 5 - x / 2),
    Q(0, 1, "Intercepts of a straight-line graph",
      r"At which point does the graph of $3x - 4y = 12$ cut the $y$-axis?",
      ["(0, -3)", "(0, 3)", "(4, 0)", "(0, 4)"],
      r"On the $y$-axis $x = 0$, so $-4y = 12$ and $y = -3$: the point is $(0, -3)$. $(4, 0)$ is where the line cuts the $x$-axis.",
      chk=ok(3 * 0 - 4 * (-3) == 12, "(0, -3)")),
]
