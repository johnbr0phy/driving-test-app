import { registerBank, withStimuli } from "../bank";
import "@/lib/v2/ui/it";
import bank from "@/data/v2/itcilsb2/questions.json";

// Italian bank (object form: the eight shared articles plus questions); also
// registers the Italian v2 interface strings.
registerBank("itcilsb2", withStimuli([bank] as Parameters<typeof withStimuli>[0]));
