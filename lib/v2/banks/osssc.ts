import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/osssc/questions.json";
registerBank("osssc", plainBank([bank]));
