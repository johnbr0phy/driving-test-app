"""Draw the India road signs for the inrto bank into public/signs/in/. Usage: python3 -I signs.py

Original drawings to the shapes and colours of the Motor Vehicles Act sign schedule (IRC:67):
mandatory = circles (red border prohibits, blue disc orders), cautionary = red-bordered triangle
point up, informatory = blue rectangle. Pictograms are drawn in a 100 x 100 box and placed in
the frame. Each sign is mapped to its questions in lib/signImages.ts.
"""
import math, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, "..", "..", "..", "public", "signs", "in"))
RED, BLUE, BLACK, WHITE = "#D7262B", "#1F5BAA", "#111111", "#FFFFFF"


def head(tip, ang, size=14, c=BLACK):
    """Filled arrowhead with its tip at `tip`, pointing at angle `ang` (degrees, 0 = right, 90 = down)."""
    a = math.radians(ang)
    x, y = tip
    bx, by = x - size * math.cos(a), y - size * math.sin(a)
    px, py = -math.sin(a) * size * 0.75, math.cos(a) * size * 0.75
    return f'<path d="M{x:.1f} {y:.1f} L{bx+px:.1f} {by+py:.1f} L{bx-px:.1f} {by-py:.1f} Z" fill="{c}"/>'


def line(d, c=BLACK, w=9):
    return f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'


def text(s, c=BLACK, size=46, y=66, x=50, weight=800):
    return (f'<text x="{x}" y="{y}" fill="{c}" font-family="Arial, Helvetica, sans-serif" font-size="{size}" '
            f'font-weight="{weight}" text-anchor="middle">{s}</text>')


# ---------- pictograms (100 x 100 box) ----------

def p_horn(c):
    return (f'<path d="M14 40 H30 L74 16 V84 L30 60 H14 Z" fill="{c}"/>'
            f'<rect x="74" y="12" width="8" height="76" rx="3" fill="{c}"/>')


def p_bicycle(c):
    return (f'<circle cx="24" cy="64" r="16" fill="none" stroke="{c}" stroke-width="6"/>'
            f'<circle cx="77" cy="64" r="16" fill="none" stroke="{c}" stroke-width="6"/>'
            + line("M24 64 L47 64 L38 38 M24 64 L38 38 M38 38 L67 38 L47 64 M67 38 L77 64 M67 38 L63 28 L74 28 M32 34 L45 34", c, 5))


def p_walker(c, cx=50, s=1.0, child=False):
    def P(x, y):
        return f"{cx + (x - 50) * s:.1f} {y * s + (100 - 100 * s):.1f}"
    r = 8 * s
    hx, hy = P(53, 13).split()
    w = 8 * s
    return (f'<circle cx="{hx}" cy="{hy}" r="{r:.1f}" fill="{c}"/>'
            + line(f"M{P(51,25)} L{P(47,58)} L{P(35,90)} M{P(47,58)} L{P(60,74)} L{P(60,92)} "
                   f"M{P(50,32)} L{P(36,52)} M{P(50,32)} L{P(64,50)}", c, w))


def p_children(c):
    return p_walker(c, cx=36, s=0.95) + p_walker(c, cx=68, s=0.72)


def p_digger(c):
    return (p_walker(c, cx=36, s=0.9)
            + line("M54 50 L84 86", c, 5)
            + f'<path d="M78 82 L92 80 L90 94 Z" fill="{c}"/>'
            + f'<path d="M58 96 Q74 72 96 96 Z" fill="{c}"/>')


def p_truck(c):
    bg = WHITE if c == BLACK else BLUE
    return (f'<rect x="6" y="28" width="58" height="42" rx="2" fill="{c}"/>'
            f'<path d="M67 42 H84 L94 56 V70 H67 Z" fill="{c}"/>'
            f'<path d="M72 46 H82 L88 55 H72 Z" fill="{bg}"/>'
            f'<circle cx="22" cy="74" r="10" fill="{c}" stroke="{bg}" stroke-width="3"/>'
            f'<circle cx="80" cy="74" r="10" fill="{c}" stroke="{bg}" stroke-width="3"/>')


