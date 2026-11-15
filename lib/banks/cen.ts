import { Question } from "@/types";
import cenQuestions from "@/data/cen-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CEN bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cen: cenQuestions as Question[] });
