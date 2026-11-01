import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/agniveer/questions.json";

registerBank("agniveer", plainBank([bank]));