def p_bovine(c, x0=0, s=1.0, horns=True):
    def T(x, y):
        return f"{x0 + x * s:.1f} {y * s:.1f}"
    out = (f'<path d="M{T(22,40)} C{T(30,34)} {T(64,34)} {T(74,40)} L{T(76,62)} C{T(64,66)} {T(32,66)} {T(24,62)} Z" fill="{c}"/>'
           f'<path d="M{T(24,42)} L{T(10,40)} L{T(4,52)} L{T(10,56)} L{T(24,52)} Z" fill="{c}"/>'
           + line(f"M{T(28,62)} L{T(28,82)} M{T(38,64)} L{T(38,82)} M{T(64,64)} L{T(64,82)} M{T(72,62)} L{T(72,82)} "
                  f"M{T(76,44)} Q{T(86,50)} {T(84,66)}", c, 6 * s))
    if horns:
        out += line(f"M{T(14,40)} Q{T(10,30)} {T(4,30)} M{T(18,40)} Q{T(20,30)} {T(26,28)}", c, 4 * s)
    return out


def p_cow(c):
    return p_bovine(c, x0=4, s=0.92)


def p_bullock_cart(c):
    return (p_bovine(c, x0=-2, s=0.55)
            + line("M40 36 L56 36", c, 4)
            + f'<rect x="54" y="26" width="42" height="22" rx="2" fill="{c}"/>'
            + f'<circle cx="75" cy="62" r="15" fill="none" stroke="{c}" stroke-width="5"/>'
            + line("M75 47 V77 M60 62 H90", c, 3))


def p_handcart(c):
    return (f'<rect x="14" y="34" width="56" height="24" rx="2" fill="{c}"/>'
            + f'<circle cx="34" cy="72" r="13" fill="none" stroke="{c}" stroke-width="5"/>'
            + line("M34 59 V85 M21 72 H47", c, 3)
            + line("M70 40 L94 26 M62 58 L62 80", c, 6))


def p_engine(c):
    return (f'<rect x="12" y="40" width="50" height="26" rx="4" fill="{c}"/>'
            f'<rect x="60" y="24" width="28" height="42" fill="{c}"/>'
            f'<rect x="56" y="18" width="36" height="7" fill="{c}"/>'
            f'<rect x="20" y="24" width="11" height="17" fill="{c}"/>'
            f'<path d="M12 60 L2 74 H14 Z" fill="{c}"/>'
            f'<rect x="66" y="30" width="16" height="12" fill="{WHITE}"/>'
            f'<circle cx="26" cy="74" r="9" fill="{c}" stroke="{WHITE}" stroke-width="3"/>'
            f'<circle cx="48" cy="74" r="9" fill="{c}" stroke="{WHITE}" stroke-width="3"/>'
            f'<circle cx="74" cy="72" r="12" fill="{c}" stroke="{WHITE}" stroke-width="3"/>')


def p_gate(c):
    return (f'<rect x="10" y="20" width="9" height="68" fill="{c}"/>'
            f'<rect x="81" y="20" width="9" height="68" fill="{c}"/>'
            f'<rect x="45" y="20" width="9" height="68" fill="{c}"/>'
            f'<rect x="6" y="32" width="88" height="8" fill="{c}"/>'
            f'<rect x="6" y="58" width="88" height="8" fill="{c}"/>'
            + line("M19 62 L45 36 M54 62 L81 36", c, 5))


def p_skid(c):
    return (f'<path d="M22 40 L32 24 H66 L78 40 H86 V56 H14 V40 Z" fill="{c}"/>'
            f'<path d="M36 28 H50 V39 H29 Z M54 28 H64 L72 39 H54 Z" fill="{WHITE}"/>'
            f'<circle cx="30" cy="57" r="8" fill="{c}" stroke="{WHITE}" stroke-width="3"/>'
            f'<circle cx="70" cy="57" r="8" fill="{c}" stroke="{WHITE}" stroke-width="3"/>'
            + line("M30 68 C18 76 42 82 30 92 M70 68 C58 76 82 82 70 92", c, 5))


