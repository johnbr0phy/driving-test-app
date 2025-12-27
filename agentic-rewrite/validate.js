#!/usr/bin/env node
/**
 * Question Bank Validator
 * Runs all validation checks on generated question files
 * Handles multiple field name formats (options/answers, optionA-D, etc.)
 */

const fs = require('fs');
const path = require('path');

const STATES_DIR = path.join(__dirname, 'states');
const UNIVERSAL_FILE = path.join(__dirname, 'universal', 'universal.json');

// Validation results
const results = {
  distribution: [],
  memorization: [],
  format: [],
  answerLength: [],
  summary: { pass: 0, fail: 0 }
};

// Patterns to flag for memorization
const MEMORIZATION_PATTERNS = [
  { name: 'Dollar amounts', regex: /\$\d+[\d,]*/, severity: 'HIGH' },
  { name: 'Insurance X/Y/Z format', regex: /\d+\/\d+\/\d+/, severity: 'HIGH' },
  { name: 'Specific points', regex: /\b\d+\s*points?\b/i, severity: 'MEDIUM' },
];

// Allowed patterns (exceptions)
const ALLOWED_PATTERNS = [
  /\b(15|16|17|18|21)\s*(years?\s*old|year-old)/i, // Age thresholds
  /0\.(0[248]|08)%?/,  // BAC limits
  /\d+\s*(months?|hours?|days?)\b/i, // Time periods in context
];

// Normalize a question to standard format
function normalizeQuestion(q) {
  // Get answers array from various formats
  let answers = q.answers || q.options || [];
  if (answers.length === 0 && q.optionA) {
    answers = [q.optionA, q.optionB, q.optionC, q.optionD];
  }

  // Get correct index - could be correctIndex or derived from correctAnswer
  let correctIndex = q.correctIndex;
  if (correctIndex === undefined && q.correctAnswer) {
    const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    correctIndex = map[q.correctAnswer.toUpperCase()];
  }

  return {
    id: q.id || q.questionId,
    question: q.question,
    answers: answers,
    correctIndex: correctIndex,
    category: q.category,
    state: q.state,
    explanation: q.explanation || q.rationale
  };
}

function validateDistribution(questions, filename) {
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const labels = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

  questions.forEach(q => {
    const normalized = normalizeQuestion(q);
    if (normalized.correctIndex >= 0 && normalized.correctIndex <= 3) {
      counts[normalized.correctIndex]++;
    }
  });

  const total = questions.length;
  const distribution = {};
  const issues = [];

  for (let i = 0; i <= 3; i++) {
    const pct = (counts[i] / total * 100).toFixed(1);
    distribution[labels[i]] = { count: counts[i], percentage: parseFloat(pct) };

    if (parseFloat(pct) < 20) {
      issues.push(`${labels[i]} under-represented: ${counts[i]} (${pct}%)`);
    }
    if (parseFloat(pct) > 30) {
      issues.push(`${labels[i]} over-represented: ${counts[i]} (${pct}%)`);
    }
  }

  return {
    file: filename,
    status: issues.length === 0 ? 'PASS' : 'FAIL',
    total_questions: total,
    distribution,
    issues
  };
}

function isAllowedException(text) {
  return ALLOWED_PATTERNS.some(pattern => pattern.test(text));
}

function validateMemorization(questions, filename) {
  const issues = [];

  questions.forEach(q => {
    const normalized = normalizeQuestion(q);
    const textsToCheck = [
      normalized.question || '',
      ...(normalized.answers || []),
      normalized.explanation || ''
    ].join(' ');

    MEMORIZATION_PATTERNS.forEach(pattern => {
      const match = textsToCheck.match(pattern.regex);
      if (match && !isAllowedException(textsToCheck)) {
        issues.push({
          questionId: normalized.id,
          problem: pattern.name,
          severity: pattern.severity,
          flagged_content: match[0]
        });
      }
    });
  });

  return {
    file: filename,
    status: issues.length === 0 ? 'PASS' : 'FAIL',
    issues
  };
}

