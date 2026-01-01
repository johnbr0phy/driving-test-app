#!/usr/bin/env python3
"""
Stop hook for question generation Ralph loop.
Validates each question and provides targeted feedback.

Exit code 2 = Block stop, continue loop (with feedback)
Exit code 0 = Allow stop, done
"""

import json
import sys
import csv
import os
import re
from collections import Counter, defaultdict
from difflib import SequenceMatcher

# Paths
STATE_PATH = 'data/session_state.json'
MASTER_PATH = 'data/master_questions.csv'
CONCEPT_PATH = 'data/concept_tracker.json'

# Constants
MAX_PER_CONCEPT = 3
SIMILARITY_THRESHOLD = 0.80
MAX_LENGTH_RATIO = 1.4

MEMORIZATION_PATTERNS = [
    (r'\$\d+', 'dollar amount'),
    (r'\d+/\d+/\d+', 'insurance X/Y/Z format'),
    (r'\d+\s*points?', 'point value'),
    (r'\d+\s*hours?\s*(in|of)?\s*jail', 'jail time'),
    (r'\d+\s*days?\s*(in|of)?\s*jail', 'jail time'),
    (r'fine\s*(of\s*)?\$', 'fine amount'),
]

CONCEPT_KEYWORDS = {
    'stop_sign': ['stop sign', 'octagon', 'red sign stop'],
    'yield': ['yield', 'right of way', 'give way'],
    'speed_limit': ['speed limit', 'speeding', 'mph', 'speed zone'],
    'school_bus': ['school bus', 'flashing red', 'bus stops'],
    'pedestrian': ['pedestrian', 'crosswalk', 'walking'],
    'dui_bac': ['bac', 'blood alcohol', 'intoxicated', 'dui', 'dwi', 'impaired'],
    'cell_phone': ['cell phone', 'texting', 'hands-free', 'mobile device'],
    'turn_signal': ['turn signal', 'signaling', 'indicator', 'blinker'],
    'following_distance': ['following distance', 'tailgating', 'seconds behind'],
    'blind_spot': ['blind spot', 'mirror', 'over shoulder', 'lane change'],
    'right_of_way': ['right of way', 'who goes first', 'yield to'],
    'traffic_lights': ['red light', 'green light', 'yellow light', 'traffic signal'],
    'parking': ['parking', 'parallel park', 'curb', 'fire hydrant'],
    'passing': ['passing', 'overtake', 'no passing zone', 'pass on'],
    'emergency_vehicle': ['emergency vehicle', 'ambulance', 'fire truck', 'siren'],
    'railroad': ['railroad', 'train crossing', 'tracks'],
    'hydroplaning': ['hydroplane', 'wet road', 'water on road'],
    'night_driving': ['night driving', 'headlights', 'high beams', 'low beams'],
    'fog': ['fog', 'visibility', 'foggy'],
    'construction_zone': ['construction', 'work zone', 'road work'],
}


def load_state():
    """Load current session state"""
    if os.path.exists(STATE_PATH):
        with open(STATE_PATH) as f:
            return json.load(f)
    return {
        'scope': 'universal',
        'target': 160,
        'generated': 0,
        'failed_attempts': 0,
        'last_failure_reason': None
    }


def save_state(state):
    """Save session state"""
    os.makedirs(os.path.dirname(STATE_PATH), exist_ok=True)
    with open(STATE_PATH, 'w') as f:
        json.dump(state, f, indent=2)


def load_master():
    """Load master question pool"""
    if os.path.exists(MASTER_PATH):
        with open(MASTER_PATH) as f:
            reader = csv.DictReader(f)
            return list(reader)
    return []


def load_concepts():
    """Load concept tracker"""
    if os.path.exists(CONCEPT_PATH):
        with open(CONCEPT_PATH) as f:
            return json.load(f)
    return defaultdict(int)


def save_concepts(concepts):
    """Save concept tracker"""
    os.makedirs(os.path.dirname(CONCEPT_PATH), exist_ok=True)
    with open(CONCEPT_PATH, 'w') as f:
        json.dump(dict(concepts), f, indent=2)


