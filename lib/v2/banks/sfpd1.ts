import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/sfpd1/questions.json";

registerBank("sfpd1", plainBank([bank]));
