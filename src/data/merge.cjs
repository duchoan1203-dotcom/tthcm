const fs = require('fs');

const ch1 = JSON.parse(fs.readFileSync('src/data/chapter1.json', 'utf8'));
const ch2 = JSON.parse(fs.readFileSync('src/data/chapter2.json', 'utf8'));
const ch3 = JSON.parse(fs.readFileSync('src/data/chapter3.json', 'utf8'));
const ch4 = JSON.parse(fs.readFileSync('src/data/chapter4.json', 'utf8'));
const ch5 = JSON.parse(fs.readFileSync('src/data/chapter5.json', 'utf8'));
const ch6 = JSON.parse(fs.readFileSync('src/data/chapter6.json', 'utf8'));

// Re-index IDs consecutively 1 to 475 so each question has a clean unique ID
let currentId = 1;
const all = [...ch1, ...ch2, ...ch3, ...ch4, ...ch5, ...ch6].map(q => {
  return {
    id: currentId++,
    chuong: q.chuong,
    cauHoi: q.cauHoi,
    dapAn: q.dapAn,
    dung: q.dung
  };
});

console.log('Total merged questions:', all.length);
fs.writeFileSync('src/data/questions.json', JSON.stringify(all, null, 2));

// Also generate a JS file with window.APP_QUESTIONS so it can be imported or directly embedded
fs.writeFileSync('src/data/questions.js', 'window.APP_QUESTIONS = ' + JSON.stringify(all) + ';');
