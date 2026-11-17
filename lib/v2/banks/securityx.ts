import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/securityx/questions.json";
registerBank("securityx", plainBank([bank]));
