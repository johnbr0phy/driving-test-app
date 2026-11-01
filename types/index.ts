// Question types
export type QuestionType = "Universal" | "State-Specific" | "CDL" | "CDLE" | "MOTO" | "CIVICS" | "P107" | "HAM" | "EPA608" | "CNA" | "PTCB" | "PHLEB" | "CCMA" | "CET" | "DANB" | "EMT" | "FOODMGR" | "REALESTATE" | "LIFEHEALTH" | "NOTARY" | "TEAS" | "AWSCCP" | "APLUS" | "FOODHANDLER" | "BOATING" | "HUNTER" | "SECPLUS" | "HESI" | "ASVAB" | "CPR" | "OSHA" | "FORKLIFT" | "ALCOHOL" | "ACCUPLACER" | "SECGUARD" | "LIFEGUARD" | "COSMO" | "PNC" | "VTNE" | "CAQC" | "UKLGV" | "AUQLD" | "AUSA" | "AUVIC" | "UKADI" | "UKCAR" | "UKPCV" | "CABC" | "AUNSW" | "UKMOTO" | "CAAB" | "CAON" | "CAMB" | "AUWA" | "UKSIA" | "UK18ED" | "CSCS" | "UKFOOD" | "UKAPLH" | "UKFAW" | "UKCARE" | "CAPAL" | "CAELEC" | "CAPSW" | "CASFA" | "CAWHMIS" | "CAGUARD" | "CAAUTO" | "CAPLUMB" | "CACARP" | "CAWELD" | "AUWHITE" | "AURSA" | "AURCG" | "AUFSS" | "AUFIRSTAID" | "AUFORKLIFT" | "AUWAH" | "UKLITU" | "CACIT" | "AUCIT" | "GULFRN" | "INRTO" | "NASM" | "RBT" | "CPC" | "JELEC" | "BARBER" | "FFI" | "POLICE" | "SIE" | "SERIES7" | "PCOC" | "CASK" | "CANS" | "UKSERU" | "NZROAD" | "IEDTT" | "PHLTO" | "ZAK53" | "SGBTT" | "AERTA" | "NGFRSC" | "KENTSA" | "MYKPP" | "HKDRIVE" | "PKDRIVE" | "ESDGT" | "PTIMT" | "BEDRIVE" | "DKTEORI" | "SETRAFIK" | "FITHEORY" | "GRDRIVE" | "RODRPCIV" | "HUKRESZ" | "MTTHEORY" | "PHLET" | "NGPOLICE" | "NGCDCFIB" | "NGARMY" | "NGCUSTOMS" | "TRCNPQE" | "HTL" | "CST" | "CRCST";

// Test mode
export type TestMode = "dmv" | "cdl" | "htl";

// CDL question categories
export type CDLQuestionCategory =
  | "vehicleInspection"
  | "safeDriving"
  | "basicControl"
  | "cargoHandling"
  | "emergencyProcedures"
  | "alcoholDrugs"
  | "nightDriving"
  | "weatherDriving"
  | "mountainDriving"
  | "railroadCrossings"
  | "hazardPerception"
  | "brakingSystems"
  | "vehicleSystems";

