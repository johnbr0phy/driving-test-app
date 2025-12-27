const fs = require('fs');
const file = process.argv[2] || 'states/DE.json';
const data = JSON.parse(fs.readFileSync(file));

console.log('Analyzing:', file);
console.log('');

// Find questions with length issues
data.forEach((q, i) => {
  const answers = q.answers || q.options || [q.optionA, q.optionB, q.optionC, q.optionD];
  const ci = q.correctIndex;
  if (!answers || ci === undefined) return;

  const correctLen = answers[ci].length;
  const wrongLens = answers.filter((_, j) => j !== ci).map(a => a.length);
  const avgWrong = wrongLens.reduce((a,b) => a+b, 0) / 3;

  if (correctLen > avgWrong * 1.2) {
    const pct = ((correctLen / avgWrong - 1) * 100).toFixed(0);
    console.log('---');
    console.log(q.id + ' (' + pct + '% longer):');
    console.log('Q:', q.question);
    answers.forEach((a, j) => {
      const marker = j === ci ? '✓' : ' ';
      console.log(marker + ['A','B','C','D'][j] + ':', a, '(' + a.length + ')');
    });
  }
});
