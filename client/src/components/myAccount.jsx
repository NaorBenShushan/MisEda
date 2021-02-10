import React, { useState } from 'react';
import MyAcRestCard from './common/myAcRestCard';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
// import {CloudUploadIcon, SendIcon } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';

import { useStyles } from './css/main';

export default function MyAccount() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.registerContainer}
    >
      <Grid item>
        <Typography variant="h2" className={classes.root}>
          החשבון שלי
        </Typography>
        <Paper style={{ padding: '2em' }}>
          <Grid container spacing={5} direction="column" alignItems="center">
            {/* Update Details */}
            <Grid item>
              <Typography variant="h5" className={classes.root}>
                עדכן פרטים
              </Typography>

              <form
                // onSubmit={this.handleSubmit}
                method="POST"
                autoComplete="off"
              >
                <TextField
                  className={(classes.formInput, classes.myAccountInputs)}
                  id="outlined-basic"
                  label="שם פרטי"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                  className={(classes.formInput, classes.myAccountInputs)}
                  id="outlined-basic"
                  label="שם משפחה"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  className={(classes.formInput, classes.myAccountInputs)}
                  id="outlined-basic"
                  label="אימייל"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <Grid container justify="space-between">
                  <Grid item>
                    <input
                      className={classes.formInput}
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      style={{ display: 'none' }}
                      // value={profilePicture}
                      onChange={(e) => {
                        // setProfilePicture(e.target.files[0]);
                        // console.log(e.target.files[0].name);
                        let file = e.target.files[0];
                        // setProfilePicture(file);
                        console.log(file);
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        classes={{
                          root: classes.formUploadButton,
                          hover: classes.uploadButtonHover,
                        }}
                        variant="contained"
                        component="span"
                        endIcon={
                          <CloudUploadIcon
                            style={{
                              minWidth: '40px',
                              marginRight: '-20px',
                              fontSize: 23,
                            }}
                          />
                        }
                      >
                        העלה תמונת פרופיל חדשה
                      </Button>
                    </label>
                  </Grid>
                  <Grid item>
                    {/* Send */}
                    <Button
                      variant="contained"
                      color="secondary"
                      classes={{
                        root: classes.formSendButton,
                        hover: classes.formButtonHover,
                      }}
                      startIcon={
                        <SendIcon
                          style={{
                            fontSize: 22,
                            marginRight: '15px',
                            transform: 'rotate(205deg)',
                          }}
                        />
                      }
                    >
                      עדכן
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            <Grid item>
              <Typography variant="h5" className={classes.root}>
                המסעדות שלי
              </Typography>
              <MyAcRestCard />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
