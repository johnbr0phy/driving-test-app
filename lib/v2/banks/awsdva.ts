import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/awsdva/questions.json";

registerBank("awsdva", plainBank([bank]));
