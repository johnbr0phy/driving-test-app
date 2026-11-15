# SSAT Middle Level, Reading: argument passages (a clear point of view on a
# subject in science, social studies or the humanities). Original passages,
# five questions each: main idea, details, author's purpose, how the argument
# is supported, word meaning and inference.
# A1, A2 Practice Test 1; A3, A4 Practice Test 2; A5, A6 drill only.

STIMULI = {
    "A1": ("Plant the Shade", """Every summer, the same neighborhoods in our city break the same records. Bus stops turn into ovens. Sidewalks are too hot to touch. And every summer, the city council discusses the problem and does very little. It is time for a simple, proven solution: plant trees, and plant them where they are needed most.

A grown street tree is a remarkable machine. Its leaves block sunlight before it can heat the pavement, and they release water vapor that cools the air around them, much as sweat cools skin. People who measure city temperatures have found that a street shaded by trees can be several degrees cooler than a bare street only a few blocks away. Trees also soak up rainwater that would otherwise flood storm drains, and they make walking more pleasant, which means fewer short trips by car.

Critics say trees are expensive to plant and care for, and that their roots crack sidewalks. These concerns are real, but they are not reasons to do nothing. Choosing the right kind of tree for each street, and giving its roots enough room, prevents most sidewalk damage. As for cost, a tree's benefits grow every year it lives, while the cost of a heat wave, in hospital visits and electric bills, arrives all at once.

The neighborhoods that suffer most from heat are often the ones with the fewest trees. The council should start there, this year. Shade should not be a luxury."""),
    "A2": ("In Defense of Bats", """Few animals have a worse reputation than bats. In stories they are spooky and sneaky, and probably up to no good. But the real bats of North America deserve our protection, not our fear, and the reasons are practical as much as they are kind.

Consider insects. A single little brown bat can catch hundreds of small insects in an hour of hunting. Across a whole colony, over a whole summer, that adds up to tons of insects that never reach farm fields. Scientists who study crop pests estimate that bats save American farmers billions of dollars a year in pesticides they do not have to buy. Some bats in warmer regions do another job as well: they pollinate plants, carrying pollen from flower to flower as they feed on nectar.

Yet bats are in trouble. A disease called white-nose syndrome has killed millions of bats that spend the winter in caves. Wind turbines, though important for clean energy, kill many bats that fly into their blades. And because many bats raise only one pup a year, their numbers recover slowly.

There are simple ways to help. People can leave old trees standing where bats roost, put up bat houses, and stay out of caves that are closed to protect sleeping colonies. Wind farms can slow their blades on calm nights, when bats are most active. None of this requires us to love bats. It only requires us to notice how much they already do for us."""),
    "A3": ("More Than Books", """When most people picture a public library, they imagine shelves of books and a librarian whispering "shh." But many libraries across the country now lend things that would surprise a visitor from fifty years ago: telescopes, sewing machines, ukuleles, cake pans shaped like dinosaurs, even power drills. Some people call these collections a distraction from a library's real job. I think they are the library's real job, brought up to date.

A library has always been a way for a community to share things that are too costly for most people to own alone. In the 1800s, books were expensive, so towns pooled their money and bought them for everyone. Today a family can buy a paperback for a few dollars, but a telescope or a set of tools may cost hundreds. A family that uses a drill twice a year should not have to buy one, and a child curious about the stars should not have to wait until her parents can afford a telescope.

Lending objects also brings in people who might never have walked through the door. A father who comes to borrow a ladder may leave with a stack of picture books for his kids. A teenager who borrows a guitar may stay for a free lesson in the meeting room.

Of course, books must stay at the heart of the library. But a library that shares only books is like a bakery that sells only one kind of bread. The idea behind it is bigger than its shelves."""),
    "A4": ("Give Us Back the Stars", """Step outside on a clear night in most American cities and count the stars. You may get to a dozen. A few generations ago, the same sky would have shown thousands. The stars have not gone anywhere. We have simply drowned them in light, and I believe it is time to turn some of it off.

Light at night is not only a problem for stargazers. Many birds migrate in the dark and steer partly by the stars; brightly lit buildings confuse them, and many crash into lit windows. Newly hatched sea turtles find the ocean by heading toward the brighter horizon over the water, so beachfront lights can lead them inland instead. Even people may sleep worse when a streetlight shines through the curtains all night.

Fixing this does not mean living in darkness. Much outdoor lighting is wasted because it shines sideways and up, into the sky and into bedroom windows, instead of down onto the sidewalk where it is needed. Shielded fixtures aim light at the ground. Timers and motion sensors switch lights off when no one is around. Warmer, dimmer bulbs cause less glare. Several towns have already made changes like these and found that their streets are still safe, their electric bills are lower, and their residents can see the Milky Way again.

Our town should join them. We protect rivers and forests because they belong to everyone. The night sky belongs to everyone too."""),
    "A5": ("Every Child a Swimmer", """Every summer, news stories remind us how quickly a day at the lake or the pool can turn tragic. Drowning is one of the leading causes of accidental death for young children in the United States. Yet in many neighborhoods, swimming lessons are something families have to pay for, and many simply cannot. Our city should offer free swimming lessons to every child in second grade.

Swimming is not just a sport. It is a safety skill, like looking both ways before crossing the street. A child who can float, tread water, and swim a short distance to the edge has a much better chance of staying safe after an unexpected fall into deep water. Children who learn young also tend to feel at home in the water, which makes them less likely to panic.

Some will say this is the job of parents, not the city. But we already teach children other safety skills in school, from fire drills to bicycle safety. And many parents never learned to swim themselves, so they cannot teach their children. A free program would break that cycle.

The cost would be modest. The city already owns three public pools that sit nearly empty on weekday mornings during the school year. Using them for lessons would cost far less than building anything new. Second graders could ride the bus there with their classes, the way they already go on field trips.

Learning to swim should not depend on the size of a family's bank account."""),
    "A6": ("Give Old Buildings a New Job", """When an old building stands empty, the quickest plan is usually to knock it down and start over. The quickest plan is not always the best one. Our town should make a habit of reusing its old buildings instead of tearing them down.

Old buildings tell a town's story in a way that a plaque never can. The brick mill by the river, for instance, shows how people here once earned their living. Its tall windows were built to let in daylight before electric lights were common. Walking past it, a child can see that history instead of reading about it.

Reusing a building can also be the less wasteful choice. Tearing down a building fills trucks with broken brick and concrete, and a new building needs new materials, each made and shipped using energy. When a sturdy old building is repaired and given a new job, much of that material and energy is saved.

Some towns have turned old mills into apartments, old fire stations into restaurants, and old schools into community centers. These buildings often become the places people love most, because they feel different from anything built last year.

Not every old building can be saved. Some are unsafe, and some would cost too much to repair. But before our town approves another demolition, it should ask a simple question: could this building do something new? Too often, no one asks."""),
}


