import { Question } from "@/types";
import nzboatQuestions from "@/data/nz-day-skipper-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand Day Skipper (Coastguard Boating Education) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzboat: nzboatQuestions as Question[] });
