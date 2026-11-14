# Practice Test 2 (held out of the drills): three original passages, 40 questions.

P1 = {"id": "IELTSR-T2-P1", "title": "Passage 1: Messages Through the Pipes", "text": (
    "**A** In the second half of the nineteenth century, the telegraph could carry a message across a continent in minutes, yet the same message might take hours to cross the city at the other end. Telegraph offices were usually located in business districts, and the final stage of every journey depended on messenger boys on foot or on horse-drawn carts struggling through crowded streets. Businesses complained that a telegram from another country could reach the city faster than it could be carried the last mile to their door. As trade grew, so did the delay, and city authorities began to look for a faster way to move paper between buildings.\n\n"
    "**B** The answer they found was the pneumatic tube. The principle was simple: a cylinder, or carrier, containing documents is placed inside a sealed pipe, and air pressure behind it, or a partial vacuum in front of it, pushes it along. Engineers had experimented with the idea earlier in the century, but it became practical only when steam-driven pumps could produce a strong and steady flow of air. The pipes themselves were usually made of iron and laid in trenches beneath the pavement, joining stations that were often only a few kilometres apart. London, Berlin and Paris all built networks in the 1860s, and by the end of the century many other cities had followed.\n\n"
    "**C** A typical message passed through several stages. A clerk first rolled the paper and placed it in a leather or metal carrier, which was then loaded into the tube at a sending station. Pumps at a central engine house drove the carrier to a sorting office, where staff removed it, read the address and sent it on along a second line towards the station nearest its destination. From there a messenger completed the last short distance on foot. In Paris, where the system grew into one of the largest in the world, a letter sent this way could cross the city in an hour or two. Messages sent by tube were usually short notes rather than long letters, since a carrier held only a few sheets, and they cost more to send than ordinary post.\n\n"
    "**D** The tubes were not only a tool for the post office. Department stores used them to carry cash and receipts between sales counters and a central cash office, so that shop assistants never had to keep large sums of money at their tills. Stock exchanges relied on them to move orders between the trading floor and brokers' offices, and hospitals later adopted them to send samples to laboratories. Large libraries used similar systems to send requests for books from reading rooms to the stacks. In many of these buildings the tubes survived long after the city networks had closed.\n\n"
    "**E** Expansion brought difficulties. The tubes ran beneath streets that were constantly being dug up for gas, water and later electricity, and every repair risked damaging a pipe. Carriers sometimes jammed, and finding the blockage could mean opening the road at several points. In very cold weather, moisture inside the pipes could freeze and slow the carriers down. Running the pumps was expensive, and as traffic grew the networks needed more stations and more staff. Supporters argued that these costs were justified by speed, but by the early twentieth century a cheaper rival was spreading rapidly: the telephone.\n\n"
    "**F** The decline was gradual rather than sudden. Many systems were closed in the middle of the century, though some lasted much longer: the Paris network carried messages until 1984, and the system in Prague was still operating when floods damaged it in 2002. Today the tubes are often remembered as a curiosity, yet the basic idea has not disappeared. In some cities, sections of old tube still lie beneath the streets, long after the last carrier passed through them. Engineers proposing high-speed transport in low-pressure tubes have described their plans as heirs to the pneumatic post, though whether such schemes will ever carry passengers remains uncertain."
)}

