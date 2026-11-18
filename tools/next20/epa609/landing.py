"""Copy the current VTNE landing structure, changing content only."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[3]
s=(ROOT/'app/vtne-practice-test/page.tsx').read_text()
faq=[
('What score do I need for EPA 609 certification?', 'Passing requirements depend on the approved program and delivery mode. MACS online/home testing requires 21 correct answers out of 25, or 84%. Tigertest uses that percentage as a study target; it is not a universal EPA pass mark. Check the program through which you plan to certify.'),
('How many questions are on the EPA 609 test?', 'MACS online/home testing has 25 multiple-choice questions, is untimed and open book. Its classroom testing conditions differ, and other EPA-approved programs may use different formats. Tigertest has four 25-question practice tests with original questions, not copies of any certification test.'),
('What subjects does this practice cover?', 'The 100 questions cover federal MVAC rules and environmental effects, equipment and safe handling, recovery and charge accuracy, and R-1234yf service procedures. The topic weights are editorial choices based on EPA requirements and the MACS training manual, not an official weighted EPA blueprint.'),
('Does practicing here give me Section 609 certification?', 'No. Certification requires training and testing through an EPA-approved program. Tigertest is an independent study resource, not an approved certification course, an official exam or proof of hands-on competence. Start here for free; additional practice steps use Tigertest Premium.'),
('Is Section 609 the same as Section 608?', 'No. Section 609 addresses motor vehicle air-conditioning service. Section 608 generally covers other refrigeration equipment and also applies to matters such as venting and disposal. MVAC-like equipment has specific overlap rules. These questions focus on refrigerant handling, not general automotive diagnosis or stationary-system service.'),
]
oldfaq=re.findall(r'name: "([^"]+)",\s*acceptedAnswer: \{\s*"@type": "Answer",\s*text: "([^"]+)"',s)
assert len(oldfaq)==5
for (oq,oa),(nq,na) in zip(oldfaq,faq):
 s=s.replace(oq,nq).replace(oa,na)
s=s.replace('vtne-practice-test','epa-609-practice-test').replace('vtne','epa609').replace('Vtne','Epa609').replace('VTNE','EPA 609')
s=s.replace('Free EPA 609 Practice Test 2026 - Vet Tech Exam Prep','Free EPA 609 Practice Test 2026 - MVAC Refrigerant Prep')
s=re.sub(r'const metaDescription =\s*"[^"]*";', 'const metaDescription =\n  "EPA 609 practice with 100 original questions on MVAC refrigerant rules, recovery, equipment and R-1234yf. Four 25-question tests. Free to start.";',s)
s=re.sub(r'const description =\s*"[^"]*";', 'const description =\n  "Independent EPA Section 609 practice: 100 original refrigerant-handling questions, four topic sets and four 25-question tests. Editorial topic weights and a MACS online/home-based 84% study target. Free to start.";',s)
s=re.sub(r'keywords:\s*"[^"]*",','keywords: "EPA 609 practice test, Section 609, MVAC certification practice, automotive refrigerant recovery, R-1234yf, MACS study, EPA 609 prep 2026",',s)
s=s.replace('"200 EPA 609 practice questions"','"100 original EPA 609 practice questions"').replace('"4 practice tests across all ten content domains"','"4 practice tests with 25 questions each"').replace('"5 training sets by topic"','"4 training sets by topic"')
s=re.sub(r'const contentAreas = \[.*?\];','''const contentAreas = [
  { name: "Rules & Environmental Effects", weight: "28%" },
  { name: "Equipment & Safe Handling", weight: "24%" },
  { name: "Recovery, Leaks & Charging", weight: "32%" },
  { name: "R-1234yf Procedures", weight: "16%" },
];''',s,flags=re.S)
s=re.sub(r'subtitle="[^"]*"','subtitle="100 original questions on MVAC rules, equipment, recovery, charging and R-1234yf procedures. Four 25-question practice tests with explanations. Free to start, no account needed."',s)
s=re.sub(r'Five training sets,.*?mastered them\.', 'Four topic sets, from Rules &amp; Environmental Effects to R-1234yf Procedures. Practice the decisions and measurements involved in handling refrigerant. Questions you miss return for more practice.',s)
s=re.sub(r'Four 50-question tests.*?every item\.', 'Four 25-question tests with editorial topic weights and an 84 percent study target based on MACS online/home testing. Every answer includes an explanation. Provider formats and requirements vary.',s)
s=s.replace('Built on the AAVSB Content Outline','Based on EPA Requirements')
s=re.sub(r'The AAVSB publishes.*?and see which domains the cohort misses most\.', '''EPA requires knowledge of refrigerant containment, servicing equipment, environmental effects and applicable rules. This practice uses those subjects and the January 2025 MACS manual. The percentages below describe our practice allocation, not official exam weights. Instructors can assign practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}alongside their approved training materials.''',s,flags=re.S)
tips=[
('1. Separate the regulatory scopes','Learn which rules govern MVAC service, MVAC-like equipment, refrigerant purchases and disposal. Keep Section 609 service requirements distinct from Section 608 overlap, and check current EPA guidance when an older manual differs.'),
('2. Follow the refrigerant through service','Trace identification, recovery, processing, evacuation and recharging as separate steps. Know what each machine can do, why recovered fluid needs processing and how contamination can spread through shared equipment.'),
('3. Check quantities and procedures','Practice converting charge units and reading tolerances. Distinguish a pressure reading from a measured refrigerant mass. For R-1234yf, review equipment compatibility and the vacuum and pressure checks before a full recharge.'),
('4. Use your approved program materials','Review missed questions by topic, then take each practice test. The 84 percent line is a MACS-based study target, not a guarantee of certification. Complete the training and test required by your chosen EPA-approved program.'),
]
section=re.search(r'      \{/\* Study guide \*/\}.*?      \{/\* FAQ \*/\}',s,re.S)[0]
heads=re.findall(r'<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">([^<]+)</h3>\s*<p>\s*(.*?)\s*</p>',section,re.S)
assert len(heads)==4
for (oh,op),(nh,np) in zip(heads,tips):s=s.replace(oh,nh).replace(op,np)
s=s.replace('How to Pass the EPA 609','How to Prepare for EPA 609').replace('Ready to Pass the EPA 609?','Ready to Practice EPA 609?')
s=s.replace('Start for free. No account required. 200 questions across all ten content domains.','Start for free. No account required. 100 original questions on MVAC refrigerant handling.')
out=ROOT/'app/epa-609-practice-test/page.tsx';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(s)
