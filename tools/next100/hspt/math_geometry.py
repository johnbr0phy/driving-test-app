# HSPT Mathematics: geometry (angles, figures, perimeter, area, volume, circles, Pythagorean theorem). Original items.
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Area of a triangle", diff=1,
       stem="What is the area of a triangle with a base of 12 cm and a height of 7 cm?",
       key="42 square centimeters", wrong=["21 square centimeters", "38 square centimeters", "84 square centimeters"],
       expl="Area = 1/2 × base × height = 1/2 × 12 × 7 = 42. Forgetting the 1/2 gives 84."),
  dict(test=1, skill="Angles of a triangle", diff=1,
       stem="Two angles of a triangle measure 48° and 67°. What is the measure of the third angle?",
       key="65°", wrong=["55°", "75°", "115°"],
       expl="The angles of a triangle add to 180°: 180 - 48 - 67 = 65. 115° is the sum of the two given angles."),
  dict(test=1, skill="Circumference", diff=2,
       stem="Using 22/7 for pi, what is the circumference of a circle with a diameter of 14 inches?",
       key="44 inches", wrong=["22 inches", "88 inches", "154 inches"],
       expl="Circumference = pi × diameter = 22/7 × 14 = 44 inches. 154 is the area of that circle in square inches."),
  dict(test=1, skill="Volume", diff=2,
       stem="A box is 5 ft long, 3 ft wide and 4 ft high. What is its volume?",
       key="60 cubic feet", wrong=["12 cubic feet", "47 cubic feet", "94 cubic feet"],
       expl="Volume = length × width × height = 5 × 3 × 4 = 60 cubic feet. 94 is the box's surface area in square feet."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Area of a circle", diff=2,
       stem="Using 3.14 for pi, what is the area of a circle with a radius of 5 m?",
       key="78.5 square meters", wrong=["15.7 square meters", "31.4 square meters", "314 square meters"],
       expl="Area = pi × radius² = 3.14 × 25 = 78.5. 31.4 is the circumference in meters."),
  dict(test=2, skill="Pythagorean theorem", diff=2,
       stem="A right triangle has legs 9 units and 12 units long. How long is its hypotenuse?",
       key="15", wrong=["13", "18", "21"],
       expl="9² + 12² = 81 + 144 = 225, and the square root of 225 is 15. Adding the legs gives 21, which is too long."),
  dict(test=2, skill="Polygon angles", diff=3,
       stem="What is the measure of each interior angle of a regular hexagon?",
       key="120°", wrong=["60°", "108°", "135°"],
       expl="A hexagon's angles add to (6 - 2) × 180 = 720°, and 720 ÷ 6 = 120°. 108° is the angle of a regular pentagon."),
  dict(test=2, skill="Perimeter and area", diff=2,
       stem="The perimeter of a square is 36 inches. What is its area?",
       key="81 square inches", wrong=["9 square inches", "36 square inches", "144 square inches"],
       expl="Each side is 36 ÷ 4 = 9 inches, so the area is 9 × 9 = 81 square inches. 9 is only the side length."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Supplementary angles", diff=1,
       stem="Two angles are supplementary. One measures 38°. What is the measure of the other?",
       key="142°", wrong=["52°", "62°", "322°"],
       expl="Supplementary angles add to 180°, so the other is 180 - 38 = 142°. 52° would make them complementary, adding to 90°."),
]
