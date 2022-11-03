import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomDialogBox from './custom/CustomDialogBox';
import { Typography } from '@mui/material';

export default function HomePage() {
  const [ dialog, setDialog ] = useState(true);
  
  return (
    <Box>
      <CustomDialogBox
        open={dialog}
        onClose={() => setDialog(false)}
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
                <img src="/images/zeniark-logo.png" style={{
                  height: '52px', 
                  paddingTop: '30px',
                  paddingBottom: '27px'
                }}/>
                <div className="page-title">
                  <Typography variant="h5" sx={{fontWeight: 'bold'}}>Welcome to the Trivia Challenge!</Typography>
                </div>
                <div className="page-body">
                  <Typography variant="subtitle1" gutterBottom>You will be presented with 10 True or False questions.</Typography>
                  <Box
                    sx={{
                      backgroundColor: '#085696',
                      borderRadius: '8px'
                    }}
                  >
                    <Typography variant="h5" sx={{padding: '5px', color: '#FFFFFF'}}>Can you score 10/10?</Typography>
                  </Box>
                </div>
                <div className="page-control">
                  <Button variant="text">
                    <Link to="quiz"><Typography variant="h6" sx={{fontWeight: 'bold'}}>LET’S START!</Typography></Link>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        }
        maxWidth="sm"
        fullWidth
      />
    </Box>
  )
}
