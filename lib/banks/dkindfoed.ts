import { Question } from "@/types";
import dkindfoedQuestions from "@/data/dk-indfoedsret-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Danish citizenship test bank (indfødsretsprøven), written in Danish. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dkindfoed: dkindfoedQuestions as Question[] });
