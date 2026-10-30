import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cissp/questions.json";

registerBank("cissp", plainBank([bank]));
