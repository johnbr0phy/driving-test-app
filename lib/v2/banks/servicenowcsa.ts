import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/servicenowcsa/questions.json";
registerBank("servicenowcsa", plainBank([bank]));
