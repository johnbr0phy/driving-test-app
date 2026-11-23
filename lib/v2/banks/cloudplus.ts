import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cloudplus/questions.json";

registerBank("cloudplus", plainBank([bank]));
