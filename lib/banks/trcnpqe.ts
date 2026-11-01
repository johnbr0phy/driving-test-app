import { Question } from "@/types";
import trcnpqeQuestions from "@/data/trcn-pqe-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The TRCN Professional Qualifying Examination (PQE) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ trcnpqe: trcnpqeQuestions as Question[] });
