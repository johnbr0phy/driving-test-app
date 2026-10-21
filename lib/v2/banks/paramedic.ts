import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/paramedic/questions.json";

registerBank("paramedic", plainBank([bank]));
