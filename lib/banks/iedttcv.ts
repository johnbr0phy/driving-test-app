import { Question } from "@/types";
import iedttcvQuestions from "@/data/ireland-truck-bus-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ireland Driver Theory Test (truck and bus) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ iedttcv: iedttcvQuestions as Question[] });
