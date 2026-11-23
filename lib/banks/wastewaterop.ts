import { Question } from "@/types";
import wastewateropQuestions from "@/data/wastewater-treatment-operator-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The wastewaterop bank. Imported for its side effect by this exam's app pages only,
// so no other page bundles these questions.
registerExamBanks({ wastewaterop: wastewateropQuestions as Question[] });
