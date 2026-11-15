import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cogat/questions.json";

// Built by tools/next100/cogat/build.py from tools/next100/cogat/verbal.py and quant.py.
registerBank("cogat", plainBank([bank]));
