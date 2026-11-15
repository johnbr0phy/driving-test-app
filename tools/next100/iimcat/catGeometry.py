# QA: geometry and mensuration. Every answer asserted.
from fractions import Fraction as Fr
import math
assert 9 ** 2 + 12 ** 2 == 15 ** 2 and Fr(9 * 12, 15) == Fr(36, 5)
assert Fr(22, 7) * 14 * 14 == 616 and 2 * Fr(22, 7) * 14 == 88
assert 6 ** 3 == 216 and 6 * 6 ** 2 == 216
assert math.hypot(11 - (-1), -1 - 4) == 13
assert math.isclose(math.sqrt(3) / 4 * 144, 36 * math.sqrt(3))
assert 360 / (180 - 150) == 12
assert Fr(22, 7) * 49 * 15 == 2310
assert 3 * 1 - 1 == 2 and 3 * 3 - 1 == 8
assert (23 ** 2 - 17 ** 2) // 2 == 120 and 23 ** 2 - 17 ** 2 == 240
assert 180 * 7 // 18 == 70
assert Fr(4, 3) * 27 == 36
assert math.sqrt(10 ** 2 - 8 ** 2) == 6
assert (10 + 16) * 7 / 2 == 91
assert ((-6 + 10) / 2, (9 - 3) / 2) == (2, 3)
assert (2 * 5) ** 2 / 2 == 50

ITEMS = [
    # ---------- Test 1 ----------
    N(1, 2, "Triangles", "A right-angled triangle has legs of 9 cm and 12 cm. What is the length, in cm, of the perpendicular from the right angle to the hypotenuse?",
      "7.2", ["6", "7.5", "8"], "The hypotenuse is 15 cm. The area is 9 x 12 / 2 = 54, and also hypotenuse x height / 2, so the height is 108/15 = 7.2 cm."),
    T(1, 1, "Circles", "A circle has an area of 616 sq cm. Taking $\\pi = \\frac{22}{7}$, what is its circumference in cm?",
      "88", "$\\frac{22}{7} r^2 = 616$ gives $r^2 = 196$ and $r = 14$. The circumference is $2 \\times \\frac{22}{7} \\times 14 = 88$ cm."),
    N(1, 2, "Mensuration", "A cube has a volume of 216 cubic cm. What is its total surface area in sq cm?",
      "216", ["144", "196", "256"], "The side is the cube root of 216, which is 6 cm. Total surface area = 6 x 6^2 = 216 sq cm. Four faces only (the lateral area) give 144."),
    T(1, 1, "Coordinate geometry", "What is the distance between the points (-1, 4) and (11, -1)?",
      "13", "The differences are 12 and 5, so the distance is the square root of 144 + 25 = 169, which is 13."),
    # ---------- Test 2 ----------
    S(2, 2, "Triangles", "What is the area of an equilateral triangle with sides of 12 cm, in sq cm?",
      ["36√3", "72√3", "48√3", "24√3"],
      "Area = (√3/4) x side^2 = (√3/4) x 144 = 36√3. Its height is 6√3, and half of 12 x 6√3 is again 36√3."),
    T(2, 2, "Polygons", "Each interior angle of a regular polygon is 150 degrees. How many sides does it have?",
      "12", "Each exterior angle is 180 - 150 = 30 degrees, and the exterior angles of any polygon add up to 360, so there are 360/30 = 12 sides."),
    T(2, 2, "Mensuration", "A cylinder has a radius of 7 cm and a height of 15 cm. Taking $\\pi = \\frac{22}{7}$, what is its volume in cubic cm?",
      "2310", "Volume = $\\pi r^2 h = \\frac{22}{7} \\times 49 \\times 15 = 2310$ cubic cm."),
    S(2, 2, "Coordinate geometry", "Which is the equation of the straight line through the points (1, 2) and (3, 8)?",
      ["y = 3x - 1", "y = 3x + 1", "y = 2x", "y = 3x - 2"],
      "The slope is (8 - 2)/(3 - 1) = 3. Putting (1, 2) into y = 3x + c gives c = -1. Check with (3, 8): 9 - 1 = 8."),
    # ---------- Drill only ----------
    T(0, 3, "Mensuration", "A rectangle has a perimeter of 46 cm and a diagonal of 17 cm. What is its area in sq cm?",
      "120", "Length + width = 23 and length^2 + width^2 = 289. Since (l + w)^2 = l^2 + w^2 + 2lw, 529 = 289 + 2lw, so lw = 120. The sides are 15 and 8."),
    T(0, 1, "Triangles", "The angles of a triangle are in the ratio 5 : 6 : 7. What is the largest angle, in degrees?",
      "70", "The parts total 18, and the angles add up to 180 degrees, so one part is 10 degrees and the largest angle is 7 x 10 = 70."),
    S(0, 2, "Mensuration", "What is the volume of a sphere of radius 3 cm, in cubic cm?",
      ["36π", "27π", "12π", "108π"],
      "Volume = (4/3)πr^3 = (4/3) x 27 x π = 36π. Forgetting the 1/3 gives 108π."),
    T(0, 2, "Circles", "A chord 16 cm long is drawn in a circle of radius 10 cm. How far is the chord from the centre, in cm?",
      "6", "The perpendicular from the centre bisects the chord, giving a right triangle with hypotenuse 10 and one side 8. The distance is the square root of 100 - 64 = 36, which is 6."),
    S(0, 2, "Similar triangles", "Two similar triangles have corresponding sides in the ratio 2 : 3. What is the ratio of their areas?",
      ["4 : 9", "2 : 3", "8 : 27", "9 : 4"],
      "Areas of similar figures are in the ratio of the squares of their sides: 2^2 : 3^2 = 4 : 9. The cube ratio, 8 : 27, applies to volumes."),
    T(0, 1, "Mensuration", "A trapezium has parallel sides of 10 cm and 16 cm and a height of 7 cm. What is its area in sq cm?",
      "91", "Area = half the sum of the parallel sides x height = (10 + 16)/2 x 7 = 13 x 7 = 91 sq cm."),
    S(0, 1, "Coordinate geometry", "What is the midpoint of the segment joining (-6, 9) and (10, -3)?",
      ["(2, 3)", "(8, 6)", "(2, 6)", "(8, -6)"],
      "Average the coordinates: x = (-6 + 10)/2 = 2 and y = (9 - 3)/2 = 3. Halving the differences instead gives (8, -6)."),
    T(0, 2, "Circles", "A square is drawn inside a circle of radius 5 cm so that all four corners touch the circle. What is the area of the square, in sq cm?",
      "50", "The square's diagonal is the circle's diameter, 10 cm. The area of a square is half the square of its diagonal: 100/2 = 50 sq cm."),
]