P1_ITEMS = [
    HEAD(1, "B", "A simple principle made practical",
         ["The route of a single message", "The first message sent by tube", "Why messengers opposed the new tubes", "A slow end and a lasting idea"],
         "Paragraph B explains how air pressure moves a carrier through a sealed pipe and says the idea became practical once steam pumps could supply a steady flow of air."),
    HEAD(2, "C", "The route of a single message",
         ["Uses beyond the postal service", "A simple principle made practical", "Government control of the city networks", "Rising costs and practical problems"],
         "Paragraph C follows one message through each stage: carrier, sending station, sorting office, a second line and a messenger on foot."),
    HEAD(1, "D", "Uses beyond the postal service",
         ["The route of a single message", "Why messengers opposed the new tubes", "Rising costs and practical problems", "How the telephone was invented"],
         "Paragraph D lists department stores, stock exchanges and hospitals, all users outside the post office."),
    HEAD(2, "E", "Rising costs and practical problems",
         ["How the telephone was invented", "A slow end and a lasting idea", "Government control of the city networks", "Uses beyond the postal service"],
         "Paragraph E covers damaged pipes, jammed carriers and the cost of pumps and staff. The telephone appears only as a cheaper rival in the last sentence, not as the subject."),
    HEAD(2, "F", "A slow end and a lasting idea",
         ["Rising costs and practical problems", "The first message sent by tube", "Why messengers opposed the new tubes", "A simple principle made practical"],
         "Paragraph F says the decline was gradual, gives late closures, and ends with modern plans that call themselves heirs to the pneumatic post."),
    TF(1, "Telegraph offices were usually in business districts.", "T",
       "Paragraph A says telegraph offices were usually located in business districts."),
    TF(2, "Messenger boys earned more once the tubes were built.", "NG",
       "The passage mentions messenger boys in Paragraphs A and C but says nothing about their pay."),
    TF(2, "Department stores stopped using tubes when the city networks closed.", "F",
       "Paragraph D says that in many of these buildings the tubes survived long after the city networks had closed."),
    TF(2, "The telephone cost more to run than the pneumatic tube.", "F",
       "Paragraph E calls the telephone a cheaper rival, which contradicts the statement."),
    CZ(1, "Flow-chart completion", "Complete the flow chart. Choose ONE word from the list.\n\nClerk rolls the paper and puts it in a leather or metal [[1]] → it is loaded at a sending station → pumps drive it to a sorting office → it goes along a second line → a messenger takes it the last part of the way",
       "carrier", ["envelope", "basket", "drawer", "parcel"],
       "Paragraph C says the clerk placed the paper in a leather or metal carrier, which was then loaded into the tube."),
    CZ(2, "Flow-chart completion", "Complete the flow chart. Choose ONE word from the list.\n\nPaper placed in a carrier → loaded at a sending station → pumps at a central [[1]] house drive it to a sorting office → it goes along a second line → a messenger takes it the last part of the way",
       "engine", ["post", "power", "steam", "control"],
       "Paragraph C says the pumps were at a central engine house. Steam describes the pumps in Paragraph B, not the building."),
    CZ(1, "Flow-chart completion", "Complete the flow chart. Choose ONE word from the list.\n\nPaper placed in a carrier → loaded at a sending station → driven to a sorting office → staff read the [[1]] and send it along a second line → a messenger takes it the last part of the way",
       "address", ["message", "receipt", "order", "stamp"],
       "Paragraph C says staff at the sorting office removed the carrier, read the address and sent it on."),
    CZ(1, "Flow-chart completion", "Complete the flow chart. Choose ONE word from the list.\n\nPaper placed in a carrier → loaded at a sending station → driven to a sorting office → sent along a second line → a [[1]] completes the last short distance on foot",
       "messenger", ["clerk", "telegraphist", "driver", "cyclist"],
       "Paragraph C says a messenger completed the last short distance on foot. The clerk prepares the carrier at the start."),
]

