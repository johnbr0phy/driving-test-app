import { registerBank, plainBank } from "../bank";
import teasBank from "@/data/v2/teas/questions.json";

registerBank("teas", plainBank([teasBank]));
