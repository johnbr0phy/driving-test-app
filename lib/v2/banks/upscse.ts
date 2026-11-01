import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/upscse/questions.json";

registerBank("upscse", plainBank([bank]));
