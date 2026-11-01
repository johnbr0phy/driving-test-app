# Unit 4 (c. 1450 to c. 1750): Transoceanic Interconnections. Original items and original practice sources.

STIMULI = [
    {"id": "APWORLD-T1-S06", "title": "A Portuguese captain's report to his king, 1510s (practice text)", "text": (
        "We found these seas full of ships, Arab, Gujarati and Chinese, trading in pepper, cloth and spices as their fathers "
        "did. They have no fleet that can stand against our guns. We have taken the port of Goa and built a fortress there, and "
        "no ship may now sail these waters without a pass from our captains. Those that refuse are seized, and the duties we "
        "collect will pay for the fleet many times over.")},
    {"id": "APWORLD-T1-S07", "title": "A Chinese scholar's essay on silver, 1630s (practice text)", "text": (
        "Silver now pours into our ports from the ships of the foreigners at Luzon, who bring it across the great ocean from "
        "their mines in lands far to the east. The court demands that the land tax be paid in silver, so the farmer must sell his grain for coin. "
        "When the ships fail to come, silver grows dear, and the farmer must sell twice as much grain to pay the same tax.")},
    {"id": "APWORLD-T2-S06", "title": "Estimated number of enslaved Africans carried across the Atlantic, by period (rounded)", "text": (
        "| Period | Enslaved Africans embarked |\n|---|---|\n| 1501-1600 | 0.3 million |\n| 1601-1700 | 1.9 million |\n"
        "| 1701-1800 | 6.5 million |\n| 1801-1866 | 3.9 million |\n\n"
        "Note: estimates of people put on ships in Africa. Many died during the voyage.")},
    {"id": "APWORLD-T2-S07", "title": "Orders from a Japanese shogun's council to the governor of a port, 1640s (practice text)", "text": (
        "The Portuguese ships are not to be received again; their priests stirred up the peasants of the south to rebellion, and "
        "every household in the domains must now show each year, at its Buddhist temple, that it holds no part in their teaching. "
        "Our own people are not to cross the sea, and none who has gone abroad is to be let back. The Dutch, who bring no priests, "
        "may keep their trading house on the small island in the harbor, and Chinese junks may still come, both under the watch "
        "of the governor.")},
    {"id": "APWORLD-D-S07", "title": "A historian's interpretation (practice text)", "text": (
        "The crops that crossed the oceans after 1500 changed diets far from the Americas. Maize and cassava became staple foods "
        "across much of West and Central Africa, and sweet potatoes and maize could be grown on Chinese hillsides where rice would "
        "not grow. In the other direction, sugar cane, carried from the Old World to the Caribbean and Brazil, became the crop "
        "around which whole colonial societies were built.")},
    {"id": "APWORLD-D-S08", "title": "A Dutch merchant's report to the directors of his company, 1620s (practice text)", "text": (
        "The company now holds the islands where the nutmeg grows, and no other nation may buy a single nut except from us. We have "
        "built our headquarters at Batavia, where the ships gather before the voyage home. The shareholders in Amsterdam may expect "
        "a handsome return, for we fix the price of spices in Europe as we please.")},
    {"id": "APWORLD-D-S09", "title": "A planter's letter from a Caribbean sugar island, 1730s (practice text)", "text": (
        "We must buy new Africans every year, for the work of the cane fields and the boiling houses wears them out faster than "
        "children are born to replace them. Some run off to the mountains, where the free communities of runaways take them in. "
        "These people have beaten our soldiers more than once, and the governor now talks of a treaty with them.")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, DP,
      "The captain's report best illustrates the Portuguese effort to",
      ["control Indian Ocean trade by force at sea", "settle large farming colonies in India", "convert the Mughal emperors to Christianity", "end trade between Gujarat and China"],
      "The Portuguese did not build a large territorial empire in Asia; they seized ports such as Goa and forced ships to buy passes, taxing trade they could not otherwise dominate.",
      stim="APWORLD-T1-S06"),
    Q(1, 2, CC,
      "The captain's description of ships already trading in the region shows that",
      ["Europeans entered a trade network that already existed", "the Indian Ocean had no trade before the Portuguese came", "Chinese merchants had stopped sailing by 1500", "Europeans brought spices to Asia for the first time"],
      "Gujarati, Arab, Persian and Chinese merchants had traded across the Indian Ocean for centuries; the Portuguese joined and tried to tax that network rather than creating it.",
      stim="APWORLD-T1-S06"),
    Q(1, 2, CA,
      "Which development made the voyages described in the report possible?",
      ["New ships and navigation tools such as the caravel", "The invention of the steamship", "The opening of a canal across Egypt linking the Mediterranean and the Red Sea", "Mongol maps of the Atlantic"],
      "Portuguese sailors used ships such as the caravel and tools such as the astrolabe and better maps, some of them learned from Islamic and Chinese sources, to reach Asia around Africa.",
      stim="APWORLD-T1-S06"),
    Q(1, 3, CO,
      "The Portuguese approach described in the report differed most from Spanish rule in the Americas in that the Portuguese in Asia",
      ["held fortified ports instead of large inland territories", "relied on forced native labor in silver mines", "converted most of the local population to Christianity by force", "settled large numbers of European farmers"],
      "In Asia the Portuguese built a trading-post empire of fortified ports, while the Spanish conquered large populations and lands in the Americas and used forced labor in mines.",
      stim="APWORLD-T1-S06"),
    Q(1, 1, CX,
      "The silver described in the essay came mainly from",
      ["mines in Spanish America, carried by way of Manila", "mines in Japan, carried by Dutch ships through Nagasaki", "gold fields in West Africa", "mines in England"],
      "Silver from Potosi and Mexico crossed the Pacific on the Manila galleons, and Spanish traders in the Philippines (Luzon) exchanged it for Chinese silk and porcelain.",
      stim="APWORLD-T1-S07"),
    Q(1, 2, CA,
      "Which Chinese policy most directly increased demand for the silver described in the essay?",
      ["A requirement that taxes be paid in silver", "A ban on all foreign trade", "The printing of paper money in every province", "A tax on imports of silk"],
      "Ming reforms in the late 1500s, often called the Single Whip, combined taxes and required them in silver, so China drew in silver from Japan and the Americas.",
      stim="APWORLD-T1-S07"),
    Q(1, 3, CA,
      "The scholar's complaint about falling supplies of silver best illustrates",
      ["how global trade could cause hardship far from its source", "the end of the Manila galleon trade across the Pacific in the 1630s", "China's refusal to trade with Europeans", "the rising value of grain in China compared with silver"],
      "When fewer silver ships arrived, silver grew dear and farmers had to sell more grain to pay taxes, showing how the Pacific silver trade tied Chinese farmers to events across the ocean.",
      stim="APWORLD-T1-S07"),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, CA,
      "Which development most directly explains the rise shown in the table between 1601 and 1800?",
      ["The spread of sugar plantations in the Americas", "The end of slavery in the British Empire", "The decline of the Mughal Empire in northern India", "Spanish conquest of the Philippines"],
      "Sugar plantations in Brazil and the Caribbean, which killed workers quickly and needed ever more labor, drove the growth of the Atlantic slave trade.",
      stim="APWORLD-T2-S06"),
    Q(2, 2, CA,
      "The smaller total in the last row of the table is best explained by",
      ["bans on the slave trade by Britain and other states", "the end of plantation farming in both Brazil and Cuba", "a sharp drop in world demand for sugar", "the European conquest of Africa's interior"],
      "Britain banned its slave trade in 1807 and its navy patrolled against others, and other states followed. Brazil and Cuba still bought captives until 1850 and the 1860s, so the trade shrank but did not end at once; the last row also covers only 66 years.",
      stim="APWORLD-T2-S06"),
    Q(2, 2, CA,
      "The trend in the table most directly contributed to which change in West Africa?",
      ["Fewer men than women in some regions", "The spread of Christianity across the Sahel", "The rise of large cities based on manufacturing", "The decline of every African state"],
      "Slave traders took more men than women, leaving some West African regions with fewer working-age men. Some states, such as Dahomey and Asante, grew more powerful in the trade.",
      stim="APWORLD-T2-S06"),
    Q(2, 3, CE,
      "Which piece of evidence would best support the note under the table?",
      ["Records of deaths on board slave ships", "Census counts of free people in Europe", "Prices of sugar in London", "Lists of African rulers who traded with Europeans"],
      "The note says many people died on the voyage; ship records of deaths during the Middle Passage would show it. Sugar prices and rulers' names say nothing about deaths at sea.",
      stim="APWORLD-T2-S06"),
    Q(2, 1, DP,
      "The orders best illustrate the Tokugawa shogunate's effort to",
      ["limit foreign influence while keeping some trade", "expand Japanese trade and settlement across the Pacific", "convert Japan to Christianity", "end all contact with China"],
      "Tokugawa rulers banned Christianity and travel abroad but let the Dutch, and Chinese merchants, trade under control at Nagasaki. Japan did not cut all contact.",
      stim="APWORLD-T2-S07"),
    Q(2, 2, CA,
      "The council's measures against the foreign priests' teaching were most likely a response to",
      ["fears that Christian converts would be disloyal", "the spread of Buddhism from Korea", "a Spanish invasion of Kyoto", "Dutch missionaries preaching in the Japanese countryside"],
      "The shogunate saw Christian converts, and the Spanish and Portuguese missionaries behind them, as a threat to its control, especially after the Shimabara revolt of 1637 and 1638, in which many rebels were Christian. The Dutch did not preach.",
      stim="APWORLD-T2-S07"),
    Q(2, 3, CO,
      "The policy in the orders was most similar to which policy of the same era?",
      ["Chinese limits on where Europeans could trade", "Ottoman grants of trading rights to all Europeans", "Spanish encouragement of foreign settlers in Mexico", "Mughal welcome of Jesuit missionaries at court"],
      "Ming and later Qing rulers also controlled foreign trade, eventually confining Europeans to Canton. The Mughal court welcomed Jesuits, which is the opposite of the orders.",
      stim="APWORLD-T2-S07"),
    # ---------------- Drill only ----------------
    Q(0, 1, CA,
      "According to the historian, crops from the Americas most directly led to",
      ["new staple foods in Africa and China", "the end of rice farming in China", "a fall in sugar production in Brazil", "the spread of wheat to the Caribbean"],
      "Maize, cassava and sweet potatoes became staples in Africa and China, often grown on land unsuited to older crops. Sugar production in Brazil grew.",
      stim="APWORLD-D-S07"),
    Q(0, 2, CA,
      "The new crops described by the historian most likely contributed to",
      ["population growth in China in the 1700s", "famine in China in the 1700s", "the collapse of the Qing dynasty in 1700", "a decline in trade between China and Southeast Asia"],
      "Hardy American crops let farmers use hills and poor soil, helping China's population grow rapidly under the Qing in the 1700s.",
      stim="APWORLD-D-S07"),
    Q(0, 2, CX,
      "The historian's last sentence refers to societies built around",
      ["plantations worked by enslaved Africans", "small family farms in Europe", "fur trading posts in Canada and the Great Lakes", "silver mines in Japan"],
      "Sugar cane needed heavy labor; in the Caribbean and Brazil it was grown on plantations worked mainly by enslaved Africans.",
      stim="APWORLD-D-S07"),
    Q(0, 3, DP,
      "The movement of plants, animals and diseases that the historian describes is called",
      ["the Columbian Exchange", "the Silk Roads", "the Commercial Revolution", "the Green Revolution"],
      "The Columbian Exchange is the transfer of crops, animals, people and diseases between the hemispheres after 1492. The Green Revolution was a 1900s farming change.",
      stim="APWORLD-D-S07"),
    Q(0, 1, DP,
      "The company described in the report is an example of",
      ["a joint-stock company", "a craft guild", "a Mongol trading partnership", "a state-run mine"],
      "The Dutch East India Company sold shares to investors who shared the risks and profits of long voyages, the joint-stock model also used by the English East India Company.",
      stim="APWORLD-D-S08"),
    Q(0, 2, CA,
      "The merchant's claim that the company could fix the price of spices rested on",
      ["its monopoly over the islands that grew them", "a treaty signed with the Mughal emperor in Delhi", "the ban on spices in Europe", "control of the Silk Roads"],
      "By seizing the Banda Islands, the only source of nutmeg, the company could control supply and set prices in Europe.",
      stim="APWORLD-D-S08"),
    Q(0, 2, CO,
      "The Dutch company described in the report was most similar to which other organization?",
      ["The English East India Company", "The Hanseatic League of the 1300s", "The Ottoman janissary corps", "The Jesuit order"],
      "The English East India Company was also a chartered joint-stock company with its own ships, forts and soldiers. The janissaries and Jesuits were not trading companies.",
      stim="APWORLD-D-S08"),
    Q(0, 3, SS,
      "The intended audience of the report helps explain why the merchant stresses",
      ["the profits the shareholders can expect", "the suffering of the people of the islands", "the history of the spice trade before 1500", "the religious beliefs of local rulers"],
      "The report is written to the company's directors, who answered to shareholders, so it emphasizes control of supply and expected returns.",
      stim="APWORLD-D-S08"),
    Q(0, 2, DP,
      "The planter's letter suggests that sugar plantations in the Caribbean",
      ["had death rates so high that planters relied on new imports", "used mostly European indentured workers rather than Africans by the 1730s", "grew their workforce mainly through births", "depended on Native American labor by the 1730s"],
      "Brutal work in the cane fields and boiling houses killed enslaved people faster than births replaced them, so planters kept buying new captives from Africa.",
      stim="APWORLD-D-S09"),
    Q(0, 2, DP,
      "The free communities of runaways described in the letter are known as",
      ["maroon communities", "encomiendas", "missions", "trading factories"],
      "Maroons were people who escaped slavery and built free communities in mountains and forests, as in Jamaica, Suriname and Brazil.",
      stim="APWORLD-D-S09"),
    Q(0, 3, CE,
      "The planter's mention of a treaty is best used as evidence that",
      ["resistance could force colonial governments to negotiate", "colonial governments had no soldiers in the Caribbean", "most enslaved people on the island had won their freedom by the 1730s", "planters welcomed the runaways' communities"],
      "Jamaican maroons fought British troops to a standstill and won treaties in 1739, showing that resistance could force concessions. Most enslaved people remained enslaved.",
      stim="APWORLD-D-S09"),
    Q(0, 2, DP,
      "The Treaty of Tordesillas of 1494",
      ["divided newly found lands between Spain and Portugal", "ended the Hundred Years' War", "opened all of China to European trade and missionaries", "created the Dutch East India Company"],
      "The treaty drew a line in the Atlantic: Spain claimed lands to the west and Portugal to the east, which is why Brazil became Portuguese."),
    Q(0, 2, DP,
      "Mercantilism held that a state grew strong by",
      ["exporting more than it imported and drawing raw materials from colonies", "letting markets operate free of state rules", "abolishing all tariffs between nations", "sharing colonial profits equally with the colonies that produced them"],
      "Mercantilists believed wealth was limited, so states sought trade surpluses, stores of gold and silver, and colonies that supplied raw materials and bought finished goods."),
    Q(0, 3, DP,
      "Queen Nzinga of Ndongo and Matamba is best known for",
      ["resisting Portuguese expansion in West Central Africa", "leading the Haitian Revolution", "uniting Mali and Songhai", "building the first Dutch fort on the coast of Angola"],
      "In the 1600s Nzinga used war, diplomacy and alliances, including with the Dutch, to resist Portuguese slave-raiding and conquest in what is now Angola."),
]
