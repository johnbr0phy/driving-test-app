"""Treatment Process Evaluation and Adjustment: preliminary and primary treatment, tertiary
filtration, disinfection and dechlorination, solids treatment and disposal, effluent disposal
and chemical dosing. Every calculation is worked here and asserted."""
SEG = "PRC"
CAT = "wwoProcess"

CL_FEED = 3.4 * 9 * 8.34
assert round(CL_FEED) == 255
HYPO = 0.85 * 6 * 8.34 / 0.125
assert round(HYPO) == 340
SOR = 1_900_000 / (0.785 * 55 ** 2)
assert round(SOR) == 800
PRIM_V = 0.785 * 50 ** 2 * 11 * 7.48
PRIM_DT = PRIM_V / 1_300_000 * 24
assert int(PRIM_V + 0.5) == 161_475 and round(PRIM_DT, 1) == 3.0
VSR = (0.72 - 0.55) / (0.72 - 0.72 * 0.55) * 100
assert round(VSR) == 52
TS = (25.62 - 24.80) / (61.30 - 24.80) * 100
assert round(TS, 1) == 2.2
FILT = 1_150_000 / 1_440 / (2 * 14 * 22)
assert round(FILT, 2) == 1.30
DOSE_TO_RES = 11 - 4
assert DOSE_TO_RES == 7
REM_TSS = (240 - 96) / 240 * 100
assert REM_TSS == 60
MLMIN = 0.6 * 18 * 3.785 * 1_000_000 / (1_340 * 0.40 * 1_440)
assert round(MLMIN) == 53
LOAD_TSS = 2.8 * 22 * 8.34
assert round(LOAD_TSS) == 514

