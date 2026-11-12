import { registerBank, withStimuli } from "../bank";
import apitalianBank from "@/data/v2/apitalian/questions.json";

// Object form: the original Italian practice texts (articles, charts, literary texts, ads) plus questions.
registerBank("apitalian", withStimuli([apitalianBank] as Parameters<typeof withStimuli>[0]));
