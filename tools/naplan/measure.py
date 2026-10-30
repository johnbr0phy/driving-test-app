# Measurement and Geometry (napMeasure), calculator allowed. Shapes are
# described in words; no figures.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("A rectangular garden bed is 3.5 m long and 1.2 m wide. What is its area, in square metres?",
  ["4.2"],
  "Area $= 3.5 \\times 1.2 = 4.2$ m². Adding the two sides gives 4.7, which is half the perimeter, not the area.",
  d=1, skill="Area of rectangles")
S("Two angles of a triangle are $48^\\circ$ and $67^\\circ$. What is the third angle?",
  "$65^\\circ$", ["$115^\\circ$", "$245^\\circ$", "$75^\\circ$"],
  "The angles of a triangle add to $180^\\circ$: $180 - 48 - 67 = 65$. $115^\\circ$ is the sum of the two given angles.",
  d=1, skill="Angles in a triangle")
N("A right-angled triangle has shorter sides of 9 cm and 12 cm. How long is the hypotenuse, in centimetres?",
  ["15"],
  "By Pythagoras, $c^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $c = 15$ cm.",
  d=2, skill="Pythagoras")
S("A map has a scale of 1 : 50 000. Two towns are 6 cm apart on the map. How far apart are they in real life?",
  "3 km", ["300 m", "30 km", "300 km"],
  "$6 \\times 50\\,000 = 300\\,000$ cm. There are 100 000 cm in a kilometre, so the distance is 3 km.",
  d=2, skill="Scale")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
N("A cylindrical water tank has a radius of 1.5 m and a height of 2 m. What is its volume, in cubic metres, to one decimal place?",
  ["14.1"],
  "$V = \\pi r^2 h = \\pi \\times 1.5^2 \\times 2 = 4.5\\pi \\approx 14.1$ m³.",
  d=3, skill="Volume of cylinders", tol=0.05)
N("A ladder 5 m long leans against a wall. Its foot is 1.4 m from the wall on flat ground. How high up the wall does it reach, in metres?",
  ["4.8"],
  "The ladder is the hypotenuse: $h^2 = 5^2 - 1.4^2 = 25 - 1.96 = 23.04$, so $h = 4.8$ m.",
  d=3, skill="Pythagoras")
S("A closed box (rectangular prism) is 4 cm by 3 cm by 2 cm. What is its total surface area?",
  "52 cm²", ["24 cm²", "26 cm²", "48 cm²"],
  "The faces come in pairs: $2(4 \\times 3) + 2(4 \\times 2) + 2(3 \\times 2) = 24 + 16 + 12 = 52$ cm². 24 is the volume in cm³, and 26 counts each pair once.",
  d=3, skill="Surface area")
S("Two triangles are similar. A side of 6 cm in the small triangle matches a side of 15 cm in the large one. The small triangle has another side of 4 cm. How long is the matching side in the large triangle?",
  "10 cm", ["13 cm", "9.6 cm", "1.6 cm"],
  "The scale factor is $15 \\div 6 = 2.5$, so the side is $4 \\times 2.5 = 10$ cm. Adding the difference, $4 + 9$, gives 13 cm, which is not how similar shapes scale.",
  d=3, skill="Similarity")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
N("How many millilitres are in 2.4 litres?",
  ["2400", "2 400"],
  "There are 1000 mL in a litre, so $2.4 \\times 1000 = 2400$ mL.",
  d=1, skill="Converting units")
N("A square has a perimeter of 36 cm. What is its area, in square centimetres?",
  ["81"],
  "Each side is $36 \\div 4 = 9$ cm, and the area is $9 \\times 9 = 81$ cm².",
  d=1, skill="Perimeter and area")
S("Two angles make a straight line. One is $125^\\circ$. What is the other?",
  "$55^\\circ$", ["$65^\\circ$", "$235^\\circ$", "$45^\\circ$"],
  "Angles on a straight line add to $180^\\circ$: $180 - 125 = 55$.",
  d=1, skill="Angles on a line")
