FAMILIES = [
(['Roots','Stem','Leaves','Flowers'],[
('Which plant parts usually absorb water from soil and help anchor the plant?','Roots absorb water and help hold a plant in the soil.'),
('Which main plant part supports the leaves and provides a route for water moving upward from the roots?','The stem supports above-ground parts and carries water.'),
('In a typical green plant, which broad green parts capture sunlight for making food?','Leaves are the main sites where green plants use light to make food.'),
('On a flowering plant, which structures usually contain petals and are involved in forming seeds?','Flowers contain reproductive structures that can lead to seed formation.')]),
(['Evaporation','Condensation','Freezing','Melting'],[
('A shallow puddle becomes smaller on a dry sunny day without draining away. Liquid water enters the air as vapour. What is this change?','Evaporation changes liquid water to water vapour.'),
('Water vapour in the air forms droplets on the outside of a cold glass. What is this change?','Cooling water vapour into liquid droplets is condensation.'),
('Liquid water is cooled until it becomes solid ice. What is this change?','The change from liquid to solid is freezing.'),
('An ice cube warms and becomes liquid water. What is this change?','The change from solid ice to liquid water is melting.')]),
(['A thermometer','A balance','A clock','A measuring jug'],[
('Which tool should a pupil use to compare the temperatures of two water samples?','A thermometer measures temperature.'),
('Which tool compares the masses of two packets of seeds?','A balance compares mass.'),
('Which tool helps record how long a journey takes?','A clock provides times from which duration can be found.'),
('Which tool with volume markings can measure 300 mL of water?','A measuring jug measures liquid volume using its scale.')]),
(['A library','A post office','A health centre','A bank'],[
('A child wants to borrow a storybook from a community collection. Which institution is most directly suited to this?','A library lends reading materials.'),
('A family wants to send a letter through the postal service. Which institution handles that service?','A post office accepts and distributes mail.'),
('A community needs a place where trained staff provide basic medical care. Which institution serves this role?','A health centre provides healthcare services.'),
('An adult wants to deposit savings in an account. Which institution ordinarily provides this service?','A bank accepts account deposits.')]),
(['Reusing an object','Recycling a material','Composting plant waste','Collecting rainwater'],[
('An empty food jar is cleaned and used to store pencils. Which practice is illustrated?','The same object is used again for a new purpose.'),
('Used paper is processed into pulp to make new paper. Which practice is illustrated?','The material is processed into a new product, which is recycling.'),
('Dry leaves and vegetable scraps are allowed to break down into material for the garden. Which practice is illustrated?','Composting turns suitable organic waste into a soil amendment.'),
('A roof channel directs rain into a storage tank for watering plants. Which practice is illustrated?','Rainwater is being collected for later use.')]),
(['It lets light pass through','It takes up water','It is attracted by a magnet','It dissolves in water'],[
('A pupil can clearly see printed words through a clean glass sheet. What property is shown?','Seeing the words through the sheet shows that light passes through it.'),
('A dry cloth becomes wet after touching a spill. What property is shown?','The cloth takes up liquid by absorption.'),
('An iron nail moves toward a nearby magnet. What property is shown?','The observed movement shows magnetic attraction.'),
('After stirring sugar into water, the grains are no longer visible, but the sugar remains in the solution. What property is shown?','Sugar dissolves rather than simply remaining as visible grains.')]),
(['More water was supplied','More light was supplied','More space was supplied','More warmth was supplied'],[
('Two similar seedlings have equal light, warmth and pot size. One receives 20 mL of water daily; the other receives 40 mL. What condition differs for the second seedling?','Only the amount of water is changed.'),
('Two similar seedlings receive equal water, warmth and soil. One is kept under a grow light for longer each day. What condition increases for that seedling?','The duration of light exposure increases.'),
('A root-bound seedling is moved to a larger pot while water, light and temperature stay the same. What is increased?','A larger pot gives the roots more growing space.'),
('Two equal trays of damp seeds are kept in the same light. One tray is placed in a warmer room. What condition increases for that tray?','The environmental temperature, or warmth, increases.')]),
(['Floating','Sinking','Dissolving','Absorbing'],[
('A dry wooden block remains at the surface when gently placed in water. What is it doing?','Remaining at the water surface is floating.'),
('A stone drops to the bottom of a bowl of water. What is it doing?','Moving below the surface to the bottom is sinking.'),
('Salt crystals spread through water as a solution when stirred. What process is occurring?','The salt is dissolving in the water.'),
('A sponge takes water into its small spaces when placed in a spill. What process is occurring?','Taking up water is absorption.')]),
(['A source of food','A source of shelter','A means of seed dispersal','A means of pollination'],[
('A cow eats grass growing in a field. What does the grass provide to the cow?','The grass is food for the grazing animal.'),
('A bird rests inside a hollow part of a tree during a storm. What does the hollow provide?','The hollow protects the bird as shelter.'),
('A hooked seed catches on an animal\'s fur and is carried to another place. What role does the animal play?','Carrying a seed away helps disperse it.'),
('A bee carries pollen from one flower to another. What role does the bee play?','Moving pollen between flowers contributes to pollination.')]),
(['To compare amounts fairly','To record change over time','To group similar observations','To check a repeated result'],[
('A class measures water in two containers using the same marked cup for both. Why is using the same unit useful?','A shared unit makes the amounts directly comparable.'),
('A pupil marks a plant\'s height every Monday on a chart. What is the main purpose of these dated measurements?','Repeated dated observations show growth over time.'),
('A class sorts collected leaves into piles with smooth edges and toothed edges. What is the main purpose?','Grouping by an observable feature helps compare similarities and differences.'),
('A pupil repeats a simple floating test three times with the same object and conditions. What is the main purpose?','Repeating the test checks whether the observed result is consistent.')]),
]
ITEMS=[]
for options,entries in FAMILIES:
    for k,(stem,why) in enumerate(entries):ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))

# Indian post offices also accept savings; keep the bank item unambiguous.
stem, options, why = ITEMS[15]
ITEMS[15] = (stem, ["A fire station" if option == "A post office" else option for option in options], why)
