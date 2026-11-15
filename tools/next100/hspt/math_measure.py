# HSPT Mathematics: measurement (customary and metric units, time). Original items.
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Customary units", diff=1,
       stem="How many inches are in 2 1/2 yards?",
       key="90", wrong=["30", "75", "108"],
       expl="One yard is 36 inches, so 2 1/2 yards is 2.5 × 36 = 90 inches. 30 inches is 2 1/2 feet."),
  dict(test=1, skill="Elapsed time", diff=1,
       stem="A movie starts at 7:45 p.m. and lasts 1 hour 50 minutes. At what time does it end?",
       key="9:35 p.m.", wrong=["8:35 p.m.", "9:25 p.m.", "9:45 p.m."],
       expl="One hour after 7:45 is 8:45, and 50 more minutes is 9:35. Forgetting to carry the extra hour past 60 minutes gives 8:35."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Metric units", diff=1,
       stem="How many milliliters are in 3.2 liters?",
       key="3,200", wrong=["32", "320", "32,000"],
       expl="One liter is 1,000 milliliters, so 3.2 liters is 3,200 milliliters."),
  dict(test=2, skill="Liquid measure", diff=2,
       stem="How many 1-pint jars can be filled from 3 gallons of lemonade?",
       key="24", wrong=["6", "12", "32"],
       expl="A gallon is 4 quarts and a quart is 2 pints, so a gallon is 8 pints. 3 gallons is 3 × 8 = 24 pints. 12 is the number of quarts."),
]
