import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/secplus/questions.json";

registerBank("secplus", plainBank([bank]));
