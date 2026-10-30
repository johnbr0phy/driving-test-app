"""Using common measures, shape and space (DfE Functional Skills Maths subject
content, Level 2 items 14 to 22: conversions, compound measures, perimeter,
area, volume, scale, coordinates, 2-D views of 3-D shapes and angles)."""
import math
from common import mc, num, gbp, fmt, money_answers, unit_answers

D = "fsmMeasure"
ITEMS = []
add = ITEMS.append
PI = math.pi

# ---------------- Test 1, Section A (non-calculator) ----------------
add(mc(D, 1, "a", "Area", 1,
       "A rectangular bedroom floor is 4.5 m long and 3 m wide. What is its area?",
       "13.5 m²", ["15 m²", "7.5 m²", "27 m²"],
       "Area of a rectangle = length × width = 4.5 × 3 = 13.5 m². 15 m is the perimeter, a length round the edge, not an area.",
       basics="fsmArea"))
add(mc(D, 1, "a", "Coordinates", 2,
       "Three corners of a rectangle are at (−2, 3), (4, 3) and (4, −1). Where is the fourth corner?",
       "(−2, −1)", ["(−1, −2)", "(2, −1)", "(−2, 1)"],
       "The fourth corner is below (−2, 3) and level with (4, −1), so it has x = −2 and y = −1. (−1, −2) has the numbers the wrong way round: x always comes first."))

# ---------------- Test 2, Section A (non-calculator) ----------------
add(num(D, 2, "a", "Metric and imperial conversion", 1,
        "Use 1 mile ≈ 1.6 km. About how many kilometres is 25 miles?",
        unit_answers(40, ["km"]),
        "Miles to kilometres: multiply by 1.6. 25 × 1.6 = 40 km (25 × 1 = 25, plus 25 × 0.6 = 15)."))
add(num(D, 2, "a", "Angles", 1,
        "Two angles of a triangle are 48° and 67°. What is the third angle, in degrees?",
        unit_answers(65, ["°", "degrees"]),
        "The angles in a triangle add up to 180°. 48 + 67 = 115, and 180 − 115 = 65°."))

# ---------------- Test 1, Section B (calculator) ----------------
a = PI * 1.8 ** 2
add(num(D, 1, "b", "Area of a circle", 2,
        "A circular pond has a radius of 1.8 m. What is its area? Use the π button and give your answer in m² to 1 decimal place.",
        unit_answers(round(a, 1), ["m²", "m2"]),
        f"Area = π × r² = π × 1.8 × 1.8 = {a:.2f}, which is 10.2 m² to 1 decimal place. π × 1.8 × 2 = 11.3 is the circumference, not the area.",
        tolerance=0.05, basics="fsmArea"))
add(mc(D, 1, "b", "Perimeter", 2,
       "An L-shaped room is a 6 m by 5 m rectangle with a 2 m by 3 m rectangle cut out of one corner. Skirting board will go all the way round the edge. How much skirting board is needed? (Ignore the door.)",
       "22 m", ["24 m", "17 m", "16 m"],
       "Cutting a rectangle out of a corner leaves the perimeter the same as the full rectangle: the two new edges replace the two removed ones. 2 × (6 + 5) = 22 m. 24 m is the area in m².",
       basics="fsmArea"))
vol = PI * 30 ** 2 * 90
add(num(D, 1, "b", "Volume of a cylinder", 3,
        "A water butt is a cylinder with a diameter of 60 cm and a height of 90 cm. How many litres does it hold when full? Use 1 litre = 1,000 cm³ and give your answer to the nearest litre.",
        unit_answers(round(vol / 1000), ["litres", "l", "L"]),
        f"The radius is 30 cm. Volume = π × 30² × 90 = {vol:,.0f} cm³. Divide by 1,000: {vol / 1000:.1f}, so 254 litres. Using 60 as the radius makes it four times too big.",
        tolerance=0.5, basics="fsmVolume"))
add(num(D, 1, "b", "Scale drawings", 2,
        "A house plan is drawn to a scale of 1 : 50. A room is 9.2 cm long on the plan. How long is the real room, in metres?",
        unit_answers(4.6, ["m", "metres"]),
        "Real length = 9.2 × 50 = 460 cm. 100 cm = 1 m, so 460 cm = 4.6 m.", basics="fsmScale"))
