# Units 1 and 2 (c. 1200 to c. 1450): The Global Tapestry and Networks of Exchange.
# Original items and original practice sources.
# Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None)
# test 1 or 2 = practice-test item, 0 = drill only. Sets stay in authored order.

STIMULI = [
    {"id": "APWORLD-T1-S01", "title": "A North African traveler's account of a West African court, 1350s (practice text)", "text": (
        "The king holds audience in a pavilion hung with silk, and his guards carry lances worked with gold. His judges studied the "
        "law in Fez and Cairo, and in the mosques of the town boys learn to recite the Quran in Arabic, though at home their fathers "
        "speak the tongue of the country. Caravans from the north unload slabs of salt and carry away gold dust, and the merchants "
        "praise the king's officers for keeping the roads free of thieves.")},
    {"id": "APWORLD-T1-S02", "title": "A Chinese official's memorial to the emperor, 1100s (practice text)", "text": (
        "Since the new early-ripening rice was brought from the south, the fields of the river valleys give two harvests a year, and "
        "the markets of the capital overflow. Yet a full granary is not enough. The empire must be governed by men who have mastered "
        "the classics and passed the examinations, so that office goes to the learned and the virtuous, not to the sons of great families.")},
    {"id": "APWORLD-T1-S03", "title": "A Persian court historian on the Mongol khans, c. 1300 (practice text)", "text": (
        "The khans have made the roads from China to the lands of the Franks safe for merchants. Post stations stand a day's ride "
        "apart, and a tablet from the khan opens every gate. Physicians from Cathay work beside our own, and astronomers from many "
        "lands meet in the observatory. Yet the cities that resisted them, Baghdad among them, were left in ruins.")},
    {"id": "APWORLD-T2-S01", "title": "A historian's interpretation (practice text)", "text": (
        "By the 1200s the Abbasid caliphs held little power outside Baghdad. Real authority had passed to Turkic military rulers, "
        "the Seljuks and later others, who claimed to defend the faith while governing in their own name. Yet the decline of the "
        "caliphate did not end the intellectual life of Dar al-Islam. Scholars in Cairo, Damascus and Samarkand went on translating, "
        "studying and adding to Greek, Persian and Indian learning in medicine, mathematics and astronomy.")},
    {"id": "APWORLD-T2-S02", "title": "An Arab merchant's description of a city on the East African coast, 1330s (practice text)", "text": (
        "The houses of the town are built of coral stone, and its sultan lives in a palace above the harbor. Ships arrive from Arabia, "
        "Persia and India when the winds of winter blow from the northeast and leave when they turn in summer. The people trade "
        "ivory and gold from the interior for cloth, beads and porcelain. They speak a language of their own, though many of its "
        "words are Arabic, and the merchants pray in the mosque on the shore.")},
    {"id": "APWORLD-T2-S03", "title": "A Spanish soldier's memoir of a Mexica city, written in the 1560s about 1519 (practice text)", "text": (
        "From the hills we looked down on their capital, set on an island in the lake and linked to the shore by long causeways, with "
        "fields of mud and reeds built up out of the shallows around it. "
        "In the market thousands bought and sold maize, cotton cloth, cacao and feathers. Officials told us that every province "
        "subject to their lord sent tribute of food, cloth and captives, and that many of those provinces hated him for it.")},
    {"id": "APWORLD-D-S01", "title": "A Buddhist monk's account of a visit to a Southeast Asian kingdom, 1290s (practice text)", "text": (
        "The great temple of the capital was built by earlier kings for the Hindu gods, and its walls are carved with the stories "
        "of Vishnu. Today most of the people follow the teaching of the Buddha, and monks in yellow robes walk the streets each "
        "morning. Water from the reservoirs flows through canals to the rice fields, and the king's officers watch over it closely.")},
    {"id": "APWORLD-D-S02", "title": "A historian's interpretation (practice text)", "text": (
        "The plague that struck Afro-Eurasia in the 1340s traveled the same roads and sea lanes that carried silk and spices. In "
        "places it killed a third or more of the people. In western Europe the survivors found their labor suddenly scarce, and "
        "many peasants demanded and won higher wages or left their lords for the towns. In the Islamic world and China the losses "
        "were as great, but the social results differed from place to place.")},
    {"id": "APWORLD-D-S03", "title": "A Spanish chronicler's description of the Inca state, 1550s (practice text)", "text": (
        "The lords of Cuzco joined their lands with roads that climb the mountains and cross the gorges on bridges of rope. Every "
        "household owed the state a turn of labor each year, building roads, working the lord's fields or serving as soldiers. "
        "Officials kept the accounts of every province on knotted cords, which they read as well as we read our books.")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, DP,
      "The court described in the account most directly built its wealth on",
      ["control of trade across the Sahara", "silver mined by forced native labor", "spices shipped across the Indian Ocean", "taxes on pilgrims sailing to Mecca by sea"],
      "Mali's rulers taxed and protected the trans-Saharan trade in which northern merchants exchanged salt for West African gold. Silver mining and the spice trade belong to other regions.",
      stim="APWORLD-T1-S01"),
    Q(1, 2, CX,
      "The mosques and Arabic learning described in the account were mainly a result of",
      ["the spread of Islam along trade routes", "a Mongol policy of religious conversion", "missionary work by Christian orders", "the conquest of the region by the Abbasid army"],
      "Muslim merchants carried Islam across the Sahara, and West African rulers and elites adopted it, which also eased trade with North Africa. The Abbasids never conquered the region.",
      stim="APWORLD-T1-S01"),
    Q(1, 2, CO,
      "Which state of the same period was most similar to the one described, in the source of its wealth?",
      ["The Swahili city-states of East Africa", "The Inca state in the Andes", "The Holy Roman Empire in central Europe", "The Kamakura shogunate in Japan"],
      "Like Mali, the Swahili city-states grew rich by controlling long-distance trade, in their case across the Indian Ocean. The Inca relied on labor tribute and had no market trade of this kind.",
      stim="APWORLD-T1-S01"),
    Q(1, 3, SS,
      "The traveler's point of view is best explained by the fact that he",
      ["was a Muslim visitor who judged the court partly by its faith", "was a West African official writing to praise his own ruler", "was a European merchant hoping to trade for gold directly", "had never traveled outside North Africa before making this one visit"],
      "A North African traveler shared the faith of Mali's elite, so he noticed its judges, mosques and Quran schools and the safety of merchants. He was a visitor, not a court official.",
      stim="APWORLD-T1-S01"),
    Q(1, 1, CA,
      "The two harvests described in the memorial most directly led to",
      ["rapid population growth in Song China", "a shift from rice to wheat in southern China", "the end of the examination system", "a sharp decline in commerce in Chinese cities"],
      "Fast-ripening rice from Champa (in Southeast Asia) allowed more harvests, which fed a fast-growing population and busy commercial cities. The examination system continued.",
      stim="APWORLD-T1-S02"),
    Q(1, 2, DP,
      "The official's view of how the empire should be governed most directly reflects",
      ["Neo-Confucian ideas about merit and learning", "Buddhist teaching that officials should withdraw from the world", "the Mongol practice of giving office to foreigners", "Legalist demands for harsh punishment of all officials"],
      "The memorial ties office to mastery of the classics and to virtue, the Confucian ideal behind the civil service examinations that Song rulers expanded. Mongol rule came later.",
      stim="APWORLD-T1-S02"),
    Q(1, 3, CC,
      "Which of the following best describes a continuity in China after the period of the memorial?",
      ["Later dynasties kept a bureaucracy chosen by examinations", "Later dynasties gave up rice for other grains", "Later dynasties ended all trade with foreign merchants", "Later dynasties gave the highest offices only to Buddhist monks"],
      "The Ming and Qing kept the examination system and its scholar-officials until 1905, apart from a pause under the Mongols. Rice farming and foreign trade continued too.",
      stim="APWORLD-T1-S02"),
    Q(1, 1, CA,
      "The conditions on the roads described by the historian most directly encouraged",
      ["greater trade and exchange of ideas across Eurasia", "the closing of the Silk Roads to foreign merchants", "the decline of the Indian Ocean trade network", "the end of contact between China and Persia"],
      "Under the Mongols, protected roads and relay stations made long-distance travel safer, and goods, scholars and techniques moved between China, Persia and Europe. The routes were open, not closed.",
      stim="APWORLD-T1-S03"),
    Q(1, 2, CX,
      "The ruin of Baghdad mentioned in the account refers to",
      ["the Mongol conquest that ended the Abbasid caliphate", "the Crusaders' capture of the city", "an Ottoman siege that ended a thousand years of Byzantine rule", "the Black Death's arrival in Iraq"],
      "Mongol armies sacked Baghdad in 1258 and killed the last Abbasid caliph there. Crusaders never took Baghdad, and the Ottoman siege that ended Byzantine rule was at Constantinople.",
      stim="APWORLD-T1-S03"),
    Q(1, 3, CA,
      "The connections described in the account also help explain",
      ["the rapid spread of the plague in the 1340s", "the rise of the Atlantic slave trade", "the arrival of the first Portuguese ships in India", "the decline of paper making in Europe"],
      "The same routes that carried merchants across the Mongol lands carried the plague from Central Asia to the Mediterranean in the 1340s. The Atlantic slave trade and the Portuguese came later.",
      stim="APWORLD-T1-S03"),
    # ---------------- Practice Test 2 ----------------
    Q(2, 2, CE,
      "Which evidence would best support the historian's claim about intellectual life?",
      ["Translations of Greek works into Arabic used by later scholars", "A decree by the caliph closing the libraries of Cairo and Cordoba", "The conversion of the Seljuk rulers to Buddhism", "A rise in the price of paper in Baghdad"],
      "The historian argues learning continued despite political decline; Arabic translations and commentaries on Greek works, later used in Europe, show that. A decree closing libraries would undercut it.",
      stim="APWORLD-T2-S01"),
    Q(2, 2, DP,
      "The historian's description of Turkic military rulers best illustrates",
      ["new states arising as the caliphate lost power", "the unification of the Islamic world under one ruler", "the conquest of Persia by Christian kingdoms", "the replacement of Islam by Turkic religions"],
      "As the Abbasid caliphate weakened, Turkic groups such as the Seljuks built their own states in its lands while keeping and defending Islam. The Islamic world grew more divided, not less.",
      stim="APWORLD-T2-S01"),
    Q(2, 3, CA,
      "The learning described by the historian most directly affected Europe through",
      ["the transmission of texts by way of Spain and Sicily", "the conquest of Rome by Seljuk armies", "the spread of Buddhism along the Silk Roads", "the decline of trade across the Mediterranean Sea after 1200"],
      "Scholars in Muslim Spain and Sicily translated Arabic works and Arabic versions of Greek texts into Latin, feeding learning in European universities. No Seljuk army reached Rome.",
      stim="APWORLD-T2-S01"),
    Q(2, 1, CX,
      "The timing of the ships' arrivals and departures described in the account depended on",
      ["the monsoon winds of the Indian Ocean", "the opening of the Suez Canal", "the Mongol relay stations on land routes", "the steam engines used by Arab ships"],
      "Indian Ocean sailors timed voyages to the seasonal monsoon winds, which blow from the northeast in winter and from the southwest in summer. Steam and the Suez Canal came centuries later.",
      stim="APWORLD-T2-S02"),
    Q(2, 2, DP,
      "The language described in the account is best explained by",
      ["contact between Bantu-speaking Africans and Arab traders", "the permanent settlement of the whole coast by Chinese sailors", "Portuguese rule over the coastal towns", "the migration of Turkic peoples into Africa"],
      "Swahili is a Bantu language that took in many Arabic words through centuries of trade with Arab and Persian merchants. Portuguese rule came only after 1500.",
      stim="APWORLD-T2-S02"),
    Q(2, 2, CO,
      "Compared with the trans-Saharan trade, the trade described in the account differed mainly in that it",
      ["moved goods by sea rather than by caravan", "did not involve any Muslim merchants at all", "traded mostly in enslaved Europeans", "was controlled entirely by the Mongols"],
      "Both trades brought Muslim merchants and African gold into contact, but the East African trade moved by ship across the Indian Ocean while the Saharan trade moved by camel caravan.",
      stim="APWORLD-T2-S02"),
    Q(2, 3, CX,
      "In the early 1400s, which state sent large fleets that reached ports on this coast?",
      ["Ming China", "The Ottoman Empire", "The Inca Empire", "The Mughal Empire"],
      "Ming China sent Zheng He's treasure fleets across the Indian Ocean between 1405 and 1433, and some reached East Africa. The Mughal Empire did not exist until 1526.",
      stim="APWORLD-T2-S02"),
    Q(2, 1, DP,
      "The tribute described in the memoir shows that the Mexica state",
      ["drew wealth from conquered peoples it ruled", "was a small state with no subject provinces", "relied mainly on trade with Europe", "had no markets or merchants"],
      "The Mexica built an empire by conquering neighbors and demanding tribute of goods and captives. The memoir describes a large market, and contact with Europe began only in 1519.",
      stim="APWORLD-T2-S03"),
    Q(2, 2, CO,
      "The Mexica system described in the memoir was most similar to the Inca system in that both states",
      ["demanded goods or labor from subject peoples", "used iron weapons and horses in war", "relied on markets as their main source of revenue", "had no religious role for the ruler"],
      "Both states drew on subject peoples: the Mexica through tribute and the Inca through the mit'a labor system. Neither had iron tools or horses before contact.",
      stim="APWORLD-T2-S03"),
    Q(2, 3, CA,
      "The resentment of subject provinces mentioned in the memoir helps explain",
      ["why some native peoples allied with the Spanish", "why the Spanish failed to conquer the city", "why the Mexica abandoned the city before 1519", "why the Spanish brought no allies on their march"],
      "Peoples such as the Tlaxcalans, enemies of the Mexica, joined the Spanish, and their warriors were vital in the fall of the city in 1521. The Spanish did conquer the city.",
      stim="APWORLD-T2-S03"),
    # ---------------- Drill only ----------------
    Q(0, 1, CC,
      "The account best illustrates which development in Southeast Asia?",
      ["The influence of Hindu and Buddhist traditions from South Asia", "The arrival of Christianity through Portuguese missions", "The spread of Confucian civil service examinations to every kingdom", "The end of rice farming in the region"],
      "Southeast Asian states such as the Khmer adopted Hindu and Buddhist ideas carried from South Asia by traders and monks, and the great temple changed from Hindu to Buddhist use. Portuguese missions came after 1500.",
      stim="APWORLD-D-S01"),
    Q(0, 2, DP,
      "The reservoirs and canals described in the account show that the kingdom's power rested partly on",
      ["control of water for rice farming", "silver mines worked by enslaved people", "trade in camels across the desert", "a navy that ruled the Atlantic"],
      "Khmer rulers organized reservoirs and canals that watered rice fields, and the food they produced supported the capital. The other choices describe other places and periods.",
      stim="APWORLD-D-S01"),
    Q(0, 2, CO,
      "Unlike the kingdom described in the account, the Srivijaya state of the same region drew its power mainly from",
      ["control of sea trade through the Strait of Malacca", "irrigated wheat farming in the river valleys of the interior", "conquest of the Mongol Empire", "silver from mines in the Americas"],
      "Srivijaya, based on Sumatra, grew rich by controlling and taxing the sea lanes between the Indian Ocean and the South China Sea. Land-based Khmer power rested on irrigated rice.",
      stim="APWORLD-D-S01"),
    Q(0, 3, CC,
      "Which later change in maritime Southeast Asia came mainly through merchants?",
      ["The spread of Islam to ports such as Malacca", "The spread of Christianity to Angkor", "The adoption of Shinto by the Javanese kings and their courts", "The conquest of Sumatra by the Inca"],
      "From the 1300s and 1400s, Muslim traders carried Islam to ports such as Malacca, and many coastal rulers converted. Christianity arrived later with the Portuguese and Spanish.",
      stim="APWORLD-D-S01"),
    Q(0, 1, CA,
      "According to the historian, the plague spread mainly by way of",
      ["trade routes across land and sea", "Crusader armies returning from the east", "pilgrims crossing the Atlantic", "Mongol attacks on Japan"],
      "The historian ties the plague to the roads and sea lanes that carried silk and spices: the trade networks linking Central Asia, the Mediterranean and Europe.",
      stim="APWORLD-D-S02"),
    Q(0, 2, CA,
      "The historian's point about peasants in western Europe is best supported by evidence that",
      ["laborers won higher pay after the plague", "serfdom grew stronger in western Europe", "towns emptied as peasants returned to the manors", "lords raised the labor dues owed by every peasant"],
      "With fewer workers, laborers could demand more, and wages rose in many places; serfdom weakened in western Europe over the following century, despite lords' efforts to hold wages down.",
      stim="APWORLD-D-S02"),
    Q(0, 3, CE,
      "Which statement would the historian most likely agree with?",
      ["The plague was a shared crisis with different local effects", "The plague affected only western Europe", "The plague had no effect on trade networks", "The plague began in the Americas and spread east across the Atlantic"],
      "The historian says the losses in the Islamic world and China were as great as in Europe but that social results differed from place to place.",
      stim="APWORLD-D-S02"),
    Q(0, 2, CX,
      "The speed of the plague's spread in the 1340s is best explained by",
      ["the trade links the Mongol empires had fostered", "the opening of new sea routes between Europe and the Americas", "the use of railways for long trips", "the closing of Mediterranean ports"],
      "Mongol rule had tied Central Asia, China, Persia and the Black Sea ports together, and the plague moved along those links to the Mediterranean. Railways and the Americas came later.",
      stim="APWORLD-D-S02"),
    Q(0, 1, DP,
      "The yearly turn of labor described in the account is known as",
      ["the mit'a", "the encomienda", "the jizya", "the iqta"],
      "The Inca mit'a required households to give labor to the state for set periods. The encomienda was a Spanish grant, the jizya a tax on non-Muslims, and the iqta a land grant in Islamic states.",
      stim="APWORLD-D-S03"),
    Q(0, 2, DP,
      "The knotted cords described in the account were used to",
      ["keep records for the state", "decorate the temples of the sun", "measure the height of the mountains", "send messages across the ocean"],
      "The Inca kept census, tribute and other records on quipu, knotted cords read by trained officials. The Inca had no writing system of the European kind.",
      stim="APWORLD-D-S03"),
    Q(0, 3, CO,
      "The Inca state described in the account differed from the Mexica state mainly in that the Inca",
      ["relied more on labor service and a road network", "had no army and no subject peoples", "collected all taxes in coined money", "were ruled by a council of wealthy merchants from the coast"],
      "Both ruled subject peoples, but the Inca built a centralized state held together by roads and the mit'a labor system, while the Mexica relied more on tribute from conquered city-states.",
      stim="APWORLD-D-S03"),
    Q(0, 2, CO,
      "Feudal Japan and feudal Europe in the 1200s were similar in that both",
      ["relied on warriors who owed loyalty and service to lords", "were ruled by strong central bureaucracies chosen by exams", "were united under a single emperor who held real power", "had no landed aristocracy"],
      "Samurai served daimyo and the shogun, and knights served lords in Europe, in exchange for land or support. Real power in Japan lay with the shogun, not the emperor."),
    Q(0, 2, DP,
      "The Delhi Sultanate in South Asia is best described as",
      ["a Muslim state ruling over a mostly Hindu population", "a Buddhist kingdom founded by monks", "a Hindu empire that expelled all Muslims from northern India", "a colony of the Song dynasty"],
      "Turkic Muslim rulers founded the Delhi Sultanate in the early 1200s and ruled much of northern India, where most people were Hindu. Their rule saw both conflict and cultural blending."),
    Q(0, 3, CC,
      "The Bhakti movement in South Asia is best described as",
      ["a Hindu movement of personal devotion to a god", "a Muslim law school that enforced the jizya", "a Buddhist revival led and funded by the Delhi sultans", "a movement to expel merchants from Indian ports"],
      "Bhakti poets and teachers urged personal devotion to a god, often in local languages, and some challenged caste rules. It grew alongside Sufi Islam in the same period."),
]
