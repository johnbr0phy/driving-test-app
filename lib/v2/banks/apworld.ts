import { registerBank, withStimuli } from "../bank";
import apworldBank from "@/data/v2/apworld/questions.json";

// Object form: the shared practice sources (excerpts, historians' views, tables) plus questions.
registerBank("apworld", withStimuli([apworldBank] as Parameters<typeof withStimuli>[0]));
