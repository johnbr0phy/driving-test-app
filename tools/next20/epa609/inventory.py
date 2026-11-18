"""Reproduce the candidate objective inventory, not a question bank."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent
GROUPS = {
"regulation": """
EPA servicing;82.30(b),82.32(g)|Recognize barter and paid fleet work as service for consideration
82.32(d)|Distinguish passenger comfort cooling from refrigerated cargo
EPA overlap|Select 609 or 608 Type II for MVAC-like off-road equipment
EPA overlap|Recognize R-22 bus cooling as Section 608 equipment
82.32(e)(4)|Apply equipment requirements to an MVAC shop doing only top-offs
82.32(e)(4)|Distinguish equipment ownership requirements for MVAC-like top-off-only work
82.32(e)(5)|Require recovery equipment availability when opening MVAC-like appliances
82.32(e)(3)|Apply normal service requirements to mobile off-site work
82.32(e)(1)|Recycle recovered refrigerant before returning it to its original vehicle
82.32(e)(2)|Recognize the limited same-owner off-site recycling pathway
EPA servicing:Refrigerant Handling|Distinguish recycling from reclamation to virgin specifications
EPA servicing:Venting Prohibition|Apply the CO2 venting exception without removing 609 duties
EPA servicing:Recordkeeping|Identify the first-time shop equipment certification obligation
EPA servicing:Recordkeeping|Recognize that later equipment purchases do not trigger recertification
EPA servicing:Recordkeeping|Identify the responsible officer who signs the shop certification
EPA servicing:Recordkeeping|Identify the equipment identification information in certification
EPA servicing:Recordkeeping|Retain technician certification proof at the shop
EPA servicing:Recordkeeping|Retain off-site refrigerant destination records for three years
EPA servicing:Safe Disposal|Identify final disposer responsibility for refrigerant removal
82.34(d)|Qualify salvage refrigerant for later reuse in an MVAC
82.34(d)(2)|Limit unreclaimed salvage refrigerant sale to certified technicians
EPA sales|Limit refrigerant purchases to equipment covered by certification
EPA sales|Apply the small substitute-refrigerant can exception with valves and fittings
EPA servicing:ODS Sales|Apply the special under-20-pound CFC-12 purchase restriction
EPA servicing:ODS Sales|Document the resale-only exception for small ODS containers
EPA sales|Recognize employer purchasing with written proof of certified employees
EPA sales|Identify purchaser, date and quantity on wholesaler invoices
EPA servicing:Technology Transitions|Distinguish new-vehicle refrigerant restrictions from existing-vehicle service
EPA retrofit:Labels|Replace or obscure obsolete refrigerant information after retrofit
EPA retrofit:Compressor Shutoff Switch|Add a pressure cutoff when retrofitting a system with a relief device
EPA retrofit:Barrier Hoses|Choose barrier hoses when required by a retrofit blend
EPA retrofit:Remove Original Refrigerant|Recognize why a CFC-12 substitute is not a drop-in
""",
"environment_and_refrigerants": """
EPA impacts:CFC-12|Connect stratospheric ozone loss to increased UVB exposure
EPA impacts:CFC-12|Distinguish protective stratospheric ozone from ground-level smog
EPA impacts:HFC-134a|Distinguish ozone depletion from greenhouse warming effects
MACS p1|Interpret GWP relative to carbon dioxide
EPA impacts:SNAP|Understand that acceptance depends on end use and use conditions
EPA impacts:SNAP|Reject hydrocarbon substitutes for MVAC use
EPA impacts:HFC-152a|Recognize the A2 classification of HFC-152a
EPA impacts:HFO-1234yf|Recognize the A2L classification of HFO-1234yf
EPA impacts:CO2|Recognize much higher operating pressures in R-744 systems
EPA impacts:Lower-GWP|Recognize that new-system approval does not authorize retrofit use
""",
"safety_and_equipment": """
MACS p11|Select eye protection for pressurized refrigerant work
MACS p11|Respond to accidental refrigerant discharge by ventilation
MACS p11|Recognize hazardous decomposition near hot surfaces
MACS p11|Avoid compressed-air pressure testing because refrigerant-air mixtures can combust
MACS p11|Keep hygroscopic lubricant containers tightly sealed
MACS p11|Use impervious gloves to avoid PAG skin exposure
MACS p11|Protect painted and elastomer surfaces from PAG spills
MACS p11|Identify a cylinder approved for refilling rather than a disposable supply container
MACS p11|Recognize why routine maintenance and internal machine repair require different authority
MACS p11|Disconnect electrical power before equipment maintenance unless directed otherwise
MACS p11|Choose a grounded, adequately rated extension when unavoidable
MACS p11|Distinguish a similar-looking fuel injection port from an A/C service port
MACS p12|Replace a distorted service hose seal
MACS p12|Maintain machine filter-driers to preserve recycled refrigerant purity
MACS p8;EPA fittings|Keep refrigerant-specific hose-end fittings permanently attached
MACS p8|Locate shutoff valves near the vehicle end of service hoses
82.36(a);EPA equipment|Select certified R-134a recovery/recycling equipment
82.36(a);EPA equipment|Distinguish recovery-only capability from recycling capability
MACS p35|Recover residual refrigerant before disposing of a supply cylinder
MACS p36|Verify fitting insertion through the ferrule inspection opening
MACS p36|Diagnose irregular crimps as die mismatch or wear
MACS p36|Avoid a mismatched crimper that damages the hose barrier
""",
"recovery_and_contamination": """
MACS p13|Use service-port caps as the primary leak seal
MACS p13|Clean connection surfaces before opening the circuit
MACS p13|Use an identifier to check actual refrigerant rather than trust the label
MACS p13|Recognize that an identifier cannot identify every possible mixture
MACS p14|Check for pressure before attempting recovery
MACS p14|Explain why cooling during recovery slows removal from an accumulator
MACS p14|Use controlled external warming rather than flame to aid accumulator outgassing
MACS p14|Restart recovery after the prescribed pause reveals returning pressure
MACS p15|Distinguish older equipment needing pre-warm procedures from newer equipment
MACS p15|Perform the manual or automatic air-purge process appropriate to the machine
MACS p16|Measure oil removed during recovery and replace it with new specified oil
MACS p16|Identify oil type and viscosity from manufacturer information
MACS p16|Explain how excessive oil reduces heat transfer
MACS p31|Recognize that recycling equipment cannot separate mixed refrigerants
MACS p31|Understand how contaminated equipment spreads contamination to later vehicles
MACS p32-33|Verify supply-cylinder contents despite authentic-looking packaging
MACS p33|Recognize flammable contamination as requiring recovery equipment suitable for the hazard
MACS p34|Require reclamation of refrigerant from stationary sources before MVAC use
""",
"service_and_charge_accuracy": """
MACS p17|Choose a detector with sufficient sensitivity for a small leak
MACS p18|Inspect oil traces as possible leak evidence
MACS p18|Perform electronic leak detection with the engine off to limit air movement
MACS p18|Avoid solvents that interfere with electronic leak detection
MACS p18|Distinguish a limited detection charge from the full charge needed for compressor operation
MACS p20|Use fluorescent dye compatible with the system lubricant and materials
MACS p21|Check for factory dye before adding more
MACS p21|Match UV lamp and protective glasses to the dye system
MACS p21|Allow circulation time before expecting dye at a leak
MACS p21|Inspect inaccessible component undersides with a mirror or clean wipe
MACS p22|Recheck the full system after leak repairs
MACS p22|Recognize that flushing-material compatibility does not establish cleaning effectiveness
MACS p22|Explain residual flushing solvent dilution of compressor oil
MACS p22|Understand why fine condenser passages can retain debris after flushing
MACS p23|Account for elevation when interpreting a vacuum gauge reading
MACS p23|Distinguish service-hose vacuum from the vacuum throughout the system
MACS p23|Maintain vacuum-pump oil to preserve evacuation performance
MACS p24|Replace moisture-saturated desiccant after extended atmospheric exposure
MACS p24|Relate an undercharge to impaired lubricant circulation
MACS p24|Relate an overcharge to excessive pressure and possible cutoff
MACS p25|Check updated manufacturer charge specifications rather than only the original label
MACS p25-26|Convert decimal pounds into ounces without treating decimals as ounces
MACS p26|Convert a metric charge to the machine display units
MACS p26|Interpret a one-sided charge tolerance
MACS p27|Distinguish display resolution from actual scale accuracy
MACS p27|Verify scale calibration with a reference weight
MACS p28|Account for changed service-hose length in delivered charge
MACS p28|Recognize pressure readings cannot measure refrigerant mass
""",
"hfo1234yf_specific": """
MACS p43|Prevent refrigerant accumulation in low spaces and inside the cabin during charging
MACS p43|Control ignition sources from nearby non-A/C shop equipment
MACS p43|Use an LED work light to reduce broken-bulb ignition risk
MACS p43,45|Perform model-specific high-voltage isolation before EV system repair
MACS p43|Let high-side pressure fall before connecting service equipment
MACS p44|Select a new compliant evaporator instead of repairing or salvaging one
MACS p44|Recognize that an evaporator's corrosion and burst resistance protect occupants
MACS p45|Secure cylinders in transport and avoid heat and low-area storage
MACS p45|Do not assume every electric compressor uses the same lubricant as a belt-driven unit
MACS p46-47|Read container chemical designation rather than relying on trade name
MACS p47|Use the integrated or external identifier interface required for R-1234yf RRR equipment
MACS p48|Interpret a failed purity check as requiring a separate contaminated-refrigerant tank
MACS p50|Select J2843 or J3030 RRR equipment rather than ordinary R-134a-only equipment
MACS p50|Select J2851 equipment for contaminated refrigerant recovery
MACS p51|Stop a recharge when vacuum decay exceeds the equipment limit
MACS p51|Set blower and detector placement for the precharge evaporator leak check
MACS p51|Recognize the partial charge as a leak-check stage rather than completed charging
MACS p51|Complete the remaining charge only after passing both leak checks
MACS p52|Replace seals and align fittings to avoid introducing service leaks
MACS p52|Secure lines against vibration and rubbing after service
"""
}
GROUPS["primary_regulation_additions"] = """
82.42(b)(5)|Provide a credentialed EPA inspector access to required shop records
82.42(c)|Display the required certification notice for small ODS refrigerant sales
Appendix A:Purity Specification section3|Interpret a recycled R-12 contaminant report against the applicable purity standard
Appendix B:6.3.1|Recognize a recovery-only tank warning as preventing reuse before reprocessing
Appendix C:4.1.1-4.1.2|Respond to a filter-life lockout by installing the correct replacement filter
Appendix C:4.5|Withdraw recycled refrigerant in liquid phase for recharging or transfer
Appendix C:7.2|Apply the 80 percent volume overfill-protection limit with its temperature basis
Appendix C:7.3.3-7.3.4|Distinguish refillable-container retesting from the ASME tank exemption
Appendix C:7.5|Use container-connection shutoff devices to prevent loss during tank changes
Appendix B:6.7.2|Account for refrigerant dissolved in separated lubricant when measuring oil replacement
"""
rows=[]
for group, block in GROUPS.items():
    for line in block.strip().splitlines():
        loc, objective=line.split("|",1)
        rows.append({"id":f"EPA609-OBJ-{len(rows)+1:03}","domain":group,"sourceLocator":loc,"objective":objective,"status":"candidate, needs question-level evidence and overlap review"})
(ROOT/'objective-inventory.json').write_text(json.dumps(rows,indent=2)+'\n')
print(len(rows), 'candidate objectives')
for g in GROUPS: print(g, sum(r['domain']==g for r in rows))
