import { Question } from "@/types";
import ukadiQuestions from "@/data/uk-adi-part-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ADI part 1 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukadi: ukadiQuestions as Question[] });
