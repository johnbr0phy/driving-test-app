import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/aws/questions.json";

registerBank("aws", plainBank([bank]));
