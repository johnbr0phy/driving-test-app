import { Question } from "@/types";
import sgrttQuestions from "@/data/singapore-rtt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore Riding Theory Test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ sgrtt: sgrttQuestions as Question[] });