export type QuestionCategory =
  | "general"
  | "speedLimits"
  | "duiBac"
  | "gdlLicensing"
  | "insurance"
  | "seatbeltPhone"
  | "pointsPenalties"
  | "stateUnique"
  | "vehicleInspection"
  | "safeDriving"
  | "basicControl"
  | "cargoHandling"
  | "emergencyProcedures"
  | "alcoholDrugs"
  | "nightDriving"
  | "weatherDriving"
  | "mountainDriving"
  | "railroadCrossings"
  | "hazardPerception"
  | "brakingSystems"
  | "vehicleSystems"
  // ASCP HT/HTL content areas
  | "fixation"
  | "processing"
  | "embeddingMicrotomy"
  | "staining"
  | "stainRoutine"
  | "stainCarbohydrates"
  | "stainConnective"
  | "stainMicroorganisms"
  | "stainPigments"
  | "stainImmuno"
  | "laboratoryOperations"
  // NBSTSA CST content areas
  | "preoperativePreparation"
  | "intraoperativeProcedures"
  | "postoperativeProcedures"
  | "administrativePersonnel"
  | "equipmentSterilization"
  | "anatomyPhysiology"
  | "microbiology"
  | "surgicalPharmacology"
  // HSPA CRCST content areas
  | "departmentalConsiderations"
  | "cleaningDecontamination"
  | "preparationPackaging"
  | "sterilizationProcess"
  | "sterileStorageInventory"
  | "patientCareEquipment"
  | "professionalDevelopment"
  // Motorcycle permit (MSF manual chapters; basicControl, specialSituations, alcoholDrugs reused)
  | "ridingPreparation"
  | "laneStrategy"
  | "intersectionsPassing"
  | "roadHazards"
  // USCIS civics test sections
  | "principlesDemocracy"
  | "systemGovernment"
  | "rightsResponsibilities"
  | "colonialIndependence"
  | "history1800s"
  | "recentHistory"
  | "symbolsHolidays"
  // CDL endorsements (FMCSA manual sections)
  | "hazmatEndorsement"
  | "airBrakes"
  | "combinationVehicles"
  | "tankVehicles"
  | "passengerTransport"
  // FAA Part 107 ACS areas
  | "regulations"
  | "airspace"
  | "weather"
  | "loadingPerformance"
  | "operations"
  // Amateur radio Technician subelements
  | "hamRules"
  | "hamOperating"
  | "hamPropagation"
  | "hamPractices"
  | "hamElectrical"
  | "hamComponents"
  | "hamCircuits"
  | "hamSignals"
  | "hamAntennas"
  | "hamSafety"
  // EPA Section 608 sections
  | "epaCore"
  | "epaType1"
  | "epaType2"
  | "epaType3"
  // CNA (NNAAP) content areas
  | "activitiesDailyLiving"
  | "basicNursingSkills"
  | "restorativeSkills"
  | "emotionalMentalHealth"
  | "spiritualCultural"
  | "communication"
  | "clientRights"
  | "legalEthical"
  | "healthCareTeam"
  // PTCB (PTCE) knowledge domains
  | "ptcbMedications"
  | "ptcbPatientSafety"
  | "ptcbOrderEntry"
  | "ptcbFederal"
  // Phlebotomy (NHA CPT) domains
  | "routineCollections"
  | "safetyCompliance"
  | "patientPreparation"
  | "specimenProcessing"
  | "specialCollections"
  // CCMA (NHA) domains
  | "ccmaFoundations"
  | "ccmaAnatomy"
  | "ccmaIntakeVitals"
  | "ccmaGeneralCare"
  | "ccmaInfectionSafety"
  | "ccmaLabProcedures"
  | "ccmaPhlebotomy"
  | "ccmaEkg"
  | "ccmaCareCoordination"
  | "ccmaAdministrative"
  | "ccmaCommunication"
  | "ccmaLawEthics"
  // CET (NHA EKG technician) domains
  | "ekgAcquisition"
  | "ekgSafetyPatientCare"
  | "ekgAnalysis"
  // DANB CDA components
  | "gcEvaluation"
  | "gcPatientManagement"
  | "gcChairside"
  | "gcDentalMaterials"
  | "rhsRadiography"
  | "iceInfectionControl"
  // NREMT EMT domains
  | "sceneSizeUp"
  | "primaryAssessment"
  | "secondaryAssessment"
  | "treatmentTransport"
  | "emsOperations"
  // Food protection manager content areas
  | "foodborneContamination"
  | "flowOfFood"
  | "timeTemperature"
  | "personalHygiene"
  | "cleaningSanitizing"
  | "facilitiesPests"
  | "managementSystems"
  // Real estate salesperson national exam
  | "rePropertyCharacteristics"
  | "reOwnershipTitle"
  | "reValuation"
  | "reContractsAgency"
  | "rePractice"
  | "reDisclosures"
  | "reFinancing"
  | "reMath"
  // Life and health insurance license exam
  | "insuranceRegulation"
  | "generalInsurance"
  | "lifeBasics"
  | "lifePolicyTypes"
  | "lifeProvisions"
  | "annuitiesRetirement"
  | "healthBasics"
  | "healthProvisions"
  | "healthPolicyTypes"
  // Notary public exam
  | "notarialActs"
  | "signerIdentification"
  | "journalSealRecords"
  | "ethicsProhibitedActs"
  | "commissionLiability"
  // ATI TEAS 7 sections
  | "teasReading"
  | "teasMath"
  | "teasScience"
  | "teasEnglish"
  // AWS Cloud Practitioner domains
  | "cloudConcepts"
  | "securityCompliance"
  | "technologyServices"
  | "billingPricing"
  // CompTIA A+ Core 1 and Core 2 domains
  | "aplusMobile"
  | "aplusNetworking"
  | "aplusHardware"
  | "aplusVirtCloud"
  | "aplusHwTroubleshooting"
  | "aplusOS"
  | "aplusSecurity"
  | "aplusSwTroubleshooting"
  | "aplusOperational"
  // Food handler card categories
  | "fhBasics"
  | "fhHygiene"
  | "fhContamination"
  | "fhTimeTemp"
  | "fhCleaning"
  // Boating safety categories
  | "boatBasics"
  | "boatEquipment"
  | "boatNavigation"
  | "boatOperation"
  | "boatEmergencies"
  // Hunter education categories
  | "hsFirearmSafety"
  | "hsFirearmsAmmo"
  | "hsTechniques"
  | "hsWildlife"
  | "hsEthicsLaws"
  | "hsSurvival"
  // CompTIA Security+ SY0-701 domains
  | "secConcepts"
  | "secThreats"
  | "secArchitecture"
  | "secOperations"
  | "secGovernance"
  // HESI A2 sections
  | "hesiMath"
  | "hesiReading"
  | "hesiVocabulary"
  | "hesiGrammar"
  | "hesiBiology"
  | "hesiChemistry"
  | "hesiAnatomy"
  // ASVAB subtests
  | "asvabGeneralScience"
  | "asvabArithmetic"
  | "asvabWordKnowledge"
  | "asvabParagraph"
  | "asvabMathKnowledge"
  | "asvabElectronics"
  | "asvabAutoShop"
  | "asvabMechanical"

  // CPR, AED and first aid categories
  | "cprBasics"
  | "cprAdult"
  | "cprChildInfant"
  | "cprChoking"
  | "cprFirstAid"

  // OSHA 10 modules
  | "oshaIntro"
  | "oshaFalls"
  | "oshaElectrical"
  | "oshaStruckCaught"
  | "oshaHazcom"
  | "oshaHealth"

  // Forklift operator categories
  | "forkBasics"
  | "forkStability"
  | "forkInspection"
  | "forkOperation"
  | "forkLoads"

  // Alcohol server categories
  | "alcEffects"
  | "alcIntoxication"
  | "alcChecking"
  | "alcIntervention"
  | "alcLaw"

  // ACCUPLACER sections
  | "accReading"
  | "accWriting"
  | "accArithmetic"
  | "accQAS"
  | "accAAF"

  // Security guard categories
  | "sgRole"
  | "sgLegal"
  | "sgObservation"
  | "sgReports"
  | "sgEmergency"
  | "sgSafety"

  // Lifeguard categories
  | "lgProfessional"
  | "lgRecognition"
  | "lgRescue"
  | "lgCare"
  | "lgFacility"

  // Cosmetology categories
  | "cosInfection"
  | "cosAnatomy"
  | "cosChemistry"
  | "cosConsult"
  | "cosCutStyle"
  | "cosTexture"
  | "cosColor"
  | "cosSkin"
  | "cosNails"

  // Property and casualty categories
  | "pcGeneral"
  | "pcPolicy"
  | "pcHomeowners"
  | "pcAuto"
  | "pcCommercial"
  | "pcLiability"
  | "pcOther"

  // VTNE categories
  | "vtCare"
  | "vtPharm"
  | "vtSurgical"
  | "vtAnesthesia"
  | "vtLab"
  | "vtImaging"
  | "vtDentistry"
  | "vtEmergency"
  | "vtPain"
  | "vtComm"

  // WA learner's test categories
  | "auwaLicence"
  | "auwaSafety"
  | "auwaSpeed"
  | "auwaSigns"
  | "auwaIntersect"
  | "auwaLanes"
  | "auwaSharing"
  | "auwaParking"

  // Manitoba Class 5 categories
  | "cambLicence"
  | "cambSigns"
  | "cambRules"
  | "cambSharing"
  | "cambSpeed"
  | "cambConditions"
  | "cambImpaired"

  // Ontario G1 categories
  | "caonSigns"
  | "caonSignals"
  | "caonLicence"
  | "caonRightOfWay"
  | "caonSharing"
  | "caonDriving"
  | "caonConditions"

  // Alberta Class 7 categories
  | "caabLicensing"
  | "caabSignals"
  | "caabSigns"
  | "caabRightOfWay"
  | "caabDriving"
  | "caabEmergency"
  | "caabSharing"
  | "caabLaw"

  // UK motorcycle theory categories
  | "ukmotoAware"
  | "ukmotoMachine"
  | "ukmotoHandling"
  | "ukmotoVulnerable"
  | "ukmotoRules"
  | "ukmotoSigns"
  | "ukmotoDocs"

  // NSW DKT categories
  | "nswLicence"
  | "nswSpeed"
  | "nswImpair"
  | "nswGiveWay"
  | "nswSharing"
  | "nswLanes"
  | "nswParking"
  | "nswHazards"

  // ICBC knowledge test categories
  | "cabcSigns"
  | "cabcRow"
  | "cabcLanes"
  | "cabcSafe"
  | "cabcShare"
  | "cabcImpair"
  | "cabcEmerg"
  | "cabcLicence"

  // PCV theory test categories
  | "ukpcvHours"
  | "ukpcvVehicle"
  | "ukpcvPassengers"
  | "ukpcvDriver"
  | "ukpcvRoad"
  | "ukpcvIncidents"
  | "ukpcvSigns"

  // UK car theory test categories
  | "ukcarAlert"
  | "ukcarVehicle"
  | "ukcarMargins"
  | "ukcarHazard"
  | "ukcarMotorway"
  | "ukcarRules"
  | "ukcarSigns"
  | "ukcarEmerg"

  // ADI part 1 categories
  | "ukadiRoad"
  | "ukadiConditions"
  | "ukadiSigns"
  | "ukadiControl"
  | "ukadiTest"
  | "ukadiLaw"
  | "ukadiPublications"
  | "ukadiInstruction"

  // Victoria learner permit categories
  | "auvicLicence"
  | "auvicAlcohol"
  | "auvicSafe"
  | "auvicSpeed"
  | "auvicSigns"
  | "auvicGiveWay"
  | "auvicTurning"
  | "auvicSharing"

  // SA learner's test categories
  | "ausaGiveWay"
  | "ausaLicence"
  | "ausaSpeed"
  | "ausaSigns"
  | "ausaRoad"
  | "ausaShare"
  | "ausaParking"
  | "ausaSafety"

  // SIA door supervisor (UK)
  | "uksiaIndustry"
  | "uksiaSafety"
  | "uksiaComms"
  | "uksiaTerror"
  | "uksiaCrime"
  | "uksiaVenue"
  | "uksiaConflict"
  | "uksiaPhysical"

  // 18th Edition, BS 7671 (UK)
  | "uk18edScope"
  | "uk18edDefinitions"
  | "uk18edAssessment"
  | "uk18edProtection"
  | "uk18edSelection"
  | "uk18edInspection"
  | "uk18edSpecial"
  | "uk18edAppendices"

  // CITB HS&E test for Operatives (CSCS)
  | "cscsLegal"
  | "cscsWelfare"
  | "cscsHealth"
  | "cscsSafety"
  | "cscsHeights"
  | "cscsExcav"
  | "cscsEnv"

  // Level 2 food hygiene (UK)
  | "ukfoodLaw"
  | "ukfoodHazards"
  | "ukfoodHygiene"
  | "ukfoodTemp"
  | "ukfoodStorage"
  | "ukfoodClean"
  | "ukfoodAllergen"

  // Personal licence (APLH, England and Wales)
  | "ukaplhAuth"
  | "ukaplhPersonal"
  | "ukaplhPremises"
  | "ukaplhDps"
  | "ukaplhActivities"
  | "ukaplhPowers"
  | "ukaplhChildren"
  | "ukaplhAlcohol"

  // First Aid at Work (UK)
  | "ukfawRole"
  | "ukfawResus"
  | "ukfawBleed"
  | "ukfawBones"
  | "ukfawChest"
  | "ukfawBurns"
  | "ukfawIllness"

  // Care Certificate (UK)
  | "ukcareRole"
  | "ukcareDuty"
  | "ukcarePerson"
  | "ukcareComms"
  | "ukcareNutrition"
  | "ukcareAwareness"
  | "ukcareSafeguard"
  | "ukcareSafety"

  // Canadian Firearms Safety Course (capal)
  | "capalHistory"
  | "capalActions"
  | "capalAmmo"
  | "capalSafety"
  | "capalHandling"
  | "capalFiring"
  | "capalCare"
  | "capalStorage"
  | "capalLaw"

  // Red Seal Construction Electrician (Canada)
  | "caelecCommon"
  | "caelecDist"
  | "caelecWiring"
  | "caelecMotors"
  | "caelecSignal"

  // Ontario PSW (capsw)
  | "capswRole"
  | "capswComm"
  | "capswRights"
  | "capswSafety"
  | "capswAdl"
  | "capswHome"
  | "capswPal"
  | "capswMental"

  // Standard First Aid with CPR Level C, Canada (casfa)
  | "casfaRole"
  | "casfaCpr"
  | "casfaAirway"
  | "casfaBleed"
  | "casfaInjury"
  | "casfaMedical"
  | "casfaEnviro"

  // WHMIS 2015, Canada (cawhmis)
  | "cawhmisBasics"
  | "cawhmisHazards"
  | "cawhmisPictos"
  | "cawhmisLabels"
  | "cawhmisSds"
  | "cawhmisSafe"

  // Ontario security guard (caguard)
  | "caguardIndustry"
  | "caguardProcedures"
  | "caguardReports"
  | "caguardEmergency"
  | "caguardLaw"
  | "caguardCommunication"
  | "caguardForce"
  | "caguardFirstAid"

  // Red Seal Automotive Service Technician (caauto)
  | "caautoOcc"
  | "caautoEngine"
  | "caautoNetwork"
  | "caautoDriveline"
  | "caautoElectrical"
  | "caautoChassis"
  | "caautoBody"
  | "caautoHev"

  // Red Seal Plumber (caplumb)
  | "caplumbCommon"
  | "caplumbPipe"
  | "caplumbDwv"
  | "caplumbWater"
  | "caplumbFixtures"
  | "caplumbHydronic"
  | "caplumbSpecial"

  // Red Seal Carpenter (cacarp)
  | "cacarpCommon"
  | "cacarpLayout"
  | "cacarpConcrete"
  | "cacarpFraming"
  | "cacarpExterior"
  | "cacarpInterior"
  | "cacarpReno"

  // Red Seal Welder (caweld)
  | "caweldCommon"
  | "caweldLayout"
  | "caweldFab"
  | "caweldCut"
  | "caweldSmaw"
  | "caweldWire"
  | "caweldGtaw"

  // White Card, CPCWHS1001 (auwhite)
  | "auwhiteLaw"
  | "auwhiteRisk"
  | "auwhiteHeights"
  | "auwhitePlant"
  | "auwhiteHealth"
  | "auwhiteEnv"
  | "auwhiteSigns"
  | "auwhiteEmerg"
  // RSA, SITHFAB021 (aursa)
  | "aursaLaw"
  | "aursaAge"
  | "aursaDrinks"
  | "aursaIntox"
  | "aursaRefuse"
  | "aursaCare"
  // RCG / RSG, SITHGAM022 (aurcg)
  | "aurcgLaw"
  | "aurcgHarm"
  | "aurcgOdds"
  | "aurcgEnv"
  | "aurcgExcl"
  | "aurcgAssist"
  | "aurcgIncident"
  // Food Safety Supervisor, Australia (aufss)
  | "aufssLaw"
  | "aufssHazards"
  | "aufssHygiene"
  | "aufssTemp"
  | "aufssHandling"
  | "aufssClean"
  | "aufssAllergen"
  // HLTAID011 Provide First Aid (aufirstaid)
  | "aufirstaidRole"
  | "aufirstaidCpr"
  | "aufirstaidAirway"
  | "aufirstaidBleed"
  | "aufirstaidBones"
  | "aufirstaidMedical"
  | "aufirstaidEnviro"
  | "aufirstaidVenom"
  // Forklift licence LF, Australia (auforklift)
  | "auforkliftLicence"
  | "auforkliftPlan"
  | "auforkliftChecks"
  | "auforkliftLoads"
  | "auforkliftOperate"
  | "auforkliftPower"
  // Work safely at heights, RIIWHS204 (auwah)
  | "auwahLaw"
  | "auwahRisk"
  | "auwahControl"
  | "auwahPlatform"
  | "auwahLadder"
  | "auwahHarness"
  | "auwahRoof"
  | "auwahRescue"

  // India RTO learner's licence
  | "inrtoLicence"
  | "inrtoMandatory"
  | "inrtoCaution"
  | "inrtoSignals"
  | "inrtoRules"
  | "inrtoParking"
  | "inrtoSafety"
  | "inrtoDuties"

  // nasm
  | "nasmScience"
  | "nasmClient"
  | "nasmAssess"
  | "nasmProgram"
  | "nasmTechnique"
  | "nasmProfessional"

  // rbt
  | "rbtData"
  | "rbtAssess"
  | "rbtAcq"
  | "rbtReduce"
  | "rbtDoc"
  | "rbtEthics"

  // cpc
  | "cpcTerm"
  | "cpcAnat"
  | "cpcComp"
  | "cpcGuide"
  | "cpcIcd"
  | "cpcHcpcs"
  | "cpcInteg"
  | "cpcMusc"
  | "cpcCardio"
  | "cpcDigest"
  | "cpcUro"
  | "cpcNerve"
  | "cpcRad"
  | "cpcLab"
  | "cpcMed"
  | "cpcEm"
  | "cpcAnes"
  | "cpcCases"

  // jelec
  | "jelecGeneral"
  | "jelecTheory"
  | "jelecBranch"
  | "jelecServices"
  | "jelecGround"
  | "jelecWiring"
  | "jelecEquip"
  | "jelecMotors"
  | "jelecSpecial"

  // barber
  | "barInfection"
  | "barAnatomy"
  | "barChemistry"
  | "barTools"
  | "barConsult"
  | "barCutting"
  | "barStyling"
  | "barChemical"
  | "barShaving"
  | "barFacial"

  // ffi
  | "ffiSafety"
  | "ffiBehavior"
  | "ffiPpe"
  | "ffiTools"
  | "ffiLadders"
  | "ffiRescue"
  | "ffiWater"
  | "ffiAttack"

  // police
  | "polReading"
  | "polGrammar"
  | "polReports"
  | "polMath"
  | "polJudgment"
  | "polReasoning"

  // sie
  | "sieMarkets"
  | "sieEquityDebt"
  | "sieFunds"
  | "sieTrading"
  | "sieAccounts"
  | "sieRegulation"

  // series7
  | "s7Business"
  | "s7Accounts"
  | "s7Equity"
  | "s7Debt"
  | "s7Options"
  | "s7Funds"
  | "s7Suitability"
  | "s7Trading"

  // pcoc
  | "pcocRules"
  | "pcocEquipment"
  | "pcocBefore"
  | "pcocRoadRules"
  | "pcocAids"
  | "pcocEmergencies"

  // cask
  | "caskSigns"
  | "caskSignals"
  | "caskLicence"
  | "caskRightOfWay"
  | "caskSharing"
  | "caskDriving"
  | "caskConditions"

  // cans
  | "cansRegSigns"
  | "cansWarnSigns"
  | "cansWorkSigns"
  | "cansSignals"
  | "cansLicence"
  | "cansRightOfWay"
  | "cansDriving"
  | "cansSharing"
  | "cansConditions"

  // ukseru
  | "serLicensing"
  | "serVehicles"
  | "serJourneys"
  | "serSafety"
  | "serBehaviour"
  | "serParking"
  | "serDriving"
  | "serEquality"
  | "serSafeguarding"
  | "serRideshare"

  // nzroad
  | "nzLicence"
  | "nzSigns"
  | "nzGiveWay"
  | "nzRoad"
  | "nzSharing"
  | "nzParking"
  | "nzConditions"

  // iedtt
  | "iedttLicence"
  | "iedttSigns"
  | "iedttMarkings"
  | "iedttRules"
  | "iedttMotorway"
  | "iedttUsers"
  | "iedttSafety"
  | "iedttConditions"

  // phlto
  | "phLicence"
  | "phSigns"
  | "phMarkings"
  | "phRightOfWay"
  | "phSpeed"
  | "phParking"
  | "phSafetyLaws"
  | "phEmergency"

  // zak53
  | "zaLicence"
  | "zaRightOfWay"
  | "zaSpeed"
  | "zaParking"
  | "zaRegulatory"
  | "zaWarning"
  | "zaGuidance"
  | "zaMarkings"
  | "zaControls"

  // sgbtt
  | "sgSigns"
  | "sgMarkings"
  | "sgRoadRules"
  | "sgJunctions"
  | "sgParking"
  | "sgVehicle"
  | "sgRoadSafety"

  // aerta
  | "aeLicence"
  | "aeSigns"
  | "aeMarkings"
  | "aeRightOfWay"
  | "aeLanes"
  | "aeSafety"
  | "aeConditions"

  // ngfrsc
  | "ngLicence"
  | "ngSigns"
  | "ngMarkings"
  | "ngRightOfWay"
  | "ngSpeed"
  | "ngParking"
  | "ngSafety"
  | "ngEmergency"

  // kentsa
  | "keLicence"
  | "keSigns"
  | "keJunctions"
  | "keRoad"
  | "keUsers"
  | "keParking"
  | "keConditions"

  // mykpp
  | "mySigns"
  | "myMarkings"
  | "myRules"
  | "mySpeed"
  | "myParking"
  | "myLicence"
  | "myDefensive"
  | "myEmergency"

  // hkdrive
  | "hkLicence"
  | "hkSigns"
  | "hkJunctions"
  | "hkRoad"
  | "hkSafety"
  | "hkSharing"
  | "hkParking"
  | "hkConditions"

  // Pakistan driving licence
  | "pkLicence"
  | "pkWarning"
  | "pkRegulatory"
  | "pkMarkings"
  | "pkJunctions"
  | "pkRoad"
  | "pkMotorway"
  | "pkSafety"
  | "pkEmergency"
  // Spain driving theory (esdgt)
  | "esdgtLicence"
  | "esdgtSigns"
  | "esdgtMarkings"
  | "esdgtPriority"
  | "esdgtSpeed"
  | "esdgtOvertaking"
  | "esdgtParking"
  | "esdgtLights"
  | "esdgtSafety"
  // Portugal driving theory (ptimt)
  | "ptSigns"
  | "ptMarkings"
  | "ptPriority"
  | "ptSpeed"
  | "ptParking"
  | "ptDriver"
  | "ptVehicle"
  | "ptLicence"
  // Belgium driving theory (bedriving)
  | "beLicence"
  | "beDanger"
  | "bePriority"
  | "beSigns"
  | "beMarkings"
  | "beSpeed"
  | "beManoeuvre"
  | "beParking"
  | "beVulnerable"
  | "beSafety"
  // Denmark driving theory (dkteori)
  | "dkVehicle"
  | "dkBehaviour"
  | "dkBasics"
  | "dkLanes"
  | "dkPassing"
  | "dkJunctions"
  | "dkMotorway"
  // Sweden driving theory (setrafik)
  | "setrJunctions"
  | "setrSigns"
  | "setrMarkings"
  | "setrSpeed"
  | "setrParking"
  | "setrSafety"
  | "setrVehicle"
  | "setrEnvironment"
  | "setrPersonal"
  // Finland driving theory (fitheory)
  | "fiYield"
  | "fiPosition"
  | "fiOvertake"
  | "fiParking"
  | "fiSigns"
  | "fiMarkings"
  | "fiUsers"
  | "fiDriver"
  | "fiVehicle"
  // Greece driving theory (grdriving)
  | "grLicence"
  | "grWarning"
  | "grRegulatory"
  | "grInfo"
  | "grPriority"
  | "grSpeed"
  | "grParking"
  | "grSafety"
  | "grEmergency"
  // Romania driving theory (rodrpciv)
  | "rodrLicence"
  | "rodrWarning"
  | "rodrRegulatory"
  | "rodrMarkings"
  | "rodrPriority"
  | "rodrSpeed"
  | "rodrParking"
  | "rodrSafety"
  | "rodrEmergency"
  // Hungary driving theory (hukresz)
  | "huLicence"
  | "huWarning"
  | "huRegulatory"
  | "huMarkings"
  | "huPriority"
  | "huSpeed"
  | "huMotorway"
  | "huParking"
  | "huSafety"
  // Malta driving theory (mttheory)
  | "mtLicence"
  | "mtSigns"
  | "mtMarkings"
  | "mtJunctions"
  | "mtRoad"
  | "mtParking"
  | "mtVulnerable"
  | "mtSafety"
  | "mtEmergency"
  // Philippines LET (LEPT)
  | "phletComm"
  | "phletSciMath"
  | "phletCivic"
  | "phletPractical"
  | "phletProfession"
  | "phletCurriculum"
  | "phletLearners"
  | "phletAssess"
  | "phletField"

  // Nigeria Police recruitment
  | "ngpolGrammar"
  | "ngpolVocab"
  | "ngpolNumber"
  | "ngpolWordProblems"
  | "ngpolReasoning"
  | "ngpolConstitution"
  | "ngpolRights"
  | "ngpolPolicing"

  // CDCFIB recruitment CBT (Nigeria)
  | "cdcfibServices"
  | "cdcfibSafety"
  | "cdcfibGeography"
  | "cdcfibEnvironment"
  | "cdcfibGrammar"
  | "cdcfibVocab"
  | "cdcfibMaths"
  | "cdcfibReasoning"

  // Nigerian Army recruitment
  | "ngarmyGrammar"
  | "ngarmyVocab"
  | "ngarmyArith"
  | "ngarmyMaths"
  | "ngarmyReasoning"
  | "ngarmyHistory"
  | "ngarmyForces"
  | "ngarmyAfrica"

  // Nigeria Customs recruitment
  | "cusGrammar"
  | "cusVocab"
  | "cusArith"
  | "cusQuant"
  | "cusReason"
  | "cusCustoms"
  | "cusEconomy"
  | "cusWorld"

  // Nigeria TRCN PQE
  | "trcnFoundations"
  | "trcnTeaching"
  | "trcnReading"
  | "trcnLanguage"
  | "trcnNumber"
  | "trcnMathTeach"
  | "trcnDigital"
  | "trcnIctTeach"
  | "trcnProtect"
  | "trcnSafeSchools"

  // CompTIA Network+ N10-009 domains
  | "netModels"
  | "netInfra"
  | "netSwitchRoute"
  | "netWireless"
  | "netOps"
  | "netSecurity"
  | "netTroubleMethod"
  | "netTroubleServices"

  // Life in the UK test
  | "lituValues"
  | "lituUk"
  | "lituHistEarly"
  | "lituHistLater"
  | "lituSociety"
  | "lituGov"

  // Canadian citizenship test
  | "cacitRights"
  | "cacitPeople"
  | "cacitHistory"
  | "cacitModern"
  | "cacitGov"
  | "cacitElect"
  | "cacitJustice"
  | "cacitSymbols"
  | "cacitEconomy"
  | "cacitRegions"

  // Australian citizenship test
  | "aucitPeople"
  | "aucitDemocracy"
  | "aucitGov"
  | "aucitValues"

  // Gulf registered nurse licensing exam
  | "gulfrnFund"
  | "gulfrnPharm"
  | "gulfrnCardioResp"
  | "gulfrnMedSurg"
  | "gulfrnMental"
  | "gulfrnCommunity"
  | "gulfrnMaternal"
  | "gulfrnPeds"
  | "gulfrnLead"

  // Cisco CCNA 200-301 domains
  | "ccnaFundamentals"
  | "ccnaAddressing"
  | "ccnaAccess"
  | "ccnaRouting"
  | "ccnaOspf"
  | "ccnaServices"
  | "ccnaSecurity"
  | "ccnaAutomation"

  // QLD learner licence categories
  | "auqldGiveWay"
  | "auqldLicence"
  | "auqldSigns"
  | "auqldRoad"
  | "auqldSafety"

  // UK LGV theory categories
  | "uklgvHours"
  | "uklgvVehicle"
  | "uklgvLoading"
  | "uklgvRoad"
  | "uklgvDocs"
  | "uklgvIncidents"
  | "uklgvSigns"

  // Quebec SAAQ categories
  | "caqcLicence"
  | "caqcRules"
  | "caqcSigns"
  | "caqcSignals"
  | "caqcRightOfWay"
  | "caqcSharing"
  | "caqcRisk"
  | "caqcDriving";

