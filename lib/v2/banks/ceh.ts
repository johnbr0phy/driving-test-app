import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ceh/questions.json";

registerBank("ceh", plainBank([bank]));