add(mc(D, 1, "b", "Speed", 2,
       "A coach travels 186 miles in 3 hours 6 minutes. What is its average speed?",
       "60 mph", ["62 mph", f"{186 / 3.6:.1f} mph", "58 mph"],
       "6 minutes is 6/60 = 0.1 of an hour, so the time is 3.1 hours. Speed = distance ÷ time = 186 ÷ 3.1 = 60 mph. Typing 3 hours 6 minutes as 3.6 gives 51.7 mph.",
       basics="fsmSpeed"))
add(num(D, 1, "b", "Density", 2,
        "Oak has a density of about 0.75 g/cm³. What is the mass of an oak block measuring 20 cm by 15 cm by 4 cm, in grams?",
        unit_answers(20 * 15 * 4 * 0.75, ["g", "grams"]),
        "Volume = 20 × 15 × 4 = 1,200 cm³. Mass = density × volume = 0.75 × 1,200 = 900 g.", basics="fsmSpeed"))
add(num(D, 1, "b", "Rates of pay", 2,
        "Ravi is paid £12.75 an hour. He works from 7:45am to 4:15pm with a 30-minute unpaid lunch break, five days a week. How much does he earn in a week, in pounds?",
        money_answers(8 * 5 * 12.75),
        "7:45am to 4:15pm is 8 hours 30 minutes. Take off the 30-minute break: 8 paid hours a day, 40 hours a week. 40 × £12.75 = £510.", basics="fsmSpeed"))
add(mc(D, 1, "b", "Surface area", 2,
       "A closed cardboard box measures 40 cm by 30 cm by 20 cm. What area of card covers its outside?",
       "5,200 cm²", ["24,000 cm²", "2,600 cm²", "4,000 cm²"],
       "There are two of each face: 40 × 30 = 1,200, 40 × 20 = 800 and 30 × 20 = 600. 2 × (1,200 + 800 + 600) = 5,200 cm². 24,000 is the volume in cm³, and 2,600 counts each face once.",
       basics="fsmVolume"))
add(mc(D, 1, "b", "Metric and imperial conversion", 3,
       "An airline's baggage limit is 23 kg. Ian's suitcase weighs 48 lb. Use 1 kg ≈ 2.2 lb. Is his case over or under the limit, and by about how much?",
       "Under, by about 1.2 kg", ["Over, by about 1.2 kg", "Under, by about 2.6 kg", "Over, by about 25 kg"],
       "48 ÷ 2.2 = 21.8 kg, which is about 1.2 kg under 23 kg. 2.6 is the gap in pounds (23 × 2.2 = 50.6 lb, and 50.6 − 48 = 2.6), not kilograms."))
add(mc(D, 1, "b", "Plans and elevations", 2,
       "A 3-D shape has a plan view (from above) that is a circle and a front elevation that is a triangle. What shape is it?",
       "A cone", ["A cylinder", "A sphere", "A square-based pyramid"],
       "From above a cone looks like a circle; from the front it looks like a triangle. A cylinder's front view is a rectangle, and a pyramid's plan view is a square."))

# ---------------- Test 2, Section B (calculator) ----------------
add(num(D, 2, "b", "Area of a triangle", 1,
        "The triangular end wall of a house extension has a base of 7.2 m and a height of 3.5 m. What is its area in m²?",
        unit_answers(7.2 * 3.5 / 2, ["m²", "m2"]),
        "Area of a triangle = ½ × base × height = 0.5 × 7.2 × 3.5 = 12.6 m². Forgetting the half gives 25.2 m².", basics="fsmArea"))
lawn = 12 * 8 + PI * 4 ** 2 / 2
add(num(D, 2, "b", "Composite area", 3,
        "A lawn is a 12 m by 8 m rectangle with a semicircle added to one 8 m end. What is the area of the lawn, in m² to the nearest whole number?",
        unit_answers(round(lawn), ["m²", "m2"]),
        f"Rectangle: 12 × 8 = 96 m². The semicircle has diameter 8 m, so radius 4 m: ½ × π × 4² = {PI * 8:.2f} m². Total {lawn:.2f}, which is 121 m².",
        tolerance=0.5, basics="fsmArea"))
