import { Question } from "@/types";
import mypceQuestions from "@/data/malaysia-pce-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malaysia PCEIA (insurance agents' pre-contract exam) bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ mypce: mypceQuestions as Question[] });
