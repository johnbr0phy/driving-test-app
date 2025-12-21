const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'driving_quizbank_data__drivingtestquestions_expanded_1_1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

const questions = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Handle CSV parsing with quoted fields
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);

  if (values.length >= 12) {
    const question = {
      type: values[0],
      state: values[1],
      questionId: values[2],
      category: values[3],
      question: values[4],
      optionA: values[5],
      optionB: values[6],
      optionC: values[7],
      optionD: values[8],
      correctAnswer: values[9],
      correctIndex: parseInt(values[10]),
      explanation: values[11]
    };

    questions.push(question);
  }
}

// Write to JSON file
const outputPath = path.join(__dirname, '..', 'data', 'questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));

console.log(`Processed ${questions.length} questions`);
console.log(`Output written to: ${outputPath}`);
