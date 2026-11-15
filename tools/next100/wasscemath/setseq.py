# A. Number and Numeration, part 3: sequences and series (patterns, nth term, A.P. with
# its sum, G.P. terms only: the syllabus excludes the sum of a G.P.), sets and Venn
# diagrams (at most three sets) and logical reasoning. Original items.

_E = set(range(1, 13))
_A = {n for n in _E if n % 3 == 0}
_B = {n for n in _E if n % 2 == 0}
_primes = {2, 3, 5, 7}
_E10 = set(range(1, 11))
# three-set Venn regions: F only, H only, Y only, FH only, FY only, HY only, all three
_r = dict(f=8, h=10, y=7, fh=4, fy=3, hy=5, fhy=2)
_nF = _r["f"] + _r["fh"] + _r["fy"] + _r["fhy"]
_nH = _r["h"] + _r["fh"] + _r["hy"] + _r["fhy"]
_nY = _r["y"] + _r["fy"] + _r["hy"] + _r["fhy"]
_union = sum(_r.values())


def _ap_sum(a, d, n):
    return n * (2 * a + (n - 1) * d) // 2


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 2, "nth term of an A.P.",
      "The 5th term of an arithmetic progression is 17 and the 9th term is 33. Find the 20th term.",
      ["77", "73", "76", "69"],
      r"$a + 8d - (a + 4d) = 33 - 17$, so $4d = 16$ and $d = 4$; then $a = 17 - 16 = 1$. The 20th term is $a + 19d = 1 + 76 = 77$. Using $18d$ gives 73, and leaving out the first term gives 76.",
      chk=1 + 19 * 4),
    Q(1, 2, "Sum of an A.P.",
      "Find the sum of the first 15 terms of the arithmetic progression 3, 7, 11, ...",
      ["465", "480", "510", "930"],
      r"$S_n = \frac{n}{2}[2a + (n - 1)d] = \frac{15}{2}[6 + 14 \times 4] = \frac{15}{2} \times 62 = 465$. Forgetting to halve gives 930.",
      chk=_ap_sum(3, 4, 15)),
    Q(1, 2, "Complement and intersection",
      r"$\mathcal{E} = \{1, 2, 3, \ldots, 12\}$, $A = \{\text{multiples of } 3\}$ and $B = \{\text{even numbers}\}$. Find $A \cap B'$.",
      [setstr(_A - _B), r"$\{6, 12\}$", r"$\{1, 5, 7, 11\}$", r"$\{3, 6, 9, 12\}$"],
      r"$A = \{3, 6, 9, 12\}$ and $B' = \{1, 3, 5, 7, 9, 11\}$, the odd numbers. The members of $A$ that are also odd are 3 and 9. $\{6, 12\}$ is $A \cap B$.",
      chk=setstr(_A - _B)),
    Q(1, 1, "Venn diagrams with two sets",
      "Of 40 traders in a market, 25 sell yam, 18 sell cassava and 7 sell both. How many sell neither yam nor cassava?",
      ["4", "3", "11", "0"],
      r"$n(Y \cup C) = 25 + 18 - 7 = 36$, so $40 - 36 = 4$ sell neither. Adding 25 and 18 without removing the 7 counted twice gives $43$, more than the 40 traders.",
      chk=40 - (25 + 18 - 7)),
    Q(1, 2, "Contrapositive",
      r"$p$: It is raining. $q$: The road is wet. Which statement is equivalent to $p \Rightarrow q$?",
      ["If the road is not wet, then it is not raining.", "If the road is wet, then it is raining.", "If it is not raining, then the road is not wet.", "It is raining and the road is not wet."],
      r"An implication $p \Rightarrow q$ is equivalent to its contrapositive $\sim q \Rightarrow \sim p$: if the road is not wet, it cannot be raining. The converse ($q \Rightarrow p$) and the inverse ($\sim p \Rightarrow \sim q$) are not equivalent: the road could be wet for another reason.",
      chk=CONCEPT),

    # ---------------- Practice Test 2 ----------------
    Q(2, 2, "Terms of a G.P.",
      "The 3rd term of a geometric progression is 12 and the 6th term is 96. Find the 8th term.",
      ["384", "768", "192", "96"],
      r"$\frac{ar^5}{ar^2} = r^3 = \frac{96}{12} = 8$, so $r = 2$ and $a = \frac{12}{4} = 3$. The 8th term is $ar^7 = 3 \times 128 = 384$. Using $r^8$ gives 768.",
      chk=3 * 2 ** 7),
    Q(2, 2, "Patterns of sequences",
      "The sequence 2, 6, 12, 20, 30, ... continues in the same pattern. Find the 10th term.",
      ["110", "90", "132", "100"],
      r"The terms are $1 \times 2$, $2 \times 3$, $3 \times 4$, $4 \times 5$, $5 \times 6$, so $U_n = n(n + 1)$ and $U_{10} = 10 \times 11 = 110$. The differences 4, 6, 8, 10, ... confirm the pattern. 90 is the 9th term.",
      chk=10 * 11),
    Q(2, 1, "Number of elements",
      r"If $n(P) = 17$, $n(Q) = 12$ and $n(P \cup Q) = 23$, find $n(P \cap Q)$.",
      ["6", "29", "11", "40"],
      r"$n(P \cup Q) = n(P) + n(Q) - n(P \cap Q)$, so $23 = 29 - n(P \cap Q)$ and $n(P \cap Q) = 6$.",
      chk=17 + 12 - 23),
    Q(2, 3, "Venn diagrams with three sets",
      f"In a school of 50 students, {_nF} study French, {_nH} study Hausa and {_nY} study Yoruba. 6 study French and Hausa, 5 study French and Yoruba, 7 study Hausa and Yoruba, and 2 study all three. How many students study none of the three languages?",
      ["11", "13", "9", "6"],
      rf"$n(F \cup H \cup Y) = {_nF} + {_nH} + {_nY} - 6 - 5 - 7 + 2 = {_union}$, so $50 - {_union} = 11$ study none. Forgetting to add back the 2 who study all three gives 13.",
      chk=50 - (_nF + _nH + _nY - 6 - 5 - 7 + 2)),
    Q(2, 2, "Negation",
      'What is the negation of the statement "All the students passed the test"?',
      ["At least one student did not pass the test.", "No student passed the test.", "All the students failed the test.", "Some students passed the test."],
      r"The negation must be true exactly when the statement is false. The statement is false as soon as one student did not pass, so the negation is: at least one student did not pass. Saying that no student passed is too strong: it is false when only some failed.",
      chk=CONCEPT),

    # ---------------- Drill only ----------------
    Q(0, 1, "Common difference",
      "An arithmetic progression has first term $-4$ and 8th term 17. Find the common difference.",
      ["3", "21", "-3", "4"],
      r"$a + 7d = 17$ with $a = -4$, so $7d = 21$ and $d = 3$.",
      chk=(17 - (-4)) / 7),
    Q(0, 2, "Number of terms",
      "How many terms are there in the arithmetic progression 5, 9, 13, ..., 101?",
      ["25", "24", "26", "96"],
      r"$a + (n - 1)d = 101$ gives $5 + 4(n - 1) = 101$, so $n - 1 = 24$ and $n = 25$. Stopping at $n - 1 = 24$ undercounts by one.",
      chk=(101 - 5) // 4 + 1),
    Q(0, 2, "A.P. word problem",
      "Kofi saves GH¢20 in the first week and increases his savings by GH¢5 each week after that. How much has he saved altogether after 12 weeks?",
      ["GH¢570", "GH¢75", "GH¢540", "GH¢285"],
      r"The weekly savings form an A.P. with $a = 20$ and $d = 5$. $S_{12} = \frac{12}{2}[2(20) + 11(5)] = 6 \times 95 = 570$. GH¢75 is what he saves in the 12th week alone.",
      chk=_ap_sum(20, 5, 12)),
    Q(0, 1, "Terms of a G.P.",
      r"The first term of a geometric progression is 81 and the common ratio is $\frac{1}{3}$. Find the 5th term.",
      ["1", "3", "27", r"$\frac{1}{3}$"],
      r"$U_5 = ar^4 = 81 \times \left(\frac{1}{3}\right)^4 = \frac{81}{81} = 1$. Using $r^5$ gives $\frac{1}{3}$, which is the 6th term.",
      chk=81 * F(1, 3) ** 4),
    Q(0, 3, "Consecutive terms of a G.P.",
      "If $x - 1$, $x + 1$ and $x + 5$ are consecutive terms of a geometric progression, find $x$.",
      ["3", "2", "-3", "1"],
      r"In a G.P. the middle term squared equals the product of its neighbours: $(x + 1)^2 = (x - 1)(x + 5)$. So $x^2 + 2x + 1 = x^2 + 4x - 5$, $2x = 6$ and $x = 3$, giving the terms 2, 4, 8.",
      chk=[x for x in range(-10, 11) if (x + 1) ** 2 == (x - 1) * (x + 5)][0]),
    Q(0, 1, "Subsets",
      r"How many subsets does the set $\{a, b, c, d\}$ have?",
      ["16", "8", "15", "4"],
      r"A set with $n$ members has $2^n$ subsets, counting the empty set and the set itself. Here $2^4 = 16$.",
      chk=2 ** 4),
    Q(0, 2, "Complement of a set",
      r"$\mathcal{E} = \{x : 1 \le x \le 10, x \text{ is an integer}\}$ and $P = \{\text{prime numbers}\}$. Find $P'$.",
      [setstr(_E10 - _primes), r"$\{4, 6, 8, 9, 10\}$", r"$\{2, 3, 5, 7\}$", r"$\{1, 3, 5, 7, 9\}$"],
      r"$P = \{2, 3, 5, 7\}$, so $P'$ is every other member of $\mathcal{E}$: $\{1, 4, 6, 8, 9, 10\}$. 1 is not a prime number, so it belongs in $P'$.",
      chk=setstr(_E10 - _primes)),
    Q(0, 2, "Only one set",
      "Of 35 farmers in a village, 20 grow maize and 22 grow millet. Every farmer grows at least one of the two crops. How many grow maize only?",
      ["13", "20", "7", "15"],
      r"$20 + 22 - 35 = 7$ grow both, so $20 - 7 = 13$ grow maize only. 7 is the number who grow both crops.",
      chk=20 - (20 + 22 - 35)),
    Q(0, 2, "Chains of implications",
      r"Given that $p \Rightarrow q$ and $q \Rightarrow r$, which conclusion is valid?",
      [r"$p \Rightarrow r$", r"$r \Rightarrow p$", r"$q \Rightarrow p$", r"$\sim p \Rightarrow \sim r$"],
      r"If $p$ is true then $q$ is true, and then $r$ is true, so $p \Rightarrow r$. Reversing an implication is not valid, so $r \Rightarrow p$ and $q \Rightarrow p$ do not follow, and neither does $\sim p \Rightarrow \sim r$.",
      chk=CONCEPT),
    Q(0, 1, "Converse",
      'What is the converse of the statement "If a number is divisible by 4, then it is even"?',
      ["If a number is even, then it is divisible by 4.", "If a number is not even, then it is not divisible by 4.", "If a number is not divisible by 4, then it is not even.", "A number is divisible by 4 and it is even."],
      r"The converse of $p \Rightarrow q$ is $q \Rightarrow p$, so the two parts swap. This converse is false: 6 is even but not divisible by 4, which shows a true statement can have a false converse.",
      chk=CONCEPT),
    Q(0, 2, "General term",
      "The nth term of a sequence is $U_n = 3n^2 - 1$. Find $U_4 - U_2$.",
      ["36", "18", "47", "24"],
      r"$U_4 = 3(16) - 1 = 47$ and $U_2 = 3(4) - 1 = 11$, so $U_4 - U_2 = 36$.",
      chk=(3 * 16 - 1) - (3 * 4 - 1)),
]
