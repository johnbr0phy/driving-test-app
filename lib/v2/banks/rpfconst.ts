import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rpfconst/questions.json";

registerBank("rpfconst", plainBank([bank]));
