# Data interpretation tables for the UGC-NET Paper 1 bank (Unit VII), shared by
# stimuli.py (which renders them) and ugcnetData.py (which computes every key
# from them). All figures are invented for practice.
TABLES = {
    # Practice Test 1: research scholars admitted, five departments, four years.
    "T1": {
        "title": "Data interpretation: research scholars admitted",
        "intro": "The table shows the number of research scholars admitted by five departments of a university from 2022 to 2025.",
        "cols": ["2022", "2023", "2024", "2025"],
        "rows": {
            "Botany": [24, 30, 27, 36],
            "Chemistry": [42, 38, 45, 51],
            "Economics": [18, 22, 26, 21],
            "History": [15, 12, 19, 23],
            "Physics": [33, 36, 39, 42],
        },
        "label": "Department",
    },
    # Practice Test 2: survey respondents by preferred mode of learning and age.
    "T2": {
        "title": "Data interpretation: preferred mode of learning",
        "intro": "A survey asked 2,500 adult learners which mode of learning they prefer. The table shows the number choosing each mode, by age group.",
        "cols": ["18 to 25", "26 to 35", "36 to 50"],
        "rows": {
            "Classroom": [240, 180, 210],
            "Online live": [310, 260, 120],
            "Recorded video": [280, 230, 90],
            "Blended": [170, 230, 180],
        },
        "label": "Mode",
    },
    # Drill: journal articles by faculty of four schools, five years.
    "D1": {
        "title": "Data interpretation: journal articles published",
        "intro": "The table shows the number of journal articles published by the faculty of four schools of a university from 2021 to 2025.",
        "cols": ["2021", "2022", "2023", "2024", "2025"],
        "rows": {
            "Arts": [14, 17, 21, 19, 26],
            "Commerce": [9, 11, 8, 13, 16],
            "Science": [37, 41, 44, 52, 49],
            "Law": [6, 7, 10, 9, 14],
        },
        "label": "School",
    },
    # Drill: students of a college by stream and gender.
    "D2": {
        "title": "Data interpretation: students by stream",
        "intro": "The table shows the 2,000 students of a college by stream and gender.",
        "cols": ["Women", "Men"],
        "rows": {
            "Arts": [380, 220],
            "Commerce": [250, 310],
            "Science": [290, 340],
            "Vocational": [90, 120],
        },
        "label": "Stream",
    },
}


def render(t):
    head = "| " + t["label"] + " | " + " | ".join(t["cols"]) + " |"
    sep = "|---|" + "---|" * len(t["cols"])
    body = ["| " + name + " | " + " | ".join(str(v) for v in vals) + " |" for name, vals in t["rows"].items()]
    return t["intro"] + "\n\n" + "\n".join([head, sep, *body])
