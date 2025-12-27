const fs = require('fs');
const path = require('path');

const files = {
  'states/AR.json': ['AR-027'],
  'states/CO.json': ['CO-029', 'CO-036', 'CO-039'],
  'states/FL.json': ['FL-029', 'FL-040'],
  'states/KY.json': ['KY-040'],
  'states/MI.json': ['MI-029'],
  'states/NC.json': ['NC-025'],
  'states/NY.json': ['NY-016'],
  'states/ID.json': ['distribution']
};

Object.entries(files).forEach(([file, ids]) => {
  const data = JSON.parse(fs.readFileSync(file));
  console.log('\n=== ' + file + ' ===');

  if (ids[0] === 'distribution') {
    const counts = {0:0, 1:0, 2:0, 3:0};
    const aQuestions = [];
    data.forEach((q, i) => {
      let ci = q.correctIndex;
      if (ci === undefined && q.correctAnswer) {
        ci = {'A':0,'B':1,'C':2,'D':3}[q.correctAnswer];
      }
      counts[ci]++;
      if (ci === 0) aQuestions.push({id: q.id || q.questionId, index: i});
    });
    console.log('Counts: A=' + counts[0] + ', B=' + counts[1] + ', C=' + counts[2] + ', D=' + counts[3]);
    console.log('A questions:', aQuestions.map(q => q.id).join(', '));
  } else {
    data.forEach(q => {
      const id = q.id || q.questionId;
      if (ids.includes(id)) {
        console.log('\n' + id + ':');
        console.log('Q:', q.question);
        const answers = q.answers || q.options || [q.optionA, q.optionB, q.optionC, q.optionD];
        answers.forEach((a, i) => console.log(['A','B','C','D'][i] + ':', a));
        console.log('Correct:', q.correctIndex !== undefined ? ['A','B','C','D'][q.correctIndex] : q.correctAnswer);
      }
    });
  }
});