def p_rocks(c):
    return (f'<path d="M4 6 L40 6 L40 18 L28 40 L22 70 L4 96 Z" fill="{c}"/>'
            f'<path d="M48 28 L60 24 L64 36 L52 40 Z" fill="{c}"/>'
            f'<path d="M58 54 L72 50 L76 64 L62 68 Z" fill="{c}"/>'
            f'<path d="M44 74 L56 72 L58 84 L46 86 Z" fill="{c}"/>'
            f'<path d="M72 82 L88 80 L90 94 L74 96 Z" fill="{c}"/>')


def p_narrow_road(c):
    return line("M26 96 V62 L40 42 V4 M74 96 V62 L60 42 V4", c, 9)


def p_narrow_bridge(c):
    return (line("M38 22 V78 M62 22 V78", c, 9)
            + line("M38 22 L24 6 M38 78 L24 94 M62 22 L76 6 M62 78 L76 94", c, 7))


def p_hump(c):
    return f'<path d="M2 82 H26 Q50 26 74 82 H98 V94 H2 Z" fill="{c}"/>'


def p_dip(c):
    return f'<path d="M2 40 H26 Q50 104 74 40 H98 V52 H80 Q50 120 20 52 H2 Z" fill="{c}"/>'


def p_hairpin_left(c):
    return line("M68 98 V46 A18 18 0 0 0 32 46 V68", c, 10) + head((32, 88), 90, 18, c)


def p_crossroads(c):
    return f'<path d="M44 4 H56 V44 H96 V56 H56 V96 H44 V56 H4 V44 H44 Z" fill="{c}"/>'


def p_roundabout(c):
    out = ""
    r, cx, cy = 30, 50, 52
    for k in range(3):
        a0 = k * 120 - 90 + 18
        a1 = a0 + 78
        x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
        x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
        out += line(f"M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}", c, 8)
        tx, ty = cx + r * math.cos(math.radians(a1 + 14)), cy + r * math.sin(math.radians(a1 + 14))
        out += head((tx, ty), a1 + 14 + 90, 17, c)
    return out


def p_side_road_left(c):
    return f'<path d="M50 4 H62 V96 H50 V56 H16 V44 H50 Z" fill="{c}"/>'


def p_major_road(c):
    return (f'<rect x="4" y="18" width="92" height="22" fill="{c}"/>'
            f'<rect x="46" y="40" width="8" height="56" fill="{c}"/>')


def p_ascent(c):
    return f'<path d="M4 92 L96 34 V92 Z" fill="{c}"/>' + text("10%", c, 24, 30, 34)


def p_bed(c):
    return (text("H", c, 40, 40, 50)
            + f'<rect x="12" y="62" width="76" height="10" fill="{c}"/>'
            + f'<rect x="12" y="50" width="8" height="34" fill="{c}"/>'
            + f'<rect x="80" y="62" width="8" height="22" fill="{c}"/>'
            + f'<rect x="24" y="54" width="16" height="8" rx="3" fill="{c}"/>')


def p_fuel(c):
    return (f'<rect x="20" y="16" width="40" height="72" rx="4" fill="{c}"/>'
            f'<rect x="27" y="24" width="26" height="18" fill="{WHITE}"/>'
            f'<rect x="14" y="84" width="52" height="8" fill="{c}"/>'
            + line("M60 30 H72 Q80 30 80 40 V70 Q80 76 74 76", c, 5)
            + f'<path d="M78 24 L88 32 L82 38 Z" fill="{c}"/>')


def p_cup(c):
    return (f'<path d="M22 34 H72 L66 72 Q64 78 58 78 H36 Q30 78 28 72 Z" fill="{c}"/>'
            + line("M70 42 Q86 42 84 54 Q82 64 68 62", c, 6)
            + f'<ellipse cx="48" cy="84" rx="38" ry="7" fill="{c}"/>'
            + line("M38 12 Q32 20 38 26 M52 10 Q46 18 52 26", c, 4))


def p_cutlery(c):
    return (line("M30 10 V36 M38 10 V36 M46 10 V36", c, 4)
            + f'<path d="M27 34 H49 Q49 46 41 48 V92 H35 V48 Q27 46 27 34 Z" fill="{c}"/>'
            + f'<path d="M64 10 Q78 22 76 52 H70 V92 H64 Z" fill="{c}"/>')


