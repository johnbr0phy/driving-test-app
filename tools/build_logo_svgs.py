"""Builds the header logo lockups as standalone SVGs in public/logos/.

Each logo is the exam's tiger, the "tigertest" wordmark and the test name in
the exam's brand color, the same layout as components/BrandLockup.tsx. Every
logo comes in a light version (<id>.svg) and one for dark backgrounds
(<id>-dark.svg). Text is live with a system font stack, sized from Helvetica
Neue metrics plus a margin, so the box fits on any machine.

  python3 tools/build_logo_svgs.py
"""
import base64, colorsys, io, json, re, subprocess
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.ttLib import TTCollection
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "logos"
FONT = "-apple-system, BlinkMacSystemFont, &apos;Segoe UI&apos;, &apos;Helvetica Neue&apos;, Helvetica, Arial, sans-serif"

# Layout in px, matching BrandLockup: 40px tiger, 10px gap, 24px wordmark, 14px subtitle.
ICON, GAP, WORD, SUB, LINE_GAP = 40, 10, 24, 14, 4

fonts = TTCollection("/System/Library/Fonts/HelveticaNeue.ttc").fonts
BOLD, MEDIUM = fonts[1], fonts[10]


def text_width(font, text, size, tracking=0.0):
    cmap, hmtx, upm = font.getBestCmap(), font["hmtx"], font["head"].unitsPerEm
    width = sum(hmtx[cmap.get(ord(ch), "space")][0] for ch in text) * size / upm
    return width + tracking * size * (len(text) - 1)


def hsl_hex(hsl):
    h, s, l = (float(x.rstrip("%")) for x in hsl.split())
    r, g, b = colorsys.hls_to_rgb(h / 360, l / 100, s / 100)
    return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))


def css_brands():
    css = (ROOT / "app" / "globals.css").read_text()
    brands = {t: v.strip() for t, v in re.findall(r"(?<!\.dark )\[data-theme=\"([\w-]+)\"\]\s*\{[^}]*?--brand:\s*([^;]+);", css)}
    brands["dmv"] = re.search(r":root\s*\{[^}]*?--brand:\s*([^;]+);", css).group(1).strip()
    return brands


def lift(hsl, floor):
    h, s, l = hsl.split()
    return f"{h} {s} {max(float(l.rstrip('%')), floor)}%"


_tiger_cache = {}


def tiger_data_uri(path):
    if path not in _tiger_cache:
        img = Image.open(ROOT / "public" / path.lstrip("/")).convert("RGBA")
        img = img.crop(img.getbbox())
        side = max(img.size)
        square = Image.new("RGBA", (side, side))
        square.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
        # 3x the 40px box keeps it sharp on retina; a 128-colour palette keeps each file small.
        square = square.resize((120, 120), Image.LANCZOS).quantize(128, method=Image.FASTOCTREE)
        buf = io.BytesIO()
        square.save(buf, "PNG", optimize=True)
        _tiger_cache[path] = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()
    return _tiger_cache[path]


def svg(logo, brand_hex, dark):
    # San Francisco and Segoe run about 6% wider than Helvetica Neue.
    word_w = text_width(BOLD, "tigertest", WORD, -0.025) * 1.06
    sub_w = text_width(MEDIUM, logo["subtitle"], SUB) * 1.07
    width = ICON + GAP + max(word_w, sub_w) + 2
    # Wordmark cap height + gap + subtitle, centred on the 40px tiger.
    block = WORD * 0.72 + LINE_GAP + SUB * 0.72 + 2
    top = (ICON - block) / 2
    word_y = top + WORD * 0.72
    sub_y = word_y + LINE_GAP + 2 + SUB * 0.72
    ink = "#f9fafb" if dark else "#111827"
    x = ICON + GAP
    label = escape(f"tigertest {logo['subtitle']}")
    return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width:.1f} {ICON}" width="{width * 2:.0f}" height="{ICON * 2}" role="img" aria-label="{label}">
  <title>{label}</title>
  <image href="{tiger_data_uri(logo["tiger"])}" x="0" y="0" width="{ICON}" height="{ICON}"/>
  <text x="{x}" y="{word_y:.2f}" font-family="{FONT}" font-size="{WORD}" font-weight="800" letter-spacing="-0.6" fill="{ink}">tigertest</text>
  <text x="{x}" y="{sub_y:.2f}" font-family="{FONT}" font-size="{SUB}" font-weight="500" fill="{brand_hex}">{escape(logo["subtitle"])}</text>
</svg>
'''


def main():
    logos = json.loads(subprocess.check_output(["npx", "tsx", "scripts/logo-manifest.ts"], cwd=ROOT))
    brands = css_brands()
    for logo in logos:
        # Dark mode uses the brand at 65% lightness, like text-brand-dark under .dark.
        light_hsl = logo.get("brand") or brands.get(logo["theme"], brands["dmv"])
        dark_hsl = lift(light_hsl, 65)
        base = OUT / logo["id"]
        base.parent.mkdir(parents=True, exist_ok=True)
        base.with_suffix(".svg").write_text(svg(logo, hsl_hex(light_hsl), False))
        (base.parent / f"{base.name}-dark.svg").write_text(svg(logo, hsl_hex(dark_hsl), True))
    print(f"{len(logos)} logos, {len(logos) * 2} files in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
