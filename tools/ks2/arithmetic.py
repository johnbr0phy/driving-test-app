"""KS2 maths Paper 1 (arithmetic): no calculator, answers typed.

Each item is (expression shown, python expression checked here, explanation,
basics tag, difficulty). Answers are computed with Fraction and asserted
against the hand-written answer, so a typo in either fails the build. The
order follows the real paper: written column methods first, long
multiplication and long division last.
"""
from fractions import Fraction as F
from common import numeric

A = "ks2Arithmetic"
OO, LM, SD, FR, PC = "ks2OrderOps", "ks2LongMultiplication", "ks2ShortDivision", "ks2AddFractions", "ks2PercentOf"


def fr(n, d):
    return f"$\\frac{{{n}}}{{{d}}}$"


def item(shown, value, answer, expl, basics=None, diff=1, skill="Arithmetic"):
    value = F(value)
    assert value == F(answer), f"{shown}: computed {value}, written {answer}"
    as_fraction = isinstance(answer, str) and "/" in answer
    whole, tol = False, 0
    if value.denominator == 1:
        answers = [str(value.numerator)]
        whole = value >= 0
    else:
        answers = [f"{value.numerator}/{value.denominator}"] if as_fraction else []
        # a terminating decimal is also accepted, as on the real mark scheme
        d = value.denominator
        while d % 2 == 0:
            d //= 2
        while d % 5 == 0:
            d //= 5
        if d == 1:
            dec = f"{float(value):.10f}".rstrip("0").rstrip(".")
            answers.append(dec)
            if dec.startswith("0."):
                answers.append(dec[1:])
        # equivalent fractions (6/12 for 1/2) are compared by value
        tol = 0.000001 if as_fraction else 0
    stem = f"{shown} ="
    if as_fraction:
        stem += "\n\nGive your answer as a fraction."
    return numeric(A, skill, diff, stem, answers, expl, basics, whole=whole, tolerance=tol)


T1 = [
    item("456 + 327", 456 + 327, 783, "Add the ones (6 + 7 = 13, carry 1), then the tens (5 + 2 + 1 = 8), then the hundreds (4 + 3 = 7): 783.", skill="Column addition"),
    item("1,000 − 365", 1000 - 365, 635, "Count up from 365: 35 makes 400, then 600 makes 1,000. 35 + 600 = 635.", skill="Column subtraction"),
    item("7 × 8 × 10", 7 * 8 * 10, 560, "7 × 8 = 56, and 56 × 10 = 560.", skill="Multiplication facts"),
    item("96 ÷ 4", F(96, 4), 24, "Halve 96 to get 48, then halve again to get 24. Dividing by 4 is halving twice.", SD, skill="Division"),
    item("3,405 + 2,698", 3405 + 2698, 6103, "Ones: 5 + 8 = 13, carry 1. Tens: 0 + 9 + 1 = 10, carry 1. Hundreds: 4 + 6 + 1 = 11, carry 1. Thousands: 3 + 2 + 1 = 6. Answer 6,103.", skill="Column addition"),
    item("4.7 + 3.85", F("4.7") + F("3.85"), F("8.55"), "Line up the decimal points: 4.70 + 3.85 = 8.55. Writing 4.7 as 4.70 keeps the columns straight.", diff=2, skill="Adding decimals"),
    item("2,000 − 1,374", 2000 - 1374, 626, "Count up from 1,374: 26 makes 1,400, then 600 makes 2,000. 26 + 600 = 626.", skill="Column subtraction"),
    item("34 × 6", 34 * 6, 204, "30 × 6 = 180 and 4 × 6 = 24. 180 + 24 = 204.", skill="Short multiplication"),
    item("0.6 × 7", F("0.6") * 7, F("4.2"), "6 × 7 = 42, and 0.6 is ten times smaller than 6, so the answer is 4.2.", diff=2, skill="Multiplying decimals"),
    item(f"{fr(2,5)} + {fr(1,5)}", F(2, 5) + F(1, 5), "3/5", "The denominators are the same, so add the numerators: 2 + 1 = 3. The answer is three fifths.", FR, skill="Adding fractions"),
    item("25% of 360", F(25, 100) * 360, 90, "25% is one quarter. 360 ÷ 4 = 90.", PC, diff=2, skill="Percentages"),
    item("15 + 6 × 3", 15 + 6 * 3, 33, "Multiply before you add: 6 × 3 = 18, then 15 + 18 = 33. Working left to right would wrongly give 63.", OO, diff=2, skill="Order of operations"),
    item("4,836 ÷ 6", F(4836, 6), 806, "Short division: 48 ÷ 6 = 8, 3 ÷ 6 = 0 remainder 3, 36 ÷ 6 = 6. Answer 806 (do not forget the 0 in the tens).", SD, diff=2, skill="Short division"),
    item(f"{fr(3,4)} − {fr(1,8)}", F(3, 4) - F(1, 8), "5/8", "Change quarters to eighths: three quarters is six eighths. 6 eighths − 1 eighth = 5 eighths.", FR, diff=2, skill="Subtracting fractions"),
    item("5.6 − 2.75", F("5.6") - F("2.75"), F("2.85"), "Write 5.6 as 5.60 so the columns line up: 5.60 − 2.75 = 2.85.", diff=2, skill="Subtracting decimals"),
    item(f"{fr(2,3)} × 15", F(2, 3) * 15, 10, "One third of 15 is 5, so two thirds is 10.", diff=2, skill="Multiplying fractions"),
    item("8² − 4²", 8 ** 2 - 4 ** 2, 48, "8² = 8 × 8 = 64 and 4² = 4 × 4 = 16. 64 − 16 = 48.", diff=2, skill="Square numbers"),
    item("2,347 × 26", 2347 * 26, 61022, "Long multiplication: 2,347 × 6 = 14,082 and 2,347 × 20 = 46,940. Add them: 14,082 + 46,940 = 61,022.", LM, diff=3, skill="Long multiplication"),
    item(f"{fr(3,5)} ÷ 3", F(3, 5) / 3, "1/5", "Three fifths shared into 3 equal parts is one fifth each. Divide the numerator: 3 ÷ 3 = 1.", diff=3, skill="Dividing fractions"),
    item("7,056 ÷ 24", F(7056, 24), 294, "Long division: 70 ÷ 24 = 2 r 22; 225 ÷ 24 = 9 r 9; 96 ÷ 24 = 4. Answer 294. Check: 294 × 24 = 7,056.", diff=3, skill="Long division"),
]

