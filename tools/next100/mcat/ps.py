# Psychological, Social, and Biological Foundations of Behavior. Original items and passages; studies, places and
# data are hypothetical. Per test: FC6 8, FC7 10, FC8 6, FC9 4, FC10 2. Four passages (6, 5, 5, 6) and 8 discrete.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)

F6, F7, F8, F9, F10 = "mcatFc6", "mcatFc7", "mcatFc8", "mcatFc9", "mcatFc10"

STIMULI = [
    {"id": "MCAT-T1-PS-P1", "title": "Passage 1: Sleep after learning", "text": (
        "A team of researchers tested whether sleep after learning helps memory. Sixty college students learned a list of 40 "
        "word pairs at 9 p.m. and were then randomly assigned to one of two groups. The sleep group slept normally in the "
        "laboratory; the wake group stayed awake under supervision until the next evening. Both groups then had a full night "
        "of recovery sleep, and recall was tested 36 hours after learning, so that neither group was tired at the test.\n\n"
        "The sleep group recalled 70% of the pairs and the wake group 45%. Recordings in the sleep group showed that recall "
        "was best in students who spent the most time in slow-wave sleep during the first night. During the night awake, the "
        "wake group also missed more targets on a task that asked them to press a key whenever a rare letter appeared in a "
        "stream of common ones, and they rated themselves as more irritable. Several drank coffee to stay awake; the "
        "researchers recorded caffeine intake but did not control it.")},
    {"id": "MCAT-T1-PS-P2", "title": "Passage 2: Going along with the group", "text": (
        "In a series of studies, a participant sat with several other people who appeared to be fellow participants but were "
        "in fact working for the researcher. On each trial the group was shown a reference line and three comparison lines and "
        "asked which comparison matched the reference. The answer was obvious, but on most trials the others all gave the same "
        "wrong answer before the participant responded.\n\n"
        "When participants answered aloud, they gave the group's wrong answer on 32% of trials. When they wrote their answers "
        "privately after hearing the group, the rate fell to 8%. Conformity rose as the group grew from one to three others "
        "but changed little beyond that. When one of the others gave the correct answer before the participant, conformity "
        "dropped to about 6%. In interviews afterward, many participants who had conformed said they did not want to seem odd "
        "or to spoil the session for the others.\n\n"
        "In a follow-up, observers watched videos of conforming participants and were asked to explain their behavior. Most "
        "said the participants were simply weak-willed or easily led.")},
    {"id": "MCAT-T1-PS-P3", "title": "Passage 3: Two neighborhoods, one city", "text": (
        "In a mid-sized city, average life expectancy in the Riverside district is 12 years lower than in the Hilltop "
        "district, three miles away. Riverside was among the areas that banks once refused to lend in, and for decades its "
        "residents were mostly people who could not buy homes elsewhere. Today it has more households below the poverty line, "
        "fewer grocery stores selling fresh food, and an interstate highway and a waste transfer station along its edge. "
        "Hilltop has none of these.\n\n"
        "Riverside also has more children per family and fewer residents over 65. In the past decade, rising rents in the "
        "city center have brought young professionals into the part of Riverside nearest downtown, and some long-time "
        "residents there have moved out because they can no longer afford to stay.\n\n"
        "A local health department report argued that the gap in life expectancy could not be explained by individual "
        "choices about diet and exercise alone, and that the history and layout of the city shaped the health of the people "
        "who lived in it.")},
    {"id": "MCAT-T1-PS-P4", "title": "Passage 4: Paying people to quit smoking", "text": (
        "Researchers tested a smartphone program to help adults quit smoking. Each day, participants blew into a small device "
        "that measures carbon monoxide in the breath, which confirms recent smoking. For 12 weeks, participants in Group 1 "
        "earned 10 points, worth a small cash value, on every smoke-free day. Participants in Group 2 had the chance to earn "
        "points on a smoke-free day, but whether they won, and how much, depended on an unpredictable draw. Both groups were "
        "also sent short daily messages about the health effects of smoking, some written in general terms and some tailored "
        "to the participant's own health history.\n\n"
        "During the 12 weeks, both groups had far more smoke-free days than a control group. After the rewards stopped, many "
        "participants in both groups returned to smoking, but relapse was slower in Group 2. Participants who kept smoking "
        "during the program were more likely than others to agree with statements such as \"The health risks of smoking are "
        "exaggerated.\" Participants who said they cared most about their health read the tailored messages more carefully and "
        "changed their attitudes toward smoking more than other participants.")},
    {"id": "MCAT-T2-PS-P1", "title": "Passage 1: What we fail to see", "text": (
        "In an experiment on visual attention, participants watched a one-minute video of two teams passing basketballs. "
        "Half were told to count the passes made by one team (counting group); the other half were told only to watch the "
        "video (watching group). Halfway through, a person carrying an open red umbrella walked slowly across the scene for "
        "five seconds. Afterward, participants were asked whether they had noticed anything unusual.\n\n"
        "In the watching group, 95% reported the umbrella; in the counting group, only 45% did. In a third condition, "
        "participants counted passes but were told beforehand that something unexpected might appear, and 80% reported the "
        "umbrella.\n\n"
        "In a separate task, participants saw a smudged figure that could be read as either the letter B or the number 13. "
        "When it was shown between the letters A and C, most read it as B; between 12 and 14, most read it as 13.\n\n"
        "In a final condition, participants in the counting group watched in small groups that included one confederate, "
        "who said loudly at the end, \"Nothing unusual happened.\" Fewer participants in these groups reported the umbrella "
        "than counting participants who watched alone.")},
    {"id": "MCAT-T2-PS-P2", "title": "Passage 2: The same résumé, different names", "text": (
        "To study hiring discrimination, researchers sent pairs of fictional résumés to employers advertising entry-level "
        "jobs. The résumés in each pair had the same education and experience; only the name differed, chosen to suggest an "
        "applicant from either a majority or a minority ethnic group. Résumés with majority-group names received 50% more "
        "requests for interviews.\n\n"
        "The researchers then surveyed a sample of the hiring managers. Most said they valued diversity and rejected "
        "stereotypes. But on a timed computer task that measures how quickly people pair group images with positive or "
        "negative words, many responded faster when minority-group images were paired with negative words.\n\n"
        "In one company, a hiring committee of long-time colleagues reported that it always reached decisions quickly and "
        "without disagreement, even when members later admitted privately that they had had doubts. The company then asked "
        "managers to sign a short pledge to review résumés with names hidden; a month later, managers who had signed were "
        "more likely than others to volunteer for a longer anti-bias training. A separate program paired managers from "
        "different backgrounds to work as equal partners on a shared project for six months.")},
    {"id": "MCAT-T2-PS-P3", "title": "Passage 3: A changing population", "text": (
        "The table shows crude birth and death rates (per 1,000 people per year) in a hypothetical country over six decades. "
        "Net migration was close to zero throughout.\n\n"
        "| Year | Crude birth rate | Crude death rate |\n|---|---|---|\n| 1950 | 42 | 25 |\n| 1970 | 38 | 12 |\n"
        "| 1990 | 24 | 9 |\n| 2010 | 12 | 10 |\n\n"
        "Over the same period the country industrialized. The share of people living in cities rose from 20% to 70%, the "
        "share of girls finishing secondary school rose from 10% to 85%, and the share of workers employed in farming fell from "
        "70% to 15%. Many children of farm families became factory workers, clerks or teachers. A government survey found "
        "that by 2010 most people in professional jobs had parents who had worked on farms.")},
    {"id": "MCAT-T2-PS-P4", "title": "Passage 4: Treating depression", "text": (
        "Researchers randomly assigned 300 adults with major depressive disorder to 16 weeks of one of three treatments: a "
        "selective serotonin reuptake inhibitor (SSRI), cognitive behavioral therapy (CBT), or a pill with no active "
        "ingredient (placebo). Neither the participants nor the doctors who rated their symptoms knew who was taking the drug "
        "and who the placebo. Symptoms improved substantially in 55% of the SSRI group, 52% of the CBT group and 30% of the "
        "placebo group.\n\n"
        "The same team also studied twins. When one identical twin had major depressive disorder, the other also had it in "
        "about 40% of pairs; for fraternal twins the figure was about 20%.\n\n"
        "Participants with higher scores on a personality measure of anxiety, moodiness and emotional instability at the "
        "start of the study were more likely to relapse in the year after treatment. Many participants also described "
        "having stopped trying to change things in their lives after repeated failures they felt they could not control.")},
]

