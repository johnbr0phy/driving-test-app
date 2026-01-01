#!/usr/bin/env python3
"""Initialize a question generation session"""

import json
import sys
import os
import csv

def main():
    args = sys.argv[1] if len(sys.argv) > 1 else 'universal'

    # Parse scope
    if args.lower() == 'universal':
        scope = 'universal'
        target = 160
        states = []
    else:
        scope = 'state'
        states = [s.strip().upper() for s in args.split(',')]
        target = 40 * len(states)

    # Create data directory
    os.makedirs('data', exist_ok=True)

    # Initialize session state
    state = {
        'scope': scope,
        'states': states,
        'target': target,
        'generated': 0,
        'failed_attempts': 0,
        'current_state_index': 0
    }

    with open('data/session_state.json', 'w') as f:
        json.dump(state, f, indent=2)

    # Initialize concept tracker
    with open('data/concept_tracker.json', 'w') as f:
        json.dump({}, f)

    # Initialize CSV if doesn't exist
    if not os.path.exists('data/master_questions.csv'):
        with open('data/master_questions.csv', 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Type', 'State', 'QuestionID', 'Category', 'Question',
                'OptionA', 'OptionB', 'OptionC', 'OptionD',
                'CorrectAnswer', 'CorrectIndex', 'Explanation'
            ])

    print(f"Session initialized")
    print(f"   Scope: {scope}")
    print(f"   Target: {target} questions")
    if states:
        print(f"   States: {', '.join(states)}")
    print(f"\nRun the Ralph loop to begin generating.")


if __name__ == '__main__':
    main()
