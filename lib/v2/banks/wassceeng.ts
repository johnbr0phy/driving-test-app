import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/wassceeng/questions.json";

registerBank("wassceeng", plainBank([bank]));
