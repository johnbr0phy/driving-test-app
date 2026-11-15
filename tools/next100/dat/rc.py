# Reading Comprehension. Original passages on scientific topics and original items.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)
# Per test: two passages, 13 and 12 questions (the real section has three passages and 50 questions).

R = "datReading"
MAIN, DETAIL, INFER, VOCAB, PURPOSE, STRUCT = ("Main idea", "Detail", "Inference", "Vocabulary in context",
                                              "Author's purpose", "Organization")

P11, P12, P21, P22 = "DAT-T1-RC-P1", "DAT-T1-RC-P2", "DAT-T2-RC-P1", "DAT-T2-RC-P2"

STIMULI = [
    {"id": P11, "title": "Passage 1: A city on the surface of a tooth", "text": (
        "Within hours of being brushed clean, the surface of a tooth is coated again. The first layer is not living at all: it "
        "is a thin film of proteins from saliva, called the acquired pellicle, that sticks to the mineral of the enamel. The "
        "pellicle is useful in its own right, since it lubricates the tooth and slows the loss of mineral, but it also gives "
        "bacteria something to hold. Certain streptococci carry surface proteins that bind pellicle proteins, and they are "
        "usually among the first to settle.\n\n"
        "What follows is less a coating than a construction project. The early settlers divide and release sticky polymers, and "
        "later arrivals attach not to the tooth but to the bacteria already there. Some species act as bridges, binding both the "
        "early colonizers and organisms that could not otherwise stay. Over several days the community thickens into dental "
        "plaque, one of the best studied examples of a biofilm: a structured community of microbes embedded in a matrix that "
        "they make themselves. Hundreds of species can be found in plaque, and their arrangement is not random. Organisms that "
        "tolerate oxygen tend to sit near the surface, while those that cannot survive it live deeper, where the oxygen has "
        "already been consumed.\n\n"
        "Life in a biofilm differs from life as a free-floating cell. The matrix slows the movement of molecules, so a cell deep "
        "in plaque may meet a very different chemical environment from one at the edge. The matrix also protects. Bacteria in a "
        "biofilm can survive concentrations of antimicrobial agents that would kill the same species growing alone in a test "
        "tube, partly because the agent penetrates slowly and partly because many cells in the interior grow slowly and are "
        "less affected by drugs that target active growth.\n\n"
        "For most of the day, plaque and the tooth beneath it coexist. The trouble begins with sugar. When a person eats or "
        "drinks something sweet, acid-tolerant bacteria in the plaque ferment the sugar and release acids, chiefly lactic acid. "
        "Within minutes the pH at the tooth surface can fall sharply. Enamel is made mostly of hydroxyapatite, a calcium "
        "phosphate mineral, and below a critical pH, often given as about 5.5, the fluid around it can no longer hold the "
        "dissolved mineral in balance, so calcium and phosphate begin to leave the enamel. Saliva slowly restores the pH. It "
        "contains bicarbonate, which neutralizes acid, along with calcium and phosphate that can be redeposited in the weakened "
        "enamel. A tooth therefore goes through cycles of loss and repair many times a day.\n\n"
        "Decay, on this view, is not a single attack but a balance tipped over time. If sugar exposures are frequent, the pH "
        "spends long periods below the critical value, and repair cannot keep up. The same total amount of sugar taken in many "
        "small snacks does more harm than when it is eaten at one meal, because it produces more acid episodes. Frequent acid "
        "also changes the community itself: species that thrive in acid, and that make acid, gain ground over species that "
        "do not, which makes the next drop in pH more likely.\n\n"
        "Fluoride works within this cycle rather than outside it. When fluoride is present in the fluid around the enamel "
        "during repair, the mineral that is redeposited can include fluorapatite, which resists acid better than the original "
        "hydroxyapatite. Small, frequent exposures to fluoride, as from toothpaste, are therefore thought to matter more than a "
        "large dose taken once.\n\n"
        "Seeing plaque as an ecosystem has changed the questions researchers ask. The goal is less often to sterilize the mouth, "
        "which is neither possible nor desirable, than to keep the community in a stable state in which acid-producing species "
        "do not take over. Some of the microbes in a healthy mouth may even help, by competing with harmful species for space "
        "and food.")},
    {"id": P12, "title": "Passage 2: Life on pause", "text": (
        "Tardigrades, sometimes called water bears, are microscopic animals with eight stubby legs that live in films of water on "
        "mosses, lichens, soil and the sea floor. They would be obscure were it not for a remarkable talent. Many species can "
        "survive almost complete drying. As its surroundings dry out, a tardigrade pulls in its legs and head and contracts into "
        "a compact form called a tun. In this state its metabolism becomes so slow that it cannot be measured, and the animal "
        "can remain for years. Add water, and within minutes to hours it may unfold and walk away.\n\n"
        "This state is one form of cryptobiosis, literally hidden life, and the kind brought on by drying is called "
        "anhydrobiosis. It is not unique to tardigrades; some nematode worms, rotifers, brine shrimp embryos and many plant seeds "
        "share it. What makes tardigrades a favorite subject is the range of other insults that tuns have been reported to "
        "tolerate in laboratory tests, including extreme cold, high doses of radiation and, in one experiment, a period of "
        "exposure to space in low Earth orbit.\n\n"
        "Such reports are easy to exaggerate. A tun is not indestructible, and survival rates in harsh tests are often well below "
        "100 percent. Many of the extreme results come from animals that were first dried slowly, under controlled conditions; "
        "an active tardigrade suddenly exposed to the same stress usually dies. The animal, in other words, survives because it "
        "prepares, and the preparation takes time.\n\n"
        "How it prepares has been a puzzle. Drying is dangerous because water holds the shapes of proteins and membranes; as it "
        "leaves, proteins can unfold and stick together and membranes can fuse or tear. In many anhydrobiotic organisms, "
        "including brine shrimp and some nematodes, a sugar called trehalose builds up as the organism dries. Trehalose is "
        "thought to replace water around biological molecules and to set into a glassy solid that holds them in place. Yet many "
        "tardigrades accumulate little trehalose, so researchers looked for something else.\n\n"
        "One answer appears to be a set of proteins found in tardigrades and few other animals. These proteins are intrinsically "
        "disordered: in solution they have no fixed folded shape. As a cell dries, some of them seem to form a glass-like matrix, "
        "much as trehalose does elsewhere. When the genes for several of these proteins were moved into bacteria and yeast, "
        "the altered microbes survived drying better than ordinary ones, which suggests that the proteins can protect cells "
        "on their own. Other tardigrade proteins appear to shield DNA from damage, and a tardigrade also seems able to repair "
        "damaged DNA after it rehydrates.\n\n"
        "The interest is not merely academic. Many vaccines and medicines must be kept cold from the factory to the clinic, and "
        "keeping them cold is expensive and often fails in places with unreliable electricity. If the molecules that let a tun "
        "endure drying could stabilize a vaccine at room temperature, that chain of refrigeration might be shortened. Whether "
        "tardigrade proteins will prove practical for such uses is not yet known, but they have already changed the question from "
        "how anything could survive drying to how many different ways life has found to do it.")},
    {"id": P21, "title": "Passage 1: The compass in the bird", "text": (
        "Every autumn, many songbirds that have never made the journey before fly thousands of kilometers to wintering grounds "
        "they have never seen. Young birds raised in captivity, with no adult to follow, still become restless at the right "
        "season and orient themselves in a consistent direction. Part of the knowledge of where to go seems to be inherited. "
        "But to hold a direction, a bird needs a reference, and over the past half century researchers have shown that birds use "
        "several: the sun, the pattern of stars around the celestial pole, and the magnetic field of the Earth.\n\n"
        "The magnetic sense was the hardest to accept, because it has no obvious organ. The evidence came from behavior. Caged "
        "migratory birds hop in the direction they would fly, and when experimenters altered the magnetic field around the cage "
        "with electric coils, the birds turned with it. These experiments also showed something unexpected. The birds' compass "
        "did not read the north and south polarity of the field, as a ship's compass does. Instead it responded to the angle "
        "the field lines make with the ground. Near the poles the lines dip steeply toward the Earth; near the equator they run "
        "almost level. A compass that reads this inclination can tell poleward from equatorward, though not north from south.\n\n"
        "Two explanations of how such a sense might work have been pursued. The first proposes tiny particles of magnetite, a "
        "magnetic iron oxide, connected to nerve endings, which would twist in the field like miniature compass needles. Iron-"
        "rich cells were reported in the upper beak of pigeons, but later work found that many of them were immune cells that "
        "had nothing to do with sensing. The magnetite idea has not been abandoned, and it may explain a separate sense of field "
        "strength that could serve as a kind of map, but it has lost ground as an account of the compass.\n\n"
        "The second explanation places the compass in the eye. Light striking certain proteins in the retina, called "
        "cryptochromes, can create pairs of molecules each carrying an unpaired electron. The way such a radical pair behaves "
        "can be influenced, very slightly, by the direction of a magnetic field. If the result differs across the curved "
        "retina, the bird might literally see the field as a pattern laid over its view. Several observations fit. The compass "
        "of caged birds works only when some light is present, and it is disrupted by weak radio-frequency noise, which should "
        "not affect a needle of magnetite but could disturb a radical pair. In some experiments, birds also lost their magnetic "
        "orientation when the visual area of the brain that receives this signal was damaged.\n\n"
        "None of this is yet a complete account. The effect of the Earth's field on a radical pair is tiny, and how a signal so "
        "weak could rise above the noise of a living cell is not understood. Nor is it certain which cryptochrome is involved. "
        "What has emerged with some confidence is that birds carry a magnetic compass of an unusual kind, and that migration "
        "relies on several cues that can check one another. A bird that cannot see the stars on a cloudy night may still have "
        "the field, and a bird whose magnetic sense is confused may still have the setting sun.")},
    {"id": P22, "title": "Passage 2: A year that changed diabetes", "text": (
        "Before 1922, a diagnosis of type 1 diabetes in a child was close to a death sentence. The body could not use the sugar "
        "in its blood, and physicians could offer only diets so severe in carbohydrate that patients slowly starved. Some lived "
        "a year or two longer than they otherwise would have, at the cost of a wasting existence. It had been known for some "
        "decades that removing the pancreas from a dog produced diabetes, and many researchers suspected that some substance "
        "made by clusters of cells in the pancreas, the islets, controlled blood sugar. Repeated attempts to extract it had "
        "failed, largely because the same organ makes powerful digestive enzymes that destroyed the substance during "
        "extraction.\n\n"
        "In 1921, Frederick Banting, a young surgeon, persuaded J. J. R. Macleod, a professor of physiology at the University of "
        "Toronto, to give him laboratory space and an assistant, a student named Charles Best. Banting's idea was to tie off the "
        "ducts of the pancreas so that the enzyme-making tissue would waste away while the islets survived. The early "
        "experiments on dogs were crude, but extracts from such pancreases lowered blood sugar in diabetic dogs. The work "
        "moved quickly to extracts of whole pancreas taken from cattle at slaughterhouses, a far more abundant source.\n\n"
        "The first trial in a human, in January 1922, was a disappointment. A fourteen-year-old boy, Leonard Thompson, received "
        "an injection of the extract; his blood sugar fell only a little, and he developed an abscess where the impure material "
        "had been injected. The decisive improvement came from James Collip, a biochemist who had joined the team. He worked out "
        "a way to purify the extract using alcohol at carefully chosen concentrations, so that much of the unwanted protein was "
        "left behind. When Thompson was treated with Collip's purer preparation less than two weeks later, his blood sugar fell "
        "toward normal and sugar disappeared from his urine.\n\n"
        "News spread quickly, and the difficulty became one of supply. A laboratory method that made enough for a few patients "
        "could not supply thousands. The university worked with a pharmaceutical company to scale up production, and for a time "
        "the purified hormone was so scarce that physicians had to choose which patients would receive it. By the following "
        "year, supplies had grown enough that the treatment was used widely in North America.\n\n"
        "The story is often told as a tale of individual genius, and the award of the 1923 Nobel Prize in Physiology or "
        "Medicine to Banting and Macleod did not end the arguments about credit. Banting shared his part of the prize money "
        "with Best, and Macleod shared his with Collip. Read more carefully, the discovery looks like the work of a team whose "
        "members supplied different things: an idea that was partly mistaken, the physiological expertise to test it, and the "
        "chemistry to make the product usable.\n\n"
        "Insulin did not cure diabetes. Patients still had to inject it for life, and doses that were too high could drive blood "
        "sugar dangerously low. But it turned a fatal illness into one that could be managed, and it became one of the first "
        "proteins whose structure and later whose manufacture were worked out in detail, making it a landmark not only in "
        "medicine but also in biochemistry.")},
]

