"""Wire a v1 exam built under tools/next100/<id>/ into the site.

Usage: python3 -I tools/next100/ukbuild/wire.py <id> [<id> ...]

Reads tools/next100/<id>/spec.json (from the bank writer) and tools/next100/<id>/wire.json
(site copy), then edits the shared files at fixed anchors, writes the app wrappers, the bank
module and the landing page. Idempotent: an exam already wired is skipped in each file.
Anchors are next to uk18ed, the closest existing exam (UK trade certificate).
"""
import json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))


def rd(p):
    return open(os.path.join(ROOT, p), encoding="utf-8").read()


def wr(p, s):
    full = os.path.join(ROOT, p)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(s)


def once(path, marker, old, new, count=1):
    """Replace old with new in path unless marker is already there."""
    s = rd(path)
    if marker in s:
        return
    assert s.count(old) >= 1, (path, old[:80])
    s = s.replace(old, new, count)
    wr(path, s)


def js(v):
    return json.dumps(v, ensure_ascii=False)


def pascal(i):
    return i[0].upper() + i[1:]


def wire(eid):
    spec = json.load(open(os.path.join(ROOT, "tools/next100", eid, "spec.json")))
    w = json.load(open(os.path.join(ROOT, "tools/next100", eid, "wire.json")))
    code, base, slug, land = spec["stateCode"], spec["idBase"], spec["slug"], spec["landingPath"]
    cats = spec["categories"]
    per_test = sum(c["perTest"] for c in cats)
    assert per_test == 50, (eid, per_test)
    data_file = spec["dataFile"]
    bank = json.load(open(os.path.join(ROOT, data_file)))
    assert len(bank) == 200, len(bank)
    pools = {}
    for q in bank:
        pools[q["category"]] = pools.get(q["category"], 0) + 1
    for c in cats:
        assert pools[c["key"]] == 4 * c["perTest"], (c, pools.get(c["key"]))
    var = eid

    # ---- lib/exams.ts
    once("lib/exams.ts", f'| "{eid}" |', 'export type ExamId = "ccaf" |', f'export type ExamId = "ccaf" | "{eid}" |')
    sets = []
    for n, s in enumerate(spec["trainingSets"], 1):
        size = sum(pools[k] for k in s["categories"])
        assert size == s["size"], (eid, s)
        per = sum(c["perTest"] for c in cats if c["key"] in s["categories"])
        sets.append(f'    {{ setNumber: {n}, id: {base + n}, name: {js(s["name"])}, categories: [{",".join(js(k) for k in s["categories"])}], size: {size}, weightLabel: "{per} of 50 test questions" }},')
    comment = "\n".join("  // " + line for line in w["blueprintComment"])
    copy = w["copy"]
    cfg = f'''const {var}: ExamConfig = {{
  id: "{eid}",
  stateCode: "{code}",
  idBase: {base},
  slug: "{slug}",
  landingPath: "{land}",
  name: {js(spec["name"])},
  shortName: {js(spec["shortName"])},
  examLabel: {js(spec["examLabel"])},
  fullName: {js(spec["fullName"])},
  questionIdPrefix: "{spec["prefix"]}",
  icon: "{spec.get("icon", "hardhat")}",
  testCount: 4,
  questionsPerTest: 50,
  passPct: {spec["passPct"]},
{comment}
  blueprint: {{
{chr(10).join(f'    {c["key"]}: {c["perTest"]},' for c in cats)}
  }},
  trainingSets: [
{chr(10).join(sets)}
  ],
  categoryLabels: {{
{chr(10).join(f'    {c["key"]}: {js(c["label"])},' for c in cats)}
  }},
  copy: {{
    guestPrompt: {js(copy["guestPrompt"])},
    trainingHeading: "Train by topic",
    trainingSub: {js(copy["trainingSub"])},
    testsHeading: {js(copy["testsHeading"])},
    heroSubs: [
{chr(10).join("      " + js(h) + "," for h in copy["heroSubs"])}
    ],
    sourceLine: {js(copy["sourceLine"])},
    analyticsKey: "{eid}",
  }},
}};

'''
    assert len(copy["heroSubs"]) == 5
    once("lib/exams.ts", f'const {var}: ExamConfig = {{', "const cscs: ExamConfig = {", cfg + "const cscs: ExamConfig = {")
    s = rd("lib/exams.ts")
    m = re.search(r"export const EXAMS: ExamConfig\[\] = \[[^\]]*\]", s)
    if not re.search(rf"\b{var},", m.group(0)):
        new = m.group(0).replace(" uk18ed,", f" uk18ed, {var},", 1)
        assert new != m.group(0)
        wr("lib/exams.ts", s.replace(m.group(0), new))

    # ---- bank module
    imp = pascal(eid) + "Questions"
    wr(f"lib/banks/{eid}.ts", f'''import {{ Question }} from "@/types";
import {imp.lower()[0] + imp[1:]} from "@/{data_file[:-5]}.json";
import {{ registerExamBanks }} from "@/lib/examData";

// The {spec["shortName"]} bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({{ {eid}: {imp.lower()[0] + imp[1:]} as Question[] }});
''')
    once("lib/banks/all.ts", f'import "./{eid}";', 'import "./uk18ed";', f'import "./uk18ed";\nimport "./{eid}";')

    # ---- types
    once("types/index.ts", f'| "{code}" |', 'export type QuestionType = "CCAF" |', f'export type QuestionType = "CCAF" | "{code}" |')
    lines = f"  // {spec['shortName']} ({eid})\n" + "".join(f'  | "{c["key"]}"\n' for c in cats)
    once("types/index.ts", f'"{cats[0]["key"]}"', '  | "uk18edAppendices"\n', '  | "uk18edAppendices"\n' + lines)

    # ---- i18n
    for lang in ["en", "es", "ko", "vi", "zh"]:
        p = f"i18n/{lang}.ts"
        s = rd(p)
        if f"    {cats[0]['key']}:" in s:
            continue
        anchor = re.search(r"\n(\s+)uk18edAppendices: [^\n]*\n", s)
        ind = anchor.group(1)
        add = "".join(f"{ind}{c['key']}: {js(c['label'])},\n" for c in cats)
        s = s[: anchor.end()] + add + s[anchor.end():]
        wr(p, s)

    # ---- globals.css (light block; dark tints come from tools/gen_dark_brand_css.py)
    h, sat, li = [float(x.strip("%")) for x in spec["hue"].split()]
    f = lambda v: str(int(v)) if float(v).is_integer() else str(round(v, 1))
    blk = f'''  /* {w["themeComment"]} */
  [data-theme="{eid}"] {{
    --brand: {f(h)} {f(sat)}% {f(li)}%;
    --brand-foreground: 0 0% 100%;
    --brand-light: {f(h)} {f(sat)}% 95%;
    --brand-hover: {f(h)} {f(sat)}% {f(li - 4)}%;
    --brand-dark: {f(h)} {f(sat)}% {f(max(li - 7, 12))}%;
    --brand-darker: {f(h)} {f(sat)}% {f(max(li - 13, 8))}%;
    --brand-muted: {f(h)} {f(min(sat, 45))}% 70%;
    --brand-border: {f(h)} {f(min(sat, 45))}% 76%;
    --brand-border-light: {f(h)} {f(min(sat, 40))}% 88%;
    --brand-gradient-to: {f((h + 12) % 360)} {f(sat)}% 95%;
  }}

'''
    once("app/globals.css", f'[data-theme="{eid}"]', '  /* OSSLT theme: indigo', blk + '  /* OSSLT theme: indigo')

    # ---- testCatalog
    cat = "lib/testCatalog.ts"
    once(cat, f"\n  {eid}: {js(w['blurb'])}", "\n  uk18ed: \"Free mock exams for the 18th Edition", f"\n  {eid}: {js(w['blurb'])},\n  uk18ed: \"Free mock exams for the 18th Edition")
    once(cat, f'{eid}: {js(w["org"])}', 'const EXAM_ORG: Record<string, string> = { ', f'const EXAM_ORG: Record<string, string> = {{ {eid}: {js(w["org"])}, ')
    s = rd(cat)
    gm = re.search(r'\{ title: "UK workplace and trade certificates", ids: \[([^\]]*)\] \}', s)
    if f'"{eid}"' not in gm.group(1):
        ids = gm.group(1) + f', "{eid}"'
        s = s.replace(gm.group(0), f'{{ title: "UK workplace and trade certificates", ids: [{ids}] }}')
        wr(cat, s)
    once(cat, f"\n  {eid}: {js(w['aliases'])}", "\n  uk18ed: \"18th edition wiring regulations", f"\n  {eid}: {js(w['aliases'])},\n  uk18ed: \"18th edition wiring regulations")
    once(cat, f"\n  {eid}: [", "\n  uk18ed: [\"caelec\"", f"\n  {eid}: [{', '.join(js(r) for r in w['related'])}],\n  uk18ed: [\"caelec\"")

    # ---- region
    once("lib/region.ts", f" {eid}: \"UK\",", ' uk18ed: "UK",', f' uk18ed: "UK", {eid}: "UK",')
    once("lib/region.ts", f'"uk18ed", "{eid}"', '"uksia", "uk18ed",', f'"uksia", "uk18ed", "{eid}",')

    # ---- mascots, share cards
    once("lib/tigerAssets.ts", f"  {eid}: ", "  ukcar: \"driving\",", f"  {eid}: \"{spec['borrowTiger']}\",\n  ukcar: \"driving\",")
    once("lib/shareCardCopy.ts", f"  {eid}: {{", "  ccaf: {", f"  {eid}: {{ title: {js(w['shareTitle'])}, description: {js(w['shareDesc'])} }},\n  ccaf: {{")
    once("lib/shareImageUrl.ts", f'"{eid}",', 'const SHARE_COPY_IDS = new Set([', f'const SHARE_COPY_IDS = new Set(["{eid}", ')
    once("lib/shareCards.ts", f'  "{eid}": {{', 'const SHARE_COLORS: Record<string, { color: string; tint: string }> = {\n',
         'const SHARE_COLORS: Record<string, { color: string; tint: string }> = {\n'
         f'  "{eid}": {{\n    "color": "hsl({f(h)}, {f(sat)}%, {f(li)}%)",\n    "tint": "hsl({f(h)}, {f(sat)}%, 95%)"\n  }},\n')

    # ---- teacher-led
    if w.get("teaches"):
        once("components/TeachNudge.tsx", f'"uk18ed", "{eid}"', '"uksia", "uk18ed",', f'"uksia", "uk18ed", "{eid}",')
        once("components/exam/ExamClassFaq.tsx", f"  {eid}: ", '  uk18ed: "an 18th Edition (2382) course",', f'  uk18ed: "an 18th Edition (2382) course",\n  {eid}: {js(w["teaches"])},')

    # ---- examFacts
    ef = w["examFacts"]
    rows = "\n".join(f"      {{ label: {js(r[0])}, value: {js(r[1])} }}," for r in ef["rows"])
    entry = f'''  {eid}: {{
    answer:
      {js(ef["answer"])},
    rows: [
{rows}
    ],
    basedOn: {js(ef["basedOn"])},
    source: {{ name: {js(ef["source"]["name"])}, url: {js(ef["source"]["url"])} }},
  }},
'''
    once("lib/examFacts.ts", f"\n  {eid}: {{", "\n  uk18ed: {\n", "\n" + entry + "  uk18ed: {\n")

    # ---- app wrappers
    P = pascal(eid)
    d = "app" + slug
    wr(f"{d}/layout.tsx", f'''import type {{ Metadata }} from "next";
import {{ examAppMetadata }} from "@/lib/examSeo";

export const metadata: Metadata = examAppMetadata("{eid}");

export default function {P}Layout({{ children }}: {{ children: React.ReactNode }}) {{
  return <div data-theme="{eid}" className="flex-1 flex flex-col">{{children}}</div>;
}}
''')
    wr(f"{d}/page.tsx", f'''import {{ permanentRedirect }} from "next/navigation";

export default function RootRedirect() {{
  permanentRedirect("{slug}/dashboard");
}}
''')
    for sub, comp in [("dashboard", "ExamDashboard"), ("drill", "ExamDrillPage"), ("stats", "ExamStatsPage")]:
        bank_imp = f'import "@/lib/banks/{eid}";\n' if sub == "stats" else ""
        prop = "exam"
        wr(f"{d}/{sub}/page.tsx", f'''"use client";

{bank_imp}import {{ {comp} }} from "@/components/exam/{comp}";
import {{ getExamById }} from "@/lib/exams";

export default function {P}{pascal(sub)}Page() {{
  return <{comp} {prop}={{getExamById("{eid}")!}} />;
}}
''')

    # ---- landing
    wr(f"app{land}/page.tsx", landing(eid, spec, w, cats, land, slug))
    print("wired", eid)


