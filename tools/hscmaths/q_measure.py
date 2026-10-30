"""Trigonometry, and Ratios and rates (Year 12 Standard 2 focus areas)."""
import math
from common import S, N, money

DOMAIN = "hscmathsMeasure"

sin = lambda d: math.sin(math.radians(d))
cos = lambda d: math.cos(math.radians(d))
tan = lambda d: math.tan(math.radians(d))
acos = lambda x: math.degrees(math.acos(x))
asin = lambda x: math.degrees(math.asin(x))


def r1(x):
    return f"{x:.1f}"


def cosrule(a, b, C):
    return math.sqrt(a * a + b * b - 2 * a * b * cos(C))


m1 = 12 * sin(65) / sin(48)
m4 = cosrule(8, 11, 72)
m5 = 0.5 * 15 * 22 * sin(38)
m6 = acos((7 ** 2 + 9 ** 2 - 12 ** 2) / (2 * 7 * 9))
m9 = 50 * tan(32)
m12 = asin(11 * sin(52) / 14)
m13 = math.hypot(120, 85)
m16 = 0.5 * 60 * 80 * sin(110)
d1 = 9.5 * sin(71) / sin(43)
d2 = cosrule(14, 9, 115)
d3 = acos((5 ** 2 + 8 ** 2 - 6 ** 2) / (2 * 5 * 8))
d4 = 0.5 * 6.2 * 8.5 * sin(57)
d8 = 80 / tan(18)
d16 = 60 * sin(55)
d19 = 0.5 * 45 * 52 * sin(64)
d20 = cosrule(200, 150, 125)

