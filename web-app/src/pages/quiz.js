import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CustomDialogBox from './custom/CustomDialogBox';
import { create } from 'apisauce';

const api = create({ 
  baseURL: 'http://127.0.0.1:3001',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default function QuizPage(props) {
  const [ dialog, setDialog ] = useState(true);
  const [ score, setScore ] = useState(0);
  const [ quizResults, setQuizResults ] = useState([]);
  const [ questions, setQuestions ] = useState(false);
  const [ questionNo, setQuestionNo ] = useState(0);
  const [ counter, setCounter ] = useState(1);
  const [ disableBtn, setDisableBtn ] = useState(false);
  const [ quizDone, setQuizDone ] = useState(false);
  const navigate = useNavigate();

  const getQuestions = () => {
    api.get('/questions').then(
      (response) => {
        console.log('this is the response ', response);
        setQuestions(response.data);
      }
    );
  }

  const answerQuestion = (answer) => {
    setDisableBtn(true);
    
    let check = new URLSearchParams();
    check.append("question", questions[questionNo].question);
    check.append("category", questions[questionNo].category);
    check.append("answer", answer);
    
    console.log('this is check ', answer);
    api.post('/check_answer', check, {headers: {'content-type': 'application/x-www-form-urlencoded'}}).then(
      (response) => {
        setQuizResults(currentQuizResults => [
          ...currentQuizResults, 
          {
            'questionNo': questionNo,
            'question': questions[questionNo].question,
            'category': questions[questionNo].category,
            'answer': answer,
            'result': response.data
          }
        ])

        if(response.data == 'correct') {
          setScore(score + 1);
        }

        if(counter != questions.length) {
          setQuestionNo(questionNo + 1);
          setCounter(counter + 1);
          setDisableBtn(false);
        } else {
          setQuizDone(true);
        }
        // console.log('response from server ', response);
      }
    )
  }

  const viewResults = () => {
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    navigate('/results');
  }

  useEffect(() => {
    // console.log('this is the length ', questions.length)
    if(questions == false) {
      getQuestions();
    }
  }, []);

  return (
    <Box>
      <CustomDialogBox
        open={dialog}
        onClose={() => setDialog(false)}
        title={
          <Grid container>
            <Grid item xs={10}>
              <img src="/images/logo.png" style={{height: '40px', float: 'left', 'paddingRight': '10px'}}/>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                Category: {(questions != false) ? questions[questionNo].category : ''} 
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" sx={{textAlign: 'right'}}>
                {counter}/{questions.length}
              </Typography>
            </Grid>
          </Grid>
        }
        content={
          <Box>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{textAlign: 'center'}}
            >
              <Grid
                item
                xs={12}
              >
                <Box>
                  <Typography variant="h5" gutterBottom sx={{paddingTop: '50px', paddingBottom: '50px'}}>
                    {(questions != false) ? decodeURI(questions[questionNo].question) : ''}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        }
        actions={
          <span>
            {
              (quizDone == false) ? 
              (
                <span>
                  <Button 
                    variant="contained" 
                    disabled={disableBtn} 
                    onClick={() => answerQuestion('True')}
                    sx={{
                      backgroundColor: '#4fbd1b',
                      '&:hover': {
                        backgroundColor: '#78d94b',
                      },
                      'marginLeft': '5px',
                      'marginRight': '5px'
                    }}
                  >
                    TRUE
                  </Button> 
                  <Button 
                    variant="contained" 
                    disabled={disableBtn} 
                    onClick={() => answerQuestion('False')}
                    sx={{
                      backgroundColor: '#e04e10',
                      '&:hover': {
                        backgroundColor: '#e46833',
                      },
                      'marginLeft': '5px',
                      'marginRight': '5px'
                    }}
                  >
                    FALSE
                  </Button>
                </span>
              ) :
              (
                <Button onClick={() => viewResults()}>
                  VIEW RESULTS
                </Button>
              )
            }
          </span>
        }
        maxWidth="sm"
        fullWidth
      />
    </Box>
  )
}