P2 = {"id": "IELTSR-T2-P2", "title": "Passage 2: Guardians of the Coast", "text": (
    "**A** Along tropical and subtropical coastlines, where rivers meet the sea and the tide floods and drains twice a day, grow forests unlike any others. Mangroves are trees and shrubs that have adapted to life in salty, waterlogged mud that would kill most plants within days. They are found on the shores of more than a hundred countries, from the deltas of South Asia to the lagoons of West Africa and the Caribbean, yet for much of the twentieth century they were regarded as little more than wasteland: smelly, full of mosquitoes and in the way of development. In some places the forests form a narrow fringe along the shore; in others, especially in large river deltas, they cover wide areas of land that is flooded at high tide.\n\n"
    "**B** Their survival depends on a set of remarkable adaptations. Some species filter out most of the salt as water enters their roots; others absorb it and then excrete it through special glands on their leaves, which may be seen glittering with crystals. Because the mud contains almost no oxygen, many mangroves send up pencil-like roots that stick out of the ground and take in air at low tide, while others are supported by arching prop roots that hold the trunk above the water like the legs of a stool. Several species even produce seedlings that begin growing while still attached to the parent tree, then drop into the water and float until they lodge in suitable mud.\n\n"
    "**C** It is the tangle of roots that makes mangroves so valuable to people living behind them. When waves enter a mangrove forest, they lose energy as they pass between the trunks and roots, and their height falls with every metre travelled. The roots also trap mud carried in by the tide, and in some places this slowly raises the level of the land behind the forest. Field measurements suggest that a wide belt of mature forest can greatly reduce the height of ordinary storm waves before they reach the shore. Mangroves are not a complete defence: a very large storm surge can still sweep through them. But villages sheltered by healthy forest have often suffered less damage than neighbouring settlements on cleared coasts. For this reason, some engineers now recommend keeping or replanting mangroves in front of sea walls, so that the forest takes the first force of the waves.\n\n"
    "**D** The forests also help to slow climate change. Mangrove soils are waterlogged and low in oxygen, so dead leaves and roots decay very slowly and their carbon builds up in the mud over centuries. Scientists who study this \"blue carbon\" have found that, area for area, mangrove soils can hold far more carbon than many forests on dry land. When mangroves are cleared and the mud is dug out or left to dry, much of that stored carbon may be released into the atmosphere.\n\n"
    "**E** Despite these benefits, large areas of mangrove have been lost in recent decades. The forests have been cleared for coastal building, for rice fields and especially for ponds used to farm shrimp, many of which are abandoned after a few years when disease or pollution makes them unproductive. Cutting for timber and charcoal has thinned others. Coastal roads and sea walls can also cut mangroves off from the tides they need. Because the trees grow in a narrow strip between land and sea, even modest clearing can break a forest into fragments that no longer protect the shore.\n\n"
    "**F** Many governments and charities now plant mangroves, but early efforts taught hard lessons. In some projects, seedlings were planted on open mudflats that looked empty but lay too low and were covered by the tide for too long each day; almost all of them died. Ecologists now argue that the most successful restoration begins not with planting but with restoring the flow of water, for example by breaking through old pond walls, so that seeds carried by the tide can settle naturally where conditions suit them. Planting may still help, but only where mangroves grew before. Local communities are often closely involved in this work, since they are usually the first to notice when an area begins to recover."
)}

L6 = "ABCDEF"
P2_ITEMS = [
    MI(2, "a reason why some restoration projects failed", "F", L6,
       "Paragraph F says seedlings were planted on mudflats that lay too low and were covered by the tide for too long, so almost all of them died."),
    MI(2, "a description of how mangroves cope with a lack of oxygen in the mud", "B", L6,
       "Paragraph B says that because the mud has almost no oxygen, many mangroves send up pencil-like roots that take in air at low tide. Paragraph D mentions low oxygen only to explain slow decay."),
    MI(2, "an example of land use that is often given up after a short time", "E", L6,
       "Paragraph E says many shrimp ponds are abandoned after a few years when disease or pollution makes them unproductive."),
    MI(3, "a comparison between mangrove soils and forests on dry land", "D", L6,
       "Paragraph D says that, area for area, mangrove soils can hold far more carbon than many forests on dry land."),
    TF(1, "Mangroves were widely valued for most of the twentieth century.", "F",
       "Paragraph A says that for much of the twentieth century mangroves were regarded as little more than wasteland."),
    TF(1, "Some mangrove seedlings begin to grow before they leave the parent tree.", "T",
       "Paragraph B says several species produce seedlings that begin growing while still attached to the parent tree."),
    TF(3, "Mangroves cover a larger area in South Asia than in West Africa.", "NG",
       "Paragraph A names both regions as places where mangroves grow but does not compare the area in each."),
    TF(2, "Leaves and roots break down slowly in mangrove soil.", "T",
       "Paragraph D says dead leaves and roots decay very slowly because the soil is waterlogged and low in oxygen."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nSome mangroves get rid of salt through special glands on their [[1]], which may glitter with crystals.",
       "leaves", ["roots", "trunks", "seeds", "flowers"],
       "Paragraph B says some species excrete salt through special glands on their leaves. Other species filter it at the roots instead."),
    CZ(2, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nIn some species, arching [[1]] roots hold the trunk above the water like the legs of a stool.",
       "prop", ["pencil", "surface", "hollow", "floating"],
       "Paragraph B says arching prop roots support the trunk. The pencil-like roots stick out of the mud to take in air."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nWaves lose [[1]] as they pass between the trunks and roots of a mangrove forest.",
       "energy", ["salt", "water", "direction", "sand"],
       "Paragraph C says waves lose energy as they pass between the trunks and roots, so their height falls."),
    CZ(2, "Short-answer questions", "Answer the question. Choose ONE word from the list.\n\nWhich animals are farmed in the ponds that have replaced many mangrove forests? [[1]]",
       "shrimp", ["fish", "crabs", "oysters", "ducks"],
       "Paragraph E says the forests have been cleared especially for ponds used to farm shrimp."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nEcologists say the most successful restoration begins by restoring the flow of [[1]].",
       "water", ["seeds", "mud", "air", "nutrients"],
       "Paragraph F says restoration should begin with restoring the flow of water, for example by breaking old pond walls, so seeds can settle naturally."),
]

