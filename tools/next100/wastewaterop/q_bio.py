"""Treatment Process Evaluation and Adjustment: activated sludge, nutrient removal, ponds and
fixed film processes. Every calculation is worked here and asserted."""
SEG = "BIO"
CAT = "wwoBiological"

BOD_LB = 1.6 * 140 * 8.34
MLVSS_LB = 0.42 * 2_300 * 8.34
FM = BOD_LB / MLVSS_LB
assert round(BOD_LB) == 1868 and round(MLVSS_LB) == 8056 and round(FM, 2) == 0.23
SVI = 330 * 1_000 / 2_200
assert SVI == 150
MCRT = (9_000 + 1_200) / (950 + 70)
assert MCRT == 10
RAS = 2_400 * 2.2 / (8_400 - 2_400)
assert round(RAS, 2) == 0.88
RET = 0.9 / 2.5 * 100
assert round(RET) == 36
VOL_GAL = 95 * 30 * 14 * 7.48
DT_HR = VOL_GAL / 1_400_000 * 24
assert round(VOL_GAL) == 298_452 and round(DT_HR, 1) == 5.1
TF_LB = 0.75 * 120 * 8.34
TF_KFT3 = 0.785 * 80 ** 2 * 6 / 1_000
TF_OLR = TF_LB / TF_KFT3
assert round(TF_LB, 1) == 750.6 and round(TF_KFT3, 1) == 30.1 and round(TF_OLR) == 25
RR = 1.8 / 1.2
assert RR == 1.5
ALK = 18 * 7.14
assert round(ALK) == 129
WAS_LB = 0.055 * 7_600 * 8.34
assert round(WAS_LB) == 3486