T2 = [
    item("538 + 246", 538 + 246, 784, "Ones: 8 + 6 = 14, carry 1. Tens: 3 + 4 + 1 = 8. Hundreds: 5 + 2 = 7. Answer 784.", skill="Column addition"),
    item("900 − 437", 900 - 437, 463, "Count up from 437: 3 makes 440, 60 makes 500, 400 makes 900. 3 + 60 + 400 = 463.", skill="Column subtraction"),
    item("60 × 7", 60 * 7, 420, "6 × 7 = 42, so 60 × 7 is ten times bigger: 420.", skill="Multiplication facts"),
    item("84 ÷ 7", F(84, 7), 12, "12 × 7 = 84, so 84 ÷ 7 = 12.", SD, skill="Division"),
    item("4,276 + 3,859", 4276 + 3859, 8135, "Ones: 6 + 9 = 15, carry 1. Tens: 7 + 5 + 1 = 13, carry 1. Hundreds: 2 + 8 + 1 = 11, carry 1. Thousands: 4 + 3 + 1 = 8. Answer 8,135.", skill="Column addition"),
    item("6.2 + 3.95", F("6.2") + F("3.95"), F("10.15"), "Line up the decimal points: 6.20 + 3.95 = 10.15.", diff=2, skill="Adding decimals"),
    item("5,000 − 2,618", 5000 - 2618, 2382, "Count up from 2,618: 82 makes 2,700, 300 makes 3,000, 2,000 makes 5,000. 82 + 300 + 2,000 = 2,382.", skill="Column subtraction"),
    item("47 × 5", 47 * 5, 235, "40 × 5 = 200 and 7 × 5 = 35. 200 + 35 = 235.", skill="Short multiplication"),
    item("0.9 × 6", F("0.9") * 6, F("5.4"), "9 × 6 = 54, and 0.9 is ten times smaller than 9, so the answer is 5.4.", diff=2, skill="Multiplying decimals"),
    item(f"{fr(3,7)} + {fr(2,7)}", F(3, 7) + F(2, 7), "5/7", "Same denominators, so add the numerators: 3 + 2 = 5. The answer is five sevenths.", FR, skill="Adding fractions"),
    item("20% of 350", F(20, 100) * 350, 70, "10% of 350 is 35, so 20% is double that: 70.", PC, diff=2, skill="Percentages"),
    item("40 − 18 ÷ 3", 40 - F(18, 3), 34, "Divide before you subtract: 18 ÷ 3 = 6, then 40 − 6 = 34.", OO, diff=2, skill="Order of operations"),
    item("3,165 ÷ 5", F(3165, 5), 633, "Short division: 31 ÷ 5 = 6 r 1, 16 ÷ 5 = 3 r 1, 15 ÷ 5 = 3. Answer 633.", SD, diff=2, skill="Short division"),
    item(f"{fr(5,6)} − {fr(1,3)}", F(5, 6) - F(1, 3), "1/2", "Change thirds to sixths: one third is two sixths. 5 sixths − 2 sixths = 3 sixths, which is one half.", FR, diff=2, skill="Subtracting fractions"),
    item("8.3 − 4.67", F("8.3") - F("4.67"), F("3.63"), "Write 8.3 as 8.30: 8.30 − 4.67 = 3.63.", diff=2, skill="Subtracting decimals"),
    item(f"{fr(3,4)} × 24", F(3, 4) * 24, 18, "One quarter of 24 is 6, so three quarters is 18.", diff=2, skill="Multiplying fractions"),
    item("9² + 2³", 9 ** 2 + 2 ** 3, 89, "9² = 9 × 9 = 81 and 2³ = 2 × 2 × 2 = 8. 81 + 8 = 89.", diff=2, skill="Squares and cubes"),
    item("1,836 × 34", 1836 * 34, 62424, "Long multiplication: 1,836 × 4 = 7,344 and 1,836 × 30 = 55,080. Add them: 7,344 + 55,080 = 62,424.", LM, diff=3, skill="Long multiplication"),
    item(f"{fr(4,5)} ÷ 2", F(4, 5) / 2, "2/5", "Halve four fifths: 4 ÷ 2 = 2, so the answer is two fifths.", diff=3, skill="Dividing fractions"),
    item("5,472 ÷ 16", F(5472, 16), 342, "Long division: 54 ÷ 16 = 3 r 6; 67 ÷ 16 = 4 r 3; 32 ÷ 16 = 2. Answer 342. Check: 342 × 16 = 5,472.", diff=3, skill="Long division"),
]