P3 = {"id": "IELTSR-T2-P3", "title": "Passage 3: Do Museums Still Need Objects?", "text": (
    "When a museum announces that it has created a precise digital copy of one of its treasures, the news is usually greeted with enthusiasm. High-resolution scanning can now record the surface of a sculpture to a fraction of a millimetre, and a visitor on the other side of the world can rotate it on a screen, zoom in on a chisel mark and read the curator's notes, all without buying a ticket. Some commentators have gone further and asked whether museums need to keep and display so many original objects at all. I want to argue that this question, though worth asking, rests on a misunderstanding of what museums are for.\n\n"
    "The case for the digital museum is not foolish, and it deserves a fair hearing. The design writer Lena Fogarty points out that most large museums display only a small fraction of their collections; the rest is kept in storage, where it is seen by almost no one. Digitising these hidden objects, she argues, would make them available to students and researchers who could never travel to see them. The historian Marcus Webb adds a further argument: many objects in Western museums were taken from other countries in circumstances that are now widely questioned, and high-quality copies could allow originals to be returned while the museum continues to tell their story. Both points seem to me entirely reasonable, and neither requires us to abandon the original object.\n\n"
    "Where the argument goes wrong is in assuming that a copy can do everything the original does. Some of what an object communicates can certainly be captured digitally: its shape, its colour and its decoration. But visitors consistently report that standing in front of a real object is a different experience from looking at an image of it. The museum educator Ruth Okafor, who has interviewed hundreds of visitors, finds that people describe a sense of connection with the past that they do not feel when looking at reproductions, even very good ones. She is cautious about explaining this feeling, but she notes that it is strongest when visitors know that the object in front of them was handled by the people who made and used it.\n\n"
    "Sceptics may reply that this is mere sentiment, a kind of superstition about authenticity. Perhaps it is. But sentiment is not a trivial matter in an institution whose purpose is to help people care about the past. A museum that offered only copies might inform, but I doubt that it would move its visitors in the same way, and a public that is not moved is unlikely to support the expensive work of conservation and research on which our knowledge of the past depends. Museums have always depended on the public to value what they hold, whether through ticket sales, donations or the taxes that pay for national collections.\n\n"
    "There is also a scholarly reason for keeping originals. Every copy records only what its makers thought to record. A scan made today captures the surface of an object, but it tells us nothing about the chemistry of its paint or the source of its metal, and it cannot answer questions that no one has yet thought to ask. No museum can predict which of those questions will matter in fifty years. Again and again, new techniques have drawn information from objects that were assumed to have given up all their secrets decades earlier. Webb himself accepts this point, and he does not suggest that originals should be destroyed, only that they need not always be on display.\n\n"
    "None of this is an argument against digitisation. On the contrary, I believe every museum should be scanning its collections as fast as funding allows. Copies can widen access, support research and preserve knowledge if an original is damaged. A good digital model can also let visitors examine the underside of a statue or the inside of a vessel, views that no gallery could safely offer. The mistake is to see copies and originals as competitors, when they are better understood as partners. The best digital collections send people to see the real thing, and the best galleries use digital tools to explain what visitors are looking at.\n\n"
    "The real threat to museums is not the scanner but the budget. Conservation is slow and expensive, and when funds are short it is tempting to believe that a digital record can stand in for the care of the object itself. It cannot. Digital files need care too: formats become obsolete, and storage must be paid for year after year. If we allow copies to become an excuse for neglecting originals, we may one day find that the copy is all we have left."
)}