ITEMS = [
    # ---- Practice Test 1, Section I
    S(1, 1, 2, "Sine rule: finding a side",
      r"In triangle $ABC$, $A = 48°$, $B = 65°$ and $a = 12$ cm. Find $b$, correct to 1 decimal place.",
      [f"{r1(m1)} cm", f"{r1(12 * sin(48) / sin(65))} cm", f"{r1(12 * sin(65))} cm", f"{r1(12 * cos(65) / cos(48))} cm"],
      r"$\frac{b}{\sin 65°} = \frac{12}{\sin 48°}$, so $b = \frac{12 \sin 65°}{\sin 48°} = " + r1(m1) + r"$ cm. Side $b$ is opposite the larger angle, so it must be longer than 12 cm.",
      basics="sohcahtoa"),
    S(1, 1, 1, "Reverse bearings",
      "The bearing of B from A is 125°T. What is the bearing of A from B?",
      ["305°T", "235°T", "055°T", "145°T"],
      "The reverse bearing differs by 180°: 125° + 180° = 305°T. Facing back along the same line turns you through half a revolution."),
    S(1, 1, 2, "Cost of electrical energy",
      "A 2400 W heater runs for 3 hours a day for 30 days. Electricity costs 32 cents per kWh. What does this cost?",
      [money(69.12), money(2.30), money(691.20), money(230.40)],
      r"Energy $= 2.4 \text{ kW} \times 3 \text{ h} \times 30 = 216$ kWh, and $216 \times 0.32 = \$69.12$. \$2.30 is the cost of a single day.",
      basics="rateProblems"),
    # ---- Practice Test 1, Section II
    N(1, 2, 2, "Cosine rule: finding a side",
      r"Two sides of a triangle are 8 cm and 11 cm, and the angle between them is 72°. Find the length of the third side, in centimetres, correct to 1 decimal place.",
      [r1(m4)],
      r"$c^2 = 8^2 + 11^2 - 2 \times 8 \times 11 \cos 72° = " + f"{m4 ** 2:.2f}" + r"$, so $c = " + r1(m4) + "$ cm.",
      tol=0.05),
    N(1, 2, 1, "Area of a triangle with sine",
      r"A triangular garden bed has sides of 15 m and 22 m with an angle of 38° between them. Find its area, in square metres, correct to 1 decimal place.",
      [r1(m5)],
      r"$A = \frac{1}{2}ab\sin C = \frac{1}{2} \times 15 \times 22 \times \sin 38° = " + r1(m5) + r"$ m².",
      tol=0.05),
    N(1, 2, 3, "Cosine rule: finding an angle",
      r"A triangle has sides 7 m, 9 m and 12 m. Find its largest angle, to the nearest degree.",
      [str(round(m6))],
      r"The largest angle is opposite the longest side. $\cos C = \frac{7^2 + 9^2 - 12^2}{2 \times 7 \times 9} = \frac{-14}{126}$, so $C = " + r1(m6) + r"°$, which is " + str(round(m6)) + "°. A negative cosine means the angle is obtuse.",
      tol=0.5),
    N(1, 2, 2, "Fuel consumption",
      r"A car uses 7.8 L of fuel per 100 km. Fuel costs \$1.96 per litre. What is the fuel cost of a 450 km trip, in dollars, to the nearest cent?",
      ["68.80", "68.8"],
      r"Fuel used $= 7.8 \times \frac{450}{100} = 35.1$ L, and $35.1 \times 1.96 = \$68.796$, which is \$68.80.",
      tol=0.01, basics="rateProblems"),
    N(1, 2, 2, "Trapezoidal rule",
      "A paddock is 40 m long. Its widths, measured at 0 m, 20 m and 40 m along its length, are 18 m, 25 m and 21 m. Use two applications of the trapezoidal rule to estimate its area, in square metres.",
      ["890"],
      r"$A \approx \frac{20}{2}(18 + 25) + \frac{20}{2}(25 + 21) = 430 + 460 = 890$ m²."),
    # ---- Practice Test 2, Section I
    S(2, 1, 1, "Angle of elevation",
      "From a point 50 m from the base of a tower, the angle of elevation to the top is 32°. How tall is the tower, to 1 decimal place?",
      [f"{r1(m9)} m", f"{r1(50 * sin(32))} m", f"{r1(50 * cos(32))} m", f"{r1(50 / tan(32))} m"],
      r"The 50 m is adjacent to the 32° angle and the height is opposite, so $h = 50 \tan 32° = " + r1(m9) + r"$ m.",
      basics="sohcahtoa"),
    S(2, 1, 1, "Map scale",
      "A map has a scale of 1 : 20 000. Two towns are 8.5 cm apart on the map. How far apart are they in real life?",
      ["1.7 km", "17 km", "170 m", "2.4 km"],
      r"$8.5 \times 20\,000 = 170\,000$ cm, which is 1700 m or 1.7 km. 160 m and 16 km come from slips when changing centimetres to kilometres (100 cm in a metre, 1000 m in a kilometre).",
      basics="unitConversion"),
    S(2, 1, 1, "Rates over time",
      "A resting heart beats 72 times per minute. How many times does it beat in one day?",
      ["103 680", "4320", "1728", "1 036 800"],
      r"$72 \times 60 = 4320$ beats an hour, and $4320 \times 24 = 103\,680$ a day. 4320 is only one hour.",
      basics="rateProblems"),
    # ---- Practice Test 2, Section II
    N(2, 2, 2, "Sine rule: finding an angle",
      r"In triangle $PQR$, $p = 14$ cm, $q = 11$ cm and $P = 52°$. Angle $Q$ is acute. Find $Q$, to the nearest degree.",
      [str(round(m12))],
      r"$\frac{\sin Q}{11} = \frac{\sin 52°}{14}$, so $\sin Q = " + f"{11 * sin(52) / 14:.4f}" + r"$ and $Q = " + r1(m12) + r"°$, which is " + str(round(m12)) + "°.",
      tol=0.5),
    N(2, 2, 2, "Bearings and distance",
      "From a point O, tree A is 120 m away on a bearing of 040°T and tree B is 85 m away on a bearing of 130°T. How far apart are the trees, in metres, correct to 1 decimal place?",
      [r1(m13)],
      r"The angle AOB is $130° - 40° = 90°$, so Pythagoras' theorem applies: $AB = \sqrt{120^2 + 85^2} = " + r1(m13) + r"$ m. (The cosine rule gives the same, since $\cos 90° = 0$.)",
      tol=0.05),
    N(2, 2, 2, "Electrical energy",
      "A 1500 W air conditioner runs for 45 minutes each day for one week. How many kilowatt-hours (kWh) of energy does it use?",
      ["7.875"],
      r"$1.5 \text{ kW} \times 0.75 \text{ h} \times 7 = 7.875$ kWh. Change watts to kilowatts and minutes to hours first.",
      tol=0.005, basics="unitConversion"),
    N(2, 2, 1, "Dividing in a ratio",
      r"\$840 is shared in the ratio 3 : 4 : 5. What is the largest share, in dollars?",
      ["350"],
      r"There are $3 + 4 + 5 = 12$ parts of $840 \div 12 = \$70$, and the largest share is $5 \times 70 = \$350$.",
      basics="ratios"),
    N(2, 2, 2, "Area from a radial survey",
      "In a radial survey, two corners of a triangular block are 60 m and 80 m from the survey point, and the angle between the two radials is 110°. Find the area of the block, to the nearest square metre.",
      [str(round(m16))],
      r"$A = \frac{1}{2} \times 60 \times 80 \times \sin 110° = " + r1(m16) + r"$ m², so " + str(round(m16)) + " m².",
      tol=0.5),
    # ---- Drill only
    N(0, 2, 2, "Sine rule: finding a side",
      r"In triangle $XYZ$, $X = 43°$, $Y = 71°$ and $x = 9.5$ m. Find $y$, in metres, correct to 1 decimal place.",
      [r1(d1)],
      r"$y = \frac{9.5 \sin 71°}{\sin 43°} = " + r1(d1) + "$ m.",
      tol=0.05, basics="sohcahtoa"),
    N(0, 2, 2, "Cosine rule: finding a side",
      "Two sides of a triangle are 14 cm and 9 cm, with an angle of 115° between them. Find the third side, in centimetres, correct to 1 decimal place.",
      [r1(d2)],
      r"$c^2 = 14^2 + 9^2 - 2 \times 14 \times 9 \cos 115° = " + f"{d2 ** 2:.2f}" + r"$, so $c = " + r1(d2) + r"$ cm. Since $\cos 115°$ is negative, $c^2$ is more than $14^2 + 9^2$.",
      tol=0.05),
    N(0, 2, 2, "Cosine rule: finding an angle",
      "A triangle has sides 5 cm, 6 cm and 8 cm. Find the angle opposite the 6 cm side, to the nearest degree.",
      [str(round(d3))],
      r"$\cos \theta = \frac{5^2 + 8^2 - 6^2}{2 \times 5 \times 8} = \frac{53}{80}$, so $\theta = " + r1(d3) + r"°$, which is " + str(round(d3)) + "°.",
      tol=0.5),
    N(0, 2, 1, "Area of a triangle with sine",
      "A triangle has sides 6.2 m and 8.5 m with an included angle of 57°. Find its area, in square metres, correct to 1 decimal place.",
      [r1(d4)],
      r"$A = \frac{1}{2} \times 6.2 \times 8.5 \times \sin 57° = " + r1(d4) + r"$ m².",
      tol=0.05),
    S(0, 2, 1, "Choosing a rule",
      "You know two sides of a triangle and the angle between them, and the triangle has no right angle. Which do you use to find the third side?",
      ["The cosine rule", "The sine rule", "Pythagoras' theorem", "The area formula"],
      "Two sides and the included angle is the cosine rule case. The sine rule needs a side with its opposite angle, and Pythagoras' theorem needs a right angle."),
    S(0, 2, 1, "Compass and true bearings",
      "Which true bearing is the same direction as the compass bearing S40°E?",
      ["140°T", "040°T", "220°T", "320°T"],
      "S40°E is 40° from south towards east. South is 180°T, and turning 40° back towards east gives 180° - 40° = 140°T."),
    N(0, 2, 1, "Reverse bearings",
      "The bearing of Q from P is 063°T. What is the bearing of P from Q, in degrees?",
      ["243"],
      "Add 180°: 63° + 180° = 243°, so the bearing is 243°T."),
    N(0, 2, 2, "Angle of depression",
      "From the top of an 80 m cliff, the angle of depression to a boat is 18°. How far is the boat from the base of the cliff, to the nearest metre?",
      [str(round(d8))],
      r"The angle of elevation from the boat is also 18°, so $\tan 18° = \frac{80}{d}$ and $d = \frac{80}{\tan 18°} = " + r1(d8) + r"$ m, about " + str(round(d8)) + " m.",
      tol=0.5, basics="sohcahtoa"),
    N(0, 2, 1, "Fuel consumption rate",
      "A car used 42 L of fuel to travel 600 km. What is its fuel consumption, in litres per 100 km?",
      ["7"],
      r"$\frac{42}{600} \times 100 = 7$ L/100 km.",
      basics="rateProblems"),
    N(0, 2, 1, "Cost of electricity",
      "A fridge uses 1.2 kWh of energy a day. Electricity costs 30 cents per kWh. What does it cost to run for 365 days, in dollars?",
      ["131.40", "131.4"],
      r"$1.2 \times 365 = 438$ kWh, and $438 \times 0.30 = \$131.40$.",
      tol=0.01, basics="rateProblems"),
    N(0, 2, 2, "Area from a scale drawing",
      "On a plan with a scale of 1 : 100, a rectangular room measures 4.2 cm by 3.5 cm. What is the actual floor area, in square metres?",
      ["14.7"],
      r"Each 1 cm is 100 cm, or 1 m, so the room is 4.2 m by 3.5 m: $4.2 \times 3.5 = 14.7$ m².",
      tol=0.01, basics="ratios"),
    N(0, 2, 1, "Ratio in a mixture",
      "Concrete is mixed from cement, sand and gravel in the ratio 1 : 2 : 4. How many cubic metres of gravel are in 3.5 m³ of mix?",
      ["2"],
      r"There are 7 parts of $3.5 \div 7 = 0.5$ m³, and gravel is 4 parts: 2 m³.",
      basics="ratios"),
    N(0, 2, 1, "Converting a rate",
      "Convert 90 km/h to metres per second.",
      ["25"],
      r"$90 \text{ km/h} = 90\,000 \text{ m} \div 3600 \text{ s} = 25$ m/s.",
      basics="unitConversion"),
    N(0, 2, 1, "Trapezoidal rule",
      "Use one application of the trapezoidal rule to estimate the area of a strip of land 12 m wide, whose end lengths are 7.5 m and 9.1 m. Give the answer in square metres.",
      ["99.6"],
      r"$A \approx \frac{12}{2}(7.5 + 9.1) = 6 \times 16.6 = 99.6$ m².",
      tol=0.01),
    N(0, 2, 2, "Trapezoidal rule, two applications",
      "A pond's widths are 10 m, 14 m and 8 m, measured 15 m apart along its length. Use two applications of the trapezoidal rule to estimate its area, in square metres.",
      ["345"],
      r"$A \approx \frac{15}{2}(10 + 14) + \frac{15}{2}(14 + 8) = 180 + 165 = 345$ m²."),
    S(0, 2, 1, "Right-angled trigonometry",
      "A kite string 60 m long makes an angle of 55° with the flat ground. How high is the kite, to 1 decimal place?",
      [f"{r1(d16)} m", f"{r1(60 * cos(55))} m", f"{r1(60 * tan(55))} m", f"{r1(60 / sin(55))} m"],
      r"The string is the hypotenuse and the height is opposite the 55° angle: $h = 60 \sin 55° = " + r1(d16) + "$ m.",
      basics="sohcahtoa"),
    N(0, 2, 1, "Heart rate",
      "A nurse counts 17 heartbeats in 15 seconds. What is the heart rate in beats per minute?",
      ["68"],
      r"There are four lots of 15 seconds in a minute: $17 \times 4 = 68$ beats per minute.",
      basics="rateProblems"),
    N(0, 2, 1, "Speed, distance and time",
      "A bus travels 330 km at an average speed of 88 km/h. How many hours does the trip take? Give a decimal.",
      ["3.75"],
      r"Time = distance ÷ speed $= 330 \div 88 = 3.75$ hours (3 hours 45 minutes).",
      tol=0.001, basics="rateProblems"),
    N(0, 2, 2, "Area from a radial survey",
      "A radial survey of a triangular field measures 45 m and 52 m from the survey point to two corners, with 64° between the radials. Find the area, to the nearest square metre.",
      [str(round(d19))],
      r"$A = \frac{1}{2} \times 45 \times 52 \times \sin 64° = " + r1(d19) + r"$ m², so " + str(round(d19)) + " m².",
      tol=0.5),
    N(0, 2, 3, "Distance between points from bearings",
      "From a survey point O, marker A is 200 m away on a bearing of 020°T and marker B is 150 m away on a bearing of 145°T. How far apart are A and B, to the nearest metre?",
      [str(round(d20))],
      r"Angle AOB $= 145° - 20° = 125°$. $AB^2 = 200^2 + 150^2 - 2 \times 200 \times 150 \cos 125° = " + f"{d20 ** 2:.0f}" + r"$, so $AB = " + r1(d20) + "$ m, about " + str(round(d20)) + " m.",
      tol=0.5),
]
