# Chemical and Physical Foundations of Biological Systems. Original items and passages.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)
# Per test: FC4 12, FC5 18. Four passages (5, 6, 5, 6 questions) and 8 discrete questions.
from math import log10, sqrt

F4, F5 = "mcatFc4", "mcatFc5"
FARADAY = 96485

STIMULI = [
    {"id": "MCAT-T1-CP-P1", "title": "Passage 1: Flow through a narrowed artery", "text": (
        "A team of researchers built a bench model of a carotid artery partly blocked by plaque. They treated blood as an "
        "incompressible fluid of density 1,060 kg/m³ flowing steadily through a rigid horizontal tube. Upstream of the "
        "plaque the tube has a radius of 4.0 mm and the mean flow speed is 0.30 m/s. Over a short segment the plaque narrows "
        "the radius to 2.0 mm.\n\n"
        "For an ideal fluid, the continuity equation (A1v1 = A2v2) and Bernoulli's equation (P + ½ρv² + ρgh is constant "
        "along a streamline) describe the flow. Real blood is viscous, and in long vessels the researchers used Poiseuille's "
        "law instead:\n\n"
        "Q = πΔP r⁴ / (8ηL)\n\n"
        "where Q is the volume flow rate, ΔP the pressure difference along a vessel of length L and radius r, and η the "
        "viscosity of the fluid. The team noted that a short stenosis mainly raises the local speed, while narrowing along a "
        "long vessel mainly raises resistance.")},
    {"id": "MCAT-T1-CP-P2", "title": "Passage 2: The bicarbonate buffer", "text": (
        "Most of the carbon dioxide made by tissues is carried in blood as bicarbonate:\n\n"
        "CO2(aq) + H2O ⇌ H2CO3 ⇌ H⁺ + HCO3⁻\n\n"
        "Red blood cells contain carbonic anhydrase, which speeds the first step. Because H2CO3 is present only in tiny "
        "amounts, clinicians treat dissolved CO2 as the acid and use an apparent pKa of 6.1:\n\n"
        "pH = 6.1 + log([HCO3⁻] / [CO2])\n\n"
        "Dissolved CO2 (in mM) equals 0.03 times the arterial partial pressure of CO2 (PaCO2, in mmHg). The lungs can change "
        "PaCO2 within minutes; the kidneys adjust bicarbonate over hours to days. Arterial values for four hypothetical "
        "patients are shown below.\n\n"
        "| Patient | PaCO2 (mmHg) | HCO3⁻ (mM) |\n|---|---|---|\n| W | 40 | 24 |\n| X | 80 | 24 |\n| Y | 40 | 12 |\n| Z | 20 | 24 |")},
    {"id": "MCAT-T1-CP-P3", "title": "Passage 3: A membrane as a concentration cell", "text": (
        "A resting neuron membrane that is permeable mainly to K⁺ behaves like a concentration cell. At 37 °C the "
        "equilibrium potential for an ion of charge z is given by the Nernst equation:\n\n"
        "E = (61.5 mV / z) log([ion]outside / [ion]inside)\n\n"
        "In one experiment, students placed a cultured cell with 150 mM K⁺ inside in a bath with 5 mM K⁺ and measured the "
        "potential across its membrane with a microelectrode connected to a voltmeter. Before the run they checked the "
        "voltmeter against a zinc-copper galvanic cell, whose standard cell potential is +1.10 V for a reaction that transfers "
        "2 electrons.\n\n"
        "The lipid bilayer also stores charge like a parallel-plate capacitor. Its capacitance is about 1 µF for each square "
        "centimeter of membrane, and the charge it holds is Q = CV.")},
    {"id": "MCAT-T1-CP-P4", "title": "Passage 4: Making and purifying aspirin", "text": (
        "Students made aspirin (acetylsalicylic acid, 180 g/mol) by heating salicylic acid (138 g/mol) with excess acetic "
        "anhydride and a few drops of sulfuric acid. Salicylic acid has a carboxylic acid group and a phenolic hydroxyl "
        "group on a benzene ring; the reaction converts one of them to an acetate ester and releases acetic acid.\n\n"
        "Procedure:\n\n"
        "1. React 2.76 g of salicylic acid, then add cold water to crystallize the crude product.\n"
        "2. Dissolve the crude solid in diethyl ether and shake with aqueous sodium bicarbonate. Separate the layers, "
        "acidify the aqueous layer and collect the solid.\n"
        "3. Recrystallize from a minimum volume of hot ethanol and water.\n"
        "4. Test a few crystals with iron(III) chloride, which gives a violet color with phenols.\n"
        "5. Check purity by thin-layer chromatography on silica gel.\n\n"
        "The dry, recrystallized product weighed 2.70 g.")},
    {"id": "MCAT-T2-CP-P1", "title": "Passage 1: Breathing gas at depth", "text": (
        "Scuba divers breathe gas at the pressure of the water around them. Seawater has a density of about 1,025 kg/m³, and "
        "atmospheric pressure at the surface is 101 kPa. (Use g = 10 m/s².)\n\n"
        "Three gas laws describe the main hazards. Boyle's law (P1V1 = P2V2 at constant temperature) explains why a diver who "
        "holds a breath while rising can overexpand the lungs. Dalton's law says each gas in a mixture contributes a partial "
        "pressure equal to its mole fraction times the total pressure; air is about 21% oxygen and 78% nitrogen. Henry's law "
        "says the amount of a gas that dissolves in a liquid is proportional to that gas's partial pressure above it.\n\n"
        "For deep or long dives, some divers breathe heliox, a mixture of helium and oxygen, instead of air. Helium is "
        "chemically inert, has a low molar mass (4 g/mol compared with 28 g/mol for nitrogen) and is less soluble in body "
        "fat than nitrogen.")},
    {"id": "MCAT-T2-CP-P2", "title": "Passage 2: Two inhibitors of one enzyme", "text": (
        "Researchers measured the initial rate (v0) of an enzyme at several substrate concentrations, alone and in the "
        "presence of a fixed concentration of inhibitor X or inhibitor Y. The enzyme concentration was 0.010 µM in every "
        "assay, and the data fit the Michaelis-Menten equation, v0 = Vmax[S] / (Km + [S]).\n\n"
        "| [S] (mM) | v0, no inhibitor (µM/min) | v0 with X (µM/min) | v0 with Y (µM/min) |\n|---|---|---|---|\n"
        "| 1 | 33 | 14 | 17 |\n| 2 | 50 | 25 | 25 |\n| 6 | 75 | 50 | 38 |\n| 18 | 90 | 75 | 45 |\n| very high | 100 | 100 | 50 |\n\n"
        "In separate experiments, dialysis removed inhibitor Y and fully restored activity.")},
    {"id": "MCAT-T2-CP-P3", "title": "Passage 3: Imaging a fluorescent tag", "text": (
        "Fluorescein, a dye used to label proteins, absorbs blue light most strongly at 490 nm and emits green light most "
        "strongly at 520 nm. After absorbing a photon, the excited molecule loses a little energy to its surroundings before it "
        "emits; the emitted photon therefore has less energy than the absorbed one. This difference is called the Stokes "
        "shift.\n\n"
        "Labeled cells were viewed with a compound microscope: a 40x objective lens and a 10x eyepiece. To collect more "
        "light, the objective was used with immersion oil of refractive index 1.52 between the lens and the cover slip.\n\n"
        "The energy of a photon is E = hc/λ; a convenient form is E (in eV) = 1,240 / λ (in nm). The speed of light in vacuum "
        "is 3.00 × 10⁸ m/s.")},
    {"id": "MCAT-T2-CP-P4", "title": "Passage 4: From fat to soap", "text": (
        "A triacylglycerol is an ester of glycerol, a three-carbon triol, with three fatty acids. Heating a fat with aqueous "
        "sodium hydroxide (saponification) breaks all three ester bonds. When the mixture is cooled and salt is added, the "
        "sodium salts of the fatty acids separate as soap.\n\n"
        "In water, soap molecules gather into micelles above a certain concentration, and grease is carried away inside them. "
        "To identify the fatty acids in a sample, a chemist first converts them to methyl esters and then separates the esters "
        "by gas chromatography on a nonpolar column, where compounds elute roughly in order of boiling point.\n\n"
        "| Fatty acid | Carbons | C=C bonds | Melting point (°C) |\n|---|---|---|---|\n"
        "| Palmitic | 16 | 0 | 63 |\n| Stearic | 18 | 0 | 70 |\n| Oleic (cis) | 18 | 1 | 13 |\n| Linoleic (cis, cis) | 18 | 2 | -5 |")},
]

