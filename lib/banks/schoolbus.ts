import { Question } from "@/types";
import schoolbusQuestions from "@/data/schoolbus-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CDL School Bus Endorsement bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ schoolbus: schoolbusQuestions as Question[] });
