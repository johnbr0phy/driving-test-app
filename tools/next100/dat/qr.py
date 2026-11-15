# Quantitative Reasoning. Original items; an on-screen calculator is available, as on the real section.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None,
#   key=None)
# Quantitative comparison items keep the four standard choices in a fixed order and give the answer with key=.
# Per test: algebra (with quantitative comparison) 8, data analysis, sufficiency, probability and statistics 6,
# applied (word) problems 6. Drill-only: algebra 6.

A, D, W = "datQrAlgebra", "datQrData", "datQrWord"
ALG, QC, DATA, SUFF, PROB, STAT, WORD = ("Algebra", "Quantitative comparison", "Data analysis", "Data sufficiency",
                                         "Probability", "Statistics", "Applied problems")
QCO = ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"]
QC_DIR = "Compare Quantity A and Quantity B. "
QC_END = " Which is greater?"

ITEMS = [
    # ---------------- Practice Test 1: algebra 8 ----------------
    Q(1, 1, A, ALG, "If 3x - 7 = 2x + 5, what is x?",
      ["12", "-2", "2", "-12"],
      "Subtract 2x from both sides and add 7: x = 12. Check: 3(12) - 7 = 29 and 2(12) + 5 = 29.", chk=12),
    Q(1, 2, A, ALG, "Which inequality describes every x for which -2x + 4 > 10?",
      ["x < -3", "x > -3", "x < 3", "x > 7"],
      "Subtract 4: -2x > 6. Dividing by a negative number reverses the sign, so x < -3. Forgetting to flip it gives x > -3."),
    Q(1, 1, A, ALG, "What is the value of (2³ × 2⁵) ÷ 2⁴?",
      ["16", "8", "256", "4"],
      "Add exponents when multiplying and subtract when dividing: 2^(3 + 5 - 4) = 2⁴ = 16.", chk=16),
    Q(1, 2, A, ALG, "What is $(6.0 \\times 10^{5})(3.0 \\times 10^{-2})$?",
      ["$1.8 \\times 10^{4}$", "$1.8 \\times 10^{3}$", "$1.8 \\times 10^{-10}$", "$9.0 \\times 10^{3}$"],
      "Multiply the numbers (6.0 × 3.0 = 18) and add the exponents (5 + (-2) = 3): 18 × 10³ = 1.8 × 10⁴."),
    Q(1, 2, A, ALG, "What are the solutions of |2x - 3| = 7?",
      ["x = 5 or x = -2", "x = 5 or x = 2", "x = -5 or x = 2", "x = 5 only"],
      "Either 2x - 3 = 7, so x = 5, or 2x - 3 = -7, so x = -2. Dropping the negative case loses the second solution."),
    Q(1, 2, A, ALG, "If a : b = 3 : 5 and b : c = 2 : 7, what is a : c?",
      ["6 : 35", "3 : 7", "15 : 14", "6 : 7"],
      "Make b the same in both ratios: a : b = 6 : 10 and b : c = 10 : 35, so a : c = 6 : 35. Linking 3 : 7 directly ignores "
      "that b differs between the ratios."),
    Q(1, 1, A, ALG, "What is the slope of the line through (1, 2) and (4, 11)?",
      ["3", "1/3", "9", "-3"],
      "Slope = change in y / change in x = (11 - 2) / (4 - 1) = 9 / 3 = 3. 1/3 divides the x change by the y change.", chk=3),
    Q(1, 2, A, QC, QC_DIR + "x is a negative integer. Quantity A: x². Quantity B: x³." + QC_END,
      QCO,
      "A negative number squared is positive and cubed is negative, so x² > x³ for every negative integer. For x = -1: A is 1 "
      "and B is -1.", key=0),

    # ---------------- Practice Test 1: data 6 ----------------
    Q(1, 1, D, STAT, "A student's scores on five tests are 70, 80, 90, 100 and x. Their mean is 86. What is x?",
      ["90", "86", "80", "95"],
      "The five scores must total 5 × 86 = 430. 70 + 80 + 90 + 100 = 340, so x = 430 - 340 = 90.", chk=90),
    Q(1, 2, D, STAT, "What is the median of 3, 9, 4, 12, 7 and 5?",
      ["6", "7", "5", "6.7"],
      "In order: 3, 4, 5, 7, 9, 12. With six values the median is the mean of the middle two: (5 + 7) / 2 = 6. 6.7 is the "
      "mean.", chk=6),
    Q(1, 1, D, PROB, "Two fair six-sided dice are rolled. What is the probability that the sum is 7?",
      ["1/6", "1/12", "7/36", "1/36"],
      "Six of the 36 equally likely outcomes sum to 7 (1-6, 2-5, 3-4, 4-3, 5-2, 6-1), so the probability is 6/36 = 1/6.", chk=1 / 6),
    Q(1, 2, D, PROB, "A bag holds 3 red and 2 blue marbles. Two are drawn without replacement. What is the probability that both are red?",
      ["3/10", "9/25", "3/5", "1/5"],
      "P(first red) = 3/5 and then P(second red) = 2/4, so (3/5)(2/4) = 6/20 = 3/10. 9/25 assumes the first marble is put "
      "back.", chk=0.3),
    Q(1, 2, D, STAT, "Which data set has the largest standard deviation?",
      ["1, 10, 10, 19", "8, 9, 11, 12", "9, 10, 10, 11", "10, 10, 10, 10"],
      "All four sets have a mean of 10. Standard deviation measures spread from the mean, and 1, 10, 10, 19 has the values "
      "farthest from 10. A set of identical values has a standard deviation of 0."),
    Q(1, 2, D, SUFF, "A rectangle has a perimeter of 30 cm. Which additional fact alone is enough to find its area?",
      ["Its length is 9 cm", "Its sides are whole numbers", "Its length exceeds its width", "It is not a square"],
      "Length plus width is 15 cm, so a length of 9 cm fixes the width at 6 cm and the area at 54 cm². Each other fact still "
      "allows many different rectangles."),

    # ---------------- Practice Test 1: word 6 ----------------
    Q(1, 2, W, WORD, "A price of \\$80 is raised by 25%, and the new price is then cut by 20%. What is the final price?",
      ["\\$80", "\\$84", "\\$100", "\\$90"],
      "80 × 1.25 = 100, then 100 × 0.80 = 80. The two changes are applied to different bases, so they do not net to +5% (\\$84); \\$100 is only the price after the first change.", chk=80),
    Q(1, 2, W, WORD, "A cyclist rides at a steady 36 km/h. What is this speed in meters per second?",
      ["10 m/s", "3.6 m/s", "600 m/s", "129.6 m/s"],
      "36 km/h is 36,000 m in 3,600 s, so 36,000 / 3,600 = 10 m/s. 600 m/s divides by 60 instead of 3,600, and 129.6 m/s multiplies by 3.6 instead of dividing.", chk=10),
    Q(1, 2, W, WORD, "Pipe A fills a tank in 6 hours and pipe B fills it in 3 hours. Working together, how long do they take?",
      ["2 hours", "4.5 hours", "1.5 hours", "3 hours"],
      "Together they fill 1/6 + 1/3 = 1/2 of the tank per hour, so the tank takes 2 hours. Averaging the times gives 4.5 hours, "
      "which ignores that the rates add.", chk=2),
    Q(1, 3, W, WORD, "How many liters of a 20% acid solution must be added to 10 L of a 50% acid solution to make a 30% solution?",
      ["20 L", "10 L", "15 L", "5 L"],
      "Acid before and after must match: 0.20x + 0.50(10) = 0.30(10 + x). So 0.20x + 5 = 3 + 0.30x, giving 0.10x = 2 and "
      "x = 20 L.", chk=20),
    Q(1, 2, W, WORD, "Ana is three times as old as Ben. In 10 years she will be twice as old as he is then. How old is Ben now?",
      ["10", "15", "20", "30"],
      "Let Ben be b and Ana 3b. Then 3b + 10 = 2(b + 10), so b = 10. Ana is 30 now; in 10 years she is 40 and Ben 20.", chk=10),
    Q(1, 2, W, WORD, "A race is 5.0 km long. Using 1 mile = 1.609 km, about how many miles is the race?",
      ["3.1 miles", "8.0 miles", "3.6 miles", "5.0 miles"],
      "Divide kilometers by kilometers per mile: 5.0 / 1.609 = 3.1 miles. Multiplying instead gives 8.0, larger than the race "
      "itself.", chk=5.0 / 1.609),

    # ---------------- Practice Test 2: algebra 8 ----------------
    Q(2, 1, A, ALG, "If x + y = 10 and x - y = 4, what is x?",
      ["7", "3", "6", "14"],
      "Adding the two equations gives 2x = 14, so x = 7 (and y = 3).", chk=7),
    Q(2, 2, A, ALG, "What are the solutions of x² - 5x + 6 = 0?",
      ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = 6"],
      "Factor: (x - 2)(x - 3) = 0, so x = 2 or 3. The roots add to 5 and multiply to 6, matching the coefficients."),
    Q(2, 2, A, ALG, "Which expression equals (x⁴)³ ÷ x⁵ for x ≠ 0?",
      ["x⁷", "x²", "x¹¹", "x⁶"],
      "A power of a power multiplies exponents: (x⁴)³ = x¹². Dividing subtracts: x¹² ÷ x⁵ = x⁷. Adding 4 + 3 instead of "
      "multiplying leads to x²."),
    Q(2, 2, A, ALG, "Which describes every x for which |x - 4| < 3?",
      ["1 < x < 7", "x < 1 or x > 7", "-7 < x < 1", "x < 7"],
      "|x - 4| < 3 means x is within 3 of 4: -3 < x - 4 < 3, so 1 < x < 7. The form \"x < 1 or x > 7\" is the answer for "
      "|x - 4| > 3."),
    Q(2, 2, A, ALG, "What is √50 + √18 in simplest form?",
      ["8√2", "√68", "5√2", "2√17"],
      "√50 = 5√2 and √18 = 3√2, so the sum is 8√2. Square roots of a sum cannot be combined as √68."),
    Q(2, 1, A, ALG, "If f(x) = 2x² - 3, what is f(-2)?",
      ["5", "-11", "11", "13"],
      "f(-2) = 2(-2)² - 3 = 2(4) - 3 = 5. Squaring before applying the sign matters: (-2)² is 4, not -4.", chk=5),
    Q(2, 2, A, ALG, "If 3ˣ = 81, what is x?",
      ["4", "3", "27", "9"],
      "81 = 3 × 3 × 3 × 3 = 3⁴, so x = 4. 27 is 81 / 3.", chk=4),
    Q(2, 2, A, QC, QC_DIR + "Quantity A: (0.5)². Quantity B: √0.25." + QC_END,
      QCO,
      "(0.5)² = 0.25 and √0.25 = 0.5, so Quantity B is greater. For numbers between 0 and 1, squaring makes them smaller "
      "and square roots make them larger.", key=1),

    # ---------------- Practice Test 2: data 6 ----------------
    Q(2, 2, D, STAT, "A class of 20 students averages 75 on an exam and a class of 30 averages 85. What is the average of all 50 students?",
      ["81", "80", "82", "78"],
      "Total points: 20 × 75 + 30 × 85 = 1,500 + 2,550 = 4,050, and 4,050 / 50 = 81. The simple average 80 ignores the "
      "larger second class.", chk=81),
    Q(2, 1, D, STAT, "What is the range of 4, 7, 7, 9, 12 and 15?",
      ["11", "7", "9", "15"],
      "The range is the largest value minus the smallest: 15 - 4 = 11. 7 is the mode.", chk=11),
    Q(2, 2, D, PROB, "In how many ways can a committee of 3 be chosen from 7 people?",
      ["35", "210", "70", "343"],
      "Order does not matter, so use combinations: 7! / (3! 4!) = (7 × 6 × 5) / (3 × 2 × 1) = 35. 210 counts ordered "
      "choices.", chk=35),
    Q(2, 2, D, PROB, "A fair coin is tossed 3 times. What is the probability of at least one head?",
      ["7/8", "1/8", "3/8", "1/2"],
      "The only outcome with no head is three tails, probability (1/2)³ = 1/8, so at least one head is 1 - 1/8 = 7/8.", chk=7 / 8),
    Q(2, 2, D, DATA, "A clinic recorded the patients it saw in one week:\n\n| Day | Patients |\n|---|---|\n| Monday | 24 |\n"
      "| Tuesday | 30 |\n| Wednesday | 18 |\n| Thursday | 36 |\n| Friday | 42 |\n\nBy about what percent did the number of "
      "patients rise from Wednesday to Friday?",
      ["133%", "57%", "24%", "233%"],
      "Percent change = (new - old) / old = (42 - 18) / 18 = 24 / 18 = 1.33, about 133%. Dividing by 42 instead gives 57%.",
      chk=24 / 18 * 100),
    Q(2, 3, D, SUFF, "x and y are integers. Which fact alone is enough to tell whether x + y is even?",
      ["x and y are both odd", "x is odd and y > 0", "x is greater than y", "The product xy is even"],
      "Two odd numbers always add to an even number. Knowing that x is odd and y is positive, or that xy is even (at least one is even), "
      "still allows an odd or an even sum."),

    # ---------------- Practice Test 2: word 6 ----------------
    Q(2, 1, W, WORD, "\\$2,000 is invested at 4% simple interest per year. How much interest does it earn in 3 years?",
      ["\\$240", "\\$800", "\\$249.73", "\\$2,240"],
      "Simple interest = principal × rate × time = 2,000 × 0.04 × 3 = \\$240. \\$2,240 is the balance, not the interest, and "
      "\\$249.73 would be compound interest.", chk=240),
    Q(2, 2, W, WORD, "Two trains start at the same time from cities 450 km apart and travel toward each other at 70 km/h and 80 km/h. After how many hours do they meet?",
      ["3", "6", "4", "4.5"],
      "They close the gap at 70 + 80 = 150 km/h, so they meet after 450 / 150 = 3 hours.", chk=3),
    Q(2, 1, W, WORD, "The price of a box of gloves falls from \\$50 to \\$42. By what percent did the price fall?",
      ["16%", "8%", "19%", "84%"],
      "Percent decrease = 8 / 50 = 0.16 = 16%. Dividing by the new price (8 / 42) gives about 19%.", chk=16),
    Q(2, 2, W, WORD, "A circular garden has a diameter of 14 m. Using π ≈ 3.14, about what is its area?",
      ["154 m²", "44 m²", "616 m²", "308 m²"],
      "The radius is 7 m, so the area is πr² = 3.14 × 49 ≈ 154 m². 616 m² uses the diameter as the radius, and 44 m is the "
      "circumference.", chk=3.14 * 49),
    Q(2, 3, W, WORD, "A medicine is dosed at 15 mg per kilogram of body weight. Using 1 kg = 2.2 lb, what dose does a 44 lb child receive?",
      ["300 mg", "660 mg", "136 mg", "600 mg"],
      "44 lb / 2.2 = 20 kg, and 20 × 15 = 300 mg. 660 mg multiplies the dose by the weight in pounds.", chk=300),
    Q(2, 2, W, WORD, "A machine makes 120 parts in 1.5 hours. At the same rate, how many parts does it make in an 8-hour shift?",
      ["640", "960", "800", "720"],
      "The rate is 120 / 1.5 = 80 parts per hour, so 8 hours gives 640. 960 uses 120 parts per hour as the rate.", chk=640),

    # ---------------- Drill-only: algebra 6 ----------------
    Q(0, 1, A, ALG, "If 5(x - 2) = 3x + 4, what is x?",
      ["7", "3", "-3", "1"],
      "Distribute: 5x - 10 = 3x + 4. Then 2x = 14 and x = 7. Writing 5x - 2 forgets to multiply the 2 by 5.", chk=7),
    Q(0, 2, A, ALG, "Which expression equals (3a²b)(4ab³)?",
      ["12a³b⁴", "7a³b⁴", "12a²b³", "12a³b³"],
      "Multiply the coefficients (3 × 4 = 12) and add the exponents of like bases: a² × a = a³ and b × b³ = b⁴."),
    Q(0, 2, A, ALG, "What is the slope of the line 2x + 3y = 12?",
      ["-2/3", "2/3", "-3/2", "4"],
      "Solve for y: 3y = -2x + 12, so y = (-2/3)x + 4. The slope is -2/3 and the y-intercept is 4.", chk=-2 / 3),
    Q(0, 2, A, QC, QC_DIR + "x > 1. Quantity A: 1/x. Quantity B: x." + QC_END,
      QCO,
      "For x greater than 1, 1/x is less than 1 while x is greater than 1, so Quantity B is greater. For x = 2: A is 0.5 and "
      "B is 2.", key=1),
    Q(0, 1, A, ALG, "If 3/x = 12/20, what is x?",
      ["5", "7", "80", "9"],
      "Cross-multiply: 12x = 60, so x = 5. Check: 3/5 = 0.6 and 12/20 = 0.6.", chk=5),
    Q(0, 2, A, ALG, "What is the value of 4⁻²?",
      ["1/16", "-16", "-8", "1/8"],
      "A negative exponent means a reciprocal: 4⁻² = 1/4² = 1/16. It never makes the number negative.", chk=1 / 16),
]