area = 6.5 * 4
rolls = math.ceil(area * 1.1)
add(num(D, 2, "b", "Area problem", 3,
        "Turf is sold in rolls that each cover 1 m² and cost £4.25. A garden needs a rectangle of turf 6.5 m by 4 m, and the gardener buys 10% extra to allow for cutting. Rolls are only sold whole. How much will the turf cost, in pounds?",
        money_answers(rolls * 4.25),
        f"Area = 6.5 × 4 = 26 m². Add 10%: 28.6 m². Whole rolls only, so buy 29. 29 × £4.25 = £123.25.",
        basics="fsmArea"))
assert rolls == 29
add(mc(D, 2, "b", "Volume", 2,
       "A skip is shaped like a cuboid 3.6 m long, 1.8 m wide and 1.2 m deep. What is its volume?",
       f"{fmt(3.6 * 1.8 * 1.2)} m³", ["6.6 m³", f"{fmt(3.6 * 1.8)} m³", "77.76 m³"],
       "Volume = length × width × depth = 3.6 × 1.8 × 1.2 = 7.776 m³. 6.6 adds the lengths instead of multiplying them.", basics="fsmVolume"))
add(num(D, 2, "b", "Speed", 2,
        "A train leaves at 09:47 and arrives at 12:17. The journey is 205 km. What is the average speed in km/h?",
        unit_answers(205 / 2.5, ["km/h", "kmh"]),
        "09:47 to 12:17 is 2 hours 30 minutes, which is 2.5 hours. 205 ÷ 2.5 = 82 km/h.", basics="fsmSpeed"))
add(mc(D, 2, "b", "Speed", 2,
       "Fiona drives 135 miles at an average speed of 60 mph. She leaves at 2:40pm. What time does she arrive?",
       "4:55pm", ["5:05pm", "4:45pm", "5:15pm"],
       "Time = 135 ÷ 60 = 2.25 hours, which is 2 hours 15 minutes (0.25 of an hour is 15 minutes). 2:40pm + 2 h 15 min = 4:55pm. 5:05pm reads 2.25 hours as 2 h 25 min.",
       basics="fsmSpeed"))
add(num(D, 2, "b", "Scale drawings", 2,
        "A walking map has a scale of 1 : 25,000. Two farms are 6.4 cm apart on the map. How far apart are they in real life, in kilometres?",
        unit_answers(1.6, ["km"]),
        "6.4 × 25,000 = 160,000 cm. 100 cm = 1 m, so that is 1,600 m, and 1,000 m = 1 km, so 1.6 km.", basics="fsmScale"))
add(mc(D, 2, "b", "Angles in shapes", 2,
       "Patio tiles are regular hexagons. What is the size of each interior angle of a regular hexagon?",
       "120°", ["60°", "108°", "135°"],
       "A hexagon splits into 4 triangles, so its angles add up to 4 × 180 = 720°. 720 ÷ 6 = 120°. 108° is a pentagon and 135° is an octagon."))
add(num(D, 2, "b", "Metric units", 2,
        "An electrician needs 3,750 cm of cable. The cable is sold in 25 m reels. How many reels does she need to buy?",
        unit_answers(2, ["reels"]),
        "3,750 cm = 37.5 m (divide by 100). One reel is 25 m, so she needs 2 reels; one reel would be 12.5 m short.", whole=True))
add(mc(D, 2, "b", "Plans and elevations", 3,
       "A garden shed's front elevation is a rectangle with a triangle on top, making a pentagon. Its side elevation and its plan view are both rectangles. Which 3-D shape is it?",
       "A pentagonal prism", ["A square-based pyramid", "A cuboid", "A triangular prism"],
       "The same pentagon runs all the way along the shed, which makes it a prism with a pentagon cross-section. A cuboid's front would be a plain rectangle, and a triangular prism's front would be just a triangle."))

# ---------------- Drill only (calculator) ----------------
carpet = 5.2 * 3.5 * 18.99
add(num(D, 0, "b", "Area", 2,
        "A floor measures 5.2 m by 3.5 m. Carpet costs £18.99 per m². How much does it cost to carpet the floor, in pounds to the nearest penny?",
        money_answers(round(carpet, 2)),
        f"Area = 5.2 × 3.5 = 18.2 m². 18.2 × £18.99 = {carpet:.3f}, which is £{carpet:.2f}.", tolerance=0.011, basics="fsmArea"))
