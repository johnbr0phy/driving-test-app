"""Treatment Process: disinfection, CT, DBPs, chemical feed and dosage math."""
SEG = "DIS"
CAT = "wtoDisinfect"

CT1 = 1.2 * 40
assert CT1 == 48
T_NEED = 60 / 1.5
assert T_NEED == 40
FEED_GAS = 2.0 * 1.5 * 8.34
assert round(FEED_GAS, 1) == 25.0
FEED_HTH = 3.0 * 0.8 * 8.34 / 0.65
assert round(FEED_HTH, 1) == 30.8
DOSE = 40 / (2.0 * 8.34)
assert round(DOSE, 1) == 2.4 and round(DOSE - 0.6, 1) == 1.8
CL_LB = 50 * 8.34 * 0.125
assert round(CL_LB) == 52
DIL = 100 * 2 / 12
assert round(DIL, 1) == 16.7
STROKE = 30 / 120 * 100
assert STROKE == 25
SAT = 500 * 1.0 / 18_000
assert round(SAT, 3) == 0.028
FEED_ALUM = 25 * 3.5 * 8.34 / 1.0
assert round(FEED_ALUM) == 730

Q = [
    ("Which form of free chlorine is the stronger disinfectant?",
     "Hypochlorous acid", ["Hypochlorite ion", "Nitrogen trichloride", "Chlorine dioxide"],
     "HOCl kills microbes far faster than the OCl- ion. EPA's oxidants manual notes HOCl dominates at low pH, which is why chlorine works better there."),
    ("As water pH rises from 7 to 9, free chlorine's disinfecting power:",
     "Decreases", ["Increases", "Stays the same", "Doubles"],
     "Higher pH shifts free chlorine from HOCl to the weaker OCl- ion, so more CT is needed at pH 9 than at pH 7."),
    ("A residual of 1.2 mg/L is held for 40 minutes. What is the CT value?",
     "48 mg-min/L", ["33 mg-min/L", "41 mg-min/L", "4.8 mg-min/L"],
     "CT = residual concentration x contact time = 1.2 mg/L x 40 min = 48 mg-min/L. Dividing 40 by 1.2 gives 33."),
    ("A required CT is 60 mg-min/L and the residual is 1.5 mg/L. How much contact time is needed?",
     "40 minutes", ["90 minutes", "58.5 minutes", "30 minutes"],
     "Time = CT / residual = 60 / 1.5 = 40 minutes. Multiplying instead gives 90."),
    ("The disinfectant residual entering the distribution system may not be below 0.2 mg/L for more than:",
     "4 hours", ["1 hour", "24 hours", "8 hours"],
     "40 CFR 141.72 says the residual entering the distribution system cannot be less than 0.2 mg/L for more than 4 hours."),
    ("Filtered surface water systems must achieve at least how much Giardia removal and inactivation?",
     "3-log (99.9%)", ["2-log (99%)", "4-log (99.99%)", "1-log (90%)"],
     "The Surface Water Treatment Rule requires 99.9 percent (3-log) removal and inactivation of Giardia lamblia cysts. 4-log is the virus requirement."),
    ("The Surface Water Treatment Rule requires what combined removal and inactivation of viruses?",
     "99.99 percent", ["99.999 percent", "99.9 percent", "99 percent"],
     "40 CFR 141.70 requires at least 99.99 percent (4-log) removal and inactivation of viruses, one log more than for Giardia."),
    ("The maximum residual disinfectant level for chlorine is:",
     "4.0 mg/L", ["0.8 mg/L", "2.0 mg/L", "1.0 mg/L"],
     "40 CFR 141.65 sets the MRDL at 4.0 mg/L as Cl2 for chlorine and for chloramines. 0.8 mg/L is the chlorine dioxide MRDL."),
    ("Which disinfectant has an MRDL of 0.8 mg/L?",
     "Chlorine dioxide", ["Monochloramine", "Free chlorine", "Calcium hypochlorite"],
     "Chlorine dioxide's MRDL is 0.8 mg/L as ClO2. Chlorine and chloramines are both 4.0 mg/L as Cl2."),
    ("On a chlorine demand curve, free residual starts to build after the:",
     "Breakpoint", ["Isoelectric point", "Saturation point", "Titration endpoint"],
     "Chlorine first reacts with ammonia and other demand. Past the breakpoint, added chlorine shows up as a free residual."),
    ("Monochloramine is the main product when the chlorine to ammonia-nitrogen weight ratio stays at or below about:",
     "5 to 1", ["10 to 1", "15 to 1", "1 to 5"],
     "EPA's oxidants manual says monochloramine dominates below a 5:1 Cl2:N ratio. Above 5:1 the breakpoint reaction starts to destroy the residual, and past about 7.6:1 free chlorine appears."),
    ("Why do many systems use chloramines in the distribution system?",
     "Longer life, fewer THMs", ["Faster kill of Giardia", "No CT tracking needed", "Removes iron and manganese"],
     "Chloramines are weaker but last longer in pipes and form far fewer trihalomethanes than free chlorine. They are too slow to rely on for primary Giardia inactivation."),
    ("Trihalomethanes form when chlorine reacts with:",
     "Natural organic matter", ["Dissolved oxygen gas", "Calcium carbonate hardness", "Dissolved iron salts"],
     "THMs and HAAs form from chlorine reacting with natural organic matter such as humic material, so removing precursors before chlorination lowers them."),
    ("What is the MCL for total trihalomethanes?",
     "0.080 mg/L", ["0.060 mg/L", "0.010 mg/L", "0.80 mg/L"],
     "40 CFR 141.64 sets TTHM at 0.080 mg/L and HAA5 at 0.060 mg/L, as locational running annual averages."),
    ("Bromate, limited to 0.010 mg/L, is a byproduct of which disinfectant?",
     "Ozone", ["Chloramines", "UV light", "Chlorine dioxide"],
     "Ozone oxidizes bromide in the source water to bromate. Chlorine dioxide's regulated byproduct is chlorite."),
    ("The main drawback of UV as the only disinfectant is that it:",
     "Leaves no lasting residual", ["Forms bromate", "Raises THM levels", "Needs long contact basins"],
     "UV acts only while water passes the lamps, so a chemical disinfectant is still needed to keep a residual in the distribution system."),
    ("UV light inactivates microorganisms by:",
     "Damaging their DNA and RNA", ["Oxidizing their cell walls", "Heating their proteins", "Raising the water's pH"],
     "UV is absorbed by nucleic acids and stops organisms from reproducing. It is a physical process, not an oxidant."),
    ("How many lb/day of chlorine gas gives a 2.0 mg/L dose to 1.5 MGD?",
     "25.0 lb/day", ["12.5 lb/day", "3.0 lb/day", "50.0 lb/day"],
     "Feed rate = dose x flow x 8.34 = 2.0 x 1.5 x 8.34 = 25.0 lb/day. Gas chlorine is treated as 100 percent available."),
    ("How many lb/day of 65% calcium hypochlorite gives 3.0 mg/L to 0.8 MGD?",
     "30.8 lb/day", ["20.0 lb/day", "13.0 lb/day", "2.4 lb/day"],
     "Feed rate = 3.0 x 0.8 x 8.34 / 0.65 = 30.8 lb/day. Forgetting the purity gives 20.0, multiplying by 0.65 gives 13.0."),
    ("A plant feeds 40 lb/day of chlorine to 2.0 MGD and has a 0.6 mg/L residual. What is the chlorine demand?",
     "1.8 mg/L", ["2.4 mg/L", "3.0 mg/L", "1.2 mg/L"],
     "Dose = 40 / (2.0 x 8.34) = 2.4 mg/L. Demand = dose minus residual = 2.4 - 0.6 = 1.8 mg/L."),
    ("About how many pounds of chlorine are in 50 gal of 12.5% hypochlorite, using 8.34 lb/gal?",
     "52 lb", ["6.3 lb", "417 lb", "26 lb"],
     "Chlorine = 50 gal x 8.34 lb/gal x 0.125 = 52 lb. Leaving out 8.34 gives 6.3."),
    ("How many gallons of 12% hypochlorite make 100 gallons of a 2% solution?",
     "16.7 gal", ["6.0 gal", "24.0 gal", "8.3 gal"],
     "C1 x V1 = C2 x V2, so V1 = 100 x 2 / 12 = 16.7 gal of 12% solution, topped up with water to 100 gal."),
    ("A metering pump has a 120 gpd maximum and 30 gpd is wanted. What stroke setting is needed?",
     "25 percent", ["40 percent", "4 percent", "75 percent"],
     "% stroke = desired flow / maximum flow x 100 = 30 / 120 x 100 = 25 percent."),
    ("Which fluoride chemical is fed through a saturator?",
     "Sodium fluoride", ["Fluorosilicic acid", "Calcium fluoride", "Sodium fluorosilicate"],
     "A saturator dissolves sodium fluoride crystals to a steady 18,000 mg/L solution, which is the concentration the WPI formula table uses."),
    ("A 500 gpm plant doses 1.0 mg/L fluoride from a saturator. What is the saturator feed rate?",
     "0.028 gpm", ["0.28 gpm", "36 gpm", "0.0028 gpm"],
     "Feed = plant flow x dose / 18,000 mg/L = 500 x 1.0 / 18,000 = 0.028 gpm, about 1.7 gallons per hour."),
    ("A negative Langelier Saturation Index means the water tends to:",
     "Dissolve carbonate", ["Deposit calcium scale", "Hold a stable film", "Lose its chlorine"],
     "LSI = pH - pHs. A negative value means the water is undersaturated and will dissolve carbonate and corrode. A positive value means it tends to scale."),
    ("Which chemical raises both pH and alkalinity?",
     "Soda ash", ["Ferric chloride", "Carbon dioxide", "Aluminum sulfate"],
     "Soda ash (sodium carbonate) adds carbonate alkalinity and raises pH. Ferric chloride and alum consume alkalinity, and carbon dioxide lowers pH."),
    ("In a vacuum-type gas chlorinator, the vacuum is created by:",
     "Water through the ejector", ["Cylinder gas pressure itself", "A booster air blower", "The rotameter float"],
     "Water rushing through the ejector (eductor) pulls a vacuum that draws gas from the regulator. If the water stops, the vacuum is lost and the regulator closes."),
    ("Sodium hypochlorite solution loses strength fastest when it is stored:",
     "Warm and in sunlight", ["Cool and shaded", "In closed opaque drums", "At a weaker strength"],
     "Hypochlorite breaks down with time, heat and light, and stronger solutions decay faster. Store it cool, dark and for short periods."),
    ("For CT, contact time (T10) is the time it takes for what share of the water to pass?",
     "10 percent", ["50 percent", "90 percent", "100 percent"],
     "T10 is the time for 10 percent of a tracer to pass through, so 90 percent of the water stays at least that long. EPA's SWTR guidance uses it for CT."),
    ("Baffles added to a clearwell improve disinfection by:",
     "Cutting short-circuiting", ["Lowering the pH", "Reducing chlorine demand", "Cooling the stored water"],
     "Baffles make water follow a longer, more even path, which raises T10 and so the CT achieved with the same residual."),
    ("What is the alum feed in lb/day for a 25 mg/L dose at 3.5 MGD, as dry alum?",
     "730 lb/day", ["88 lb/day", "209 lb/day", "7,300 lb/day"],
     "Feed rate = dose x flow x 8.34 = 25 x 3.5 x 8.34 = 730 lb/day. Leaving out 8.34 gives 88."),
]
