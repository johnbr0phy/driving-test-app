import { Question } from "@/types";
import ukseruQuestions from "@/data/seru-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The London private hire SERU bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukseru: ukseruQuestions as Question[] });