ITEMS = [
    # ================= Practice Test 1 =================
    # Passage 1 (FC4)
    Q(1, 1, F4, "4B Fluids and circulation",
      "What is the mean flow speed in the narrowed segment?",
      ["1.2 m/s", "0.60 m/s", "2.4 m/s", "4.8 m/s"],
      "Continuity gives A1v1 = A2v2, and area goes with r squared, so halving the radius makes the area a quarter and the speed four times larger: 4 x 0.30 = 1.2 m/s. Doubling the speed (0.60 m/s) treats speed as if it scaled with radius.",
      stim="MCAT-T1-CP-P1", chk=0.30 * (4.0 / 2.0) ** 2),
    Q(1, 2, F4, "4B Fluids and circulation",
      "Ignoring viscosity, by about how much is the pressure in the narrowed segment lower than the upstream pressure?",
      ["720 Pa", "1,430 Pa", "430 Pa", "48 Pa"],
      "Bernoulli's equation for a horizontal tube gives ΔP = ½ρ(v2² - v1²) = 0.5 x 1,060 x (1.44 - 0.09) ≈ 720 Pa. Leaving out the factor of one half gives about 1,430 Pa.",
      stim="MCAT-T1-CP-P1", chk=0.5 * 1060 * (1.2 ** 2 - 0.3 ** 2)),
    Q(1, 2, F4, "4B Fluids and circulation",
      "In a long vessel obeying Poiseuille's law, the radius is halved while the pressure difference stays the same. The volume flow rate:",
      ["falls to 1/16 of its value", "falls to 1/4 of its value", "falls to 1/2 of its value", "falls to 1/8 of its value"],
      "Flow depends on r to the fourth power, so halving r divides Q by 2⁴ = 16. A factor of 1/4 would follow if flow depended on cross-sectional area alone.",
      stim="MCAT-T1-CP-P1"),
    Q(1, 2, F4, "4B Fluids and circulation",
      "A condition raises blood viscosity by 50% with no change in vessel size. To keep the same flow through a long vessel, the pressure difference must become:",
      ["1.5 times the original", "2.25 times the original", "0.67 times the original", "the same as the original"],
      "In Poiseuille's law Q is proportional to ΔP/η, so if η rises by a factor of 1.5, ΔP must rise by the same factor to hold Q constant. Squaring the factor (2.25) would apply only to a quantity that varies with η squared.",
      stim="MCAT-T1-CP-P1"),
    Q(1, 2, F4, "4B Fluids and circulation",
      "In a standing person, an artery in the foot lies 1.2 m below the heart. How much greater is the blood pressure there because of the column of blood alone? (Use g = 10 m/s².)",
      ["12.7 kPa", "1.3 kPa", "127 kPa", "6.4 kPa"],
      "Hydrostatic pressure is ρgh = 1,060 x 10 x 1.2 ≈ 12,700 Pa, or 12.7 kPa. A value of 1.3 kPa leaves out the factor of g.",
      stim="MCAT-T1-CP-P1", chk=1060 * 10 * 1.2 / 1000),
    # Passage 2 (FC5)
    Q(1, 2, F5, "5A Acid-base equilibria",
      "What is the arterial pH of Patient X?",
      ["7.1", "7.4", "6.8", "7.7"],
      "Dissolved CO2 is 0.03 x 80 = 2.4 mM, so pH = 6.1 + log(24/2.4) = 6.1 + 1 = 7.1. A pH of 7.4 is Patient W, whose PaCO2 is half as high.",
      stim="MCAT-T1-CP-P2", chk=6.1 + log10(24 / (0.03 * 80))),
    Q(1, 2, F5, "5A Acid-base equilibria",
      "Patient Z's values point to which acid-base disturbance?",
      ["Respiratory alkalosis", "Respiratory acidosis", "Metabolic alkalosis", "Metabolic acidosis"],
      "Z's PaCO2 is half of normal with normal bicarbonate, so the ratio and the pH rise (pH 7.7), and the cause is breathing off too much CO2. A metabolic alkalosis would start with a high bicarbonate.",
      stim="MCAT-T1-CP-P2"),
    Q(1, 1, F5, "5E Kinetics and catalysis",
      "What does carbonic anhydrase do to the reaction between CO2 and water?",
      ["Speeds both directions equally", "Shifts it toward more bicarbonate", "Raises the pKa of the acid", "Makes it more exergonic"],
      "A catalyst lowers the activation energy for the forward and reverse reactions alike, so equilibrium is reached faster but its position is unchanged. It does not alter ΔG or the acid's pKa.",
      stim="MCAT-T1-CP-P2"),
    Q(1, 3, F5, "5A Acid-base equilibria",
      "The buffer's apparent pKa of 6.1 is far from normal blood pH, yet the system buffers blood well. The best explanation is that:",
      ["the lungs can remove the CO2 formed", "its pKa equals normal blood pH", "bicarbonate acts as a very strong base", "carbonic acid dissociates fully"],
      "The bicarbonate system is open: acid added to blood converts bicarbonate to CO2, which is breathed out, so the acid does not build up. A closed buffer works best within about one pH unit of its pKa.",
      stim="MCAT-T1-CP-P2"),
    Q(1, 2, F5, "5A Acid-base equilibria",
      "Which change would bring Patient Y's pH closest to normal within minutes?",
      ["Faster, deeper breathing", "Slower, shallower breathing", "Kidneys excreting bicarbonate", "Kidneys retaining H⁺"],
      "Y has a metabolic acidosis (bicarbonate halved). Breathing faster lowers PaCO2, which raises the bicarbonate-to-CO2 ratio and the pH within minutes; the kidneys act over hours to days, and both renal changes listed would lower pH further.",
      stim="MCAT-T1-CP-P2"),
    Q(1, 2, F5, "5A Acid-base equilibria",
      "During hard exercise, lactic acid releases H⁺ into the blood. What is the immediate effect on the equilibrium in the passage?",
      ["More CO2 forms from bicarbonate", "More bicarbonate forms from CO2", "The pKa of the system falls", "Dissolved CO2 falls"],
      "Added H⁺ combines with HCO3⁻, so by Le Chatelier's principle the equilibrium shifts toward H2CO3 and CO2. The pKa is a constant and does not change.",
      stim="MCAT-T1-CP-P2"),
    # Passage 3 (FC4 x4, FC5 x1)
    Q(1, 2, F4, "4C Electrochemistry",
      "What membrane potential does the Nernst equation predict for the cell in the experiment?",
      ["-91 mV", "+91 mV", "-61 mV", "-30 mV"],
      "E = 61.5 log(5/150) = 61.5 x (-1.48) ≈ -91 mV: the inside is negative because K⁺ leaks out down its gradient. A positive value comes from flipping the ratio.",
      stim="MCAT-T1-CP-P3", chk=61.5 * log10(5 / 150)),
    Q(1, 3, F4, "4C Electrochemistry",
      "If the K⁺ concentration in the bath rose to 10 mM, the predicted potential would be about:",
      ["-72 mV", "-108 mV", "-45 mV", "-91 mV"],
      "E = 61.5 log(10/150) = 61.5 x (-1.18) ≈ -72 mV. Raising outside K⁺ narrows the gradient, so the potential becomes less negative, which is why high blood potassium depolarizes cells.",
      stim="MCAT-T1-CP-P3", chk=61.5 * log10(10 / 150)),
    Q(1, 2, F4, "4C Circuit elements",
      "How much charge is stored on 1.0 cm² of membrane held at 90 mV?",
      ["9 × 10^-8 C", "9 × 10^-5 C", "1.1 × 10^-5 C", "9 × 10^-11 C"],
      "Q = CV = (1 x 10⁻⁶ F)(0.090 V) = 9 x 10⁻⁸ C. Using 90 V instead of 0.090 V gives the answer 1,000 times too large.",
      stim="MCAT-T1-CP-P3", chk=1e-6 * 0.090),
    Q(1, 1, F4, "4C Circuit elements",
      "For an accurate reading, the voltmeter connected to the microelectrode should have:",
      ["a very high internal resistance", "a very low internal resistance", "a resistance equal to the cell's", "a large capacitor in series"],
      "A voltmeter is connected in parallel and should draw almost no current, so it needs a very high resistance; a low resistance would drain the very potential it measures.",
      stim="MCAT-T1-CP-P3"),
    Q(1, 2, F5, "5E Thermodynamics",
      "What is the standard free energy change of the zinc-copper reaction used to check the voltmeter?",
      ["-212 kJ/mol", "+212 kJ/mol", "-106 kJ/mol", "-0.21 kJ/mol"],
      "ΔG° = -nFE° = -2 x 96,485 x 1.10 ≈ -212,000 J/mol = -212 kJ/mol; a positive cell potential means a spontaneous reaction and a negative ΔG°. Using n = 1 gives -106 kJ/mol.",
      stim="MCAT-T1-CP-P3", chk=-2 * FARADAY * 1.10 / 1000),
    # Passage 4 (FC5)
    Q(1, 1, F5, "5D Carboxylic acid derivatives",
      "Which group of salicylic acid reacts with acetic anhydride to make aspirin?",
      ["The phenolic hydroxyl group", "The carboxylic acid group", "A ring carbon-hydrogen bond", "The carbonyl oxygen"],
      "Aspirin is the acetate ester of the phenol: the -OH on the ring is acetylated, and the carboxylic acid is left free. That is why the product still dissolves in bicarbonate.",
      stim="MCAT-T1-CP-P4"),
    Q(1, 2, F5, "5C Separation and purification",
      "In step 2, where is the aspirin just before the layers are separated?",
      ["In the aqueous layer, as its salt", "In the ether layer, as the acid", "In the aqueous layer, as the acid", "In the ether layer, as its salt"],
      "Bicarbonate deprotonates the carboxylic acid, and the charged carboxylate dissolves in water rather than ether. Acidifying the aqueous layer afterward turns it back into the neutral acid, which precipitates.",
      stim="MCAT-T1-CP-P4"),
    Q(1, 2, F5, "5C Separation and purification",
      "On the silica gel plate in step 5, the compound that travels farthest is the one that:",
      ["interacts least with the silica", "is the most polar", "has the highest molar mass", "dissolves least in the moving eluent"],
      "Silica is a polar stationary phase, so a compound that binds it weakly spends more time in the moving solvent and has a higher Rf. More polar compounds stick to the silica and move less.",
      stim="MCAT-T1-CP-P4"),
    Q(1, 2, F5, "5D Phenols",
      "After recrystallization, a few crystals still turn violet with iron(III) chloride. This shows that:",
      ["some salicylic acid remains", "the ester bond formed correctly", "acetic acid was removed", "the crystals are fully dry"],
      "Iron(III) chloride reacts with a free phenolic -OH, which aspirin lacks once acetylated. A violet color means unreacted salicylic acid is still present.",
      stim="MCAT-T1-CP-P4"),
    Q(1, 2, F5, "5D Carboxylic acid derivatives",
      "What is the percent yield of the recrystallized aspirin?",
      ["75%", "98%", "64%", "133%"],
      "2.76 g / 138 g/mol = 0.0200 mol of salicylic acid, so the theoretical yield is 0.0200 x 180 = 3.60 g, and 2.70 / 3.60 = 75%. Dividing 2.70 g by the 2.76 g of starting material ignores the change in molar mass.",
      stim="MCAT-T1-CP-P4", chk=100 * 2.70 / (2.76 / 138 * 180)),
    Q(1, 2, F5, "5D Carboxylic acid derivatives",
      "Old aspirin tablets stored in humid air often smell of vinegar. The most likely reason is that:",
      ["the ester hydrolyzes to acetic acid", "the carboxylic acid is oxidized", "the benzene ring is reduced", "the phenol group is acetylated again"],
      "Water slowly hydrolyzes the ester back to salicylic acid and acetic acid, and acetic acid gives vinegar its smell. Benzene rings are not reduced under such mild conditions.",
      stim="MCAT-T1-CP-P4"),
    # Discrete
    Q(1, 1, F4, "4A Work, energy and power",
      "A 2.0 kg cast is lifted straight up 0.50 m at constant speed in 2.0 s. What average power is delivered? (Use g = 10 m/s².)",
      ["5 W", "10 W", "20 W", "2.5 W"],
      "Work against gravity is mgh = 2.0 x 10 x 0.50 = 10 J, and power is work divided by time: 10 J / 2.0 s = 5 W. The 10 W answer gives the work, not the rate.",
      chk=2.0 * 10 * 0.50 / 2.0),
    Q(1, 2, F4, "4D Geometrical optics",
      "An object is 30 cm from a converging lens with a focal length of 10 cm. How far from the lens is the image?",
      ["15 cm", "7.5 cm", "20 cm", "30 cm"],
      "From 1/f = 1/do + 1/di, 1/di = 1/10 - 1/30 = 2/30, so di = 15 cm on the far side (a real, inverted image). Adding the reciprocals instead gives 7.5 cm.",
      chk=1 / (1 / 10 - 1 / 30)),
    Q(1, 1, F4, "4E Nuclear decay",
      "A tracer with a half-life of 6.0 hours is injected. What percent of its activity remains after 24 hours?",
      ["6.25%", "25%", "12.5%", "3.1%"],
      "Twenty-four hours is four half-lives, so the fraction left is (1/2)⁴ = 1/16 = 6.25%. Three half-lives would leave 12.5%.",
      chk=100 * 0.5 ** (24 / 6)),
    Q(1, 1, F5, "5B Intermolecular forces",
      "Which of these compounds of similar molar mass has the highest boiling point?",
      ["Ethanol", "Dimethyl ether", "Propane", "Chloromethane"],
      "Ethanol has an O-H group and forms hydrogen bonds between molecules, which take the most energy to overcome. Dimethyl ether is polar but has no O-H, and propane has only dispersion forces.",
    ),
    Q(1, 2, F5, "5E Thermodynamics",
      "A reaction has ΔH = -40 kJ/mol and ΔS = -100 J/(mol·K). Under standard conditions it is spontaneous:",
      ["below 400 K only", "above 400 K only", "at all temperatures", "at no temperature"],
      "ΔG = ΔH - TΔS is negative while TΔS is less negative than ΔH, that is while T < 40,000/100 = 400 K. Above that, the unfavorable entropy term wins.",
    ),
    Q(1, 2, F5, "5D Amino acids",
      "Glycine has pKa values of 2.34 (carboxyl group) and 9.60 (amino group). What is its isoelectric point?",
      ["5.97", "2.34", "9.60", "11.94"],
      "For an amino acid with no ionizable side chain, the pI is the average of the two pKa values: (2.34 + 9.60) / 2 = 5.97. At that pH the zwitterion carries no net charge.",
      chk=(2.34 + 9.60) / 2),
    Q(1, 2, F5, "5A Solubility",
      "Calcium fluoride (CaF2) has Ksp = 3.9 × 10⁻¹¹. What is its molar solubility in pure water?",
      ["2.1 × 10^-4 M", "6.2 × 10^-6 M", "3.4 × 10^-4 M", "9.8 × 10^-12 M"],
      "CaF2 dissolves to s of Ca²⁺ and 2s of F⁻, so Ksp = s(2s)² = 4s³ and s = (9.75 x 10⁻¹²)^(1/3) ≈ 2.1 x 10⁻⁴ M. Taking the square root of Ksp treats it as a 1:1 salt.",
      chk=round((3.9e-11 / 4) ** (1 / 3), 5)),
    Q(1, 1, F5, "5D Stereochemistry",
      "A molecule has three chirality centers and no internal plane of symmetry. How many stereoisomers can it have?",
      ["8", "6", "3", "9"],
      "With n chirality centers and no meso forms, the maximum number of stereoisomers is 2ⁿ = 2³ = 8. Multiplying 3 by 2 gives 6, which undercounts.",
      chk=2 ** 3),

    # ================= Practice Test 2 =================
    # Passage 1 (FC4)
    Q(2, 1, F4, "4B Gas phase",
      "What is the absolute pressure on a diver 20 m below the surface?",
      ["306 kPa", "205 kPa", "3,100 kPa", "153 kPa"],
      "The water adds ρgh = 1,025 x 10 x 20 = 205,000 Pa = 205 kPa to the 101 kPa of the atmosphere, for 306 kPa. The 205 kPa answer is the gauge pressure, without the air above the water.",
      stim="MCAT-T2-CP-P1", chk=101 + 1025 * 10 * 20 / 1000),
    Q(2, 2, F4, "4B Gas phase",
      "Breathing air at 20 m, what is the diver's inspired oxygen partial pressure?",
      ["64 kPa", "21 kPa", "43 kPa", "145 kPa"],
      "By Dalton's law, PO2 = 0.21 x 306 kPa ≈ 64 kPa, about three times its value at the surface. Applying 21% to the gauge pressure alone gives 43 kPa.",
      stim="MCAT-T2-CP-P1", chk=0.21 * 306),
    Q(2, 2, F4, "4B Gas phase",
      "A diver at 20 m holds a breath with 2.0 L of gas in the lungs and rises to the surface. If the gas could expand freely at constant temperature, what volume would it reach?",
      ["6.1 L", "0.66 L", "4.0 L", "12 L"],
      "Boyle's law gives V2 = P1V1/P2 = 306 x 2.0 / 101 ≈ 6.1 L, three times the starting volume, which is why breath-holding on ascent can tear the lungs. 0.66 L inverts the pressure ratio.",
      stim="MCAT-T2-CP-P1", chk=306 * 2.0 / 101),
    Q(2, 2, F4, "4B Gas phase",
      "Decompression sickness occurs after a fast ascent from a long, deep dive. Which law best explains why more nitrogen was in the tissues to begin with?",
      ["Henry's law", "Boyle's law", "Charles's law", "Graham's law"],
      "Henry's law says dissolved gas is proportional to its partial pressure, so breathing nitrogen at high pressure loads the tissues with it; on a fast ascent it comes out of solution as bubbles. Boyle's law explains gas volume, not how much dissolves.",
      stim="MCAT-T2-CP-P1"),
    Q(2, 2, F4, "4B Gas phase",
      "Heliox moves through narrow airways with less effort than air at the same pressure mainly because helium:",
      ["makes the gas far less dense", "dissolves faster in blood", "binds weakly to hemoglobin", "has stronger dispersion forces"],
      "At the same pressure and temperature, gas density is proportional to molar mass, so swapping nitrogen (28 g/mol) for helium (4 g/mol) makes the mixture much less dense and easier to push through airways. Helium is inert and does not bind hemoglobin.",
      stim="MCAT-T2-CP-P1"),
    # Passage 2 (FC5)
    Q(2, 1, F5, "5E Enzymes",
      "What is the Km of the enzyme with no inhibitor present?",
      ["2 mM", "1 mM", "6 mM", "18 mM"],
      "Km is the substrate concentration at which v0 is half of Vmax. With no inhibitor, Vmax is 100 µM/min and v0 is 50 µM/min at 2 mM.",
      stim="MCAT-T2-CP-P2", chk=2),
    Q(2, 2, F5, "5E Enzymes",
      "Based on the data, inhibitor X is best described as:",
      ["competitive", "noncompetitive", "uncompetitive", "an allosteric activator"],
      "With X, Vmax is still 100 µM/min at very high [S], but half-maximal rate now needs 6 mM, so Km rises and Vmax is unchanged. That pattern is competitive inhibition; enough substrate outcompetes the inhibitor.",
      stim="MCAT-T2-CP-P2"),
    Q(2, 2, F5, "5E Enzymes",
      "What effect does inhibitor Y have on the enzyme's kinetic constants?",
      ["Lowers Vmax, leaves Km unchanged", "Raises Km, leaves Vmax unchanged", "Lowers both Vmax and Km equally", "Raises both Vmax and Km"],
      "With Y, Vmax drops to 50 µM/min but v0 is still half of that new Vmax at 2 mM, so Km is unchanged. That is the pattern of noncompetitive inhibition.",
      stim="MCAT-T2-CP-P2"),
    Q(2, 1, F5, "5E Enzymes",
      "Which change would best restore the reaction rate in the presence of inhibitor X?",
      ["Raising the substrate concentration", "Raising the inhibitor concentration", "Lowering the substrate concentration", "Lowering the temperature to 4 °C"],
      "A competitive inhibitor competes with substrate for the active site, so more substrate tips the competition back and v0 approaches the uninhibited Vmax. Cooling would slow the enzyme further.",
      stim="MCAT-T2-CP-P2"),
    Q(2, 3, F5, "5E Enzymes",
      "On a Lineweaver-Burk (double-reciprocal) plot, where would the lines for no inhibitor and for inhibitor X meet?",
      ["On the y-axis", "On the x-axis", "In the second quadrant", "Nowhere; they are parallel"],
      "The y-intercept of a double-reciprocal plot is 1/Vmax, and X leaves Vmax unchanged, so both lines share the same y-intercept. Lines meeting on the x-axis would mean an unchanged Km, as with Y.",
      stim="MCAT-T2-CP-P2"),
    Q(2, 3, F5, "5E Enzymes",
      "What is the turnover number (kcat) of the uninhibited enzyme?",
      ["167 s^-1", "10,000 s^-1", "1.7 s^-1", "0.006 s^-1"],
      "kcat = Vmax / [E] = (100 µM/min) / (0.010 µM) = 10,000 per minute, and dividing by 60 gives about 167 per second. The 10,000 answer is per minute, not per second.",
      stim="MCAT-T2-CP-P2", chk=100 / 0.010 / 60),
    # Passage 3 (FC4 x4, FC5 x1)
    Q(2, 1, F4, "4D Light and photon energy",
      "What is the energy of a photon at fluorescein's absorption peak?",
      ["2.53 eV", "2.38 eV", "0.40 eV", "25.3 eV"],
      "E = 1,240 / 490 ≈ 2.53 eV. The 2.38 eV value is the emitted photon at 520 nm, which carries less energy.",
      stim="MCAT-T2-CP-P3", chk=1240 / 490),
    Q(2, 2, F4, "4D Light and matter",
      "Why is fluorescein's emitted light at a longer wavelength than the light it absorbs?",
      ["Some energy is lost before emission", "The photon speeds up in the dye", "The dye absorbs two photons at once", "Emission gains energy from the solvent"],
      "The excited molecule relaxes to the lowest vibrational level of the excited state, losing a little energy as heat, so the emitted photon has less energy and a longer wavelength. Gaining energy from the solvent would shorten the wavelength.",
      stim="MCAT-T2-CP-P3"),
    Q(2, 1, F4, "4D Geometrical optics",
      "What is the speed of light in the immersion oil?",
      ["1.97 × 10^8 m/s", "4.56 × 10^8 m/s", "3.00 × 10^8 m/s", "1.52 × 10^8 m/s"],
      "v = c/n = 3.00 x 10⁸ / 1.52 ≈ 1.97 x 10⁸ m/s. Multiplying by n instead would make light faster than in a vacuum.",
      stim="MCAT-T2-CP-P3", chk=3.00e8 / 1.52),
    Q(2, 1, F4, "4D Geometrical optics",
      "What is the total magnification of the microscope?",
      ["400x", "50x", "4x", "4,000x"],
      "The total magnification of a compound microscope is the product of the objective and eyepiece magnifications: 40 x 10 = 400. Adding them gives 50.",
      stim="MCAT-T2-CP-P3", chk=40 * 10),
    Q(2, 2, F5, "5B Molecular structure",
      "Dyes that absorb visible light, such as fluorescein, usually owe that absorption to:",
      ["an extended conjugated pi system", "a high number of sigma bonds", "a large number of chiral centers", "strong ionic bonds in the solid"],
      "Conjugation spreads pi electrons over many atoms and narrows the energy gap between orbitals, moving absorption from the ultraviolet into the visible. Sigma bonds and chirality do not lower that gap.",
      stim="MCAT-T2-CP-P3"),
    # Passage 4 (FC5)
    Q(2, 1, F5, "5D Lipids",
      "What are the products of saponifying a triacylglycerol with sodium hydroxide?",
      ["Glycerol and fatty acid salts", "Glycerol and fatty acid esters", "Fatty acids and methanol", "Glucose and fatty acid salts"],
      "Hydroxide attacks each ester carbonyl, releasing glycerol and the sodium carboxylates, which are soap. Methyl esters form only in the separate step with methanol.",
      stim="MCAT-T2-CP-P4"),
    Q(2, 2, F5, "5B Intermolecular forces",
      "In a soap micelle in water, how are the soap molecules arranged?",
      ["Charged heads out, chains inward", "Chains out, charged heads inward", "Flat sheets, one molecule thick", "Randomly, with no pattern"],
      "The nonpolar hydrocarbon chains avoid water by clustering in the core, where grease dissolves, while the charged carboxylate heads face the water. The reverse arrangement forms only in a nonpolar solvent.",
      stim="MCAT-T2-CP-P4"),
    Q(2, 1, F5, "5D Lipids",
      "How many moles of sodium hydroxide are used up in saponifying one mole of a triacylglycerol?",
      ["3", "1", "2", "6"],
      "Each of the three ester bonds consumes one hydroxide, and each fatty acid ends up as a sodium salt, so three moles of NaOH are needed.",
      stim="MCAT-T2-CP-P4", chk=3),
    Q(2, 2, F5, "5C Separation and purification",
      "In the gas chromatography step, which methyl ester should elute first?",
      ["Methyl palmitate", "Methyl stearate", "Methyl oleate", "Methyl linoleate"],
      "On a nonpolar column the esters elute roughly by boiling point, which rises with chain length, so the 16-carbon palmitate leaves first. The three 18-carbon esters elute later.",
      stim="MCAT-T2-CP-P4"),
    Q(2, 3, F5, "5D Stereochemistry",
      "Carbon 2 of the glycerol in a triacylglycerol is a chirality center only when:",
      ["the acids on carbons 1 and 3 differ", "all three acids are the same", "the acid on carbon 2 is unsaturated", "the fat is fully saturated"],
      "Carbon 2 carries an H, its own ester and two CH2-O-acyl arms. It is chiral only if those two arms differ, that is, if carbons 1 and 3 carry different fatty acids.",
      stim="MCAT-T2-CP-P4"),
    Q(2, 2, F5, "5B Intermolecular forces",
      "According to the table, oleic acid melts far below stearic acid even though both have 18 carbons. Why?",
      ["A cis double bond disrupts packing", "It has a lower molar mass", "It forms more hydrogen bonds per molecule", "Its chain is fully saturated"],
      "A cis double bond puts a kink in the chain, so molecules cannot pack as closely and dispersion forces between them are weaker. Their molar masses differ by only two hydrogens.",
      stim="MCAT-T2-CP-P4"),
    # Discrete
    Q(2, 1, F4, "4A Work and energy",
      "A 0.50 kg ball is dropped from rest from a height of 5.0 m. Ignoring air resistance, how fast is it moving just before it lands? (Use g = 10 m/s².)",
      ["10 m/s", "5.0 m/s", "50 m/s", "100 m/s"],
      "Potential energy becomes kinetic energy: mgh = ½mv², so v = √(2gh) = √100 = 10 m/s, whatever the mass. 100 is v squared.",
      chk=sqrt(2 * 10 * 5.0)),
    Q(2, 2, F4, "4C Circuits",
      "Two 6 Ω resistors in parallel are connected in series with a 3 Ω resistor across a 12 V battery. What current flows from the battery?",
      ["2.0 A", "0.80 A", "4.0 A", "1.3 A"],
      "The parallel pair is 3 Ω, so the total resistance is 3 + 3 = 6 Ω and I = V/R = 12/6 = 2.0 A. Treating all three resistors as in series (15 Ω) gives 0.80 A.",
      chk=12 / (3 + 1 / (1 / 6 + 1 / 6))),
    Q(2, 1, F4, "4D Sound",
      "An ambulance with its siren on drives toward a person standing on the curb and then past them. The pitch the person hears is:",
      ["higher while it approaches, then lower", "lower while it approaches, then higher", "the same as emitted throughout", "higher both before and after"],
      "By the Doppler effect, a source moving toward a listener crowds its sound waves together (higher frequency), and moving away spreads them out (lower frequency).",
    ),
    Q(2, 2, F5, "5A Colligative properties",
      "What is the osmotic pressure of 0.15 M NaCl at 310 K? (R = 0.0821 L·atm/(mol·K); assume complete dissociation.)",
      ["7.6 atm", "3.8 atm", "15 atm", "0.025 atm"],
      "π = iMRT = 2 x 0.15 x 0.0821 x 310 ≈ 7.6 atm, with i = 2 because NaCl gives two ions. Leaving out i gives 3.8 atm.",
      chk=2 * 0.15 * 0.0821 * 310),
    Q(2, 2, F5, "5E Chemical equilibrium",
      "For N2 + 3H2 ⇌ 2NH3, ΔH is negative. Raising the temperature of the equilibrium mixture shifts it:",
      ["toward reactants, lowering the yield", "toward products, raising the yield", "nowhere, since K is constant", "toward products by raising K"],
      "For an exothermic reaction, heat acts like a product, so adding heat shifts the equilibrium left and K itself becomes smaller. K depends on temperature, so it is not constant here.",
    ),
    Q(2, 1, F5, "5B Covalent bonding",
      "What is the hybridization of the carbon atom in carbon dioxide?",
      ["sp", "sp2", "sp3", "sp3d"],
      "Carbon in CO2 forms two double bonds and no lone pairs, giving two electron domains and a linear shape, which matches sp hybridization. Each double bond adds a pi bond from an unhybridized p orbital.",
    ),
    Q(2, 2, F5, "5D Peptides and proteins",
      "Trypsin is used to cut proteins before analysis. Which bonds does it break?",
      ["Peptide bonds after lysine or arginine", "Disulfide bonds between cysteine residues", "Hydrogen bonds in alpha helices", "Peptide bonds after phenylalanine"],
      "Trypsin is a protease that hydrolyzes peptide bonds on the carboxyl side of the basic residues lysine and arginine. Cutting after aromatic residues such as phenylalanine is chymotrypsin's pattern.",
    ),
    Q(2, 2, F5, "5E Kinetics",
      "Doubling the concentration of reactant A quadruples the initial rate, with everything else held constant. What is the reaction order with respect to A?",
      ["2", "1", "4", "0.5"],
      "If rate = k[A]ⁿ, doubling [A] multiplies the rate by 2ⁿ, and 2ⁿ = 4 gives n = 2. A first-order reaction would only double.",
      chk=log10(4) / log10(2)),
]
