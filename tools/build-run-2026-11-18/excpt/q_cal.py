CAT = "excptCalc"; SEG = "CAL"
# Domain 4C (7 of 100): tasks 4C.1 to 4C.8, knowledge K.108 to K.122.
# Every key is computed here from the stem's numbers; build.py asserts each one again.

def g(x):
    """Format a number without trailing zeros."""
    return f"{x:g}"

CHECK = {}  # questionId index -> computed value string, asserted by build.py

Q = []

def add(stem, key, wrong, expl, value):
    assert key.startswith(value) or value in key, (stem, key, value)
    CHECK[len(Q)] = value
    Q.append((stem, key, wrong, expl))

v = g(1.5 * 5)
add("A dose is 1.5 teaspoons. Using 1 teaspoon = 5 mL, how many mL is that?",
    f"{v} mL", ["5 mL", "15 mL", "22.5 mL"],
    f"1.5 x 5 mL = {v} mL. A tablespoon is 15 mL, three times a teaspoon.", v)

v = g(77 / 2.2)
add("A child weighs 77 lb. Using 1 kg = 2.2 lb, what is the weight in kg?",
    f"{v} kg", ["169.4 kg", "32 kg", "38.5 kg"],
    f"77 / 2.2 = {v} kg. Multiplying by 2.2 instead gives 169.4, the most common mistake.", v)

v = g(500 * 4 / 1000)
add("Cephalexin 500 mg is taken four times daily. What is the total daily dose in grams?",
    f"{v} g", ["1.5 g", "2.5 g", "0.5 g"],
    f"500 mg x 4 = 2,000 mg, and 2,000 / 1,000 = {v} g.", v)

v = g(56 / (2 * 2))
add("A prescription is for 56 tablets, sig 2 tabs po bid. What is the days supply?",
    f"{v} days", ["28 days", "112 days", "21 days"],
    f"The patient takes 2 x 2 = 4 tablets a day, so 56 / 4 = {v} days.", v)

v = g((24 / 6) * 7)
add("Sig: 1 cap po q6h for 7 days. How many capsules are dispensed?",
    f"{v} capsules", ["21 capsules", "24 capsules", "168 capsules"],
    f"Every 6 hours is 24 / 6 = 4 doses a day, and 4 x 7 = {v} capsules.", v)

v = g(400 / 250 * 5)
add("An order is for 400 mg of a suspension labeled 250 mg/5 mL. How many mL is each dose?",
    f"{v} mL", ["3.125 mL", "10 mL", "16 mL"],
    f"400 mg x (5 mL / 250 mg) = {v} mL.", v)

v = g((77 - 32) / 1.8)
add("A storage room reads 77 degrees F. What is this in degrees Celsius?",
    f"{v} degrees C", ["45 degrees C", "171 degrees C", "32 degrees C"],
    f"C = (F - 32) / 1.8, so (77 - 32) / 1.8 = {v} degrees C.", v)

v = g(0.9 / 100 * 250)
add("How many grams of sodium chloride are in 250 mL of a 0.9% (w/v) solution?",
    f"{v} g", ["22.5 g", "0.225 g", "9 g"],
    f"0.9% w/v means 0.9 g per 100 mL, so 0.9 x 250 / 100 = {v} g.", v)

v = g(200 * 5 / 25)
add("How many mL of a 25% stock solution are needed to make 200 mL of a 5% solution?",
    f"{v} mL", ["8 mL", "50 mL", "160 mL"],
    f"C1 x V1 = C2 x V2: 25% x V1 = 5% x 200 mL, so V1 = {v} mL, brought to 200 mL with diluent.", v)

hi, lo, want, total = 10, 2, 5, 120
parts_hi, parts_lo = want - lo, hi - want
g_hi = g(total * parts_hi / (parts_hi + parts_lo)); g_lo = g(total * parts_lo / (parts_hi + parts_lo))
add("Using alligation, how much 10% and 2% ointment make 120 g of 5% ointment?",
    f"{g_hi} g of 10% and {g_lo} g of 2%", [f"{g_lo} g of 10% and {g_hi} g of 2%", "60 g of each", "24 g of 10% and 96 g of 2%"],
    f"Parts: 5 - 2 = 3 of the 10% and 10 - 5 = 5 of the 2%, 8 parts in all. 120 x 3/8 = {g_hi} g and 120 x 5/8 = {g_lo} g.", f"{g_hi} g of 10%")

v = g(1 / 200 * 100)
add("A solution has a ratio strength of 1:200. What is its percentage strength?",
    f"{v}%", ["0.2%", "0.05%", "5%"],
    f"1:200 means 1 g in 200 mL; (1 / 200) x 100 = {v}%.", v)

v = g(30 / 20 * 15)
add("Potassium chloride oral solution contains 20 mEq per 15 mL. How many mL give a 30 mEq dose?",
    f"{v} mL", ["15 mL", "30 mL", "11.25 mL"],
    f"30 mEq x (15 mL / 20 mEq) = {v} mL.", v)

v = g(1000 / 8)
add("A 1,000 mL IV bag is to run over 8 hours. What is the flow rate?",
    f"{v} mL/hr", ["12.5 mL/hr", "100 mL/hr", "150 mL/hr"],
    f"1,000 mL / 8 hr = {v} mL/hr.", v)

v = g(30 / 150 * 300)
add("Using Clark's rule, what is the dose for a 30 lb child if the adult dose is 300 mg?",
    f"{v} mg", ["1,500 mg", "75 mg", "90 mg"],
    f"Clark's rule: (weight in lb / 150) x adult dose = (30 / 150) x 300 = {v} mg.", v)

v = g((26 - 20) / 20 * 100)
add("A drug costs the pharmacy $20 and sells for $26. What is the markup as a percentage of cost?",
    f"{v}%", ["23%", "6%", "130%"],
    f"Markup = (26 - 20) / 20 x 100 = {v}%. 23% is the profit as a share of the $26 selling price.", v)

v = "1430"
add("A dose is due at 2:30 PM. How is that written in 24-hour (military) time?",
    "1430", ["0230", "1230", "1530"],
    "Add 12 to afternoon hours: 2:30 PM is 14:30, written 1430.", v)
assert str(2 + 12) + "30" == v