function validateAnswerLength(questions, filename) {
  const issues = [];
  const LONGER_THRESHOLD = 1.2; // 20% longer than average of wrong answers

  questions.forEach(q => {
    const normalized = normalizeQuestion(q);
    if (!normalized.answers || normalized.answers.length !== 4 || normalized.correctIndex === undefined) {
      return; // Skip malformed questions
    }

    const correctLen = normalized.answers[normalized.correctIndex].length;
    const wrongLens = normalized.answers
      .filter((_, i) => i !== normalized.correctIndex)
      .map(a => a.length);
    const avgWrongLen = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;

    // Check if correct answer is >20% longer than average wrong answer
    if (avgWrongLen > 0 && correctLen > avgWrongLen * LONGER_THRESHOLD) {
      const pctLonger = ((correctLen / avgWrongLen - 1) * 100).toFixed(0);
      issues.push({
        questionId: normalized.id,
        problem: `Correct answer ${pctLonger}% longer than wrong answers`,
        correctLen,
        avgWrongLen: Math.round(avgWrongLen),
        correct: normalized.answers[normalized.correctIndex].substring(0, 40) + (normalized.answers[normalized.correctIndex].length > 40 ? '...' : '')
      });
    }
  });

  return {
    file: filename,
    status: issues.length === 0 ? 'PASS' : 'FAIL',
    issues
  };
}

function validateFormat(questions, filename, expectedCount) {
  const checks = {
    valid_json: true,
    required_fields: true,
    questions_end_with_question_mark: true,
    sequential_ids: true,
    correct_count: questions.length === expectedCount,
    has_four_answers: true
  };
  const issues = [];

  // Extract state code from filename
  const stateCode = path.basename(filename, '.json');
  const isUniversal = stateCode === 'universal';
  const prefix = isUniversal ? 'U' : stateCode;

  questions.forEach((q, index) => {
    const normalized = normalizeQuestion(q);
    const expectedId = `${prefix}-${String(index + 1).padStart(3, '0')}`;

    // Check required fields
    if (!normalized.id || !normalized.question || !normalized.answers || normalized.correctIndex === undefined) {
      checks.required_fields = false;
      issues.push({ questionId: normalized.id || `index-${index}`, problem: 'Missing required fields' });
    }

    // Check question ends with ?
    if (normalized.question && !normalized.question.trim().endsWith('?')) {
      checks.questions_end_with_question_mark = false;
      issues.push({ questionId: normalized.id, problem: 'Question does not end with ?' });
    }

    // Check has 4 answers
    if (!normalized.answers || normalized.answers.length !== 4) {
      checks.has_four_answers = false;
      issues.push({ questionId: normalized.id, problem: `Has ${normalized.answers?.length || 0} answers instead of 4` });
    }

    // Check sequential IDs
    if (normalized.id !== expectedId) {
      checks.sequential_ids = false;
      issues.push({ questionId: normalized.id, problem: `Expected ID ${expectedId}` });
    }
  });

  if (!checks.correct_count) {
    issues.push({ problem: `Expected ${expectedCount} questions, got ${questions.length}` });
  }

  const allPass = Object.values(checks).every(v => v);

  return {
    file: filename,
    status: allPass ? 'PASS' : 'FAIL',
    checks,
    issues
  };
}

function validateFile(filepath, expectedCount) {
  const filename = path.relative(__dirname, filepath);

  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const questions = JSON.parse(content);

    const distResult = validateDistribution(questions, filename);
    const memResult = validateMemorization(questions, filename);
    const formatResult = validateFormat(questions, filename, expectedCount);
    const lengthResult = validateAnswerLength(questions, filename);

    results.distribution.push(distResult);
    results.memorization.push(memResult);
    results.format.push(formatResult);
    results.answerLength.push(lengthResult);

    const allPass = distResult.status === 'PASS' &&
                    memResult.status === 'PASS' &&
                    formatResult.status === 'PASS' &&
                    lengthResult.status === 'PASS';

    if (allPass) {
      results.summary.pass++;
    } else {
      results.summary.fail++;
    }

    return allPass;
  } catch (err) {
    console.error(`Error processing ${filename}: ${err.message}`);
    results.format.push({
      file: filename,
      status: 'FAIL',
      issues: [{ problem: `Parse error: ${err.message}` }]
    });
    results.summary.fail++;
    return false;
  }
}

