import { Question } from "@/types";
import qabaabatQuestions from "@/data/qaba-abat-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The QABA ABAT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ qabaabat: qabaabatQuestions as Question[] });