wall = (4.8 * 2.4 - 1.2 * 1.0) * 2 / 12
add(num(D, 0, "b", "Area problem", 3,
        "A wall is 4.8 m wide and 2.4 m high, with a window 1.2 m by 1 m. Paint covers 12 m² per litre and the wall needs two coats. Paint is sold in 1-litre tins. How many tins are needed?",
        unit_answers(math.ceil(wall), ["tins"]),
        f"Wall: 4.8 × 2.4 = 11.52 m². Take off the window: 10.32 m². Two coats: 20.64 m². 20.64 ÷ 12 = {wall:.2f} litres, so 2 tins.",
        whole=True, basics="fsmArea"))
circ = PI * 1.2
add(num(D, 0, "b", "Circumference", 2,
        "A round table has a diameter of 1.2 m. Ribbon is to go once round its edge. How much ribbon is needed, in metres to 2 decimal places?",
        unit_answers(round(circ, 2), ["m", "metres"]),
        f"Circumference = π × diameter = π × 1.2 = {circ:.4f}, so 3.77 m. π × 1.2² would be the area of a circle of radius 1.2 m.",
        tolerance=0.005, basics="fsmArea"))
one, two = PI * 15 ** 2, 2 * PI * 10 ** 2
add(mc(D, 0, "b", "Area of a circle", 3,
       "A pizza shop sells one 30 cm pizza for the same price as two 20 cm pizzas (the sizes are diameters). Which gives more pizza, and by about how much?",
       f"One 30 cm pizza, by about {round(one - two)} cm²", [f"Two 20 cm pizzas, by about {round(one - two)} cm²", "Two 20 cm pizzas, by about 10 cm²", "They are the same size"],
       f"30 cm pizza: π × 15² = {one:.0f} cm². Two 20 cm pizzas: 2 × π × 10² = {two:.0f} cm². The single pizza is about {round(one - two)} cm² bigger. Adding diameters (40 cm against 30 cm) misleads.",
       basics="fsmArea"))
add(mc(D, 0, "b", "Area of a triangle", 1,
       "A triangular sail has a base of 2.4 m and a height of 5 m. What is its area?",
       "6 m²", ["12 m²", "7.4 m²", "3 m²"],
       "½ × 2.4 × 5 = 6 m². 12 m² forgets to halve, and 7.4 adds the lengths.", basics="fsmArea"))
tin = PI * 3.7 ** 2 * 11
add(num(D, 0, "b", "Volume of a cylinder", 2,
        "A tin of beans is a cylinder with radius 3.7 cm and height 11 cm. What is its volume, in cm³ to the nearest whole number?",
        unit_answers(round(tin), ["cm³", "cm3"]),
        f"Volume = π × r² × h = π × 3.7² × 11 = {tin:.1f}, so 473 cm³.", tolerance=0.5, basics="fsmVolume"))
add(num(D, 0, "b", "Volume and capacity", 2,
        "A fish tank is 80 cm long, 35 cm wide and 40 cm high. How many litres does it hold when full? (1 litre = 1,000 cm³)",
        unit_answers(80 * 35 * 40 / 1000, ["litres", "l", "L"]),
        "80 × 35 × 40 = 112,000 cm³. 112,000 ÷ 1,000 = 112 litres.", basics="fsmVolume"))
add(mc(D, 0, "b", "Volume and capacity", 3,
       "A garden pond holds 2.4 m³ of water. A hose fills it at 15 litres a minute. How long will it take to fill? (1 m³ = 1,000 litres)",
       "2 hours 40 minutes", ["2 hours 24 minutes", "16 hours", "1 hour 36 minutes"],
       "2.4 m³ = 2,400 litres. 2,400 ÷ 15 = 160 minutes = 2 hours 40 minutes. 2 hours 24 minutes reads 160 minutes as 2.4 hours.", basics="fsmVolume"))
sa = 2 * PI * 5 ** 2 + 2 * PI * 5 * 12
add(num(D, 0, "b", "Surface area", 3,
        "A closed cylinder has a radius of 5 cm and a height of 12 cm. Its surface area is 2πr² + 2πrh. What is its surface area, in cm² to the nearest whole number?",
        unit_answers(round(sa), ["cm²", "cm2"]),
        f"2 × π × 5² = {2 * PI * 25:.2f} for the two ends, and 2 × π × 5 × 12 = {2 * PI * 60:.2f} for the curved side. Total {sa:.2f}, so 534 cm².",
        tolerance=0.5, basics="fsmVolume"))
