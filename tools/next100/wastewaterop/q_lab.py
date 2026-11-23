"""Laboratory Analysis: sampling, holding times, BOD, COD, solids, bacteria, WET and process tests."""
SEG = "LAB"
CAT = "wwoLab"

BOD = (8.6 - 4.1) * 300 / 15
assert BOD == 90
TSS = (0.1426 - 0.1393) * 1_000_000 / 100
assert round(TSS) == 33
PORT = 2.6 * 3_000 / (24 * 1.8)
assert round(PORT) == 181
CFU = 38 * 100 / 25
assert CFU == 152

Q = [
    ("An unseeded BOD bottle holds 15 mL of sample. The initial DO is 8.6 mg/L and the DO after 5 days is 4.1 mg/L. What is the BOD?",
     "90 mg/L", ["4.5 mg/L", "172 mg/L", "68 mg/L"],
     "BOD = (initial DO - final DO) x 300 / sample mL = (8.6 - 4.1) x 300 / 15 = 4.5 x 20 = 90 mg/L."),
    ("A 100 mL sample is filtered. The filter weighs 0.1393 g before and 0.1426 g after drying. What is the TSS?",
     "33 mg/L", ["3.3 mg/L", "330 mg/L", "1,426 mg/L"],
     "TSS = dry solids (g) x 1,000,000 / sample mL = 0.0033 x 1,000,000 / 100 = 33 mg/L."),
    ("A flow-proportional composite of 3,000 mL is built from 24 portions. Average flow is 1.8 MGD and the flow at this hour is 2.6 MGD. How many mL should this portion be?",
     "181 mL", ["125 mL", "87 mL", "260 mL"],
     "Portion = instantaneous flow x total volume / (number of portions x average flow) = 2.6 x 3,000 / (24 x 1.8) = 181 mL."),
    ("A membrane filter test on 25 mL of effluent grows 38 colonies. How many CFU per 100 mL is that?",
     "152 CFU/100 mL", ["38 CFU/100 mL", "66 CFU/100 mL", "950 CFU/100 mL"],
     "CFU/100 mL = colonies x 100 / sample mL = 38 x 100 / 25 = 152."),
    ("Under 40 CFR 136.3, a BOD sample must be cooled to 6 degrees C or less and analyzed within:",
     "48 hours", ["15 minutes", "7 days", "28 days"],
     "Table II gives BOD and CBOD a 48-hour holding time with the sample cooled to 6 C or below."),
    ("Fecal coliform or E. coli samples from a wastewater effluent must have incubation started within:",
     "8 hours", ["48 hours", "30 hours", "7 days"],
     "40 CFR 136.3 Table II gives bacterial tests a holding time of 8 hours, cooled below 10 C, with thiosulfate if chlorine may be present."),
    ("Under 40 CFR 136.3, a total suspended solids sample cooled to 6 degrees C or less may be held up to:",
     "7 days", ["8 hours", "48 hours", "6 months"],
     "Table II lists residue, nonfilterable (TSS) at 7 days when cooled to 6 C or below."),
    ("Ammonia and total phosphorus samples that cannot be run right away are preserved by:",
     "Cooling and acid to pH below 2", ["Adding sodium thiosulfate", "Freezing the sample solid", "Adding chlorine to the bottle"],
     "Table II preserves ammonia and total phosphorus with cooling to 6 C and H2SO4 to pH below 2, which allows up to 28 days."),
    ("Dissolved oxygen measured with a probe and water temperature must both be measured:",
     "Within 15 minutes", ["Within 48 hours", "After cooling overnight", "After adding acid to pH 2"],
     "Both change quickly once the sample is taken, so 136.3 calls for analysis within 15 minutes."),
    ("A sample made by combining portions taken through the day, each in proportion to the flow at that time, is a:",
     "Flow-weighted composite", ["Single grab sample", "Split duplicate sample", "Field blank sample"],
     "Flow-proportional composites represent the day's load, which is why most permits require them for BOD and TSS."),
    ("BOD is incubated in the dark mainly so that:",
     "Algae cannot add oxygen", ["The bacteria grow faster", "The bottle stays cool", "Chlorine stays in the sample"],
     "Light would let algae photosynthesize and add oxygen, hiding the oxygen used by bacteria. The test runs 5 days at 20 C in the dark."),
    ("A CBOD test differs from a BOD test because a chemical is added to:",
     "Stop nitrifying bacteria", ["Kill all the bacteria", "Add oxygen to the bottle", "Remove chlorine from the sample"],
     "A nitrification inhibitor keeps ammonia oxidation from adding to the oxygen use, so CBOD measures only carbonaceous demand."),
    ("Chlorinated effluent collected for a BOD test is first:",
     "Dechlorinated and seeded", ["Acidified to pH 2", "Frozen overnight", "Boiled and cooled"],
     "Residual chlorine kills the test bacteria. The sample is dechlorinated and then seeded so there are organisms to use the oxygen."),
    ("The COD test is often used alongside BOD for process control mainly because it:",
     "Gives a result in hours, not days", ["Measures only biodegradable matter", "Needs no chemicals", "Is always lower than BOD"],
     "COD oxidizes organics chemically in about two hours, so it shows load changes the same day. COD is usually higher than BOD."),
    ("Settleable solids are read in an Imhoff cone after letting the sample stand for:",
     "1 hour", ["5 minutes", "24 hours", "5 days"],
     "The settleable solids test measures how many mL/L of solids settle in an Imhoff cone in 60 minutes."),
    ("A whole effluent toxicity (WET) test measures the effect of a plant's effluent on:",
     "Live test organisms", ["The effluent's chlorine demand", "The sludge's settling rate", "The volume of sludge produced"],
     "WET tests expose fathead minnows, Ceriodaphnia or algae to the effluent to see whether it causes death or poorer growth or reproduction."),
    ("A DO meter probe is calibrated before use most often against:",
     "Water-saturated air", ["A pH 7 buffer solution", "A formazin standard", "Distilled water at pH 2"],
     "Probes are commonly calibrated in water-saturated air (or air-saturated water) using the temperature and barometric pressure to set 100 percent saturation."),
    ("A settleometer test of mixed liquor is read over 30 or 60 minutes mainly to see:",
     "How well the sludge settles", ["The BOD of the mixed liquor", "The pH of the mixed liquor", "The coliform count of the sludge"],
     "The settled volume over time shows settling rate, compaction and clarity of the liquid above, and is used for SVI."),
    ("A hand-held hydrogen sulfide meter in a plant's lab and field kit must be:",
     "Bump tested and calibrated", ["Stored submerged in water", "Used only once, then discarded", "Kept switched on all year"],
     "Gas sensors drift and lose sensitivity. A bump test before use and regular calibration confirm the meter will alarm."),
    ("An effluent ammonia result much higher than usual should first be checked by:",
     "Reviewing QC and rerunning it", ["Reporting it without any review", "Discarding the result", "Asking to change the permit limit"],
     "Check the standards, blanks and duplicate, and rerun if possible. If it holds up, it is a real process change that must be reported."),
]
