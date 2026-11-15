# ISEE Middle Level, Mathematics Achievement: geometry and measurement.
# Original items. Metric conversions within a unit are expected to be known;
# no figure is used, so every shape is described in words.


def M(test, diff, skill, stem, key, wrong, expl, basics=None):
    return dict(test=test, skill=skill, diff=diff, stem=stem, key=key, wrong=wrong, expl=expl, basics=basics)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    M(1, 1, "Supplementary angles", "Two angles are supplementary. One measures 65°. What is the measure of the other?",
      "115°", ["25°", "125°", "295°"],
      "Supplementary angles add to 180°, and 180 - 65 = 115. 25° would make them complementary, adding to 90°."),
    M(1, 1, "Metric conversion", "How many centimeters are in 3.2 meters?",
      "320", ["32", "3,200", "0.032"],
      "There are 100 centimeters in a meter, so 3.2 × 100 = 320. Multiplying by 1,000 confuses centimeters with millimeters."),
    M(1, 2, "Volume of a prism", "A rectangular prism is 4 cm long, 3 cm wide and 2 cm high. What is its volume?",
      "24 cubic centimeters", ["9 cubic centimeters", "48 cubic centimeters", "52 cubic centimeters"],
      "Volume is length × width × height: 4 × 3 × 2 = 24 cubic centimeters. 52 is the surface area, and 9 adds the edges."),
    M(1, 2, "Scale drawings", "On a scale drawing, 1 cm stands for 4 m. A room is 5 cm long on the drawing. How long is the real room?",
      "20 m", ["1.25 m", "9 m", "25 m"],
      "Each centimeter is 4 meters, so 5 cm is 5 × 4 = 20 m. Adding 5 and 4 gives 9, which is not how a scale works."),
    M(1, 3, "Perimeter", "A square and an equilateral triangle have the same perimeter. Each side of the square is 6 inches. How long is each side of the triangle?",
      "8 inches", ["12 inches", "18 inches", "24 inches"],
      "The square's perimeter is 4 × 6 = 24 inches, and the triangle's three equal sides share it: 24 ÷ 3 = 8 inches."),
    M(1, 3, "Area of a circle", "Using 3.14 for π, what is the area of a circle with a radius of 5 cm?",
      "78.5 square centimeters", ["15.7 square centimeters", "31.4 square centimeters", "314 square centimeters"],
      "Area is πr², so 3.14 × 5 × 5 = 78.5 square centimeters. 31.4 is the circumference, 2πr."),
    # ---------------- Practice Test 2 ----------------
    M(2, 1, "Metric conversion", "How many grams are in 2.5 kilograms?",
      "2,500", ["25", "250", "25,000"],
      "A kilogram is 1,000 grams, so 2.5 × 1,000 = 2,500 grams."),
    M(2, 1, "Angles in a quadrilateral", "Three angles of a quadrilateral measure 90°, 85° and 100°. What is the measure of the fourth angle?",
      "85°", ["75°", "95°", "185°"],
      "The angles of a quadrilateral add to 360°, and 360 - 90 - 85 - 100 = 85. Using 180° as the total would give a negative answer, so it cannot be right."),
    M(2, 2, "Circumference", "Using 3.14 for π, what is the circumference of a circle with a diameter of 10 inches?",
      "31.4 inches", ["15.7 inches", "62.8 inches", "78.5 inches"],
      "Circumference is π × diameter, so 3.14 × 10 = 31.4 inches. 62.8 uses the diameter where the radius belongs in 2πr."),
    M(2, 2, "Area of a trapezoid", "A trapezoid has parallel sides of 6 m and 10 m and a height of 4 m. What is its area?",
      "32 square meters", ["24 square meters", "40 square meters", "64 square meters"],
      "Area = half the sum of the parallel sides × height = (6 + 10) ÷ 2 × 4 = 8 × 4 = 32 square meters. Forgetting to halve gives 64."),
    M(2, 3, "Reflections", "The point (3, -2) is reflected over the x-axis. Where does it land?",
      "(3, 2)", ["(-3, -2)", "(-3, 2)", "(-2, 3)"],
      "Reflecting over the x-axis keeps x the same and changes the sign of y, so (3, -2) becomes (3, 2). (-3, -2) is the reflection over the y-axis."),
    M(2, 3, "Surface area", "What is the surface area of a cube with edges 4 inches long?",
      "96 square inches", ["16 square inches", "64 square inches", "80 square inches"],
      "A cube has 6 square faces of 4 × 4 = 16 square inches each, so 6 × 16 = 96 square inches. 64 is the volume, in cubic inches."),
    # ---------------- Drill only ----------------
    M(0, 1, "Vertical angles", "Two lines cross. One of the angles they form measures 72°. What is the angle directly across from it?",
      "72°", ["18°", "108°", "288°"],
      "Angles directly across from each other where two lines cross are vertical angles, and they are equal. 108° is the angle beside it, which is supplementary."),
    M(0, 1, "Metric conversion", "How many milliliters are in 1.5 liters?",
      "1,500", ["15", "150", "15,000"],
      "A liter is 1,000 milliliters, so 1.5 × 1,000 = 1,500."),
    M(0, 2, "Area of a triangle", "A triangle has a base of 10 cm and a height of 7 cm. What is its area?",
      "35 square centimeters", ["17 square centimeters", "70 square centimeters", "140 square centimeters"],
      "Area is half of base × height: 10 × 7 ÷ 2 = 35 square centimeters. 70 forgets to take half."),
    M(0, 3, "Scale factor and area", "A rectangle 8 m by 5 m is enlarged by a scale factor of 2. What is the area of the new rectangle?",
      "160 square meters", ["40 square meters", "80 square meters", "52 square meters"],
      "The new rectangle is 16 m by 10 m, so its area is 160 square meters, four times the old 40. Doubling the area to 80 forgets that both sides double."),
]
