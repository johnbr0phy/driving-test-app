import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/dp900/questions.json";

registerBank("dp900", plainBank([bank]));