S("A train leaves at 10.45 am and arrives at 1.20 pm. How long is the trip?",
  "2 hours 35 minutes", ["2 hours 75 minutes", "3 hours 35 minutes", "2 hours 25 minutes"],
  "10.45 am to 12.45 pm is 2 hours, and 12.45 pm to 1.20 pm is 35 minutes.",
  d=1, skill="Time")

# ---------- Test 2, module 1 ----------
at(2, 1)
N("A triangle has a base of 14 cm and a perpendicular height of 9 cm. What is its area, in square centimetres?",
  ["63"],
  "Area $= \\frac{1}{2} \\times 14 \\times 9 = 63$ cm². Forgetting the half gives 126.",
  d=1, skill="Area of triangles")
N("A circle has a diameter of 10 cm. What is its circumference, in centimetres, to one decimal place?",
  ["31.4"],
  "$C = \\pi d = \\pi \\times 10 \\approx 31.4$ cm. Using the radius in $\\pi d$ gives 15.7.",
  d=2, skill="Circumference", tol=0.05)
S("A rectangular prism is 8 cm long, 5 cm wide and 3 cm high. What is its volume?",
  "120 cm³", ["16 cm³", "158 cm³", "40 cm³"],
  "$V = 8 \\times 5 \\times 3 = 120$ cm³. 16 is the sum of the three dimensions, and 40 is the area of the base only.",
  d=1, skill="Volume of prisms")
S("A runner covers 400 m in 64 seconds. What is her average speed?",
  "6.25 m/s", ["0.16 m/s", "6.4 m/s", "25.6 m/s"],
  "Speed $= \\frac{\\text{distance}}{\\text{time}} = \\frac{400}{64} = 6.25$ m/s. 0.16 is time divided by distance.",
  d=2, skill="Speed")

# ---------- Test 2, module 2 ----------
at(2, 2)
N("A ramp rises 1.2 m over a horizontal distance of 3.5 m. How long is the sloping surface of the ramp, in metres, to one decimal place?",
  ["3.7"],
  "By Pythagoras, $\\sqrt{1.2^2 + 3.5^2} = \\sqrt{1.44 + 12.25} = \\sqrt{13.69} = 3.7$ m.",
  d=3, skill="Pythagoras", tol=0.05)
S("In a right-angled triangle, the side opposite angle $\\theta$ is 7 cm and the hypotenuse is 25 cm. Which is the value of $\\sin\\theta$?",
  "$\\frac{7}{25}$", ["$\\frac{24}{25}$", "$\\frac{7}{24}$", "$\\frac{25}{7}$"],
  "$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{7}{25}$. $\\frac{24}{25}$ is $\\cos\\theta$ (the adjacent side is 24 by Pythagoras).",
  d=3, skill="Trigonometric ratios")
N("A cube has a volume of 343 cm³. What is its total surface area, in square centimetres?",
  ["294"],
  "The side is $\\sqrt[3]{343} = 7$ cm. Six faces of $7 \\times 7 = 49$ cm² give 294 cm².",
  d=3, skill="Surface area")
S("A photo 10 cm wide and 15 cm tall is enlarged so that it is 24 cm wide. How tall is the enlargement?",
  "36 cm", ["29 cm", "16 cm", "40 cm"],
  "The scale factor is $24 \\div 10 = 2.4$, so the height is $15 \\times 2.4 = 36$ cm. Adding 14 cm to the height, as was added to the width, gives 29 cm.",
  d=3, skill="Enlargement")

# ---------- Drill only ----------
at(0)
N("How many square centimetres are in 1 square metre?",
  ["10000", "10 000"],
  "1 m = 100 cm, so 1 m² $= 100 \\times 100 = 10\\,000$ cm².",
  d=2, skill="Converting area units")
S("What is the size of each interior angle of a regular hexagon?",
  "$120^\\circ$", ["$60^\\circ$", "$108^\\circ$", "$135^\\circ$"],
  "The interior angles of a hexagon add to $(6 - 2) \\times 180 = 720^\\circ$, and $720 \\div 6 = 120^\\circ$.",
  d=2, skill="Angles in polygons")
