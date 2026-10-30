import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/capm/questions.json";

registerBank("capm", plainBank([bank]));
