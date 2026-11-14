# Biological and Biochemical Foundations of Living Systems. Original items and passages; studies and data are
# hypothetical. Per test: FC1 16, FC2 6, FC3 8. Four passages (6, 5, 5, 6 questions) and 8 discrete questions.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)

F1, F2, F3 = "mcatFc1", "mcatFc2", "mcatFc3"

STIMULI = [
    {"id": "MCAT-T1-BB-P1", "title": "Passage 1: Taking apart a protease", "text": (
        "Serine proteases cut peptide bonds using three active-site residues, a serine, a histidine and an aspartate. In the "
        "proposed mechanism, the histidine pulls a proton from the serine's hydroxyl group, and the activated serine oxygen "
        "attacks the carbonyl carbon of the peptide bond, forming a short-lived tetrahedral intermediate. The aspartate holds the "
        "histidine in position. A separate pocket next to the active site binds the side chain of the residue just before the "
        "bond that is cut; in the enzyme studied, that pocket prefers large aromatic side chains such as phenylalanine.\n\n"
        "Researchers replaced each active-site residue in turn and measured the kinetics of the purified enzymes at pH 8.0:\n\n"
        "| Enzyme | kcat (s⁻¹) | Km (mM) |\n|---|---|---|\n| Wild type | 50 | 0.10 |\n| Ser to Ala | 0.0005 | 0.12 |\n"
        "| Asp to Asn | 0.5 | 0.11 |\n\n"
        "The wild-type enzyme was most active between pH 7 and 9, and its activity fell steeply below pH 6.")},
    {"id": "MCAT-T1-BB-P2", "title": "Passage 2: Switching on a stress gene", "text": (
        "Cells exposed to a brief rise in temperature make large amounts of a protective protein called HRX. To learn how the "
        "HRX gene is controlled, researchers fused stretches of DNA from upstream of the gene to a reporter gene whose product "
        "glows, and measured light output after heat stress.\n\n"
        "Experiment 1: Deleting a short sequence about 30 base pairs upstream of the transcription start site abolished "
        "reporter activity. Deleting a sequence 2,000 base pairs upstream cut heat-induced activity by 90%, and the same "
        "sequence still worked when it was flipped in orientation.\n\n"
        "Experiment 2: A small interfering RNA (siRNA) matching the mRNA of a transcription factor, HSF, cut HSF protein by "
        "more than 80% and blocked the rise in HRX mRNA after heat.\n\n"
        "Experiment 3: Cells treated with cycloheximide, which blocks translation, still raised HRX mRNA after heat stress.\n\n"
        "The HRX gene spans about 6 kilobases of DNA, while the mature HRX mRNA is about 1.8 kilobases long.")},
    {"id": "MCAT-T1-BB-P3", "title": "Passage 3: When DNA is damaged", "text": (
        "Ultraviolet light damages DNA, mostly by linking adjacent pyrimidines on the same strand. In healthy cells the "
        "damage triggers a rise in the protein p53, which acts as a transcription factor. One of its targets encodes p21, a "
        "protein that inhibits the cyclin-dependent kinases that drive cells from G1 into S phase. If the damage is too great "
        "to repair, p53 also turns on genes that start apoptosis, a controlled form of cell death in which mitochondria release "
        "cytochrome c into the cytoplasm.\n\n"
        "Researchers exposed two cultured cell lines to the same dose of UV light. Line A has two working copies of the gene "
        "for p53; line B has none. Twelve hours later, 70% of line A cells were held in G1 and 10% were undergoing apoptosis. "
        "In line B, fewer than 5% were held in G1, almost none were undergoing apoptosis, and the cells kept dividing. Over "
        "the following weeks, line B accumulated many more mutations than line A.")},
    {"id": "MCAT-T1-BB-P4", "title": "Passage 4: Two patients who cannot concentrate their urine", "text": (
        "Antidiuretic hormone (ADH) helps the body hold on to water. It is made by neurons of the hypothalamus and released "
        "into the blood when plasma osmolality rises. In the kidney it acts on the collecting ducts, which pass through a "
        "medulla whose interstitial fluid is made very salty by the loops of Henle.\n\n"
        "Two patients who passed large volumes of dilute urine underwent a water deprivation test, followed by an injection "
        "of desmopressin, a synthetic drug that acts like ADH. Urine osmolality was measured at the end of each stage:\n\n"
        "| Person | After water deprivation (mOsm/kg) | After desmopressin (mOsm/kg) |\n|---|---|---|\n"
        "| Healthy volunteer | 900 | 950 |\n| Patient 1 | 150 | 700 |\n| Patient 2 | 150 | 160 |\n\n"
        "During deprivation, both patients' plasma sodium rose above the normal range and both reported intense thirst.")},
    {"id": "MCAT-T2-BB-P1", "title": "Passage 1: A child who cannot fast", "text": (
        "A two-year-old boy became shaky and drowsy whenever he went more than three or four hours without food. Tests showed "
        "a low blood glucose, a high blood lactate and a greatly enlarged liver packed with glycogen. Genetic testing found "
        "that he lacks working glucose-6-phosphatase, an enzyme in the endoplasmic reticulum of liver cells that removes the "
        "phosphate from glucose 6-phosphate so that free glucose can leave the cell.\n\n"
        "During a supervised fast, physicians injected glucagon, which normally raises blood glucose within minutes by "
        "signaling liver cells to break down glycogen. The boy's blood glucose did not rise, but his blood lactate rose "
        "further.\n\n"
        "He was started on frequent meals by day and uncooked cornstarch, a slowly digested starch, at night. With this diet "
        "his fasting glucose stayed in the normal range.")},
    {"id": "MCAT-T2-BB-P2", "title": "Passage 2: Testing a family for a muscle disease", "text": (
        "A muscle-wasting disease in one family is caused by a deletion in a gene on the X chromosome. The disease is "
        "recessive. The family's first son is affected; his father is unaffected and his mother shows no symptoms.\n\n"
        "To test other family members, a laboratory used the polymerase chain reaction (PCR) with primers on either side of "
        "the deletion. The normal allele gives a 450 base-pair product and the deleted allele a 300 base-pair product. The "
        "products were separated by agarose gel electrophoresis, with DNA loaded in wells at the negative electrode.\n\n"
        "| Family member | Bands seen (bp) |\n|---|---|\n| Mother | 450 and 300 |\n| Affected son | 300 |\n"
        "| Daughter | 450 and 300 |\n| Second son | 450 |")},
    {"id": "MCAT-T2-BB-P3", "title": "Passage 3: Blocking a retrovirus", "text": (
        "HIV is an enveloped retrovirus whose genome is two copies of single-stranded RNA. After the virus binds CD4 and a "
        "co-receptor on a helper T cell, its core enters the cell, and the viral enzyme reverse transcriptase copies the RNA "
        "genome into double-stranded DNA. A second viral enzyme, integrase, inserts that DNA into a host chromosome, where it "
        "is transcribed by the host's RNA polymerase. Viral proteins are first made as long polyproteins that the viral "
        "protease cuts into working pieces as new particles bud from the cell.\n\n"
        "Zidovudine (AZT), one of the first anti-HIV drugs, is an analog of the nucleoside thymidine in which the 3' hydroxyl "
        "group of the sugar is replaced by an azido group. Protease inhibitors were added later. Treatment with a single drug "
        "usually failed within months because resistant virus appeared; combinations of drugs from different classes "
        "suppressed the virus for years.")},
    {"id": "MCAT-T2-BB-P4", "title": "Passage 4: Weakness that grows with effort", "text": (
        "At the neuromuscular junction, an action potential reaching the motor neuron's terminal opens voltage-gated calcium "
        "channels. Calcium entry causes vesicles of acetylcholine (ACh) to fuse with the membrane. ACh crosses the cleft, "
        "binds nicotinic receptors on the muscle fiber and opens their ion channels, depolarizing the fiber. "
        "Acetylcholinesterase in the cleft breaks ACh down within milliseconds.\n\n"
        "In myasthenia gravis, antibodies against the nicotinic receptor reduce the number of working receptors. Patients have "
        "muscle weakness that worsens with repeated use, such as drooping eyelids late in the day. Normally, the depolarization "
        "produced at the junction is well above the threshold needed to fire a muscle action potential, and the amount of ACh "
        "released falls slightly with each impulse in a rapid series.\n\n"
        "A patient's grip strength was measured before and two minutes after an injection of a short-acting "
        "acetylcholinesterase inhibitor; it rose from 12 kg to 25 kg.")},
]

