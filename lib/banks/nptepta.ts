import { Question } from "@/types";
import nptePtaQuestions from "@/data/nptepta-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NPTE-PTA bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nptepta: nptePtaQuestions as Question[] });