def p_phone(c):
    return (f'<path d="M22 22 Q30 14 38 20 L46 34 Q48 40 42 44 L38 47 Q44 60 54 68 L58 64 Q63 59 69 62 L82 70 '
            f'Q88 76 80 84 L74 90 Q64 96 50 88 Q22 70 12 44 Q8 32 22 22 Z" fill="{c}"/>')


# ---------- frames ----------

def svg(body, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="{label}">'
            f'{body}</svg>\n')


def place(pict, x, y, s):
    return f'<g transform="translate({x} {y}) scale({s})">{pict}</g>'


def red_circle(pict, bar=False, s=1.0):
    off = 100 - 50 * s
    out = f'<circle cx="100" cy="100" r="88" fill="{WHITE}" stroke="{RED}" stroke-width="20"/>'
    out += place(pict, off, off, s)
    if bar:
        out += f'<line x1="42" y1="42" x2="158" y2="158" stroke="{RED}" stroke-width="16"/>'
    return out


def blue_circle(pict, s=1.0):
    off = 100 - 50 * s
    return (f'<circle cx="100" cy="100" r="94" fill="{BLUE}" stroke="{WHITE}" stroke-width="4"/>'
            + place(pict, off, off, s))


def triangle(pict, s=0.74, cy=122):
    return (f'<path d="M100 16 L188 170 H12 Z" fill="{WHITE}" stroke="{RED}" stroke-width="18" stroke-linejoin="round"/>'
            + place(pict, 100 - 50 * s, cy - 50 * s, s))


def info(pict, inset=True):
    out = f'<rect x="24" y="8" width="152" height="184" rx="10" fill="{BLUE}" stroke="{WHITE}" stroke-width="4"/>'
    if inset:
        out += f'<rect x="42" y="26" width="116" height="116" rx="4" fill="{WHITE}"/>' + place(pict, 50, 34, 1.0)
    else:
        out += pict
    return out


def arrow_turn(c, right, y=38):
    # stem up from the bottom, then a curve into a horizontal arrow at height y
    if right:
        return line(f"M38 94 V{y+20} Q38 {y} 58 {y} H70", c, 11) + head((90, y), 0, 22, c)
    return line(f"M62 94 V{y+20} Q62 {y} 42 {y} H30", c, 11) + head((10, y), 180, 22, c)


