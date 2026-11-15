import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/staaralg1/questions.json";

// Built by tools/next100/staaralg1/build.py from tools/next100/staaralg1/q_*.py.
registerBank("staaralg1", plainBank([bank]));
