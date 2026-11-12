import { Question } from "@/types";
import ukwaterQuestions from "@/data/uk-water-regulations-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Water Regulations bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukwater: ukwaterQuestions as Question[] });
