import { Question } from "@/types";
import nailtechQuestions from "@/data/nail-technician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NIC National Nail Technology Theory Examination practice bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nailtech: nailtechQuestions as Question[] });
