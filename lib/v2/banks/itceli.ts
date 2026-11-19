import { registerBank, withStimuli } from "../bank";
import "@/lib/v2/ui/it";
import bank from "@/data/v2/itceli/questions.json";

// Italian bank; also registers the Italian v2 interface strings.
registerBank("itceli", withStimuli([bank] as Parameters<typeof withStimuli>[0]));
