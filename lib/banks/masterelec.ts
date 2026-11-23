import { Question } from "@/types";
import masterelecQuestions from "@/data/master-electrician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The master electrician bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ masterelec: masterelecQuestions as Question[] });
