# Unit 3 (c. 1450 to c. 1750): Land-Based Empires. Original items and original practice sources.

STIMULI = [
    {"id": "APWORLD-T1-S04", "title": "A European ambassador's letter from the Ottoman court, 1550s (practice text)", "text": (
        "The sultan's governors are not great lords with lands of their own but his servants. His officers take boys from the Christian villages of the Balkans, "
        "raise them as Muslims and train them for the palace or the army, and the ablest rise to govern provinces. His foot "
        "soldiers carry firearms and are drilled every day, and his cannon brought down the walls of cities we thought could "
        "never fall. In Istanbul the great mosques rise over the city to proclaim his glory.")},
    {"id": "APWORLD-T1-S05", "title": "Selected land-based empires, c. 1450 to c. 1750", "text": (
        "| Empire | Ruling group | Religion of the rulers | Most subjects |\n|---|---|---|---|\n"
        "| Ottoman | Turkic dynasty | Sunni Islam | Muslims, with large Christian and Jewish minorities |\n"
        "| Safavid | Turkic-Persian dynasty | Shia Islam | Muslims in Persia |\n"
        "| Mughal | Central Asian Turkic-Mongol dynasty | Sunni Islam | Hindus |\n"
        "| Qing | Manchus from the northeast | Buddhism and Confucian state rites | Han Chinese |")},
    {"id": "APWORLD-T2-S04", "title": "A Mughal court historian's account of the emperor's debates, 1580s (practice text)", "text": (
        "On Thursday nights the emperor gathers learned men of every faith in the hall of worship: Sunni and Shia scholars, "
        "Brahmins, Jain teachers, Zoroastrian priests and even the Jesuit fathers from Goa. He listens to them argue and asks "
        "questions of his own. He has lifted the tax that non-Muslims paid, and Rajput princes who follow the Hindu gods command "
        "his armies and sit in his council.")},
    {"id": "APWORLD-T2-S05", "title": "Two historians' interpretations (practice text)", "text": (
        "**Historian A:** The Ottoman, Safavid and Mughal states owed their rise to firearms. Cannon broke the walls of rival "
        "cities, and infantry with muskets defeated the horse archers who had ruled the battlefield for centuries. Only rulers "
        "rich enough to buy guns and pay soldiers could compete, and so power gathered in a few large states.\n\n"
        "**Historian B:** Guns were available to many rulers; what set the great empires apart was how they governed. They built "
        "salaried bureaucracies, surveyed land for taxes, bargained with local elites and religious leaders, and used splendid "
        "courts and buildings to persuade subjects that their rule was just.")},
    {"id": "APWORLD-D-S04", "title": "A Persian shah's proclamation, early 1500s (practice text)", "text": (
        "Let it be known in every city of our realm that the faith of the Twelve Imams is the faith of this kingdom. Preachers "
        "shall honor the family of the Prophet in every Friday sermon, and scholars of that faith are invited from Arabia and "
        "Lebanon to teach in our cities. Those who curse the Imams shall be punished, and the enemy to the west who denies them "
        "shall find us ready.")},
    {"id": "APWORLD-D-S05", "title": "A German pamphlet, 1520s (practice text)", "text": (
        "The Christian is saved by faith alone, not by buying pardons from Rome. Every man may read the Scriptures for himself, "
        "now that the printers have put them into our own tongue for a few coins. Why should German princes send their silver "
        "south to build churches in Rome, when the Pope has no power over the conscience that God has not given him?")},
    {"id": "APWORLD-D-S06", "title": "A scholar's chronicle of a West African empire, 1650s (practice text)", "text": (
        "In the days of the great askia the empire reached from the ocean to the lands east of the river. Timbuktu was full of "
        "scholars who taught law and grammar in the mosques, and students came to them from across the Sahel. Then the army of the sultan of Morocco crossed the "
        "desert with muskets and cannon, which our cavalry had never faced, and the empire broke apart.")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, DP,
      "The practice of taking boys from Christian villages described in the letter is known as",
      ["the devshirme", "the encomienda", "the mit'a", "the hacienda"],
      "Under the devshirme, the Ottomans took Christian boys from the Balkans, converted them and trained them as janissary soldiers or officials loyal only to the sultan. The other systems were in the Americas.",
      stim="APWORLD-T1-S04"),
    Q(1, 2, CA,
      "The sultan's purpose in the practice the ambassador describes was most likely to",
      ["create officials and soldiers loyal only to him", "spread Christianity within the palace", "give more power to the old Turkish noble families", "reduce the size of his standing army"],
      "Officials and soldiers raised in the palace owed everything to the sultan, not to a noble family, which helped him control a large empire. The practice weakened, not strengthened, the old nobility.",
      stim="APWORLD-T1-S04"),
    Q(1, 2, DP,
      "The ambassador's comments on firearms and cannon best illustrate",
      ["the use of gunpowder weapons to expand land empires", "the decline of Ottoman military power by the 1550s", "the Ottoman refusal to adopt European technology", "the spread of steam power to the eastern Mediterranean"],
      "Ottoman cannon and musket-armed infantry helped conquer Constantinople, the Balkans and much of the Middle East. Steam power came three centuries later.",
      stim="APWORLD-T1-S04"),
    Q(1, 3, CO,
      "The great mosques mentioned in the letter served the same purpose as which of the following?",
      ["Monumental buildings that other rulers used to display their legitimacy", "Trading posts that European companies built on the coasts of India", "Missions that Spanish priests built on the edges of their empire", "Fortified towns that peasants built to defend themselves from their lords"],
      "Rulers such as the Mughals and the Qing used grand buildings to show power and divine favor, as the Ottomans did with their mosques. Trading posts and missions had other purposes.",
      stim="APWORLD-T1-S04"),
    Q(1, 2, CA,
      "Which conflict is most directly explained by the information in the Ottoman and Safavid rows of the table?",
      ["Wars between the Ottomans and the Safavids", "Wars between the Mughals and the Qing", "Wars between the Qing and the Ottoman sultans", "Wars between the Safavids and the Spanish"],
      "The Sunni Ottomans and the Shia Safavids fought for over a century, a rivalry shaped by religious difference as well as by borders and trade. The Mughals and Qing never fought a major war.",
      stim="APWORLD-T1-S05"),
    Q(1, 2, CO,
      "The table suggests that the Mughal and Qing empires faced a similar challenge, namely",
      ["ruling a large majority that differed from the ruling group", "defending a single faith against Christian invaders", "governing a small island population", "replacing the old languages of their own ruling dynasties"],
      "Muslim Mughal rulers governed a mostly Hindu population, and Manchu Qing rulers governed a far larger Han Chinese majority. Both had to win the cooperation of local elites.",
      stim="APWORLD-T1-S05"),
    Q(1, 3, DP,
      "Which policy did the Qing use to address the challenge shown in the last row of the table?",
      ["Keeping the Confucian examinations and Han officials", "Banning all Han Chinese from every government post", "Converting all subjects to Shia Islam", "Moving the capital to Manchuria"],
      "The Qing kept the Confucian examination system and employed many Han officials alongside Manchus, while also requiring the queue hairstyle as a sign of loyalty. They ruled from Beijing.",
      stim="APWORLD-T1-S05"),
    Q(1, 3, CE,
      "A historian arguing that these empires tolerated diversity in order to rule could best use which evidence?",
      ["Ottoman millets let religious communities run their own affairs", "The Safavids made Shia Islam the official faith of the whole state", "The Qing made men wear the queue", "The Ottomans took boys from Christian villages"],
      "The Ottoman millet system let Christian and Jewish communities keep their own laws and leaders under the sultan. The other examples show rulers imposing uniformity or control.",
      stim="APWORLD-T1-S05"),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, DP,
      "The emperor's policies described in the account most directly reflect",
      ["religious tolerance used to win the loyalty of subjects", "an effort to make Sunni Islam the only faith in the empire", "the influence of Confucian scholars on Mughal rule", "a plan to expel the Portuguese from India"],
      "Akbar debated with scholars of many faiths, ended the jizya on non-Muslims and gave Hindu Rajput princes high posts, binding a diverse empire to his rule.",
      stim="APWORLD-T2-S04"),
    Q(2, 2, CC,
      "Which later development marked a change from the policies described in the account?",
      ["A later emperor brought back the tax on non-Muslims", "Later emperors gave up all lands south of Delhi", "Later emperors converted to Christianity", "Later emperors ended the use of Persian at the imperial court"],
      "Aurangzeb restored the jizya in 1679 and favored stricter Sunni practice, which angered Hindu subjects and helped fuel revolts such as the Maratha rising.",
      stim="APWORLD-T2-S04"),
    Q(2, 2, SS,
      "The fact that the account was written by a court historian suggests that it",
      ["presents the emperor in a favorable light", "was written to criticize the emperor's religion", "was meant for Jesuit readers in Europe", "records the views of ordinary villagers"],
      "A historian employed at court wrote for the emperor and his circle, so the account is likely to praise him. It tells us about court life more than about villagers.",
      stim="APWORLD-T2-S04"),
    Q(2, 3, CX,
      "The presence of Jesuit fathers from Goa in the account is best explained by",
      ["Portuguese trading posts and missions on the Indian coast", "the Mughal conquest of Portugal", "the Jesuits' control of the Silk Roads", "a British colony already ruling all of India by the 1580s"],
      "The Portuguese held Goa from 1510 as a trading base, and Jesuit missionaries traveled from there to the Mughal court. British rule over most of India came much later.",
      stim="APWORLD-T2-S04"),
    Q(2, 1, CE,
      "Which evidence would best support the argument of Historian A?",
      ["Ottoman cannon breaching the walls of Constantinople in 1453", "Mughal land surveys used to set tax rates", "Safavid shahs building a splendid capital at Isfahan", "Ottoman rulers granting religious communities their own self-rule"],
      "Historian A credits firearms; the cannon that broke the walls of Constantinople fit that view. Land surveys, buildings and self-rule fit Historian B's focus on governing.",
      stim="APWORLD-T2-S05"),
    Q(2, 2, CE,
      "Which evidence would best support Historian B's argument?",
      ["Mughal officers paid salaries based on rank", "The use of horse archers by Central Asian rivals", "The price of cannon in the 1500s", "A battle won by musket-armed infantry"],
      "Akbar's mansabdar system paid officers by rank and tied them to the state, the kind of administration Historian B stresses. The other choices concern weapons.",
      stim="APWORLD-T2-S05"),
    Q(2, 2, CE,
      "The two historians would most likely agree that",
      ["large land-based empires grew stronger", "guns played no role in Ottoman conquests", "bureaucracy mattered far more than firearms in every case", "the empires collapsed by 1500"],
      "Both explain the rise of strong empires; they differ on the cause. Historian A would reject the claim that bureaucracy mattered more, and Historian B does not deny that guns existed.",
      stim="APWORLD-T2-S05"),
    Q(2, 3, CO,
      "Historian B's argument could also be applied to which state outside the Islamic world?",
      ["Qing China, with its examination-based officials", "The Swahili city-states, with their merchant councils", "The Iroquois Confederacy, with its alliances of nations", "The Dutch Republic, with its trading companies"],
      "The Qing ruled through a large, trained bureaucracy and Confucian legitimacy, the methods Historian B stresses. The Iroquois and Swahili cities were not large bureaucratic empires.",
      stim="APWORLD-T2-S05"),
    # ---------------- Drill only ----------------
    Q(0, 1, DP,
      "The faith that the proclamation makes official is",
      ["Shia Islam", "Sunni Islam", "Zoroastrianism", "Sikhism"],
      "The faith of the Twelve Imams is Twelver Shia Islam, which Shah Ismail made the religion of the Safavid state in the early 1500s.",
      stim="APWORLD-D-S04"),
    Q(0, 2, CX,
      "The enemy to the west mentioned in the proclamation was most likely",
      ["the Sunni Ottoman Empire", "the Mughal Empire", "the Portuguese in the Persian Gulf", "the Qing dynasty"],
      "The Ottomans lay west of Safavid Persia, followed Sunni Islam and fought the Safavids from the Battle of Chaldiran in 1514 onward. The Mughals lay to the east.",
      stim="APWORLD-D-S04"),
    Q(0, 2, CA,
      "The shah's policy in the proclamation most likely aimed to",
      ["build a shared identity that set his state apart from its rivals", "end conflict with all neighboring states", "weaken the authority of the shah over the religious scholars of Persia", "encourage subjects to convert to Christianity"],
      "Making Shia Islam the state faith gave the Safavid realm a distinct identity and unity against its Sunni neighbors. It sharpened, rather than ended, conflict with them.",
      stim="APWORLD-D-S04"),
    Q(0, 3, CC,
      "Which outcome of the policy in the proclamation has lasted into the present?",
      ["Iran remains a mainly Shia country", "Iran became mainly Sunni after 1600", "Persia gave up Islam for Buddhism", "The Ottoman Empire became mainly Shia"],
      "Safavid rule made Persia, today Iran, a largely Shia land, which it remains. The Ottoman lands stayed mostly Sunni.",
      stim="APWORLD-D-S04"),
    Q(0, 1, DP,
      "The ideas in the pamphlet are most closely tied to",
      ["the Protestant Reformation", "the Scientific Revolution in Europe", "the Enlightenment", "the Crusades"],
      "Salvation by faith alone, reading Scripture in one's own language and rejecting the sale of indulgences were central Protestant ideas from the 1520s.",
      stim="APWORLD-D-S05"),
    Q(0, 2, CA,
      "The pamphlet suggests that the new ideas spread quickly mainly because of",
      ["the printing press", "the telegraph", "the Silk Roads", "the steam engine and railways"],
      "The pamphlet notes that printers had put the Bible into German for a few coins. The movable-type printing press made cheap books and pamphlets possible from the mid-1400s.",
      stim="APWORLD-D-S05"),
    Q(0, 2, CX,
      "The writer's appeal to German princes is best explained by",
      ["rulers' interest in gaining power at the expense of the Church", "the princes' plan to move the Pope to Germany", "Ottoman control of the German states", "the princes' wish to lead and join the Catholic Reformation in Rome"],
      "Many princes backed the Reformation partly because breaking with Rome let them keep church wealth and power for themselves. The Catholic Reformation was Rome's response.",
      stim="APWORLD-D-S05"),
    Q(0, 3, CA,
      "A major result of the movement described in the pamphlet was",
      ["a century of religious wars in Europe", "the conversion of the Ottoman sultans", "the immediate end of the Catholic Church", "the union of all German states in 1530"],
      "Conflicts between Catholic and Protestant rulers led to wars such as the French Wars of Religion and the Thirty Years' War. The Catholic Church survived and reformed itself.",
      stim="APWORLD-D-S05"),
    Q(0, 2, DP,
      "The empire described in the chronicle is",
      ["Songhai", "Great Zimbabwe", "Kongo", "Ethiopia"],
      "Songhai, ruled by the askias, controlled the middle Niger and the trade city of Timbuktu until a Moroccan army defeated it in 1591.",
      stim="APWORLD-D-S06"),
    Q(0, 2, CA,
      "According to the chronicle, the empire fell mainly because of",
      ["an invading army with gunpowder weapons", "a plague that emptied Timbuktu", "a revolt by Portuguese settlers on the coast", "the drying up of the Niger River"],
      "The chronicle credits Morocco's muskets and cannon, which Songhai cavalry had never faced. The Moroccan victory at Tondibi in 1591 broke the empire.",
      stim="APWORLD-D-S06"),
    Q(0, 3, CC,
      "The chronicle's description of Timbuktu shows continuity with an earlier period in that the city",
      ["remained a center of Islamic learning and trade", "had become a Christian bishopric", "had become the capital of the Portuguese in Africa", "had stopped trading across the Sahara"],
      "Timbuktu had been a center of Islamic scholarship and trans-Saharan trade under Mali, and it stayed one under Songhai.",
      stim="APWORLD-D-S06"),
    Q(0, 2, DP,
      "Qing rulers required Han Chinese men to wear the queue hairstyle in order to",
      ["show their submission to Manchu rule", "mark them as Buddhist monks", "set officials apart from the merchant class", "follow an old Ming custom"],
      "The queue was a Manchu style, and requiring it was a public sign of loyalty to the new dynasty. Refusing it could be punished as rebellion."),
    Q(0, 2, CA,
      "The Ottoman conquest of Constantinople in 1453 most directly",
      ["ended the Byzantine Empire", "began the Protestant Reformation", "ended the Safavid dynasty", "opened the Atlantic slave trade"],
      "Mehmed II's capture of Constantinople ended the Byzantine Empire, and the city became the Ottoman capital, Istanbul."),
    Q(0, 3, DP,
      "In the Mughal Empire, zamindars were",
      ["local landholders who collected taxes for the state", "Muslim judges who ruled on family law", "Portuguese merchants with trading rights in Mughal ports", "slave soldiers raised in the palace"],
      "Zamindars collected land revenue from peasants and passed part of it to the state, keeping a share. Under British rule many became landlords."),
]