def detect_concept(question_text):
    """Detect which concept a question tests"""
    text_lower = question_text.lower()
    for concept, keywords in CONCEPT_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            return concept
    return 'general'


def check_memorization(question_text):
    """Check for memorization patterns"""
    for pattern, description in MEMORIZATION_PATTERNS:
        if re.search(pattern, question_text, re.IGNORECASE):
            return True, description
    return False, None


def check_length_bias(question):
    """Check if correct answer is significantly longer"""
    try:
        correct_idx = int(question.get('CorrectIndex', 0))
        options = [
            question.get('OptionA', ''),
            question.get('OptionB', ''),
            question.get('OptionC', ''),
            question.get('OptionD', '')
        ]

        correct_len = len(options[correct_idx])
        wrong_lens = [len(o) for i, o in enumerate(options) if i != correct_idx and o]

        if not wrong_lens:
            return False, None

        avg_wrong = sum(wrong_lens) / len(wrong_lens)

        if avg_wrong > 0 and correct_len > avg_wrong * MAX_LENGTH_RATIO:
            return True, f"correct={correct_len} chars, avg_wrong={avg_wrong:.0f} chars"
    except (ValueError, IndexError):
        pass

    return False, None


def check_duplicate(new_question, existing_questions):
    """Check for duplicate or similar questions"""
    new_text = new_question.get('Question', '').lower().strip()

    for existing in existing_questions:
        existing_text = existing.get('Question', '').lower().strip()

        # Exact match
        if new_text == existing_text:
            return True, existing.get('QuestionID', '?'), 1.0

        # Similarity check
        similarity = SequenceMatcher(None, new_text, existing_text).ratio()
        if similarity > SIMILARITY_THRESHOLD:
            return True, existing.get('QuestionID', '?'), similarity

    return False, None, 0


def check_format(question):
    """Check question format"""
    issues = []

    q_text = question.get('Question', '')
    if not q_text.strip().endswith('?'):
        issues.append("Question must end with '?'")

    # Check all fields present
    required = ['Question', 'OptionA', 'OptionB', 'OptionC', 'OptionD',
                'CorrectAnswer', 'CorrectIndex', 'Explanation']
    for field in required:
        if not question.get(field):
            issues.append(f"Missing field: {field}")

    # Check CorrectAnswer matches CorrectIndex
    try:
        idx = int(question.get('CorrectIndex', -1))
        letter = question.get('CorrectAnswer', '')
        expected_letter = 'ABCD'[idx] if 0 <= idx <= 3 else None
        if letter != expected_letter:
            issues.append(f"CorrectAnswer '{letter}' doesn't match CorrectIndex {idx}")
    except (ValueError, IndexError):
        issues.append("Invalid CorrectIndex")

    return issues


def get_position_guidance(questions):
    """Determine which position needs more questions"""
    if not questions:
        return 'A'

    positions = Counter(q.get('CorrectAnswer', 'X') for q in questions)
    total = len(questions)

    # Find most underrepresented position
    for pos in 'ABCD':
        pct = positions.get(pos, 0) / total * 100 if total > 0 else 0
        if pct < 22:  # Below target of 25%
            return pos

    # All balanced, pick least common
    return min('ABCD', key=lambda x: positions.get(x, 0))


def get_concept_guidance(concepts):
    """Suggest concepts to use or avoid"""
    saturated = [c for c, count in concepts.items() if count >= MAX_PER_CONCEPT]
    under_rep = [c for c in CONCEPT_KEYWORDS.keys() if concepts.get(c, 0) == 0]

    return saturated, under_rep[:5]  # Limit suggestions


def parse_last_question(questions):
    """Get the last question added"""
    if not questions:
        return None
    return questions[-1]


def output_block(reason):
    """Output JSON to block stop and provide feedback"""
    print(json.dumps({
        "decision": "block",
        "reason": reason
    }))
    sys.exit(2)


def output_allow():
    """Output to allow stop"""
    sys.exit(0)


