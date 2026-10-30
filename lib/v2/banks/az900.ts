import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/az900/questions.json";

registerBank("az900", plainBank([bank]));
