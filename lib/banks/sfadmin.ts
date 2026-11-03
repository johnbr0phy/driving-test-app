import { Question } from "@/types";
import sfadminQuestions from "@/data/salesforce-admin-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Salesforce Certified Platform Administrator bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sfadmin: sfadminQuestions as Question[] });
