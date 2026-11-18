# V3 source record

Read and checked November 18, 2026. Prior unchanged evidence remains in the v1 and v2 source records; authoring-evidence.json preserves the complete forty-item mapping, including per-distractor reasons. Only training narrative and primary regulatory/manufacturer material were used, not question pools or review questions.

## Material source variation

The January 2025 training narrative, printed page 51, describes blocking recharge after a failed vacuum-decay test. The manufacturer’s [Robinair AC1234-6 manual, 567817 Rev F](https://www.robinair.com/sites/default/files/documents/567817%20REV%20F%20EN.pdf), printed pages 29–30, permits a partial test charge after a failed vacuum test for leak diagnosis, with repairs and restarting the checks required. These are different documented workflows. Neither is asserted to describe every machine. YF-003 now states its procedural scope; YF-014 now tests recovery before opening for repair, not controller menu permission. YF-012 continues to supply its hypothetical machine’s 15% condition explicitly. YF-013’s floor-outlet sampling position comes from the described training sequence, not an inspected universal clause of J2843. The full SAE standard was not accessed.

Cached manufacturer file: robinair-567817-rev-f-en.pdf in this directory. The underlying manual is also linked by Robinair’s current literature/manuals page.

## Regulations and practical scope

- [40 CFR 82.32](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B/section-82.32), paragraphs (h) and (e)(2): service involving refrigerant; extraction before service where discharge is reasonably expected. Supports REG-026 and YF-014. eCFR displayed Title 40 current through November 16, 2026.
- [40 CFR 82.34](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B/section-82.34), paragraph (a): paid refrigerant-service qualification. REG-017 and REG-026.
- [40 CFR 82.42](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B/section-82.42), (a)(1), owner or responsible officer signature; (c), retail notice for relevant containers under 20 pounds. REG-025 and REG-027. Notice applicability does not erase other sales restrictions.
- [EPA MVAC system servicing requirements](https://www.epa.gov/mvac/regulatory-requirements-mvac-system-servicing), Applicability of Unique Fittings to Manifold Gauges and Refrigerant Identifiers: gauge-end standardized fitting exception. EQP-004.
- [EPA Section 608 and Section 609 overlap](https://www.epa.gov/section608/section-608-and-section-609-overlap), Technician Certification: passenger-car MVAC credential scope. REG-017.
- [DTNA Cascadia maintenance manual, Preliminary Checks](https://www.dtnatechlit.com/portal-public/0000113191-cascadia-maintenance-manual/0000113191.xml/%24/0000116542), step 4: external feeler-gauge clutch-clearance inspection. Document 0000116542, topic published November 22, 2024, manual published May 15, 2024. REG-026 uses this inspection, not an assumed clutch replacement procedure. Other steps requiring repair do not define the inspection’s refrigerant-service scope.
- [ASE A1–A9 tests](https://ase.com/tests/a1-a9/) and [ASE refrigerant FAQ](https://www.asecampus.com/ihtml/application/upload/1592.zip_files/r3_faqs.htm): real A7 Heating and Air Conditioning credential and explicit distinction from Section 609. Only the credential distinction was used, not test/sample material.

## Technical narrative and manufacturer scope

- [MACS January 2025 training manual](https://macsmobileairclimate.org/wp-content/uploads/2025/01/MACS-609-CertTrainingManual-2025.pdf): printed pages 24–25 and 51 for specified full charge; 22 for solvent boiling point and removal difficulty; 36 for hose insertion, lubrication and fit; 44 for evaporator marking; 51 for the staged evaporator sampling position. Existing cached PDF: /Users/johnbrophy/tigertest-next20-progress/epa609-research/macs2025.pdf. SRV-029’s quantities are explicitly hypothetical. SRV-023 does not claim boiling point alone governs vacuum removal.
- [Robinair 22791 manual, 550029_EN_0](https://www.robinair.com/sites/default/files/documents/550029_EN_0.pdf), PDF page 2, Specifications: infrared refrigerant sensing range. SRV-006 concerns detector/medium compatibility, not permission to use arbitrary test gases.
- [Mastercool nitrogen pressure regulators](https://mastercool.com/product/nitrogen-pressure-regulators/), Product Description: nitrogen leak checking of empty automotive A/C systems is a real neighboring method. It does not establish nitrogen sensitivity of the Robinair infrared detector. No regulator pressure or procedure is transferred to a vehicle without its instructions.
- [INFICON forming-gas charging kit](https://www.inficon.com/en/products/leak-detectors/forming-gas-charging-kit), product description and [manufacturer product sheet](https://www.inficon.com/media/9667/download/Forming-Gas-Charging-Kit-Product-Sheet-%28English%29.pdf?language=es&v=1): calls for a forming-gas detector such as AST100FG. The page was initially retrieved, later direct opens timed out; current indexed manufacturer text corroborated the detector requirement.
- [INFICON automotive leak testing brochure](https://www.inficon.com/media/5319/download/Leak-Testing-in-the-Automotive-Industry.pdf%3Fv=1&inline=true&language=en), PDF page 2: pressure-decay, hydrogen and helium methods are distinct. Manufacturing-method descriptions are evidence that the rival methods exist, not authorization to use them in the question’s service circuit.
- [DENSO oil guidance, December 17, 2024](https://www.denso-am.eu/news/dont-overlook-compressor-oil-reminds-denso), ND-oil 11 and ND-oil 12 paragraphs: electric versus mechanical drive applications. YF-004’s wrong design criteria are not invented alternate oil approvals.

## SAE scopes

Only publicly available scope descriptions were read. YF-001’s marking requirement is supported by the training narrative; the actual related standards make credible competing scopes.

- [J2842, June 2026](https://saemobilus.sae.org/standards/j2842_202606-design-criteria-certification-oem-mobile-air-conditioning-evaporator-service-replacements): evaporator design and certification.
- [J639, November 2020](https://saemobilus.sae.org/standards/j639_202011-safety-design-standards-motor-vehicle-refrigerant-vapor-compression-systems): broader system safety/design.
- [J2844, January 2013](https://saemobilus.sae.org/standards/j2844_201301-r-1234yf-hfo-1234yf-new-refrigerant-purity-container-requirements-use-mobile-air-conditioning-systems): new refrigerant purity/containers.
- [SAE current topic listing](https://saemobilus.sae.org/topics/interiors-cabins-and-cockpits) lists J2099_202608 and its scope for recycled R-134a and R-1234yf purity. Direct access to that revision’s standalone page timed out. The historical [J2099 page](https://saemobilus.sae.org/standards/j2099_201102-standard-purity-recycled-r-134a-hfc-134a-r-1234yf-hfo-1234yf-use-mobile-air-conditioning-systems) also identifies the August 18, 2026 current revision. No claim that the full 2026 standard was read.

## Exact SDS provenance

[Honeywell Solstice yf SDS hosted by Audi](https://www.audi.kkecomm.com/Files/Product%20assets/SDS/R-1234yf.pdf): document 10617229, product 000000011078, version 3.4, revised March 22, 2024, printed April 17, 2024. Manufacturer is Honeywell; Audi is the host. Web retrieval provided the actual 17-page PDF, including title/version page, section 4 rapid-evaporation frostbite and sections 5–6 low-area vapor accumulation. Direct local download returned HTTP 403, so there is no cached copy and no claim this is the latest SDS. A reviewer found a different Honeywell version hosted by Rittal; that is not misrepresented as this source. EQP-011 and YF-006 question rows remain unchanged; their evidence now identifies exact provenance.
