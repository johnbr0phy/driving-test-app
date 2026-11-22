import { Question } from "@/types";
import oacpQuestions from "@/data/oacp-certificate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The OACP Certificate (Ontario police pre-screening) Part B bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ oacp: oacpQuestions as Question[] });
