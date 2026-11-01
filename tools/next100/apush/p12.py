# Periods 1 and 2 (1491-1607, 1607-1754). Original items and original practice sources.
# Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None)
# test 1 or 2 = practice-test item, 0 = drill only. Sets stay in authored order.

STIMULI = [
    {"id": "APUSH-T1-S01", "title": "A Spanish missionary's report to the Crown, 1540s (practice text)", "text": (
        "In the islands and on the mainland, the Spaniards who hold Indians in encomienda work them in the mines and the fields "
        "from dawn until night. They give them little food and no rest, and whole villages have died out. These people are Your "
        "Majesty's vassals and have souls to be saved. I beg that they be freed from such masters and taught the faith by gentle means, "
        "as the Church intends.")},
    {"id": "APUSH-T1-S02", "title": "A Virginia planter's letter to a London merchant, 1690s (practice text)", "text": (
        "Fewer servants come from England every year, and those who come expect land of their own when their terms end, though the "
        "best land near the rivers is already taken. Since the troubles in Bacon's time, many gentlemen here think it safer and cheaper "
        "in the end to buy Africans, who serve for life, as do their children. I have bought six this year and mean to plant more tobacco.")},
    {"id": "APUSH-T2-S01", "title": "A historian's interpretation (practice text)", "text": (
        "The exchange of plants, animals and germs between the hemispheres after 1492 reshaped both. Maize and potatoes from the "
        "Americas fed Europe's growing population, and horses brought by the Spanish transformed life on the Great Plains. Yet the "
        "heaviest consequence fell on the Americas, where smallpox, measles and other diseases killed a large majority of native "
        "people within a century of contact.")},
    {"id": "APUSH-T2-S02", "title": "A French missionary's account of New France, early 1700s (practice text)", "text": (
        "The French in Canada are few, and they live among the native nations as traders and allies. Our young men travel to the "
        "villages for furs, marry there and learn the languages, and the chiefs call the governor their father. The English, by "
        "contrast, come in great numbers, cut down the forests and fence the land for farms, so that the nations near them have no "
        "place left to hunt.")},
    {"id": "APUSH-D-S01", "title": "A Spanish officer's report from New Mexico, 1680 (practice text)", "text": (
        "In August of this year the Pueblo Indians of every town rose together on the same day. They burned the churches, killed "
        "many of the friars and settlers, and drove the rest of us south to El Paso. Their leaders say they will no longer give up "
        "their old ceremonies or labor for the Spaniards, and they have returned to the ways of their ancestors.")},
    {"id": "APUSH-D-S02", "title": "A Massachusetts minister's sermon, 1640s (practice text)", "text": (
        "We have entered into a covenant with God to build a commonwealth where His laws are honored. If we keep it, He will bless "
        "us; if we break it, all the world will see our shame. Let every family read the Scriptures, let every town keep a school, "
        "and let no man live idle or disturb the peace of the church with new opinions.")},
    {"id": "APUSH-D-S03", "title": "A historian's interpretation (practice text)", "text": (
        "Before 1492, North America held hundreds of societies, each shaped by its environment. In the arid Southwest, peoples dug "
        "irrigation ditches to grow maize and built towns of stone and adobe. In the Northeast, villages mixed farming with hunting "
        "and fishing. On the Northwest coast, abundant salmon and forests supported large permanent villages with little farming at all.")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, CX,
      "The conditions described in the report were most directly a result of",
      ["Spanish efforts to profit from forced native labor", "competition between Spain and France over the fur trade", "the spread of the Protestant Reformation into Spain", "English settlement along the Chesapeake Bay"],
      "The encomienda system gave Spanish colonists the right to demand labor and tribute from native people, and it was used to work mines and plantations for profit. French fur trading and English settlement came later and elsewhere.",
      stim="APUSH-T1-S01"),
    Q(1, 2, SS,
      "The missionary's argument most directly reflects",
      ["debates in Spain over the moral treatment of native peoples", "a Spanish policy of avoiding contact with native societies", "support for replacing Catholic missions with trading posts", "the view that land should be bought from native nations by treaty"],
      "Some Spanish clergy argued that native people were subjects of the Crown with souls to save and should not be brutalized, which fed a long debate in Spain over colonial labor. Spain sought contact and conversion, not separation.",
      stim="APUSH-T1-S01"),
    Q(1, 3, CA,
      "Which development was most directly a response to the decline in native population described in the report?",
      ["Growing imports of enslaved Africans to Spanish colonies", "The founding of Jamestown as an English colony", "The rise of indentured servitude among New England fishing families", "The end of the casta system in New Spain"],
      "As disease and overwork killed native workers, Spanish colonists turned increasingly to enslaved Africans for labor in the Caribbean and elsewhere. The casta system of racial ranks lasted through the colonial era.",
      stim="APUSH-T1-S01"),
    Q(1, 2, CA,
      "Which development most directly explains the shift in labor described in the letter?",
      ["Bacon's Rebellion and fewer English servants", "The Great Awakening's challenge to the authority of the Anglican church", "Parliament's passage of the Navigation Acts", "The end of the Atlantic slave trade"],
      "After Bacon's Rebellion in 1676, in which poor freedmen joined an uprising, and as fewer English servants arrived, Chesapeake planters relied more on enslaved Africans. The Navigation Acts regulated trade, not labor.",
      stim="APUSH-T1-S02"),
    Q(1, 2, DP,
      "The letter best illustrates which trend in the Chesapeake colonies in the late 1600s?",
      ["Slavery becoming hereditary and based on race", "The growth of an economy built on small farms and fishing", "The decline of tobacco as the region's main export", "The spread of religious toleration laws to all colonies"],
      "The planter notes that Africans serve for life and so do their children: colonial laws in this era made slavery hereditary and tied it to race. Small farms and fishing describe New England.",
      stim="APUSH-T1-S02"),
    Q(1, 2, CO,
      "Compared with the Chesapeake colonies, the New England colonies of the same era generally",
      ["relied more on family farms, trade and free labor", "grew more tobacco for export to England", "depended more on enslaved labor in plantation agriculture", "had fewer towns, schools and churches"],
      "New England's colder climate and rocky soil favored family farms, fishing, shipbuilding and trade, and its towns were organized around churches and schools. Tobacco and plantation slavery defined the Chesapeake.",
      stim="APUSH-T1-S02"),
    Q(1, 3, SS,
      "A historian would find the letter most useful as evidence of",
      ["planters' reasons for their labor choices", "the views of enslaved Africans about plantation work", "official British policy toward the colonies", "living conditions in West African societies"],
      "The letter shows a planter's reasons for buying enslaved Africans, including the memory of Bacon's Rebellion. It cannot show what enslaved people themselves thought, since it is written by an enslaver.",
      stim="APUSH-T1-S02"),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, CE,
      "Which piece of evidence would best support the historian's claim about the Great Plains?",
      ["Many Plains peoples hunted bison on horseback", "Plains peoples gave up hunting to grow sugar cane for export", "Spanish missions replaced most Plains villages by 1550", "The Plains became the center of English settlement"],
      "Horses spread north from Spanish colonies, and many Plains nations, such as the Comanche and Lakota, built mounted bison-hunting economies around them. Sugar cane was a Caribbean plantation crop.",
      stim="APUSH-T2-S01"),
    Q(2, 1, CA,
      "The main reason disease spread so devastatingly in the Americas after 1492 was that",
      ["native peoples had no immunity to Eurasian diseases", "Europeans deliberately avoided contact with native towns and trade routes", "native societies had no agriculture to feed the sick", "Spanish law required native people to live in cities"],
      "Smallpox, measles and influenza had circulated in Eurasia for centuries but were new to the Americas, so native populations had no acquired immunity. Many native societies farmed extensively.",
      stim="APUSH-T2-S01"),
    Q(2, 2, DP,
      "Which effect of the exchange on Europe is most consistent with the excerpt?",
      ["New American crops helped support population growth", "European diets became far less varied as American crops replaced wheat", "European rulers lost interest in overseas colonies", "Europe adopted the horse from the Americas"],
      "The historian notes that maize and potatoes from the Americas fed Europe's growing population. The horse moved the other way, from Europe to the Americas.",
      stim="APUSH-T2-S01"),
    Q(2, 2, CO,
      "The differences the missionary describes are best explained by",
      ["French fur trading and English farming", "the French goal of building large tobacco plantations", "English laws forbidding colonists to clear forest land", "the absence of Catholic missionaries in New France"],
      "New France had few settlers and depended on the fur trade, which required native partners, while English colonies drew many settlers who wanted land to farm. Catholic missionaries were active in New France.",
      stim="APUSH-T2-S02"),
    Q(2, 2, SS,
      "Which group would most likely have shared the missionary's view of the English colonists?",
      ["Native nations losing land to English farms", "Puritan leaders in Massachusetts Bay", "Members of the Virginia House of Burgesses seeking western land grants", "Investors in the Virginia Company of London"],
      "Native nations near the English colonies saw forests cleared and land fenced, which ended hunting there. Puritan leaders, burgesses and investors all supported English expansion.",
      stim="APUSH-T2-S02"),
    Q(2, 3, CA,
      "The relationships described in the excerpt most directly contributed to",
      ["French alliances with native nations against Britain", "the end of the fur trade in North America", "the rapid growth of French cities on the Atlantic coast", "a decline of Spanish missions in Florida and New Mexico"],
      "Trade, marriage and diplomacy tied many native nations to the French, and they fought alongside France in the imperial wars, including the French and Indian War. The fur trade continued long afterward.",
      stim="APUSH-T2-S02"),
    Q(2, 2, SS,
      "The missionary's purpose in contrasting the French and the English was most likely to",
      ["show French officials the value of native allies", "recruit English farmers to settle in Canada", "argue that France should give up North America", "describe Spanish methods of converting native peoples in the missions of Florida"],
      "By stressing how the French live among native nations as allies while the English drive them away, the writer argues that France's approach strengthens its position. Nothing suggests he wants France to leave.",
      stim="APUSH-T2-S02"),
    # ---------------- Drill only ----------------
    Q(0, 1, CA,
      "The uprising described in the report was most directly caused by",
      ["Spanish suppression of Pueblo religion", "English colonists seizing Pueblo farmland", "French traders selling guns to the Pueblos", "a smallpox epidemic carried by Dutch sailors"],
      "Spanish friars banned Pueblo ceremonies and colonists demanded labor and tribute, and the rebels said they would return to their own ways. There were no English settlers in New Mexico.",
      stim="APUSH-D-S01"),
    Q(0, 2, CC,
      "When the Spanish returned to New Mexico in the 1690s, they",
      ["tolerated more Pueblo customs", "gave up all claims north of Mexico permanently", "joined the Pueblos with the Iroquois Confederacy", "handed the region to England by treaty"],
      "After the revolt, returning Spanish authorities did not restore the encomienda and tolerated more Pueblo religious practice, a shift toward accommodation. Spain kept New Mexico until Mexican independence.",
      stim="APUSH-D-S01"),
    Q(0, 2, CO,
      "The revolt is most similar in cause to which conflict in the English colonies?",
      ["Metacom's War in New England", "The Salem witch trials of 1692", "The Glorious Revolution in England", "The Stono Rebellion of enslaved people in South Carolina"],
      "Metacom's War (King Philip's War, 1675 to 1676) was a native uprising against colonists who took land and pressed their ways on native peoples, much like the Pueblo Revolt. The Stono Rebellion was a revolt of enslaved Africans.",
      stim="APUSH-D-S01"),
    Q(0, 1, DP,
      "The sermon best reflects",
      ["the Puritan goal of a godly community bound by covenant", "the Quaker belief in an inner light in every person", "the Chesapeake focus on profit from tobacco", "Enlightenment arguments for separating church and state"],
      "Puritans saw their colony as a covenant community whose success depended on obeying God's laws. Quakers stressed an inner light and tolerance; Enlightenment thinkers later argued for separating church and state.",
      stim="APUSH-D-S02"),
    Q(0, 1, CA,
      "Which practice in New England followed most directly from ideas like those in the sermon?",
      ["Town schools teaching children to read the Bible", "Large plantations worked by enslaved laborers", "Royal governors appointing the minister of every Massachusetts town", "Laws guaranteeing full religious freedom"],
      "Because Puritans believed everyone should read Scripture, Massachusetts required towns to keep schools. Puritan colonies did not grant religious freedom; they punished dissenters.",
      stim="APUSH-D-S02"),
    Q(0, 2, CC,
      "Which development most directly challenged the authority of the minister in the sermon?",
      ["The dissent of Roger Williams and Anne Hutchinson", "The founding of Harvard College", "The arrival of the Great Migration of Puritan families", "The growth of town meetings"],
      "Roger Williams and Anne Hutchinson questioned the Puritan leaders' authority over conscience and were banished, the kind of new opinions the sermon warns against. Harvard and the Great Migration strengthened Puritan New England.",
      stim="APUSH-D-S02"),
    Q(0, 3, CC,
      "A century later, the authority of established ministers like this one was weakened most by",
      ["the First Great Awakening's preachers", "the Albany Plan of Union", "the Proclamation of 1763", "the passage of the Navigation Acts"],
      "In the 1730s and 1740s, itinerant revivalists such as George Whitefield urged a personal, emotional faith and split many congregations, undercutting settled ministers. The Albany Plan and Proclamation were political.",
      stim="APUSH-D-S02"),
    Q(0, 1, CE,
      "The excerpt best supports which claim?",
      ["Native societies adapted to their environments", "Every native society depended mainly on hunting", "Maize was unknown north of Mexico before 1492", "Most native societies were nomadic before 1492"],
      "The historian shows irrigation farming in the Southwest, mixed farming in the Northeast and fishing villages on the Northwest coast, each suited to its region. Southwest peoples grew maize, so maize was known north of Mexico.",
      stim="APUSH-D-S03"),
    Q(0, 2, CA,
      "The spread of maize cultivation into the Southwest most directly encouraged",
      ["irrigated, settled towns", "the domestication of the horse", "trade with European merchants", "a shift to herding cattle"],
      "Maize farming in a dry climate required irrigation and supported permanent towns such as those of the ancestral Pueblo peoples. Horses and cattle arrived only with the Spanish.",
      stim="APUSH-D-S03"),
    Q(0, 3, CE,
      "The description of the Northwest coast challenges which assumption?",
      ["That permanent villages required farming", "That fishing mattered to coastal peoples", "That native peoples traded with their neighbors along the coast", "That Southwest peoples grew maize"],
      "Northwest coast peoples built large permanent villages on salmon and forest resources with little agriculture, so settled life did not always depend on farming.",
      stim="APUSH-D-S03"),
    Q(0, 2, DP,
      "England's Navigation Acts of the later 1600s were intended mainly to",
      ["keep colonial trade within the empire", "encourage colonists to trade freely with Spain", "raise revenue to pay for the Seven Years' War", "end the Atlantic slave trade"],
      "Mercantilist laws required certain colonial goods to be shipped to England on English or colonial ships, so the empire kept the profits. The Seven Years' War came much later, in the 1750s and 1760s."),
    Q(0, 1, DP,
      "The Middle Passage refers to",
      ["the forced voyage of captive Africans to the Americas", "the overland route from Missouri to Oregon", "the canoe route of French fur traders along the Great Lakes", "the sea lane between England and New England"],
      "The Middle Passage was the middle leg of the Atlantic trade, in which captive Africans were shipped in brutal conditions to the Americas, and many died on the way."),
    Q(0, 2, CO,
      "Which feature most distinguished the Middle Colonies, such as Pennsylvania and New York?",
      ["Diverse settlers and grain-exporting farms", "A single established church in every colony", "An economy built on rice and indigo plantations", "Very few towns or seaports"],
      "Settlers from many European backgrounds and faiths lived in the Middle Colonies, which exported wheat and flour through Philadelphia and New York. Rice and indigo were Lower South crops."),
]
