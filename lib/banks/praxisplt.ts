import { Question } from "@/types";
import praxispltQuestions from "@/data/praxis-plt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Praxis PLT K-6 (5622) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ praxisplt: praxispltQuestions as Question[] });
