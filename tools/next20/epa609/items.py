"""Original individually authored items. Tuple: objective, locator, stem, key, three distractors, explanation."""
ITEMS = {'epa609Rules': [('consideration',
                  '82.32(g)',
                  'A technician accepts used tools as payment for an A/C repair. How does Section 609 '
                  'classify this?',
                  'Service for consideration',
                  'Uncompensated private maintenance',
                  'Sale of recovered refrigerant',
                  'Disposal of an MVAC appliance',
                  'Section 609 treats goods or services received in exchange for a repair as consideration. '
                  'Payment need not be cash, and exchanging tools does not turn the repair into refrigerant '
                  'resale.'),
                 ('cargo',
                  '82.32(d)',
                  'Which vehicle cooling system falls outside the regulatory definition of a motor vehicle '
                  'air conditioner?',
                  'Sealed refrigerated cargo unit',
                  'Passenger car cabin unit',
                  'Pickup truck cabin unit',
                  'Highway tractor cab unit',
                  'The MVAC definition covers cooling for drivers or passengers. Hermetically sealed '
                  'refrigerated cargo systems are excluded and follow different requirements.'),
                 ('mvac-like',
                  'EPA overlap:Technician Certification',
                  "Which credential can substitute for Section 609 when servicing an agricultural tractor's "
                  'MVAC-like appliance?',
                  'Section 608 Type II',
                  'Section 608 Type I',
                  'Section 608 Type III',
                  'Automotive mechanical license',
                  'EPA permits either Section 609 or Section 608 Type II for MVAC-like appliances. Type I '
                  'and Type III cover different equipment classes.'),
                 ('topoff',
                  '82.32(e)(4)',
                  'A shop only tops off passenger-car refrigerant. What equipment obligation still applies '
                  'under Section 609?',
                  'Acquire approved recovery equipment',
                  'Acquire only a calibrated charging scale',
                  'Acquire only electronic leak detectors',
                  'Acquire recovery equipment after repairs begin',
                  'A facility that only charges MVACs still performs service involving refrigerant. The rule '
                  'expressly includes the requirement to purchase approved refrigerant recycling equipment.'),
                 ('reuse',
                  '82.32(e)(1)',
                  'Which procedure permits recovered refrigerant to be returned to its original vehicle '
                  'after repair?',
                  'Processing in an approved recycler',
                  'Passing an identification test alone',
                  'Transferring it to a clean cylinder',
                  'Separating only the recovered oil',
                  'Recovered refrigerant must be recycled or reclaimed before reuse, including in its '
                  'original vehicle. Identification or partial cleaning alone does not replace that '
                  'processing.'),
                 ('co2exception',
                  'EPA servicing:Venting Prohibition',
                  'Which requirement still applies to paid R-744 vehicle A/C service despite its venting '
                  'exemption?',
                  'Section 609 technician certification',
                  'Section 608 Type III certification',
                  'Section 608 Type I certification',
                  'Section 608 Type II certification',
                  'EPA exempts carbon dioxide from the Section 608 venting prohibition but retains Section '
                  '609 service requirements. Section 608 equipment credentials do not replace the required '
                  'MVAC technician certification.'),
                 ('registration',
                  'EPA servicing:Recordkeeping Requirements for Service Shops',
                  'A previously registered shop adds approved R-1234yf equipment. What does EPA require '
                  'concerning equipment certification filings?',
                  'No new filing solely for this purchase',
                  'New filing for each different refrigerant',
                  'New filing for each machine serial number',
                  'Annual filing covering all current machines',
                  'EPA describes shop equipment certification as a one-time requirement. A shop that already '
                  'certified ownership need not resubmit solely because it acquires new equipment, including '
                  'equipment for another refrigerant.'),
                 ('recorddestination',
                  'EPA servicing:Recordkeeping Requirements for Service Shops',
                  'Which record does Section 609 require when a service shop sends recovered refrigerant '
                  'off-site?',
                  'Receiving facility name and address',
                  'Shipping technician certification number',
                  'Recovered quantity by vehicle VIN',
                  'Refrigerant type and recovery date',
                  'Section 609 requires an on-site record of the receiving facility name and address, '
                  'retained for three years. It does not substitute a quantity-by-vehicle log for '
                  'identifying that destination.')],
 'epa609Equipment': [('pagmoisture',
                      'MACS p11 item5',
                      'Which process does the term hygroscopic describe when PAG oil is exposed to workshop '
                      'air?',
                      'Absorption of atmospheric moisture',
                      'Oxidation of lubricant additives',
                      'Temperature-related viscosity reduction',
                      'Evaporation of lighter components',
                      'Hygroscopic oil absorbs water vapor from the atmosphere. Oxidation, evaporation and '
                      'temperature-related viscosity changes describe different processes; tightly sealing '
                      'the container limits moisture pickup.'),
                     ('testair',
                      'MACS p11 item4;Appendix C5.2',
                      'Under which condition can HFC-134a become combustible despite its usual '
                      'classification as nonflammable?',
                      'Mixed with air under pressure',
                      'Evacuated below atmospheric pressure',
                      'Separated from compressor lubricant',
                      'Contained in a warm sealed cylinder',
                      'HFC-134a can become combustible when mixed with air under certain elevated-pressure '
                      'conditions. Its normal nonflammability does not make compressed-air testing '
                      'acceptable.'),
                     ('overfillbasis',
                      'Appendix C7.2',
                      'Under SAE J2788, what storage-container limit must overfill protection enforce during '
                      'refrigerant recovery?',
                      '80% of rated volume at 21 C',
                      '80% of gross weight at 21 C',
                      '60% of rated volume at 21 C',
                      '100% of rated volume at 21 C',
                      'The incorporated J2788 standard limits liquid fill to 80 percent of the tank rated '
                      'volume at 21 degrees Celsius. A percentage of gross weight is a different measurement '
                      'and cannot be substituted.'),
                     ('hoseend',
                      'EPA servicing:Applicability of Unique Fittings to Manifold Gauges and Refrigerant '
                      'Identifiers',
                      'Which hose connection arrangement satisfies EPA requirements for refrigerant-specific '
                      'fittings on a manifold gauge?',
                      'Permanent fitting at vehicle end',
                      'Interchangeable fitting at vehicle end',
                      'Permanent fitting only at gauge end',
                      'Interchangeable fittings at both ends',
                      'EPA allows a standardized connection at the gauge end but requires the appropriate '
                      'permanent unique fitting where the hose connects to the MVAC or servicing equipment. '
                      'Swapping refrigerant adapters at that end defeats the rule.'),
                     ('filterlockout',
                      'Appendix C4.1.1-4.1.2',
                      "Which action satisfies a J2788 machine's maintenance requirement after its desiccant "
                      'capacity is exhausted?',
                      'Replace cartridge; verify its identity',
                      'Drain oil; reset the service counter',
                      'Purge air; restart the cleaning cycle',
                      'Evacuate hoses; reset the service counter',
                      'J2788 requires desiccant replacement and an identification system confirming '
                      'installation of a new filter. Oil draining, air purging and hose evacuation do not '
                      'restore exhausted desiccant capacity.'),
                     ('hoseferrule',
                      'MACS p36:Measure Twice Crimp Once',
                      'Before crimping an A/C hose, what indicates that its end is fully inserted into the '
                      'fitting?',
                      'Hose visible through the inspection hole',
                      'Ferrule just covering the cut hose edge',
                      'Fitting held by friction at its first rib',
                      'Tube touching the first crimping die',
                      'The manual directs the technician to verify hose position through the ferrule '
                      'inspection opening. Friction at the first rib does not establish that the hose is '
                      'fully inserted.'),
                     ('crimpdies',
                      'MACS p36:Appearance Counts',
                      'An A/C hose crimp is oblong and irregular. Which equipment problem most directly '
                      'explains that shape?',
                      'Worn carriers or mismatched dies',
                      'Incorrect depth of fitting insertion',
                      'Excess lubricant at the hose end',
                      'Hose cut longer than its original length',
                      'The manual associates irregular crimps with die mismatch or worn carriers. Incorrect '
                      'insertion can also damage a joint, but does not explain the specified crimp-shape '
                      'warning as directly.'),
                     ('cylretest',
                      'Appendix C7.3.3-7.3.4',
                      'Which storage vessel is exempt from the five-year retesting requirement stated in SAE '
                      'J2788?',
                      'ASME tank defined in UL 1963',
                      'DOT cylinder used only on-site',
                      'DOT cylinder containing virgin refrigerant',
                      'DOT cylinder with a new relief valve',
                      'J2788 exempts ASME tanks defined in UL 1963 from its retesting requirement. On-site '
                      'use, virgin contents or a replaced relief valve does not create that exemption for a '
                      'DOT cylinder.')],
 'epa609Service': [('accumulator',
                    'MACS p14:Effect of System Design',
                    'Why can refrigerant remain in a cold accumulator after the initial recovery pull '
                    'reaches vacuum?',
                    'Cooling slows its release from oil',
                    'Expansion-valve closure isolates the liquid',
                    'Desiccant releases its stored refrigerant',
                    'Discharge valves trap vapor in the compressor',
                    'Cooling during recovery slows the release of refrigerant from the accumulator contents. '
                    'An accumulator is associated with an orifice-tube system, so an expansion-valve '
                    'explanation confuses different system designs.'),
                   ('oilreplace',
                    'MACS p16:System Lubricants',
                    'Recovery removes 18 mL of oil. What normally replaces that amount before the system '
                    'returns to service?',
                    '18 mL of new specified lubricant',
                    '18 mL of the recovered lubricant',
                    'Full compressor capacity of new oil',
                    '18 mL of extra liquid refrigerant',
                    'Replace the measured removed oil with fresh lubricant of the specified type and '
                    'viscosity. Reusing recovered oil or adding a complete system oil charge is not the '
                    'prescribed replacement.'),
                   ('pressuremass',
                    'MACS p28:Charging Systems',
                    'What must be measured to verify the amount added when recharging a critical-charge '
                    'vehicle system?',
                    'Refrigerant mass',
                    'Static low-side pressure',
                    'Discharge air temperature',
                    'Compressor cycling interval',
                    'An accurate recharge uses the specified refrigerant weight. System pressures and '
                    'cooling observations do not measure how much refrigerant entered the circuit.'),
                   ('decimal',
                    'MACS p25-26:Conversion Chart',
                    'A charge specification is 1.75 pounds. How many ounces should a scale set to ounces '
                    'deliver?',
                    '28 ounces',
                    '16.75 ounces',
                    '17.5 ounces',
                    '91 ounces',
                    'Multiply 1.75 by 16 to obtain 28 ounces. Converting only the whole pound gives 16.75; '
                    'treating the decimal digits as ounces gives 16 plus 75, or 91.'),
                   ('evacuation',
                    'MACS p23:A/C System Evacuation',
                    'Why can a service gauge show deep vacuum before the whole A/C circuit reaches that '
                    'condition?',
                    'Restricted flow through service valve cores',
                    'Gauge calibration for a higher elevation',
                    'Moisture boiling near the evaporator',
                    'Oil vapor returning from the vacuum pump',
                    'The manual identifies small valve-core openings as restrictions between the circuit and '
                    'service hose. Moisture can prolong evacuation, but the restriction explains why the '
                    'local gauge reading gets ahead of the system vacuum.'),
                   ('dyefactory',
                    'MACS p21:Before You Begin Using UV Dye;Looking for Leaks',
                    'Factory dye is present, but no leak fluoresces immediately. What is the appropriate '
                    'next step?',
                    'Allow circulation before reinspecting',
                    'Add a fresh full dose of dye',
                    'Remove existing dye by flushing',
                    'Switch to a higher dye concentration',
                    'The manual notes that dye can take time to reach a leak and warns against adding '
                    'unnecessary dye when factory dye is present. An immediate negative inspection does not '
                    'justify an additional full dose.'),
                   ('scaleresolution',
                    'MACS p27:Equipment Inaccuracy',
                    'A charging scale displays tenths of a pound. What does that display resolution '
                    'establish?',
                    'Smallest displayed increment',
                    'Maximum possible delivery error',
                    'Required charge for every vehicle',
                    'Interval between accuracy checks',
                    'Display resolution states the size of the displayed steps, not the accuracy of the '
                    'delivered charge. Calibration must verify actual performance.'),
                   ('hoselength',
                    'MACS p28:Not Accounting for Refrigerant Inside Service Hoses',
                    'Longer charging hoses replace the original hoses. Which machine setting may need '
                    'adjustment for accurate delivery?',
                    'Programmed hose length',
                    'Vehicle charge specification',
                    'Vacuum gauge elevation correction',
                    'Oil replacement measurement units',
                    'Refrigerant retained in service hoses affects delivered charge. Where the machine '
                    'supports it, its hose-length setting must match the installed hoses.')],
 'epa609Yf': [('evaporator',
               'MACS p44:Unique Properties',
               'Which replacement is appropriate for a leaking evaporator in an HFO-1234yf vehicle A/C '
               'system?',
               'New unit complying with SAE J2842',
               'Used unit with matching external dimensions',
               'Original unit repaired by soldering',
               'R-134a unit with matching hose fittings',
               'The manual calls for a new evaporator designed for the refrigerant and complying with SAE '
               'J2842. Its safety requirements are not established merely by physical fit.'),
              ('identifierinterface',
               'MACS p47:Identifying HFO-1234yf',
               'A J2843 machine lacks an integrated identifier. How can it obtain an acceptable refrigerant '
               'identification result?',
               'Input from a J2912-compliant identifier',
               'Manual entry of the underhood label',
               'Comparison of two static pressure readings',
               'Entry of the vehicle production year',
               'J2843 equipment can use input from an external J2912-compliant identifier through its '
               'interface. A label states the intended contents, not their measured identity or purity.'),
              ('yfprecharge',
               'MACS p51:A/C System Recharge',
               'Why does R-1234yf charging equipment introduce a partial charge before delivering the full '
               'programmed amount?',
               'Enable a pressurized leak check',
               'Measure the compressor cooling capacity',
               'Determine the final charge by pressure',
               'Replace the preceding vacuum decay check',
               'After the vacuum check, a partial charge permits a pressurized leak check before the '
               'remaining charge is delivered. It supplements rather than replaces the vacuum check.'),
              ('electriclubricant',
               'MACS p45:Similarities to HFC-134a',
               'Which information determines the correct oil for an electrically driven compressor using '
               'HFO-1234yf?',
               'Vehicle-specific lubricant specification',
               'Measured viscosity of recovered oil',
               'Refrigerant supplier compatibility chart',
               'Compressor motor voltage rating',
               'Electric compressors may require POE or another specified lubricant rather than the PAG used '
               'by many other systems. Refrigerant compatibility or a measured viscosity alone does not '
               'establish the specified oil type and amount.')]}