Q = [
    ("A plant treats 3.4 MGD and wants a chlorine dose of 9 mg/L using 100 percent chlorine gas. What feed rate is needed?",
     "255 lb/day", ["28 lb/day", "31 lb/day", "2,128 lb/day"],
     "Feed = dose x MGD x 8.34 = 9 x 3.4 x 8.34 = 255 lb/day."),
    ("A plant feeding 12.5 percent sodium hypochlorite needs a 6 mg/L dose at 0.85 MGD. How many pounds of solution-strength product per day does it take?",
     "340 lb/day", ["43 lb/day", "53 lb/day", "4,253 lb/day"],
     "Pounds of available chlorine = 6 x 0.85 x 8.34 = 42.5 lb/day. Dividing by 0.125 purity gives 340 lb/day of product."),
    ("A circular primary clarifier is 55 ft across and receives 1.9 MGD. What is the surface overflow rate?",
     "800 gpd/sq ft", ["200 gpd/sq ft", "1,100 gpd/sq ft", "0.80 gpd/sq ft"],
     "Area = 0.785 x 55 x 55 = 2,375 sq ft. Overflow = 1,900,000 / 2,375 = 800 gpd/sq ft."),
    ("A primary clarifier is 50 ft in diameter and 11 ft deep and receives 1.3 MGD. What is the detention time?",
     "3.0 hours", ["2.2 hours", "4.1 hours", "0.12 hours"],
     "Volume = 0.785 x 50 x 50 x 11 x 7.48 = 161,475 gal. Detention = 161,475 / 1,300,000 x 24 = 3.0 hours."),
    ("Digester feed sludge is 72 percent volatile and the digested sludge is 55 percent volatile. What is the volatile solids reduction?",
     "52 percent", ["17 percent", "24 percent", "76 percent"],
     "VS reduction = (In - Out) / (In - In x Out) x 100 = Subtracting the percents would give 17. VS reduction = (0.72 - 0.55) / (0.72 - 0.396) x 100 = 52 percent."),
    ("A sludge sample in a 24.80 g dish weighs 61.30 g wet and 25.62 g dry. What is the total solids content?",
     "2.2 percent", ["1.3 percent", "41.8 percent", "97.8 percent"],
     "Total solids = (dry - tare) / (wet - tare) x 100 = 0.82 / 36.50 x 100 = 2.2 percent."),
    ("Two tertiary filters, each 14 ft by 22 ft, together treat 1.15 MGD. What is the filtration rate?",
     "1.30 gpm/sq ft", ["2.59 gpm/sq ft", "0.65 gpm/sq ft", "3,734 gpm/sq ft"],
     "Flow = 1,150,000 / 1,440 = 799 gpm. Area = 2 x 14 x 22 = 616 sq ft. Using one filter's area would give 2.59. Rate = 799 / 616 = 1.30 gpm/sq ft."),
    ("The chlorine dose at a plant is 11 mg/L and the residual after contact is 4 mg/L. What is the chlorine demand?",
     "7 mg/L", ["15 mg/L", "2.75 mg/L", "4 mg/L"],
     "Demand = dose - residual = 11 - 4 = 7 mg/L."),
    ("A primary clarifier receives 240 mg/L of TSS and its effluent carries 96 mg/L. What is the TSS removal?",
     "60 percent", ["40 percent", "71 percent", "150 percent"],
     "Removal = (240 - 96) / 240 x 100 = 60 percent, a normal range for primary settling."),
    ("A 0.6 MGD flow needs 18 mg/L of a 40 percent ferric chloride solution with a density of 1,340 mg/mL. What is the metering pump setting?",
     "53 mL/min", ["21 mL/min", "71 mL/min", "130 mL/min"],
     "mL/min = MGD x dose x 3.785 x 1,000,000 / (density x purity x 1,440) = 0.6 x 18 x 3,785,000 / (1,340 x 0.40 x 1,440) = 53 mL/min."),
    ("A plant's primary effluent of 2.8 MGD carries 22 mg/L of TSS. How many pounds of TSS go to secondary treatment each day?",
     "514 lb/day", ["62 lb/day", "2,350 lb/day", "51 lb/day"],
     "Loading = MGD x mg/L x 8.34 = 2.8 x 22 x 8.34 = 514 lb/day."),
    ("Primary clarification is expected to remove:",
     "Most settleable solids and some BOD", ["Most of the dissolved BOD", "Most of the ammonia", "Most of the pathogens"],
     "Primary settling takes out settleable solids and floatables, which also removes part of the BOD. Dissolved material passes on to secondary treatment."),
    ("Primary sludge is pumped often in small amounts mainly so it:",
     "Stays thick but fresh", ["Becomes as thin as possible", "Grows more bacteria in the hopper", "Floats to the clarifier surface"],
     "Waiting too long lets sludge go septic and gas-lifted; pumping too fast draws thin sludge. Frequent short pumping keeps it thick and fresh."),
    ("Black, foul-smelling primary sludge with gas bubbles rising to the clarifier surface means the sludge is:",
     "Septic from sitting too long", ["Too thin from over-pumping", "Fully digested and stable", "Overloaded with chlorine from upstream"],
     "Sludge held too long in the hopper goes anaerobic, makes gas and floats. Pump more often."),
    ("Under 40 CFR 133.102, secondary treatment means a 30-day average effluent BOD5 of no more than:",
     "30 mg/L", ["45 mg/L", "25 mg/L", "10 mg/L"],
     "The 7-day average limit is 45 mg/L; the 30-day average limit for BOD5 and TSS is 30 mg/L."),
    ("Under the federal secondary treatment rule, the 30-day average removal of BOD5 and TSS must be at least:",
     "85 percent", ["65 percent", "95 percent", "50 percent"],
     "The equivalent-to-secondary rule in 133.105 allows 65 percent, but 40 CFR 133.102 requires at least 85 percent removal as a 30-day average."),
    ("For secondary treatment, the 7-day average effluent TSS may not exceed:",
     "45 mg/L", ["30 mg/L", "65 mg/L", "15 mg/L"],
     "133.102 sets TSS at 30 mg/L for the 30-day average and 45 mg/L for the 7-day average."),
    ("Unless the plant qualifies for an exception, secondary effluent pH must stay within:",
     "6.0 to 9.0", ["6.5 to 8.5", "5.0 to 10.0", "7.0 to 8.0"],
     "40 CFR 133.102(c) keeps effluent pH between 6.0 and 9.0. The 6.5 to 8.5 range is a drinking water secondary level."),
    ("Where a permit lets CBOD5 replace BOD5 for secondary treatment, the 30-day average limit is:",
     "25 mg/L", ["30 mg/L", "40 mg/L", "20 mg/L"],
     "Under 133.102, CBOD5 may be used in place of BOD5 at 25 mg/L (30-day) and 40 mg/L (7-day), since it leaves out the nitrogen demand."),
    ("Chlorine is added to secondary effluent and held in a baffled contact tank mainly to:",
     "Give pathogens enough contact time", ["Settle the remaining fine solids", "Add oxygen to the effluent", "Remove ammonia before discharge"],
     "Disinfection depends on residual and time. Baffles stop short circuiting so all the water gets its contact time."),
    ("Ammonia in a poorly nitrified effluent reacts with added chlorine to form:",
     "Combined chlorine", ["Free chlorine only", "Hydrogen sulfide gas", "Nitrate nitrogen"],
     "Chlorine combines with ammonia to make chloramines, which disinfect more slowly. More chlorine or longer contact is needed."),
    ("Sodium bisulfite is dosed after chlorine contact. The effluent chlorine residual reads above the permit limit. The operator should:",
     "Raise the bisulfite feed", ["Raise the chlorine feed", "Cut the bisulfite feed", "Add more alum upstream"],
     "Bisulfite reacts with the remaining chlorine. A residual still above the limit means too little dechlorinating chemical is being fed."),
    ("Overdosing a dechlorination chemical can harm the effluent mainly by:",
     "Lowering its dissolved oxygen", ["Adding chlorine back to it", "Raising its temperature", "Turning the receiving water green"],
     "Excess sulfite reacts with oxygen in the water, so an overdose can lower dissolved oxygen and pH in the discharge."),
    ("UV disinfection works poorly when the effluent has high:",
     "Turbidity or particles", ["Dissolved oxygen levels", "Water temperature in summer", "Flow at night"],
     "Particles shield microorganisms from the light and absorb UV. EPA notes high TSS can make UV ineffective, so good clarification comes first."),
    ("Low-pressure UV lamps disinfect mainly with light near:",
     "254 nanometers", ["550 nanometers", "100 nanometers", "800 nanometers"],
     "EPA notes low-pressure mercury lamps emit mainly at 253.7 nm, close to the wavelength DNA absorbs best."),
    ("The UV dose an organism receives in a UV channel depends on the light intensity and:",
     "How long it is exposed", ["The effluent's chlorine residual", "The effluent's nitrate level", "The blower discharge pressure"],
     "Dose is intensity times exposure time. EPA notes UV performance depends on the intensity, the time organisms are exposed and the wastewater itself, so high flow (less time) or low intensity lowers the dose."),
    ("A tertiary filter's effluent turbidity rises before its head loss limit is reached. The filter should be:",
     "Backwashed early", ["Run until head loss peaks", "Fed more flow", "Taken off-line for a year"],
     "Breakthrough shows the media is no longer holding solids. Ending the run and backwashing protects effluent quality."),
    ("Adding a small dose of coagulant ahead of a tertiary filter mainly helps it to:",
     "Catch fine particles", ["Grow more bacteria on the media", "Raise the pH of the effluent", "Remove nitrate from the flow"],
     "A coagulant destabilizes fine particles so they stick to the media or form small floc the filter can remove."),
    ("Alum or ferric chloride added for phosphorus removal works mainly by:",
     "Precipitating the phosphate", ["Turning phosphate into a gas", "Feeding phosphorus to the bacteria", "Raising the alkalinity of the flow"],
     "The metal combines with phosphate to form a precipitate that settles with the sludge."),
    ("Starting alum or ferric feed for phosphorus removal usually means the plant must also plan for:",
     "More sludge to handle", ["Less polymer at the press", "Higher effluent ammonia", "A shorter chlorine contact time"],
     "The metal phosphate and metal hydroxide precipitates add solids, so the plant wastes and dewaters more sludge once chemical feed starts."),
    ("A nitrifying plant's aeration pH keeps falling below 6.5. A common fix is to feed:",
     "An alkaline chemical such as lime", ["Ferric chloride solution", "Sodium bisulfite solution", "Chlorine gas through an ejector"],
     "Nitrification uses alkalinity. Adding an alkaline chemical restores alkalinity and pH so nitrifiers keep working."),
    ("Polymer overdosed to a belt filter press most often shows up as:",
     "Slimy sludge that blinds the belt", ["A drier, crumbly cake", "Clearer filtrate than ever", "Lower polymer cost per ton"],
     "Too much polymer leaves sticky, slimy sludge that coats and blinds the belt and drains poorly. Dose to the floc, not past it."),
    ("Polymer is added to sludge before a belt press or centrifuge mainly to:",
     "Build floc that drains well", ["Raise the sludge's BOD", "Kill pathogens in the cake", "Lower the cake's solids content"],
     "Polymer bridges small particles into larger, stronger floc so free water drains or is spun out."),
    ("Wet, sticky cake from a belt filter press with good polymer feed is often fixed by:",
     "Slowing the belt or the feed", ["Speeding up the belt", "Turning off the polymer feed", "Adding chlorine to the sludge feed"],
     "More time in the gravity and pressure zones removes more water. Too much sludge for the belt speed leaves a wet cake."),
    ("An aerobic digester's pH drops over several weeks of long aeration. A likely cause is:",
     "Nitrification", ["Too little aeration air", "Too much lime added", "Grit building up in the digester"],
     "Long aeration nitrifies ammonia released by digestion, which consumes alkalinity and drops pH; alkalinity may need to be added."),
    ("The federal biosolids rule counts a sludge as vector-attraction reduced when its volatile solids mass is cut by at least:",
     "38 percent", ["15 percent", "50 percent", "75 percent"],
     "40 CFR 503.33(b)(1) sets a minimum 38 percent reduction of volatile solids. Other options include SOUR, pH 12 and drying to 75 or 90 percent solids."),
]
