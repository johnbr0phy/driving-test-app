import { Question } from "@/types";
import nzhamQuestions from "@/data/nz-amateur-radio-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NZ amateur radio (GAOC) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nzham: nzhamQuestions as Question[] });