NAMES2 = ["Lena Fogarty", "Marcus Webb", "Ruth Okafor"]
P3_ITEMS = [
    YN(2, "The suggestion that museums may not need originals is based on a mistaken idea of their purpose.", "Y",
       "The writer says the question rests on a misunderstanding of what museums are for."),
    YN(2, "Fogarty's argument about objects kept in storage is unreasonable.", "N",
       "After setting out Fogarty's and Webb's points, the writer says both seem entirely reasonable."),
    YN(3, "Visitors' feeling of connection with real objects is only a superstition.", "NG",
       "The writer raises the sceptics' view and answers only \"Perhaps it is\", then argues the feeling matters anyway. The writer neither agrees nor disagrees that it is a superstition."),
    YN(2, "Museums should slow down digitisation until conservation budgets improve.", "N",
       "The writer believes every museum should be scanning its collections as fast as funding allows."),
    YN(2, "Most museum visitors prefer digital displays to written labels.", "NG",
       "Labels are never mentioned, and the writer gives no view on which visitors prefer."),
    MC(2, "What does the writer say about the case for the digital museum?", "It deserves to be taken seriously",
       ["It is based on poor research", "It ignores the needs of students", "It is mainly about saving museums money"],
       "The second paragraph opens: the case for the digital museum is not foolish, and it deserves a fair hearing. It is in fact partly about helping students."),
    MC(2, "According to Okafor, when is visitors' sense of connection strongest?", "When they know its makers handled it",
       ["When the object is very old", "When they have seen a good copy first", "When a guide explains the object"],
       "Okafor notes the feeling is strongest when visitors know the object was handled by the people who made and used it."),
    MC(3, "What is the writer's main point in the fifth paragraph?", "A scan captures only part of an object",
       ["Scanning can damage the surface of objects", "Scans are too expensive for most museums", "Scans can show the chemistry of paint"],
       "The fifth paragraph says every copy records only what its makers thought to record, so a scan misses paint chemistry, metal sources and future questions."),
    MC(2, "What does the writer see as the real threat to museums?", "A lack of money for conservation",
       ["The spread of better and cheaper scanners", "Demands to return objects", "Falling numbers of visitors"],
       "The last paragraph says the real threat is not the scanner but the budget, because short funds tempt museums to let a digital record replace care of the object."),
    MF(2, "Which person argues that copies could allow objects to be returned to the countries they came from?", "Marcus Webb", NAMES2,
       "The historian Marcus Webb says high-quality copies could allow originals to be returned while the museum still tells their story."),
    MF(1, "Which person has interviewed hundreds of museum visitors?", "Ruth Okafor", NAMES2,
       "The museum educator Ruth Okafor has interviewed hundreds of visitors about how they feel in front of real objects."),
    SE(2, "Fogarty argues that digitising objects kept in storage would",
       "help people who cannot visit them",
       ["reduce the cost of storing them", "persuade museums to display more of them", "allow the originals to be sold"],
       "Fogarty says digitising hidden objects would make them available to students and researchers who could never travel to see them."),
    SE(3, "Webb accepts that original objects should",
       "be kept even if they are not displayed",
       ["always be returned to their countries of origin", "be shown beside their copies", "be scanned before they are sold"],
       "The fifth paragraph says Webb does not suggest originals should be destroyed, only that they need not always be on display."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nThe writer believes that copies and originals are better understood as [[1]] than as competitors.",
       "partners", ["rivals", "replacements", "records", "opposites"],
       "The sixth paragraph says the mistake is to see copies and originals as competitors when they are better understood as partners."),
]

PASSAGES = [(P1, P1_ITEMS), (P2, P2_ITEMS), (P3, P3_ITEMS)]
