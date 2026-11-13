#!/usr/bin/env python3
"""Write data/v2/basics/gcsescience.json: the GCSE Combined Science Basics skills.

Usage: python3 -I tools/gcsescience/basics.py   (from the repo root)
British spelling, GCSE wording (control variables, relative formula mass).
"""
import json

def ws(say=None, ask=None, options=None, answer=None, then=None, hint=None, line=None):
    s = {}
    for k, v in (("say", say), ("ask", ask), ("options", options), ("answer", answer), ("then", then), ("hint", hint), ("line", line)):
        if v is not None:
            s[k] = v
    return s

SKILLS = [
  {
    "id": "gcsesciMagnification", "name": "Magnification", "sub": "Image size ÷ real size",
    "rule": "Magnification = image size ÷ real size. Put both sizes in the same unit before you divide. Magnification has no units.",
    "trick": "Cover the one you want: real size = image size ÷ magnification. 1 mm = 1000 µm, so change mm to µm by multiplying by 1000.",
    "examples": [
      {"kind": "eg", "text": "Image 20 mm, real 0.1 mm", "note": "20 ÷ 0.1 = ×200"},
      {"kind": "eg", "text": "Image 6 mm, real 30 µm", "note": "6 mm = 6000 µm. 6000 ÷ 30 = ×200"},
    ],
    "another": {"text": "A photo of your face on a big poster looks much bigger than your real face. Magnification just says how many times bigger the picture is than the real thing.", "example": "Real face: 20 cm\nPoster face: 100 cm\n100 ÷ 20 = ×5"},
    "walkthrough": {"board": "Image 9 mm, real cell 20 µm", "kind": "text", "steps": [
      ws(say="Magnification = image size ÷ real size. The sizes must be in the same unit first."),
      ws(ask="The units are different. What is 9 mm in µm?", options=["9,000 µm", "0.009 µm", "900 µm"], answer=0,
         then="1 mm is 1000 µm, so 9 mm is 9 × 1000 = 9,000 µm.", hint="Micrometres are smaller, so there are more of them: multiply by 1000.", line="9 mm = 9,000 µm"),
      ws(ask="Which sum gives the magnification?", options=["9,000 ÷ 20", "20 ÷ 9,000"], answer=0,
         then="Image size on top, real size underneath.", hint="Image ÷ real. The image is the bigger number.", line="9,000 ÷ 20"),
      ws(ask="9,000 ÷ 20 = ?", options=["450", "45", "4,500"], answer=0, then="The magnification is ×450.", line="Magnification = ×450"),
    ]},
    "questions": [
      {"stem": "An image is 18 mm long and the real object is 0.2 mm long. What is the magnification?", "options": ["×90", "×3.6", "×9"], "answer": 0, "why": "18 ÷ 0.2 = 90, so ×90."},
      {"stem": "An image is 10 mm across at ×250. What is the real size?", "options": ["2500 mm", "0.04 mm", "25 mm"], "answer": 1, "why": "Real size = image ÷ magnification = 10 ÷ 250 = 0.04 mm."},
    ],
  },
  {
    "id": "gcsesciVariables", "name": "Variables", "sub": "Independent, dependent and control",
    "rule": "The independent variable is the one you change. The dependent variable is the one you measure. Control variables are everything else you keep the same so the test is fair.",
    "trick": "Ask three questions: what did they change, what did they measure, what did they keep the same?",
    "examples": [
      {"kind": "eg", "text": "Change the length of a wire, measure its resistance", "note": "Independent: length. Dependent: resistance. Control: thickness and material of the wire."},
    ],
    "another": {"text": "Imagine racing toy cars down a ramp to see which ramp height is fastest. You change the height. You time the car. You use the same car every time, or the race is not fair.", "example": "Changed: ramp height\nMeasured: time\nKept the same: the car"},
    "walkthrough": {"board": "A student grows cress seedlings with a lamp at different distances and measures the height of each seedling after 7 days.", "kind": "text", "steps": [
      ws(say="Every investigation has a variable you change, one you measure, and the ones you keep the same."),
      ws(ask="What did the student change on purpose?", options=["The lamp distance", "The seedling height"], answer=0,
         then="That is the independent variable.", hint="Which one did they choose before starting?", line="Independent: lamp distance"),
      ws(ask="What did they measure?", options=["The seedling height", "The number of days"], answer=0,
         then="That is the dependent variable.", line="Dependent: seedling height"),
      ws(ask="Which is a control variable?", options=["The number of days", "The lamp distance", "The seedling height"], answer=0,
         then="Every seedling grows for 7 days, so the time is kept the same.", hint="Look for something the same for every seedling.", line="Control: time, type of seed"),
    ]},
    "questions": [
      {"stem": "A student times how long seeds take to germinate at different temperatures. What is the dependent variable?", "options": ["The temperature", "The time to germinate", "The type of seed"], "answer": 1, "why": "The time is what is measured, so it is the dependent variable."},
      {"stem": "A student tests how light intensity affects the rate of photosynthesis in pondweed. Which is a control variable?", "options": ["The distance of the lamp", "The bubbles counted each minute", "The temperature of the water"], "answer": 2, "why": "Temperature also affects the rate, so it must be kept the same. The lamp distance is the independent variable."},
    ],
  },
  {
    "id": "gcsesciRelativeMass", "name": "Relative formula mass", "sub": "Add up every atom",
    "rule": "The relative formula mass (Mr) is the sum of the relative atomic masses (Ar) of every atom in the formula.",
    "trick": "A small number after a symbol counts that atom only. A number after a bracket multiplies everything inside the bracket.",
    "examples": [
      {"kind": "eg", "text": "H₂O (H = 1, O = 16)", "note": "2 × 1 + 16 = 18"},
      {"kind": "eg", "text": "Ca(OH)₂ (Ca = 40, O = 16, H = 1)", "note": "40 + 2 × (16 + 1) = 74"},
    ],
    "another": {"text": "Think of a fruit bowl. An apple weighs 10 and a banana weighs 20. A bowl with 2 apples and 1 banana weighs 10 + 10 + 20 = 40. Mr is the same: add up the weight of every atom.", "example": "2 apples + 1 banana\n10 + 10 + 20 = 40"},
    "walkthrough": {"board": "Mr of H₂SO₄ (H = 1, S = 32, O = 16)", "kind": "math", "steps": [
      ws(say="Count every atom in the formula, then add up their relative atomic masses."),
      ws(ask="How many hydrogen atoms are there?", options=["2", "1", "4"], answer=0, then="The small 2 after H means two hydrogens: 2 × 1 = 2.", hint="Look at the small number after H.", line="H: 2 × 1 = 2"),
      ws(ask="Sulfur has no small number. How much does it add?", options=["32", "64"], answer=0, then="One sulfur atom: 32.", line="S: 1 × 32 = 32"),
      ws(ask="O₄ means four oxygens. 4 × 16 = ?", options=["64", "20", "48"], answer=0, then="64.", line="O: 4 × 16 = 64"),
      ws(ask="2 + 32 + 64 = ?", options=["98", "96", "100"], answer=0, then="The Mr of sulfuric acid is 98.", line="Mr = 98"),
    ]},
    "questions": [
      {"stem": "What is the Mr of NaCl? (Na = 23, Cl = 35.5)", "options": ["58.5", "12.5", "47"], "answer": 0, "why": "23 + 35.5 = 58.5."},
      {"stem": "What is the Mr of CH₄? (C = 12, H = 1)", "options": ["13", "16", "48"], "answer": 1, "why": "12 + 4 × 1 = 16."},
    ],
  },
  {
    "id": "gcsesciBalancing", "name": "Balancing equations", "sub": "Same atoms on both sides",
    "rule": "Atoms are not made or destroyed, so a balanced equation has the same number of each type of atom on both sides. Balance by putting big numbers in front of formulas.",
    "trick": "Never change the small numbers inside a formula; that changes the substance. Only add big numbers in front, and balance one element at a time.",
    "examples": [
      {"kind": "good", "text": "2H₂ + O₂ → 2H₂O", "note": "4 H and 2 O on each side."},
      {"kind": "bad", "text": "H₂ + O₂ → H₂O₂", "note": "Changing H₂O to H₂O₂ makes a different substance."},
    ],
    "another": {"text": "Building with blocks: if you start with 4 red blocks and 2 blue ones, the model you build must use exactly 4 red and 2 blue. Nothing appears and nothing vanishes.", "example": "Start: 4 red, 2 blue\nEnd: 4 red, 2 blue"},
    "walkthrough": {"board": "Mg + HCl → MgCl₂ + H₂", "kind": "math", "steps": [
      ws(say="Count each type of atom on both sides. Fix one element at a time with a big number in front."),
      ws(ask="How many Cl atoms are on the right?", options=["2", "1"], answer=0, then="MgCl₂ has two chlorines, but HCl on the left has only one.", line="Right: 2 Cl, Left: 1 Cl"),
      ws(ask="What goes in front of HCl?", options=["2", "3"], answer=0, then="2HCl gives 2 Cl on the left.", hint="You need 2 chlorines on the left.", line="Mg + 2HCl → MgCl₂ + H₂"),
      ws(ask="Now count hydrogen: 2HCl has 2 H, and H₂ has 2 H. Is it balanced?", options=["Yes", "No"], answer=0, then="Mg, Cl and H all match, so the equation is balanced.", line="Balanced ✓"),
    ]},
    "questions": [
      {"stem": "Which number balances __Na + Cl₂ → 2NaCl?", "options": ["1", "2", "4"], "answer": 1, "why": "2NaCl has 2 Na, so 2Na is needed on the left."},
      {"stem": "Which equation is balanced?", "options": ["CH₄ + O₂ → CO₂ + 2H₂O", "CH₄ + 2O₂ → CO₂ + 2H₂O", "CH₄ + 2O₂ → CO₂ + H₂O"], "answer": 1, "why": "CH₄ + 2O₂ → CO₂ + 2H₂O has 1 C, 4 H and 4 O on each side."},
    ],
  },
  {
    "id": "gcsesciSubstitute", "name": "Using a physics equation", "sub": "Put the numbers in, then work it out",
    "rule": "Write the equation, put each number in place of its word, then calculate. Check the units are the ones the equation expects, such as kg, m and s.",
    "trick": "Do any squaring first. In kinetic energy = 0.5 × m × v², square the speed before you multiply.",
    "examples": [
      {"kind": "eg", "text": "V = I × R, I = 2 A, R = 6 Ω", "note": "V = 2 × 6 = 12 V"},
      {"kind": "eg", "text": "KE = 0.5 × m × v², m = 4 kg, v = 3 m/s", "note": "3² = 9, 0.5 × 4 × 9 = 18 J"},
    ],
    "another": {"text": "An equation is like a recipe card with gaps. The question tells you what goes in each gap. Fill them in, then follow the recipe.", "example": "power = energy ÷ time\nenergy 600 J, time 20 s\n600 ÷ 20 = 30 W"},
    "walkthrough": {"board": "KE = 0.5 × m × v², m = 6 kg, v = 4 m/s", "kind": "math", "steps": [
      ws(say="Put each number in place of its letter, then work it out in the right order."),
      ws(ask="Which do you work out first?", options=["v² = 4²", "0.5 × 6"], answer=0, then="Powers come before multiplying.", hint="Squaring comes first.", line="v² = 4² = 16"),
      ws(ask="0.5 × 6 × 16 = ?", options=["48", "12", "24"], answer=0, then="0.5 × 6 = 3, and 3 × 16 = 48.", line="KE = 0.5 × 6 × 16 = 48"),
      ws(ask="Energy is measured in...", options=["joules, J", "newtons, N", "watts, W"], answer=0, then="The kinetic energy is 48 J.", line="KE = 48 J"),
    ]},
    "questions": [
      {"stem": "Power = potential difference × current. What is the power when V = 12 V and I = 3 A?", "options": ["4 W", "15 W", "36 W"], "answer": 2, "why": "12 × 3 = 36 W."},
      {"stem": "Density = mass ÷ volume. A 40 g object has a volume of 8 cm³. What is its density?", "options": ["5 g/cm³", "320 g/cm³", "0.2 g/cm³"], "answer": 0, "why": "40 ÷ 8 = 5 g/cm³."},
    ],
  },
  {
    "id": "gcsesciPrefixes", "name": "Units and prefixes", "sub": "kilo, milli and minutes",
    "rule": "Physics equations use standard units: J, W, A, m, kg and s. Convert first. Kilo (k) means × 1000 and milli (m) means ÷ 1000.",
    "trick": "kW to W: × 1000. mA to A: ÷ 1000. g to kg: ÷ 1000. Minutes to seconds: × 60.",
    "examples": [
      {"kind": "eg", "text": "5 kW", "note": "5 × 1000 = 5000 W"},
      {"kind": "eg", "text": "500 mA", "note": "500 ÷ 1000 = 0.5 A"},
    ],
    "another": {"text": "A kilo is a big bag holding 1000 little ones. A milli is one tiny crumb, a thousandth of the whole. Going from bags to little ones, you get more, so multiply.", "example": "2 kg = 2000 g\n2000 mA = 2 A"},
    "walkthrough": {"board": "A 1.5 kW heater runs for 2 minutes. Energy = power × time", "kind": "text", "steps": [
      ws(say="Convert to watts and seconds before using the equation."),
      ws(ask="1.5 kW in watts is...", options=["1500 W", "0.0015 W", "150 W"], answer=0, then="Kilo means × 1000.", hint="Kilo means a thousand.", line="1.5 kW = 1500 W"),
      ws(ask="2 minutes in seconds is...", options=["120 s", "200 s", "2 s"], answer=0, then="60 seconds in each minute.", line="2 min = 120 s"),
      ws(ask="1500 × 120 = ?", options=["180,000 J", "180 J", "3,000 J"], answer=0, then="The heater transfers 180,000 J.", line="E = 1500 × 120 = 180,000 J"),
    ]},
    "questions": [
      {"stem": "What is 750 g in kg?", "options": ["750,000 kg", "0.75 kg", "7.5 kg"], "answer": 1, "why": "Divide by 1000: 750 ÷ 1000 = 0.75 kg."},
      {"stem": "What is 4 kJ in J?", "options": ["4000 J", "0.004 J", "400 J"], "answer": 0, "why": "Kilo means × 1000, so 4 kJ = 4000 J."},
    ],
  },
  {
    "id": "gcsesciRearrange", "name": "Rearranging an equation", "sub": "Get the one you want on its own",
    "rule": "If the quantity you want is multiplied by something, divide by it on both sides. For A = B × C: B = A ÷ C and C = A ÷ B.",
    "trick": "Check by putting your answer back in: B × C should give A again. If it does not, you divided the wrong way round.",
    "examples": [
      {"kind": "eg", "text": "distance = speed × time; find speed", "note": "speed = distance ÷ time"},
      {"kind": "eg", "text": "F = m × a; find m", "note": "m = F ÷ a"},
    ],
    "another": {"text": "If 3 bags hold 12 sweets in total, each bag holds 12 ÷ 3 = 4. Total = number of bags × sweets in each, so to find one of the two you divide the total by the other.", "example": "12 = 3 × ?\n? = 12 ÷ 3 = 4"},
    "walkthrough": {"board": "F = m × a. F = 600 N, a = 2 m/s². Find m.", "kind": "math", "steps": [
      ws(say="m is multiplied by a. To get m on its own, divide both sides by a."),
      ws(ask="Which is the rearranged equation?", options=["m = F ÷ a", "m = F × a", "m = a ÷ F"], answer=0, then="Divide both sides by a.", hint="Undo × a by dividing by a.", line="m = F ÷ a"),
      ws(ask="600 ÷ 2 = ?", options=["300", "1200", "602"], answer=0, then="The mass is 300 kg.", line="m = 600 ÷ 2 = 300 kg"),
      ws(ask="Check: 300 × 2 = ?", options=["600", "150"], answer=0, then="600 N, the force in the question, so 300 kg is right.", line="Check: 300 × 2 = 600 ✓"),
    ]},
    "questions": [
      {"stem": "distance = speed × time. A car goes 150 m at 10 m/s. How long does it take?", "options": ["1500 s", "15 s", "160 s"], "answer": 1, "why": "time = distance ÷ speed = 150 ÷ 10 = 15 s."},
      {"stem": "V = I × R. Which gives R?", "options": ["R = V × I", "R = I ÷ V", "R = V ÷ I"], "answer": 2, "why": "Divide both sides by I: R = V ÷ I."},
    ],
  },
  {
    "id": "gcsesciResultant", "name": "Resultant force", "sub": "Add or subtract forces in a line",
    "rule": "The resultant force is the single force that has the same effect as all the forces together. Forces in the same direction add. Forces in opposite directions subtract: bigger minus smaller, acting in the direction of the bigger one. If they are equal, the resultant is zero and the forces are balanced.",
    "trick": "A zero resultant does not mean stopped. It means no change: something still stays still, and something moving keeps a steady speed.",
    "examples": [
      {"kind": "eg", "text": "20 N right and 5 N right", "note": "Same direction, so add: 25 N to the right"},
      {"kind": "eg", "text": "20 N right and 5 N left", "note": "Opposite, so subtract: 15 N to the right"},
    ],
    "another": {"text": "In a tug of war, if one team pulls harder the rope moves their way, and only the extra pull counts. If both teams pull equally hard, the rope does not move at all.", "example": "Team A: 500 N left\nTeam B: 450 N right\n50 N to the left"},
    "walkthrough": {"board": "Driving force 900 N forwards. Air resistance 400 N and friction 200 N backwards.", "kind": "text", "steps": [
      ws(ask="Two forces act backwards. What do they add up to?", options=["600 N", "200 N", "800 N"], answer=0, then="Forces in the same direction add.", hint="400 + 200.", line="Backwards: 400 + 200 = 600 N"),
      ws(ask="Forwards and backwards are opposite directions. What do you do?", options=["Subtract", "Add"], answer=0, then="Bigger minus smaller.", hint="Opposite forces work against each other.", line="900 − 600"),
      ws(ask="900 − 600 = ?", options=["300 N", "1,500 N"], answer=0, line="Resultant = 300 N"),
      ws(ask="Which way does the resultant force act?", options=["Forwards", "Backwards"], answer=0, then="It acts the way of the bigger force, so the car speeds up.", hint="Which is bigger: the 900 N forwards or the 600 N backwards?", line="300 N forwards: the car speeds up"),
      ws(ask="Later the backwards forces reach 900 N. What happens to the car?", options=["It keeps a steady speed", "It stops at once"], answer=0, then="900 − 900 = 0. With a zero resultant force the motion does not change.", line="900 − 900 = 0: steady speed"),
    ]},
    "questions": [
      {"stem": "Two people push a trolley the same way with forces of 30 N and 20 N. What is the resultant force?", "options": ["10 N", "50 N", "600 N"], "answer": 1, "why": "Forces in the same direction add: 30 + 20 = 50 N."},
      {"stem": "A skydiver's weight is 700 N down and the air resistance is 700 N up. What happens to her speed?", "options": ["It increases", "She stops falling", "It stays the same"], "answer": 2, "why": "700 − 700 = 0. A zero resultant force means no change, so she keeps falling at a steady speed."},
    ],
  },
  {
    "id": "gcsesciAtomNumbers", "name": "Protons, neutrons and electrons", "sub": "From atomic number and mass number",
    "rule": "The atomic number is the number of protons. In an atom the number of electrons is the same as the number of protons, because the atom has no overall charge. The mass number is protons + neutrons, so neutrons = mass number − atomic number. Isotopes of an element have the same number of protons but different numbers of neutrons.",
    "trick": "The mass number is the bigger number. Big minus small gives the neutrons.",
    "examples": [
      {"kind": "eg", "text": "Fluorine: atomic number 9, mass number 19", "note": "9 protons, 9 electrons, 19 − 9 = 10 neutrons"},
      {"kind": "eg", "text": "Carbon-12 and carbon-14", "note": "Both have 6 protons. 6 and 8 neutrons, so they are isotopes."},
    ],
    "another": {"text": "Think of a sports team. The atomic number is the shirt colour: it tells you which team, or element, you are. The mass number counts everyone in the team photo, players and substitutes. Take away the players to find the substitutes.", "example": "Team photo (mass number): 27\nPlayers (protons): 13\nSubstitutes (neutrons): 27 − 13 = 14"},
    "walkthrough": {"board": "Aluminium: atomic number 13, mass number 27", "kind": "text", "steps": [
      ws(say="The atomic number counts protons. The mass number counts protons and neutrons together."),
      ws(ask="How many protons does an aluminium atom have?", options=["13", "27", "14"], answer=0, then="The atomic number is the number of protons.", hint="Use the smaller number.", line="Protons: 13"),
      ws(ask="How many electrons does the atom have?", options=["13", "14", "0"], answer=0, then="An atom is neutral, so electrons match protons.", line="Electrons: 13"),
      ws(ask="Which sum gives the neutrons?", options=["27 − 13", "27 + 13", "13 − 27"], answer=0, then="Mass number minus atomic number.", hint="Protons + neutrons = 27.", line="Neutrons: 27 − 13"),
      ws(ask="27 − 13 = ?", options=["14", "40", "13"], answer=0, then="An aluminium atom has 14 neutrons.", line="Neutrons: 14"),
    ]},
    "questions": [
      {"stem": "Potassium has atomic number 19 and mass number 39. How many neutrons does a potassium atom have?", "options": ["20", "19", "58"], "answer": 0, "why": "39 − 19 = 20 neutrons."},
      {"stem": "Chlorine-35 and chlorine-37 are isotopes. What is different about them?", "options": ["The number of neutrons", "The number of protons", "The number of electrons"], "answer": 0, "why": "Isotopes of one element have the same protons and electrons but different numbers of neutrons."},
    ],
  },
  {
    "id": "gcsesciElectronShells", "name": "Electron shells", "sub": "2, then 8, then 8",
    "rule": "Electrons fill shells from the inside out. The first shell holds up to 2 electrons, and the second and third shells hold up to 8 each, for the first 20 elements. The number of electrons in the outer shell is the group number, and the number of shells is the period number. Group 0 atoms have a full outer shell, which makes them unreactive.",
    "trick": "Keep taking away 2, then 8, then 8 from the number of electrons until nothing is left. The pieces are the configuration.",
    "examples": [
      {"kind": "eg", "text": "Oxygen, 8 electrons", "note": "2,6: group 6, period 2"},
      {"kind": "eg", "text": "Calcium, 20 electrons", "note": "2,8,8,2: group 2, period 4"},
    ],
    "another": {"text": "Picture seats on a bus. The front row has only 2 seats, the next rows have 8 each. Everyone sits as near the front as they can, so you fill the front row first.", "example": "11 people\nFront row: 2\nNext row: 8\nThird row: 1\n2,8,1"},
    "walkthrough": {"board": "Sulfur, atomic number 16", "kind": "text", "steps": [
      ws(say="The atomic number gives the electrons: sulfur has 16. Fill the shells 2, then 8, then 8."),
      ws(ask="How many electrons go in the first shell?", options=["2", "8", "16"], answer=0, then="The first shell is full with 2.", line="Shell 1: 2 (14 left)"),
      ws(ask="The second shell holds up to 8. How many are left after that?", options=["6", "8", "4"], answer=0, then="14 − 8 = 6 for the third shell.", hint="14 − 8.", line="Shell 2: 8 (6 left)"),
      ws(ask="So what is the electron configuration of sulfur?", options=["2,8,6", "2,6,8", "8,8"], answer=0, line="Sulfur: 2,8,6"),
      ws(ask="Which group is sulfur in?", options=["Group 6", "Group 3", "Group 8"], answer=0, then="It has 6 outer electrons, and 3 shells put it in period 3.", hint="Count the electrons in the outer shell.", line="Group 6, period 3"),
    ]},
    "questions": [
      {"stem": "What is the electron configuration of aluminium, atomic number 13?", "options": ["2,8,3", "2,11", "8,2,3"], "answer": 0, "why": "2 + 8 + 3 = 13. The second shell holds only 8, so 2,11 is wrong."},
      {"stem": "An atom has the configuration 2,8,7. Which group is it in?", "options": ["Group 7", "Group 3", "Group 17"], "answer": 0, "why": "It has 7 electrons in its outer shell, so it is in group 7."},
    ],
  },
  {
    "id": "gcsesciEfficiency", "name": "Efficiency", "sub": "Useful out ÷ total in",
    "rule": "Efficiency = useful output energy ÷ total input energy. The same works with power. Multiply by 100 to give a percentage. Energy is never destroyed, so total input = useful output + wasted energy, and the wasted energy usually spreads into the surroundings as heat.",
    "trick": "Efficiency can never be more than 1, or 100%. If your answer is bigger, you divided the wrong way round.",
    "examples": [
      {"kind": "eg", "text": "200 J in, 50 J useful", "note": "50 ÷ 200 = 0.25, which is 25%"},
      {"kind": "eg", "text": "400 J in, 300 J useful", "note": "Wasted: 400 − 300 = 100 J"},
    ],
    "another": {"text": "Imagine pouring a jug of juice into a cup with a crack in it. Some juice ends up in the cup to drink, and some leaks onto the table. Efficiency is how much of the jug actually ended up in the cup.", "example": "Jug: 10 sips\nIn the cup: 8 sips\n8 ÷ 10 = 0.8, or 80%"},
    "walkthrough": {"board": "A lamp is supplied with 80 J. It gives out 20 J as light and the rest as heat.", "kind": "text", "steps": [
      ws(say="Efficiency = useful output energy ÷ total input energy. First decide which energy is useful."),
      ws(ask="A lamp is for lighting. Which energy is useful?", options=["The 20 J of light", "The heat"], answer=0, then="The heat is wasted.", line="Useful: 20 J, total: 80 J"),
      ws(ask="Which sum gives the efficiency?", options=["20 ÷ 80", "80 ÷ 20"], answer=0, then="Useful on top, total underneath.", hint="The answer must be less than 1.", line="20 ÷ 80"),
      ws(ask="20 ÷ 80 = ?", options=["0.25", "4", "0.4"], answer=0, then="As a percentage that is 25%.", line="Efficiency = 0.25 = 25%"),
      ws(ask="How much energy is wasted?", options=["60 J", "100 J", "20 J"], answer=0, then="80 − 20 = 60 J, which heats the surroundings.", line="Wasted: 80 − 20 = 60 J"),
    ]},
    "questions": [
      {"stem": "A kettle is supplied with 2,000 J and 1,800 J heats the water. What is its efficiency?", "options": ["0.9", "1.1", "0.2"], "answer": 0, "why": "1,800 ÷ 2,000 = 0.9, which is 90%."},
      {"stem": "A motor has 600 J in and is 0.5 efficient. How much energy is wasted?", "options": ["300 J", "600 J", "1,200 J"], "answer": 0, "why": "Useful = 0.5 × 600 = 300 J, so 600 − 300 = 300 J is wasted."},
    ],
  },
  {
    "id": "gcsesciCircuits", "name": "Series and parallel", "sub": "One path or several",
    "rule": "A series circuit has one path. The current is the same everywhere, the potential difference of the supply is shared between the components, and the total resistance is the sum of the resistances. A parallel circuit has more than one path. Each branch gets the full potential difference of the supply, and the current splits between the branches, then joins up again.",
    "trick": "Series: same current, shared p.d. Parallel: same p.d., shared current.",
    "examples": [
      {"kind": "eg", "text": "3 Ω and 5 Ω in series", "note": "Total resistance = 3 + 5 = 8 Ω"},
      {"kind": "eg", "text": "A 6 V battery with two lamps in parallel", "note": "Each lamp has 6 V across it"},
    ],
    "another": {"text": "A series circuit is one long corridor: everyone walks through every room, one after another. A parallel circuit is a hall with several doors: the crowd splits up, then meets again on the other side.", "example": "Corridor: same people in every room\nDoors: the crowd splits"},
    "walkthrough": {"board": "A 12 V battery is in series with two identical lamps. Then the lamps are rewired in parallel.", "kind": "text", "steps": [
      ws(say="First the series circuit: one path, so everything goes through both lamps."),
      ws(ask="0.4 A leaves the battery. What current flows through the second lamp?", options=["0.4 A", "0.2 A", "0.8 A"], answer=0, then="In series the current is the same everywhere.", line="Series: 0.4 A through each lamp"),
      ws(ask="The lamps are identical. What p.d. is across each one?", options=["6 V", "12 V", "24 V"], answer=0, then="The 12 V is shared: 6 V each.", hint="The supply p.d. is shared in series.", line="Series: 6 V + 6 V = 12 V"),
      ws(ask="Now in parallel. What p.d. is across each lamp?", options=["12 V", "6 V"], answer=0, then="Each branch is connected straight across the battery.", line="Parallel: 12 V across each lamp"),
      ws(ask="In parallel, 0.5 A flows in each branch. What current leaves the battery?", options=["1 A", "0.5 A", "0.25 A"], answer=0, then="The branch currents add up: 0.5 + 0.5 = 1 A.", line="Parallel: 0.5 + 0.5 = 1 A"),
    ]},
    "questions": [
      {"stem": "Resistors of 2 Ω, 3 Ω and 5 Ω are in series. What is the total resistance?", "options": ["10 Ω", "30 Ω", "5 Ω"], "answer": 0, "why": "In series the resistances add: 2 + 3 + 5 = 10 Ω."},
      {"stem": "Two lamps are in parallel with a 9 V supply. What is the p.d. across each lamp?", "options": ["9 V", "4.5 V", "18 V"], "answer": 0, "why": "Each parallel branch gets the full supply p.d."},
    ],
  },
  {
    "id": "gcsesciWaves", "name": "Describing waves", "sub": "Amplitude, wavelength, frequency, period",
    "rule": "Amplitude is the biggest distance a point moves from its rest position. Wavelength is the distance from one point on a wave to the same point on the next wave, such as crest to crest. Frequency is the number of waves passing a point each second, in hertz (Hz). Period = 1 ÷ frequency, and wave speed = frequency × wavelength.",
    "trick": "Wavelength and amplitude are lengths, so they are in metres. Frequency counts waves per second, so it is in Hz.",
    "examples": [
      {"kind": "eg", "text": "Frequency 10 Hz, wavelength 2 m", "note": "Wave speed = 10 × 2 = 20 m/s"},
      {"kind": "eg", "text": "Frequency 4 Hz", "note": "Period = 1 ÷ 4 = 0.25 s"},
    ],
    "another": {"text": "Think of a skipping rope being flicked up and down. How high the rope goes is the amplitude. The gap from one hump to the next is the wavelength. How many humps you make each second is the frequency.", "example": "High flick: big amplitude\nFast flicking: high frequency"},
    "walkthrough": {"board": "Water waves: 5 crests pass a buoy in 1 second, and the crests are 3 m apart.", "kind": "text", "steps": [
      ws(say="Pick out the frequency and the wavelength first, then use the equations."),
      ws(ask="What is the frequency?", options=["5 Hz", "3 Hz", "15 Hz"], answer=0, then="5 waves pass each second.", hint="Frequency counts waves per second.", line="Frequency: 5 Hz"),
      ws(ask="What is the wavelength?", options=["3 m", "5 m"], answer=0, then="Crest to crest is one wavelength.", line="Wavelength: 3 m"),
      ws(ask="Wave speed = frequency × wavelength = ?", options=["15 m/s", "8 m/s", "0.6 m/s"], answer=0, then="5 × 3 = 15 m/s.", line="Speed = 5 × 3 = 15 m/s"),
      ws(ask="Period = 1 ÷ frequency = ?", options=["0.2 s", "5 s", "0.5 s"], answer=0, then="1 ÷ 5 = 0.2 s for each wave to pass.", line="Period = 1 ÷ 5 = 0.2 s"),
    ]},
    "questions": [
      {"stem": "A sound wave has a frequency of 200 Hz and a wavelength of 1.5 m. What is its speed?", "options": ["300 m/s", "133 m/s", "201.5 m/s"], "answer": 0, "why": "Wave speed = 200 × 1.5 = 300 m/s."},
      {"stem": "What is the distance from one crest to the next crest called?", "options": ["The wavelength", "The amplitude", "The frequency"], "answer": 0, "why": "Crest to crest is one wavelength. Amplitude is measured from the rest position."},
    ],
  },
  {
    "id": "gcsesciMotionGraphs", "name": "Motion graphs", "sub": "Gradient and area",
    "rule": "On a distance-time graph the gradient is the speed: a steeper line is faster and a horizontal line means stopped. On a velocity-time graph the gradient is the acceleration: a horizontal line means a steady speed. The area under a velocity-time graph is the distance travelled.",
    "trick": "Always read the label on the up axis first. The same flat line means stopped on a distance-time graph but steady speed on a velocity-time graph.",
    "examples": [
      {"kind": "eg", "text": "Distance-time: 40 m in 8 s, straight line", "note": "Gradient = 40 ÷ 8 = 5 m/s"},
      {"kind": "eg", "text": "Velocity-time: steady 6 m/s for 10 s", "note": "Area = 6 × 10 = 60 m"},
    ],
    "another": {"text": "Imagine drawing your walk to school. If the line on the distance graph goes flat, you stopped to tie your shoelace. If it gets steeper, you started to run.", "example": "Flat: stopped\nSteep: running\nGentle: walking"},
    "walkthrough": {"board": "Velocity-time graph: a bike goes from 0 to 8 m/s in 4 s, then stays at 8 m/s for 6 s.", "kind": "text", "steps": [
      ws(say="This is a velocity-time graph, so the gradient is acceleration and the area is distance."),
      ws(ask="What is the gradient of the first part?", options=["2 m/s²", "32 m/s²", "0.5 m/s²"], answer=0, then="Change in velocity ÷ time = 8 ÷ 4.", hint="Rise ÷ run: 8 up, 4 along.", line="Acceleration = 8 ÷ 4 = 2 m/s²"),
      ws(ask="The second part is a flat line. What is the bike doing?", options=["Moving at a steady 8 m/s", "Stopped"], answer=0, then="On a velocity-time graph, flat means steady speed.", line="Then: steady 8 m/s"),
      ws(ask="The first part is a triangle. Its area, 0.5 × 4 × 8, is...", options=["16 m", "32 m", "12 m"], answer=0, line="Part 1 distance: 16 m"),
      ws(ask="The second part is a rectangle, 6 × 8. What is the total distance?", options=["64 m", "48 m", "80 m"], answer=0, then="16 + 48 = 64 m.", line="Total: 16 + 48 = 64 m"),
    ]},
    "questions": [
      {"stem": "On a distance-time graph, a straight line goes from 0 m to 100 m in 20 s. What is the speed?", "options": ["5 m/s", "2,000 m/s", "0.2 m/s"], "answer": 0, "why": "The gradient is the speed: 100 ÷ 20 = 5 m/s."},
      {"stem": "What does the area under a velocity-time graph show?", "options": ["The distance travelled", "The acceleration", "The speed"], "answer": 0, "why": "Area under a velocity-time graph is distance. The gradient is the acceleration."},
    ],
  },
]

with open("data/v2/basics/gcsescience.json", "w") as f:
    json.dump(SKILLS, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"wrote {len(SKILLS)} skills -> data/v2/basics/gcsescience.json")