add(num(D, 0, "b", "Scale drawings", 2,
        "A garden is 14 m long. It is drawn on a plan with a scale of 1 : 200. How long is it on the plan, in centimetres?",
        unit_answers(7, ["cm"]),
        "14 m = 1,400 cm. Divide by 200: 1,400 ÷ 200 = 7 cm. Real to drawing means dividing by the scale.", basics="fsmScale"))
add(num(D, 0, "b", "Scale drawings", 2,
        "A model car is made to a scale of 1 : 43. The real car is 4.3 m long. How long is the model, in centimetres?",
        unit_answers(10, ["cm"]),
        "4.3 m = 430 cm. 430 ÷ 43 = 10 cm.", basics="fsmScale"))
add(num(D, 0, "b", "Speed", 1,
        "A cyclist rides 15 km in 40 minutes. What is her average speed in km/h?",
        unit_answers(22.5, ["km/h", "kmh"]),
        "40 minutes is 2/3 of an hour. 15 km in 40 minutes is 7.5 km every 20 minutes, and there are three lots of 20 minutes in an hour: 3 × 7.5 = 22.5 km/h.", basics="fsmSpeed"))
add(num(D, 0, "b", "Speed", 2,
        "A lorry travels at an average speed of 52 mph for 2 hours 15 minutes. How far does it travel, in miles?",
        unit_answers(52 * 2.25, ["miles"]),
        "2 hours 15 minutes = 2.25 hours. Distance = speed × time = 52 × 2.25 = 117 miles.", basics="fsmSpeed"))
add(num(D, 0, "b", "Density", 2,
        "Gold has a density of 19.3 g/cm³. A gold ring has a volume of 2.5 cm³. What is its mass in grams?",
        unit_answers(19.3 * 2.5, ["g", "grams"]),
        "Mass = density × volume = 19.3 × 2.5 = 48.25 g.", basics="fsmSpeed"))
add(num(D, 0, "b", "Rates of pay", 2,
        "A job pays £27,300 a year for a 37.5-hour week, 52 weeks a year. What is the hourly rate, in pounds?",
        money_answers(27300 / (37.5 * 52)),
        "Hours a year: 37.5 × 52 = 1,950. £27,300 ÷ 1,950 = £14.00 an hour.", basics="fsmSpeed"))
add(mc(D, 0, "b", "Rates of pay", 2,
       "Job A pays £13.20 an hour for 35 hours a week. Job B pays £475 a week. Which pays more each week, and by how much?",
       "Job B, by £13", ["Job A, by £13", "Job B, by £475", "Job A, by £1.80"],
       "Job A: 13.20 × 35 = £462 a week. Job B pays £475, which is £13 more.", basics="fsmSpeed"))
add(num(D, 0, "b", "Metric and imperial conversion", 2,
        "A TV screen measures 55 inches. Use 1 inch = 2.54 cm. How many centimetres is that, to the nearest centimetre?",
        unit_answers(round(55 * 2.54), ["cm"]),
        "55 × 2.54 = 139.7 cm, which is 140 cm to the nearest centimetre.", tolerance=0.5))
add(num(D, 0, "b", "Metric and imperial conversion", 3,
        "A car does 52 miles per gallon. Use 1 gallon ≈ 4.55 litres. How many litres of fuel does it use on a 312-mile journey?",
        unit_answers(312 / 52 * 4.55, ["litres", "l", "L"]),
        "312 ÷ 52 = 6 gallons. 6 × 4.55 = 27.3 litres."))
add(mc(D, 0, "b", "Time", 2,
       "A night shift starts at 22:45 and ends at 07:15 the next morning. How long is the shift?",
       "8 hours 30 minutes", ["9 hours 30 minutes", "15 hours 30 minutes", "7 hours 30 minutes"],
       "22:45 to midnight is 1 hour 15 minutes. Midnight to 07:15 is 7 hours 15 minutes. Total: 8 hours 30 minutes. 15 hours 30 minutes is 22:45 − 07:15, which runs the clock backwards."))
add(mc(D, 0, "b", "Metric units", 2,
       "How many square millimetres are there in 1 square centimetre?",
       "100", ["10", "1,000", "10,000"],
       "1 cm = 10 mm, so 1 cm² is 10 mm by 10 mm = 100 mm². 10 is right for lengths but not for areas.", basics="fsmArea"))
