import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/emt/questions.json";

registerBank("emt", plainBank([bank]));
