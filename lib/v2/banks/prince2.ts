import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/prince2/questions.json";

registerBank("prince2", plainBank([bank]));
