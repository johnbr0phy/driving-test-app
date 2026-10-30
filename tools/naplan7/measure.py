# Measurement and Space (nap7Measure), calculator allowed. No figures: shapes
# and diagrams are described in words.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("A rectangle is 12 cm long and 7 cm wide. What is its area, in square centimetres? Type the number only.",
  ["84"],
  "Area of a rectangle is length times width: $12 \\times 7 = 84$ cm².",
  d=1, skill="Area")
S("Two angles sit side by side on a straight line. One angle is 116°. What is the other angle?",
  "64°", ["244°", "74°", "116°"],
  "Angles on a straight line add to 180°: $180 - 116 = 64$°. Subtracting from 360° gives 244°.",
  d=1, skill="Angles")
N("How many millilitres are in 1.75 litres? Type the number only.",
  ["1750"],
  "There are 1000 mL in 1 L, so $1.75 \\times 1000 = 1750$ mL.",
  d=1, skill="Converting units")
S("A movie starts at 7:45 pm and runs for 1 hour 50 minutes. What time does it finish?",
  "9:35 pm", ["8:35 pm", "9:25 pm", "9:15 pm"],
  "7:45 pm plus 1 hour is 8:45 pm. Then 15 minutes takes it to 9:00 pm and 35 more minutes to 9:35 pm.",
  d=2, skill="Time")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
N("A triangle has a base of 16 cm and a perpendicular height of 7.5 cm. What is its area, in square centimetres? Type the number only.",
  ["60"],
  "Area of a triangle is half the base times the height: $\\frac{1}{2} \\times 16 \\times 7.5 = 60$ cm². Forgetting the half gives 120.",
  d=2, skill="Area")
N("A rectangular prism measures 8 cm by 5 cm by 2.5 cm. What is its volume, in cubic centimetres? Type the number only.",
  ["100"],
  "Volume is length times width times height: $8 \\times 5 \\times 2.5 = 100$ cm³.",
  d=2, skill="Volume")
S("Two angles in a triangle are 52° and 71°. What is the third angle?",
  "57°", ["123°", "237°", "67°"],
  "The angles in a triangle add to 180°. $52 + 71 = 123$, and $180 - 123 = 57$°.",
  d=2, skill="Angles in a triangle")
N("A map has a scale of 1 : 50 000. Two lookouts are 4.6 cm apart on the map. How far apart are they in real life, in kilometres? Type the number only.",
  ["2.3"],
  "$4.6 \\times 50\\,000 = 230\\,000$ cm. There are 100 000 cm in 1 km, so that is 2.3 km.",
  d=3, skill="Scale")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
N("A square has sides of 9 cm. What is its perimeter, in centimetres? Type the number only.",
  ["36"],
  "Perimeter is the distance around the outside: $4 \\times 9 = 36$ cm. $9 \\times 9 = 81$ would be the area.",
  d=1, skill="Perimeter")
S("Which unit is best for measuring the mass of an apple?",
  "grams", ["kilometres", "litres", "tonnes"],
  "Mass is measured in grams, kilograms or tonnes. An apple is light, so grams fit best. Kilometres measure length and litres measure volume.",
  d=1, skill="Units")
N("How many centimetres are in 3.5 metres? Type the number only.",
  ["350"],
  "There are 100 cm in 1 m, so $3.5 \\times 100 = 350$ cm.",
  d=1, skill="Converting units")
S("Which of these angles is obtuse?",
  "130°", ["45°", "90°", "190°"],
  "An obtuse angle is between 90° and 180°. 45° is acute, 90° is a right angle and 190° is reflex.",
  d=1, skill="Angles")

# ---------- Test 2, module 1 ----------
at(2, 1)
N("A parallelogram has a base of 11 cm and a perpendicular height of 6 cm. What is its area, in square centimetres? Type the number only.",
  ["66"],
  "Area of a parallelogram is base times perpendicular height: $11 \\times 6 = 66$ cm².",
  d=2, skill="Area")
S("On a Cartesian plane, in which quadrant is the point $(3, -2)$?",
  "the fourth quadrant", ["the first quadrant", "the second quadrant", "the third quadrant"],
  "A positive x-value is to the right of the origin and a negative y-value is below it. Right and below is the fourth quadrant.",
  d=2, skill="Cartesian plane")
N("A bag of rice has a mass of 1.25 kg. What is its mass in grams? Type the number only.",
  ["1250"],
  "There are 1000 g in 1 kg, so $1.25 \\times 1000 = 1250$ g.",
  d=1, skill="Converting units")
S("A train leaves at 9:50 am and arrives at 1:25 pm on the same day. How long is the trip?",
  "3 hours 35 minutes", ["4 hours 35 minutes", "3 hours 25 minutes", "4 hours 25 minutes"],
  "From 9:50 am to 12:50 pm is 3 hours, and from 12:50 pm to 1:25 pm is 35 minutes.",
  d=2, skill="Time")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
N("A rectangle has an area of 96 cm² and a length of 12 cm. What is its width, in centimetres? Type the number only.",
  ["8"],
  "Area is length times width, so width is $96 \\div 12 = 8$ cm.",
  d=2, skill="Area")
S("Two parallel lines are crossed by a third line. One of the angles formed is 72°. What size is the angle corresponding to it?",
  "72°", ["108°", "18°", "288°"],
  "Corresponding angles on parallel lines are equal, so it is also 72°. 108° is the angle on a straight line with it.",
  d=2, skill="Parallel lines")
N("A box shaped like a rectangular prism has a volume of 120 cm³. Its base is 6 cm by 5 cm. What is its height, in centimetres? Type the number only.",
  ["4"],
  "The base area is $6 \\times 5 = 30$ cm², and height is volume divided by base area: $120 \\div 30 = 4$ cm.",
  d=3, skill="Volume")
N("A rectangular garden is 8 m by 5 m. A paved area 2 m by 3 m inside the garden has no lawn. What is the area of the lawn, in square metres? Type the number only.",
  ["34"],
  "The whole garden is $8 \\times 5 = 40$ m², and the paving is $2 \\times 3 = 6$ m². The lawn is $40 - 6 = 34$ m².",
  d=2, skill="Composite area")

# ---------- Drill only ----------
at(0)
N("A triangle has a base of 16 m and a perpendicular height of 5 m. What is its area, in square metres? Type the number only.",
  ["40"],
  "$\\frac{1}{2} \\times 16 \\times 5 = 40$ m².",
  d=1, skill="Area")
S("An isosceles triangle has two equal angles of 70° each. What is the third angle?",
  "40°", ["70°", "110°", "20°"],
  "The angles add to 180°: $70 + 70 = 140$, and $180 - 140 = 40$°.",
  d=2, skill="Angles in a triangle")
N("How many minutes are in 2.5 hours? Type the number only.",
  ["150"],
  "$2.5 \\times 60 = 150$ minutes. Reading 2.5 hours as 2 hours 5 minutes is a common mistake.",
  d=1, skill="Time")
N("A cube has edges of 4 cm. What is its volume, in cubic centimetres? Type the number only.",
  ["64"],
  "$4 \\times 4 \\times 4 = 64$ cm³.",
  d=1, skill="Volume")
