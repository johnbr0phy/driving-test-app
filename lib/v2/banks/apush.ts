import { registerBank, withStimuli } from "../bank";
import apushBank from "@/data/v2/apush/questions.json";

// Object form: the shared practice sources (excerpts, historians' views, tables) plus questions.
registerBank("apush", withStimuli([apushBank] as Parameters<typeof withStimuli>[0]));