def main():
    state = load_state()
    questions = load_master()
    concepts = load_concepts()

    current_count = len(questions)
    target = state.get('target', 160)
    scope = state.get('scope', 'universal')

    # Get last question for validation
    last_q = parse_last_question(questions)

    if last_q:
        # === VALIDATION CHECKS ===

        # 1. Check format
        format_issues = check_format(last_q)
        if format_issues:
            state['failed_attempts'] = state.get('failed_attempts', 0) + 1
            save_state(state)
            output_block(
                f"FORMAT ERROR in question {current_count}:\n"
                f"{chr(10).join('- ' + i for i in format_issues)}\n\n"
                f"Fix these issues and regenerate."
            )

        # 2. Check memorization
        has_memo, memo_type = check_memorization(last_q.get('Question', ''))
        if has_memo:
            state['failed_attempts'] = state.get('failed_attempts', 0) + 1
            save_state(state)
            output_block(
                f"MEMORIZATION CONTENT in question {current_count}:\n"
                f"Contains {memo_type}\n\n"
                f"Rewrite as a CONCEPTUAL question. Test understanding, not recall of specific numbers."
            )

        # 3. Check length bias
        has_bias, bias_info = check_length_bias(last_q)
        if has_bias:
            state['failed_attempts'] = state.get('failed_attempts', 0) + 1
            save_state(state)
            output_block(
                f"LENGTH BIAS in question {current_count}:\n"
                f"{bias_info}\n\n"
                f"Balance answer lengths. Either shorten the correct answer or expand the wrong answers."
            )

        # 4. Check duplicates (against ALL prior questions)
        is_dup, dup_id, similarity = check_duplicate(last_q, questions[:-1])
        if is_dup:
            state['failed_attempts'] = state.get('failed_attempts', 0) + 1
            save_state(state)
            output_block(
                f"DUPLICATE in question {current_count}:\n"
                f"{similarity:.0%} similar to {dup_id}\n\n"
                f"Generate a DIFFERENT question testing a different aspect or concept."
            )

        # 5. Check concept saturation
        concept = detect_concept(last_q.get('Question', ''))
        if concepts.get(concept, 0) >= MAX_PER_CONCEPT:
            saturated, under_rep = get_concept_guidance(concepts)
            state['failed_attempts'] = state.get('failed_attempts', 0) + 1
            save_state(state)
            output_block(
                f"CONCEPT SATURATED:\n"
                f"Already have {MAX_PER_CONCEPT} questions on '{concept}'\n\n"
                f"Pick from under-represented concepts:\n"
                f"{', '.join(under_rep) if under_rep else 'Any other concept'}"
            )

        # === QUESTION APPROVED ===
        # Update concept tracker
        concepts[concept] = concepts.get(concept, 0) + 1
        save_concepts(concepts)

        # Reset failed attempts
        state['failed_attempts'] = 0
        state['generated'] = current_count
        save_state(state)

    # === CHECK IF COMPLETE ===
    if current_count >= target:
        # Final position check
        positions = Counter(q.get('CorrectAnswer', 'X') for q in questions)
        total = len(questions)
        dist = {p: positions.get(p, 0) / total * 100 for p in 'ABCD'}

        print(f"BATCH COMPLETE: {current_count} questions generated\n")
        print(f"Position distribution: A={dist['A']:.0f}% B={dist['B']:.0f}% C={dist['C']:.0f}% D={dist['D']:.0f}%")
        print(f"\nOutput <promise>COMPLETE</promise> to finish.")
        output_allow()

    # === CONTINUE GENERATING ===
    remaining = target - current_count
    next_position = get_position_guidance(questions)
    saturated, under_rep = get_concept_guidance(concepts)

    guidance = f"[{current_count}/{target}] Question approved.\n\n"
    guidance += f"Generate question {current_count + 1}:\n"
    guidance += f"- Make correct answer: {next_position}\n"

    if under_rep:
        guidance += f"- Suggested concepts: {', '.join(under_rep)}\n"

    if saturated:
        guidance += f"- AVOID (saturated): {', '.join(saturated[:3])}\n"

    guidance += f"\n{remaining} questions remaining."

    output_block(guidance)


if __name__ == '__main__':
    main()
