import { Question } from "@/types";
import de34aQuestions from "@/data/de-34a-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German security guard competence exam bank (Sachkundeprüfung § 34a GewO), written in
// German. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ de34a: de34aQuestions as Question[] });
