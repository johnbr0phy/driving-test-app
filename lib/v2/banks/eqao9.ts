import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/eqao9/questions.json";

// Built by tools/eqao9/build.py from tools/eqao9/q_*.py.
registerBank("eqao9", plainBank([bank]));