ITEMS = [
    # ================= Practice Test 1 =================
    # Passage 1 (FC1 x6)
    Q(1, 1, F1, "1A Enzyme mechanism",
      "In the proposed mechanism, what role does the active-site serine play?",
      ["It attacks the peptide carbonyl carbon", "It donates a proton to the leaving group", "It binds the substrate's side chain", "It holds the histidine in place"],
      "The passage says the activated serine oxygen attacks the carbonyl carbon, forming the tetrahedral intermediate, so serine is the nucleophile. Holding the histidine in place is the aspartate's job.",
      stim="MCAT-T1-BB-P1"),
    Q(1, 2, F1, "1A Enzyme kinetics",
      "The data for the serine-to-alanine enzyme suggest that the serine is needed mainly for:",
      ["catalysis, not substrate binding", "substrate binding, not catalysis", "both binding and catalysis equally", "neither binding nor catalysis"],
      "kcat falls 100,000-fold (50 to 0.0005 per second) while Km barely changes (0.10 to 0.12 mM), so the substrate still binds but is not turned over. A binding defect would show up as a large rise in Km.",
      stim="MCAT-T1-BB-P1"),
    Q(1, 3, F1, "1A Enzyme kinetics",
      "By about what factor is the catalytic efficiency (kcat/Km) of the wild-type enzyme greater than that of the aspartate-to-asparagine enzyme?",
      ["110-fold", "100,000-fold", "10-fold", "1.1-fold"],
      "Wild type: 50 / 0.10 = 500 per mM per second. Asp to Asn: 0.5 / 0.11 ≈ 4.5. The ratio is 500 / 4.5 ≈ 110. Comparing kcat alone would give 100.",
      stim="MCAT-T1-BB-P1", chk=(50 / 0.10) / (0.5 / 0.11)),
    Q(1, 2, F1, "1A Amino acids",
      "Which explanation best accounts for the drop in activity below pH 6?",
      ["The histidine becomes protonated", "The serine becomes deprotonated", "The aspartate gains a negative charge", "Peptide bonds hydrolyze on their own"],
      "Histidine's side chain has a pKa near 6, so below pH 6 it is mostly protonated and can no longer accept the serine's proton. Serine's hydroxyl is far too weak an acid to lose a proton at low pH.",
      stim="MCAT-T1-BB-P1"),
    Q(1, 2, F1, "1A Amino acids",
      "Why is alanine a good choice to replace the active-site serine in this kind of study?",
      ["It removes the hydroxyl but keeps the size", "It adds a positive charge to the site", "It forms a disulfide bond with the histidine", "It is the largest nonpolar amino acid"],
      "Alanine's side chain is a methyl group, so the swap removes only serine's -OH and keeps the shape nearly the same, isolating the role of the hydroxyl. Alanine is small and uncharged.",
      stim="MCAT-T1-BB-P1"),
    Q(1, 2, F1, "1A Protein structure",
      "Based on its substrate preference, the side-chain binding pocket of this enzyme is most likely lined with:",
      ["nonpolar side chains", "negatively charged side chains", "positively charged side chains", "glycine residues only"],
      "Large aromatic side chains such as phenylalanine are nonpolar, so they fit best in a hydrophobic pocket. A negatively charged pocket would favor basic residues like lysine instead.",
      stim="MCAT-T1-BB-P1"),
    # Passage 2 (FC1 x5)
    Q(1, 1, F1, "1B Transcription",
      "The sequence about 30 base pairs upstream of the start site, whose loss abolished all activity, is most likely part of the:",
      ["core promoter", "enhancer", "3' untranslated region", "first intron"],
      "Elements near -30, such as the TATA box, help position RNA polymerase II at the start site, so without them transcription fails. The distant sequence that still worked when flipped behaves like an enhancer.",
      stim="MCAT-T1-BB-P2"),
    Q(1, 2, F1, "1B Gene regulation",
      "The sequence 2,000 base pairs upstream is best classified as an enhancer because it:",
      ["works far away and in either orientation", "lies within the transcribed region", "is required for any transcription at all", "is translated into a short peptide"],
      "Enhancers raise transcription from a distance and independent of orientation, as the flipped sequence did. Loss of all transcription was the effect of the core promoter deletion, not this one.",
      stim="MCAT-T1-BB-P2"),
    Q(1, 2, F1, "1B Gene regulation",
      "How did the siRNA in Experiment 2 most likely reduce HSF protein?",
      ["It led to degradation of HSF mRNA", "It bound HSF protein and blocked it", "It deleted the HSF gene from DNA", "It blocked transcription of every gene"],
      "An siRNA guides a protein complex to the matching mRNA, which is cut or silenced, so less protein is made. It does not change the DNA or bind the protein itself.",
      stim="MCAT-T1-BB-P2"),
    Q(1, 3, F1, "1B Gene regulation",
      "What does Experiment 3 suggest about how heat stress turns on the HRX gene?",
      ["The activating factor already exists in the cell", "New HSF protein must be made first", "HRX mRNA is made without transcription", "Translation of HRX protein is not needed for survival"],
      "HRX mRNA still rose when new protein synthesis was blocked, so the factor that switches the gene on must already be present and is activated by heat rather than newly made.",
      stim="MCAT-T1-BB-P2"),
    Q(1, 1, F1, "1B RNA processing",
      "Why is the mature HRX mRNA much shorter than the stretch of DNA the gene spans?",
      ["Introns are removed by splicing", "Exons are removed by splicing", "The poly(A) tail is cut off", "Only one DNA strand is copied"],
      "The primary transcript contains introns that the spliceosome removes, joining the exons into a shorter mature mRNA. Copying only one strand does not shorten the product.",
      stim="MCAT-T1-BB-P2"),
    # Passage 3 (FC2 x4, FC1 x1)
    Q(1, 1, F2, "2C Cell cycle control",
      "At which point in the cell cycle were most line A cells held after UV exposure?",
      ["Before DNA replication begins", "After DNA replication, before mitosis", "During metaphase of mitosis", "During cytokinesis"],
      "p21 inhibits the kinases that drive cells from G1 into S, so damaged cells stop before replicating their DNA, as 70% of line A did.",
      stim="MCAT-T1-BB-P3"),
    Q(1, 2, F2, "2C Cancer",
      "Based on its role in the passage, the gene for p53 is best classed as:",
      ["a tumor suppressor gene", "a proto-oncogene", "an oncogene", "an essential housekeeping gene"],
      "p53 halts division and triggers apoptosis after damage, so losing its function, as in line B, lets damaged cells keep dividing: the mark of a tumor suppressor. A proto-oncogene promotes division and causes cancer when it becomes overactive.",
      stim="MCAT-T1-BB-P3"),
    Q(1, 2, F2, "2A Mitochondria and apoptosis",
      "In the apoptosis described in the passage, cytochrome c is released from:",
      ["the mitochondrial intermembrane space", "the nucleus", "the lumen of the rough endoplasmic reticulum", "lysosomes"],
      "Cytochrome c normally carries electrons between complexes on the inner membrane and sits in the intermembrane space; its release into the cytoplasm starts the caspase cascade.",
      stim="MCAT-T1-BB-P3"),
    Q(1, 2, F2, "2C Cancer",
      "Why did line B accumulate more mutations than line A over the following weeks?",
      ["It divided without pausing to repair", "It repaired damage more slowly in S phase", "It lost all its DNA polymerases", "It absorbed more UV light"],
      "Without p53, line B neither arrested in G1 nor underwent apoptosis, so damaged cells copied unrepaired DNA and passed the errors on. Both lines received the same UV dose.",
      stim="MCAT-T1-BB-P3"),
    Q(1, 2, F1, "1B DNA repair",
      "Which repair pathway mainly removes the pyrimidine dimers caused by UV light?",
      ["Nucleotide excision repair", "Mismatch repair", "Homologous recombination", "Telomerase extension"],
      "Bulky lesions that distort the helix, such as pyrimidine dimers, are cut out with a short stretch of the strand and the gap filled in. Mismatch repair corrects replication errors between normal bases.",
      stim="MCAT-T1-BB-P3"),
    # Passage 4 (FC3 x6)
    Q(1, 1, F3, "3A Endocrine system",
      "Where is ADH released into the bloodstream?",
      ["Posterior pituitary", "Anterior pituitary", "Adrenal cortex", "Kidney cortex"],
      "Hypothalamic neurons make ADH and carry it down their axons to the posterior pituitary, which releases it. The anterior pituitary makes its own hormones under control of releasing factors.",
      stim="MCAT-T1-BB-P4"),
    Q(1, 2, F3, "3B Excretory system",
      "How does ADH increase water reabsorption in the collecting ducts?",
      ["By adding aquaporins to the membrane", "By pumping sodium out of the duct", "By making the loop of Henle longer", "By raising the glomerular filtration rate"],
      "ADH signaling moves vesicles carrying water channels (aquaporins) into the membrane of collecting duct cells, so water can follow the osmotic gradient into the salty medulla.",
      stim="MCAT-T1-BB-P4"),
    Q(1, 2, F3, "3B Excretory system",
      "The results for Patient 2 are best explained by:",
      ["kidneys that do not respond to ADH", "a pituitary that makes no ADH at all", "a medulla that is too salty", "drinking too much water"],
      "Patient 2's urine stayed dilute even after desmopressin, so the hormone was supplied but had no effect, which points to the kidney. Patient 1 concentrated urine once given the drug, so that patient lacks ADH.",
      stim="MCAT-T1-BB-P4"),
    Q(1, 2, F3, "3A Endocrine system",
      "During water deprivation, what most directly stimulated the patients' thirst?",
      ["Rising plasma osmolality", "Falling plasma sodium", "A rise in urine osmolality", "High levels of ADH in blood"],
      "As both patients kept losing water in urine, plasma sodium and osmolality rose, and hypothalamic osmoreceptors drive thirst. Their urine stayed dilute, so it was not rising urine osmolality.",
      stim="MCAT-T1-BB-P4"),
    Q(1, 3, F3, "3B Excretory system",
      "Which hormone acts on the distal nephron to increase sodium reabsorption, raising blood volume?",
      ["Aldosterone", "Calcitonin", "Glucagon", "Oxytocin"],
      "Aldosterone from the adrenal cortex increases sodium reabsorption and potassium secretion in the distal tubule and collecting duct; water follows the sodium. Calcitonin lowers blood calcium.",
      stim="MCAT-T1-BB-P4"),
    Q(1, 2, F3, "3B Excretory system",
      "The loops of Henle are essential for the healthy volunteer's urine of 900 mOsm/kg because they:",
      ["make the medulla hyperosmotic", "secrete ADH into the filtrate", "filter proteins from the blood", "pump water into the collecting duct"],
      "Countercurrent multiplication by the loops builds a very salty medullary interstitium, and only that gradient lets water leave the collecting duct when ADH opens its channels.",
      stim="MCAT-T1-BB-P4"),
    # Discrete
    Q(1, 2, F1, "1D Glycolysis",
      "Phosphofructokinase-1 is inhibited by ATP and activated by AMP. When a muscle cell's AMP level rises during hard exercise, glycolysis will:",
      ["speed up", "slow down", "stop completely", "run in reverse"],
      "A high AMP level signals low energy, and AMP activates phosphofructokinase-1, the main control point of glycolysis, so flux through the pathway increases to make more ATP.",
    ),
    Q(1, 2, F1, "1C Population genetics",
      "A recessive trait appears in 1 of every 400 people in a population in Hardy-Weinberg equilibrium. About what percent of people are carriers?",
      ["9.5%", "5.0%", "0.25%", "90%"],
      "q² = 1/400, so q = 0.05 and p = 0.95, and carriers are 2pq = 2 x 0.95 x 0.05 = 0.095, or 9.5%. 5% is the recessive allele frequency, not the carrier frequency.",
      chk=100 * 2 * 0.95 * 0.05),
    Q(1, 2, F1, "1C Meiosis",
      "One pair of homologous chromosomes fails to separate in meiosis I in a primary spermatocyte, and meiosis II is normal. How many of the four resulting sperm have an abnormal chromosome number?",
      ["All four", "Two", "One", "None"],
      "If homologs fail to separate in meiosis I, one secondary cell gets both and the other none, so all four products are aneuploid (two with an extra chromosome, two missing one). Nondisjunction in meiosis II affects only two.",
    ),
    Q(1, 2, F1, "1D Fatty acid metabolism",
      "How many acetyl-CoA molecules does the complete beta-oxidation of one palmitate (16 carbons) produce?",
      ["8", "7", "16", "4"],
      "Each acetyl-CoA carries two carbons, so 16 carbons give 8. It takes 7 rounds, because the last round splits a four-carbon unit into two acetyl-CoA.",
      chk=16 / 2),
    Q(1, 1, F2, "2B Bacterial genetics",
      "A plasmid passes from one bacterium to another through a pilus that joins the two cells. This process is called:",
      ["conjugation", "transformation", "transduction", "binary fission"],
      "Conjugation is DNA transfer by direct contact. Transformation is uptake of free DNA from the surroundings, and transduction is transfer by a bacteriophage.",
    ),
    Q(1, 1, F2, "2A Plasma membrane",
      "Which molecule crosses a pure phospholipid bilayer most readily by simple diffusion?",
      ["Oxygen gas", "Glucose", "Sodium ions", "Glutamate"],
      "Small nonpolar molecules such as O2 dissolve in the hydrophobic core and diffuse straight through. Glucose, ions and charged amino acids need transport proteins.",
    ),
    Q(1, 1, F3, "3B Circulatory system",
      "Deoxygenated blood returning from the body first enters which chamber of the heart?",
      ["The right atrium", "The left atrium", "The right ventricle", "The left ventricle"],
      "The venae cavae empty into the right atrium, then blood passes to the right ventricle and the lungs. The left atrium receives oxygenated blood from the pulmonary veins.",
    ),
    Q(1, 1, F3, "3A Nervous system",
      "The rising phase of a neuron's action potential is caused mainly by:",
      ["sodium flowing in through voltage-gated channels", "potassium flowing out through leak channels", "chloride flowing in through ligand-gated channels", "the sodium-potassium pump speeding up"],
      "Once threshold is reached, voltage-gated sodium channels open and Na⁺ rushes in, driving the membrane positive. Potassium leaving through voltage-gated channels then repolarizes it.",
    ),

    # ================= Practice Test 2 =================
    # Passage 1 (FC1 x6)
    Q(2, 1, F1, "1D Gluconeogenesis and glycogen",
      "The enzyme the boy lacks is needed for the liver to release glucose made by:",
      ["glycogen breakdown and gluconeogenesis", "glycogen breakdown only", "gluconeogenesis only", "fatty acid synthesis and the urea cycle"],
      "Both glycogenolysis and gluconeogenesis end with glucose 6-phosphate in the liver, and glucose-6-phosphatase is the last step that frees glucose to leave the cell. That is why fasting quickly drops his blood sugar.",
      stim="MCAT-T2-BB-P1"),
    Q(2, 2, F1, "1D Gluconeogenesis and glycogen",
      "Why did glucagon fail to raise the boy's blood glucose?",
      ["Its product was trapped as glucose 6-phosphate", "His liver cells lack working glucagon receptors", "His liver contains no stored glycogen", "Glucagon cannot reach the liver"],
      "Glucagon still triggered glycogen breakdown, but the product stayed phosphorylated inside the cell and could not leave as free glucose. His liver was in fact packed with glycogen.",
      stim="MCAT-T2-BB-P1"),
    Q(2, 3, F1, "1D Glycolysis",
      "Why did the boy's blood lactate rise further after glucagon?",
      ["Trapped glucose 6-phosphate fed glycolysis", "Glucagon blocked lactate uptake by the muscles", "His red cells stopped making lactate", "Oxygen delivery to the liver failed"],
      "Glucose 6-phosphate that cannot be dephosphorylated piles up and is pushed down glycolysis to pyruvate, much of which is reduced to lactate. Red cells make lactate whatever the liver does.",
      stim="MCAT-T2-BB-P1"),
    Q(2, 2, F1, "1D Carbohydrate digestion",
      "Uncooked cornstarch at night helps the boy mainly because it:",
      ["releases glucose slowly overnight", "is absorbed directly into blood as glycogen", "supplies the missing enzyme", "blocks glycogen breakdown"],
      "Raw starch is digested slowly, so glucose keeps entering the blood from the gut through the night and he does not depend on the liver releasing glucose. Glycogen is not absorbed whole.",
      stim="MCAT-T2-BB-P1"),
    Q(2, 2, F1, "1D Hormonal regulation of metabolism",
      "Inside a liver cell, glucagon's signal is carried mainly by which second messenger?",
      ["Cyclic AMP", "Calcium released by IP3", "Cyclic GMP", "Nitric oxide"],
      "Glucagon binds a G protein-coupled receptor that activates adenylyl cyclase; the cAMP made activates protein kinase A, which turns on glycogen breakdown and turns off glycogen synthesis.",
      stim="MCAT-T2-BB-P1"),
    Q(2, 2, F1, "1D Gluconeogenesis",
      "Which enzyme carries out the first step of gluconeogenesis from pyruvate?",
      ["Pyruvate carboxylase", "Pyruvate kinase", "Pyruvate dehydrogenase", "Lactate dehydrogenase"],
      "Pyruvate carboxylase, in the mitochondria, adds CO2 to pyruvate to make oxaloacetate. Pyruvate kinase runs the last step of glycolysis, and pyruvate dehydrogenase sends pyruvate to the citric acid cycle.",
      stim="MCAT-T2-BB-P1"),
    # Passage 2 (FC1 x5)
    Q(2, 2, F1, "1C Inheritance",
      "If the parents have another son, what is the probability that he will be affected?",
      ["50%", "25%", "12.5%", "0%"],
      "The mother carries one deleted X, and a son gets his single X from her, so each son has a 1 in 2 chance of being affected. 25% is the chance for any child, before knowing it is a son.",
      stim="MCAT-T2-BB-P2", chk=50),
    Q(2, 1, F1, "1C Inheritance",
      "What do the daughter's results show?",
      ["She is a carrier", "She is affected", "She has two normal alleles", "She has two deleted alleles"],
      "She has both the 450 bp normal band and the 300 bp deletion band, so she is heterozygous. With one working copy of a recessive allele she is a carrier, like her mother.",
      stim="MCAT-T2-BB-P2"),
    Q(2, 2, F1, "1C Inheritance",
      "Why does this disease affect sons far more often than daughters?",
      ["Males have one X and no second copy", "The gene is on the Y chromosome", "Females inactivate the deleted X", "Sons inherit their X from their father"],
      "A male has a single X, so one deleted allele causes disease; a female needs two. Sons receive their X from their mother, not their father.",
      stim="MCAT-T2-BB-P2"),
    Q(2, 2, F1, "1B Recombinant DNA",
      "Why does PCR use a DNA polymerase from a heat-tolerant organism?",
      ["It survives the strand-separation heat", "It copies RNA as well as DNA", "It needs no primers to start", "It works only at or near room temperature"],
      "Each PCR cycle heats the DNA near 95 °C to separate the strands; a heat-tolerant polymerase is not destroyed and works through many cycles. It still needs primers.",
      stim="MCAT-T2-BB-P2"),
    Q(2, 2, F1, "1B Recombinant DNA",
      "On the gel, compared with the 450 bp product, the 300 bp product:",
      ["moves farther from the wells", "stays closer to the wells", "moves toward the negative electrode", "travels the same distance"],
      "DNA is negatively charged and moves toward the positive electrode, and smaller fragments slip through the gel faster, so the 300 bp band runs farther from the wells.",
      stim="MCAT-T2-BB-P2"),
    # Passage 3 (FC2 x4, FC1 x1)
    Q(2, 1, F2, "2B Viruses",
      "Reverse transcriptase is best described as an enzyme that:",
      ["makes DNA from an RNA template", "makes RNA from a DNA template", "cuts viral polyproteins", "joins viral DNA to host DNA"],
      "It is an RNA-dependent DNA polymerase, copying the RNA genome into DNA. Cutting polyproteins is the protease's job, and inserting the DNA is integrase's.",
      stim="MCAT-T2-BB-P3"),
    Q(2, 2, F2, "2B Viruses",
      "How does AZT stop the viral DNA from being completed?",
      ["It lacks the 3' hydroxyl for chain growth", "It binds CD4 and blocks the virus from entering", "It cuts the RNA genome in two", "It blocks host RNA polymerase"],
      "A new nucleotide is added by joining its phosphate to the 3' hydroxyl of the last one. AZT has an azido group there, so once it is added the chain cannot grow further.",
      stim="MCAT-T2-BB-P3"),
    Q(2, 3, F2, "2B Viruses",
      "Resistant virus appears quickly during treatment with a single drug mainly because reverse transcriptase:",
      ["lacks proofreading, so it makes many errors", "copies DNA more accurately than host enzymes", "is made in very small amounts", "cannot bind any nucleoside analog"],
      "Without proofreading, reverse transcription introduces mutations in nearly every new genome, so a variant that resists one drug soon arises and is selected. Combinations require several changes at once.",
      stim="MCAT-T2-BB-P3"),
    Q(2, 2, F2, "2B Viruses",
      "Where does HIV get the lipid envelope around each new particle?",
      ["The host cell's plasma membrane", "The host cell's nuclear envelope", "Lipids made by viral enzymes", "The host cell's cell wall"],
      "Enveloped viruses wrap themselves in host membrane as they bud; HIV buds from the plasma membrane of the T cell. Viruses make no lipids of their own.",
      stim="MCAT-T2-BB-P3"),
    Q(2, 1, F1, "1B Nucleic acid structure",
      "When reverse transcriptase adds AZT opposite a base in the template, which base is it pairing with?",
      ["Adenine", "Guanine", "Cytosine", "Uracil"],
      "AZT is a thymidine analog, and thymine pairs with adenine. Guanine pairs with cytosine.",
      stim="MCAT-T2-BB-P3"),
    # Passage 4 (FC3 x6)
    Q(2, 1, F3, "3A Synaptic transmission",
      "What directly triggers the release of ACh from the motor neuron terminal?",
      ["Calcium entering the terminal", "Sodium leaving the terminal", "ACh binding the muscle receptor", "Potassium entering the terminal"],
      "The action potential opens voltage-gated calcium channels, and the rise in calcium inside the terminal makes ACh vesicles fuse with the membrane.",
      stim="MCAT-T2-BB-P4"),
    Q(2, 2, F3, "3A Synaptic transmission",
      "Why did the patient's grip strength improve after the injection?",
      ["ACh stayed in the cleft longer", "New receptors were made at once", "The antibodies were destroyed", "Calcium entry into the muscle fell"],
      "Blocking acetylcholinesterase slows ACh breakdown, so each molecule has more chances to bind the remaining receptors and the muscle reaches threshold more often. Making new receptors would take far longer than two minutes.",
      stim="MCAT-T2-BB-P4"),
    Q(2, 2, F3, "3B Muscle contraction",
      "Inside the muscle fiber, the depolarization leads to contraction when calcium released from the sarcoplasmic reticulum:",
      ["binds troponin, moving tropomyosin aside", "binds myosin, releasing ADP", "binds actin directly, breaking cross-bridges", "binds ACh, opening its receptor"],
      "Calcium binding to troponin shifts tropomyosin off the myosin-binding sites on actin, so cross-bridges can form. Calcium does not act on the ACh receptor.",
      stim="MCAT-T2-BB-P4"),
    Q(2, 2, F3, "3B Immune system",
      "Which cells produce the antibodies against the nicotinic receptor?",
      ["Plasma cells", "Cytotoxic T cells", "Macrophages", "Neutrophils"],
      "Antibodies are secreted by plasma cells, which develop from activated B lymphocytes. Cytotoxic T cells kill infected cells directly and do not make antibodies.",
      stim="MCAT-T2-BB-P4"),
    Q(2, 3, F3, "3B Muscle contraction",
      "After death, muscles stiffen in rigor mortis. This happens because without ATP, myosin heads:",
      ["cannot detach from actin", "cannot bind actin at all", "release too much calcium", "break down tropomyosin"],
      "ATP binding is what releases a myosin head from actin at the end of each stroke. Without ATP the heads stay locked to actin, so the muscle stays rigid.",
      stim="MCAT-T2-BB-P4"),
    Q(2, 3, F3, "3A Synaptic transmission",
      "Why does a myasthenia patient's weakness grow with repeated use of a muscle?",
      ["Falling ACh release stops reaching threshold", "More receptors appear with each new contraction", "Acetylcholinesterase is used up", "The motor neuron stops firing"],
      "With fewer receptors, the junction's depolarization has little margin above threshold. As ACh release falls slightly with each impulse in a series, more fibers fail to fire, so strength fades.",
      stim="MCAT-T2-BB-P4"),
    # Discrete
    Q(2, 2, F1, "1D Oxidative phosphorylation",
      "Cyanide blocks complex IV of the electron transport chain. What happens to a cell's oxygen consumption?",
      ["It nearly stops", "It doubles", "It is unchanged", "It shifts to complex I"],
      "Complex IV hands electrons to O2, the final acceptor. With it blocked, electrons back up along the chain and oxygen is no longer used.",
    ),
    Q(2, 1, F1, "1A Protein structure",
      "An alpha helix in a protein is held in shape mainly by:",
      ["hydrogen bonds between backbone groups", "disulfide bonds between cysteine side chains", "ionic bonds between side chains", "the peptide bonds themselves"],
      "In an alpha helix, each backbone C=O forms a hydrogen bond with the N-H four residues along, so secondary structure depends on the backbone, not the side chains.",
    ),
    Q(2, 2, F1, "1C Mendelian genetics",
      "Two plants heterozygous for two unlinked genes (AaBb) are crossed. About what percent of the offspring show both dominant traits?",
      ["56%", "75%", "25%", "6.3%"],
      "Each gene gives the dominant trait 3/4 of the time, and the genes assort independently, so 3/4 x 3/4 = 9/16 ≈ 56%. 6.3% (1/16) is the fraction showing both recessive traits.",
      chk=100 * 9 / 16),
    Q(2, 2, F1, "1B Mutations",
      "A point mutation changes the codon UAC (tyrosine) to UAA. What is the most likely effect?",
      ["A shortened protein, from an early stop", "One amino acid replaced by a different one", "No change in the protein", "A frameshift after the mutation"],
      "UAA is a stop codon, so translation ends early: a nonsense mutation. A single base substitution does not shift the reading frame.",
    ),
    Q(2, 1, F2, "2C Embryogenesis",
      "From which germ layer does the nervous system develop?",
      ["Ectoderm", "Mesoderm", "Endoderm", "Trophoblast"],
      "The neural tube forms from ectoderm, which also gives the epidermis. Mesoderm forms muscle, bone and blood, and endoderm lines the gut.",
    ),
    Q(2, 1, F2, "2A Organelles",
      "A cell that secretes large amounts of a digestive enzyme would be expected to have a large amount of:",
      ["rough endoplasmic reticulum", "smooth endoplasmic reticulum", "peroxisomes", "centrioles"],
      "Proteins for secretion are made on ribosomes bound to the rough ER and then pass through the Golgi apparatus. Smooth ER makes lipids and detoxifies drugs.",
    ),
    Q(2, 2, F3, "3B Respiratory system",
      "In actively working muscle, the CO2 level is high and the pH is low. How does this affect hemoglobin there?",
      ["It releases more oxygen", "It binds oxygen more tightly", "It releases less oxygen", "It stops carrying CO2"],
      "Higher CO2 and acidity lower hemoglobin's affinity for oxygen (the Bohr effect), shifting the dissociation curve to the right so more oxygen is unloaded where it is needed.",
    ),
    Q(2, 1, F3, "3B Digestive system",
      "Bile helps digest fats in the small intestine mainly by:",
      ["emulsifying them into small droplets", "breaking ester bonds in triglycerides", "absorbing fatty acids into the blood", "neutralizing stomach acid alone"],
      "Bile salts break fat into small droplets, giving pancreatic lipase much more surface to work on. Lipase, not bile, breaks the ester bonds.",
    ),
]
