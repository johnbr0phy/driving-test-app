"""Additional original items with individual distractors."""
MORE = {'epa609Equipment': [('recoveronly',
                      'MACS p10:A Further Word on Recovery-only Equipment',
                      'What function distinguishes a recovery-only machine from equipment that also recycles '
                      'the extracted refrigerant?',
                      'Removal without cleaning for reuse',
                      'Cleaning without removal from the vehicle',
                      'Recharging without measuring extracted oil',
                      'Separation of mixed refrigerants into components',
                      'Recovery-only equipment extracts refrigerant but does not recycle it. The recovered '
                      'fluid needs the required processing before reuse.'),
                     ('hosevalves',
                      'MACS p8:Service Equipment Hoses',
                      'Where should a service hose shutoff valve be located to limit refrigerant released '
                      'during disconnection?',
                      'Within 12 inches of the vehicle end',
                      'At the center of a six-foot hose',
                      'Within 12 inches of the manifold end',
                      'Anywhere upstream of the tank valve',
                      'The manual places shutoff valves within 12 inches of the vehicle end, often in the '
                      'coupler. This minimizes the volume that can escape when that connection is opened.'),
                     ('eyeprotection',
                      'MACS p11:Safety Precautions item1',
                      'Which protection is needed while connecting equipment where pressurized refrigerant '
                      'could spray toward the technician?',
                      'Appropriate eye protection',
                      'Ordinary prescription lenses only',
                      'Hearing protection in place of eyewear',
                      'Face covering without eye coverage',
                      'The manual requires eye protection when servicing A/C systems or handling '
                      'refrigerant. Ordinary lenses or a covering that leaves the eyes exposed do not '
                      'establish adequate protection.'),
                     ('j2099purity',
                      'MACS p7:Purity of Recycled HFC-134a',
                      'Which standard sets the purity that HFC-134a recycled on site must meet?',
                      'SAE J2099',
                      'SAE J1991',
                      'AHRI 700',
                      'SAE J2788',
                      'MACS gives SAE J2099 as the purity standard for HFC-134a recycled on site. J1991 is '
                      'the CFC-12 recycling purity standard, AHRI 700 applies to reclaimed refrigerant, and '
                      'J2788 covers the equipment rather than the purity limit.'),
                     ('powerisolation',
                      'MACS p11:Safety Precautions item13',
                      'Before routine machine maintenance, what is the normal electrical precaution unless '
                      'its instructions direct otherwise?',
                      'Unplug the unit',
                      'Leave power on with recovery paused',
                      'Turn the display brightness to zero',
                      'Connect the grounding lead after opening it',
                      'The manual normally requires unplugging recovery equipment before maintenance. '
                      'Pausing a refrigerant cycle does not disconnect electrical power.'),
                     ('extensioncord',
                      'MACS p11:Safety Precautions item14',
                      'If an extension cord is unavoidable for recovery equipment, which specification meets '
                      "the manual's minimum guidance?",
                      'Short grounded three-wire 14 AWG cord',
                      'Short two-wire 14 AWG cord',
                      'Long grounded three-wire 18 AWG cord',
                      'Two-wire 18 AWG cord with an adapter',
                      'The manual specifies minimum length, three wires, grounding and at least 14 AWG '
                      'conductor size. An adapter does not turn a two-wire cord into a grounded three-wire '
                      'supply.'),
                     ('tankheat',
                      'MACS p45:Purchase Storage and Transport',
                      'Why must a refrigerant cylinder be protected from excessive heat during storage or '
                      'transport?',
                      'Liquid expansion reduces vapor space',
                      'Heat increases the cylinder internal volume',
                      'Warm vapor condenses into more liquid',
                      'Heat raises the relief valve opening pressure',
                      'The manual warns that excessive heating can make a cylinder liquid-full. Space for '
                      'expansion is therefore important even when the cylinder was initially filled '
                      'appropriately.'),
                     ('j2788chargeaccuracy',
                      'Appendix C9.1; MACS p27:SAE J2788 measurement accuracy',
                      "How closely must SAE J2788 equipment recharge a system to the vehicle maker's "
                      'specification?',
                      'Within 15 g (0.50 oz)',
                      'Within 30 g (1.0 oz)',
                      'Within 20 mL (0.7 oz)',
                      'Within 3 g (0.1 oz)',
                      'J2788 equipment must indicate and recharge within 15 g (0.50 oz) of the vehicle '
                      "maker's specification. The 30 g tolerance applies to the displayed recovered amount, "
                      "20 mL to measuring separated oil, and 3 g to the laboratory's weighing during "
                      'recovery tests.'),
                     ('equipmentlabel',
                      '82.36(a);Appendix C3.3-3.4',
                      'What identifies compliant R-134a recovery and recycling equipment rather than merely '
                      "a manufacturer's performance claim?",
                      'Certification by an approved testing organization',
                      'Warranty covering automotive service work',
                      'Label showing recovery speed alone',
                      'Manufacturer membership in an industry group',
                      'Section 82.36 requires certification by EPA or an approved independent '
                      'standards-testing organization. A warranty or advertised recovery rate is not that '
                      'certification.'),
                     ('fuelport',
                      'MACS p11:Safety Precautions item16',
                      'Which connection can accept a CFC-12 hose coupling despite belonging to another '
                      'vehicle system?',
                      'Fuel-injection test port',
                      'Cooling-system pressure cap',
                      'Brake hydraulic bleeder',
                      'Power-steering reservoir inlet',
                      'Some fuel-injection service ports share dimensions with a CFC-12 service port. '
                      'Mechanical fit alone does not establish that the hose is connected to the refrigerant '
                      'circuit.'),
                     ('refillapproval',
                      'MACS p11:Safety Precautions item10',
                      'A supply cylinder has been emptied. What determines whether it can receive '
                      'refrigerant during recovery?',
                      'Approval for refilling',
                      'Its previous refrigerant purity',
                      'Its original net contents',
                      'Its remaining label legibility',
                      'An empty supply cylinder is not automatically a recovery container. It must be '
                      'approved for refilling; the prior contents or their purity do not establish that '
                      'approval.'),
                     ('airentry',
                      'Appendix C6.2.1',
                      'In which direction can gas flow through a leaking service hose while recovery creates '
                      'a vacuum?',
                      'Surrounding air into the hose',
                      'Refrigerant out to the atmosphere',
                      'Equal flow inward and outward',
                      'No flow below atmospheric pressure',
                      'The standard links hose and seal maintenance to preventing excess air entering during '
                      'recovery. Under vacuum, the pressure difference can pull surrounding air inward.'),
                     ('hotdecomposition',
                      'MACS p11:Safety Precautions item3',
                      'Which hazard can result when refrigerant contacts hot metal during vehicle A/C '
                      'service?',
                      'Hazardous chemical decomposition',
                      'Galvanic corrosion of service couplers',
                      'Ultraviolet emission from liquid refrigerant',
                      'Permanent increase in cylinder capacity',
                      'The manual warns that high-temperature surfaces as well as flames can decompose '
                      'refrigerant into hazardous products. An open flame is not necessary for that hazard.'),
                     ('mobileservice',
                      '82.32(e)(3)',
                      "Approved recovery equipment is taken to a customer's premises. Which service "
                      'requirements apply there?',
                      'Same requirements as at the shop',
                      'Recovery rules only for ozone-depleting fluids',
                      'Shop rules only after returning the equipment',
                      'Recordkeeping rules instead of recovery rules',
                      'Section 82.32 permits transporting approved equipment to other service locations. It '
                      'retains the requirements that would apply to the same work on-site.'),
                     ('liquidwithdrawal',
                      'Appendix C4.5',
                      'From which phase must recycled HFC-134a be withdrawn for recharging or transfer under '
                      'J2788?',
                      'Liquid phase',
                      'Vapor phase',
                      'Mixed liquid and air phase',
                      'Phase with the highest oil content',
                      'The incorporated standard specifies liquid-phase withdrawal for recycled refrigerant '
                      'recharging and transfer. Selecting vapor is not the specified method.'),
                     ('oilbottle',
                      'MACS p16:Oil Recovery Reservoir caption',
                      "Why should the machine's oil collection reservoir be emptied before starting another "
                      "vehicle's recovery?",
                      "Isolate this job's collected quantity",
                      'To increase refrigerant storage capacity',
                      'To change the compressor oil viscosity',
                      'To remove moisture from the refrigerant hoses',
                      'An initially empty collection reservoir lets the technician determine how much oil '
                      'this recovery removed. Oil left from an earlier job would distort that measurement.')],
 'epa609Rules': [('ozoneuv',
                  'EPA impacts:CFC-12',
                  "What increases at Earth's surface when refrigerant emissions damage the protective "
                  'stratospheric ozone layer?',
                  'UVB radiation',
                  'Infrared radiation',
                  'Visible solar radiation',
                  'Cosmic radiation',
                  'EPA links ozone depletion to increased UVB reaching the surface. The protective function '
                  'concerns ultraviolet radiation, not removal of atmospheric nitrogen.'),
                 ('groundozone',
                  'EPA impacts:CFC-12',
                  'How does ground-level ozone differ from the ozone layer that refrigerant controls help '
                  'protect?',
                  'It contributes to harmful smog',
                  'It filters UVB above the clouds',
                  'It shields skin from ultraviolet light',
                  'It is confined to the stratosphere',
                  'Ground-level ozone harms breathing and contributes to smog. Ozone high in the '
                  'stratosphere instead protects against ultraviolet radiation.'),
                 ('hfcclimate',
                  'EPA impacts:HFC-134a',
                  'Why does containing HFC-134a still matter environmentally even though it does not deplete '
                  'ozone?',
                  'It is a potent greenhouse gas',
                  'It directly destroys stratospheric ozone',
                  'It primarily increases incoming UVB',
                  'It blocks the production of atmospheric oxygen',
                  'EPA identifies HFC-134a as a potent greenhouse gas. Lack of ozone-depletion potential '
                  'does not mean that its release has no climate impact.'),
                 ('gwpbasis',
                  'MACS p1:Global Warming and Climate Change',
                  'A refrigerant has a higher GWP than another. What does that comparison describe?',
                  'Greater climate effect relative to CO2',
                  'Greater ozone loss relative to CFC-12',
                  'Higher system pressure at equal temperature',
                  'Higher ignition temperature in workshop air',
                  'Global warming potential compares climate effects against carbon dioxide. It is not a '
                  'measure of refrigerant pressure, ignition temperature or ozone depletion.'),
                 ('snapenduse',
                  'EPA impacts:SNAP',
                  'A substitute is accepted for commercial refrigeration. What establishes whether it is '
                  'permitted in vehicle A/C?',
                  'Its MVAC listing and use conditions',
                  'Its approval in any refrigeration sector',
                  'Its pressure matching the original fluid',
                  'Its supplier describing it as compatible',
                  'SNAP decisions are specific to an end use and applicable conditions. Acceptance in a '
                  'different sector does not authorize MVAC use.'),
                 ('hydrocarbons',
                  'EPA impacts:SNAP',
                  'Which refrigerant is listed as unacceptable for both new and retrofit motor vehicle air '
                  'conditioning?',
                  'Propane-based hydrocarbon refrigerant',
                  'HFO-1234yf',
                  'Carbon dioxide (R-744)',
                  'HFC-134a',
                  'EPA lists hydrocarbon refrigerants as unacceptable for MVAC use. The other listed '
                  'refrigerants can be acceptable when their particular use conditions are met.'),
                 ('existingservice',
                  'EPA servicing:Technology Transitions',
                  'How do federal new-vehicle HFC restrictions affect servicing an existing vehicle designed '
                  'for HFC-134a?',
                  'HFC-134a can still be used for service',
                  'Its next recharge must use HFO-1234yf',
                  'Its existing refrigerant must be removed',
                  'Its compressor must be converted to CO2',
                  'EPA distinguishes restrictions on newly manufactured vehicles from servicing existing '
                  'MVACs. The transition rule does not mandate converting an existing HFC-134a vehicle.'),
                 ('r22bus',
                  'EPA overlap:Technician Certification',
                  'Which certification applies to servicing a passenger bus air conditioner that uses '
                  'HCFC-22 refrigerant?',
                  'Section 608 Type II',
                  'Section 609 only',
                  'Section 608 Type I',
                  'Section 608 Type III',
                  'EPA excludes HCFC-22 bus air conditioning from MVAC and MVAC-like classifications. It is '
                  'high-pressure equipment covered by Section 608 Type II.'),
                 ('credentialrecords',
                  'EPA servicing:Recordkeeping Requirements for Service Shops',
                  'What documentation must a shop keep for each person authorized to operate its MVAC '
                  'service equipment?',
                  'Proof of technician certification',
                  'Equipment warranty registration',
                  'Refrigerant purchase invoices',
                  'Annual equipment calibration reports',
                  'EPA requires on-site evidence that equipment operators are properly trained and '
                  'certified. A driver license or authority to purchase equipment does not establish this '
                  'qualification.'),
                 ('employerpurchase',
                  'EPA sales:Requirements to Purchase Refrigerant',
                  'How can an uncertified employer buy MVAC refrigerant through a representative?',
                  'Written evidence it employs a certified technician',
                  'Written copy of its equipment certification to EPA',
                  'Written statement that the cans are for resale',
                  'Written invoices from earlier refrigerant purchases',
                  "EPA's sales page lets an employer or its authorized representative buy MVAC refrigerant "
                  'by giving the wholesaler written evidence that it employs at least one certified '
                  'technician. A resale statement covers buying for resale only, and equipment filings or '
                  'past invoices show no certified employee.'),
                 ('smallcan',
                  'EPA sales:Requirements to Purchase Refrigerant',
                  'With required fittings, which substitute-refrigerant container qualifies for uncertified '
                  'DIY sales?',
                  'Two-pound can with a self-sealing valve',
                  'Three-pound can with a self-sealing valve',
                  'Two-pound can with a piercing-only closure',
                  'Three-pound can sold with a charging hose',
                  'EPA permits the exception for containers designed to hold two pounds or less with '
                  'required unique fittings and self-sealing valves. A larger container or a piercing-only '
                  'closure does not meet those conditions.'),
                 ('smallcfc',
                  'EPA servicing:Ozone-Depleting Refrigerants Sales Restrictions',
                  'Who may buy a small CFC-12 container for servicing vehicles rather than for resale?',
                  'Section 609-certified technician',
                  'Uncertified DIY vehicle owner',
                  'Section 608 Type I technician only',
                  'Section 608 Type III technician only',
                  'EPA specifically restricts CFC-12 containers under 20 pounds to Section 609-certified '
                  'purchasers, apart from the resale exception. The substitute-refrigerant DIY exception '
                  'does not apply to CFC-12.'),
                 ('finaldisposer',
                  'EPA servicing:Safe Disposal Requirements',
                  'Who must ensure refrigerant has been removed before an MVAC reaches final disposal?',
                  'Final person in the disposal chain',
                  'Vehicle owner before transfer',
                  'First dismantler receiving the vehicle',
                  'Last shop performing A/C repairs',
                  'EPA assigns the final disposer responsibility to remove the refrigerant or ensure the '
                  'customer already removed it. Earlier ownership or service alone does not satisfy that '
                  'final responsibility.'),
                 ('retrofitlabel',
                  'EPA retrofit:Labels',
                  "After a CFC-12 retrofit, what should happen to the vehicle's obsolete refrigerant label?",
                  'Remove or completely cover its information',
                  'Keep it readable beside the new label',
                  'Change only the printed charge quantity',
                  'Leave it until the next scheduled service',
                  'EPA requires the obsolete information to be removed or covered by the new label. '
                  'Information that cannot be covered must be permanently rendered unreadable.'),
                 ('retrofitcutoff',
                  'EPA retrofit:Compressor Shutoff Switch',
                  'A retrofit system has a pressure-relief device but no compressor cutoff. What additional '
                  'control is required?',
                  'High-pressure shutoff switch',
                  'Low-pressure cycling switch',
                  'Evaporator temperature probe',
                  'Condenser fan timer relay',
                  'The retrofit use condition requires a high-pressure cutoff for a system that can vent '
                  'through a pressure-relief device. Low-pressure cycling serves a different purpose.'),
                 ('barrierhose',
                  'EPA retrofit:Barrier Hoses',
                  'Why can a CFC-12 retrofit blend containing HCFC-22 require replacement with barrier '
                  'hoses?',
                  'To limit refrigerant permeation',
                  'To increase the required burst pressure',
                  'To match a different coupling diameter',
                  'To prevent a change in lubricant viscosity',
                  'EPA identifies HCFC-22 seepage through traditional CFC-12 hoses as the reason for '
                  'less-permeable replacements. The requirement concerns containment, not hose color.'),
                 ('offsitesameowner',
                  '82.32(e)(2)',
                  'For off-site recycling, what equipment must the person owning or operating the extraction '
                  'shop own?',
                  'Both recovery and recycling units',
                  'Recovery unit, with outsourced recycling',
                  'Recycling unit, with rented recovery',
                  'Neither, if each operator is certified',
                  'Section 82.32 permits the specified arrangement where the recycler is owned by the person '
                  'owning the recovery-only equipment and owning or operating the extraction establishment. '
                  'A generic business license is insufficient.'),
                 ('epaaccess',
                  '82.42(b)(5)',
                  'An EPA representative presents credentials at an MVAC shop. What access must the shop '
                  'provide?',
                  'Premises and required service records',
                  'Records only after the next annual filing',
                  'Premises only when all technicians agree',
                  'Records only after customer authorization',
                  'Section 82.42 requires entry and access to the required records after the representative '
                  'presents credentials. Customer permission or an annual reporting date is not the '
                  'condition stated in this rule.'),
                 ('retailnotice',
                  '82.42(c)',
                  'What notice must accompany retail sales of qualifying ozone-depleting MVAC refrigerant '
                  'containers under 20 pounds?',
                  'Purchaser training and certification restriction',
                  'Cylinder temperature storage warning',
                  'Recommended compressor maintenance interval',
                  'Refrigerant compatibility warranty statement',
                  'The rule requires a prominent notice about the certification restriction on those sales. '
                  'General servicing advice does not replace the required purchaser notice.'),
                 ('salvagesale',
                  '82.34(d)(2)',
                  'Before reclamation, to whom may restricted refrigerant recovered at a vehicle disposal '
                  'facility be sold?',
                  'Section 609-certified technician',
                  'Section 608 Type I technician',
                  'Licensed motor vehicle dealer',
                  'Certified vehicle safety inspector',
                  'The disposal rule restricts such sales to a Section 609-certified technician. Container '
                  'choice or private-vehicle use does not substitute for the required credential.')],
 'epa609Service': [('servicecaps',
                    'MACS p13:Ensure System Integrity',
                    'What provides the primary seal against leakage at an MVAC service port after equipment '
                    'is disconnected?',
                    'Correctly sealed service-port cap',
                    'Valve-core spring pressure alone',
                    'Tightness of exposed fitting threads',
                    'Plastic shipping plug without a seal',
                    'The manual identifies the service-port cap as the primary seal. Reinstall the correct '
                    'cap with an undamaged seal after service.'),
                   ('zeropressure',
                    'MACS p14:Checking System Pressure Before Recovery',
                    'A gauge on the service port shows no system pressure before recovery. What does MACS '
                    'say to assume?',
                    'Refrigerant has leaked out of the system',
                    'Refrigerant has settled into the compressor oil',
                    'Refrigerant is held behind a closed valve core',
                    'Refrigerant is too cold to register pressure',
                    'MACS says a system with no pressure can safely be assumed to have lost its refrigerant '
                    'through leaks, so tracking down the leak comes first. Refrigerant held in oil, behind a '
                    'valve core or chilled is not the conclusion MACS draws from a zero reading.'),
                   ('recoverpause',
                    'MACS p14:Effect of System Design',
                    'System pressure rises above vacuum during the recovery pause. What should the '
                    'technician do next?',
                    'Resume recovery of remaining refrigerant',
                    'Proceed to the evacuation stage',
                    'Start the pressure leak check',
                    'Zero the low-pressure gauge',
                    'The manual calls for further recovery when pressure returns above vacuum after the '
                    'pause. The returning pressure means the initial pull did not remove all recoverable '
                    'refrigerant.'),
                   ('emptycircuit',
                    'MACS p14:Check for Pressure in the System',
                    'An A/C circuit has no pressure before recovery starts. What service issue should be '
                    'investigated?',
                    'Where the refrigerant escaped',
                    'Whether the expansion device is blocked',
                    'Whether the blower control has failed',
                    'Whether excessive oil was installed',
                    'The manual treats a pressureless system as evidence that its refrigerant has leaked '
                    'out. Locating the leak is an early service task, rather than assuming an overcharge.'),
                   ('oilovercoat',
                    'MACS p16:System Lubricants',
                    'How can excessive compressor oil reduce cooling even if the refrigerant quantity is '
                    'otherwise correct?',
                    'Oil coats heat-transfer surfaces',
                    'Oil changes the pressure-switch setting',
                    'Oil reduces the specified refrigerant mass',
                    'Oil increases evaporator air temperature sensing',
                    'Excess oil can coat heat-exchanger interiors and impede heat transfer. It can also '
                    'cause mechanical problems, so more lubricant is not automatically beneficial.'),
                   ('mixedseparation',
                    'MACS p31:Mixed Cross-contaminated Refrigerant',
                    'What can an ordinary MVAC recycling machine do with a mixture of different '
                    'refrigerants?',
                    'It cannot separate them into pure refrigerants',
                    'It separates them by repeated filtering',
                    'It restores purity by removing air alone',
                    'It separates them by extended evacuation',
                    'The manual states that mixed refrigerants cannot be separated by recycling machines. '
                    'The mixture requires appropriate off-site reclamation or destruction instead of normal '
                    'recycling for reuse.'),
                   ('stationarysource',
                    'MACS p34:Used Refrigerant from Non-mobile Sources',
                    'What processing is needed before refrigerant from a stationary system is suitable for '
                    'MVAC use?',
                    'Reclamation to the applicable purity standard',
                    'Automotive recycling without prior reclamation',
                    'Mixing it with an equal quantity of virgin fluid',
                    'Removing only the visible separated lubricant',
                    'Stationary-system refrigerant can carry acids and contaminants that automotive '
                    'recycling equipment does not remove. A reclaimer must establish the required purity '
                    'before it is used in an MVAC.'),
                   ('newcylinder',
                    'MACS p32-33:Counterfeit Refrigerants',
                    'Which method checks the actual contents of a newly purchased refrigerant cylinder '
                    'before use?',
                    'Test with a suitable refrigerant identifier',
                    'Compare pressure with a chart alone',
                    'Read the cylinder approval marking',
                    'Check the printed supplier trade name',
                    'The manual describes counterfeit contents even in authentic-looking cylinders. '
                    'Verification protects the shop supply rather than relying entirely on packaging.'),
                   ('detectorairflow',
                    'MACS p18:Using Electronic Leak Detectors',
                    'Why should the vehicle engine be off during an electronic refrigerant leak check?',
                    'Air movement can disperse escaping vapor',
                    'Running compressors close all possible leaks',
                    'Engine heat changes detector calibration',
                    'Engine electrical noise mimics refrigerant',
                    'Air movement from a running vehicle can carry leaking refrigerant away from the probe. '
                    'Switching the engine off improves conditions for locating the leak.'),
                   ('solventalarm',
                    'MACS p18:Using Electronic Leak Detectors',
                    'Why wipe a suspect joint with a clean cloth, not solvent, before electronic leak '
                    'testing?',
                    'Solvent residue can set off the detector',
                    'Solvent can wash away leak-tracing dye',
                    "Solvent can swell the joint's O-ring",
                    'Solvent can seal a small leak for a while',
                    'MACS warns against cleaners or solvents because they may contain substances the '
                    'detector will sense, giving false readings. Dye matters only for UV inspection, and '
                    'seal swelling or temporary sealing are not the reason MACS gives.'),
                   ('detectioncharge',
                    'MACS p18:Using Electronic Leak Detectors',
                    'A system holds only a leak-test charge. What must be done before judging its cooling '
                    'performance?',
                    'Restore the specified full charge',
                    'Add half the specified charge',
                    'Add charge until the sight glass clears',
                    'Add charge until low-side pressure equals ambient',
                    "Cooling performance can only be judged at the vehicle maker's specified charge, weighed "
                    'in. Partial charges, sight-glass clearing and pressure matching are unreliable ways to '
                    'set a charge.'),
                   ('dyecompatibility',
                    'MACS p20:Dye Formula',
                    'What does SAE J2297 compatibility testing establish about an approved refrigerant '
                    'leak-detection dye?',
                    'Material and lubricant compatibility',
                    'Leak detection time for every system',
                    'Existing dye concentration in a vehicle',
                    'Charge accuracy of the dye injector',
                    'The manual describes testing for compatibility and preservation of lubricant properties '
                    'at proper doses. Compatibility is not a universal dose specification or a leak repair.'),
                   ('uvglasses',
                    'MACS p21:Lamps and Goggles',
                    'Why use the specified glasses when inspecting an A/C system with a UV dye lamp?',
                    'Protect eyes and enhance dye contrast',
                    'Correct an unsuitable lamp wavelength',
                    'Measure concentration from dye brightness',
                    'Permit direct viewing of the UV bulb',
                    'The specified glasses enhance fluorescence and protect against UV exposure. They do not '
                    'justify looking directly at the lamp.'),
                   ('flushcert',
                    'MACS p22:Flushing A/C Systems',
                    'A flushing material meets SAE J2670. What does that alone establish about its use?',
                    'Tested compatibility with system components',
                    'Guaranteed removal of debris from every passage',
                    'Guaranteed evaporation during any vacuum cycle',
                    "Approval to flush every vehicle manufacturer's system",
                    'The manual distinguishes compatibility testing from cleaning effectiveness. Meeting the '
                    'material standard does not establish that it will clean a particular component.'),
                   ('solventresidue',
                    'MACS p22:Flushing A/C Systems',
                    'Why can flushing solvent left inside an A/C circuit damage the compressor after '
                    'service?',
                    'It can dilute the lubricating oil',
                    'It always increases lubricant viscosity',
                    'It changes compressor clutch clearances',
                    'It alters the pressure-switch calibration',
                    'Residual solvent can impair lubrication by diluting oil. Evacuation may not remove all '
                    'solvent, depending on its properties.'),
                   ('finepassages',
                    'MACS p22:Flushing A/C Systems',
                    'Which condenser feature can make internal debris especially difficult to remove by '
                    'flushing?',
                    'Very fine multi-flow passages',
                    'Single large-bore tube circuit',
                    'Wide spacing between external fins',
                    'Large openings at service connections',
                    'The manual highlights tiny internal passages that can retain debris. External fins do '
                    'not filter contaminants inside the refrigerant circuit.'),
                   ('elevationvac',
                    'MACS p23:A/C System Evacuation',
                    'Why can a sound vacuum pump show a lower maximum gauge vacuum at higher elevation?',
                    'Local atmospheric pressure is lower',
                    'Lower refrigerant vapor pressure',
                    'Higher pump rated flow capacity',
                    'Higher residual lubricant viscosity',
                    'The manual shows lower achievable vacuum-gauge readings as elevation rises. This '
                    'reflects atmospheric pressure, not necessarily a defective pump.'),
                   ('desiccantexposure',
                    'MACS p24:Desiccant Failure',
                    'Refrigerant lines remain uncapped through prolonged collision repairs. Which component '
                    'may need replacement for moisture control?',
                    'Saturated desiccant',
                    'High-side pressure-relief valve',
                    'Compressor shaft seal',
                    'Expansion-valve sensing bulb',
                    'Extended atmospheric exposure can saturate the desiccant. Replacing the '
                    'moisture-control material addresses that condition; an electrical switch does not.'),
                   ('underchargeoil',
                    'MACS p24:Properly Charging',
                    'Why can running an A/C system undercharged eventually ruin the compressor?',
                    'Poor lubricant circulation',
                    'High operating pressure',
                    'Oil coating heat-transfer surfaces',
                    'High-side switch shutdowns',
                    'MACS says undercharging causes poor cooling and, worse, poor lubricant circulation that '
                    'can lead to compressor failure. High operating pressure and high-side switch shutdowns '
                    'come from overcharging, and oil-coated heat-transfer surfaces from too much oil.'),
                   ('overchargecutout',
                    'MACS p24:Properly Charging',
                    'Which protective control responds directly to excessive discharge pressure in an '
                    'overcharged A/C system?',
                    'Compressor high-pressure cutoff',
                    'Evaporator temperature thermostat',
                    'Low-side pressure cutoff',
                    'Compressor motor thermal protector',
                    'Overcharge can produce high operating pressure, especially in hot conditions. The '
                    'high-side pressure control may stop operation to protect the system.'),
                   ('updatedcharge',
                    'MACS p25:Unintentional Mistake Determining Charge',
                    'A current manufacturer bulletin revises the original charge label. Which quantity '
                    'should guide the recharge?',
                    'Revised quantity applicable to that vehicle',
                    'Original label regardless of later revisions',
                    'Largest quantity listed for the model range',
                    'Quantity used before installing any replacement parts',
                    'The manual notes that manufacturers can revise charge specifications after production. '
                    'Verify applicability and use the current instruction rather than assuming the original '
                    'label is always current.'),
                   ('onesidedtolerance',
                    'MACS p26:Charge Tolerances',
                    'A specification gives 600 grams with a tolerance of plus 30, minus zero. Which charge '
                    'is acceptable?',
                    '620 grams',
                    '590 grams',
                    '640 grams',
                    '570 grams',
                    'The permitted range is 600 through 630 grams. A plus-only tolerance does not allow the '
                    'same amount below the nominal value.'),
                   ('vacpumpoil',
                    'MACS p23:A/C System Evacuation',
                    'Which routine maintenance commonly preserves the performance of the vacuum pump used '
                    'before recharging?',
                    'Changing its oil at specified intervals',
                    'Adding compressor lubricant to the sump',
                    'Draining the sump before every use',
                    'Topping up existing oil indefinitely',
                    'The manual identifies pump oil changes as routine vacuum-pump maintenance. Follow the '
                    "pump manufacturer's interval rather than modifying vehicle charge or controls."),
                   ('leakwrap',
                    'MACS p20:Another Tip on Using Electronic Leak Detectors',
                    'Why tape foil around a suspect connection before sampling it with an electronic leak '
                    'detector?',
                    'Collect leaking refrigerant for the probe',
                    'Hold leaking dye for the UV lamp',
                    'Keep the probe tip off the joint',
                    'Seal the leak until it is repaired',
                    'MACS says foil or plastic wrap lets leaking refrigerant collect for a few minutes, then '
                    'a small hole at the lowest point gives the probe a concentrated sample. It is not a dye '
                    'trap, a probe spacer or a repair.')],
 'epa609Yf': [('yfclass',
               'EPA impacts:HFO-1234yf',
               'How is HFO-1234yf described by its A2L flammability classification for mobile air '
               'conditioning?',
               'Mildly flammable',
               'Nonflammable in every mixture',
               'Highly flammable like propane',
               'Flammable only as a liquid',
               'EPA describes HFO-1234yf as mildly flammable. Its classification calls for appropriate '
               'equipment and procedures, not unrestricted substitution or assumptions based on propane.'),
              ('lowspaces',
               'MACS p43:Specific Safety Procedures item1A',
               'Why must R-1234yf service areas include ventilation near pits and other low spaces?',
               'Released vapor can accumulate there',
               'Refrigerant ignites only below floor level',
               'Cold floor surfaces consume oxygen',
               'Low spaces prevent refrigerant from boiling',
               'The manual warns against accumulation in low areas. Ventilation must address those locations '
               'rather than assuming overhead ventilation removes every pocket.'),
              ('similarpressure',
               'MACS p45:Similarities to HFC-134a',
               'Why is a familiar pressure reading insufficient to identify HFO-1234yf rather than HFC-134a?',
               'Their vapor pressures can be very similar',
               'They use identical service connections',
               'They have the same chemical composition',
               'Their refrigerant charge weights are identical',
               'The manual compares similar vapor-pressure behavior for the two refrigerants. A pressure '
               'reading is not a substitute for identifying the chemical contents.'),
              ('highvoltage',
               'MACS p43 item4;MACS p45:Hybrids and EVs',
               'What must precede repairs on a high-voltage electric A/C compressor in a hybrid vehicle?',
               'Model-specific high-voltage isolation procedure',
               'Removal of refrigerant as electrical isolation',
               'Disconnection of only the cabin blower fuse',
               'Selection of the lowest thermostat setting',
               "The manual requires the manufacturer's high-voltage safety procedure before repairs. "
               'Refrigerant recovery or a low-voltage blower fuse does not establish isolation of the '
               'compressor circuit.'),
              ('dualstandard',
               '82.31(b)(3);82.36(a)(10)',
               'Which standard specifically covers equipment intended to recover, recycle and recharge both '
               'R-1234yf and R-134a?',
               'SAE J3030',
               'SAE J2788',
               'SAE J2912',
               'SAE J2851',
               'The regulation identifies J3030 for equipment designed for both refrigerants. The other '
               'standards address different recovery or identification functions and do not establish this '
               'dual-refrigerant RRR capability.'),
              ('junktank',
               'MACS p48:Identifying HFO-1234yf',
               "An identifier reports Fail on a vehicle's R-1234yf. Where should that refrigerant be "
               'recovered?',
               'Into a dedicated contaminated tank',
               "Into the machine's regular supply tank",
               'Into an empty disposable cylinder',
               "Into the shop's HFC-134a recovery tank",
               'MACS says that if the identifier shows Fail or a mixture, the system must be evacuated into '
               'a junk tank, not the regular supply tanks. Adding it to supply or HFC-134a stock spreads the '
               'contamination, and disposable cylinders are not refillable.'),
              ('contamunit',
               'MACS p50:Equipment Certification;82.31(b)(2)',
               'Which equipment standard addresses recovery of contaminated R-134a or R-1234yf from vehicle '
               'air conditioners?',
               'SAE J2851',
               'SAE J2844',
               'SAE J2297',
               'SAE J2842',
               'The incorporated J2851 standard covers contaminated-refrigerant recovery equipment. J2844 '
               'concerns new refrigerant and containers, J2297 dye compatibility, and J2842 evaporators.'),
              ('vacuumdecay',
               'MACS p51:A/C System Recharge',
               'An R-1234yf machine detects excessive vacuum decay during its initial check. What happens to '
               'recharging?',
               'It is blocked pending leak correction',
               'It continues at half the programmed charge',
               'It advances to the pressure-test charge',
               'It increases the charge to replace leakage',
               'The manual describes stopping the charging process when the vacuum-decay limit is exceeded. '
               'Locate and repair the leak before attempting to continue.'),
              ('blowercheck',
               'MACS p51:A/C System Recharge',
               'During the R-1234yf precharge evaporator check, where should the operating leak-detector '
               'probe be placed?',
               'Center of a floor-duct outlet',
               'Against the condenser front face',
               'Beside the compressor drive pulley',
               'At the high-side service-port cap',
               'The described procedure places a sensitive detector at the center of a floor outlet with the '
               'blower on low and A/C off. This checks for refrigerant entering the passenger-air path.'),
              ('leaklockout',
               'MACS p51:A/C System Recharge',
               'A leak is detected after the partial R-1234yf test charge. Which machine operations remain '
               'available?',
               'Recovery or re-evacuation',
               'Full charge or automatic top-off',
               'Oil addition or compressor cycling',
               'Full charge or vacuum bypass',
               'The manual says the machine locks out operations other than recovery or re-evacuation after '
               'a detected leak. It does not permit completing the charge as a way to confirm the leak.'),
              ('couplepressure',
               'MACS p43:Specific Safety Procedures item5',
               'When should service equipment be connected to an R-1234yf system after the compressor stops?',
               'After high-side pressure has decreased',
               'Before pressure starts to equalize',
               'Only while the compressor clutch is engaged',
               'As soon as cabin air temperature rises',
               'The manual directs waiting for high-side pressure to decrease before connection to reduce '
               'release and exposure. Cabin temperature is not the indicated readiness criterion.'),
              ('detectorsensitivity',
               'MACS p48:Finding Leaks',
               'What minimum small-leak capability does the manual specify for a J2913 detector at its most '
               'sensitive setting?',
               '0.15 ounce per year',
               '0.5 ounce per year',
               '1.5 ounces per year',
               '5 ounces per year',
               'The manual specifies detecting a leak as small as 0.15 ounce per year. The older 0.5-ounce '
               'figure belongs to less sensitive detector guidance, not this requirement.')]}
