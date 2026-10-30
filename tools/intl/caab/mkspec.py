import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from questions import CATEGORIES
spec = {
 "id": "caab", "stateCode": "CAAB", "idBase": 6400, "prefix": "CAAB-",
 "slug": "/alberta-class-7", "landingPath": "/alberta-class-7-practice-test",
 "dataFile": "data/alberta-class-7-questions.json",
 "name": "Alberta Class 7 Practice Test",
 "shortName": "AB Class 7",
 "examLabel": "Alberta Class 7",
 "fullName": "Alberta Class 7 learner's licence knowledge test",
 "icon": "car",
 "passPct": 83,
 "outlineComment": "Alberta Class 7 learner's knowledge test: 30 multiple-choice questions on a computer at a\nregistry agent, 25 of 30 to pass (83%), one attempt per day (alberta.ca/drivers-knowledge-test).\nQuestions come from the Driver's Guide: cars and light trucks, Spring 2026 (Government of\nAlberta, Transportation and Economic Corridors, published May 2026, updated June 15, 2026),\nwhich says the test covers safe driving practices, driving laws and road signs. Categories\nfollow the guide's chapters: licensing and GDL (ch. 1), signals, signs and markings (ch. 2),\nbasics, intersections and highways (ch. 3 to 5), emergencies (ch. 6), sharing the road\n(ch. 7 to 8) and driving within the law (ch. 9). Alberta publishes no per-topic weighting.",
 "categories": [{"key": k, "label": l, "perTest": p, "segment": s} for k, l, p, s in CATEGORIES],
 "copy": {
   "guestPrompt": "to save your Alberta Class 7 progress and track every question you miss",
   "trainingSub": "Four sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Missed questions come back until you master them.",
   "testsHeading": "Practice tests · 50 questions from the Alberta Driver's Guide",
   "heroSubs": [
     "Signs, signals, right-of-way and GDL rules, straight from the Driver's Guide.",
     "Master each set, then test.",
     "Halfway there. Try a practice test.",
     "Fix the misses, then retake.",
     "All done. Book your knowledge test at a registry agent."
   ],
   "sourceLine": "Based on the Alberta Driver's Guide (cars and light trucks, Spring 2026). The real test is 30 questions and needs 25 correct (83%)."
 },
 "blurb": "Alberta Class 7 learner's licence knowledge test prep from the 2026 Driver's Guide: signs, signals, right-of-way, GDL rules, demerits and impaired driving.",
 "org": "Alberta registry agents · Class 7 learner's licence",
 "searchAliases": "alberta class 7 learners licence learner's permit knowledge test ab drivers test written test registry calgary edmonton gdl canada",
 "facts": {
   "answer": "The Alberta Class 7 knowledge test is 30 multiple-choice questions taken on a computer at a registry agent office, and you need 25 correct (83%) to pass. It covers safe driving practices, driving laws and road signs from the Driver's Guide. You must be at least 14, pass a vision test, and have a parent's or guardian's consent if you are under 18; you can take it once a day.",
   "rows": [
     {"label": "Questions", "value": "30 multiple choice"},
     {"label": "Passing score", "value": "25 of 30 (83%)"},
     {"label": "Minimum age", "value": "14 (parental consent under 18)"},
     {"label": "Also required", "value": "Vision test"},
     {"label": "Attempts", "value": "Once per day, fee each time"},
     {"label": "Languages", "value": "English and 24 others"},
     {"label": "Where", "value": "Alberta registry agent offices"}
   ],
   "basedOn": "the Alberta Driver's Guide (cars and light trucks, Spring 2026)",
   "source": {"name": "Government of Alberta, Driver's knowledge test", "url": "https://www.alberta.ca/drivers-knowledge-test"}
 }
}
json.dump(spec, open("spec.json", "w"), indent=1, ensure_ascii=False)
print("ok")
