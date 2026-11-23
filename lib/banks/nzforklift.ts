import { Question } from "@/types";
import nzforkliftQuestions from "@/data/nz-forklift-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand forklift operator certificate bank (NZQA 40735, 40736, 40737). Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzforklift: nzforkliftQuestions as Question[] });
