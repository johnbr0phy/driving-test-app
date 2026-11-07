import { Question } from "@/types";
import fortigateQuestions from "@/data/fortigate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Fortinet FCP - FortiGate 7.6 Administrator bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ fortigate: fortigateQuestions as Question[] });
