import { Question } from "@/types";
import dkmedborgerQuestions from "@/data/dk-medborgerskab-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Danish permanent residence test bank (medborgerskabsprøven), written in Danish. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dkmedborger: dkmedborgerQuestions as Question[] });