Q = [
    ("Aeration basins receive 1.6 MGD with a BOD of 140 mg/L. The basins hold 0.42 MG at an MLVSS of 2,300 mg/L. What is the F/M ratio?",
     "0.23", ["0.43", "0.12", "4.3"],
     "BOD = 1.6 x 140 x 8.34 = 1,868 lb/day. MLVSS = 0.42 x 2,300 x 8.34 = 8,056 lb. Flipping the fraction would give 4.3. F/M = 1,868 / 8,056 = 0.23."),
    ("A settleometer shows 330 mL/L after 30 minutes and the MLSS is 2,200 mg/L. What is the SVI?",
     "150 mL/g", ["67 mL/g", "15 mL/g", "726 mL/g"],
     "SVI = settled volume (mL/L) x 1,000 / MLSS (mg/L) = 330 x 1,000 / 2,200 = 150 mL/g, a slow-settling sludge."),
    ("An activated sludge system holds 9,000 lb of solids in the aeration tanks and 1,200 lb in the clarifiers. It wastes 950 lb/day and loses 70 lb/day in the effluent. What is the MCRT?",
     "10 days", ["8.8 days", "10.7 days", "9.5 days"],
     "Leaving out the clarifier solids gives 8.8 and leaving out the effluent loss gives 10.7. MCRT = (9,000 + 1,200) / (950 + 70) = 10,200 / 1,020 = 10 days."),
    ("Influent flow is 2.2 MGD, MLSS is 2,400 mg/L and RAS solids are 8,400 mg/L. By solids balance, what return rate is needed?",
     "0.88 MGD", ["0.63 MGD", "1.20 MGD", "0.29 MGD"],
     "RAS = MLSS x flow / (RAS SS - MLSS) = 2,400 x 2.2 / (8,400 - 2,400) = 5,280 / 6,000 = 0.88 MGD."),
    ("A plant returns 0.9 MGD of sludge while the influent is 2.5 MGD. What is the return rate as a percent?",
     "36 percent", ["28 percent", "64 percent", "278 percent"],
     "Return rate = return flow / influent flow x 100 = 0.9 / 2.5 x 100 = 36 percent."),
    ("An aeration basin is 95 ft long, 30 ft wide and 14 ft deep and receives 1.4 MGD. What is the detention time?",
     "5.1 hours", ["3.8 hours", "6.8 hours", "0.2 hours"],
     "Volume = 95 x 30 x 14 x 7.48 = 298,452 gal. Detention = 298,452 / 1,400,000 x 24 = 5.1 hours."),
    ("A trickling filter 80 ft across and 6 ft deep receives 0.75 MGD of primary effluent with a BOD of 120 mg/L. What is the organic loading?",
     "25 lb BOD/day/1,000 cu ft", ["12 lb BOD/day/1,000 cu ft", "41 lb BOD/day/1,000 cu ft", "750 lb BOD/day/1,000 cu ft"],
     "BOD = 0.75 x 120 x 8.34 = 750.6 lb/day. Volume = 0.785 x 80 x 80 x 6 = 30,144 cu ft = 30.1 thousand cu ft. Loading = 750.6 / 30.1 = 25 lb BOD/day per 1,000 cu ft."),
    ("A trickling filter recirculates 1.8 MGD while the primary effluent flow is 1.2 MGD. What is the recirculation ratio?",
     "1.5", ["0.67", "3.0", "2.5"],
     "Recirculation ratio = recirculated flow / primary effluent flow = 1.8 / 1.2 = 1.5."),
    ("A basin must nitrify 18 mg/L of ammonia-nitrogen. At about 7.14 mg/L of alkalinity used per mg/L of ammonia-N, how much alkalinity is consumed?",
     "129 mg/L", ["18 mg/L", "64 mg/L", "250 mg/L"],
     "Alkalinity used = 18 x 7.14 = 129 mg/L as CaCO3. If the influent has less than that plus a residual, the pH will fall and nitrification slows."),
    ("A plant wastes 0.055 MGD of sludge at 7,600 mg/L. How many pounds of solids are wasted per day?",
     "3,486 lb/day", ["418 lb/day", "4,180 lb/day", "348 lb/day"],
     "Pounds = flow (MGD) x concentration (mg/L) x 8.34 = 0.055 x 7,600 x 8.34 = 3,486 lb/day."),
    ("In activated sludge, some sludge must be wasted regularly mainly to:",
     "Hold the sludge age on target", ["Raise the influent BOD", "Keep the effluent warm", "Supply the digester with oxygen"],
     "Bacteria grow every day. Wasting the growth keeps MLSS and mean cell residence time at the target; not wasting lets solids build until they wash out."),
    ("The MLSS in an activated sludge plant rises steadily week after week with no change in load. The operator should:",
     "Increase the wasting rate", ["Reduce the air supply", "Cut the return rate to zero", "Stop wasting entirely"],
     "Rising MLSS means more is growing than is being removed. Wasting more brings the inventory and sludge age back to target."),
    ("A common target for dissolved oxygen in the aeration basin of a conventional activated sludge plant is about:",
     "1 to 3 mg/L", ["About 0.1 mg/L", "8 to 10 mg/L", "15 mg/L or more"],
     "Plants commonly hold about 1 to 3 mg/L, often near 2 mg/L; EPA's inspection manual treats less than 1.0 mg/L as low and nitrification needs about 2. Much lower starves them and favors filaments; much higher wastes blower power."),
    ("A sludge that settles slowly and compacts poorly, with a high SVI and a blanket that rises in the clarifier, is most likely:",
     "Filamentous bulking", ["Pin floc from old sludge", "Rising sludge from denitrification", "Normal mature sludge"],
     "Filaments hold the floc open so it settles and compacts poorly. A high SVI with a rising blanket is the classic sign."),
    ("Filamentous bulking is often linked to which aeration basin condition?",
     "Low dissolved oxygen", ["A very high basin pH", "Too much daily wasting", "A short sludge age"],
     "Several filament types outcompete floc formers when DO is low; low F/M, nutrient shortages and septic feed are other common causes."),
    ("Thick, brown, greasy foam on aeration basins that will not break down is commonly caused by:",
     "Nocardia-type filaments", ["A very young sludge", "Too little aeration air", "A short sludge age with high F/M"],
     "Stable dark foam is often from Nocardia (Gordonia) organisms that favor long sludge ages and grease. Removing foam and shortening sludge age help."),
    ("Crisp white, billowing foam on a basin after a plant startup usually indicates:",
     "Young sludge with a low MLSS", ["An old, overoxidized sludge", "Denitrification in the clarifier", "Too much chlorine"],
     "White suds form when the sludge is young and the F/M is high, as at startup or after heavy wasting. They fade as the MLSS builds."),
    ("Clumps of sludge float to the surface of a secondary clarifier carrying tiny gas bubbles. A likely cause in a nitrifying plant is:",
     "Denitrification", ["Too much sludge wasting", "Filamentous bulking", "Very low influent flow"],
     "Nitrate in sludge that sits too long in the clarifier is turned into nitrogen gas, which floats the sludge. Pulling sludge faster helps."),
    ("Small, dense floc particles leaving in a clear effluent, called pin floc, usually means the sludge is:",
     "Too old", ["Too young", "Short of air", "Overloaded with BOD"],
     "Pin floc forms when the sludge age is long and the F/M is low. Wasting more to shorten the sludge age improves it."),
    ("Extended aeration plants differ from conventional activated sludge plants mainly by having:",
     "A long sludge age", ["No secondary clarifiers", "A short aeration time", "No return sludge pumping"],
     "Extended aeration keeps a long detention and sludge age, so the biomass partly digests itself and produces less sludge."),
    ("In a complete mix activated sludge basin, the influent is:",
     "Mixed through the whole basin", ["Added only at the inlet end of the basin", "Held in the basin until it settles", "Fed in timed batches only"],
     "Complete mix blends the influent through the whole basin, which dilutes shock loads compared with plug flow."),
    ("In an anaerobic/anoxic/aerobic process for nutrient removal, the anaerobic zone is where:",
     "Stored phosphorus is released", ["Ammonia is nitrified to nitrate", "Chlorine is added for disinfection", "Waste sludge is drawn off the system"],
     "Without oxygen or nitrate, phosphate-accumulating organisms take up volatile fatty acids and release phosphorus; they take up more than they released in the aerobic zone."),
    ("Nitrate is fed back to an anoxic zone with an internal recycle so that bacteria can:",
     "Turn nitrate into nitrogen gas", ["Turn ammonia into nitrate", "Release stored phosphorus", "Kill pathogens before the clarifier"],
     "In the anoxic zone, with no free oxygen, bacteria use nitrate's oxygen to break down BOD and release nitrogen gas: denitrification."),
    ("The anoxic zone loses its denitrification and its ORP rises. A likely cause is:",
     "Oxygen carried in by the recycle", ["Too little nitrate in the recycle", "A low aeration DO", "Too much wasting"],
     "Dissolved oxygen in the internal recycle or from over-mixing makes the zone partly aerobic, so bacteria use oxygen instead of nitrate."),
    ("Nitrification slows sharply when the aeration basin:",
     "Is cold or short of alkalinity", ["Has a DO of 2 mg/L", "Keeps a long sludge age", "Holds a pH near 7.5 all day"],
     "Nitrifiers grow slowly and are sensitive to cold, low pH and low alkalinity, so winter and acid conditions cut nitrification."),
    ("To keep nitrification going in winter, an operator usually needs to:",
     "Keep a longer sludge age", ["Waste much more sludge", "Lower the DO to near zero", "Stop pumping return sludge"],
     "Nitrifiers grow more slowly in cold water, so a longer mean cell residence time keeps enough of them in the system."),
    ("A sudden drop in the oxygen uptake rate of mixed liquor along with a rise in effluent BOD may indicate:",
     "A toxic load", ["A healthy, well-fed sludge", "Too much aeration air", "A normal daily swing in load"],
     "Toxic or inhibitory discharges slow respiration. A falling OUR and poorer treatment together point to a toxic slug; check with the pretreatment program."),
    ("In a facultative pond, the upper layer is aerobic mainly because:",
     "Algae and wind supply oxygen", ["Blowers run there all day", "Chlorine is added at the surface", "Sludge is pumped out of it daily"],
     "EPA's pond manual describes algae making oxygen by photosynthesis near the surface, while the bottom sludge layer is anaerobic."),
    ("In a pond with heavy algae, pH and dissolved oxygen are usually highest:",
     "In late afternoon", ["Just before dawn", "Around midnight", "Equally at all hours of the day"],
     "Algae use carbon dioxide and make oxygen in sunlight, so DO and pH peak in the afternoon and fall overnight when only respiration continues."),
    ("A pond operator measures DO just before sunrise because it is then:",
     "At its lowest point", ["At its highest point", "Easiest to sample", "The same as noon"],
     "With no photosynthesis overnight, respiration draws DO down. The dawn reading shows whether the pond risks going anaerobic."),
    ("A mat of duckweed covering a pond is a problem mainly because it:",
     "Shades out the algae", ["Adds too much oxygen to the water", "Lowers the pond's pH below 6", "Removes all of the BOD"],
     "Duckweed shades the water, so algae stop producing oxygen and the pond can turn anaerobic. It is skimmed or broken up."),
    ("A pond often gives off strong odors for a short time in spring because:",
     "The water layers mix as it warms", ["Algae die off in the summer heat", "The inflow to the pond stops in spring", "Chlorine is added to ponds in spring"],
     "Ice cover and stratification hold anaerobic water at the bottom. When it mixes in spring, odorous gases are released until aerobic conditions return."),
    ("In an aerated (mechanically aerated) pond, the oxygen comes mainly from:",
     "Aerators or diffusers", ["Algae alone, in sunlight", "Rain falling on the pond", "The sludge layer on the bottom"],
     "Aerated ponds rely on mechanical or diffused aeration, so they need less area than ponds that depend on algae."),
    ("Burrowing animals and weeds on pond dikes should be controlled mainly because they:",
     "Weaken the dikes", ["Remove BOD from the pond", "Add oxygen to the pond water", "Raise the pond's water level"],
     "Animal burrows and roots open paths for water through the embankment; mowing and control protect the dike."),
    ("Trickling filter growth falling off the media and carried to the clarifier is called:",
     "Sloughing", ["Ponding", "Bulking", "Denitrification"],
     "As the biofilm thickens, the inner layer loses contact with food and oxygen and lets go. Sloughed solids are removed in the secondary clarifier."),
    ("Large numbers of small flies around a trickling filter (Psychoda) can be reduced by:",
     "Keeping the media wet", ["Shutting off the distributor arms", "Lowering the hydraulic load", "Adding air to the secondary clarifier"],
     "EPA's fact sheet lists filter flies with remedies such as flushing the media and keeping it wet, which disrupts the fly breeding cycle."),
    ("Recirculating treated flow back over a trickling filter mainly helps to:",
     "Keep the media wet and dilute loads", ["Settle sludge inside the filter", "Remove phosphorus from the flow", "Disinfect the trickling filter effluent"],
     "Recirculation evens out the hydraulic load, keeps the biofilm wet, flushes excess growth and dilutes strong or toxic influent."),
    ("The first stage of a rotating biological contactor train usually removes most of the:",
     "Carbonaceous BOD", ["Ammonia nitrogen", "Total phosphorus", "Coliform bacteria"],
     "The first stages see the most food and grow heterotrophs that remove BOD; nitrifiers develop in later stages once BOD is low."),
    ("An activated sludge plant receives a sudden high load of septic, sulfide-rich wastewater. The effect most likely seen is:",
     "Filaments and poor settling", ["Better nitrification in the basin", "Pin floc in the effluent", "A lower oxygen demand"],
     "Septic, sulfide-rich feed favors some filaments (such as Thiothrix) and raises oxygen demand, so settling and DO suffer."),
    ("Percent removal of BOD across a plant is 210 mg/L in and 18 mg/L out. What is it?",
     "91 percent", ["86 percent", "88 percent", "96 percent"],
     "Removal = (in - out) / in x 100 = (210 - 18) / 210 x 100 = 91.4, about 91 percent."),
]
REM = (210 - 18) / 210 * 100
assert round(REM) == 91
