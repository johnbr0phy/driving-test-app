import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/sscp/questions.json";
registerBank("sscp", plainBank([bank]));
