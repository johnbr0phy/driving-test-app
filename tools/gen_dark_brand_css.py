"""Usage: python3 tools/gen_dark_brand_css.py > /tmp/dark.css, then paste into
the .dark brand section of app/globals.css.

Generate dark-mode overrides for every brand theme block in globals.css.

Light themes tint surfaces with near-white brand colours (brand-light,
gradient-to, border-light). On a near-black page those need to become deep
tints of the same hue, and brand text that was darkened for a white page
(brand-dark, brand-darker) needs to lighten instead. Everything else keeps
its light value.
"""
import re, sys

path = "app/globals.css"
src = open(path).read()

block_re = re.compile(r'(?P<sel>:root|\[data-theme="[a-z0-9_-]+"\])\s*\{(?P<body>[^}]*)\}', re.S)
tok_re = re.compile(r'--(brand[a-z-]*):\s*([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%')

def hsl(h, s, l):
    def f(x):
        return str(int(x)) if float(x).is_integer() else str(round(x, 1))
    return f"{f(h)} {f(s)}% {f(l)}%"

out = []
for m in block_re.finditer(src):
    sel, body = m.group("sel"), m.group("body")
    toks = {k: (float(h), float(s), float(l)) for k, h, s, l in tok_re.findall(body)}
    if "brand" not in toks:
        continue
    bh, bs, bl = toks["brand"]
    lines = []
    # Low-lightness brands (teal, steel blue, olive) read as muddy text on a
    # near-black page: lift them to at least 50% and keep hover a step darker.
    if bl < 50:
        lines.append(f"    --brand: {hsl(bh, bs, 50)};")
        hv = toks.get("brand-hover")
        if hv:
            lines.append(f"    --brand-hover: {hsl(hv[0], hv[1], max(hv[2], 42))};")
    if "brand-light" in toks:
        h, s, l = toks["brand-light"]
        lines.append(f"    --brand-light: {hsl(h, min(s, 45), 13)};")
    if "brand-gradient-to" in toks:
        h, s, l = toks["brand-gradient-to"]
        lines.append(f"    --brand-gradient-to: {hsl(h, min(s, 40), 11)};")
    if "brand-border-light" in toks:
        h, s, l = toks["brand-border-light"]
        lines.append(f"    --brand-border-light: {hsl(h, min(s, 35), 24)};")
    if "brand-border" in toks:
        h, s, l = toks["brand-border"]
        lines.append(f"    --brand-border: {hsl(h, min(s, 40), 34)};")
    if "brand-muted" in toks:
        h, s, l = toks["brand-muted"]
        lines.append(f"    --brand-muted: {hsl(h, min(s, 45), 45)};")
    if "brand-dark" in toks:
        h, s, l = toks["brand-dark"]
        lines.append(f"    --brand-dark: {hsl(h, s, max(bl + 15, 65))};")
    if "brand-darker" in toks:
        h, s, l = toks["brand-darker"]
        lines.append(f"    --brand-darker: {hsl(h, s, max(bl + 25, 78))};")
    dark_sel = ".dark" if sel == ":root" else f".dark {sel}"
    out.append(f"  {dark_sel} {{\n" + "\n".join(lines) + "\n  }")

css = "\n\n".join(out)
sys.stdout.write(css)
