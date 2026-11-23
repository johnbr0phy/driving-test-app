import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/az104/questions.json";

registerBank("az104", plainBank([bank]));