export interface Question {
  type: QuestionType;
  state: string; // 2-letter code or "ALL"
  questionId: string;
  category: QuestionCategory;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A", "B", "C", or "D"
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
  /** After shuffleQuestionOptions: the bank letter shown at A, B, C, D ("CADB"). */
  optionOrder?: string;
}

// User answer types
export interface UserAnswer {
  questionId: string;
  userAnswer: string; // "A", "B", "C", or "D"
  isCorrect: boolean;
  answeredAt: Date;
  isFlagged?: boolean;
}

// Test session types
export interface TestSession {
  id: string;
  testNumber: number; // 1-4
  state: string; // 2-letter code
  questions: Question[];
  answers: UserAnswer[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  totalQuestions: number;
}

// User progress types
export interface UserProgress {
  userId: string;
  state: string; // 2-letter code
  test1Completed: boolean;
  test2Completed: boolean;
  test3Completed: boolean;
  test4Completed: boolean;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  lastActivity: Date;
  completedSessions: TestSession[];
}

// Category stats for progress tracking
export interface CategoryStats {
  category: QuestionCategory;
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number; // percentage
}

// Test attempt statistics
export interface TestAttemptStats {
  testNumber: number;
  state: string;
  attemptCount: number;
  firstScore: number; // Score on first attempt
  bestScore: number; // Highest score achieved
  lastAttemptDate: Date;
}

// Per-question performance tracking
export interface QuestionPerformance {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  timesWrong: number;
  accuracy: number; // percentage
}

// State selection
export interface State {
  name: string;
  code: string; // 2-letter code
  slug: string; // URL-friendly name (e.g., "california")
  dmvName: string; // Official DMV name (e.g., "DMV", "BMV", "RMV")
  writtenTestQuestions: number; // Number of questions on actual DMV test
  passingScore: number; // Percentage needed to pass
  minPermitAge: string; // Minimum age for learner's permit
}

// Subscription/Premium types
export interface Subscription {
  isPremium: boolean;
  purchasedAt: string | null; // ISO timestamp
  stripeCustomerId: string | null;
  stripePaymentId: string | null;
}
