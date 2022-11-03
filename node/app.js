const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3001;
const app = express();

const questions = require('../mock-data/questions.json');
// const jsonParser = bodyParser.json()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({code: 200, message: 'success'});
});

app.get('/questions', (req, res) => {
  // console.log('hello')
  const randomQuestions = getRandom(questions.results, 10);
  const quizQuestions = parseQuestions(randomQuestions);
  res.json(quizQuestions);
});

app.post('/check_answer', (req, res) => {
  const answer = checkAnswer(req.body);
  console.log('this is the returned answer ', answer);
  res.json(answer);
  // res.end();
});

app.listen(PORT, () => console.log(`Server is now listening to port ${PORT}`));

function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function parseQuestions(questions) {
  const result = [];

  questions.forEach((question) => {
    result.push({
      category: question.category,
      question: question.question
    })
  });

  return result;
}

function checkAnswer(answer) {
  let q = answer.question;
  let c = answer.category;
  let a = answer.answer;

  let correctAnswer = questions.results.filter(question => {
    return (question.question === q && question.category === c)
  });

  if(a == correctAnswer[0].correct_answer) {
    return 'correct';
  } else {
    return 'incorrect';
  }
}