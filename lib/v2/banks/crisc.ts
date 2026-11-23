import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/crisc/questions.json";

registerBank("crisc", plainBank([bank]));