DRILL = [
    item("2,503 − 1,786", 2503 - 1786, 717, "Count up from 1,786: 14 makes 1,800, 700 makes 2,500, 3 makes 2,503. 14 + 700 + 3 = 717.", diff=2, skill="Column subtraction"),
    item("125 × 8", 125 * 8, 1000, "125 × 2 = 250, × 2 again = 500, × 2 again = 1,000. Multiplying by 8 is doubling three times.", skill="Short multiplication"),
    item("3.4 × 100", F("3.4") * 100, 340, "Multiplying by 100 moves every digit two places to the left: 3.4 becomes 340.", skill="Multiplying by 100"),
    item("4.8 ÷ 10", F("4.8") / 10, F("0.48"), "Dividing by 10 moves every digit one place to the right: 4.8 becomes 0.48.", skill="Dividing by 10"),
    item("15% of 300", F(15, 100) * 300, 45, "10% of 300 is 30 and 5% is half of that, 15. 30 + 15 = 45.", PC, diff=2, skill="Percentages"),
    item(f"{fr(1,2)} + {fr(1,3)}", F(1, 2) + F(1, 3), "5/6", "Change both to sixths: one half is three sixths and one third is two sixths. 3 + 2 = 5 sixths.", FR, diff=2, skill="Adding fractions"),
    item("3,612 ÷ 4", F(3612, 4), 903, "Short division: 36 ÷ 4 = 9, 1 ÷ 4 = 0 remainder 1, 12 ÷ 4 = 3. Answer 903.", SD, diff=2, skill="Short division"),
    item(f"{fr(2,3)} × {fr(3,4)}", F(2, 3) * F(3, 4), "1/2", "Multiply the numerators (2 × 3 = 6) and the denominators (3 × 4 = 12): six twelfths, which is one half.", diff=3, skill="Multiplying fractions"),
    item("563 × 47", 563 * 47, 26461, "Long multiplication: 563 × 7 = 3,941 and 563 × 40 = 22,520. Add them: 3,941 + 22,520 = 26,461.", LM, diff=3, skill="Long multiplication"),
    item("2,976 ÷ 12", F(2976, 12), 248, "Long division: 29 ÷ 12 = 2 r 5; 57 ÷ 12 = 4 r 9; 96 ÷ 12 = 8. Answer 248. Check: 248 × 12 = 2,976.", diff=3, skill="Long division"),
]
