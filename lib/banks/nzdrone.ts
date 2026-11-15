import { Question } from "@/types";
import nzdroneQuestions from "@/data/nz-drone-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NZ drone (Part 101) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nzdrone: nzdroneQuestions as Question[] });
