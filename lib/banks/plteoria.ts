import { Question } from "@/types";
import plteoriaQuestions from "@/data/pl-teoria-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Polish car theory test bank (prawo jazdy kategorii B), written in Polish. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ plteoria: plteoriaQuestions as Question[] });
