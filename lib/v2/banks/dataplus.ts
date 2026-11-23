import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/dataplus/questions.json";

registerBank("dataplus", plainBank([bank]));
