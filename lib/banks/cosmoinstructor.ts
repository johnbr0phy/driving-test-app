import { Question } from "@/types";
import cosmoinstructorQuestions from "@/data/cosmetology-instructor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NIC National Instructor Theory Examination practice bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cosmoinstructor: cosmoinstructorQuestions as Question[] });
