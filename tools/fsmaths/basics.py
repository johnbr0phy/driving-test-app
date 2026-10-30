"""Basics skills for Functional Skills Maths Level 2 (data/v2/basics/fsmaths.json).

Sixteen click-through walkthroughs, four per drill, in British English with
pounds and metric units. Ids start with "fsm" so they never collide with the
shared SAT/GED library (which is written for the US: dollars, "percent").
Every walkthrough supplies one step at a time, per the Basics authoring rule:
say the mapping, show the search, check the answer.
"""

def eg(text, note):
    return {"kind": "eg", "text": text, "note": note}


def ask(q, options, answer, line=None, hint=None, then=None):
    s = {"ask": q, "options": options, "answer": answer}
    if line: s["line"] = line
    if hint: s["hint"] = hint
    if then: s["then"] = then
    return s


def say(text):
    return {"say": text}


def q(stem, options, answer, why, table=None):
    out = {"stem": stem, "options": options, "answer": answer, "why": why}
    if table: out["table"] = table
    return out


SKILLS = [
    # ---------------- Number and calculation ----------------
    {
        "id": "fsmOrderOps", "name": "BIDMAS", "sub": "Brackets, indices, then × ÷, then + −",
        "rule": "Work out a calculation in this order: Brackets, Indices (powers like ²), Division and Multiplication from left to right, then Addition and Subtraction from left to right.",
        "trick": "Say BIDMAS in your head and tick off each letter. Calculators follow it too, so type brackets in when you want something done first.",
        "examples": [eg("3 + 4 × 2", "Multiply first: 4 × 2 = 8, then 3 + 8 = 11"), eg("(3 + 4) × 2", "Brackets first: 7 × 2 = 14")],
        "another": {"text": "Getting dressed has an order: socks before shoes. Sums have an order too. Brackets are the socks: they always go first.",
                    "example": "10 − 2 × 3\nTimes first: 2 × 3 = 6\n10 − 6 = 4"},
        "walkthrough": {"board": "20 − (2 + 3)² ÷ 5", "kind": "math", "steps": [
            say("BIDMAS: Brackets, Indices, Division and Multiplication, Addition and Subtraction. We'll take one letter at a time."),
            ask("Brackets first: 2 + 3 = ?", ["5", "6"], 0, line="(2 + 3) = 5"),
            ask("Indices next: 5² = ?", ["25", "10"], 0, hint="5² means 5 × 5.", line="5² = 25"),
            ask("Now divide: 25 ÷ 5 = ?", ["5", "125"], 0, line="25 ÷ 5 = 5"),
            ask("Last, subtract: 20 − 5 = ?", ["15", "3"], 0, then="Subtracting too early, (20 − 25) ÷ 5 = −1, is the classic slip: divide before you subtract.", line="20 − 5 = 15"),
        ]},
        "questions": [
            q("Work out 6 + 12 ÷ 3", ["10", "6", "18"], 0, "Divide first: 12 ÷ 3 = 4, then 6 + 4 = 10. 6 comes from adding first (18 ÷ 3)."),
            q("Work out 2 × 3²", ["18", "36", "12"], 0, "Index first: 3² = 9, then 2 × 9 = 18. 36 squares 2 × 3 = 6."),
        ],
    },
    {
        "id": "fsmNegatives", "name": "Negative numbers", "sub": "Temperatures and overdrafts",
        "rule": "Numbers below zero are negative. On a number line, going up (adding) moves right and going down (subtracting) moves left. Taking away a negative is the same as adding.",
        "trick": "Picture a thermometer. To find a difference between a minus and a plus temperature, count to zero and then on.",
        "examples": [eg("−4 + 9", "Up 4 to reach 0, then 5 more: 5"), eg("3 − (−2)", "Taking away a negative adds: 3 + 2 = 5")],
        "another": {"text": "If you owe your friend £5, that's −£5. If you then get £8 pocket money and pay them back, you've got £3 left.",
                    "example": "−5 + 8 = 3"},
        "walkthrough": {"board": "From −6°C to 9°C. How much warmer?", "kind": "text", "steps": [
            say("Count in two hops: first up to zero, then from zero to the top temperature."),
            ask("From −6 up to 0 is how many degrees?", ["6", "−6"], 0, hint="A distance is never negative.", line="−6 → 0: 6 degrees"),
            ask("From 0 up to 9 is how many degrees?", ["9", "3"], 0, line="0 → 9: 9 degrees"),
            ask("Total warmer?", ["15", "3"], 0, then="3 is 9 − 6, which forgets that −6 is below zero.", line="6 + 9 = 15 degrees"),
        ]},
        "questions": [
            q("A balance is −£30. £50 is paid in. What is the new balance?", ["£20", "−£80", "£80"], 0, "−30 + 50: up 30 to reach 0, then 20 more: £20."),
            q("What is −2 − 7?", ["−9", "−5", "5"], 0, "Start at −2 and go down 7 more: −9."),
        ],
    },
    {
        "id": "fsmFormula", "name": "Formulas in words", "sub": "Swap the letters for numbers",
        "rule": "A formula is a rule for working something out. Replace each letter (or word) with its number, then work it out with BIDMAS. To go backwards, undo each step in reverse order.",
        "trick": "Write the formula out again with the numbers in brackets where the letters were, before you touch the calculator.",
        "examples": [eg("C = 20 + 15h, h = 4", "C = 20 + 15 × 4 = 20 + 60 = 80"), eg("C = 20 + 15h, C = 95", "Undo: 95 − 20 = 75, then 75 ÷ 15 = 5, so h = 5")],
        "another": {"text": "A formula is like a recipe card. The card says 'two eggs per person'. For 3 people you put 3 where it says 'person'.",
                    "example": "eggs = 2 × people\npeople = 3\neggs = 2 × 3 = 6"},
        "walkthrough": {"board": "Cost (£) = 35 + 12 × hours. How much is a 3-hour job?", "kind": "text", "steps": [
            ask("What number replaces 'hours'?", ["3", "35"], 0, line="Cost = 35 + 12 × 3"),
            ask("BIDMAS: what do you do first?", ["12 × 3", "35 + 12"], 0, hint="Multiplication comes before addition.", line="12 × 3 = 36"),
            ask("Now 35 + 36 = ?", ["71", "61"], 0, line="Cost = £71"),
            ask("Backwards: a bill was £83. Take off the £35 first. What's left?", ["48", "118"], 0, line="83 − 35 = 48"),
            ask("48 ÷ 12 = how many hours?", ["4", "6"], 0, then="Undo in reverse: take away first, then divide.", line="48 ÷ 12 = 4 hours"),
        ]},
        "questions": [
            q("Use P = 2l + 2w with l = 6 and w = 4.", ["20", "48", "14"], 0, "2 × 6 + 2 × 4 = 12 + 8 = 20. 48 multiplies 6 × 4 × 2."),
            q("Pay = £11 × hours + £20. Pay was £108. How many hours?", ["8", "12", "10"], 0, "Undo: 108 − 20 = 88, then 88 ÷ 11 = 8 hours."),
        ],
    },
    {
        "id": "fsmEstimate", "name": "Rounding and estimating", "sub": "Look at the next digit",
        "rule": "To round, find the place you are rounding to and look at the next digit: 5 or more rounds up, 4 or less stays. To estimate, round each number to 1 significant figure, then work it out.",
        "trick": "Always estimate before you trust a calculator. If the answer is ten times bigger than your estimate, a decimal point has slipped.",
        "examples": [eg("6.47 to 1 d.p.", "Next digit 7, round up: 6.5"), eg("48 × 21", "About 50 × 20 = 1,000")],
        "another": {"text": "If a sweet costs 98p and you want 10, you think 'about £1 each, so about £10'. That's estimating.",
                    "example": "98p ≈ £1\n10 × £1 = £10"},
        "walkthrough": {"board": "Estimate 612 × 3.9", "kind": "math", "steps": [
            ask("Round 612 to 1 significant figure:", ["600", "610"], 0, hint="Keep only the first digit; the rest become zeros.", line="612 ≈ 600"),
            ask("Round 3.9 to 1 significant figure:", ["4", "3"], 0, hint="The next digit is 9, so round up.", line="3.9 ≈ 4"),
            ask("600 × 4 = ?", ["2,400", "24,000"], 0, line="600 × 4 = 2,400"),
            ask("A calculator says 23,868. Is that right?", ["No, it should be near 2,400", "Yes, it's close enough"], 0, then="The real answer is 2,386.8: the calculator answer was ten times too big.", line="Answer should be about 2,400"),
        ]},
        "questions": [
            q("Round 7,850 to the nearest thousand.", ["8,000", "7,000", "7,900"], 0, "The hundreds digit is 8, which is 5 or more, so round up to 8,000."),
            q("Best estimate of 19.6 × 51?", ["1,000", "100", "10,000"], 0, "20 × 50 = 1,000."),
        ],
    },
    # ---------------- Fractions, percentages and ratio ----------------
    {
        "id": "fsmFdp", "name": "Fractions, decimals and percentages", "sub": "Three ways to write one amount",
        "rule": "A fraction, a decimal and a percentage can all mean the same amount. Fraction to decimal: divide the top by the bottom. Decimal to percentage: multiply by 100. To add fractions, make the bottoms the same first.",
        "trick": "Learn the common ones by heart: 1/2 = 0.5 = 50%, 1/4 = 0.25 = 25%, 1/5 = 0.2 = 20%, 1/10 = 0.1 = 10%, 1/8 = 0.125 = 12.5%.",
        "examples": [eg("3/5", "3 ÷ 5 = 0.6 = 60%"), eg("1/3 + 1/4", "Twelfths: 4/12 + 3/12 = 7/12")],
        "another": {"text": "Half a pizza, 0.5 of a pizza and 50% of a pizza are the same slice. They are just different names for it.",
                    "example": "1/2 = 0.5 = 50%"},
        "walkthrough": {"board": "Which is bigger: 7/8 or 85%?", "kind": "math", "steps": [
            say("To compare, write both the same way. Decimals are easiest."),
            ask("7/8 as a decimal is 7 ÷ 8 =", ["0.875", "0.78"], 0, hint="Divide the top by the bottom.", line="7/8 = 0.875"),
            ask("85% as a decimal is", ["0.85", "8.5"], 0, hint="Per cent means out of 100: divide by 100.", line="85% = 0.85"),
            ask("Which is bigger?", ["7/8", "85%"], 0, then="0.875 is more than 0.850.", line="0.875 > 0.85, so 7/8 is bigger"),
        ]},
        "questions": [
            q("Write 0.35 as a percentage.", ["35%", "3.5%", "0.35%"], 0, "Multiply by 100: 35%."),
            q("Work out 1/2 + 1/3", ["5/6", "2/5", "1/6"], 0, "Sixths: 3/6 + 2/6 = 5/6. Adding tops and bottoms (2/5) never works."),
        ],
    },
    {
        "id": "fsmPercentOf", "name": "Percentages of amounts", "sub": "Find 10%, then build",
        "rule": "To find a percentage of an amount, change the percentage to a decimal and multiply: 35% of £260 is 0.35 × 260. Without a calculator, find 10% (divide by 10) and 5% (half of that), then build up. To add VAT or interest, multiply by 1 plus the decimal.",
        "trick": "Adding 20% is × 1.2. Taking 20% off is × 0.8. One multiplication does the whole job.",
        "examples": [eg("15% of £60", "10% = £6, 5% = £3, so 15% = £9"), eg("£50 + 20% VAT", "50 × 1.2 = £60")],
        "another": {"text": "Per cent means 'out of 100'. 10% of something is 10 pieces out of every 100, the same as one tenth.",
                    "example": "10% of 80 sweets\n80 ÷ 10 = 8 sweets"},
        "walkthrough": {"board": "35% of £260", "kind": "math", "steps": [
            ask("10% of £260 = ?", ["£26", "£2.60"], 0, hint="Divide by 10.", line="10% = £26"),
            ask("30% is three lots of 10%:", ["£78", "£56"], 0, line="30% = 3 × £26 = £78"),
            ask("5% is half of 10%:", ["£13", "£52"], 0, line="5% = £13"),
            ask("35% = 30% + 5% =", ["£91", "£104"], 0, then="Check with a calculator: 0.35 × 260 = 91.", line="35% = £78 + £13 = £91"),
        ]},
        "questions": [
            q("What is 25% of £360?", ["£90", "£36", "£120"], 0, "25% is a quarter: 360 ÷ 4 = £90."),
            q("£80 plus VAT at 20%. Total?", ["£96", "£100", "£64"], 0, "80 × 1.2 = £96. £64 takes the VAT off instead."),
        ],
    },
    {
        "id": "fsmPercentChange", "name": "Percentage change", "sub": "Always divide by the original",
        "rule": "Percentage change = change ÷ original × 100. To find the original price after a change, divide by the multiplier: after 20% off, the price is 0.8 of the original, so original = sale price ÷ 0.8.",
        "trick": "The original is always 100%. Ask: what percentage is the number I have? Then divide to get back to 100%.",
        "examples": [eg("£50 to £60", "Change £10. 10 ÷ 50 = 0.2, up 20%"), eg("£72 after 10% off", "72 ÷ 0.9 = £80 originally")],
        "another": {"text": "If your plant grows from 10 cm to 12 cm, it grew 2 cm. Compared with the 10 cm it started at, that's 2 out of 10: 20% taller.",
                    "example": "10 cm → 12 cm\n2 ÷ 10 = 0.2 = 20%"},
        "walkthrough": {"board": "After 25% off, a sofa costs £450. What was the original price?", "kind": "text", "steps": [
            say("The original price is 100%. A 25% cut leaves 75% of it."),
            ask("So £450 is what percentage of the original?", ["75%", "125%"], 0, line="£450 = 75%"),
            ask("75% as a multiplier is", ["0.75", "1.25"], 0, line="Multiplier 0.75"),
            ask("Original = 450 ÷ 0.75 =", ["£600", "£562.50"], 0, hint="Divide by the multiplier to undo it.",
                then="£562.50 adds 25% to £450, but the 25% was of the bigger, original price.", line="450 ÷ 0.75 = £600"),
        ]},
        "questions": [
            q("A price goes from £40 to £50. Percentage increase?", ["25%", "20%", "10%"], 0, "Change £10. 10 ÷ 40 = 0.25 = 25%. 20% divides by the new price."),
            q("After a 10% rise, rent is £660. What was it before?", ["£600", "£594", "£726"], 0, "660 ÷ 1.1 = £600. £594 takes 10% off £660, which is wrong."),
        ],
    },
    {
        "id": "fsmRatio", "name": "Ratio and proportion", "sub": "Find one part first",
        "rule": "To share in a ratio, add the parts, divide the total by that to find one part, then multiply. For proportion, find the value for one (one person, one metre, one gram), then scale up. For inverse proportion, more workers means less time: multiply to find the total work, then divide.",
        "trick": "Whatever the problem, find 'one' first: one part, one item, one person.",
        "examples": [eg("£60 in the ratio 1 : 2", "3 parts, one part £20: £20 and £40"), eg("5 pens cost £4", "1 pen 80p, so 8 pens £6.40")],
        "another": {"text": "Squash and water 1 to 4 means for every 1 cup of squash you pour 4 cups of water. 2 cups of squash needs 8 cups of water.",
                    "example": "1 : 4\n2 : 8\n3 : 12"},
        "walkthrough": {"board": "Share £350 in the ratio 2 : 5", "kind": "math", "steps": [
            ask("How many parts altogether?", ["7", "3"], 0, hint="Add the numbers in the ratio.", line="2 + 5 = 7 parts"),
            ask("One part is £350 ÷ 7 =", ["£50", "£70"], 0, line="1 part = £50"),
            ask("The 2 share is", ["£100", "£175"], 0, line="2 × £50 = £100"),
            ask("The 5 share is", ["£250", "£70"], 0, then="Check: £100 + £250 = £350.", line="5 × £50 = £250"),
        ]},
        "questions": [
            q("Share £80 in the ratio 3 : 1. The larger share is", ["£60", "£20", "£40"], 0, "4 parts, one part £20, three parts £60."),
            q("3 kg of potatoes cost £2.40. What do 5 kg cost?", ["£4.00", "£3.40", "£4.80"], 0, "1 kg costs 80p, so 5 kg cost £4.00."),
        ],
    },
    # ---------------- Measures, shape and space ----------------
    {
        "id": "fsmArea", "name": "Perimeter and area", "sub": "Round the edge, or the space inside",
        "rule": "Perimeter is the distance round the edge (m). Area is the space inside (m²). Rectangle: length × width. Triangle: ½ × base × height. Circle: π × r², and its circumference (perimeter) is π × diameter. For an L shape, split it into rectangles.",
        "trick": "Check the units: an area answer is always 'squared' (m², cm²). If you added lengths, you found a perimeter.",
        "examples": [eg("Rectangle 5 m by 3 m", "Area 15 m², perimeter 16 m"), eg("Circle, radius 2 m", "Area π × 2² = 12.6 m²")],
        "another": {"text": "A fence goes round the garden: that's the perimeter. The grass covers the garden: that's the area.",
                    "example": "Fence: 5 + 3 + 5 + 3 = 16 m\nGrass: 5 × 3 = 15 m²"},
        "walkthrough": {"board": "A room is a 7 m by 4 m rectangle with a 2 m by 1 m cupboard taken out of a corner. Floor area?", "kind": "text", "steps": [
            ask("Area of the full 7 m by 4 m rectangle:", ["28 m²", "22 m²"], 0, hint="Length × width.", line="7 × 4 = 28 m²"),
            ask("Area of the 2 m by 1 m cupboard:", ["2 m²", "3 m²"], 0, line="2 × 1 = 2 m²"),
            ask("Floor area = big rectangle take away cupboard:", ["26 m²", "30 m²"], 0, line="28 − 2 = 26 m²"),
            ask("A triangle has base 6 m and height 4 m. Area?", ["12 m²", "24 m²"], 0, hint="Don't forget the half.", then="½ × 6 × 4 = 12 m².", line="Triangle: ½ × 6 × 4 = 12 m²"),
        ]},
        "questions": [
            q("A square patio has sides of 3 m. Its area is", ["9 m²", "12 m²", "6 m²"], 0, "3 × 3 = 9 m². 12 m is the perimeter."),
            q("A circle has a diameter of 10 cm. Its circumference is about", ["31.4 cm", "78.5 cm", "15.7 cm"], 0, "π × 10 = 31.4 cm. 78.5 cm² would be the area."),
        ],
    },
    {
        "id": "fsmVolume", "name": "Volume and capacity", "sub": "Area of the end × length",
        "rule": "Volume of a cuboid = length × width × height. Any prism or cylinder: area of the end × length. A cylinder's end is a circle, so volume = π × r² × h. 1,000 cm³ = 1 litre and 1 m³ = 1,000 litres.",
        "trick": "Use the radius, not the diameter. Halve the diameter before you square it.",
        "examples": [eg("Box 10 cm × 5 cm × 4 cm", "200 cm³"), eg("Cylinder r = 10 cm, h = 20 cm", "π × 100 × 20 = 6,283 cm³ ≈ 6.3 litres")],
        "another": {"text": "Volume is how many sugar cubes fit inside. A box 3 cubes long, 2 wide and 2 high holds 3 × 2 × 2 = 12 cubes.",
                    "example": "3 × 2 × 2 = 12 cubes"},
        "walkthrough": {"board": "A cylinder: diameter 20 cm, height 50 cm. How many litres?", "kind": "text", "steps": [
            ask("The radius is", ["10 cm", "20 cm"], 0, hint="Radius is half the diameter.", line="r = 10 cm"),
            ask("Area of the circle end: π × 10² ≈", ["314 cm²", "63 cm²"], 0, line="π × 10² ≈ 314 cm²"),
            ask("Volume = end area × height ≈ 314 × 50 =", ["15,700 cm³", "364 cm³"], 0, line="314 × 50 ≈ 15,700 cm³"),
            ask("1,000 cm³ is 1 litre, so that's about", ["15.7 litres", "157 litres"], 0, then="Divide cm³ by 1,000 to get litres.", line="15,700 ÷ 1,000 ≈ 15.7 litres"),
        ]},
        "questions": [
            q("A box is 20 cm by 10 cm by 5 cm. Its volume is", ["1,000 cm³", "35 cm³", "200 cm³"], 0, "20 × 10 × 5 = 1,000 cm³ (which is 1 litre)."),
            q("How many litres is 2 m³?", ["2,000", "200", "20"], 0, "1 m³ = 1,000 litres, so 2 m³ = 2,000 litres."),
        ],
    },
    {
        "id": "fsmScale", "name": "Scale drawings and maps", "sub": "1 : 50 means real is 50 times bigger",
        "rule": "A scale of 1 : n means 1 unit on the drawing is n of the same unit in real life. Drawing to real: multiply by n. Real to drawing: divide by n. Then convert units: 100 cm = 1 m and 1,000 m = 1 km.",
        "trick": "Do the scale first, in the drawing's units, and convert to metres or kilometres last.",
        "examples": [eg("1 : 100, 3 cm on the plan", "300 cm = 3 m"), eg("1 : 50,000, 4 cm on the map", "200,000 cm = 2 km")],
        "another": {"text": "A toy car is a tiny copy of a real one. If it's 1 : 40, the real car is 40 toy cars long.",
                    "example": "Toy 10 cm\nReal 10 × 40 = 400 cm = 4 m"},
        "walkthrough": {"board": "Map scale 1 : 20,000. A path is 9 cm on the map. Real length in km?", "kind": "text", "steps": [
            ask("Map to real life: multiply or divide by 20,000?", ["Multiply", "Divide"], 0, hint="Real life is bigger.", line="9 × 20,000"),
            ask("9 × 20,000 =", ["180,000 cm", "18,000 cm"], 0, line="= 180,000 cm"),
            ask("Divide by 100 for metres:", ["1,800 m", "18,000 m"], 0, line="= 1,800 m"),
            ask("Divide by 1,000 for kilometres:", ["1.8 km", "18 km"], 0, then="Check: 1 cm on this map is 20,000 cm = 200 m, and 9 × 200 m = 1,800 m = 1.8 km.", line="= 1.8 km"),
        ]},
        "questions": [
            q("A plan is 1 : 50. A wall is 8 cm on the plan. Real length?", ["4 m", "40 m", "0.4 m"], 0, "8 × 50 = 400 cm = 4 m."),
            q("A 6 m room is drawn at 1 : 100. Length on the drawing?", ["6 cm", "60 cm", "0.6 cm"], 0, "600 cm ÷ 100 = 6 cm."),
        ],
    },
    {
        "id": "fsmSpeed", "name": "Speed, density and rates", "sub": "Distance ÷ time",
        "rule": "Speed = distance ÷ time, distance = speed × time, time = distance ÷ speed. Density = mass ÷ volume. Rates of pay work the same way: pay = rate × hours. Change minutes to hours by dividing by 60.",
        "trick": "15 minutes is 0.25 of an hour, 30 minutes is 0.5 and 45 minutes is 0.75. Never type 2 hours 15 minutes as 2.15.",
        "examples": [eg("120 miles in 2 h 30 min", "120 ÷ 2.5 = 48 mph"), eg("50 mph for 1 h 30 min", "50 × 1.5 = 75 miles")],
        "another": {"text": "If you walk 3 miles every hour, after 2 hours you've walked 6 miles. Speed is how far you go in one hour.",
                    "example": "3 mph × 2 hours = 6 miles"},
        "walkthrough": {"board": "A van travels 99 miles in 2 hours 15 minutes. Average speed?", "kind": "text", "steps": [
            ask("15 minutes as part of an hour:", ["0.25", "0.15"], 0, hint="15 ÷ 60.", line="15 min = 0.25 h"),
            ask("So the time in hours is", ["2.25", "2.15"], 0, line="Time = 2.25 hours"),
            ask("Speed = distance ÷ time =", ["99 ÷ 2.25", "99 × 2.25"], 0, line="Speed = 99 ÷ 2.25"),
            ask("99 ÷ 2.25 =", ["44 mph", "46 mph"], 0, then="Typing 2.15 hours would give 46 mph, a wrong answer.", line="= 44 mph"),
        ]},
        "questions": [
            q("A car goes 150 km in 2 hours. Average speed?", ["75 km/h", "300 km/h", "152 km/h"], 0, "150 ÷ 2 = 75 km/h."),
            q("How many hours is 1 hour 45 minutes?", ["1.75", "1.45", "1.5"], 0, "45 ÷ 60 = 0.75, so 1.75 hours."),
        ],
    },
    # ---------------- Handling data ----------------
    {
        "id": "fsmAverages", "name": "Mean, median, mode and range", "sub": "Three averages and a spread",
        "rule": "Mean: add them up and divide by how many. Median: put them in order and take the middle (halfway between the two middle ones if there are two). Mode: the most common. Range: biggest take away smallest. A smaller range means more consistent.",
        "trick": "Always put the numbers in order first. It gives you the median, the range and often the mode in one go.",
        "examples": [eg("4, 9, 2, 9, 6", "In order 2, 4, 6, 9, 9: median 6, mode 9, range 7, mean 30 ÷ 5 = 6"), eg("3, 5, 8, 10", "Median halfway between 5 and 8: 6.5")],
        "another": {"text": "Line your friends up by height. The one in the middle is the median height. The tallest minus the shortest is the range.",
                    "example": "120, 125, 131 cm\nMedian 125 cm\nRange 11 cm"},
        "walkthrough": {"board": "8, 3, 12, 5, 7, 3", "kind": "math", "steps": [
            ask("Put them in order. Which is right?", ["3, 3, 5, 7, 8, 12", "3, 5, 7, 8, 12"], 0, hint="Keep both 3s.", line="3, 3, 5, 7, 8, 12"),
            ask("Two middle values, 5 and 7. Median?", ["6", "5"], 0, line="Median = 6"),
            ask("Mean: the total is 38. 38 ÷ 6 ≈", ["6.3", "7.6"], 0, hint="Divide by how many numbers there are.", line="Mean ≈ 6.3"),
            ask("Range: 12 − 3 =", ["9", "15"], 0, then="The mode is 3, the only number that appears twice.", line="Range = 9, mode = 3"),
        ]},
        "questions": [
            q("Median of 2, 9, 4, 7, 5?", ["5", "4", "5.4"], 0, "In order: 2, 4, 5, 7, 9. Middle is 5. 4 is the middle before ordering; 5.4 is the mean."),
            q("Team A: range 4. Team B: range 12. Which is more consistent?", ["Team A", "Team B", "Neither"], 0, "The smaller range means the scores are closer together."),
        ],
    },
    {
        "id": "fsmGroupedMean", "name": "Frequency tables", "sub": "Midpoint × frequency",
        "rule": "In a frequency table, multiply each value by its frequency, add them up and divide by the total frequency. For groups like 10 to 14, use the middle of the group (12): the answer is then an estimate. The modal class is the group with the biggest frequency.",
        "trick": "Divide by the total of the frequency column, not by the number of rows.",
        "examples": [eg("0 to 4: 3 people, 5 to 9: 2 people", "2 × 3 + 7 × 2 = 20, 20 ÷ 5 = 4"), eg("Pets 1: 4 homes, 2: 6 homes", "4 + 12 = 16 pets in 10 homes: 1.6")],
        "another": {"text": "If 3 children have 2 sweets each and 2 children have 5 each, there are 6 + 10 = 16 sweets for 5 children: about 3 each.",
                    "example": "2 × 3 = 6\n5 × 2 = 10\n16 ÷ 5 = 3.2"},
        "table": {"head": ["Minutes reading", "Number of people"], "rows": [["0 to 4", "4"], ["5 to 9", "6"]]},
        "walkthrough": {"board": "Estimate the mean number of minutes spent reading.", "kind": "text", "table": True, "steps": [
            ask("The middle of the 0 to 4 group is", ["2", "4"], 0, hint="0, 1, 2, 3, 4: which is in the middle?", line="Midpoints 2 and 7"),
            ask("Midpoint × people for each row:", ["8 and 42", "16 and 54"], 0, hint="2 × 4 and 7 × 6.", line="2 × 4 = 8, 7 × 6 = 42"),
            ask("Add them, then divide by the total people (10):", ["5", "25"], 0, hint="Divide by the total frequency, not the number of rows.", line="(8 + 42) ÷ 10 = 5"),
            ask("Why is 5 minutes only an estimate?", ["We don't know the exact values", "The groups are too big"], 0, then="We only know which group each person is in, so we use the middle.", line="Estimated mean ≈ 5 minutes"),
        ]},
        "questions": [
            q("Which is the modal class?", ["5 to 9", "0 to 4", "6"], 0, "The group with the most people is 5 to 9. 6 is its frequency, not the class."),
            q("How many people are in the survey?", ["10", "2", "6"], 0, "Add the frequency column: 4 + 6 = 10. There are 2 rows, but 10 people."),
        ],
    },
    {
        "id": "fsmProbability", "name": "Probability", "sub": "What you want ÷ everything possible",
        "rule": "Probability = number of ways it can happen ÷ total number of equally likely outcomes. It can be a fraction, a decimal or a percentage, from 0 (impossible) to 1 (certain). For two events, list every pair in a table; with a two-way table, find the right row or column total to divide by.",
        "trick": "Read the question for who you are choosing from. 'A Year 7 pupil' means divide by the Year 7 total, not by everyone.",
        "examples": [eg("A bag: 3 red, 7 blue", "P(red) = 3/10 = 0.3 = 30%"), eg("A coin and a dice", "12 pairs, H1 to T6: P(head and 6) = 1/12")],
        "another": {"text": "In a bag of 10 sweets, 3 are strawberry. Close your eyes and pick one: 3 chances out of 10 that it's strawberry.",
                    "example": "3 out of 10\n3/10"},
        "table": {"head": ["", "Tea", "Coffee", "Total"], "rows": [["Staff", "12", "18", "30"], ["Visitors", "8", "2", "10"], ["Total", "20", "20", "40"]]},
        "walkthrough": {"board": "40 people at a meeting chose tea or coffee.", "kind": "text", "table": True, "steps": [
            say("We choose one person from all 40. What is P(a visitor who drinks tea)?"),
            ask("How many visitors drink tea?", ["8", "20"], 0, hint="Find the visitors row and the tea column.", line="Visitors and tea: 8"),
            ask("Out of how many people?", ["40", "10"], 0, hint="We are choosing from everyone.", line="Out of 40"),
            ask("P = 8/40 =", ["1/5", "4/5"], 0, line="8/40 = 1/5"),
            ask("Now choose a visitor only. P(tea)?", ["8/10", "8/20"], 0, then="Only the 10 visitors count now, so divide by the visitors total.", line="Visitor only: 8/10 = 4/5"),
        ]},
        "questions": [
            q("One of the 40 people is chosen at random. What is P(coffee)?", ["1/2", "18/40", "2/10"], 0, "20 of the 40 chose coffee: 20/40 = 1/2."),
            q("A member of staff is chosen at random. What is P(coffee) as a percentage?", ["60%", "45%", "18%"], 0, "Only staff count: 18 out of 30 = 0.6 = 60%. 45% is 18 out of all 40."),
        ],
    },
    {
        "id": "fsmScatter", "name": "Scatter graphs", "sub": "Do the two go up together?",
        "rule": "A scatter graph plots pairs of values. Points going up to the right: positive correlation. Points going down to the right: negative correlation. No pattern: no correlation. A line of best fit can estimate values inside the data's range. Correlation does not prove that one thing causes the other.",
        "trick": "Read it like a hill. Uphill left to right is positive; downhill is negative.",
        "examples": [eg("Height and arm span", "Both rise together: positive"), eg("Outside temperature and heating bills", "Warmer, lower bills: negative")],
        "another": {"text": "The more you practise a song, the fewer mistakes you make. Practice goes up, mistakes go down: that's negative correlation.",
                    "example": "Practice ↑\nMistakes ↓\nNegative"},
        "walkthrough": {"board": "Line of best fit through (2, 30) and (6, 50). Estimate y at x = 4.", "kind": "text", "steps": [
            ask("As x goes up, y goes", ["up: positive correlation", "down: negative correlation"], 0, line="Positive correlation"),
            ask("x = 4 is where between 2 and 6?", ["Halfway", "A quarter of the way"], 0, line="x = 4 is halfway"),
            ask("Halfway between 30 and 50 is", ["40", "45"], 0, line="Estimate y = 40"),
            ask("Is it safe to estimate y when x = 20?", ["No, it's far outside the data", "Yes, just extend the line"], 0, then="Outside the data the pattern may not hold.", line="Only estimate inside the data"),
        ]},
        "questions": [
            q("Hours of TV watched and hours of sleep: as TV goes up, sleep goes down. This is", ["negative correlation", "positive correlation", "no correlation"], 0, "One goes up as the other goes down: negative."),
            q("Ice cream sales and sunburn cases show strong positive correlation. What does that tell you?", ["They tend to rise together", "Ice cream causes sunburn", "The data must be wrong"], 0, "Correlation shows a link, not a cause: hot sunny weather drives both."),
        ],
    },
]
