import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/sfappbuilder/questions.json";

registerBank("sfappbuilder", plainBank([bank]));
