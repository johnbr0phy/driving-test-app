import { registerBank, withStimuli } from "../bank";
import sehpBank from "@/data/v2/sehp/questions.json";

// Object form: the shared LÄS, ELF and DTK texts plus questions.
registerBank("sehp", withStimuli([sehpBank] as Parameters<typeof withStimuli>[0]));