add(mc(D, 0, "b", "Coordinates", 1,
       "Which describes how to get from the origin (0, 0) to the point (3, −2)?",
       "3 right and 2 down", ["3 down and 2 right", "3 left and 2 up", "3 right and 2 up"],
       "The first number is across (x): 3 right. The second is up or down (y): −2 means 2 down."))
add(mc(D, 0, "b", "Coordinates", 2,
       "A square ABCD has A at (−1, 4), B at (3, 4) and C at (3, 0). Where is D?",
       "(−1, 0)", ["(0, −1)", "(−1, −4)", "(3, −1)"],
       "D is level with C (y = 0) and directly below A (x = −1), so D is (−1, 0). Each side is 4 units long, which checks it is a square."))
add(num(D, 0, "b", "Angles", 1,
        "A ladder leans against a wall. On one side it makes an angle of 72° with the flat ground. What is the angle on the other side of the ladder, along the same straight ground?",
        unit_answers(108, ["°", "degrees"]),
        "Angles on a straight line add up to 180°. 180 − 72 = 108°."))
add(num(D, 0, "b", "Angles", 1,
        "Three of the angles in a four-sided shape are 85°, 110° and 75°. What is the fourth angle, in degrees?",
        unit_answers(90, ["°", "degrees"]),
        "The angles in a quadrilateral add up to 360°. 85 + 110 + 75 = 270, and 360 − 270 = 90°."))
add(mc(D, 0, "b", "3-D shapes", 2,
       "How many faces, edges and vertices (corners) does a triangular prism have?",
       "5 faces, 9 edges, 6 vertices", ["6 faces, 12 edges, 8 vertices", "5 faces, 8 edges, 5 vertices", "4 faces, 6 edges, 4 vertices"],
       "Two triangle ends and three rectangle sides make 5 faces. Each triangle has 3 edges, plus 3 edges joining them: 9. Each triangle has 3 corners: 6. 6, 12, 8 is a cuboid."))
add(mc(D, 0, "b", "Plans and elevations", 1,
       "A cylinder stands upright on a table. What does its plan view (looking down from above) look like?",
       "A circle", ["A rectangle", "A triangle", "A square"],
       "From directly above you see only the round top, a circle. A rectangle is what you see from the front or side."))
add(mc(D, 0, "b", "Plans and elevations", 2,
       "A box is 4 cm long, 2 cm wide and 3 cm tall. It stands on its 4 cm by 2 cm face. What are the measurements of its side elevation, looking at the 2 cm end?",
       "2 cm by 3 cm", ["4 cm by 3 cm", "4 cm by 2 cm", "3 cm by 3 cm"],
       "From the end you see the width (2 cm) and the height (3 cm). 4 cm by 3 cm is the front elevation and 4 cm by 2 cm is the plan."))
add(num(D, 0, "b", "Angles in shapes", 2,
        "A roof truss is an isosceles triangle with an angle of 110° at the top. What is each of the two equal angles at the bottom, in degrees?",
        unit_answers(35, ["°", "degrees"]),
        "180 − 110 = 70, shared equally between the two base angles: 70 ÷ 2 = 35°."))
h = 500000 / (PI * 40 ** 2)
add(num(D, 0, "b", "Volume of a cylinder", 3,
        "A cylindrical tank holds 500 litres when full. Its radius is 40 cm. How tall is it, in centimetres to the nearest whole number? (1 litre = 1,000 cm³)",
        unit_answers(round(h), ["cm"]),
        f"500 litres = 500,000 cm³. Volume = π × r² × h, so h = 500,000 ÷ (π × 40²) = 500,000 ÷ {PI * 1600:.1f} = {h:.2f}, so 99 cm.",
        tolerance=0.5, basics="fsmVolume"))
heat = 2.5 * (3 + 20 / 60) * 0.26
add(num(D, 0, "b", "Compound measures", 3,
        "A 2.5 kW heater is left on for 3 hours 20 minutes. Electricity costs 26p per kWh (kW × hours). How much does it cost to run, in pounds to the nearest penny?",
        money_answers(round(heat, 2)),
        f"3 hours 20 minutes is 3⅓ hours. 2.5 × 3⅓ = {2.5 * 10 / 3:.3f} kWh. × £0.26 = {heat:.4f}, so £2.17.",
        tolerance=0.011, basics="fsmSpeed"))
