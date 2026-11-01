import { registerBank, withStimuli } from "../bank";
import apgovBank from "@/data/v2/apgov/questions.json";

// Object form: the shared stimuli (foundational document excerpts, practice texts, data tables, visuals described in words) plus questions.
registerBank("apgov", withStimuli([apgovBank] as Parameters<typeof withStimuli>[0]));
