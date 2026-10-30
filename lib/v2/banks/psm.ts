import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/psm/questions.json";

registerBank("psm", plainBank([bank]));
