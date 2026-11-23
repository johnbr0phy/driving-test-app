import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/serverplus/questions.json";

registerBank("serverplus", plainBank([bank]));
