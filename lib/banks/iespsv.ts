import { Question } from "@/types";
import iespsvQuestions from "@/data/spsv-entry-test-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ireland SPSV Entry Test (Industry Knowledge) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ iespsv: iespsvQuestions as Question[] });
