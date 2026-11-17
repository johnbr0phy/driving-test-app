"""Original balanced general studies: 11 four-choice contrast families plus three numerical applications."""
ITEMS=[]
def family(options, rows):
    for k,(stem,why) in enumerate(rows): ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))
family(['Bhubaneswar','Cuttack','Konark','Mahendragiri'],[
('Which place became the capital of Odisha after independence, replacing the earlier provincial capital?','Bhubaneswar became the new capital; Cuttack was the earlier provincial capital.'),
('Which place served as the capital when Odisha became a separate province in 1936?','Cuttack served as the provincial capital before the move to Bhubaneswar.'),
('At which place is the temple whose architecture represents the chariot of the Sun god?','The Sun Temple at Konark represents the chariot of Surya.'),
('Which place is a mountain in Gajapati district, rising about 1,501 metres within the Eastern Ghats?','The Gajapati district administration identifies Mahendragiri as this mountain.')])
family(['Ashoka','Kharavela','Narasimha Deva I','Mahatma Gandhi'],[
('Which historical figure led the conquest of Kalinga dated to 261 BCE?','Ashoka conquered Kalinga in 261 BCE.'),
('Whose achievements are associated with the Hathigumpha inscription at Udayagiri?','The Hathigumpha inscription records the achievements of Kharavela.'),
('Under whose reign was the thirteenth-century Sun Temple at Konark built?','UNESCO identifies Konark with the reign of Narasimha Deva I, AD 1238–1264.'),
('Who organised nationwide celebrations on 26 January 1930 as Independence Day following the demand for complete independence?','The President’s Secretariat historical account identifies Mahatma Gandhi as organising these celebrations.')])
family(['1936','1947','1949','1950'],[
('In which year was Odisha formed as a separate province?','The separate province was formed in 1936.'),
('In which year did India gain independence from British rule?','India became independent on 15 August 1947.'),
('In which year did the Constituent Assembly adopt the Constitution of India?','The Constitution was adopted on 26 November 1949.'),
('In which year did the Constitution come into force as the basis of the Republic of India?','The Constitution came into force on 26 January 1950.')])
family(['Lok Sabha','Rajya Sabha','President','Supreme Court'],[
('The Union Council of Ministers is collectively responsible to which institution?','The Council of Ministers is collectively responsible to the Lok Sabha.'),
('Which institution is the parliamentary House formally known as the Council of States?','Rajya Sabha is the Council of States; Lok Sabha is the House of the People.'),
('Which office, together with the two Houses, constitutes the Parliament of India?','Parliament consists of the President, Rajya Sabha and Lok Sabha.'),
('Which institution stands at the apex of India’s judicial system?','The Supreme Court is India’s apex judicial body.')])
family(['Xylem','Phloem','Stomata','Chlorophyll'],[
('A plant absorbs water through its roots. Which structure conducts much of that water towards the leaves?','Xylem conducts water and dissolved minerals through the plant.'),
('Sugars made in a leaf must reach growing roots. Which tissue transports these food materials?','Phloem transports products of photosynthesis to other plant parts.'),
('Which leaf pores, regulated by guard cells, allow gas exchange and water-vapour loss?','Stomata are pores controlled by guard cells.'),
('Which green pigment absorbs light energy for photosynthesis?','Chlorophyll absorbs light energy used in photosynthesis.')])
family(['Alveoli','Nephrons','Villi','Arteries'],[
('Which structures in human lungs provide a large surface for gas exchange with blood?','Alveoli are the small air sacs where gas exchange occurs.'),
('Which kidney units filter blood and modify the filtrate to form urine?','Nephrons perform filtration and selective reabsorption in the kidneys.'),
('Which finger-like structures increase the small intestine’s absorptive surface?','Villi increase the surface for absorption of digested nutrients.'),
('Which vessels carry blood away from the heart, irrespective of its oxygen content?','Arteries carry blood away from the heart; direction defines them.')])
family(['Ampere','Volt','Ohm','Watt'],[
('An ammeter measures the rate of flow of electric charge. In which SI unit is its reading expressed?','Electric current is measured in amperes.'),
('A meter is connected across two points to measure their electric potential difference. Which SI unit is appropriate?','Potential difference is measured in volts.'),
('A component opposes current flow. Which SI unit expresses the component’s electrical resistance?','Electrical resistance is measured in ohms.'),
('An appliance rating specifies the rate at which it consumes electrical energy. Which SI unit expresses that rate?','Power, the rate of energy transfer, is measured in watts.')])
family(['Producers','Primary consumers','Secondary consumers','Decomposers'],[
('In a pond, algae make organic food using sunlight. Which ecological group do these algae belong to?','Photosynthetic algae make their own food and are producers.'),
('A caterpillar feeds directly on green leaves. Which ecological group does it occupy in that food chain?','An organism that eats a producer is a primary consumer.'),
('A frog eats grasshoppers that feed on grass. Which ecological group does the frog occupy in this chain?','The frog eats primary consumers, making it a secondary consumer.'),
('Fungi break down dead leaves and return nutrients to the soil. Which ecological group do they represent?','Decomposers break down dead organic matter and recycle nutrients.')])
family(['Neutralisation','Oxidation','Thermal decomposition','Evaporation'],[
('Dilute hydrochloric acid reacts with sodium hydroxide solution to form sodium chloride and water. Which process is illustrated?','The acid and base react to form salt and water, a neutralisation reaction.'),
('Copper is heated in air and combines with oxygen to form black copper oxide. Which process describes the addition of oxygen?','Combining with oxygen is oxidation in this reaction.'),
('A compound breaks down into simpler substances when heated strongly. Which process is described?','Breakdown of a compound through heating is thermal decomposition.'),
('Water gradually leaves a shallow dish as vapour without forming a new chemical substance. Which process is described?','The liquid changes into vapour by evaporation, a physical change.')])
family(['pH 2','pH 5','pH 7','pH 10'],[
('Four aqueous samples at about 25°C have the listed pH values. Which sample has the greatest hydrogen-ion concentration?','Lower pH means greater hydrogen-ion concentration, so pH 2 is greatest among these values.'),
('An aqueous sample at about 25°C is acidic but has a lower hydrogen-ion concentration than a sample of pH 2. Which listed value fits?','pH 5 is below neutral 7 but above 2, so it is acidic with fewer hydrogen ions than the pH 2 sample.'),
('Which listed pH corresponds to a neutral aqueous solution at about 25°C?','At about 25°C, a neutral aqueous solution has pH 7.'),
('A solution at about 25°C turns red litmus blue. Which listed pH is consistent with that observation?','A basic solution turns red litmus blue and has pH above 7; only pH 10 fits.')])
family(['Freshwater inflow','Seawater inflow','Catchment soil erosion','Organic-matter decomposition'],[
('After heavy rain, rivers entering Chilika carry more water and tend to dilute its dissolved salts. Which process most directly explains this dilution?','Freshwater entering from rivers dilutes the lagoon’s salt concentration.'),
('During a dry period, tides drive salt water through Chilika’s connection with the Bay of Bengal. Which process is described?','Seawater entering through the connecting channel is seawater inflow.'),
('Rain washes exposed soil from surrounding land into streams, which carry it towards Chilika. Which process supplies that sediment?','Catchment soil erosion releases the sediment that streams transport to the lagoon.'),
('Microorganisms break down dead plant material, releasing nutrients that can be reused by other organisms. Which process is described?','Organic-matter decomposition breaks down dead material and recycles nutrients.')])
ITEMS += [
('An ohmic resistor of 8 ohms has a potential difference of 24 volts across it. What current flows?', ['3 A','2 A','4 A','6 A'],'Ohm’s law gives I = V/R = 24/8 = 3 amperes.'),
('Two resistors of 4 ohms and 6 ohms are connected in parallel. What is their combined resistance?', ['2.4 ohms','10 ohms','5 ohms','1.2 ohms'],'For two parallel resistors, R = (4 × 6)/(4 + 6) = 24/10 = 2.4 ohms.'),
('A 60 W lamp operates for 5 hours at its rated power. How much energy does it consume?', ['0.30 kWh','0.12 kWh','0.36 kWh','0.60 kWh'],'60 W is 0.06 kW; energy = 0.06 × 5 = 0.30 kWh.')]
assert len(ITEMS)==47