ITEMS = [
    # ================= Practice Test 1 =================
    # Passage 1 (FC6 x5, FC7 x1)
    Q(1, 2, F6, "6B Memory",
      "The design of the study, with testing after recovery sleep, is best suited to show that sleep helps which memory process?",
      ["Consolidation", "Encoding", "Retrieval", "Sensory memory"],
      "Both groups learned while rested and were tested while rested, so the difference must come from what happened between, when new memories are stabilized. Encoding happened before the groups were split.",
      stim="MCAT-T1-PS-P1"),
    Q(1, 1, F6, "6B Research methods",
      "What is the independent variable in the main study?",
      ["Whether students slept after learning", "The percentage of word pairs recalled at test", "Time spent in slow-wave sleep", "The number of word pairs learned"],
      "The researchers manipulated whether students slept or stayed awake; recall is the dependent variable. Slow-wave sleep was measured, not assigned.",
      stim="MCAT-T1-PS-P1"),
    Q(1, 2, F6, "6B Sleep and consciousness",
      "The link between slow-wave sleep and recall best supports which conclusion?",
      ["Deep sleep is associated with better recall", "Slow-wave sleep directly causes better recall", "REM sleep is unrelated to memory", "Recall causes deeper sleep later"],
      "Time in slow-wave sleep was measured, not manipulated, so the finding is a correlation and cannot by itself show cause. Nothing in the study measured REM sleep.",
      stim="MCAT-T1-PS-P1"),
    Q(1, 2, F6, "6B Attention",
      "The task in which students pressed a key for a rare letter in a stream of common ones mainly measured:",
      ["sustained attention over time", "long-term semantic memory", "divided attention between two tasks", "the speed of motor learning"],
      "Watching a stream for rare targets tests vigilance, the ability to keep attention on one task over time. The task did not require doing two things at once.",
      stim="MCAT-T1-PS-P1"),
    Q(1, 2, F6, "6C Stress",
      "Staying awake all night is a physical stressor. Which hormone, released by the adrenal cortex under control of the hypothalamic-pituitary-adrenal axis, would most likely rise?",
      ["Cortisol", "Melatonin", "Oxytocin", "Insulin"],
      "Stress activates the HPA axis: CRH from the hypothalamus, ACTH from the pituitary, then cortisol from the adrenal cortex. Melatonin comes from the pineal gland and tracks darkness.",
      stim="MCAT-T1-PS-P1"),
    Q(1, 2, F7, "7A Biological bases of behavior",
      "Caffeine helped some students stay awake. It reduces sleepiness mainly by:",
      ["blocking adenosine receptors", "stimulating brain GABA receptors", "raising melatonin release", "blocking dopamine release"],
      "Adenosine builds up during waking and promotes sleep pressure; caffeine blocks its receptors. Stimulating GABA receptors would sedate rather than alert.",
      stim="MCAT-T1-PS-P1"),
    # Passage 2 (FC7 x3, FC8 x2)
    Q(1, 2, F7, "7B Conformity",
      "The drop in conformity when answers were written privately suggests that most conformity in these studies reflected:",
      ["normative social influence", "informational social influence", "obedience to authority", "group polarization"],
      "People conformed mainly when the group could hear them, and they said they did not want to seem odd, which is the wish to be accepted, or normative influence. Informational influence would persist in private, since it changes what people believe.",
      stim="MCAT-T1-PS-P2"),
    Q(1, 1, F7, "7B Conformity",
      "According to the passage, what most reduced conformity?",
      ["One other person giving the correct answer", "Adding more people to the group", "Answering aloud rather than in private writing", "Using longer reference lines"],
      "A single ally who gave the correct answer cut conformity to about 6%. Adding people beyond three changed little, and answering aloud raised conformity.",
      stim="MCAT-T1-PS-P2"),
    Q(1, 3, F7, "7B Group processes",
      "Which result best shows that the effect of group size on conformity has a limit?",
      ["Little change beyond three others", "Rise from one to three others", "Drop when answers were given privately", "Drop when one person dissented"],
      "Conformity rose up to three others and then leveled off, so adding people stopped making a difference. The rise alone shows an effect but not its limit.",
      stim="MCAT-T1-PS-P2"),
    Q(1, 2, F8, "8B Attribution",
      "The observers' explanations of the conforming participants best illustrate:",
      ["the fundamental attribution error", "the self-serving bias", "the just-world hypothesis", "the halo effect"],
      "Observers explained behavior by personality (weak-willed) and overlooked the strong situational pressure, which is the fundamental attribution error. The self-serving bias concerns explanations of one's own outcomes.",
      stim="MCAT-T1-PS-P2"),
    Q(1, 2, F8, "8C Self-presentation",
      "Participants who gave the wrong answer aloud so as not to seem odd to the others, yet answered correctly in private, were most clearly engaged in:",
      ["impression management", "cognitive dissonance", "role conflict", "self-handicapping"],
      "Adjusting public behavior to control how others see you is impression management, part of self-presentation. Dissonance is the discomfort of holding conflicting beliefs or acts.",
      stim="MCAT-T1-PS-P2"),
    # Passage 3 (FC9 x3, FC10 x2)
    Q(1, 2, F10, "10A Spatial inequality",
      "The highway and waste station along Riverside's edge best illustrate which concept?",
      ["Environmental injustice", "Social reproduction of class", "Cultural capital", "Anomie"],
      "Environmental justice concerns how health risks such as pollution fall unequally on poorer and minority neighborhoods. Cultural capital refers to knowledge and tastes that confer advantage.",
      stim="MCAT-T1-PS-P3"),
    Q(1, 2, F10, "10A Social inequality",
      "Banks once refusing to lend in Riverside is an example of:",
      ["institutional discrimination", "individual prejudice by lenders", "voluntary segregation", "upward social mobility"],
      "Unequal treatment built into the practices of organizations such as banks is institutional discrimination, and its effects can last after the policy ends. It does not depend on any one person's prejudice.",
      stim="MCAT-T1-PS-P3"),
    Q(1, 3, F9, "9A Theoretical approaches",
      "The health department's report is most consistent with which sociological perspective?",
      ["Conflict theory", "Functionalism", "Symbolic interactionism", "Rational choice theory"],
      "Conflict theory explains outcomes through unequal power and resources between groups, as in the report's focus on the city's history of lending and land use. Rational choice theory would stress individual decisions, which the report says cannot explain the gap alone.",
      stim="MCAT-T1-PS-P3"),
    Q(1, 2, F9, "9B Demographic structure",
      "Compared with Hilltop, Riverside's population pyramid would most likely have:",
      ["a wider base and a narrower top", "a narrower base and a wider top", "nearly equal bars at every age", "a bulge in the oldest age groups"],
      "More children per family widens the bottom bars and fewer residents over 65 narrows the top, the shape of a younger, faster-growing population.",
      stim="MCAT-T1-PS-P3"),
    Q(1, 2, F9, "9B Urbanization",
      "The move of young professionals into the part of Riverside nearest downtown, and the departure of long-time residents, is best described as:",
      ["gentrification", "suburbanization", "ghettoization", "urban sprawl"],
      "Gentrification is the arrival of wealthier residents in a lower-income area, raising costs and displacing earlier residents. Suburbanization is movement out of the city.",
      stim="MCAT-T1-PS-P3"),
    # Passage 4 (FC7 x6)
    Q(1, 1, F7, "7C Operant conditioning",
      "Earning points on each smoke-free day is an example of:",
      ["positive reinforcement", "negative reinforcement", "positive punishment", "negative punishment"],
      "Adding something desirable after a behavior to make it more likely is positive reinforcement. Negative reinforcement removes something unpleasant.",
      stim="MCAT-T1-PS-P4"),
    Q(1, 2, F7, "7C Operant conditioning",
      "Group 2's rewards followed which kind of reinforcement schedule?",
      ["Variable ratio", "Fixed ratio", "Fixed interval", "Continuous"],
      "Each smoke-free day was a response that might or might not pay off, unpredictably, which is a variable-ratio schedule. Group 1's reward on every smoke-free day was continuous reinforcement.",
      stim="MCAT-T1-PS-P4"),
    Q(1, 2, F7, "7C Operant conditioning",
      "Relapse was slower in Group 2 after the rewards stopped. This is best explained by the fact that behavior learned on unpredictable rewards:",
      ["resists extinction more", "is acquired more quickly", "depends on punishment", "generalizes to fewer settings"],
      "Behavior reinforced on an unpredictable schedule is slower to extinguish, because missing rewards were already common during training. Continuous reinforcement produces fast learning and fast extinction.",
      stim="MCAT-T1-PS-P4"),
    Q(1, 2, F7, "7C Attitude change",
      "Participants who kept smoking were more likely to say the risks are exaggerated. This is best explained by:",
      ["cognitive dissonance", "the mere exposure effect", "social facilitation", "the bystander effect"],
      "Continuing to smoke while knowing it is harmful creates dissonance, and downplaying the risk brings belief into line with behavior. Mere exposure concerns liking things more after repeated contact.",
      stim="MCAT-T1-PS-P4"),
    Q(1, 3, F7, "7C Attitude change",
      "According to the elaboration likelihood model, the tailored messages most likely changed attitudes in health-conscious participants through:",
      ["the central route", "the peripheral route", "classical conditioning", "the foot-in-the-door technique"],
      "Motivated people who read carefully process the content of an argument, which is central-route persuasion and tends to produce lasting change. The peripheral route relies on cues like the source's appeal.",
      stim="MCAT-T1-PS-P4"),
    Q(1, 2, F7, "7A Biological bases of behavior",
      "Nicotine's addictive effect is most closely tied to dopamine release in which brain region?",
      ["Nucleus accumbens", "Occipital lobe", "Cerebellum", "Broca's area"],
      "The mesolimbic reward pathway, from the ventral tegmental area to the nucleus accumbens, is central to the reinforcing effects of addictive drugs. The cerebellum coordinates movement.",
      stim="MCAT-T1-PS-P4"),
    # Discrete
    Q(1, 2, F6, "6A Sensory processing",
      "A person can just tell a 102 g weight from a 100 g weight. By Weber's law, about how much must be added to a 500 g weight for the difference to be noticed?",
      ["10 g", "2 g", "5 g", "50 g"],
      "Weber's law says the just-noticeable difference is a constant fraction of the stimulus, here 2/100 = 2%, so 2% of 500 g is 10 g. A fixed 2 g difference ignores the law.",
      chk=500 * 2 / 100),
    Q(1, 1, F6, "6A Vision",
      "Which photoreceptors give sharp color vision, and where are they most concentrated?",
      ["Cones, in the fovea", "Rods, in the fovea", "Cones, at the retina's edge", "Rods, at the optic disc"],
      "Cones handle color and fine detail and are packed in the fovea. Rods, which work in dim light, are most dense away from the fovea, and the optic disc has no photoreceptors.",
    ),
    Q(1, 2, F6, "6C Emotion",
      "A man's heart races after a near-miss on the road. He notices he is with a friend who is laughing, and he decides he is excited, not afraid. This account best fits which theory of emotion?",
      ["The two-factor theory", "The James-Lange theory", "The Cannon-Bard theory", "The opponent-process theory"],
      "The two-factor theory holds that emotion is physiological arousal plus a cognitive label taken from the situation. James-Lange says the feeling follows from the bodily response alone, with no labeling step.",
    ),
    Q(1, 1, F8, "8A Identity development",
      "A 16-year-old tries out different friend groups, styles and career plans. In Erikson's theory, she is working through the conflict of:",
      ["identity versus role confusion", "intimacy versus isolation", "industry versus inferiority", "generativity versus stagnation"],
      "Erikson placed identity versus role confusion in adolescence, when young people explore who they are. Intimacy versus isolation comes in young adulthood.",
    ),
    Q(1, 2, F8, "8B Stereotypes",
      "Women told before a math test that it shows gender differences score lower than women told it does not. This is best explained by:",
      ["stereotype threat", "the self-fulfilling prophecy of teachers", "the actor-observer bias", "groupthink"],
      "Being reminded of a negative stereotype about one's group can cause anxiety that lowers performance, which is stereotype threat. The effect here comes from the test taker's own situation, not a teacher's expectations.",
    ),
    Q(1, 2, F8, "8A Self-concept",
      "A patient believes she can stick to a new exercise plan because she has managed similar changes before. Bandura would call this belief:",
      ["self-efficacy", "self-esteem", "an external locus of control", "the looking-glass self"],
      "Self-efficacy is a belief in one's ability to succeed at a specific task, often built on past success. Self-esteem is a general sense of self-worth.",
    ),
    Q(1, 1, F8, "8C Status and roles",
      "Being born the heir to a family business is an example of which kind of status?",
      ["Ascribed status", "Achieved status", "Master status", "Role strain"],
      "An ascribed status is assigned at birth or without effort; an achieved status is earned. A master status is whichever status dominates how others see a person.",
    ),
    Q(1, 2, F9, "9A Culture",
      "Eating with one's elbows on the table draws a frown, but stealing from a neighbor brings strong punishment. In sociological terms, these are violations of:",
      ["a folkway, then one of the mores", "one of the mores, then a law", "two different folkways", "a value, then a symbol"],
      "Folkways are everyday norms with mild sanctions, while mores carry moral weight and strong sanctions. Theft also breaks the law, but it is the moral weight that marks it as a violation of the mores.",
    ),

    # ================= Practice Test 2 =================
    # Passage 1 (FC6 x5, FC7 x1)
    Q(2, 1, F6, "6B Attention",
      "Counting participants' failure to see the umbrella is an example of:",
      ["inattentional blindness", "change blindness", "sensory adaptation", "the cocktail party effect"],
      "Missing an unexpected object in plain view while attention is on another task is inattentional blindness. Change blindness is failing to notice that something changed between views.",
      stim="MCAT-T2-PS-P1"),
    Q(2, 2, F6, "6B Perception",
      "Reading the smudged figure as B or 13 depending on its neighbors illustrates:",
      ["top-down processing", "bottom-up processing", "feature detection", "absolute threshold"],
      "The same stimulus was interpreted differently because of context and expectation, which is top-down processing. Bottom-up processing builds perception from the stimulus features alone, and those did not change.",
      stim="MCAT-T2-PS-P1"),
    Q(2, 2, F6, "6B Research methods",
      "In the umbrella experiment, the dependent variable is:",
      ["whether participants reported the umbrella", "whether participants were told to count passes", "the number of passes in the video", "how long the umbrella was visible"],
      "Researchers set the instructions (the independent variable) and measured whether people reported the umbrella. The umbrella's five seconds were held constant.",
      stim="MCAT-T2-PS-P1"),
    Q(2, 2, F6, "6B Perception",
      "The third condition, in which participants were warned that something might appear, shows the influence of:",
      ["perceptual set", "sensory adaptation", "retroactive interference", "the serial position effect"],
      "Expectations prepare people to perceive certain things, a perceptual set; warned participants noticed the umbrella far more often (80% against 45%).",
      stim="MCAT-T2-PS-P1"),
    Q(2, 3, F6, "6B Attention",
      "Which conclusion is best supported by comparing the watching group with the counting group?",
      ["A demanding task limits what else is noticed", "Counting passes improves memory for the video", "People notice nothing outside their task", "Umbrellas are hard to see on video"],
      "Reporting fell from 95% to 45% when attention was given to a demanding task, so capacity for unexpected stimuli was limited, not absent. Nearly half of counters still noticed it.",
      stim="MCAT-T2-PS-P1"),
    Q(2, 2, F7, "7B Conformity",
      "The drop in reports when a confederate said nothing unusual happened is best explained by:",
      ["conformity to the group", "social loafing", "deindividuation", "the mere exposure effect"],
      "Hearing another person deny the event made participants less likely to report it, matching others' stated view. Social loafing is reduced effort when working in a group.",
      stim="MCAT-T2-PS-P1"),
    # Passage 2 (FC8 x3, FC7 x2)
    Q(2, 1, F8, "8B Prejudice and discrimination",
      "The difference in interview requests is evidence of:",
      ["discrimination", "a stereotype only", "prejudice only", "reverse causation"],
      "Discrimination is unequal treatment, a behavior; the employers acted differently toward identical résumés. Stereotypes are beliefs and prejudice is an attitude, and neither alone is an action.",
      stim="MCAT-T2-PS-P2"),
    Q(2, 2, F8, "8B Prejudice and discrimination",
      "Managers who say they reject stereotypes yet respond faster on negative pairings show:",
      ["implicit bias", "explicit prejudice", "the halo effect", "ingroup heterogeneity"],
      "Automatic associations measured by reaction time can differ from what people consciously report; that gap reflects implicit bias. Explicit prejudice is what they said they rejected.",
      stim="MCAT-T2-PS-P2"),
    Q(2, 2, F8, "8B Prejudice reduction",
      "The six-month program pairing managers as equal partners on a shared project applies which idea?",
      ["The contact hypothesis", "The bystander effect", "The just-world hypothesis", "Social loafing"],
      "The contact hypothesis holds that prejudice falls with sustained contact under equal status and shared goals. The just-world hypothesis is the belief that people get what they deserve.",
      stim="MCAT-T2-PS-P2"),
    Q(2, 2, F7, "7B Group decision making",
      "The hiring committee that always agreed quickly despite private doubts best illustrates:",
      ["groupthink", "group polarization", "social facilitation", "the foot-in-the-door effect"],
      "Groupthink occurs when a cohesive group values agreement so much that members hold back doubts. Group polarization is a shift toward more extreme positions after discussion.",
      stim="MCAT-T2-PS-P2"),
    Q(2, 2, F7, "7C Attitude change",
      "Managers who first signed a short pledge were later more likely to volunteer for a longer training. This illustrates:",
      ["the foot-in-the-door technique", "the door-in-the-face technique", "reactance", "the sleeper effect"],
      "Agreeing to a small request makes people more likely to agree to a larger one later, the foot-in-the-door technique. Door-in-the-face starts with a large request that is refused.",
      stim="MCAT-T2-PS-P2"),
    # Passage 3 (FC9 x3, FC10 x2)
    Q(2, 2, F9, "9B Demographic transition",
      "What was the country's rate of natural increase in 1970?",
      ["2.6%", "3.8%", "1.2%", "26%"],
      "Natural increase is births minus deaths: 38 - 12 = 26 per 1,000, or 2.6% a year. 26% forgets that the rates are per 1,000, not per 100.",
      stim="MCAT-T2-PS-P3", chk=(38 - 12) / 10),
    Q(2, 2, F9, "9B Demographic transition",
      "Based on the table, by 2010 the country is most likely facing:",
      ["an aging population", "a rapidly growing population", "a rising crude death rate from disease", "very high fertility"],
      "With births and deaths both low and nearly equal, growth has stalled, and over time the share of older people rises. The death rate's small rise reflects an older population, not disease.",
      stim="MCAT-T2-PS-P3"),
    Q(2, 2, F9, "9B Fertility",
      "Which change described in the passage would demographers most expect to lower the birth rate?",
      ["More girls finishing secondary school", "Fewer people working in factories", "A falling share of residents living in cities", "A higher death rate among adults"],
      "Women's education is one of the strongest predictors of falling fertility, along with urbanization. The passage describes a rising, not falling, urban share.",
      stim="MCAT-T2-PS-P3"),
    Q(2, 3, F10, "10A Social mobility",
      "Many farm children becoming clerks and teachers because farm jobs disappeared is an example of:",
      ["structural mobility", "horizontal mobility", "downward mobility", "exchange mobility"],
      "Structural mobility results from changes in the economy itself, here the shrinking of farming and growth of other jobs, rather than from individuals swapping places. Exchange mobility leaves the overall structure unchanged.",
      stim="MCAT-T2-PS-P3"),
    Q(2, 2, F10, "10A Social mobility",
      "A woman in the survey who began as a clerk and became a company director by retirement experienced:",
      ["intragenerational mobility", "intergenerational mobility", "horizontal mobility", "structural immobility"],
      "Change in a person's own position over their lifetime is intragenerational mobility; comparing a child's position with the parents' is intergenerational.",
      stim="MCAT-T2-PS-P3"),
    # Passage 4 (FC7 x6)
    Q(2, 1, F7, "7A Psychological disorders",
      "How does an SSRI act at the synapse?",
      ["It blocks serotonin reuptake", "It mimics serotonin at receptors", "It breaks serotonin down", "It blocks serotonin receptors"],
      "Selective serotonin reuptake inhibitors keep serotonin in the synaptic cleft longer by blocking its transporter back into the neuron. Monoamine oxidase, not an SSRI, breaks serotonin down.",
      stim="MCAT-T2-PS-P4"),
    Q(2, 2, F7, "7A Biological bases of behavior",
      "The twin results best support which conclusion?",
      ["Genes contribute to depression risk", "Depression is caused by genes and nothing else", "Shared homes cause depression", "Fraternal twins share more genes"],
      "Identical twins share nearly all their genes and fraternal twins about half, so higher concordance in identical twins points to a genetic contribution. Concordance well below 100% shows environment matters too.",
      stim="MCAT-T2-PS-P4"),
    Q(2, 2, F7, "7A Psychological disorders",
      "Cognitive behavioral therapy for depression mainly works by:",
      ["changing negative automatic thoughts", "exploring unconscious childhood conflicts", "raising serotonin with diet", "removing all stress from daily life"],
      "CBT teaches patients to recognize and challenge distorted thoughts and to change related behaviors. Exploring unconscious conflicts describes psychodynamic therapy.",
      stim="MCAT-T2-PS-P4"),
    Q(2, 2, F7, "7A Psychological disorders",
      "Participants who stopped trying after failures they felt they could not control illustrate which model of depression?",
      ["Learned helplessness", "Classical conditioning", "The diathesis-stress model", "Social learning"],
      "Learned helplessness is giving up after experiencing that one's actions do not affect outcomes, a model applied to depression. The diathesis-stress model concerns how vulnerability and stress combine.",
      stim="MCAT-T2-PS-P4"),
    Q(2, 2, F7, "7A Personality",
      "The personality measure that predicted relapse most closely matches which Big Five trait?",
      ["Neuroticism", "Extraversion", "Conscientiousness", "Openness"],
      "Neuroticism describes a tendency toward anxiety, moodiness and emotional instability, the traits the measure scored. Conscientiousness concerns organization and self-discipline.",
      stim="MCAT-T2-PS-P4"),
    Q(2, 3, F7, "7A Research on treatment",
      "What does the improvement in the placebo group most directly show?",
      ["Expectation and time can bring improvement", "The SSRI did not work at all", "CBT works no better than the placebo pill does", "The study was not double-blind"],
      "Thirty percent improved with no active drug, so expectation, natural recovery or regular contact can reduce symptoms; that is why active treatments are compared with placebo. Both active treatments did better than 30%.",
      stim="MCAT-T2-PS-P4"),
    # Discrete
    Q(2, 1, F6, "6A Hearing",
      "Which cells convert sound vibrations into nerve signals?",
      ["Hair cells in the cochlea", "Rods in the retina", "Cells of the semicircular canals", "Taste receptor cells"],
      "Movement of the basilar membrane bends the hair cells of the cochlea, opening ion channels and triggering signals in the auditory nerve. The semicircular canals sense head rotation.",
    ),
    Q(2, 2, F6, "6B Cognitive development",
      "A 4-year-old says a tall, thin glass holds more juice than a short, wide one, though she watched the same juice poured between them. In Piaget's theory she has not yet mastered:",
      ["conservation", "object permanence", "abstract reasoning", "egocentrism"],
      "Understanding that quantity stays the same when shape changes is conservation, mastered in the concrete operational stage. Object permanence is gained in infancy.",
    ),
    Q(2, 2, F6, "6C Emotion",
      "A theory holds that we feel afraid because we notice our heart racing and our legs running. This is the:",
      ["James-Lange theory", "Cannon-Bard theory", "Schachter-Singer theory", "Yerkes-Dodson law"],
      "James-Lange theory says the feeling of emotion follows from perceiving the body's response. Cannon-Bard holds that the feeling and the bodily response happen at the same time.",
    ),
    Q(2, 1, F7, "7C Classical conditioning",
      "A patient now feels anxious at the sound of a dental drill, which was once a neutral sound. In classical conditioning terms, the drill's sound is now:",
      ["a conditioned stimulus", "an unconditioned stimulus", "an unconditioned response", "a negative reinforcer"],
      "A neutral stimulus paired with an unconditioned one (painful treatment) comes to trigger the response by itself, becoming a conditioned stimulus. The pain was the unconditioned stimulus.",
    ),
    Q(2, 2, F8, "8A Self-concept",
      "A student comes to see herself as funny because classmates laugh at her jokes. This illustrates Cooley's idea of:",
      ["the looking-glass self", "the generalized other", "self-verification", "the ideal self"],
      "The looking-glass self is the self-image we form from how we imagine others see us. Mead's generalized other is the attitude of the community as a whole.",
    ),
    Q(2, 2, F8, "8B Attribution",
      "After a good exam score, a student credits her intelligence; after a poor one, she blames the unfair questions. This pattern is:",
      ["the self-serving bias", "the fundamental attribution error", "the false consensus effect", "learned helplessness"],
      "Taking credit for success and blaming situations for failure is the self-serving bias. The fundamental attribution error concerns how we explain other people's behavior.",
    ),
    Q(2, 2, F8, "8C Attachment",
      "In a strange situation procedure, a toddler is upset when her mother leaves and is quickly comforted when she returns. This fits which attachment style?",
      ["Secure", "Avoidant", "Ambivalent", "Disorganized"],
      "Securely attached children show distress at separation and are easily soothed on reunion. Avoidant children show little distress and ignore the parent on return.",
    ),
    Q(2, 2, F9, "9A Social institutions",
      "Schools teach academic skills, but they also provide child care that lets parents work. From a functionalist view, child care is a:",
      ["latent function", "manifest function", "dysfunction", "social sanction"],
      "Manifest functions are intended and recognized, such as teaching skills; latent functions are unintended effects, such as child care. A dysfunction disrupts the social order.",
    ),
]
