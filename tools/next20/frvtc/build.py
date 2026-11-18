"""Rebuild the original French VTC bank and per-item primary-source map."""
import importlib.util
import json
from pathlib import Path
import argparse

HERE = Path(__file__).resolve().parent
CATEGORIES = [
    ('t3p', 'T3P', 'frvtcT3p', 36),
    ('gestion', 'GES', 'frvtcGestion', 24),
    ('securite', 'SEC', 'frvtcSecurite', 36),
    ('francais', 'FRA', 'frvtcFrancais', 24),
    ('anglais', 'ANG', 'frvtcAnglais', 12),
    ('commercial', 'COM', 'frvtcCommercial', 36),
    ('reglementation', 'REG', 'frvtcReglementation', 32),
]

def build(category=None):
    bank, mapping = [], []
    for module, segment, key, count in CATEGORIES:
        if category and module != category:
            continue
        path = HERE / f'{module}.py'
        if not path.exists():
            raise SystemExit(f'Missing category: {path}')
        spec = importlib.util.spec_from_file_location(module, path)
        data = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(data)
        assert len(data.ROWS) == count, (module, len(data.ROWS), count)
        for i, (stem, options, correct, explanation, objective, *sources) in enumerate(data.ROWS, 1):
            qid = f'FRVTC-{segment}-{i:03d}'
            bank.append(dict(type='FRVTC', state='ALL', questionId=qid, category=key,
                             question=stem, **dict(zip(('optionA','optionB','optionC','optionD'), options)),
                             correctAnswer='ABCD'[correct], correctIndex=correct, explanation=explanation))
            mapping.append(dict(questionId=qid, objective=objective, sources=sources or (['SYLLABUS-D', 'LANGUAGE-ORIGINAL'] if segment == 'FRA' else ['SYLLABUS-E', 'CEFR-A2', 'BRITISH-COUNCIL', 'LANGUAGE-ORIGINAL'])))
    return bank, mapping

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--category', choices=[c[0] for c in CATEGORIES])
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--source-map', type=Path, help='Map output; defaults beside the question output')
    args = parser.parse_args()
    bank, mapping = build(args.category)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(bank, ensure_ascii=False, indent=2)+'\n')
    map_path = args.source_map or args.output.with_suffix('.sources.json')
    map_path.parent.mkdir(parents=True, exist_ok=True)
    map_path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2)+'\n')
    print(f'Wrote {len(bank)} original questions to {args.output}')
