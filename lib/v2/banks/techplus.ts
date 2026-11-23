import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/techplus/questions.json";

registerBank("techplus", plainBank([bank]));
