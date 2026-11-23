import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/emr/questions.json";

registerBank("emr", plainBank([bank]));
