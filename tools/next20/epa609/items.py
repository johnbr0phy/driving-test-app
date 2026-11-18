"""Original individually authored items. Tuple: objective, locator, stem, key, three distractors, explanation."""
ITEMS = {'epa609Equipment': [('pagmoisture',
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
                     ('j2788improvement',
                      'MACS p7:More Complete Refrigerant Recovery',
                      'What did SAE J2788 equipment add over the J2210 recovery/recycling standard it '
                      'superseded?',
                      'More complete recovery and accurate charging',
                      'Recycling of both CFC-12 and HFC-134a',
                      'Recovery of contaminated refrigerant only',
                      'Handling of both HFC-134a and R-1234yf',
                      'MACS notes that J2788 replaced J2210 in 2007, giving more complete refrigerant '
                      'recovery and adding charging accuracy requirements. Dual CFC-12/HFC-134a circuitry, '
                      'contaminated-refrigerant recovery and dual HFC-134a/R-1234yf machines belong to other '
                      'standards (J1770, J2851 and J3030).'),
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
                      'A J2788 machine locks out at the end of filter life. What must happen before it runs '
                      'again?',
                      'Fitting a new cartridge its ID system accepts',
                      'Purging excess air from the storage tank',
                      'Checking the scale with its test weight',
                      'Retesting the tank at its five-year date',
                      'J2788 requires a lockout at end of filter life and an identification system '
                      'confirming a new filter is installed before the equipment resets. Air purging, scale '
                      'checks and five-year tank retests are separate J2788 maintenance items that do not '
                      'clear the lockout.'),
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
                      'A crimped A/C hose fitting comes out oblong and irregular. What does this usually '
                      'indicate?',
                      'Worn die carriers or mismatched dies',
                      'Hydraulic crimper used on A/C hose',
                      'Fitting too loose for the hose size',
                      'Hose end lubricated with mineral oil',
                      'MACS says oblong, out-of-round or irregular crimps usually indicate worn die carriers '
                      'or mismatched dies. A hydraulic crimper can crack the barrier lining, an undersized '
                      'fitting can drop off, and mineral oil on the hose end is the recommended lubricant.'),
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
 'epa609Rules': [('consideration',
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
                  'Which certification choice does EPA give technicians who service MVAC-like farm '
                  'equipment?',
                  'Section 609 or Section 608 Type II',
                  'Section 609 or Section 608 Type I',
                  'Section 608 Type II only',
                  'Section 609 certification only',
                  'EPA lets people servicing MVAC-like appliances such as farm equipment certify under '
                  'either Section 609 or Section 608 Type II, though it recommends Section 609. Type I is '
                  'not the Section 608 type EPA names for this equipment, and neither credential is the only '
                  'allowed route.'),
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
                  'Which statement about paid R-744 vehicle A/C service is correct?',
                  'Venting is allowed; Section 609 still applies',
                  'Venting is allowed; no certification is needed',
                  'Venting is banned; Section 609 applies',
                  'Venting is banned; no certification is needed',
                  'EPA exempts R-744 (CO2) from the venting prohibition, but it is not exempt from Section '
                  '609: technicians servicing MVAC systems for consideration must still be certified.'),
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
 'epa609Service': [('accumulatorheat',
                    'MACS p14:Effect of System Design on the Refrigerant Recovery Process',
                    'Refrigerant lingers in a frosted accumulator after recovery reaches vacuum. What helps '
                    'remove it faster?',
                    'Heating it with a hair dryer or heat pad',
                    'Heating it with an open-flame torch',
                    'Pausing recovery for five minutes',
                    'Switching to a higher-CFM vacuum pump',
                    'MACS says heating the accumulator with a hair dryer or electric heating pad raises its '
                    'pressure and shortens removal time, but never with an open flame. The five-minute pause '
                    'only checks for a pressure rise, and a vacuum pump is for evacuation, not recovery.'),
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
                    'A charging scale is accurate to plus or minus 1 oz and displays 0.01 lb steps. What '
                    'limits charge precision?',
                    'Its 1 oz accuracy',
                    'Its 0.01 lb display step',
                    'The average of both figures',
                    'Neither, once the scale is zeroed',
                    'A display step of 0.01 lb is about 0.16 oz, finer than the 1 oz accuracy, so the '
                    'accuracy limits how closely the true charge is known. Resolution only sets the smallest '
                    'change the display can show, and zeroing does not remove accuracy error.'),
                   ('hosecontent',
                    'MACS p28:Not Accounting for the Refrigerant Inside the Service Hoses',
                    'About how much refrigerant does a typical six-foot service hose hold?',
                    'About 2 ounces',
                    'About 0.5 ounce',
                    'About 8 ounces',
                    'About 1 pound',
                    'MACS says a typical six-foot service hose holds about two ounces of refrigerant, which '
                    'is why very long hoses can throw off a charge unless the machine is programmed for hose '
                    'length. That is far more than half an ounce and well under eight ounces or a pound.')],
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
               'A J2843 machine has no built-in refrigerant identifier. Which external identifier must it '
               'accept?',
               'SAE J2912 unit via its USB port',
               'SAE J2927 unit via its USB port',
               'SAE J1771 unit via its USB port',
               'SAE J2913 unit via its USB port',
               'MACS says J2843 machines either integrate a J2927 identifier or accept input from a '
               'non-integrated J2912 identifier through a USB port. J2927 is the integrated version, J1771 '
               'is an older identifier standard, and J2913 covers leak detectors.'),
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
