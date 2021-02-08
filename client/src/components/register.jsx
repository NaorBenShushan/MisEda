import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import * as yup from 'yup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';

import { useStyles } from './css/main';

export default function Register() {
  const classes = useStyles();

  /* doSubmit = async () => {
    const { data } = this.state;
  }; */

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restOwner, setRestOwner] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const validateUserOnRegister = async (user) => {
    let userSchema = yup.object().shape({
      firstName: yup
        .string()
        .required('יש לציין שם פרטי')
        .trim()
        .min(2, 'שם פרטי קצר מדי')
        .max(15, 'שם פרטי ארוך מדי'),

      lastName: yup
        .string()
        .required('יש לציין שם משפחה')
        .trim()
        .min(2, 'שם המשפחה קצר מדי')
        .max(15, 'שם המשפחה ארוך מדי'),

      email: yup
        .string()
        .required('יש לציין אימייל')
        .trim()
        .min(6, 'האימייל קצר מדי')
        .max(20, 'האימייל ארוך מדי')
        .email()
        .lowercase(),

      password: yup
        .string()
        .required('יש לציין סיסמה')
        .min(8, 'הסיסמה קצרה מדי')
        .max(20, 'הסיסמה ארוכה מדי'),

      restOwner: yup.boolean().required('יש לציין האם את/ה בעל/ת מסעדה'),
    });

    // check validity

    // abortEarly make validation for all fields and send all errors instead of one at a time
    return userSchema.validate(user, { abortEarly: false });
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.formContainer}
    >
      <Grid item>
        <Paper className={classes.formPaperClass}>
          {/*  <pre>
            {firstName} <br />
            {lastName} <br />
            {email} <br />
            {password} <br />
            {restOwner} <br />
            {profilePicture} <br />
          </pre> */}
          <form
            // onSubmit={this.handleSubmit}
            method="POST"
            autoComplete="off"
          >
            <Typography className={classes.formTitle}>
              הירשם כדי להיות חלק ממִסְעֵדָה!
            </Typography>

            <TextField
              className={classes.formInput}
              id="outlined-basic"
              label="שם פרטי"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              className={classes.formInput}
              id="outlined-basic"
              label="שם משפחה"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              className={classes.formInput}
              id="outlined-basic"
              label="אימייל"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <TextField
              className={classes.formInput}
              id="outlined-basic"
              label="סיסמה"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            {/* DROP DOWN SELECT/OPTION */}

            <FormControl
              style={{ minWidth: '222px' }}
              variant="outlined"
              className={classes.formFormControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                בעלים של מסעדה?
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={restOwner}
                onChange={(e) => setRestOwner(e.target.value)}
                label="בעלים של מסעדה?"
              >
                <MenuItem value={true}>כן</MenuItem>
                <MenuItem value={false}>לא</MenuItem>
              </Select>
            </FormControl>
            <br />

            <input
              className={classes.formInput}
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: 'none' }}
              value={profilePicture}
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
                העלה תמונת פרופיל
              </Button>
            </label>

            <br />
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
              שלח
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
