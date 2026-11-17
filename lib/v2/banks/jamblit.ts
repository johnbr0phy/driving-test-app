import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jamblit/questions.json";
registerBank("jamblit", plainBank([bank]));
