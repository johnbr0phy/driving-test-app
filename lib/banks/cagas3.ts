import { Question } from "@/types";
import cagas3Questions from "@/data/ontario-gas-technician-3-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The TSSA Gas Technician 3 (Ontario) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cagas3: cagas3Questions as Question[] });
