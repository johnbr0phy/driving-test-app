# Unit 5 (c. 1750 to c. 1900): Revolutions. Original items and original practice sources.

STIMULI = [
    {"id": "APWORLD-T1-S08", "title": "Two historians' interpretations (practice text)", "text": (
        "**Historian A:** The revolution in Saint-Domingue began in Paris. When the French revolutionaries declared that men are "
        "born free and equal in rights, they handed the enslaved people of the richest colony in the world a language of liberty "
        "that they turned against their masters, and against France itself.\n\n"
        "**Historian B:** The enslaved of Saint-Domingue needed no French pamphlets to know that slavery was wrong. Most were born "
        "in Africa, many had been soldiers there, and the colony's sugar estates worked them to death. Their rising in 1791 grew "
        "from that experience, from African traditions and from networks built among the plantations.")},
    {"id": "APWORLD-T1-S09", "title": "A Japanese reformer's essay, 1870s (practice text)", "text": (
        "When the black ships came into our harbor, we learned that courage and swords are no match for steam and cannon. If Japan "
        "is not to be carved up like China, we must learn from the West what makes it strong. The government has sent students to "
        "Europe and America, built railways and mills, and raised an army of conscripts. Let us take their science and their "
        "industry, and keep our own spirit.")},
    {"id": "APWORLD-T2-S08", "title": "A speech to a town council in New Granada by a locally born lawyer, 1810 (practice text)", "text": (
        "Gentlemen, our families have lived on this soil for generations, yet the judges, the bishops and the viceroy all come to "
        "us from across the sea. Our merchants may sell only to Cadiz, at the prices Cadiz sets. Now the king is a prisoner of "
        "the French emperor, and the junta that claims to rule in his name was never chosen by us. Let this council form a "
        "government of its own, as the English colonies of the north did, for a people has the right to choose who governs it.")},
    {"id": "APWORLD-T2-S09", "title": "A British factory inspector's report, 1840s (practice text)", "text": (
        "In the cotton mills of this district I found children of nine and ten tending the machines beside women who work twelve "
        "hours a day, with little air and less light. The owners say the mills cannot pay without them, and the parents need their wages. The "
        "town has doubled in twenty years; whole families crowd into cellars, and the river that turns the mill wheels also "
        "carries away the sewage.")},
    {"id": "APWORLD-D-S10", "title": "A provincial lawyer's pamphlet, published in Paris, 1789 (practice text)", "text": (
        "The commons plough the fields, keep the shops and pay the taille, while the lords and the abbots, who pay almost "
        "nothing, take the commands in the army and the seats in the high courts as if they were born to them. Why should the "
        "deputies of twenty million count for no more than those of a few hundred thousand? Authority comes from the nation, "
        "not from the crown, and the law must be made by those whom the nation elects.")},
    {"id": "APWORLD-D-S11", "title": "A speech by a German nationalist, 1848 (practice text)", "text": (
        "We speak one language, sing the same songs and share a thousand years of history, yet we are divided into dozens of "
        "states, each with its own prince and its own customs border. Let the Germans become one nation with one parliament, "
        "chosen by the people and bound by a constitution, and no foreign power will dare to treat us as a battlefield again.")},
    {"id": "APWORLD-D-S12", "title": "A British antislavery society's pamphlet, 1820s (practice text)", "text": (
        "Parliament ended the trade in human beings in 1807; it must now end slavery itself in the West Indies. Every spoonful "
        "of sugar on a British table is sweetened with the sweat of the enslaved. Let every family that loves justice refuse "
        "slave-grown sugar, and let every town send its petition to Westminster.")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 2, CE,
      "Which evidence would best support Historian A's argument?",
      ["Rebel leaders quoting the Declaration of the Rights of Man", "Records showing that most enslaved people were born in Africa", "Accounts of secret meetings among enslaved people on estates", "Reports of very high death rates on sugar plantations"],
      "Historian A traces the revolution to French revolutionary ideas, so leaders using the language of the Declaration of the Rights of Man would support that view. The other choices fit Historian B.",
      stim="APWORLD-T1-S08"),
    Q(1, 2, CE,
      "Historian B would most likely emphasize which cause of the revolution?",
      ["The experience of the enslaved themselves", "Debates in the French National Assembly about rights", "British efforts to seize the colony", "Spanish support for the rebels"],
      "Historian B points to the enslaved people's African backgrounds, the brutality of the sugar estates and networks among plantations, not French debates.",
      stim="APWORLD-T1-S08"),
    Q(1, 1, CA,
      "The revolution discussed by the historians resulted in",
      ["the first state founded by formerly enslaved people", "the restoration of slavery in Saint-Domingue", "British rule over Saint-Domingue", "a constitutional monarchy ruled from Paris by the French king"],
      "The rebellion ended slavery in the colony and, after defeating French forces, created independent Haiti in 1804, the first state founded by people who had freed themselves from slavery.",
      stim="APWORLD-T1-S08"),
    Q(1, 3, CO,
      "Both historians would agree that the revolution in Saint-Domingue",
      ["belonged to a wider age of Atlantic revolutions", "had no link to events in France", "was led mainly by wealthy European settlers and merchants", "failed to end slavery in the colony"],
      "Historian A links it to the French Revolution and Historian B to conditions in the colony, but both treat it as a revolution of the same era. Both note it was led by the enslaved.",
      stim="APWORLD-T1-S08"),
    Q(1, 1, CX,
      "The black ships mentioned in the essay refer to",
      ["the American warships that pressed Japan to open its ports", "Dutch merchant ships trading at Nagasaki", "a British fleet that conquered Kyoto and deposed the emperor", "Chinese warships sent to invade Japan"],
      "In 1853 and 1854 American warships under Commodore Perry forced the Tokugawa shogunate to open ports to trade, a shock that helped bring down the shogunate.",
      stim="APWORLD-T1-S09"),
    Q(1, 2, DP,
      "The reforms described in the essay are best described as",
      ["state-sponsored industrialization", "a return to rule by the shogun", "a rejection of all Western technology", "a policy of closing Japan to trade"],
      "After the Meiji Restoration of 1868, the government built railways and factories, sent students abroad and created a conscript army to strengthen Japan.",
      stim="APWORLD-T1-S09"),
    Q(1, 2, CO,
      "The reforms in the essay were most similar to which other effort of the 1800s?",
      ["The Ottoman Tanzimat reforms", "The British Factory Acts", "The Qing ban on opium", "The Russian conquest of Central Asia"],
      "The Tanzimat reforms also tried to strengthen an Asian state against the West by modernizing law, the army and education. The Factory Acts regulated labor in an already industrial country.",
      stim="APWORLD-T1-S09"),
    Q(1, 3, CA,
      "The program described in the essay most directly made it possible for Japan to",
      ["build an empire of its own in East Asia", "avoid all wars with its neighbors until the 1940s", "end its trade with Western states", "abolish its army"],
      "Industrial and military strength let Japan defeat China in 1895, taking Taiwan, and Russia in 1905, and then annex Korea in 1910.",
      stim="APWORLD-T1-S09"),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, CX,
      "The speaker most likely belonged to which group?",
      ["Creoles, of European descent but born in the Americas", "Peninsulares, officials born in Spain", "Enslaved Africans on sugar estates", "Indigenous nobles descended from the rulers of the Inca state"],
      "Creole elites resented being kept from high office and from free trade by Spanish-born peninsulares, and they led most of the Spanish American independence movements.",
      stim="APWORLD-T2-S08"),
    Q(2, 2, CA,
      "According to the speech, which event gave the colonies the chance to break with Spain?",
      ["Napoleon's seizure of the Spanish throne", "The British victory in the Seven Years' War", "Britain's ban on the Atlantic slave trade in 1807", "The Mexican-American War"],
      "When Napoleon made his brother king of Spain in 1808, colonial elites refused to obey the new government, and many juntas moved toward independence.",
      stim="APWORLD-T2-S08"),
    Q(2, 2, DP,
      "The right the speaker claims shows the influence of",
      ["Enlightenment ideas of popular sovereignty", "Confucian ideas of order", "the divine right of kings", "mercantilist economic theory and colonial trade rules"],
      "The speaker appeals to the right of a people to choose who governs it, an Enlightenment idea also used in the American and French revolutions.",
      stim="APWORLD-T2-S08"),
    Q(2, 3, CC,
      "After independence, most of the new states of Spanish America",
      ["kept much of the old social order in place", "gave the land of large estates to indigenous farmers across the region", "became colonies of the United States", "ended the Catholic Church's role in society"],
      "Independence ended Spanish rule but left large estates, the church and creole elites in place, and many indigenous and mixed-race people saw little change.",
      stim="APWORLD-T2-S08"),
    Q(2, 1, CX,
      "The conditions in the report were a direct result of",
      ["the Industrial Revolution in Britain", "the enclosure of land by the Mughals", "the British conquest of China", "the Black Death"],
      "Factory production of cotton cloth, powered first by water and then by steam, drew families into crowded mill towns in Britain in the late 1700s and 1800s.",
      stim="APWORLD-T2-S09"),
    Q(2, 2, CC,
      "The inspector's remark that the town has doubled in twenty years best illustrates",
      ["rapid urbanization as people moved to factory work", "a movement of families from industrial towns back to farms", "the decline of the cotton industry in northern England", "the spread of guild workshops in the countryside"],
      "Factory jobs drew rural families into mill towns such as Manchester, which grew faster than housing, water and sewers could keep up with. Cotton was Britain's leading industry.",
      stim="APWORLD-T2-S09"),
    Q(2, 2, CA,
      "Reports like this one most directly led to",
      ["laws limiting child labor and working hours", "the end of the factory system in Britain", "the British move to free trade with China and India", "the abolition of the British monarchy"],
      "Inspectors' reports helped persuade Parliament to pass Factory Acts that limited children's work and hours. The factory system kept growing.",
      stim="APWORLD-T2-S09"),
    Q(2, 3, CO,
      "Which thinker responded to conditions like those in the report by arguing that workers should own the means of production?",
      ["Karl Marx", "Adam Smith", "John Locke", "Confucius"],
      "Marx and Engels argued that industrial capitalism exploited workers and predicted that workers would take over the means of production. Smith defended free markets.",
      stim="APWORLD-T2-S09"),
    # ---------------- Drill only ----------------
    Q(0, 1, DP,
      "The pamphlet's argument reflects which development in France in 1789?",
      ["Demands by the third estate for political power", "Support for the absolute power of the king", "Noble demands for higher taxes on their own estates", "Calls for a Catholic crusade"],
      "Members of the third estate, the commoners, demanded a say in government equal to their numbers and formed the National Assembly in 1789.",
      stim="APWORLD-D-S10"),
    Q(0, 2, CX,
      "The idea that the nation, not the king, is sovereign came mainly from",
      ["Enlightenment thinkers", "the Catholic Reformation", "Confucian scholars", "the Mongol law code"],
      "Enlightenment writers such as Rousseau argued that sovereignty belongs to the people, an idea the French revolutionaries put into practice.",
      stim="APWORLD-D-S10"),
    Q(0, 2, CC,
      "A major result of the French Revolution and Napoleon's wars was",
      ["the spread of nationalism and legal equality across Europe", "the lasting return of feudal privileges across all of Europe", "the end of all monarchies in Europe by the year 1815", "a decline in the power of the middle classes"],
      "French armies and the Napoleonic Code spread legal equality and abolished feudal dues, and resistance to French rule stirred nationalism in Spain, Germany and elsewhere. Many monarchies returned in 1815.",
      stim="APWORLD-D-S10"),
    Q(0, 3, CE,
      "Which group would most likely have opposed the pamphlet's argument?",
      ["Nobles who held offices by birth", "Merchants in Paris", "Peasants who paid heavy taxes", "Lawyers in the provincial towns of France"],
      "The pamphlet attacks the privileges of nobles and clergy, who would lose their tax exemptions and offices. Merchants, peasants and lawyers were part of the third estate.",
      stim="APWORLD-D-S10"),
    Q(0, 1, DP,
      "The speech is an example of",
      ["nationalism", "feudalism", "absolutism", "mercantilism"],
      "The speaker defines the nation by shared language and history and calls for one German state, the core of nineteenth-century nationalism.",
      stim="APWORLD-D-S11"),
    Q(0, 2, CC,
      "How was the goal of the speech finally achieved?",
      ["Prussia united Germany through wars by 1871", "An elected parliament united Germany in 1848", "Austria united Germany under its emperor", "France united the German states after 1815"],
      "The liberal Frankfurt Parliament of 1848 failed; Germany was united under Prussian leadership after wars with Denmark, Austria and France, and the empire was declared in 1871.",
      stim="APWORLD-D-S11"),
    Q(0, 2, CO,
      "Which movement of the 1800s was most similar to the one in the speech?",
      ["The unification of Italy", "The Taiping Rebellion", "The partition of Africa by Europe", "The Opium Wars"],
      "Italian nationalists also sought to join many states into one nation, which was largely done by 1861 and completed in 1870.",
      stim="APWORLD-D-S11"),
    Q(0, 3, CA,
      "Nationalist ideas like those in the speech also challenged which kind of state in the 1800s?",
      ["Empires ruling many peoples, such as Austria", "Small states with a single national language", "Island states such as Britain and Japan with long-settled borders", "City-states in East Africa"],
      "Multiethnic empires such as Austria-Hungary and the Ottoman Empire faced nationalist movements among Serbs, Greeks, Czechs, Hungarians and others.",
      stim="APWORLD-D-S11"),
    Q(0, 1, DP,
      "The pamphlet is an example of",
      ["a campaign to end slavery", "a defense of the plantation system", "a call for war with France", "an appeal for free trade with China"],
      "The pamphlet urges Parliament to end slavery in the British West Indies and asks families to boycott slave-grown sugar.",
      stim="APWORLD-D-S12"),
    Q(0, 2, CC,
      "What happened to slavery in the British Empire after the pamphlet was written?",
      ["Parliament abolished it in the 1830s", "It lasted in the West Indies until 1900", "It was replaced by serfdom", "It spread to Britain itself"],
      "Parliament passed the Slavery Abolition Act in 1833, ending slavery in most British colonies, though it first imposed a period of forced apprenticeship.",
      stim="APWORLD-D-S12"),
    Q(0, 3, CO,
      "Which reform in the 1860s was most similar in purpose to the one the pamphlet demands?",
      ["The emancipation of the serfs in Russia", "The Meiji government's new land tax", "The British Crown's takeover of India in 1858", "The opening of the Suez Canal"],
      "Russia freed its serfs in 1861, ending a form of unfree labor, though peasants had to pay for land. The other events had different purposes.",
      stim="APWORLD-D-S12"),
    Q(0, 2, DP,
      "Adam Smith's The Wealth of Nations (1776) argued that",
      ["free markets and the division of labor create wealth", "states should control all trade through monopolies", "workers should seize the factories", "colonies should be ruled for profit by joint-stock companies"],
      "Smith argued against mercantilist monopolies and for free markets, in which the division of labor and competition increase a nation's wealth."),
    Q(0, 2, DP,
      "The second industrial revolution of the late 1800s is best known for",
      ["steel, electricity and chemicals", "water-powered cotton mills", "the first printing presses", "the invention of the caravel and astrolabe"],
      "After about 1870, new industries in steel, electricity, chemicals and later oil grew, led by Germany and the United States as well as Britain."),
    Q(0, 3, CA,
      "Railways and steamships in the 1800s most directly",
      ["cut the cost and time of moving goods and people", "ended trade between Europe and Asia", "slowed migration from Europe to the Americas sharply", "raised the cost of shipping grain by sea"],
      "Railways and steamships moved goods and people faster and cheaper over land and sea, which fed trade, migration and empire."),
]
