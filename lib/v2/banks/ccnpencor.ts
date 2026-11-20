import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ccnpencor/questions.json";

registerBank("ccnpencor", plainBank([bank]));