ITEMS = [
    # ---------------- Practice Test 1, Passage 1 (13) ----------------
    Q(1, 1, R, MAIN, "Which statement best expresses the main idea of the passage?",
      ["Decay depends on the balance within plaque", "Fluoride alone is enough to prevent tooth decay", "Brushing removes every bacterium for good",
       "Saliva, not bacteria, is the main cause of decay"],
      "The passage presents plaque as a structured biofilm and decay as a balance between acid attack and repair, tipped by "
      "how often sugar arrives. Fluoride is one part of that cycle, not the whole answer.", stim=P11),
    Q(1, 1, R, DETAIL, "According to the passage, what is the acquired pellicle?",
      ["A film of salivary proteins", "A layer of the earliest bacteria", "A coating of fluorapatite", "The matrix that bacteria make"],
      "The first paragraph calls the pellicle a thin film of proteins from saliva that sticks to the enamel, and says it is not "
      "living at all. Bacteria attach to it afterward.", stim=P11),
    Q(1, 2, R, DETAIL, "According to the passage, how do many later arrivals join the growing plaque?",
      ["By binding bacteria already there", "By binding to the enamel directly", "By dissolving the acquired pellicle", "By using oxygen near the tooth"],
      "The second paragraph says later arrivals attach not to the tooth but to the bacteria already there, with some species "
      "acting as bridges.", stim=P11),
    Q(1, 2, R, DETAIL, "Where in plaque does the passage say organisms that cannot survive oxygen tend to live?",
      ["In the deeper layers", "At the outer surface", "Only in saliva", "Between separate teeth"],
      "Oxygen-tolerant organisms sit near the surface, while those that cannot survive it live deeper, where the oxygen has "
      "already been used up.", stim=P11),
    Q(1, 2, R, DETAIL, "Which two reasons does the passage give for biofilm bacteria surviving antimicrobial agents?",
      ["Slow penetration and slow growth", "Thick cell walls and tough spores", "Fluoride and calcium in saliva", "High oxygen levels and low pH"],
      "The third paragraph names two reasons: the agent penetrates the matrix slowly, and many interior cells grow slowly and are "
      "less affected by drugs that target active growth.", stim=P11),
    Q(1, 1, R, DETAIL, "Which acid does the passage name as the main one released when plaque bacteria ferment sugar?",
      ["Lactic acid", "Acetic acid", "Citric acid", "Carbonic acid"],
      "The fourth paragraph says acid-tolerant bacteria ferment sugar and release acids, chiefly lactic acid.", stim=P11),
    Q(1, 2, R, DETAIL, "According to the passage, what happens to enamel when the surrounding pH falls below about 5.5?",
      ["Calcium and phosphate leave it", "Fluorapatite forms within it", "The pellicle on it dissolves", "Bicarbonate starts to build up in it"],
      "Below the critical pH the fluid can no longer hold the dissolved mineral in balance, so calcium and phosphate begin to "
      "leave the enamel.", stim=P11),
    Q(1, 2, R, DETAIL, "Which substance in saliva does the passage say neutralizes acid?",
      ["Bicarbonate", "Calcium", "Phosphate", "Pellicle protein"],
      "Saliva contains bicarbonate, which neutralizes acid, along with calcium and phosphate, which can be redeposited in "
      "weakened enamel.", stim=P11),
    Q(1, 3, R, INFER, "Based on the passage, which habit would most likely do the most harm to teeth?",
      ["Sipping a sweet drink all afternoon", "Eating dessert once at dinner", "Drinking water between meals",
       "Brushing with fluoride toothpaste twice a day"],
      "The passage says the same sugar spread over many small exposures causes more acid episodes and more harm than one "
      "exposure. Sipping all afternoon keeps the pH low for the longest time.", stim=P11),
    Q(1, 3, R, INFER, "The passage suggests that frequent acid exposure makes later drops in pH more likely because it:",
      ["favors acid-making species", "removes the acquired pellicle", "stops saliva from forming", "turns enamel into fluorapatite"],
      "Frequent acid lets species that thrive in and make acid gain ground over others, which makes the next fall in pH more "
      "likely: a feedback loop.", stim=P11),
    Q(1, 2, R, DETAIL, "Why does the passage say small, frequent fluoride exposures may matter more than one large dose?",
      ["Fluoride acts during repeated repair", "Large doses of fluoride dissolve enamel", "Saliva breaks down fluoride quickly",
       "Bacteria use fluoride as a food"],
      "Fluoride works within the cycle: when it is present during repair, the redeposited mineral can include acid-resistant "
      "fluorapatite. Repair happens many times a day, so frequent small doses fit it.", stim=P11),
    Q(1, 2, R, VOCAB, "As used in the passage, the word \"sterilize\" most nearly means:",
      ["free of all microbes", "made unable to reproduce", "cleaned of food debris", "protected from acid"],
      "The final paragraph contrasts sterilizing the mouth with keeping its microbial community stable, so sterilize means "
      "to rid it of all microbes.", stim=P11),
    Q(1, 3, R, PURPOSE, "The author's attitude toward the ecosystem view of plaque is best described as:",
      ["approving", "dismissive", "uncertain", "hostile"],
      "The author presents the view as having usefully changed the questions researchers ask and notes that some microbes may "
      "even help; nothing in the passage questions it.", stim=P11),

    # ---------------- Practice Test 1, Passage 2 (12) ----------------
    Q(1, 1, R, MAIN, "What is the passage mainly about?",
      ["How tardigrades survive drying", "Why tardigrades live in mosses", "How vaccines are kept cold", "Why space travel harms animals"],
      "Most of the passage describes the tun, the limits on its toughness, and the molecules that seem to protect it. Vaccines "
      "and space come up only as examples.", stim=P12),
    Q(1, 1, R, DETAIL, "According to the passage, what is a tun?",
      ["The dried, contracted animal", "A protein that shields DNA", "A sugar that sets into a glass",
       "A film of water on a moss leaf"],
      "The first paragraph says a drying tardigrade pulls in its legs and head and contracts into a compact form called a tun.", stim=P12),
    Q(1, 1, R, DETAIL, "What does the passage say the word cryptobiosis literally means?",
      ["Hidden life", "Dry life", "Slow life", "Frozen life"],
      "The second paragraph gives cryptobiosis as \"hidden life\"; the kind brought on by drying is anhydrobiosis.", stim=P12),
    Q(1, 2, R, DETAIL, "Which of the following does the passage name as another organism capable of anhydrobiosis?",
      ["Brine shrimp embryos", "Earthworm egg cocoons", "Honeybee larvae", "Freshwater frog tadpoles"],
      "The second paragraph lists some nematode worms, rotifers, brine shrimp embryos and many plant seeds.", stim=P12),
    Q(1, 2, R, PURPOSE, "Why does the author point out that many extreme results came from animals first dried slowly?",
      ["To show survival depends on preparation", "To prove that tuns are indestructible", "To criticize the experiment in space",
       "To explain why tardigrades are so rare"],
      "The third paragraph warns against exaggeration: an active animal suddenly exposed to the stress usually dies, so the "
      "animal survives because it prepares.", stim=P12),
    Q(1, 2, R, DETAIL, "According to the passage, why is drying dangerous to cells?",
      ["Proteins and membranes lose their shape", "Drying raises the cell's temperature", "Dry cells absorb more radiation",
       "Water loss speeds up the cell's metabolism"],
      "Water holds the shapes of proteins and membranes; as it leaves, proteins can unfold and stick together and membranes can "
      "fuse or tear.", stim=P12),
    Q(1, 2, R, DETAIL, "What role does the passage say trehalose is thought to play in organisms that accumulate it?",
      ["It replaces water and forms a glass", "It repairs DNA damaged during drying", "It speeds up the cell's metabolism", "It folds the disordered proteins"],
      "Trehalose is thought to replace water around biological molecules and set into a glassy solid that holds them in place.", stim=P12),
    Q(1, 2, R, INFER, "Why did researchers look beyond trehalose to explain tardigrade survival?",
      ["Many tardigrades make little of it", "Trehalose is toxic to all animals", "It has been found only in plant seeds", "It has been found only in tuns"],
      "The fourth paragraph says many tardigrades accumulate little trehalose, so researchers looked for something else.", stim=P12),
    Q(1, 2, R, VOCAB, "In the passage, \"intrinsically disordered\" proteins are described as proteins that:",
      ["have no fixed folded shape", "are damaged by drying", "are found in every animal", "bind tightly to strands of DNA"],
      "The passage defines the term directly: in solution they have no fixed folded shape.", stim=P12),
    Q(1, 3, R, INFER, "What does the experiment with bacteria and yeast suggest?",
      ["The proteins can protect cells by themselves", "Bacteria already make the same proteins", "Yeast cannot survive drying under any conditions",
       "Trehalose is needed for the proteins to work"],
      "Microbes given the tardigrade genes survived drying better than ordinary ones, which the passage says suggests the "
      "proteins can protect cells on their own.", stim=P12),
    Q(1, 2, R, DETAIL, "According to the passage, what might tardigrade molecules make possible for vaccines?",
      ["Storage without refrigeration", "Faster production of vaccines", "Vaccines that need one dose only", "Protection against radiation"],
      "The final paragraph suggests the molecules might stabilize a vaccine at room temperature and shorten the chain of "
      "refrigeration.", stim=P12),
    Q(1, 3, R, STRUCT, "Which best describes the organization of the passage?",
      ["A puzzle, a proposed answer, a use", "A history told one year at a time", "Two rival theories, then a verdict", "A claim, then its full rejection"],
      "The passage describes a survival ability, sets out the puzzle of how it works, gives the disordered-protein answer, and "
      "ends with a possible practical use.", stim=P12),

    # ---------------- Practice Test 2, Passage 1 (13) ----------------
    Q(2, 1, R, MAIN, "What is the main purpose of the passage?",
      ["To describe how birds may sense direction", "To explain why birds migrate in autumn", "To argue that magnetite does not exist",
       "To compare pigeons with migrating songbirds"],
      "The passage reviews the cues birds use to hold a direction, with most of its length on the two explanations of the "
      "magnetic compass.", stim=P21),
    Q(2, 2, R, DETAIL, "What does the passage say about young birds raised in captivity?",
      ["They still orient consistently", "They never become restless in autumn", "They follow the stars and nothing else",
       "They cannot learn the route at all"],
      "The first paragraph says they become restless at the right season and orient themselves consistently, which suggests "
      "part of the knowledge is inherited.", stim=P21),
    Q(2, 1, R, DETAIL, "Which of the following does the passage NOT name as a reference birds use for direction?",
      ["The moon", "The sun", "The stars", "The magnetic field"],
      "The first paragraph names the sun, the pattern of stars around the celestial pole and the Earth's magnetic field. The "
      "moon is not mentioned.", stim=P21),
    Q(2, 2, R, DETAIL, "How did experimenters show that caged birds use the magnetic field?",
      ["The birds turned when the field was shifted", "The birds flew straight toward the equator", "The birds ate food containing magnetite",
       "The birds stopped singing in the dark"],
      "Caged birds hop in the direction they would fly; when coils altered the field around the cage, the birds turned with "
      "it.", stim=P21),
    Q(2, 3, R, DETAIL, "According to the passage, what does the birds' magnetic compass respond to?",
      ["The angle of the field lines", "The field's north and south polarity", "The strength of the field",
       "The direction of the sun"],
      "The compass does not read polarity like a ship's compass; it reads the inclination, the angle the field lines make with "
      "the ground.", stim=P21),
    Q(2, 3, R, INFER, "A compass that reads only inclination could tell a bird which of the following?",
      ["Poleward from equatorward", "True north from true south", "Its exact present latitude", "The local time of day"],
      "Inclination is steep near the poles and level near the equator, so it separates poleward from equatorward, though "
      "not north from south, as the passage says.", stim=P21),
    Q(2, 2, R, DETAIL, "What did later work find about many iron-rich cells in pigeon beaks?",
      ["They were immune cells", "They were nerve endings", "They held cryptochrome", "They were in the retina"],
      "The third paragraph says many of the cells were immune cells that had nothing to do with sensing.", stim=P21),
    Q(2, 2, R, INFER, "The passage suggests that magnetite may still explain which ability?",
      ["Sensing field strength as a map", "Seeing the field as a pattern", "Reading patterns of the stars", "Orienting by the setting sun"],
      "The magnetite idea has lost ground for the compass but may explain a separate sense of field strength that could act as "
      "a kind of map.", stim=P21),
    Q(2, 2, R, DETAIL, "Where does the second explanation place the magnetic compass?",
      ["In the eye", "In the upper beak", "In the inner ear", "In the feathers"],
      "The fourth paragraph says the second explanation places the compass in the eye, in cryptochrome proteins of the retina.", stim=P21),
    Q(2, 3, R, INFER, "Why does the effect of radio-frequency noise support the radical-pair explanation?",
      ["Noise should disturb a radical pair only", "Noise heats the tissue of the retina", "Noise blocks the light that birds need",
       "Noise shifts the Earth's field lines"],
      "The passage says weak radio-frequency noise should not affect a magnetite needle but could disturb a radical pair, so "
      "the disruption fits the eye-based account.", stim=P21),
    Q(2, 2, R, VOCAB, "As used in the passage, \"inclination\" refers to:",
      ["the dip of field lines", "a bird's natural preference", "the height of flight", "the slope of a hill"],
      "The passage uses the word for the angle the field lines make with the ground, steep near the poles and level near the "
      "equator.", stim=P21),
    Q(2, 3, R, DETAIL, "Which problem with the radical-pair explanation does the author mention?",
      ["The effect on the pair is tiny", "Cryptochromes are absent in birds", "Birds orient best in total darkness",
       "Magnetite was found in the retina"],
      "The final paragraph notes that the field's effect on a radical pair is tiny, and how so weak a signal rises above a cell's "
      "noise is not understood.", stim=P21),
    Q(2, 2, R, PURPOSE, "The final example of a cloudy night is used to show that:",
      ["the cues can back one another up", "stars are the most useful cue", "the magnetic sense fails in clouds",
       "birds cannot fly in bad weather"],
      "The author ends by saying migration relies on several cues that can check one another: without stars a bird may use the "
      "field, and without the field it may use the sun.", stim=P21),

    # ---------------- Practice Test 2, Passage 2 (12) ----------------
    Q(2, 1, R, MAIN, "Which title best fits the passage?",
      ["How insulin became a treatment", "Why the pancreas makes enzymes", "The life of Frederick Banting", "Diet as a cure for diabetes"],
      "The passage follows insulin from the failed extraction attempts through purification, supply and the dispute over "
      "credit. Banting is one figure among several.", stim=P22),
    Q(2, 2, R, DETAIL, "According to the passage, why had earlier attempts to extract the substance failed?",
      ["Digestive enzymes destroyed it", "Dogs could not be used in tests", "No one suspected the islets", "Alcohol ruined every extract"],
      "The first paragraph says the pancreas also makes powerful digestive enzymes that destroyed the substance during "
      "extraction.", stim=P22),
    Q(2, 1, R, DETAIL, "What treatment did physicians offer patients with type 1 diabetes before 1922?",
      ["Severe low-carbohydrate diets", "Injections of beef extract", "Surgical removal of the pancreas", "Regular doses of alcohol"],
      "Physicians could offer only diets so severe in carbohydrate that patients slowly starved.", stim=P22),
    Q(2, 2, R, DETAIL, "What was the purpose of tying off the ducts of the pancreas?",
      ["To let the enzyme tissue waste away", "To stop the islets from growing", "To make the dogs diabetic", "To collect pancreatic juice for study"],
      "Banting hoped the enzyme-making tissue would waste away while the islets survived, so their substance could be "
      "extracted intact.", stim=P22),
    Q(2, 1, R, DETAIL, "Where did the team get a more abundant supply of pancreas?",
      ["Cattle from slaughterhouses", "Dogs bred for research", "Human donors after surgery", "Fish from local markets"],
      "The second paragraph says the work moved to whole pancreas taken from cattle at slaughterhouses.", stim=P22),
    Q(2, 2, R, DETAIL, "According to the passage, what was one result of Leonard Thompson's first, impure injection?",
      ["An abscess formed at the site", "His blood sugar became normal", "Sugar left his urine", "He needed no further doses"],
      "The first trial was a disappointment: his blood sugar fell only a little, and an abscess formed where the impure extract "
      "was injected.", stim=P22),
    Q(2, 2, R, DETAIL, "What did James Collip contribute, according to the passage?",
      ["A way to purify the extract", "The idea of tying off ducts", "Laboratory space and staff", "A deal with a drug company"],
      "Collip worked out how to purify the extract using alcohol at carefully chosen concentrations, leaving much of the "
      "unwanted protein behind.", stim=P22),
    Q(2, 3, R, INFER, "The passage implies that soon after the second trial the main obstacle to treatment was:",
      ["making enough insulin", "proving that it worked", "finding willing patients", "lowering its price"],
      "The fourth paragraph says the difficulty became one of supply: a laboratory method could not serve thousands, and "
      "physicians had to choose who received it.", stim=P22),
    Q(2, 2, R, DETAIL, "How did the prize winners share the Nobel Prize money?",
      ["Banting with Best, Macleod with Collip", "Banting with Collip, Macleod with Best", "Each winner kept his full share",
       "All four men split it equally"],
      "The fifth paragraph says Banting shared his part with Best and Macleod shared his with Collip.", stim=P22),
    Q(2, 3, R, PURPOSE, "The author most likely mentions that Banting's idea was \"partly mistaken\" in order to:",
      ["show that the success was a team effort", "argue that Banting deserved no credit", "prove that the dog experiments failed",
       "criticize the Nobel committee's choice"],
      "The point comes as the author retells the story as teamwork: an imperfect idea, physiological expertise to test it and "
      "chemistry to make it usable.", stim=P22),
    Q(2, 2, R, VOCAB, "As used in the final paragraph, the word \"managed\" most nearly means:",
      ["kept under control", "cured completely", "supervised by staff", "made less common"],
      "The passage says insulin did not cure diabetes but turned a fatal illness into one that could be managed: controlled "
      "with lifelong treatment.", stim=P22),
    Q(2, 3, R, INFER, "Which statement would the author most likely agree with?",
      ["Insulin mattered to medicine and biochemistry", "Insulin cured diabetes once and for all",
       "Credit for insulin belongs to Banting alone", "Diet therapy worked better than insulin did"],
      "The final paragraph calls insulin a landmark not only in medicine but also in biochemistry, while saying it did not cure "
      "the disease.", stim=P22),
]