SIGNS = {
    # mandatory
    "stop": ('<path d="M64 12 H136 L188 64 V136 L136 188 H64 L12 136 V64 Z" fill="' + RED + '" stroke="' + WHITE + '" stroke-width="6"/>'
             + text("STOP", WHITE, 50, 118, 100), "Red octagon with the white word STOP."),
    "give-way": ('<path d="M14 26 H186 L100 178 Z" fill="' + WHITE + '" stroke="' + RED + '" stroke-width="20" stroke-linejoin="round"/>',
                 "White triangle pointing down with a red border."),
    "no-entry": (f'<circle cx="100" cy="100" r="92" fill="{RED}" stroke="{WHITE}" stroke-width="4"/>'
                 f'<rect x="34" y="86" width="132" height="28" fill="{WHITE}"/>', "Red disc with a white horizontal bar."),
    "horn-prohibited": (red_circle(p_horn(BLACK), bar=True, s=0.9), "White circle with a red border and a black horn, crossed by a red diagonal bar."),
    "compulsory-sound-horn": (blue_circle(p_horn(WHITE), s=0.95), "Blue circle with a white horn."),
    "overtaking-prohibited": (red_circle(line("M40 72 V46", BLACK, 9) + head((40, 30), -90, 18)
                                         + line("M40 98 C40 84 66 80 66 62 V30", BLACK, 9) + head((66, 12), -90, 18), bar=True),
                              "White circle with a red border: a short black arrow pointing up, and a second arrow starting behind it that swerves right and goes up past it, crossed by a red diagonal bar."),
    "speed-limit-50": (red_circle(text("50", BLACK, 64, 72)), "White circle with a red border and the black number 50."),
    "compulsory-turn-left": (blue_circle(arrow_turn(WHITE, right=False)), "Blue circle with a white arrow going up and bending to point left."),
    "compulsory-turn-right": (blue_circle(arrow_turn(WHITE, right=True)), "Blue circle with a white arrow going up and curving to point right."),
    "right-turn-prohibited": (red_circle(arrow_turn(BLACK, right=True, y=56), bar=True, s=0.9), "White circle with a red border and a black arrow going up and bending right, crossed by a red diagonal bar."),
    "left-turn-prohibited": (red_circle(arrow_turn(BLACK, right=False, y=56), bar=True, s=0.9), "White circle with a red border and a black arrow going up and bending left, crossed by a red diagonal bar."),
    "u-turn-prohibited": (red_circle(line("M64 92 V46 A15 15 0 0 0 34 46 V62", BLACK, 10) + head((34, 82), 90, 20), bar=True, s=0.9),
                          "White circle with a red border and a black arrow that goes up and turns back down, crossed by a red diagonal bar."),
    "vehicles-prohibited": (red_circle(""), "Plain white circle with a red border and nothing inside."),
    "load-limit-5t": (red_circle(text("5t", BLACK, 60, 70)), "White circle with a red border and the black text 5t."),
    "width-limit": (red_circle(head((30, 40), 0, 22) + head((70, 40), 180, 22) + text("2 m", BLACK, 28, 82)),
                    "White circle with a red border: two black arrowheads pointing at each other from left and right, above the text 2 m."),
    "height-limit": (red_circle(head((50, 30), 90, 20) + head((50, 72), -90, 20) + text("3.5 m", BLACK, 24, 60)),
                     "White circle with a red border: two black arrowheads, one pointing down from the top and one pointing up from the bottom, with the figure 3.5 m between them."),
    "cycles-prohibited": (red_circle(p_bicycle(BLACK), s=0.85), "White circle with a red border and a black bicycle."),
    "compulsory-cycle-track": (blue_circle(p_bicycle(WHITE), s=0.9), "Blue circle with a white bicycle."),
    "pedestrians-prohibited": (red_circle(p_walker(BLACK), s=0.9), "White circle with a red border and a black person walking."),
    "no-parking": (red_circle(text("P", BLACK, 80, 78), bar=True), "White circle with a red border and a black letter P, crossed by a red diagonal bar."),
    "no-stopping": (f'<circle cx="100" cy="100" r="88" fill="{BLUE}" stroke="{RED}" stroke-width="20"/>'
                    f'<path d="M42 42 L158 158 M158 42 L42 158" stroke="{RED}" stroke-width="16"/>',
                    "Blue circle with a red border and a red X across it."),
    "compulsory-ahead": (blue_circle(line("M50 94 V36", WHITE, 12) + head((50, 10), -90, 26, WHITE)), "Blue circle with a white arrow pointing straight up."),
    "keep-left": (blue_circle(line("M76 24 L36 64", WHITE, 12) + head((22, 78), 135, 26, WHITE)), "Blue circle with a white arrow pointing diagonally down to the left."),
    "trucks-prohibited": (red_circle(p_truck(BLACK), s=0.82), "White circle with a red border and a black truck."),
    "bullock-carts-prohibited": (red_circle(p_bullock_cart(BLACK), s=1.0), "White circle with a red border and a black bullock pulling a cart."),
    "handcarts-prohibited": (red_circle(p_handcart(BLACK), s=0.95), "White circle with a red border and a black handcart with one wheel and a long handle."),
    "restriction-ends": (f'<circle cx="100" cy="100" r="92" fill="{WHITE}" stroke="{BLACK}" stroke-width="4"/>'
                         f'<line x1="150" y1="40" x2="50" y2="160" stroke="{BLACK}" stroke-width="22"/>',
                         "White circle with a thin black rim and a black diagonal band, no red border."),
    # cautionary
    "unguarded-level-crossing": (triangle(p_engine(BLACK), s=0.68, cy=126), "Red-bordered triangle pointing up with a black steam engine."),
    "guarded-level-crossing": (triangle(p_gate(BLACK), s=0.68, cy=126), "Red-bordered triangle pointing up with a black gate or fence."),
    "school-ahead": (triangle(p_children(BLACK)), "Red-bordered triangle pointing up with two black children walking."),
    "pedestrian-crossing": (triangle(p_walker(BLACK, s=0.9) + '<path d="M6 90 H94 V98 H6 Z M14 80 H86 V86 H14 Z" fill="' + BLACK + '"/>', s=0.86, cy=118),
                            "Red-bordered triangle pointing up with a black person walking over painted stripes."),
    "men-at-work": (triangle(p_digger(BLACK)), "Red-bordered triangle pointing up with a black person digging with a shovel beside a mound."),
    "slippery-road": (triangle(p_skid(BLACK)), "Red-bordered triangle pointing up with a black car and two wavy tracks below it."),
    "cattle": (triangle(p_cow(BLACK), s=0.8, cy=118), "Red-bordered triangle pointing up with a black cow."),
    "falling-rocks": (triangle(p_rocks(BLACK), s=0.64, cy=126), "Red-bordered triangle pointing up with a black cliff on the left and rocks falling to the right."),
    "narrow-road": (triangle(p_narrow_road(BLACK)), "Red-bordered triangle pointing up with two black road edges that come closer together."),
    "narrow-bridge": (triangle(p_narrow_bridge(BLACK)), "Red-bordered triangle pointing up with two close black lines whose ends flare outwards."),
    "hump": (triangle(p_hump(BLACK), s=0.8, cy=116), "Red-bordered triangle pointing up with a black road line rising into a bump."),
    "dip": (triangle(p_dip(BLACK), s=0.8, cy=116), "Red-bordered triangle pointing up with a black road line dipping down and up again."),
    "left-hairpin-bend": (triangle(p_hairpin_left(BLACK)), "Red-bordered triangle pointing up with a black arrow going up and bending sharply back down on the left."),
    "crossroads": (triangle(p_crossroads(BLACK)), "Red-bordered triangle pointing up with a black cross."),
    "roundabout": (triangle(p_roundabout(BLACK)), "Red-bordered triangle pointing up with three black arrows following each other round a circle."),
    "side-road-left": (triangle(p_side_road_left(BLACK)), "Red-bordered triangle pointing up with a thick black vertical line and a short branch joining from the left."),
    "major-road-ahead": (triangle(p_major_road(BLACK)), "Red-bordered triangle pointing up with a thin black road meeting a thick black road across the top."),
    "steep-ascent": (triangle(p_ascent(BLACK), s=0.78, cy=120), "Red-bordered triangle pointing up with a black slope rising to the right and the text 10%."),
    "cycle-crossing": (triangle(p_bicycle(BLACK), s=0.7, cy=128), "Red-bordered triangle pointing up with a black bicycle."),
    # informatory
    "hospital": (info(p_bed(BLACK)), "Blue rectangle with a white square showing a black letter H above a bed."),
    "petrol-pump": (info(p_fuel(BLACK)), "Blue rectangle with a white square showing a black fuel pump and hose."),
    "light-refreshment": (info(p_cup(BLACK)), "Blue rectangle with a white square showing a black cup and saucer."),
    "parking": (info(text("P", WHITE, 130, 146, 100), inset=False), "Blue rectangle with a large white letter P."),
    "no-through-road": (info(f'<rect x="88" y="66" width="24" height="104" fill="{WHITE}"/><rect x="48" y="40" width="104" height="28" fill="{RED}"/>', inset=False),
                        "Blue rectangle with a white T shape whose top bar is red."),
    "eating-place": (info(p_cutlery(BLACK)), "Blue rectangle with a white square showing a black fork and knife."),
    "public-telephone": (info(p_phone(BLACK)), "Blue rectangle with a white square showing a black telephone handset."),
}


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, (body, desc) in SIGNS.items():
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg(body, desc.rstrip(".")))
    print(len(SIGNS), "signs ->", OUT)
    if "--ts" in sys.argv:
        for name, (_, desc) in SIGNS.items():
            print(f'  "in/{name}": {desc!r},'.replace("'", '"'))
