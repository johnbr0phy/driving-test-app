import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rrbgroupd/questions.json";

registerBank("rrbgroupd", plainBank([bank]));
