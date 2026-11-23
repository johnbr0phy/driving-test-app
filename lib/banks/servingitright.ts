import { Question } from "@/types";
import servingitrightQuestions from "@/data/serving-it-right-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The BC Serving It Right (responsible beverage service) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ servingitright: servingitrightQuestions as Question[] });
