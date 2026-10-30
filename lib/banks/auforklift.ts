import { Question } from "@/types";
import auforkliftQuestions from "@/data/au-forklift-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian forklift licence (LF) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ auforklift: auforkliftQuestions as Question[] });
