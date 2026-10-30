import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcsehigher/questions.json";

// Built by tools/gcsehigher/build.py from tools/gcsehigher/q_*.py.
registerBank("gcsehigher", plainBank([bank]));
