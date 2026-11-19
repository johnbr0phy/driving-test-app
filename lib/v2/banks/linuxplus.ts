import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/linuxplus/questions.json";

registerBank("linuxplus", plainBank([bank]));
