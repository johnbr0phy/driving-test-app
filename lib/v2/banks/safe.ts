import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/safe/questions.json";

registerBank("safe", plainBank([bank]));
