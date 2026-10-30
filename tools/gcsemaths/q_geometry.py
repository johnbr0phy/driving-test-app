"""Geometry and measures (DfE subject content section 4): 15% of Foundation marks."""
from helpers import S, N

DOMAIN = "gcseGeometry"

ITEMS = [
    # Practice Test 1, Paper 1 (non-calculator)
    N(1, 1, "Angles in a triangle", 1, "Two angles in a triangle are 48° and 75°. What is the size of the third angle, in degrees?", ["57"],
      r"Angles in a triangle add up to 180°: $180 - 48 - 75 = 57$°."),
    N(1, 1, "Area and perimeter", 2, "A rectangle is 9 cm long and has an area of 54 cm². What is its perimeter, in cm?", ["30"],
      r"The width is $54 \div 9 = 6$ cm, so the perimeter is $9 + 6 + 9 + 6 = 30$ cm. 15 cm adds only two of the sides."),
    S(1, 1, "Angles in polygons", 3, "What is the size of each interior angle of a regular hexagon?", ["60°", "108°", "120°", "135°"], 2,
      r"Each exterior angle is $360 \div 6 = 60$°, so each interior angle is $180 - 60 = 120$°. 60° is the exterior angle.", locked=True),

    # Practice Test 1, Paper 2 (calculator)
    N(1, 2, "Area of a circle", 1, "A circle has a radius of 6 cm. Work out its area, in cm², to 1 decimal place.", ["113.1"],
      r"Area $= \pi r^2 = \pi \times 36 = 113.097...$, which is 113.1 cm². Using $2\pi r$ gives 37.7, the circumference.", tol=0.05),
    N(1, 2, "Pythagoras' theorem", 2, "A right-angled triangle has shorter sides of 7 cm and 24 cm. How long is the hypotenuse, in cm?", ["25"],
      r"$7^2 + 24^2 = 49 + 576 = 625$, and $\sqrt{625} = 25$ cm."),
    N(1, 2, "Trigonometry", 3, r"In a right-angled triangle, the side opposite angle $x$ is 5 cm and the hypotenuse is 8 cm. Work out angle $x$, in degrees, to 1 decimal place.", ["38.7"],
      r"Opposite and hypotenuse means sine: $\sin x = \frac{5}{8}$, so $x = \sin^{-1}(0.625) = 38.68...$, which is 38.7°. Using cosine instead gives 51.3°.", tol=0.05),

    # Practice Test 1, Paper 3 (calculator)
    N(1, 3, "Volume of a cuboid", 1, "A cuboid measures 5 cm by 4 cm by 3 cm. What is its volume, in cm³?", ["60"],
      r"Volume $= 5 \times 4 \times 3 = 60$ cm³."),
    S(1, 3, "Bearings", 2, "A ship sails from port A to point B on a bearing of 070°. What is the bearing of A from B?",
      ["070°", "110°", "250°", "290°"], 2,
      r"The back bearing is 180° more: $70 + 180 = 250$°. 110° is $180 - 70$, which is not a bearing back along the same line.", locked=True),
    N(1, 3, "Volume of a cylinder", 3, "A cylinder has a radius of 3 cm and a height of 10 cm. Work out its volume, in cm³, to the nearest whole number.", ["283"],
      r"Volume $= \pi r^2 h = \pi \times 9 \times 10 = 282.7...$, which is 283 cm³.", tol=0.5),

    # Practice Test 2, Paper 1 (non-calculator)
    N(2, 1, "Angles on a straight line", 1, r"Two angles together make a straight line. They are $3x$° and $(x + 20)$°. Work out the value of $x$.", ["40"],
      r"Angles on a straight line add up to 180°: $4x + 20 = 180$, so $4x = 160$ and $x = 40$."),
    S(2, 1, "Parallel lines", 2, "Two parallel lines are crossed by a third straight line. One of the angles formed is 65°. What size is the angle alternate to it?",
      ["25°", "65°", "115°", "295°"], 1,
      "Alternate angles are equal, so it is 65°. 115° is the co-interior (allied) angle, which adds to 180° with it.", locked=True),
    N(2, 1, "Area of a trapezium", 3, "A trapezium has parallel sides of 8 cm and 14 cm. The perpendicular distance between them is 5 cm. What is its area, in cm²?", ["55"],
      r"Area $= \frac{1}{2}(a + b)h = \frac{1}{2} \times 22 \times 5 = 55$ cm². Forgetting the half gives 110."),

    # Practice Test 2, Paper 2 (calculator)
    N(2, 2, "Circumference", 1, "A circle has a diameter of 15 cm. Work out its circumference, in cm, to 1 decimal place.", ["47.1"],
      r"Circumference $= \pi d = \pi \times 15 = 47.12...$, which is 47.1 cm. Using 15 as the radius doubles it to 94.2.", tol=0.05),
    N(2, 2, "Pythagoras' theorem", 2, "A ladder 5 m long leans against a vertical wall. Its foot is on level ground, 1.4 m from the wall. How high up the wall does the ladder reach, in metres?", ["4.8"],
      r"The ladder is the hypotenuse: $\sqrt{5^2 - 1.4^2} = \sqrt{25 - 1.96} = \sqrt{23.04} = 4.8$ m. Adding the squares gives 5.19, longer than the ladder."),
    N(2, 2, "Trigonometry", 3, "In a right-angled triangle, angle $x$ is 40° and the side adjacent to $x$ is 12 cm. Work out the length of the side opposite $x$, in cm, to 1 decimal place.", ["10.1"],
      r"Opposite and adjacent means tangent: opposite $= 12 \times \tan 40° = 10.07...$, which is 10.1 cm.", tol=0.05),

    # Practice Test 2, Paper 3 (calculator)
    S(2, 3, "Symmetry", 1, "A rhombus is not a square. How many lines of symmetry does it have?", ["0", "1", "2", "4"], 2,
      "Its two diagonals are its only lines of symmetry. A square has 4, but a rhombus that is not a square has just 2.", locked=True),
    N(2, 3, "Angles in polygons", 2, "The interior angles of a polygon add up to 1080°. How many sides does the polygon have?", ["8"],
      r"The angle sum is $(n - 2) \times 180$. $1080 \div 180 = 6$, so $n - 2 = 6$ and $n = 8$. Stopping at 6 forgets the 2."),
    N(2, 3, "Enlargement", 3, "Triangle A has sides of 4 cm, 6 cm and 7 cm. It is enlarged by scale factor 2.5. How long is the longest side of the enlarged triangle, in cm?", ["17.5"],
      r"Every length is multiplied by 2.5, so the longest side is $7 \times 2.5 = 17.5$ cm."),

    # Drill only
    N(0, 0, "Angles in a triangle", 1, "A triangle has angles of 90° and 34°. What is the third angle, in degrees?", ["56"],
      r"$180 - 90 - 34 = 56$°.", basics="triangleAngles"),
    S(0, 0, "Isosceles triangles", 1, "In an isosceles triangle, the angle between the two equal sides is 40°. What size is each of the other two angles?",
      ["40°", "50°", "70°", "140°"], 2,
      r"The other two angles are equal and share $180 - 40 = 140$°, so each is 70°.", basics="triangleAngles", locked=True),
    N(0, 0, "Angles around a point", 1, r"Three angles meet at a point. Two of them are 110° and 95°. What is the third angle, in degrees?", ["155"],
      r"Angles around a point add up to 360°: $360 - 110 - 95 = 155$°. Using 180° gives a negative angle."),
    N(0, 0, "Area and perimeter", 1, "A square has a perimeter of 36 cm. What is its area, in cm²?", ["81"],
      r"Each side is $36 \div 4 = 9$ cm, so the area is $9 \times 9 = 81$ cm².", basics="areaPerimeter"),
    N(0, 0, "Area of a parallelogram", 1, "A parallelogram has a base of 9 cm and a perpendicular height of 4 cm. What is its area, in cm²?", ["36"],
      r"Area = base × perpendicular height $= 9 \times 4 = 36$ cm². There is no half, unlike a triangle.", basics="areaPerimeter"),
    S(0, 0, "Compound shapes", 2, "An L-shaped room is made of two rectangles: one 6 m by 4 m and one 3 m by 2 m. What is the total floor area?",
      ["24 m²", "28 m²", "30 m²", "34 m²"], 2,
      r"$6 \times 4 = 24$ and $3 \times 2 = 6$, so the total is 30 m².", basics="areaPerimeter", locked=True),
    N(0, 0, "Circumference", 1, "A circle has a radius of 5 cm. Work out its circumference, in cm, to 1 decimal place.", ["31.4"],
      r"Circumference $= 2\pi r = 10\pi = 31.41...$, which is 31.4 cm.", basics="circleBasics", tol=0.05),
    S(0, 0, "Area of a circle", 2, "A circle has a diameter of 10 cm. Which expression gives its area in cm²?",
      [r"$25\pi$", r"$100\pi$", r"$10\pi$", r"$20\pi$"], 0,
      r"The radius is 5 cm, so the area is $\pi \times 5^2 = 25\pi$. Using the diameter in $\pi r^2$ gives $100\pi$.", basics="circleBasics"),
    N(0, 0, "Volume of a cube", 2, "A cube has edges of 4 cm. What is its volume, in cm³?", ["64"],
      r"$4 \times 4 \times 4 = 64$ cm³. 48 is $4 \times 12$, which is not a volume.", basics="volume"),
    N(0, 0, "Volume of a prism", 2, "A prism is 10 cm long. Its cross-section is a triangle with base 6 cm and height 4 cm. What is its volume, in cm³?", ["120"],
      r"The cross-section has area $\frac{1}{2} \times 6 \times 4 = 12$ cm², so the volume is $12 \times 10 = 120$ cm³.", basics="volume"),
    N(0, 0, "Surface area", 2, "A cuboid measures 5 cm by 3 cm by 2 cm. What is its total surface area, in cm²?", ["62"],
      r"There are two faces of each size: $2(15 + 10 + 6) = 62$ cm². 30 is the volume, not the surface area.", basics="areaPerimeter"),
    N(0, 0, "Pythagoras' theorem", 2, "A right-angled triangle has shorter sides of 6 cm and 8 cm. How long is the hypotenuse, in cm?", ["10"],
      r"$6^2 + 8^2 = 100$, and $\sqrt{100} = 10$ cm.", basics="pythagorean"),
    N(0, 0, "Pythagoras' theorem", 2, "A right-angled triangle has a hypotenuse of 13 cm and one shorter side of 5 cm. How long is the other shorter side, in cm?", ["12"],
      r"Subtract the squares: $13^2 - 5^2 = 169 - 25 = 144$, and $\sqrt{144} = 12$ cm.", basics="pythagorean"),
    S(0, 0, "Trigonometric ratios", 2, r"In a right-angled triangle, which ratio gives $\tan x$?",
      ["opposite ÷ adjacent", "adjacent ÷ opposite", "opposite ÷ hypotenuse", "adjacent ÷ hypotenuse"], 0,
      "TOA: tan = opposite ÷ adjacent. Opposite ÷ hypotenuse is sine and adjacent ÷ hypotenuse is cosine.", basics="sohcahtoa"),
    N(0, 0, "Exact trigonometric values", 3, "Without a calculator, what is the exact value of sin 30°? Give your answer as a fraction or a decimal.", ["1/2", "0.5"],
      r"In half of an equilateral triangle with side 2, the side opposite 30° is 1 and the hypotenuse is 2, so sin 30° $= \frac{1}{2}$.", basics="sohcahtoa"),
    S(0, 0, "Bearings", 2, "What is the three-figure bearing of due west?", ["090°", "180°", "270°", "360°"], 2,
      "Bearings are measured clockwise from north: east is 090°, south 180° and west 270°.", locked=True),
    S(0, 0, "Exterior angles", 2, "What is the size of each exterior angle of a regular pentagon?", ["36°", "72°", "108°", "540°"], 1,
      r"Exterior angles add up to 360°, so each is $360 \div 5 = 72$°. 108° is the interior angle.", locked=True),
    S(0, 0, "Reflections", 3, r"The point $(3, 5)$ is reflected in the $y$-axis. What are the coordinates of its image?",
      [r"$(-3, 5)$", r"$(3, -5)$", r"$(-3, -5)$", r"$(5, 3)$"], 0,
      r"Reflecting in the $y$-axis changes the sign of the $x$-coordinate only. $(3, -5)$ is a reflection in the $x$-axis."),
]
