import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/awsaif/questions.json";

registerBank("awsaif", plainBank([bank]));
