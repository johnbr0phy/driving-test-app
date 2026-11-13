# MAP Growth Math 2-5: Measurement and Data (original items, CCSS grades 3-5).
D = "\\$"

FRUIT = """| Fruit | Students |
|---|---|
| Apples | 8 |
| Bananas | 5 |
| Grapes | 11 |
| Oranges | 6 |"""

RIBBONS = """Ana measured her ribbons and made a line plot. Each X is one ribbon.

| Length (inch) | Ribbons |
|---|---|
| 1/4 | X X X |
| 1/2 | X X |
| 3/4 | X X X X |"""

BOOKS = """A picture graph shows books read by a class. Each picture stands for 4 books.

| Day | Pictures |
|---|---|
| Monday | 3 |
| Tuesday | 5 |
| Wednesday | 2 |"""

PUMPKINS = """A line plot shows the weights of pumpkins at a farm stand. Each X is one pumpkin.

| Weight (pounds) | Pumpkins |
|---|---|
| 5 1/2 | X |
| 6 | X X |
| 6 1/2 | X X X |
| 7 | X |"""

ITEMS = [
  # ---------- Practice Test 1 ----------
  dict(test=1, skill="Elapsed time", diff=1, basics=None,
       stem="Ava started reading at 3:15 p.m. She read for 40 minutes. What time did she stop?",
       key="3:55 p.m.", wrong=["3:45 p.m.", "4:05 p.m.", "4:55 p.m."],
       expl="Count on 40 minutes from 3:15: 3:15 plus 40 minutes is 3:55 p.m. It is not 4:55, because less than one hour went by."),
  dict(test=1, skill="Customary length units", diff=2, basics=None,
       stem="Which two measurements are equal to 1 yard? Choose two.",
       key=["3 feet", "36 inches"], wrong=["12 inches", "10 feet", "100 inches"],
       expl="1 yard is 3 feet, and each foot is 12 inches, so 1 yard is 36 inches. 12 inches is only 1 foot."),
  dict(test=1, skill="Area of a rectangle", diff=1, basics="areaPerimeter",
       stem="A garden is shaped like a rectangle. It is 7 meters long and 6 meters wide. What is its area?",
       key="42 square meters", wrong=["26 square meters", "13 square meters", "48 square meters"],
       expl="Area is length times width: 7 x 6 = 42 square meters. 26 is the perimeter, the distance around."),
  dict(test=1, skill="Counting coins", diff=1, basics=None,
       stem="Liam has 3 quarters, 2 dimes and 4 pennies. How much money does he have?",
       key="99 cents", wrong=["89 cents", "84 cents", "9 cents"],
       expl="3 quarters are 75 cents, 2 dimes are 20 cents and 4 pennies are 4 cents. 75 + 20 + 4 = 99 cents. 9 is only the number of coins."),
  dict(test=1, skill="Perimeter of a rectangle", diff=1, basics="areaPerimeter",
       stem="A rug is a rectangle 9 feet long and 5 feet wide. What is the perimeter of the rug?",
       key="28 feet", wrong=["14 feet", "45 feet", "19 feet"],
       expl="Add all four sides: 9 + 5 + 9 + 5 = 28 feet. 14 feet counts only two sides, and 45 is the area."),
  dict(test=1, skill="Reading a bar graph", diff=1, basics="readingTable",
       passage="A bar graph shows the favorite fruit of students in a class.\n\n" + FRUIT,
       stem="How many more students chose grapes than bananas? Type the number.", num=["6"],
       expl="Grapes have 11 students and bananas have 5. 11 - 5 = 6 more students."),
  dict(test=1, skill="Liters and milliliters", diff=2, basics=None,
       stem="A pitcher holds 2 liters of juice. How many milliliters is that?",
       key="2,000 mL", wrong=["200 mL", "20 mL", "20,000 mL"],
       expl="1 liter is 1,000 milliliters, so 2 liters is 2 x 1,000 = 2,000 mL."),
  dict(test=1, skill="Adding angles", diff=2, basics=None,
       stem="Angle ABC is made of two smaller angles that do not overlap. One measures 35 degrees and the other measures 48 degrees. What is the measure of angle ABC?",
       key="83 degrees", wrong=["13 degrees", "73 degrees", "93 degrees"],
       expl="When angles do not overlap, add them: 35 + 48 = 83 degrees. 13 degrees comes from subtracting instead of adding."),
  dict(test=1, skill="Volume of a prism", diff=3, basics=None,
       stem="A box is 4 cm long, 3 cm wide and 5 cm tall. What is the volume of the box?",
       key="60 cubic centimeters", wrong=["12 cubic centimeters", "20 cubic centimeters", "94 cubic centimeters"],
       expl="Volume is length x width x height: 4 x 3 x 5 = 60 cubic centimeters. 12 uses only the length and width."),
  dict(test=1, skill="Elapsed time", diff=2, basics=None,
       stem="The school play began at 6:45 p.m. and ended at 8:20 p.m. How long was the play?",
       key="1 hour 35 minutes", wrong=["1 hour 25 minutes", "2 hours 35 minutes", "1 hour 45 minutes"],
       expl="From 6:45 to 7:45 is 1 hour. From 7:45 to 8:20 is 35 more minutes. So the play lasted 1 hour 35 minutes."),
  dict(test=1, skill="Line plots with fractions", diff=3, basics="readingTable",
       passage=RIBBONS,
       stem="What is the total length of all the ribbons that are 3/4 inch long?",
       key="3 inches", wrong=["4 3/4 inches", "1 3/4 inches", "12 inches"],
       expl="There are 4 ribbons that are 3/4 inch long. 4 x 3/4 = 12/4, which is 3 inches. 12 inches forgets that each piece is a fourth."),

  # ---------- Practice Test 2 ----------
  dict(test=2, skill="Telling time", diff=1, basics=None,
       stem="On a clock, the hour hand is just past the 9 and the minute hand points to the 4. What time is it?",
       key="9:20", wrong=["9:04", "4:45", "8:20"],
       expl="The minute hand on the 4 means 4 x 5 = 20 minutes. The hour hand just past the 9 means the hour is 9. So it is 9:20."),
  dict(test=2, skill="Estimating mass", diff=1, basics=None,
       stem="Which is the best estimate for the mass of a pencil?",
       key="5 grams", wrong=["5 kilograms", "50 kilograms", "500 grams"],
       expl="A pencil is very light, about as heavy as a few paper clips, so 5 grams fits. 5 kilograms is as heavy as a big bag of flour."),
  dict(test=2, skill="Area by counting squares", diff=1, basics="areaPerimeter",
       stem="A rectangle is covered by unit squares with no gaps or overlaps. It has 3 rows with 8 squares in each row. What is its area in square units? Type the number.",
       num=["24"],
       expl="Count the squares by rows: 3 rows of 8 is 3 x 8 = 24 square units."),
  dict(test=2, skill="Customary capacity units", diff=2, basics=None,
       stem="How many cups are in 3 quarts?",
       key="12 cups", wrong=["6 cups", "8 cups", "24 cups"],
       expl="1 quart is 4 cups, so 3 quarts is 3 x 4 = 12 cups. 6 cups would be using 2 cups in a quart, which is a pint."),
  dict(test=2, skill="Finding a missing side", diff=2, basics="areaPerimeter",
       stem="A rectangle has a perimeter of 30 inches. Its length is 9 inches. What is its width?",
       key="6 inches", wrong=["12 inches", "21 inches", "3 inches"],
       expl="Length plus width is half the perimeter: 30 / 2 = 15. Then 15 - 9 = 6 inches. 12 inches is both widths together, so one width is half of 12."),
  dict(test=2, skill="Making change", diff=2, basics="wordProblems",
       stem=f"Maya buys a book for {D}6.75 and pays with a {D}10 bill. How much change should she get?",
       key=f"{D}3.25", wrong=[f"{D}4.35", f"{D}3.35", f"{D}4.25"],
       expl=f"Subtract: {D}10.00 - {D}6.75 = {D}3.25. Count up to check: {D}6.75 plus 25 cents is {D}7, and 3 more dollars makes {D}10."),
  dict(test=2, skill="Area of composite shapes", diff=2, basics="areaPerimeter",
       stem="An L-shaped patio is made of two rectangles that do not overlap. One is 6 feet by 4 feet. The other is 3 feet by 2 feet. What is the total area of the patio?",
       key="30 square feet", wrong=["15 square feet", "24 square feet", "36 square feet"],
       expl="Find each area and add: 6 x 4 = 24 and 3 x 2 = 6, so 24 + 6 = 30 square feet. 24 is only the bigger rectangle."),
  dict(test=2, skill="Pounds and ounces", diff=2, basics=None,
       stem="A bag of apples weighs 5 pounds. How many ounces does it weigh?",
       key="80 ounces", wrong=["60 ounces", "50 ounces", "21 ounces"],
       expl="1 pound is 16 ounces, so 5 pounds is 5 x 16 = 80 ounces. 60 ounces would use 12 in a pound, which is the number of inches in a foot."),
  dict(test=2, skill="Adding volumes", diff=3, basics=None,
       stem="A toy shelf is built from two rectangular boxes that do not overlap. One box is 5 in by 2 in by 3 in. The other is 4 in by 2 in by 3 in. What is the total volume?",
       key="54 cubic inches", wrong=["19 cubic inches", "24 cubic inches", "30 cubic inches"],
       expl="Find each volume and add: 5 x 2 x 3 = 30 and 4 x 2 x 3 = 24, so 30 + 24 = 54 cubic inches. 30 is only one box."),
  dict(test=2, skill="Finding a missing angle", diff=3, basics=None,
       stem="A straight angle measures 180 degrees. It is split into two angles. One of them measures 125 degrees. How many degrees does the other angle measure? Type the number.",
       num=["55"],
       expl="The two angles add up to 180 degrees, so subtract: 180 - 125 = 55 degrees."),
  dict(test=2, skill="Reading a picture graph", diff=2, basics="readingTable",
       passage=BOOKS,
       stem="How many books did the class read on Tuesday and Wednesday together?",
       key="28 books", wrong=["7 books", "24 books", "32 books"],
       expl="Tuesday and Wednesday have 5 + 2 = 7 pictures. Each picture is 4 books, so 7 x 4 = 28 books. 7 is only the number of pictures."),

  # ---------- Drill only ----------
  dict(test=0, skill="Elapsed time", diff=2, basics=None,
       stem="Noah's soccer practice ended at 5:10 p.m. It lasted 1 hour 25 minutes. What time did practice start?",
       key="3:45 p.m.", wrong=["4:35 p.m.", "3:55 p.m.", "4:45 p.m."],
       expl="Go back 1 hour from 5:10 to get 4:10. Then go back 25 more minutes to get 3:45 p.m."),
  dict(test=0, skill="Metric length units", diff=2, basics=None,
       stem="A hiking trail is 3 kilometers long. How many meters long is it?",
       key="3,000 meters", wrong=["300 meters", "30 meters", "30,000 meters"],
       expl="1 kilometer is 1,000 meters, so 3 kilometers is 3 x 1,000 = 3,000 meters."),
  dict(test=0, skill="Area of a rectangle", diff=2, basics="areaPerimeter",
       stem="Which two rectangles have an area of 24 square units? Choose two.",
       key=["4 units by 6 units", "3 units by 8 units"],
       wrong=["5 units by 5 units", "2 units by 10 units", "12 units by 12 units"],
       expl="Multiply the sides: 4 x 6 = 24 and 3 x 8 = 24. A 12 by 12 rectangle adds to 24, but its area is 144."),
  dict(test=0, skill="Customary capacity units", diff=3, basics=None,
       stem="Which two amounts are equal to 2 gallons? Choose two.",
       key=["8 quarts", "32 cups"], wrong=["16 quarts", "4 pints", "8 cups"],
       expl="1 gallon is 4 quarts, and each quart is 4 cups. So 2 gallons is 8 quarts, and 8 quarts is 8 x 4 = 32 cups."),
  dict(test=0, skill="Volume with unit cubes", diff=2, basics=None,
       stem="A box is filled with unit cubes in 2 layers. Each layer has 3 rows of 5 cubes. How many cubes are in the box? Type the number.",
       num=["30"],
       expl="One layer has 3 x 5 = 15 cubes. Two layers have 2 x 15 = 30 cubes."),
  dict(test=0, skill="Liquid volume problems", diff=3, basics="wordProblems",
       stem="A jug holds 4 liters of water. Ella pours out 1 liter and 500 milliliters. How much water is left in the jug?",
       key="2,500 mL", wrong=["1,500 mL", "3,500 mL", "3,000 mL"],
       expl="4 liters is 4,000 mL, and she pours out 1,500 mL. 4,000 - 1,500 = 2,500 mL. 1,500 mL is the amount poured out, not what is left."),
  dict(test=0, skill="Measuring with a protractor", diff=2, basics=None,
       stem="A protractor is lined up on an angle. One ray passes through 0 and the other ray passes through 70 on the same scale. What is the measure of the angle?",
       key="70 degrees", wrong=["110 degrees", "7 degrees", "170 degrees"],
       expl="Read the scale that starts at 0, so the angle is 70 degrees. 110 comes from reading the other scale."),
  dict(test=0, skill="Line plots with fractions", diff=3, basics="readingTable",
       passage=PUMPKINS,
       stem="What is the difference in weight between the heaviest pumpkin and the lightest pumpkin?",
       key="1 1/2 pounds", wrong=["2 pounds", "2 1/2 pounds", "12 1/2 pounds"],
       expl="The heaviest is 7 pounds and the lightest is 5 1/2 pounds. 7 - 5 1/2 = 1 1/2 pounds. 12 1/2 adds them instead of subtracting."),
  dict(test=0, skill="Money problems", diff=2, basics="wordProblems",
       stem=f"Pens cost {D}1.25 each. How much do 4 pens cost?",
       key=f"{D}5.00", wrong=[f"{D}4.25", f"{D}5.25", f"{D}4.00"],
       expl=f"4 x {D}1.25: 4 dollars plus 4 quarters, and 4 quarters make 1 dollar. So the total is {D}5.00."),
]
