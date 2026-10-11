"""Append a dark: companion to every hardcoded Tailwind colour utility.

Light mode is left pixel-identical: each `text-gray-900` becomes
`text-gray-900 dark:text-gray-50`, and so on, following one palette:
  page gray-50 -> gray-950, card white -> gray-900, inset gray-100 -> gray-800,
  border gray-200 -> gray-800, body text gray-900 -> gray-50, ...
Semantic tints (green-50 boxes, red-200 borders, amber-800 text) move to the
deep end of their own hue. Solid fills (bg-green-500, text-white on brand)
are left alone. Black CTA buttons (`bg-black text-white hover:bg-gray-800`)
invert to white buttons.
"""
import re, sys, pathlib

ROOTS = ["app", "components", "contexts", "hooks"]
EXCLUDE = ("app/og/", "app/api/")

TOKEN = re.compile(
    r"(?<![\w/-])((?:[a-z-]+:)*)"
    r"(bg|text|border|from|to|via|divide|fill|stroke)-"
    r"(gray|white|black|orange|amber|yellow|green|emerald|red|blue|sky|indigo|violet|purple|pink|rose|teal|cyan|lime)"
    r"(?:-(\d{2,3}))?(/\d+)?(?![\w/-])"
)

GRAY_TEXT = {"900": "50", "800": "100", "700": "200", "600": "300", "500": "400"}
GRAY_SURFACE = {"50": "950", "100": "800", "200": "700", "300": "600"}
GRAY_BORDER = {"100": "800", "200": "800", "300": "700", "400": "600"}
TINT_SURFACE = {"50": "950", "100": "900", "200": "800"}
TINT_BORDER = {"100": "900", "200": "800", "300": "700", "400": "600"}
TINT_TEXT = {"900": "200", "800": "300", "700": "300", "600": "400", "500": "400"}


def dark_for(util, color, shade, opacity, inverted_button, prefix=""):
    """Return (color, shade) of the dark companion, or None to leave as is."""
    if color == "white" and util == "bg" and "hover" in prefix and not opacity:
        return ("gray", "800")
    if color == "white":
        # Translucent white (bg-white/10 on a dark hero) is a glassy highlight
        # that works on both schemes; only near-opaque surfaces are swapped.
        if opacity and int(opacity[1:]) < 70:
            return None
        if util == "bg":
            return ("gray", "900")
        if util in ("from", "to", "via"):
            # Hero gradients fade into whichever page surface sits beneath
            # (gray-900 or gray-950), so end on transparent rather than guess.
            return ("transparent", None)
        if util == "text" and inverted_button:
            return ("gray", "900")
        return None
    if color == "black":
        if opacity:  # bg-black/50 overlays are already right on both schemes
            return None
        if util == "bg":
            return ("white", None)
        if util == "text":
            return ("white", None)
        return None
    if color == "gray":
        if util == "text":
            return ("gray", GRAY_TEXT[shade]) if shade in GRAY_TEXT else None
        if util == "bg":
            if "hover" in prefix and shade in ("50", "100"):
                return ("gray", "800")
            if shade == "900":
                return ("white", None) if inverted_button else ("gray", "100")
            if shade == "800":
                return ("gray", "200") if inverted_button else None
            return ("gray", GRAY_SURFACE[shade]) if shade in GRAY_SURFACE else None
        if util in ("from", "to", "via"):
            return ("gray", GRAY_SURFACE[shade]) if shade in GRAY_SURFACE else None
        if util in ("border", "divide"):
            if util == "divide" and shade == "50":
                return ("gray", "800")
            return ("gray", GRAY_BORDER[shade]) if shade in GRAY_BORDER else None
        if util == "fill":
            return ("gray", "300") if shade == "700" else None
        if util == "stroke":
            return ("gray", "800") if shade == "100" else None
        return None
    # Semantic tints
    if util in ("bg", "from", "to", "via"):
        return (color, TINT_SURFACE[shade]) if shade in TINT_SURFACE else None
    if util in ("border", "divide"):
        return (color, TINT_BORDER[shade]) if shade in TINT_BORDER else None
    if util == "text":
        return (color, TINT_TEXT[shade]) if shade in TINT_TEXT else None
    if util == "fill":
        return (color, "900") if shade == "100" else None
    return None


def rewrite_line(line, stats, review):
    if "dark:" in line and not TOKEN.search(line):
        return line
    inverted_button = bool(re.search(r"(?<!dark:)(?<![\w:-])bg-(black|gray-900)(?![\w/-])", line)) and bool(
        re.search(r"(?<![\w:-])text-white(?![\w/-])", line)
    )
    if inverted_button:
        review.append(line.strip())

    def sub(m):
        prefix, util, color, shade, opacity = m.groups()
        if "dark:" in prefix:
            return m.group(0)
        target = dark_for(util, color, shade, opacity, inverted_button, prefix)
        if target is None:
            return m.group(0)
        marker = f"dark:{prefix}{util}-"
        if marker in line:  # already has a hand-written dark companion
            return m.group(0)
        tcolor, tshade = target
        cls = f"dark:{prefix}{util}-{tcolor}" + (f"-{tshade}" if tshade else "") + (opacity or "")
        stats[m.group(0).lstrip()] = stats.get(m.group(0).lstrip(), 0) + 1
        return f"{m.group(0)} {cls}"

    return TOKEN.sub(sub, line)


def main():
    stats, review, changed = {}, [], 0
    for root in ROOTS:
        for path in sorted(pathlib.Path(root).rglob("*.tsx")):
            sp = str(path)
            if any(sp.startswith(e) for e in EXCLUDE):
                continue
            src = path.read_text()
            lines = src.split("\n")
            new = [rewrite_line(l, stats, review) for l in lines]
            out = "\n".join(new)
            if out != src:
                path.write_text(out)
                changed += 1
    total = sum(stats.values())
    print(f"files changed: {changed}, classes given a dark companion: {total}")
    for k, v in sorted(stats.items(), key=lambda kv: -kv[1])[:40]:
        print(f"{v:5d} {k}")
    print("\n--- inverted button lines to review:", len(review))
    for l in review:
        print("  " + l[:170])


if __name__ == "__main__":
    main()
