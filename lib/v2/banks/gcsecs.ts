import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcsecs/questions.json";

// Built by tools/gcsecs/build.py from tools/gcsecs/q_*.py.
registerBank("gcsecs", plainBank([bank]));
