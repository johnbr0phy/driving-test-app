import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/projectplus/questions.json";

registerBank("projectplus", plainBank([bank]));
