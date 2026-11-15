import { Question } from "@/types";
import mblexQuestions from "@/data/mblex-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FSMTB MBLEx (Massage & Bodywork Licensing Examination) bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ mblex: mblexQuestions as Question[] });
