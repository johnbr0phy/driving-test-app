import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/awssaa/questions.json";

registerBank("awssaa", plainBank([bank]));
