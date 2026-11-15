# Survey of the Natural Sciences: Biology. Original items.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)
# Per test: cell and molecular 5, diversity of life 3, structure and function of systems 5, genetics 4,
# evolution and ecology 3 (the ADA lists the five areas without weights; this split is Tigertest's).
# Drill-only (test 0): cell 3, genetics 3, diversity 2, systems 2.

CELL, DIV, SYS, GEN, EVO = "datCell", "datDiversity", "datSystems", "datGenetics", "datEvolution"
MET, PROC, STRUC, EXP = "Cell metabolism", "Cellular processes", "Cell structure and function", "Experimental cell biology"
MOL, HUM, CLAS, CHRO, TECH, EXPR = ("Molecular genetics", "Human genetics", "Classical genetics", "Chromosomal genetics",
                                    "Genetic technology", "Gene expression")

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, CELL, MET, "In which part of the cell does glycolysis take place?",
      ["Cytosol", "Mitochondrial matrix", "Inner mitochondrial membrane", "Nucleus"],
      "Glycolysis splits glucose into two pyruvate in the cytosol. The citric acid cycle runs in the mitochondrial matrix and "
      "the electron transport chain sits in the inner mitochondrial membrane."),
    Q(1, 2, CELL, MET, "An enzyme is mixed with a competitive inhibitor. Compared with the uninhibited enzyme, what happens to Km and Vmax?",
      ["Km rises; Vmax is unchanged", "Km falls; Vmax is unchanged", "Km is unchanged; Vmax falls", "Both Km and Vmax fall"],
      "A competitive inhibitor competes for the active site, so more substrate is needed to reach half of Vmax (Km rises), but "
      "enough substrate still outcompetes it, so Vmax is unchanged. A noncompetitive inhibitor lowers Vmax instead."),
    Q(1, 2, CELL, PROC, "Which molecule moves across a plasma membrane mainly by simple diffusion through the lipid bilayer?",
      ["Oxygen", "Glucose", "Sodium ion", "Water-soluble protein"],
      "Small nonpolar molecules such as O₂ and CO₂ dissolve in the bilayer and diffuse straight through. Glucose and ions need "
      "carrier or channel proteins, and proteins are far too large."),
    Q(1, 2, CELL, STRUC, "Proteins destined for secretion are first made on ribosomes bound to which organelle?",
      ["Rough ER", "Smooth ER", "Golgi apparatus", "Lysosome"],
      "Secreted proteins are translated by ribosomes on the rough ER, threaded into its lumen, then sent to the Golgi for "
      "modification and packaging. The Golgi has no ribosomes."),
    Q(1, 3, CELL, "Mitosis/meiosis", "A diploid cell with 2n = 8 completes meiosis I. How many chromosomes does each daughter cell have, and how many chromatids?",
      ["4 chromosomes, 8 chromatids", "8 chromosomes, 8 chromatids", "4 chromosomes, 4 chromatids", "8 chromosomes, 16 chromatids"],
      "Meiosis I separates homologs, so each daughter gets 4 chromosomes, but sister chromatids are still joined, giving 8 "
      "chromatids. They separate in meiosis II."),
    Q(1, 1, DIV, "Eubacteria", "Which structure is found in bacteria but not in eukaryotic cells?",
      ["Peptidoglycan", "Ribosomes", "Plasma membrane", "Cytoplasm"],
      "Peptidoglycan is unique to the walls of bacteria. Ribosomes, a plasma membrane and cytoplasm are found in every cell, "
      "though bacterial ribosomes are smaller (70S) than eukaryotic ones (80S)."),
    Q(1, 2, DIV, "Viruses", "A retrovirus such as HIV copies its RNA genome into DNA using which enzyme?",
      ["Reverse transcriptase", "RNA-dependent RNA polymerase", "DNA ligase", "Viral integrase"],
      "Reverse transcriptase makes DNA from an RNA template. Integrase then inserts that DNA into the host genome; it does not "
      "copy the genome."),
    Q(1, 2, DIV, "Plantae", "In the life cycle of a moss, which generation is the larger, longer-lived and photosynthetic one?",
      ["Haploid gametophyte", "Diploid sporophyte", "Diploid gametophyte", "Haploid sporophyte"],
      "Mosses and other bryophytes are gametophyte-dominant: the green plant is the haploid gametophyte, and the small diploid "
      "sporophyte grows from it. Ferns and seed plants are sporophyte-dominant."),
    Q(1, 2, SYS, "Circulatory", "Oxygenated blood returning from the lungs enters the heart through which chamber?",
      ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
      "The pulmonary veins carry oxygenated blood to the left atrium, which passes it to the left ventricle for the systemic "
      "circuit. The right atrium receives deoxygenated blood from the venae cavae."),
    Q(1, 2, SYS, "Digestive", "Which cells of the stomach lining secrete hydrochloric acid?",
      ["Parietal cells", "Chief cells", "Mucous neck cells", "Enteroendocrine cells"],
      "Parietal cells secrete HCl and intrinsic factor. Chief cells secrete pepsinogen, mucous neck cells secrete mucus, and "
      "enteroendocrine cells such as G cells secrete hormones like gastrin."),
    Q(1, 3, SYS, "Urinary", "Antidiuretic hormone (ADH) makes urine more concentrated mainly by acting on which part of the nephron?",
      ["Collecting duct", "Proximal convoluted tubule", "Glomerulus", "Descending loop of Henle"],
      "ADH inserts aquaporins into collecting duct cells, so water leaves the filtrate into the salty medulla. The proximal "
      "tubule reabsorbs most water without hormonal control."),
    Q(1, 2, SYS, "Nervous/sensory", "During an action potential, what causes the rapid depolarization phase?",
      ["Na⁺ entering the cell", "K⁺ leaving the cell", "Cl⁻ entering the cell", "Ca²⁺ leaving the cell"],
      "Voltage-gated Na⁺ channels open and Na⁺ rushes in, driving the membrane positive. K⁺ leaving through voltage-gated K⁺ "
      "channels causes repolarization."),
    Q(1, 1, SYS, "Endocrine", "Which hormone lowers blood glucose?",
      ["Insulin", "Glucagon", "Cortisol", "Epinephrine"],
      "Insulin, from pancreatic beta cells, promotes glucose uptake and storage. Glucagon, cortisol and epinephrine all raise "
      "blood glucose."),
    Q(1, 2, GEN, CLAS, "Two pea plants heterozygous for seed color (Yy) are crossed. What fraction of the offspring are expected to be heterozygous?",
      ["1/2", "1/4", "3/4", "1/3"],
      "Yy × Yy gives YY, Yy, yY and yy in equal parts, so 2 of 4, or 1/2, are heterozygous. 3/4 is the share showing the "
      "dominant phenotype.", chk=0.5),
    Q(1, 2, GEN, MOL, "A DNA template strand reads 3'-TAC GGA-5'. What is the mRNA made from it, written 5' to 3'?",
      ["5'-AUG CCU-3'", "5'-UAC GGA-3'", "5'-ATG CCT-3'", "5'-UCC GUA-3'"],
      "mRNA is complementary and antiparallel to the template: 3'-TAC GGA-5' pairs with 5'-AUG CCU-3', with uracil in place of "
      "thymine. 5'-ATG CCT-3' is the coding strand in DNA, not the mRNA."),
    Q(1, 3, GEN, HUM, "A woman whose father has hemophilia (X-linked recessive) has children with an unaffected man. What is the chance that a son of theirs has hemophilia?",
      ["1/2", "1/4", "0", "1"],
      "She received her father's affected X, so she is a carrier (XᴴXʰ). A son gets his X from her, so each son has a 1/2 "
      "chance. 1/4 is the chance that any child is an affected son.", chk=0.5),
    Q(1, 2, GEN, CHRO, "Nondisjunction of chromosome 21 during meiosis can produce a gamete that leads to which condition after fertilization?",
      ["Trisomy 21", "Monosomy X", "Triploidy", "Deletion of 21q"],
      "Nondisjunction leaves a gamete with two copies of chromosome 21; with a normal gamete the zygote has three copies "
      "(Down syndrome). Triploidy is a whole extra set of chromosomes."),
    Q(1, 2, EVO, "Population genetics", "In a population at Hardy-Weinberg equilibrium, 16% of individuals show a recessive trait. What is the frequency of the dominant allele?",
      ["0.6", "0.4", "0.84", "0.16"],
      "q² = 0.16, so q = 0.4 and p = 1 - 0.4 = 0.6. 0.84 is the share of people showing the dominant phenotype (p² + 2pq).", chk=0.6),
    Q(1, 2, EVO, "Ecology", "In a food chain, about how much of the energy at one trophic level is usually passed to the next?",
      ["About 10%", "About 50%", "About 90%", "About 1%"],
      "Most energy at each level is lost as heat in respiration or left unconsumed, so roughly 10% reaches the next level. That "
      "is why food chains rarely have more than four or five levels."),
    Q(1, 2, EVO, "Animal behavior", "A young goose follows the first moving object it sees after hatching. This is an example of what?",
      ["Imprinting", "Habituation", "Classical conditioning", "Fixed action pattern"],
      "Imprinting is learning fixed during a short critical period, such as a gosling attaching to the first moving object. "
      "Habituation is a fading response to a repeated harmless stimulus."),

    # ---------------- Practice Test 2 ----------------
    Q(2, 2, CELL, MET, "Where in the cell is most ATP made during aerobic respiration?",
      ["Inner mitochondrial membrane", "Outer mitochondrial membrane", "Mitochondrial intermembrane space", "Mitochondrial matrix"],
      "ATP synthase in the inner membrane makes most ATP by oxidative phosphorylation, driven by the proton gradient. The "
      "matrix runs the citric acid cycle, which makes only a little ATP (or GTP) directly."),
    Q(2, 2, CELL, MET, "In photosynthesis, which process produces the O₂ that a plant releases?",
      ["Splitting of water", "Fixing of CO₂", "Reduction of NADP⁺", "Regeneration of RuBP"],
      "Photosystem II splits water to replace its electrons, releasing O₂. CO₂ fixation by rubisco and RuBP regeneration are "
      "steps of the Calvin cycle and release no oxygen."),
    Q(2, 2, CELL, PROC, "A hormone binds a receptor on the cell surface, and the receptor activates a G protein. Which second messenger does adenylyl cyclase then make?",
      ["Cyclic AMP", "Inositol trisphosphate", "Diacylglycerol", "Cyclic GMP"],
      "Adenylyl cyclase converts ATP to cAMP, which activates protein kinase A. IP₃ and DAG come from phospholipase C, and "
      "cGMP from guanylyl cyclase."),
    Q(2, 1, CELL, STRUC, "Which organelle contains hydrolytic enzymes that work best at an acidic pH?",
      ["Lysosome", "Peroxisome", "Ribosome", "Centrosome"],
      "Lysosomes keep an internal pH near 5 and digest macromolecules with acid hydrolases. Peroxisomes break down fatty acids "
      "and hydrogen peroxide but are not acidic digestive compartments."),
    Q(2, 2, CELL, EXP, "A researcher wants to separate cell organelles by size and density. Which technique is used?",
      ["Differential centrifugation", "Gel electrophoresis", "Size-exclusion chromatography", "Fluorescence microscopy"],
      "Spinning a homogenate at increasing speeds pellets nuclei first, then mitochondria, then microsomes. Electrophoresis and "
      "size-exclusion chromatography separate molecules, not organelles, and microscopy only views them."),
    Q(2, 2, DIV, "Fungi", "What do the cell walls of fungi contain?",
      ["Chitin", "Cellulose", "Peptidoglycan", "Silica"],
      "Fungal walls are made mainly of chitin, the same polymer as in insect exoskeletons. Plant walls are cellulose, bacterial "
      "walls peptidoglycan, and diatoms build silica shells."),
    Q(2, 2, DIV, "Archaebacteria", "Which feature distinguishes Archaea from Bacteria?",
      ["Ether-linked lipids", "A circular chromosome", "Ester-linked lipids", "70S ribosomes"],
      "Archaeal membrane lipids join glycerol to their side chains by ether bonds, while bacteria use ester bonds. Both groups "
      "have circular chromosomes, 70S ribosomes and no nucleus."),
    Q(2, 2, DIV, "Animalia", "Which animal group has a water vascular system and tube feet?",
      ["Echinoderms", "Cnidarians", "Arthropods", "Cephalopods"],
      "Sea stars, sea urchins and other echinoderms move and feed with tube feet driven by a water vascular system. Cnidarians "
      "have stinging cells, arthropods jointed legs, and cephalopods a muscular foot turned into arms."),
    Q(2, 2, SYS, "Respiratory", "Most carbon dioxide is carried in the blood in which form?",
      ["Bicarbonate ion", "Dissolved CO₂", "Bound to hemoglobin's heme", "Carbonic acid"],
      "About 70% of CO₂ travels as HCO₃⁻, made in red cells by carbonic anhydrase. Some binds hemoglobin's protein chains, "
      "not the heme iron, and a little dissolves directly."),
    Q(2, 2, SYS, "Muscular", "During skeletal muscle contraction, calcium ions bind to which protein?",
      ["Troponin", "Tropomyosin", "Myosin", "Actin"],
      "Ca²⁺ binds troponin, which shifts tropomyosin off the binding sites on actin so myosin heads can attach. Calcium does "
      "not bind tropomyosin itself."),
    Q(2, 2, SYS, "Lymphatic/immune", "Which cells make antibodies?",
      ["Plasma cells", "Helper T cells", "Cytotoxic T cells", "Macrophages"],
      "Activated B cells become plasma cells, which secrete antibodies. Helper T cells signal other cells, cytotoxic T cells "
      "kill infected cells, and macrophages engulf and present antigen."),
    Q(2, 3, SYS, "Reproductive", "What triggers ovulation in the menstrual cycle?",
      ["A surge of LH", "A fall in estrogen", "A rise in progesterone", "A fall in FSH"],
      "Rising estrogen from the growing follicle switches to positive feedback and causes an LH surge, which triggers ovulation "
      "about a day later. Progesterone rises after ovulation, from the corpus luteum."),
    Q(2, 2, SYS, "Skeletal", "Which cells break down bone matrix?",
      ["Osteoclasts", "Osteoblasts", "Osteocytes", "Chondrocytes"],
      "Osteoclasts resorb bone and release calcium into the blood. Osteoblasts lay down new matrix, osteocytes maintain it, "
      "and chondrocytes make cartilage."),
    Q(2, 2, GEN, CLAS, "A cross of AaBb × AaBb involves two unlinked genes with complete dominance. What fraction of offspring show both recessive traits?",
      ["1/16", "1/4", "3/16", "9/16"],
      "Each gene gives a 1/4 chance of the recessive phenotype, and unlinked genes assort independently, so 1/4 × 1/4 = "
      "1/16. 9/16 show both dominant traits.", chk=1 / 16),
    Q(2, 2, GEN, EXPR, "In the lac operon of E. coli, what does the repressor do when lactose is absent?",
      ["Binds the operator", "Binds lactose", "Binds the CAP site", "Degrades lac mRNA"],
      "With no lactose, the repressor sits on the operator and blocks RNA polymerase. Lactose (as allolactose) binds the "
      "repressor and releases it; CAP is a separate activator."),
    Q(2, 2, GEN, TECH, "Which enzyme cuts DNA at a specific short sequence and is used to make recombinant DNA?",
      ["Restriction enzyme", "DNA ligase", "Reverse transcriptase", "DNA polymerase I"],
      "Restriction enzymes cut at specific sites, often leaving sticky ends. DNA ligase then seals the pieces together; it does "
      "not cut."),
    Q(2, 3, GEN, "Epigenetics", "Which change to chromatin usually silences the genes in it?",
      ["Promoter DNA methylation", "Histone tail acetylation", "Loosening of nucleosomes", "Removal of histone H1"],
      "Methylation of cytosines in promoter CpG islands recruits proteins that compact chromatin and silence genes. Histone "
      "acetylation loosens chromatin and usually increases transcription."),
    Q(2, 2, EVO, "Natural selection", "A trait in which individuals with intermediate values leave the most offspring is under which kind of selection?",
      ["Stabilizing", "Directional", "Disruptive", "Frequency-dependent"],
      "Stabilizing selection favors the middle and narrows variation, as with human birth weight. Disruptive selection favors "
      "both extremes; directional selection favors one."),
    Q(2, 2, EVO, "Population genetics/speciation", "Two populations of frogs live in the same pond but breed in different months. This is which kind of isolation?",
      ["Temporal isolation", "Geographic isolation", "Mechanical isolation", "Hybrid sterility"],
      "Breeding at different times keeps populations apart even when they share a place: temporal isolation, a prezygotic "
      "barrier. Hybrid sterility acts only after mating."),
    Q(2, 2, EVO, "Ecology", "Lichens grow on bare rock left by a retreating glacier, and soil slowly forms. This begins which process?",
      ["Primary succession", "Secondary succession", "Eutrophication", "Climax community"],
      "Primary succession starts where there is no soil, as on new rock. Secondary succession follows a disturbance that leaves "
      "soil in place, such as a fire or an abandoned field."),

    # ---------------- Drill-only ----------------
    Q(0, 1, CELL, "Biomolecules", "Which bond joins two amino acids in a protein?",
      ["Peptide bond", "Glycosidic bond", "Phosphodiester bond", "Ester bond"],
      "A peptide bond is an amide link between the carboxyl group of one amino acid and the amino group of the next. "
      "Glycosidic bonds join sugars and phosphodiester bonds join nucleotides."),
    Q(0, 2, CELL, "Thermodynamics", "A reaction in a cell has ΔG = +15 kJ/mol. How can the cell make it proceed?",
      ["Couple it to ATP hydrolysis", "Add more of its enzyme", "Raise the activation energy", "Lower the temperature"],
      "An enzyme speeds a reaction but cannot change its ΔG. Coupling it to a strongly exergonic reaction such as ATP "
      "hydrolysis makes the overall ΔG negative."),
    Q(0, 2, CELL, "Mitosis/meiosis", "In which phase of mitosis do sister chromatids separate and move to opposite poles?",
      ["Anaphase", "Metaphase", "Prophase", "Telophase"],
      "In anaphase cohesin is cleaved and sister chromatids are pulled to opposite poles. In metaphase they line up at the "
      "plate, still joined."),
    Q(0, 2, GEN, MOL, "During DNA replication, which strand is made in short Okazaki fragments?",
      ["Lagging strand", "Leading strand", "Template strand", "Coding strand"],
      "DNA polymerase works only 5' to 3', so the strand running the other way from the fork is made in pieces, the lagging "
      "strand. The leading strand is made continuously."),
    Q(0, 2, GEN, CLAS, "In snapdragons, red (RR) crossed with white (WW) gives all pink. Crossing two pink plants gives what ratio of red to pink to white?",
      ["1 : 2 : 1", "3 : 1 : 0", "1 : 1 : 1", "9 : 3 : 4"],
      "Incomplete dominance makes each genotype a separate phenotype, so RW × RW gives RR, RW and WW in a 1 : 2 : 1 ratio. "
      "3 : 1 would show only with complete dominance."),
    Q(0, 3, GEN, "Developmental mechanisms", "Homeotic (Hox) genes control what during animal development?",
      ["Identity of body segments", "Rate of cell division", "Programmed cell death", "Sex determination in embryos"],
      "Hox genes encode transcription factors that give each region along the head-to-tail axis its identity; a mutation can "
      "put legs where antennae belong in a fly."),
    Q(0, 2, DIV, "Protista", "Which disease is caused by a protist carried by mosquitoes?",
      ["Malaria", "Tuberculosis", "Influenza", "Ringworm"],
      "Malaria is caused by Plasmodium, a protist spread by Anopheles mosquitoes. Tuberculosis is bacterial, influenza viral, "
      "and ringworm fungal."),
    Q(0, 2, DIV, "Plantae", "Which plant tissue carries sugars from the leaves to the rest of the plant?",
      ["Phloem", "Xylem", "Cambium", "Epidermis"],
      "Phloem sieve tubes move sugars from sources such as leaves to sinks such as roots and fruit. Xylem carries water and "
      "minerals upward from the roots."),
    Q(0, 2, SYS, "Integumentary", "Which layer of the skin contains blood vessels, sweat glands and hair follicles?",
      ["Dermis", "Epidermis", "Stratum corneum", "Stratum basale"],
      "The dermis holds blood vessels, nerves, glands and follicles. The epidermis, including the stratum basale and stratum "
      "corneum, has no blood vessels."),
    Q(0, 3, SYS, "Endocrine", "A tumor makes too much ACTH. Which hormone level in the blood is most likely to rise as a result?",
      ["Cortisol", "Aldosterone", "Thyroxine", "Growth hormone"],
      "ACTH from the anterior pituitary drives cortisol release from the adrenal cortex. Aldosterone is controlled mainly by "
      "the renin-angiotensin system and potassium, not ACTH."),
]
