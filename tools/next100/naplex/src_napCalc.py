# Domain 1C: pharmaceutical calculations. 12 per test, 6 drill-only.
# Constructed-response (numeric entry) items like the real NAPLEX: each stem
# gives the unit and the rounding. Every answer is computed and checked below.
from math import sqrt

def _r(x, nd=0):
    v = round(x + 1e-9, nd)
    return str(int(v)) if nd == 0 else f"{v:.{nd}f}"

# Cockcroft-Gault
_crcl1 = (140 - 72) * 70 / (72 * 1.4)            # 47.2
_crcl2 = (140 - 80) * 60 / (72 * 1.2) * 0.85     # 35.4
_ibw = 45.5 + 2.3 * 6                             # 59.3
_alleg = 300 * (70 - 50) / (95 - 50)              # 133.3 mL of 95%
_osm = 9 / 58.5 * 2 * 1000                        # 307.7
_hc = 60 * (0.025 - 0.01) / (1 - 0.025)           # 0.923 g
_bsa = sqrt(170 * 68 / 3600)                      # 1.79
assert _r(_crcl1) == "47" and _r(_crcl2) == "35" and _r(_ibw, 1) == "59.3"
assert _r(_alleg) == "133" and _r(_osm) == "308" and _r(_hc, 2) == "0.92" and _r(_bsa, 2) == "1.79"
assert abs(1000 / 480 * 15 - 31.25) < 1e-9 and abs(1490 / 74.5 - 20) < 1e-9 and abs(0.7 * 80 * 20 - 1120) < 1e-9
assert 350 * 60 / 1000 == 21 and 300 / 1.5 == 200 and 40 / 5 * 0.75 == 6 and abs(95 / 1.75 ** 2 - 31.02) < 0.01

