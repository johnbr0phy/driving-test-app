import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/faapvt/questions.json";

registerBank("faapvt", plainBank([bank]));
