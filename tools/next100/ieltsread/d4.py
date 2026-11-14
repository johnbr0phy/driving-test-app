# Drill-only passages: the sound of coral reefs, and the first weather forecasters.

D7 = {"id": "IELTSR-D-P07", "title": "Listening to the Reef", "text": (
    "**A** Coral reefs are often described as among the most colourful places on Earth, but to a marine biologist with an underwater microphone they are also among the noisiest. A healthy reef crackles with the snapping of shrimp, the grunts and pops of fish and the scraping of animals feeding on coral. For a long time this noise was treated as little more than background, something to be filtered out of recordings. Over the past two decades, however, researchers have come to see it as a valuable source of information.\n\n"
    "**B** Sound travels well underwater, much further than light, and young fish appear to use it to find a home. Many reef fish spend the first weeks of life drifting in open water as tiny larvae before returning to settle on a reef. Experiments in which recordings of reef noise were played through loudspeakers in open water found that larvae were attracted towards the sound, suggesting that noise acts as a kind of signpost leading them back to the reef.\n\n"
    "**C** A damaged reef sounds very different. When corals die, as they may after a period of unusually warm water, the fish and other animals that depend on them often leave or die too, and the reef falls quiet. Recordings made on the same reefs before and after such events show the change clearly: a rich mixture of sounds gives way to a thinner, quieter one. Some scientists now suggest that sound recordings could be used to monitor the health of reefs cheaply, since a microphone left on the sea floor can record for weeks without a diver.\n\n"
    "**D** This raised an intriguing question. If young fish are drawn to the sound of healthy reefs, and damaged reefs are quiet, could playing healthy sounds on a damaged reef help it recover? In one study on a damaged section of reef, researchers built small patches of dead coral and placed loudspeakers on some of them. Over several weeks, the patches with loudspeakers attracted considerably more young fish, and a wider range of species, than those left silent.\n\n"
    "**E** The researchers are careful about what their results mean. Attracting fish is not the same as restoring a reef: if the water stays too warm or polluted, the corals will not recover and the fish may not survive. Loudspeakers are also expensive to maintain at sea. The scientists describe sound as one tool that might be combined with others, such as replanting coral fragments, rather than a cure on its own.\n\n"
    "**F** Human noise adds another complication. The engines of ships and boats are loud underwater, and studies suggest that they can interfere with the ability of fish to hear each other and to detect predators. In busy coastal waters, the sounds of a healthy reef may be partly drowned out. Protecting the soundscape of the sea, some researchers argue, should become part of protecting the reefs themselves."
)}

L = "ABCDEF"
D7_ITEMS = [
    MI(1, "a description of the sounds made on a healthy reef", "A", L,
       "Paragraph A describes the snapping of shrimp, the grunts and pops of fish and the scraping of animals feeding on coral."),
    MI(2, "an account of an experiment with loudspeakers in open water", "B", L,
       "Paragraph B describes recordings played through loudspeakers in open water that attracted fish larvae. The loudspeakers in Paragraph D were on patches of dead coral."),
    MI(2, "a suggestion that recordings could be used to check the health of reefs", "C", L,
       "Paragraph C says some scientists suggest sound recordings could monitor reef health cheaply."),
    MI(2, "a warning that attracting fish does not mean a reef has been restored", "E", L,
       "Paragraph E says attracting fish is not the same as restoring a reef, because corals will not recover in water that stays too warm or polluted."),
    MI(1, "a reference to noise made by ships", "F", L,
       "Paragraph F says the engines of ships and boats are loud underwater and can interfere with fish hearing."),
    TF(1, "Reef noise was once mainly treated as something to remove from recordings.", "T",
       "Paragraph A says the noise was treated as background, something to be filtered out of recordings."),
    TF(1, "Sound travels further than light underwater.", "T",
       "Paragraph B says sound travels well underwater, much further than light."),
    TF(2, "The loudspeaker study on the damaged reef lasted two years.", "F",
       "Paragraph D says the results came over several weeks, which contradicts a two-year study."),
    CZ(1, "Note completion", "Complete the note. Choose ONE word from the list.\n\nMonitoring reefs with sound: a microphone on the sea floor can record for weeks without a [[1]].",
       "diver", ["boat", "cable", "battery", "camera"],
       "Paragraph C says a microphone left on the sea floor can record for weeks without a diver."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nThe scientists suggest combining sound with other methods, such as replanting coral [[1]].",
       "fragments", ["seeds", "larvae", "skeletons", "reefs"],
       "Paragraph E names replanting coral fragments as another tool. Patches of dead coral were part of the experiment in Paragraph D."),
    MC(2, "What happened on the coral patches that had loudspeakers?", "More fish and more species arrived",
       ["The dead coral began to grow again", "Fewer predators were seen there", "The water around them became cooler"],
       "Paragraph D says these patches attracted considerably more young fish and a wider range of species than silent patches. Paragraph E says the corals will not recover from sound alone."),
    MC(2, "What is the main point of Paragraph F?", "Human noise may hide the sound of reefs",
       ["Ships cause most of the damage to corals", "Fish have learned to avoid boats", "Reefs are louder near busy coasts"],
       "Paragraph F says engine noise can drown out a healthy reef's sounds and interfere with fish hearing, so the soundscape itself needs protecting."),
]