ITEMS = [
    # ---- Test 1 ----
    ("N", 1, 2, "Patient parameters",
     "A 72-year-old man weighs 70 kg, which is also his ideal body weight, and his serum creatinine is 1.4 mg/dL. Using the Cockcroft-Gault equation, what is his estimated creatinine clearance in mL/min? Round to the nearest whole number. Type the number only.",
     [_r(_crcl1)], "CrCl = (140 - age) x weight / (72 x SCr) = (68 x 70) / (72 x 1.4) = 4760 / 100.8 = 47.2, which rounds to 47 mL/min.", True),
    ("N", 1, 1, "Patient parameters",
     "What is the ideal body weight, in kg, of a woman who is 5 feet 6 inches tall? Use the Devine formula and round to one decimal place. Type the number only.",
     [_r(_ibw, 1)], "Female IBW = 45.5 kg + 2.3 kg for each inch over 5 feet = 45.5 + 2.3 x 6 = 59.3 kg.", False),
    ("N", 1, 2, "Rates of administration",
     "Heparin 25,000 units in 500 mL is infusing. The order is for 1,200 units per hour. What rate should the pump be set to, in mL per hour? Type the number only.",
     ["24"], "The concentration is 25,000 / 500 = 50 units/mL. 1,200 units/h / 50 units/mL = 24 mL/h.", True),
    ("N", 1, 2, "Rates of administration",
     "1,000 mL of fluid is to run over 8 hours with a giving set that delivers 15 drops per mL. What is the flow rate in drops per minute? Round to the nearest whole number. Type the number only.",
     ["31"], "1,000 mL / 480 minutes = 2.083 mL/min; x 15 drops/mL = 31.25, which rounds to 31 drops per minute.", True),
    ("N", 1, 1, "Quantity to dispense",
     "A prednisone taper is prescribed: 40 mg daily for 3 days, then 30 mg daily for 3 days, then 20 mg daily for 3 days, then 10 mg daily for 3 days. Only 10 mg tablets are used. How many tablets should be dispensed? Type the number only.",
     ["30"], "Tablets per day are 4, 3, 2 and 1, each for 3 days: (4 + 3 + 2 + 1) x 3 = 30 tablets.", True),
    ("N", 1, 2, "Ratio strength",
     "How many milligrams of epinephrine are in 0.3 mL of a 1:1,000 solution? Type the number only.",
     ["0.3", ".3"], "A 1:1,000 solution is 1 g in 1,000 mL, which is 1 mg/mL. 0.3 mL x 1 mg/mL = 0.3 mg.", False),
    ("N", 1, 2, "Milliequivalents",
     "Potassium chloride has a molecular weight of 74.5. How many milliequivalents of potassium are in 1.49 g of potassium chloride? Type the number only.",
     ["20"], "KCl is monovalent, so 1 mEq = 74.5 mg. 1,490 mg / 74.5 mg per mEq = 20 mEq.", True),
    ("N", 1, 3, "Quantities to compound",
     "How many mL of 95% alcohol must be mixed with 50% alcohol to make 300 mL of 70% alcohol? Round to the nearest whole number. Type the number only.",
     [_r(_alleg)], "By alligation, the 95% needs 70 - 50 = 20 parts and the 50% needs 95 - 70 = 25 parts, 45 parts in all. 300 mL x 20/45 = 133.3, so 133 mL of 95% alcohol.", True),
    ("N", 1, 2, "Nutrition",
     "A parenteral nutrition bag contains 250 g of dextrose monohydrate. How many kilocalories does the dextrose provide? Type the number only.",
     ["850"], "IV dextrose provides 3.4 kcal/g. 250 g x 3.4 = 850 kcal.", True),
    ("N", 1, 2, "Biostatistics",
     "In a trial, 12% of patients on placebo and 8% of patients on the study drug had a stroke. How many patients must be treated with the drug to prevent one stroke? Type the number only.",
     ["25"], "Absolute risk reduction = 12% - 8% = 4% = 0.04. NNT = 1 / 0.04 = 25.", True),
    ("N", 1, 3, "Pharmacokinetic parameters",
     "A drug has a volume of distribution of 0.7 L/kg. What loading dose, in mg, gives a peak concentration of 20 mg/L in an 80 kg patient? Type the number only.",
     ["1120"], "Loading dose = Vd x target concentration = (0.7 L/kg x 80 kg) x 20 mg/L = 56 L x 20 mg/L = 1,120 mg.", True),
    ("N", 1, 2, "Pharmacokinetic parameters",
     "A drug's elimination rate constant is 0.1155 per hour. What is its half-life in hours? Round to the nearest whole number. Type the number only.",
     ["6"], "t1/2 = 0.693 / k = 0.693 / 0.1155 = 6 hours.", True),
    # ---- Test 2 ----
    ("N", 2, 2, "Patient parameters",
     "An 80-year-old woman weighs 60 kg, which is also her ideal body weight, and her serum creatinine is 1.2 mg/dL. Using the Cockcroft-Gault equation, what is her estimated creatinine clearance in mL/min? Round to the nearest whole number. Type the number only.",
     [_r(_crcl2)], "CrCl = (140 - 80) x 60 / (72 x 1.2) = 3600 / 86.4 = 41.7, then x 0.85 for a woman = 35.4, which rounds to 35 mL/min.", True),
    ("N", 2, 1, "Patient parameters",
     "A patient weighs 95 kg and is 1.75 m tall. What is the body mass index in kg/m2? Round to the nearest whole number. Type the number only.",
     ["31"], "BMI = weight / height squared = 95 / (1.75 x 1.75) = 95 / 3.0625 = 31.0 kg/m2.", True),
    ("N", 2, 3, "Rates of administration",
     "Dobutamine 250 mg in 250 mL is ordered at 5 mcg/kg/min for a 70 kg patient. What is the infusion rate in mL per hour? Type the number only.",
     ["21"], "The concentration is 1 mg/mL, or 1,000 mcg/mL. 5 mcg/kg/min x 70 kg = 350 mcg/min x 60 = 21,000 mcg/h; / 1,000 mcg/mL = 21 mL/h.", True),
    ("N", 2, 1, "Rates of administration",
     "Vancomycin 1.5 g in 300 mL is to be infused over 90 minutes. What is the infusion rate in mL per hour? Type the number only.",
     ["200"], "300 mL over 1.5 hours = 300 / 1.5 = 200 mL/h.", True),
    ("N", 2, 2, "Dose conversions",
     "A patient taking prednisone 40 mg daily is switched to an equivalent dose of oral dexamethasone. Using prednisone 5 mg = dexamethasone 0.75 mg, what is the daily dexamethasone dose in mg? Type the number only.",
     ["6"], "40 mg / 5 mg = 8 equivalent units; 8 x 0.75 mg = 6 mg of dexamethasone.", True),
    ("N", 2, 1, "Drug concentrations",
     "How many grams of dextrose are in 500 mL of dextrose 10% in water? Type the number only.",
     ["50"], "10% w/v means 10 g per 100 mL. 500 mL x 10 g/100 mL = 50 g.", True),
    ("N", 2, 3, "Osmolarity",
     "Sodium chloride has a molecular weight of 58.5 and dissociates into 2 particles. What is the ideal osmolarity of 0.9% sodium chloride in mOsmol/L? Round to the nearest whole number. Type the number only.",
     [_r(_osm)], "0.9% is 9 g/L. 9 / 58.5 = 0.1538 mol/L; x 2 particles = 0.3077 osmol/L, or 307.7 mOsmol/L, which rounds to 308.", True),
    ("N", 2, 3, "Quantities to compound",
     "How many grams of hydrocortisone powder must be added to 60 g of 1% hydrocortisone cream to make it 2.5%? Round to two decimal places. Type the number only.",
     [_r(_hc, 2)], "Let x be the grams of pure powder: (0.6 + x) / (60 + x) = 0.025. So 0.6 + x = 1.5 + 0.025x, 0.975x = 0.9 and x = 0.92 g.", False),
    ("N", 2, 2, "Nutrition",
     "How many kilocalories are in 250 mL of 20% intravenous lipid emulsion, which provides 2 kcal/mL? Type the number only.",
     ["500"], "250 mL x 2 kcal/mL = 500 kcal. The 2 kcal/mL figure includes the glycerol and phospholipid in the emulsion.", True),
    ("N", 2, 2, "Biostatistics",
     "The event rate is 10% with placebo and 6% with a new drug. What is the relative risk reduction, as a percentage? Type the number only.",
     ["40"], "Relative risk = 6% / 10% = 0.6, and RRR = 1 - 0.6 = 0.4, or 40%. The absolute risk reduction is only 4%.", True),
    ("N", 2, 3, "Pharmacokinetic parameters",
     "A drug has a clearance of 5 L/h. What dose, in mg, given every 12 hours keeps an average steady-state concentration of 15 mg/L? Assume complete bioavailability. Type the number only.",
     ["900"], "Dose = CL x Css,avg x tau = 5 L/h x 15 mg/L x 12 h = 900 mg.", True),
    ("N", 2, 2, "Quantity to dispense",
     "A patient injects 30 units of insulin glargine daily from 3 mL pens of 100 units/mL. Ignoring priming doses, how many pens are needed for 30 days? Type the number only.",
     ["3"], "30 units x 30 days = 900 units. Each pen holds 3 mL x 100 units/mL = 300 units, so 900 / 300 = 3 pens.", True),
    # ---- Drill only ----
    ("N", 0, 1, "Patient parameters",
     "A child weighing 15 kg is prescribed a drug at 40 mg/kg/day divided every 12 hours. How many mg are given in each dose? Type the number only.",
     ["300"], "40 mg/kg/day x 15 kg = 600 mg a day; divided into two doses = 300 mg per dose.", True),
    ("N", 0, 2, "Patient parameters",
     "Using the Mosteller formula, what is the body surface area in m2 of a patient who is 170 cm tall and weighs 68 kg? Round to two decimal places. Type the number only.",
     [_r(_bsa, 2)], "BSA = square root of (height in cm x weight in kg / 3600) = square root of (170 x 68 / 3600) = square root of 3.211 = 1.79 m2.", False),
    ("N", 0, 1, "Laboratory measures",
     "A patient's sodium is 140, chloride 104 and bicarbonate 24 mEq/L. What is the anion gap in mEq/L? Type the number only.",
     ["12"], "Anion gap = Na - (Cl + HCO3) = 140 - (104 + 24) = 12 mEq/L.", True),
    ("N", 0, 2, "Laboratory measures",
     "A patient's serum calcium is 8.0 mg/dL and albumin is 2.5 g/dL. Using a normal albumin of 4, what is the corrected calcium in mg/dL? Round to one decimal place. Type the number only.",
     ["9.2"], "Corrected Ca = measured Ca + 0.8 x (4 - albumin) = 8.0 + 0.8 x 1.5 = 9.2 mg/dL.", False),
    ("N", 0, 2, "Drug concentrations",
     "Concentrated sodium chloride 23.4% contains 4 mEq of sodium per mL. How many mL provide 60 mEq of sodium? Type the number only.",
     ["15"], "60 mEq / 4 mEq per mL = 15 mL.", True),
    ("N", 0, 1, "Quantity to dispense",
     "An inhaler holds 200 actuations. The patient uses 2 puffs four times a day. How many days will the inhaler last? Type the number only.",
     ["25"], "2 puffs x 4 times = 8 puffs a day. 200 / 8 = 25 days.", True),
]
