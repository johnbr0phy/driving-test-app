import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcsemaths/questions.json";

// Built by tools/gcsemaths/build.py from tools/gcsemaths/q_*.py.
registerBank("gcsemaths", plainBank([bank]));