D8 = {"id": "IELTSR-D-P08", "title": "From Weather Lore to Forecasts", "text": (
    "For most of history, predicting the weather was a matter of proverbs and personal experience. Sailors and farmers watched the sky, the wind and the behaviour of animals, and some of their sayings contained real wisdom. But there was no way of knowing what weather was approaching from beyond the horizon, because no message could travel faster than the weather itself.\n\n"
    "One of the first steps towards a scientific approach was a matter of language. In 1805 the British naval officer Francis Beaufort devised a scale for describing the strength of the wind, at first by its effect on the sails of a warship. A shared scale allowed observations made by different people at different times to be compared, which was essential if they were ever to be combined.\n\n"
    "The electric telegraph, spreading in the mid-nineteenth century, changed everything, because reports of weather could now be sent across a country in minutes. Robert FitzRoy, who had commanded the survey ship on which Charles Darwin sailed, was appointed to head a new government department collecting weather information for use at sea. He set up a network of coastal stations that telegraphed their observations to London, and from these he issued warnings of storms to ports. In 1861 he began publishing what he called forecasts in a national newspaper. His predictions were often wrong, and he was ridiculed for them, but the storm warnings were valued by many sailors, and after they were stopped following his death in 1865, complaints from shipping interests soon brought them back.\n\n"
    "Observation alone, however, could not explain why weather behaved as it did. In the early twentieth century, a group of scientists in the Norwegian city of Bergen, led by Vilhelm Bjerknes, developed the idea that the atmosphere contains large bodies of air with different temperatures, and that the boundaries between them, which they called fronts, are where much of the most changeable weather occurs. The term was chosen partly because the period was marked by the battlefronts of the First World War.\n\n"
    "Bjerknes also believed that weather could in principle be calculated from the laws of physics. The English mathematician Lewis Fry Richardson attempted to do exactly that. Working largely by hand, he spent around six weeks calculating how the weather would change over a period of just six hours. His result was badly wrong, partly because of errors in the starting data, but his method was sound. He imagined a vast hall in which thousands of people would perform calculations together, fast enough to keep ahead of the real weather.\n\n"
    "Richardson's dream came true in a form he could not have foreseen. When electronic computers appeared after the Second World War, they were soon applied to weather prediction, and methods descended from those he had worked out by hand became the basis of modern forecasting."
)}

NAMES8 = ["Francis Beaufort", "Robert FitzRoy", "Vilhelm Bjerknes", "Lewis Fry Richardson"]
D8_ITEMS = [
    MF(1, "Which person created a way of describing the strength of the wind?", "Francis Beaufort", NAMES8,
       "In 1805 Beaufort devised a scale for describing wind strength, at first by its effect on a warship's sails."),
    MF(1, "Which person began publishing forecasts in a national newspaper?", "Robert FitzRoy", NAMES8,
       "FitzRoy began publishing what he called forecasts in a national newspaper in 1861."),
    MF(2, "Which person led a group that developed the idea of fronts?", "Vilhelm Bjerknes", NAMES8,
       "The Bergen group led by Vilhelm Bjerknes developed the idea that boundaries between bodies of air, called fronts, bring changeable weather."),
    MF(2, "Which person imagined thousands of people calculating the weather together?", "Lewis Fry Richardson", NAMES8,
       "Richardson imagined a vast hall in which thousands of people would perform calculations fast enough to keep ahead of the weather."),
    MF(2, "Which person set up a network of coastal stations that sent reports to London?", "Robert FitzRoy", NAMES8,
       "FitzRoy set up coastal stations that telegraphed observations to London and issued storm warnings from them."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nBeaufort's scale at first described the wind by its effect on the [[1]] of a warship.",
       "sails", ["flags", "crew", "guns", "masts"],
       "The second paragraph says the scale described the wind at first by its effect on the sails of a warship."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nThe Bergen scientists called the boundaries between bodies of air with different temperatures [[1]].",
       "fronts", ["borders", "walls", "lines", "edges"],
       "The fourth paragraph says the boundaries between bodies of air were called fronts, a word taken partly from the battlefronts of the war."),
    CZ(2, "Short-answer questions", "Answer the question. Choose ONE word from the list.\n\nAbout how long did Richardson spend on his calculation? Six [[1]]",
       "weeks", ["hours", "days", "months", "years"],
       "The fifth paragraph says he spent around six weeks calculating. Six hours was the period his forecast covered."),
    MC(2, "Why was the telegraph so important to weather forecasting?", "Reports could be sent in minutes",
       ["It measured wind speed accurately", "It replaced the Beaufort scale", "It was invented by FitzRoy"],
       "The third paragraph says the telegraph changed everything because weather reports could be sent across a country in minutes, faster than the weather itself."),
    MC(2, "What does the writer say about Richardson's forecast?", "It was wrong, but his method was sound",
       ["It was accurate but took far too long", "It was made with an early electronic computer", "It was rejected by Bjerknes"],
       "The fifth paragraph says his result was badly wrong, partly because of errors in the starting data, but his method was sound."),
    TF(1, "FitzRoy's storm warnings were valued by many sailors.", "T",
       "The third paragraph says the storm warnings were valued by many sailors, even though his forecasts were often wrong."),
    TF(2, "Richardson worked with Bjerknes in Bergen.", "NG",
       "The passage says Bjerknes believed weather could be calculated and that Richardson attempted it, but never says where Richardson worked or that they worked together."),
]

PASSAGES = [(D7, D7_ITEMS), (D8, D8_ITEMS)]
