import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/hscmaths/questions.json";

// Built by tools/hscmaths/build.py from tools/hscmaths/q_*.py.
registerBank("hscmaths", plainBank([bank]));
