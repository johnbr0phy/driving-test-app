import { Question } from "@/types";
import cchtQuestions from "@/data/ccht-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCHT Hemodialysis Technician bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ccht: cchtQuestions as Question[] });
