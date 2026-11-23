import { Question } from "@/types";
import cratQuestions from "@/data/crat-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCI CRAT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ crat: cratQuestions as Question[] });
