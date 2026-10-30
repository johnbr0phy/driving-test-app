import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/netplus/questions.json";

registerBank("netplus", plainBank([bank]));
