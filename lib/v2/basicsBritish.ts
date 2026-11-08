import type { BasicsSkill } from "./basics";

// These are shared introductory lessons, not exam questions or code. Keep
// their IDs, answer indices and interaction keys intact so progress survives
// and the original US lessons remain unchanged.
const WORDING: [RegExp, string][] = [
  [/\bgreatest common factor\b/gi, "highest common factor"],
  [/\bleast common multiple\b/gi, "lowest common multiple"],
  [/\bGCF\b/g, "HCF"],
  [/\bfactoring\b/gi, "factorising"],
  [/\bslope\b/gi, "gradient"],
  [/\bscientific notation\b/gi, "standard form"],
  [/\bexponent rules\b/gi, "laws of indices"],
  [/\bexponents\b/gi, "indices"],
  [/\bexponent\b/gi, "index"],
  [/\bPEMDAS\b/g, "BIDMAS"],
  [/\bparentheses\b/gi, "brackets"],
  [/\bPythagorean theorem\b/gi, "Pythagoras' theorem"],
  [/\bright triangle\b/gi, "right-angled triangle"],
  [/\bdistributing\b/gi, "expanding brackets"],
  [/\bpercents\b/gi, "percentages"],
  [/\bpercent (change|increase|decrease)\b/gi, "percentage $1"],
  [/\b(a|the) percent\b/gi, "$1 percentage"],
  [/\bpercent\b/gi, "per cent"],
  [/\bcenter\b/gi, "centre"],
  [/\bneighbor\b/gi, "neighbour"],
  [/\bmail carrier\b/gi, "postal worker"],
  [/\bliters\b/gi, "litres"],
  [/\bliter\b/gi, "litre"],
  [/\btire\b/gi, "tyre"],
  [/\bcookies\b/gi, "biscuits"],
  [/\bcookie\b/gi, "biscuit"],
  [/\bcandy\b/gi, "sweets"],
  [/\bmath\b/gi, "maths"],
  [/\bdollars\b/gi, "pounds"],
  [/\bdollar\b/gi, "pound"],
  [/\bcents\b/gi, "pence"],
  [/\byard\b/gi, "garden"],
];

function britishText(text: string): string {
  // Preserve the factor-of-ten analogy without introducing a fictional UK coin.
  let result = text
    .replace("changing dollars into dimes", "counting pounds in units of ten pence")
    .replace("A quarter is 1/4 of a dollar", "A quarter of a pound is 1/4 of a pound")
    .replace("The TEAS gives you a calculator for this part.", "Divide the numerator by the denominator to get the decimal.");
  for (const [pattern, replacement] of WORDING) {
    result = result.replace(pattern, (match, ...args) => {
      const expanded = replacement.replace(/\$(\d)/g, (_, n) => args[Number(n) - 1]);
      return /^[A-Z]/.test(match) ? expanded[0].toUpperCase() + expanded.slice(1) : expanded;
    });
  }
  return result.replace(/\$(?=\d)/g, "£");
}

function localise(value: unknown, key = ""): unknown {
  if (typeof value === "string") return ["id", "kind", "play"].includes(key) ? value : britishText(value);
  if (Array.isArray(value)) return value.map((item) => localise(item));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localise(v, k)]));
  return value;
}

const cache = new WeakMap<BasicsSkill, BasicsSkill>();
export function britishBasicsSkill(skill: BasicsSkill): BasicsSkill {
  let british = cache.get(skill);
  if (!british) {
    british = localise(skill) as BasicsSkill;
    // UK curriculum names, rather than the US shorthand used in shared lessons.
    if (skill.id === "systems") {
      british.name = "Solving simultaneous equations";
      british.rule = "The solution to simultaneous equations is the one (x, y) pair that makes both equations true at the same time. On a graph, it is where the two lines cross.";
    }
    if (skill.id === "distributing") british.name = "Expanding brackets and collecting like terms";
    if (skill.id === "substitution") british.name = "Substitution";
    // Existing recordings narrate the original copy. Equal word counts do not
    // prove that a recording matches translated terminology. Until a separate
    // recording exists, changed lessons use the written/interactive presentation.
    if (JSON.stringify(british) !== JSON.stringify(skill)) british.audioDisabled = true;
    cache.set(skill, british);
  }
  return british;
}