function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(60));

  // Distribution issues
  const distFails = results.distribution.filter(r => r.status === 'FAIL');
  if (distFails.length > 0) {
    console.log('\n❌ DISTRIBUTION ISSUES:');
    distFails.forEach(r => {
      console.log(`  ${r.file}:`);
      r.issues.forEach(i => console.log(`    - ${i}`));
    });
  } else {
    console.log('\n✅ Distribution: All files pass (25% each for A/B/C/D)');
  }

  // Memorization issues
  const memFails = results.memorization.filter(r => r.status === 'FAIL');
  if (memFails.length > 0) {
    console.log('\n❌ MEMORIZATION ISSUES:');
    memFails.forEach(r => {
      console.log(`  ${r.file}: ${r.issues.length} issue(s)`);
      r.issues.slice(0, 5).forEach(i => {
        console.log(`    - [${i.severity}] ${i.questionId}: ${i.problem} ("${i.flagged_content}")`);
      });
      if (r.issues.length > 5) {
        console.log(`    ... and ${r.issues.length - 5} more`);
      }
    });
  } else {
    console.log('\n✅ Memorization: No dollar amounts, X/Y/Z formats, or point values found');
  }

  // Format issues
  const formatFails = results.format.filter(r => r.status === 'FAIL');
  if (formatFails.length > 0) {
    console.log('\n❌ FORMAT ISSUES:');
    formatFails.forEach(r => {
      console.log(`  ${r.file}:`);
      r.issues.slice(0, 5).forEach(i => {
        console.log(`    - ${i.questionId ? i.questionId + ': ' : ''}${i.problem}`);
      });
      if (r.issues.length > 5) {
        console.log(`    ... and ${r.issues.length - 5} more`);
      }
    });
  } else {
    console.log('\n✅ Format: All files have correct structure');
  }

  // Answer length issues
  const lengthFails = results.answerLength.filter(r => r.status === 'FAIL');
  if (lengthFails.length > 0) {
    console.log('\n❌ ANSWER LENGTH ISSUES (correct answer too long):');
    lengthFails.forEach(r => {
      console.log(`  ${r.file}: ${r.issues.length} issue(s)`);
      r.issues.slice(0, 5).forEach(i => {
        console.log(`    - ${i.questionId}: ${i.problem} (${i.correctLen} vs avg ${i.avgWrongLen})`);
      });
      if (r.issues.length > 5) {
        console.log(`    ... and ${r.issues.length - 5} more`);
      }
    });
  } else {
    console.log('\n✅ Answer Length: Correct answers not systematically longer');
  }

  // Summary
  console.log('\n' + '-'.repeat(60));
  console.log(`SUMMARY: ${results.summary.pass} files passed, ${results.summary.fail} files failed`);
  console.log('-'.repeat(60) + '\n');
}

// Main
console.log('Running validators...\n');

// Validate universal questions
if (fs.existsSync(UNIVERSAL_FILE)) {
  validateFile(UNIVERSAL_FILE, 160);
}

// Validate state files
if (fs.existsSync(STATES_DIR)) {
  const stateFiles = fs.readdirSync(STATES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  stateFiles.forEach(file => {
    validateFile(path.join(STATES_DIR, file), 40);
  });
}

printResults();

// Output detailed JSON results
const outputPath = path.join(__dirname, 'validation-results.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`Detailed results saved to: ${outputPath}`);
