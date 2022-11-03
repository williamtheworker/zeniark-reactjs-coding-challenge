import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CustomDialogBox from './custom/CustomDialogBox';
import { Divider } from '@mui/material';

export default function ResultsPage() {
    const [ dialog, setDialog ] = useState(true);

    const results = JSON.parse(localStorage.getItem('quizResults'));
    let score = 0;

    results.forEach((result) => {
        if(result.result == 'correct') {
            score++;
        }
    })
    console.log('this is score ', score);
    console.log('theese are results ', results );
    // console.log(localStorage.getItem('quizResuls'));
    return (
        <Box>
            <CustomDialogBox
                open={dialog}
                onClose={() => setDialog(false)}
                title={
                    <Grid container>
                        <Grid item xs={12}>
                            <img src="/images/logo.png" style={{height: '40px', float: 'left', 'paddingRight': '10px'}}/>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                Final Results
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
                                <Typography variant="h4" gutterBottom sx={{paddingTop: '20px', paddingBottom: '20px', fontWeight: 'bold'}}>
                                    {score} / {results.length}
                                    {/* {(questions != false) ? decodeURI(questions[questionNo].question) : ''} */}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {
                        results.map((result) => (
                            <Grid container>
                                <Grid item xs={10}>
                                    <Divider/>
                                    <Typography>
                                        {result.question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        {result.result}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                    
                </Box>
                }
                actions={
                    <Button variant="text">
                        <Link to="/"><Typography variant="h6" sx={{fontWeight: 'bold'}}>PLAY AGAIN</Typography></Link>
                    </Button>
                }
                maxWidth="sm"
                fullWidth
            />
        </Box>
    )
}