def R(test, stim, skill, diff, basics, stem, key, wrong, expl):
    return dict(test=test, stim=stim, skill=skill, diff=diff, basics=basics,
                stem=stem, key=key, wrong=wrong, expl=expl)


ITEMS = [
    # ---- A1 (Practice Test 1)
    R(1, "A1", "Main idea", 1, "mainIdea", "Which sentence best states the main idea of the passage?",
      "The city should plant street trees.",
      ["Heat waves are getting worse each year.", "Tree roots damage too many sidewalks.", "The council has handled the heat well.", "Cars are the main cause of summer heat."],
      "The author calls trees \"a simple, proven solution\" and ends by telling the council to start planting this year. Root damage is an objection the author answers, not the main idea."),
    R(1, "A1", "Detail", 1, "findingDetail", "According to the passage, how do leaves cool the air around them?",
      "by releasing water vapor",
      ["by reflecting sunlight upward", "by absorbing car exhaust", "by blocking the wind", "by storing cold at night"],
      "The second paragraph says leaves release water vapor that cools the air, much as sweat cools skin. Leaves block sunlight too, but that keeps the pavement from heating; it is not how they cool the air."),
    R(1, "A1", "Author's purpose", 2, "authorPurpose", "The main purpose of the third paragraph is to:",
      "answer critics of the plan",
      ["list the best kinds of trees", "describe a recent heat wave", "praise the city council", "explain how tree roots grow"],
      "It begins \"Critics say\" and then replies to their two worries, cost and cracked sidewalks."),
    R(1, "A1", "Supporting evidence", 2, "claimSupport", "Which detail best supports the claim that trees cool city streets?",
      "Shaded streets measure cooler.",
      ["Trees soak up rain that floods drains.", "Shade makes walking more pleasant.", "Some tree roots crack the sidewalks.", "Trees cost money to plant and keep."],
      "Temperature measurements comparing shaded and bare streets show the cooling directly. Soaking up rain is a real benefit, but it is about flooding, not heat."),
    R(1, "A1", "Word in context", 3, None, "In the last sentence, the word \"luxury\" most nearly means:",
      "a thing only a few get",
      ["something cool and shady", "a costly kind of tree", "a reward for good work", "a problem to be solved"],
      "The author has just said the hottest neighborhoods have the fewest trees, so shade should not belong only to the lucky few. A costly kind of tree mixes up luxury with price."),
    # ---- A2 (Practice Test 1)
    R(1, "A2", "Main idea", 1, "mainIdea", "Which sentence best states the main idea of the passage?",
      "Bats are useful and need our protection.",
      ["Bats are more dangerous than people think.", "Wind farms should be shut down for good.", "Most stories about bats are true.", "Farmers should use more pesticides."],
      "The first paragraph says bats deserve \"our protection, not our fear,\" and the rest explains what they do for us and how to help them."),
    R(1, "A2", "Detail", 1, "findingDetail", "According to the passage, why do bat numbers recover slowly?",
      "Many have just one pup a year.",
      ["They sleep in very cold caves.", "They eat only one kind of insect.", "They fly only on calm nights.", "They avoid living in old trees."],
      "The third paragraph links the slow recovery to raising only one pup a year. Cold caves are where bats spend the winter, not the reason numbers recover slowly."),
    R(1, "A2", "Author's attitude", 2, None, "The author's view of wind turbines is that they:",
      "matter but should be run with care",
      ["are useless and should be removed", "pose no danger to any wildlife", "are more useful than bat houses", "are the cause of white-nose syndrome"],
      "The author calls turbines \"important for clean energy\" but notes they kill bats and suggests slowing the blades on calm nights. White-nose syndrome is a disease, not something turbines cause."),
    R(1, "A2", "Author's purpose", 2, "authorPurpose", "The author mentions the money farmers save on pesticides mainly to:",
      "show that bats help people",
      ["explain how pesticides work", "warn farmers about bats", "compare bats with birds", "show that farming is costly"],
      "The point comes right after the author says the reasons to protect bats are practical: bats eat crop pests, so farmers spend less."),
    R(1, "A2", "Inference", 3, None, "The last two sentences suggest that the author believes people:",
      "can help bats without love",
      ["secretly love bats already", "should keep bats as pets", "do too much to help animals", "cannot change their minds"],
      "\"None of this requires us to love bats\" means the steps work even for people who still find bats creepy; noticing their value is enough."),
    # ---- A3 (Practice Test 2)
    R(2, "A3", "Main idea", 1, "mainIdea", "Which sentence best states the author's main point?",
      "Lending objects suits a library.",
      ["Libraries should stop lending books.", "Books cost too much to buy today.", "Libraries should become bakeries.", "Most families already own tools."],
      "The author says lending telescopes and drills is \"the library's real job, brought up to date,\" because libraries exist to share costly things. The author insists books stay at the heart of the library."),
    R(2, "A3", "Detail", 1, "findingDetail", "According to the passage, why did towns in the 1800s buy books for everyone?",
      "Books were costly to buy alone.",
      ["People disliked the bookstores.", "Towns had too many old books.", "Few children could read yet.", "Librarians wanted quiet rooms."],
      "The second paragraph says books were expensive then, so towns pooled their money. Today paperbacks are cheap, which is why the author turns to other costly items."),
    R(2, "A3", "Author's purpose", 2, "authorPurpose", "Why does the author describe the father who comes to borrow a ladder?",
      "to show tools draw in new users",
      ["to show that ladders are popular", "to argue fathers read too little", "to explain how a loan is made", "to warn about borrowing tools"],
      "The paragraph begins by saying lending objects brings in people who might never have come, and the father leaves with picture books, so the example shows that effect."),
    R(2, "A3", "Figurative language", 2, None, "The comparison to a bakery that sells only one kind of bread suggests that a library:",
      "can share many kinds of things",
      ["should start selling food", "is less useful than a bakery", "is old-fashioned and dull", "costs too much money to run"],
      "A bakery with one bread would be offering far less than it could; the author means a library that lends only books is doing the same."),
    R(2, "A3", "Inference", 3, None, "The author would most likely agree with which statement?",
      "Sharing costly things helps a town.",
      ["Libraries are no longer needed.", "Only books belong in a library.", "Telescopes are a waste of money.", "Children should buy their own tools."],
      "The whole argument rests on the idea that a community gains by sharing things that are too costly for one family to own."),
    # ---- A4 (Practice Test 2)
    R(2, "A4", "Main idea", 1, "mainIdea", "Which sentence best states the main idea of the passage?",
      "The town should cut wasted light.",
      ["Cities have lost all of their stars.", "Streetlights make streets less safe.", "Sea turtles should stay off beaches.", "People should buy darker curtains."],
      "The author asks the town to aim, time and dim its lights as other towns have. The stars have not been lost; the author says they are hidden by light."),
    R(2, "A4", "Detail", 1, "findingDetail", "According to the passage, how do newly hatched sea turtles find the ocean?",
      "by heading toward the brighter horizon",
      ["by following their mothers to the water", "by smelling the salt in the air", "by listening for the crashing waves", "by steering by the stars overhead"],
      "The second paragraph says hatchlings head for the brighter horizon over the water, which is why beach lights can lead them inland. Steering by the stars is what the passage says migrating birds do."),
    R(2, "A4", "Author's purpose", 2, "authorPurpose", "The main purpose of the second paragraph is to show that night lighting:",
      "harms more than the view",
      ["helps stars form in the sky", "has been fixed in some towns", "keeps birds from migrating", "is brighter at the beach"],
      "It opens with \"Light at night is not only a problem for stargazers\" and gives birds, turtles and people as examples. The towns that fixed their lighting come in the third paragraph."),
    R(2, "A4", "Supporting evidence", 2, "claimSupport", "Which detail does the author offer as evidence that the changes can work?",
      "Towns that changed stayed safe.",
      ["Birds steer partly by the stars.", "Warmer bulbs make less glare.", "Few stars show over cities.", "Rivers belong to everyone."],
      "Towns that shielded and timed their lights found their streets still safe and their bills lower, which shows the plan works. Warmer bulbs are one of the proposed changes, not the result of making them."),
    R(2, "A4", "Word in context", 3, None, "In the phrase \"drowned them in light,\" the word \"drowned\" most nearly means:",
      "hidden",
      ["soaked", "sunk", "rescued", "cooled"],
      "So much light floods the sky that the stars are hidden under it, so drowned here means hidden by too much of something. Soaked takes the word too literally; no water is involved."),
    # ---- A5 (drill only)
    R(0, "A5", "Main idea", 1, "mainIdea", "Which sentence best states the main idea of the passage?",
      "The city should give free swim lessons.",
      ["Parents should teach their own children.", "Public pools should close during school.", "Swimming is the best sport for children.", "Field trips should go to the lake."],
      "The first paragraph ends with the proposal, free lessons for every second grader, and the rest of the passage gives reasons and answers an objection."),
    R(0, "A5", "Detail", 1, "findingDetail", "According to the passage, when do the city's pools sit nearly empty?",
      "school-day mornings",
      ["summer weekends", "winter evenings", "long holidays", "July mornings"],
      "The fourth paragraph says the three pools sit nearly empty on weekday mornings during the school year, which is when the lessons would happen."),
    R(0, "A5", "Supporting evidence", 2, "claimSupport", "Which detail does the author use to show that the plan would not cost much?",
      "The city already owns three pools.",
      ["Children can learn to tread water.", "Many parents never learned to swim.", "Schools already teach bike safety.", "Drowning is a leading danger."],
      "Using pools the city already owns would cost far less than building new ones. The other details support other parts of the argument."),
    R(0, "A5", "Author's purpose", 2, "authorPurpose", "The author compares swimming to looking both ways before crossing the street in order to:",
      "show swimming is a safety skill",
      ["show that roads are dangerous", "argue lessons should be outdoors", "explain how to cross streets", "show that children forget rules"],
      "The comparison comes right after \"Swimming is not just a sport,\" so it presents swimming as a basic skill for staying safe."),
    R(0, "A5", "Argument", 3, None, "How does the author answer people who say teaching swimming is the parents' job?",
      "Schools teach other safety skills.",
      ["Parents spend too much on lessons now.", "The city has more money than parents.", "Children learn best from their friends.", "Swimming lessons are always free."],
      "The third paragraph points out that schools already teach fire and bicycle safety, and adds that many parents cannot swim themselves."),
    # ---- A6 (drill only)
    R(0, "A6", "Main idea", 1, "mainIdea", "Which sentence best states the main idea of the passage?",
      "Old buildings should be reused.",
      ["Every old building must be saved.", "New buildings are always unsafe.", "The mill should become a museum.", "Towns should build more brick mills."],
      "The author asks the town to make reuse a habit but admits that not every old building can be saved, so \"every\" goes too far."),
    R(0, "A6", "Detail", 1, "findingDetail", "According to the passage, why does the mill have tall windows?",
      "to let in daylight",
      ["to show the river", "to keep it cool", "to look like a church", "to save on bricks"],
      "The second paragraph says the tall windows were built to let in daylight before electric lights were common."),
    R(0, "A6", "Author's purpose", 2, "authorPurpose", "The third paragraph mainly shows that reusing a building:",
      "can waste less material",
      ["costs more than new work", "is how bricks are made", "always takes many trucks", "pleases most neighbors"],
      "It compares the broken brick and new materials of tearing down with the material and energy saved by repairing a sturdy old building."),
    R(0, "A6", "Tone", 2, None, "The author's attitude toward tearing down old buildings is best described as:",
      "wary but not opposed",
      ["angry and refusing all of it", "excited and strongly for it", "uninterested in the question", "confused about the facts"],
      "The author argues for reuse but admits some buildings are unsafe or too costly to repair, and asks only that the town consider reuse first."),
    R(0, "A6", "Supporting evidence", 3, "claimSupport", "Which detail best supports the idea that reused buildings are popular?",
      "They often become places people love.",
      ["Some old buildings are unsafe.", "Tearing down fills trucks with brick.", "The mill shows how people worked.", "A plaque cannot tell a story."],
      "The fourth paragraph says reused mills, fire stations and schools often become the places people love most. The other details support different points."),
]
