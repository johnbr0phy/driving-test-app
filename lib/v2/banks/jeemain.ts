import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jeemain/questions.json";

// Built by tools/next100/jeemain/build.py from tools/next100/jeemain/<domain>.py.
registerBank("jeemain", plainBank([bank]));
