ITEMS=[]
def family(options,rows):
 for k,(stem,why) in enumerate(rows):ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))
family(['The rated-capacity chart','The working-range diagram','The permitted-work-area diagram','The parts-of-line information'],[
('Which document gives permitted lifted weights for specified crane configurations and radii?','The rated-capacity chart provides capacities; the complete applicable notes and configuration must also be checked.'),
('Which diagram primarily relates boom geometry to achievable hook height and horizontal reach?','A working-range diagram addresses geometry; reach alone does not prove lifting capacity.'),
('Which diagram shows the sectors in which a crane may lift under a particular rating?','The work-area diagram identifies sectors such as over-side or over-rear; ratings must match the actual sector.'),
('Which information determines the required reeving arrangement and available line capacity for the intended load?','Parts-of-line information specifies reeving and line limitations, which must be satisfied alongside chart capacity.')])
family(['The actual outrigger extension','The installed counterweight','The operating work sector','The actual boom configuration'],[
('Two chart pages differ only between full and intermediate support-beam deployment. What setup feature selects the page?','The actual outrigger extension must match a manufacturer-permitted configuration and its chart.'),
('Two ratings cover the same boom, radius and support positions but list different ballast packages. Which installed feature selects the rating?','The actual installed counterweight must match the chart; using a heavier-package chart would misstate capacity.'),
('A crane’s chart gives different ratings over the side and over the rear. What aspect of the planned lift selects the applicable rating?','The load’s operating sector must match the work-area chart throughout the lift.'),
('A chart family separates main-boom-only lifts from lifts using an offset jib. What must match the chosen page?','The actual boom/jib arrangement must match the selected chart and its notes.')])
family(['The loaded operating radius','The specified boom length','The suspended lifting-gear weight','The allowed minimum boom angle'],[
('The boom deflects under load and the hook moves farther from the rotation axis. Which chart input must reflect the resulting position?','Use the actual loaded operating radius rather than the shorter unloaded radius.'),
('A telescopic boom is extended farther while a different angle keeps the hook at the same radius. Which additional chart input may have changed?','Boom length has changed and may select a different rating even at the same radius.'),
('The chart note says to subtract all suspended handling equipment from gross capacity. Which additional quantity is needed beyond the object’s own weight?','The block, slings and other suspended lifting gear consume the stated gross capacity.'),
('A proposed geometry lies below the manufacturer’s stated angle boundary even though a weight calculation appears acceptable. Which limit is violated?','Minimum boom-angle limits are independent constraints; a capacity calculation does not override them.')])
family(['2,000 pounds','4,000 pounds','6,000 pounds','8,000 pounds'],[
('A shipment record gives an object’s mass as1US short ton. Using2,000lb per short ton, what weight enters this illustrative load calculation?','One US short ton equals2,000lb; do not confuse it with a metric tonne or long ton.'),
('An original training chart lists a gross capacity of4US short tons. The problem specifies4,000lb of deductions. What net payload remains?','4×2,000−4,000=4,000lb.'),
('A load consists of three identical components, each weighing2,000lb according to reliable records. What is their combined object weight before separate gear is added?','3×2,000=6,000lb.'),
('An illustrative chart permits10,000lb gross, with1,200lb block weight and800lb rigging weight to subtract. What payload remains?','10,000−1,200−800=8,000lb.')])
family(['10,000 pounds','12,000 pounds','14,000 pounds','16,000 pounds'],[
('An original chart excerpt for the correct setup lists20ft radius:16,000lb;30ft:12,000lb;40ft:10,000lb. At exactly40ft, what is the gross chart capacity?','The40ft entry is10,000lb; the shorter-radius values do not apply.'),
('A fictional chart’s30ft row lists60ft boom:14,000lb and80ft boom:12,000lb. The crane uses an80ft boom at30ft radius. Which gross capacity applies?','Choose the intersection of80ft boom and30ft radius:12,000lb.'),
('A training note gives18,000lb gross capacity and deductions of2,500lb for the block plus1,500lb for other gear. What net object limit follows?','18,000−2,500−1,500=14,000lb.'),
('In an illustrative plan, the gross load is12,000lb and must remain at or below75% of the selected capacity. What minimum capacity satisfies that stated planning condition?','12,000/0.75=16,000lb. The75% condition is supplied by this exercise, not a universal crane rating rule.')])
family(['Use the longer listed radius','Use the lower listed capacity','Use the exact listed configuration','Do not use an unlisted rating'],[
('An original exercise chart lists30ft and35ft radii. Its note explicitly says use the next longer listed radius between rows. The actual loaded radius is32ft. What instruction applies?','The supplied note selects35ft; do not invent interpolation contrary to the note.'),
('A fictional chart note says that between listed boom lengths, use the lower capacity of the two bounding lengths. The two entries are9,000lb and8,000lb. What rule selects the answer?','The stated note requires the lower of the two capacities,8,000lb.'),
('The actual setup exactly matches a listed boom, counterweight, support extension and work sector, with no intervening values. How should the applicable chart be selected?','Use the matching listed configuration and its notes; a nearby setup is not preferable.'),
('A proposed outrigger position has no permitted chart or procedure for that machine. Which response applies to its capacity?','Do not invent a rating for an unsupported configuration; obtain an authorised configuration/procedure before lifting.')])
family(['The gross chart limit controls','The reeving limit controls','The rigging limit controls','The reach requirement is not met'],[
('A fictional setup allows8,000lb gross by its chart,10,000lb by reeving and12,000lb by rated rigging. Reach is adequate. Which listed constraint is lowest?','The8,000lb gross chart limit is the smallest stated capacity.'),
('For an illustrative lift, chart capacity is18,000lb, reeving capacity12,000lb and rigging capacity16,000lb. Geometry is adequate. Which constraint governs?','The12,000lb reeving limit governs even though the chart permits more.'),
('A training plan has20,000lb chart capacity,18,000lb reeving capacity and10,000lb rigging capacity. Which constraint is lowest?','The10,000lb rigging limit is the weakest stated load-path capacity.'),
('An illustrative load is within every weight limit, but the range diagram allows70ft hook height where the placement needs76ft. What prevents this plan?','The geometry fails the reach requirement; sufficient weight capacity cannot create additional hook height.')])
family(['An extra500pounds','An extra1,000pounds','An extra1,500pounds','An extra2,000pounds'],[
('An illustrative net payload allowance is7,500lb and the proposed object weighs7,000lb. How much payload allowance remains?','7,500−7,000=500lb; this arithmetic margin does not waive any other limit.'),
('A chart note changes the attachment deduction from600lb to1,600lb when a different attachment is fitted. How much additional deduction is required?','1,600−600=1,000lb of additional deduction.'),
('A load record initially omitted six250lb removable inserts that will remain fitted during lifting. How much weight must be added?','6×250=1,500lb must be included because the inserts are part of the lifted load.'),
('A verified object weight rises from8,000lb to10,000lb after its contents are included. What additional object weight must the plan accommodate?','10,000−8,000=2,000lb; contents cannot be omitted from the lifted weight.')])
family(['20feet','25feet','30feet','35feet'],[
('For an original geometry exercise, the hook’s vertical line is20ft horizontally from the axis of rotation. The nearest carrier edge is5ft closer. What is the operating radius?','Radius is measured from the rotation axis to the load’s vertical line, so it is20ft, not the carrier-edge distance.'),
('A schematic places the rotation axis, front-edge reference and load on one horizontal line. The axis is5ft behind that edge, and the load is20ft beyond it. What horizontal radius follows?','The distances lie on the same line and add:5+20=25ft.'),
('An illustrative range diagram states that a selected boom/angle combination places the hook30ft horizontally from the rotation axis and50ft above ground. What radius is used?','Use the horizontal30ft radius, not the50ft hook height.'),
('An original planning sketch gives a28ft radius before a7ft outward relocation of the load. What is the new horizontal radius?','28+7=35ft; the new radius must be checked against the correct chart.')])
family(['The over-side rating','The over-rear rating','The permitted360-degree rating','The on-tires rating'],[
('The selected chart distinguishes side and rear sectors. A lift remains wholly in a sector labelled over-side. Which sector rating applies?','Use the over-side rating and its applicable configuration notes.'),
('A load path lies wholly inside the chart’s defined rear sector, with the crane configured accordingly. Which sector rating applies?','Use the matching over-rear rating rather than assuming another sector’s capacity.'),
('The exact crane configuration has a manufacturer chart expressly permitting the same rating throughout a full rotation. Which rating covers the full planned swing?','The permitted360-degree rating applies only because the stated configuration and chart expressly allow it.'),
('A manufacturer expressly permits lifting on tires in a specified setup. Which support-condition chart must govern that lift?','Use the on-tires chart and its restrictions, not an outrigger-supported capacity.')])
family(['The main load block','The suspended spreader beam','The installed stowed-jib allowance','The object’s retained contents'],[
('An illustrative chart note deducts suspended handling equipment. Which listed item is the hook-and-sheave assembly hanging below the boom tip?','The main load block is suspended handling equipment and must be accounted for under the stated note.'),
('A fictional load calculation includes the block and slings but omits a1,000lb beam hanging between hook and object. Which missing item must be added?','The suspended spreader beam contributes to the gross lifted load.'),
('A chart note requires a deduction for a jib carried on the boom even when it is not lifting. Which allowance applies?','Apply the specified stowed-jib deduction; a stowed attachment can affect ratings without being suspended.'),
('A tank’s listed empty weight is used, but residual liquid remains inside it during the lift. Which part of the object weight is missing?','Retained contents form part of the object’s actual lifted weight.')])
family(['Four supporting parts','Five supporting parts','Six supporting parts','Eight supporting parts'],[
('An illustrative reeving table permits3,000lb per supporting part and the gross load is12,000lb. Ignoring efficiency losses as specified, what minimum number of parts is needed?','12,000/3,000=4parts, subject to the actual permitted reeving arrangement.'),
('A fictional reeving limit is2,000lb per supporting part. For a9,000lb gross load, what minimum whole number of parts is needed?','9,000/2,000=4.5, so at least5whole supporting parts are required under the stated model.'),
('A training table explicitly lists4parts:10,000lb,6parts:15,000lb,8parts:20,000lb. Which listed arrangement is the smallest that supports14,000lb?','Four parts are insufficient; six parts provide15,000lb and are the smallest listed adequate arrangement.'),
('An illustrative reeving plan specifies two equal groups of four load-supporting rope parts. How many supporting parts are present in total?','4+4=8supporting parts; this count alone does not establish capacity without the applicable reeving data.')])
family(['Configuration one is sufficient','Configuration two is sufficient','Both configurations are sufficient','Neither configuration is sufficient'],[
('Two fictional setups both meet reach and all other requirements. One permits12,000lb gross and two permits9,000lb gross. The required gross load is10,500lb. Which assessment is correct?','Only configuration one meets10,500lb; configuration two falls short.'),
('An original comparison gives one a net payload limit6,000lb and two a net payload limit8,000lb. Reach and all other limits are satisfied. A7,500lb object must be lifted. Which assessment is correct?','Only configuration two has enough net payload capacity.'),
('A training plan requires an8,000lb gross load. Two otherwise suitable configurations permit9,000lb and10,000lb respectively. Which assessment follows?','Both stated gross limits exceed the required8,000lb; all other requirements are assumed met in this comparison.'),
('Two otherwise suitable illustrative configurations permit5,000lb and6,500lb gross. The proposed gross load is7,000lb. Which assessment follows?','Neither capacity reaches7,000lb; the lift must be replanned rather than averaging the ratings.')])
assert len(ITEMS)==52
