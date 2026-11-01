# Chemistry: organic chemistry. Purification and characterisation of organic
# compounds; basic principles; hydrocarbons; compounds containing halogens,
# oxygen and nitrogen; biomolecules (JEE (Main) 2027 syllabus units 13 to
# 19). Key written first; numerical value answers are computed here and
# asserted by N().

# Sigma bonds in propene CH2=CH-CH3: two C-C sigma (one inside the double
# bond) and six C-H.
_propene_sigma = 2 + 6
# Double bond equivalent of naphthalene C10H8.
_dbe = (2 * 10 + 2 - 8) // 2

ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 1, "IUPAC nomenclature", "What is the IUPAC name of CH$_3$-CH(CH$_3$)-CH$_2$-CH(OH)-CH$_3$?",
      ["4-Methylpentan-2-ol", "2-Methylpentan-4-ol", "4-Methylpentan-1-ol", "2-Methylpentan-2-ol"],
      "The longest chain has 5 carbons, numbered from the end nearer the OH group, so OH is on C2 and the methyl group on C4: 4-methylpentan-2-ol. Numbering from the other end gives the wrong locants 2 and 4 swapped."),
    S(1, 1, "Acidity", "Which of these is the strongest acid?",
      ["CH₃COOH", "C₆H₅OH", "C₂H₅OH", "H₂O"],
      "The acetate ion spreads its negative charge equally over two oxygen atoms, so acetic acid ($\\text{p}K_a \\approx 4.8$) is far stronger than phenol ($\\approx 10$), while ethanol is weaker even than water."),
    S(1, 2, "Addition to alkenes", "Propene reacts with HBr in the presence of benzoyl peroxide. What is the main product?",
      ["1-Bromopropane", "2-Bromopropane", "1,2-Dibromopropane", "Propan-2-ol"],
      "Peroxide makes the addition go by free radicals: Br$\\cdot$ adds to the end carbon to give the more stable secondary radical, so Br ends up on C1 (anti-Markovnikov, the Kharasch effect). Without peroxide, 2-bromopropane forms."),
    S(1, 2, "Nucleophilic substitution", "Which of these bromides reacts fastest with hydroxide ion by the $\\text{S}_\\text{N}2$ mechanism?",
      ["CH₃Br", "(CH₃)₃CBr", "(CH₃)₂CHBr", "CH₃CH₂Br"],
      "In $\\text{S}_\\text{N}2$ the nucleophile attacks from the back of the carbon, so crowding slows it: methyl > primary > secondary > tertiary. (CH$_3$)$_3$CBr is fastest by $\\text{S}_\\text{N}1$, not $\\text{S}_\\text{N}2$."),
    S(1, 2, "Iodoform test", "Which of these compounds does NOT give the iodoform test?",
      ["Pentan-3-one", "Ethanol", "Propan-2-ol", "Acetophenone"],
      "The test needs a CH$_3$CO- group or a CH$_3$CH(OH)- group that can be oxidised to one. Pentan-3-one has an ethyl group on each side of its C=O. Ethanol and propan-2-ol are oxidised to ethanal and propanone, and acetophenone is a methyl ketone."),
    S(1, 2, "Basicity of amines", "Which of these is the strongest base in water?",
      ["(CH₃)₂NH", "(CH₃)₃N", "CH₃NH₂", "C₆H₅NH₂"],
      "Methyl groups push electrons onto N, but in water the ion also needs hydrogen bonds to solvate it. The balance makes the secondary amine strongest: (CH$_3$)$_2$NH > CH$_3$NH$_2$ > (CH$_3$)$_3$N. Aniline is weakest, its lone pair spread into the ring."),
    S(1, 1, "Carbohydrates", "Which of these disaccharides is a non-reducing sugar?",
      ["Sucrose", "Maltose", "Lactose", "Cellobiose"],
      "In sucrose the glycosidic link joins C1 of glucose to C2 of fructose, so both anomeric carbons are tied up and neither can open to a free aldehyde or ketone group. Maltose, lactose and cellobiose each keep one free hemiacetal group and reduce Tollens' and Fehling's reagents."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 1, "Bonding in organic molecules", "How many sigma ($\\sigma$) bonds are there in one molecule of propene, CH$_2$=CH-CH$_3$?",
      _propene_sigma, 8,
      "There are 6 C-H bonds and 2 C-C bonds, each of which has one $\\sigma$ bond; the C=C double bond adds one $\\pi$ bond. So there are 8 $\\sigma$ bonds and 1 $\\pi$ bond."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 2, "Purification", "Which method separates o-nitrophenol from p-nitrophenol?",
      ["Steam distillation", "Sublimation", "Simple crystallisation", "Chromatography on paper only"],
      "o-Nitrophenol forms an intramolecular hydrogen bond, so it is volatile in steam. p-Nitrophenol forms intermolecular hydrogen bonds with its neighbours and stays behind."),
    S(2, 2, "Electronic effects", "Which group attached to a benzene ring withdraws electrons from the ring by resonance?",
      ["-NO₂", "-OH", "-NH₂", "-OCH₃"],
      "The nitro group shows a $-R$ effect, pulling $\\pi$ electron density out of the ring and deactivating it. -OH, -NH$_2$ and -OCH$_3$ have lone pairs that they donate into the ring ($+R$)."),
    S(2, 2, "Ozonolysis", "What are the products of reductive ozonolysis of 2-methylbut-2-ene, (CH$_3$)$_2$C=CHCH$_3$?",
      ["Propanone and ethanal", "Propanal and ethanal", "Butanone and methanal", "Two molecules of propanone"],
      "Ozonolysis cuts the C=C and makes each carbon a C=O. (CH$_3$)$_2$C= becomes propanone and =CHCH$_3$ becomes ethanal."),
    S(2, 1, "Friedel-Crafts reaction", "Benzene is treated with chloromethane and anhydrous AlCl$_3$. What is the main product?",
      ["Toluene", "Chlorobenzene", "Benzyl chloride", "Acetophenone"],
      "This is Friedel-Crafts alkylation: AlCl$_3$ produces a methyl electrophile that substitutes onto the ring, giving methylbenzene (toluene). Acetophenone comes from acylation with an acyl chloride."),
    S(2, 2, "Aldol condensation", "Which of these aldehydes undergoes aldol condensation with dilute NaOH?",
      ["Ethanal", "Methanal", "Benzaldehyde", "2,2-Dimethylpropanal"],
      "Aldol condensation needs an $\\alpha$-hydrogen to form the enolate. Ethanal has three. Methanal, benzaldehyde and 2,2-dimethylpropanal have none, so they give the Cannizzaro reaction instead."),
    S(2, 1, "Diazonium salts", "Which amine gives a diazonium salt that is stable at 0 to 5 °C when treated with nitrous acid?",
      ["Aniline", "Ethylamine", "N-Methylaniline", "Benzylamine"],
      "Aromatic primary amines give arenediazonium salts, stabilised by the ring, at 0 to 5 °C. Aliphatic primary amines such as ethylamine and benzylamine give diazonium ions that lose N$_2$ at once; N-methylaniline is secondary and gives an N-nitroso compound."),
    S(2, 1, "Amino acids", "Which of these amino acids is not optically active?",
      ["Glycine", "Alanine", "Valine", "Leucine"],
      "Glycine, H$_2$N-CH$_2$-COOH, has two hydrogens on its $\\alpha$-carbon, so that carbon is not chiral. The others carry a side chain there and exist as D and L forms."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 2, "Stereoisomerism", "How many chiral carbon atoms are there in the open-chain form of glucose?",
      4, 4,
      "Open-chain glucose is CHO-(CHOH)$_4$-CH$_2$OH. C2, C3, C4 and C5 each carry four different groups; C1 (CHO) and C6 (CH$_2$OH) do not. That gives $2^4 = 16$ stereoisomers of the aldohexose."),
    # ---------- Drill only ----------
    S(0, 1, "Lassaigne's test", "In Lassaigne's test, the sodium fusion extract gives a violet colour with sodium nitroprusside. Which element does this show?",
      ["Sulphur", "Nitrogen", "Chlorine", "Phosphorus"],
      "Sulphur forms Na$_2$S during fusion, and sulphide ion gives a violet colour with sodium nitroprusside. Nitrogen is shown by Prussian blue."),
    S(0, 2, "Stability of alkenes", "Which of these alkenes is the most stable?",
      ["2,3-Dimethylbut-2-ene", "But-1-ene", "Propene", "Ethene"],
      "More alkyl groups on the C=C give more hyperconjugation and a lower heat of hydrogenation. 2,3-Dimethylbut-2-ene is tetrasubstituted, the most stable here."),
    S(0, 1, "Acidity of phenol", "Statement I: Phenol is a stronger acid than ethanol. Statement II: The phenoxide ion is stabilised by resonance with the benzene ring. Which is correct?",
      [STATEMENTS[0], STATEMENTS[1], STATEMENTS[2], STATEMENTS[3]],
      "The negative charge of phenoxide spreads into the ring, which stabilises it; ethoxide has no such resonance. So phenol loses its proton more easily. Both statements are true."),
    S(0, 2, "Reimer-Tiemann reaction", "Phenol is treated with chloroform and aqueous NaOH, then acidified. What is the main product?",
      ["Salicylaldehyde", "Salicylic acid", "Benzoic acid", "Picric acid"],
      "The Reimer-Tiemann reaction puts a CHO group on the ring ortho to OH, giving 2-hydroxybenzaldehyde. Salicylic acid comes from Kolbe's reaction with CO$_2$."),
    N(0, 2, "Degree of unsaturation", "What is the double bond equivalent (degree of unsaturation) of naphthalene, C$_{10}$H$_8$?",
      _dbe, 7,
      "DBE $= \\frac{2C + 2 - H}{2} = \\frac{22 - 8}{2} = 7$: two rings and five C=C double bonds."),
    N(0, 2, "Peptides", "How many different tripeptides can be made from glycine and alanine, using each amino acid as often as you like?",
      2**3, 8,
      "Each of the 3 positions can be either amino acid, and order matters (Gly-Ala-Ala differs from Ala-Ala-Gly), so there are $2^3 = 8$ tripeptides."),
]
