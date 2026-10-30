import { Question } from "@/types";
import iedttQuestions from "@/data/ireland-driver-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ireland Driver Theory Test bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ iedtt: iedttQuestions as Question[] });
