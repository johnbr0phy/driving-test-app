import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/timestables/questions.json";

// Built by tools/build_v2_bank.py timestables from tools/timestables/*.json
// (themselves written by tools/timestables/generate.py).
registerBank("timestables", plainBank([bank]));
