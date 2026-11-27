import { Question } from "@/types";
import faaamaQuestions from "@/data/faaama-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FAA Mechanic Airframe bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ faaama: faaamaQuestions as Question[] });
