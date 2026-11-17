import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/vidyagyan/questions.json";
registerBank("vidyagyan", plainBank([bank]));
