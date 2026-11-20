"""Treatment Process: coagulation, settling, filtration, iron and manganese, residuals."""
SEG = "CLF"
CAT = "wtoClarify"

# Worked numbers (WPI formula table conventions), asserted here.
SOR = 1_200_000 / (80 * 20)            # surface overflow, gpd/ft2
assert round(SOR) == 750
DT_GAL = 60 * 20 * 12 * 7.48           # basin volume, gal
DT_HR = DT_GAL / (1_000_000 / 24)      # detention time, hr
assert round(DT_HR, 1) == 2.6
LOAD = 2000 / (20 * 25)                # filter loading, gpm/ft2
assert LOAD == 4.0
RISE = 15 * 12 / 7.48                  # backwash rise, in/min
assert round(RISE) == 24
DROP = (18 / 12) / 3 * 7.48            # drop test, gpm/ft2
assert round(DROP, 1) == 3.7
WEIR = 1_800_000 / 120                 # weir overflow, gpd/ft
assert WEIR == 15_000
BW_GAL = 18 * 22 * 15 * 10             # backwash volume: 18 x 22 ft filter, 15 gpm/ft2, 10 min
assert BW_GAL == 59_400

Q = [
    ("Which step neutralizes the negative charges that keep fine particles apart?",
     "Coagulation", ["Flocculation", "Sedimentation", "Filtration"],
     "Coagulants such as alum or ferric chloride neutralize the negative charge on colloids so they can stick together. Flocculation is the slow mixing that follows and grows the floc."),
    ("What is the purpose of the slow, gentle mixing that follows rapid mix?",
     "Grow larger, heavier floc", ["Dissolve the coagulant", "Strip out dissolved gases", "Raise the pH for settling"],
     "Flocculators turn slowly so destabilized particles collide and grow into floc that settles. Fast mixing at this stage would shear the floc apart."),
    ("As alum forms floc, which raw water property does it use up?",
     "Alkalinity", ["Hardness", "Temperature", "Dissolved oxygen"],
     "Alum reacts with alkalinity to form aluminum hydroxide floc and lowers pH. Water with too little alkalinity may need lime or soda ash added."),
    ("Which bench test is used to pick the best coagulant dose for current raw water?",
     "Jar test", ["Drop test", "Threshold odor test", "Membrane integrity test"],
     "A jar test runs several doses side by side with the plant's mixing and settling times. EPA's CPE handbook treats missing or poor jar testing as a common cause of poor performance."),
    ("A basin is 80 ft long and 20 ft wide and treats 1.2 MGD. What is the surface overflow rate?",
     "750 gpd/sq ft", ["375 gpd/sq ft", "1,500 gpd/sq ft", "600 gpd/sq ft"],
     "Surface overflow rate = flow / surface area = 1,200,000 gpd / (80 x 20 = 1,600 sq ft) = 750 gpd/sq ft."),
    ("A basin 60 ft long, 20 ft wide and 12 ft deep receives 1.0 MGD. What is its detention time?",
     "2.6 hours", ["0.3 hours", "1.3 hours", "3.9 hours"],
     "Volume = 60 x 20 x 12 = 14,400 cu ft x 7.48 = 107,712 gal. Flow = 1,000,000 / 24 = 41,667 gal/hr. 107,712 / 41,667 = 2.6 hours. Leaving out 7.48 gives 0.3 hours."),
    ("An upflow solids-contact clarifier combines which steps in one tank?",
     "Mixing, floc and settling", ["Filtering and disinfecting", "Aerating and softening", "Screening and storing"],
     "Water rises through a blanket of previously formed floc, so mixing, flocculation and clarification happen in one unit."),
    ("Inclined plates or tubes in a settling basin work mainly by:",
     "Adding settling area", ["Speeding up rapid mixing", "Adding oxygen to the water", "Holding back floating scum"],
     "Plate and tube settlers give particles a short fall onto a sloped surface, which multiplies the settling area in the same footprint."),
    ("A 20 ft by 25 ft filter receives 2,000 gpm. What is the filter loading rate?",
     "4.0 gpm/sq ft", ["2.0 gpm/sq ft", "0.25 gpm/sq ft", "8.0 gpm/sq ft"],
     "Filter loading = flow / area = 2,000 gpm / 500 sq ft = 4.0 gpm/sq ft. Dividing area by flow gives 0.25."),
    ("A filter is backwashed at 15 gpm/sq ft. How fast does water rise in the box?",
     "24 in/min", ["2.0 in/min", "112 in/min", "180 in/min"],
     "Rise rate = rate x 12 in/ft / 7.48 gal/cu ft = 15 x 12 / 7.48 = 24 in/min. Leaving out the 12 gives 2.0."),
    ("With the influent closed, a filter's level drops 18 inches in 3 minutes. What is the filtration rate?",
     "3.7 gpm/sq ft", ["0.5 gpm/sq ft", "6.0 gpm/sq ft", "45 gpm/sq ft"],
     "Drop velocity = 1.5 ft / 3 min = 0.5 ft/min. Each foot per minute over 1 sq ft is 7.48 gpm, so 0.5 x 7.48 = 3.7 gpm/sq ft."),
    ("Mudballs building up in filter media are a sign of:",
     "Incomplete backwashing", ["Too much chlorine applied", "Very cold raw water", "Filter runs ending early"],
     "EPA's CPE handbook explains that a filter returned to service with particles still in the media builds mudballs, which block area and raise the rate through the rest."),
    ("Besides reaching its headloss limit, a filter run should end when:",
     "Effluent turbidity rises", ["Clearwell is half full", "Raw water turbidity falls", "Coagulant tank is refilled"],
     "A run ends at its headloss limit, its time limit or when effluent turbidity starts to break through, whichever comes first."),
    ("Filter-to-waste after a backwash is used to:",
     "Divert early, cloudy water", ["Recover spent wash water", "Ripen floc in the basin", "Raise the filter's headloss"],
     "The first water through a freshly washed filter carries a turbidity spike. Sending it to waste keeps it out of the clearwell until the filter ripens."),
    ("EPA's optimization goal for each filter's effluent turbidity, 95% of the time, is no more than:",
     "0.10 NTU", ["0.30 NTU", "1.0 NTU", "0.50 NTU"],
     "AWOP sets a 95th percentile goal of 0.10 NTU for individual and combined filter effluent. 0.3 NTU is the regulatory limit, not the optimization goal."),
    ("For conventional filtration, combined filter effluent may never be above:",
     "1 NTU", ["0.3 NTU", "5 NTU", "0.1 NTU"],
     "40 CFR 141 sets two turbidity limits for conventional and direct filtration: 0.3 NTU or less in 95% of monthly readings and never above 1 NTU."),
    ("Combined filter effluent must be at or below 0.3 NTU in what share of each month's readings?",
     "95 percent", ["90 percent", "99 percent", "75 percent"],
     "The rule is 0.3 NTU or less in at least 95 percent of the measurements taken each month, with no reading above 1 NTU."),
    ("In a slow sand filter, most removal happens in a biological top layer called the:",
     "Schmutzdecke", ["Underdrain", "Support gravel", "Anthracite cap"],
     "The schmutzdecke is a living film on the sand surface that strains and breaks down particles and microbes. It forms over days after the filter is cleaned."),
    ("How is a slow sand filter cleaned?",
     "Scraping off the top layer", ["High-rate backwashing", "Air scour and surface wash", "Adding filter aid polymer"],
     "Slow sand filters are not backwashed. When headloss gets too high the top inch or so of sand is scraped off and the filter is refilled slowly."),
    ("In diatomaceous earth filtration, what is applied before filtering begins?",
     "Precoat on the septum", ["Polymer on the anthracite", "Alum in the clearwell", "Lime to the underdrain"],
     "40 CFR 141.2 describes DE filtration as a precoat cake deposited on a support membrane, then body feed added while water is filtered through it."),
    ("Direct filtration leaves out which step of conventional treatment?",
     "Settling", ["Coagulation", "Disinfection", "Rapid mix"],
     "Direct filtration coagulates and usually flocculates, then sends water straight to the filters with no settling basin, so it suits low-turbidity sources."),
    ("Which membrane process removes dissolved salts most completely?",
     "Reverse osmosis", ["Microfiltration", "Ultrafiltration", "Microscreening"],
     "Reverse osmosis has the tightest membranes and rejects dissolved ions. Micro and ultrafiltration remove particles and microbes but pass most dissolved salts."),
    ("Rising transmembrane pressure at steady flow usually means the membrane is:",
     "Fouling", ["Breached", "Overcleaned", "Underloaded"],
     "As foulants build up, more pressure is needed to push the same flow through, so TMP rises until the membrane is backwashed or cleaned. A breach would lower resistance, not raise it."),
    ("Dissolved iron and manganese are usually removed by:",
     "Oxidize, then filter", ["Add ammonia, then settle", "Add fluoride, then settle", "Add acid, then store"],
     "Oxidants such as chlorine, permanganate or air turn dissolved iron and manganese into particles that settle or are caught on filters."),
    ("Which oxidant is often fed ahead of filters to remove manganese?",
     "Potassium permanganate", ["Sodium hexametaphosphate", "Sodium bicarbonate", "Aluminum sulfate"],
     "EPA's oxidants manual describes permanganate oxidizing soluble manganese to manganese dioxide, which the filters then remove."),
    ("Customers report pink water soon after a treatment change. The likely cause is:",
     "Permanganate overfeed", ["Coagulant overfeed", "Fluoride overfeed", "Lime slurry carryover"],
     "Unreacted permanganate is purple to pink. An overfeed passes through the plant and shows up at taps, so the dose should be trimmed to the oxidant demand."),
    ("Manganese above its 0.05 mg/L secondary level mainly causes:",
     "Black stains", ["Rotten egg odor", "Blue-green stains", "Milky white water"],
     "Oxidized manganese leaves black or brown stains on laundry and fixtures. Blue-green stains point to copper, rotten eggs to hydrogen sulfide."),
    ("Treatment plant sludge is commonly thickened or dewatered in:",
     "Lagoons or drying beds", ["Rapid mix basins", "Covered clearwells", "Elevated storage tanks"],
     "Residuals from settling basins and backwash are thickened and dewatered in lagoons, drying beds or mechanical units before disposal or land application."),
    ("Under 40 CFR 141.76, recycled spent backwash water must be returned:",
     "Back through full treatment", ["Straight into the clearwell", "Only to the last filter", "After the settling basins"],
     "The recycle rule requires recycled backwash, thickener supernatant and dewatering liquids to pass back through the existing conventional or direct filtration processes."),
    ("An earthy or musty taste from algae in the source is usually caused by:",
     "Geosmin and MIB", ["Chloramines and nitrate", "Iron and manganese", "Calcium and magnesium"],
     "Geosmin and 2-methylisoborneol (MIB) are made by algae and other organisms and are tasted at very low levels. EPA's oxidants manual covers oxidation and activated carbon for these taste and odor compounds."),
    ("An 18 ft by 22 ft filter is washed at 15 gpm/sq ft for 10 minutes. How much water is used?",
     "59,400 gal", ["5,940 gal", "39,600 gal", "3,960 gal"],
     "Area = 18 x 22 = 396 sq ft. 396 x 15 gpm/sq ft = 5,940 gpm, x 10 minutes = 59,400 gal."),
    ("A basin has 120 ft of effluent weir and treats 1.8 MGD. What is the weir overflow rate?",
     "15,000 gpd/ft", ["1,500 gpd/ft", "7,500 gpd/ft", "30,000 gpd/ft"],
     "Weir overflow rate = flow / weir length = 1,800,000 gpd / 120 ft = 15,000 gpd per foot of weir."),
]