def jsx(t):
    """Text for JSX: escape apostrophes and braces."""
    return t.replace("'", "&apos;").replace("{", "&#123;").replace("}", "&#125;")


def landing(eid, spec, w, cats, land, slug):
    L = w["landing"]
    faqs_ld = ",\n".join(
        f'''        {{
          "@type": "Question",
          name: {js(q)},
          acceptedAnswer: {{ "@type": "Answer", text: {js(a)} }},
        }}''' for q, a in L["faqs"])
    if w.get("teaches"):
        faqs_ld += f',\n        classFaqJsonLd("{eid}")'
    areas = "\n".join(f'  {{ name: {js(c["label"])}, weight: "{c["perTest"] * 2}%" }},' for c in cats)
    tips = "\n".join(f'''            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{i}. {jsx(h)}</h3>
              <p>
                {jsx(p)}
              </p>
            </div>''' for i, (h, p) in enumerate(L["tips"], 1))
    faqs = "\n".join(f'''          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{jsx(q)}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {jsx(a)}
            </p>
          </div>''' for q, a in L["faqs"])
    tutors = ""
    if L.get("tutors"):
        tutors = f'''
      {{/* For teachers */}}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {jsx(L["tutors"][0])}{{" "}}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {{" "}}{jsx(L["tutors"][1])}
        </p>
      </div>
'''
    class_imp = 'import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";\n' if w.get("teaches") else ""
    class_faq = f'\n          <ExamClassFaq examId="{eid}" />' if w.get("teaches") else ""
    link_imp = 'import Link from "next/link";\n' if L.get("tutors") else ""
    return f'''import "@/lib/banks/{eid}";
import {{ shareImageUrl }} from "@/lib/shareImageUrl";
import {{ Metadata }} from "next";
import Image from "next/image";
{link_imp}import {{ getTigerAsset }} from "@/lib/tigerAssets";
import {{ Smartphone, Monitor }} from "lucide-react";
import {{ ExamLandingHero, ExamLandingCTA }} from "@/components/exam/ExamLandingHero";
import {{ ExamFacts }} from "@/components/exam/ExamFacts";
import {{ ExamRelatedTests }} from "@/components/exam/ExamRelatedTests";
{class_imp}import {{ SITE_URL }} from "@/lib/siteUrl";
import {{ ExamSampleQuestions }} from "@/components/exam/ExamSampleQuestions";
import {{ examOffers }} from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = {js(L["title"])};
const metaDescription =
  {js(L["metaDescription"])};
const description =
  {js(L["description"])};

export const metadata: Metadata = {{
  title,
  description: metaDescription,
  keywords:
    {js(L["keywords"])},
  alternates: {{
    canonical: `${{siteUrl}}{land}`,
  }},
  openGraph: {{
    title,
    description: metaDescription,
    url: `${{siteUrl}}{land}`,
    images: [{{ url: shareImageUrl("{eid}"), width: 1200, height: 630, alt: {js(L["ogAlt"])} }}],
    siteName: "Tigertest",
    type: "website",
  }},
  twitter: {{
    card: "summary_large_image",
    images: [shareImageUrl("{eid}")],
    title,
    description: metaDescription,
  }},
}};

const jsonLd = {{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "WebApplication",
      name: {js(L["appName"])},
      description,
      url: `${{siteUrl}}{land}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("{eid}", "GBP"),
      featureList: {js(L["featureList"])},
      publisher: {{ "@id": `${{siteUrl}}/#organization` }},
    }},
    {{
      "@type": "FAQPage",
      mainEntity: [
{faqs_ld},
      ],
    }},
  ],
}};

const contentAreas = [
{areas}
];

export default function {pascal(eid)}LandingPage() {{
  return (
    <div data-theme="{eid}" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(jsonLd) }}}}
      />

      {{/* Hero */}}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            {jsx(L["h1"])}
          </h1>
          <ExamLandingHero
            dashboardHref="{slug}/dashboard"
            shortName={js(spec["shortName"])}
            subtitle={js(L["heroSubtitle"])}
            shots={{{{ mobile: "/landing/{eid}-mobile.png", desktop: "/landing/{eid}-desktop.png" }}}}
          />
        </div>
      </div>

      <ExamFacts examId="{eid}" />

      {{/* How it works */}}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {jsx(L["howTrain"])}
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {jsx(L["howTest"])}
              </p>
            </div>
          </div>
        </div>
      </div>

      {{/* Blueprint */}}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                {jsx(L["blueprintHeading"])}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {jsx(L["blueprintPara"])}
              </p>
              <div className="space-y-3">
                {{contentAreas.map((area) => (
                  <div key={{area.name}} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{{area.name}}</span>
                    <span className="text-brand-dark font-semibold">{{area.weight}}</span>
                  </div>
                ))}}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={{getTigerAsset("{eid}", 1)}}
                alt="Tigertest mascot"
                width={{180}}
                height={{180}}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>
{tutors}
      {{/* Feedback */}}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {{/* Study guide */}}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            {jsx(L["studyHeading"])}
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
{tips}
          </div>
        </div>
      </div>

      {{/* FAQ */}}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          {jsx(L["faqHeading"])}
        </h2>
        <div className="space-y-8">
{faqs}{class_faq}
        </div>
      </div>

      <ExamSampleQuestions examId="{eid}" />

      <ExamRelatedTests examId="{eid}" />

      {{/* Final CTA */}}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">{jsx(L["ctaHeading"])}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">{jsx(L["ctaSub"])}</p>
          <ExamLandingCTA dashboardHref="{slug}/dashboard" />
        </div>
      </div>
    </div>
  );
}}
'''


if __name__ == "__main__":
    for e in sys.argv[1:]:
        wire(e)
