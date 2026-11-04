import { Question } from "@/types";
import cisaQuestions from "@/data/cisa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ISACA CISA bank. Imported for its side effect by this exam's app pages only, so no other
// exam's pages bundle it.
registerExamBanks({ cisa: cisaQuestions as Question[] });
