import React, { useState } from 'react';

import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
// import * as yup from 'yup';
import SendIcon from '@material-ui/icons/Send';

import { useStyles } from './css/main';

export default function Login() {
  const classes = useStyles();

  /* doSubmit = async () => {
    const { data } = this.state;
  }; */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*   const validateUserOnRegister = async (user) => {
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
 */
  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.registerContainer}
    >
      <Grid item>
        <Paper elevation={24} className={classes.registerPaperClass}>
          <pre>
            {email} <br />
            {password} <br />
          </pre>
          <form
            // onSubmit={this.handleSubmit}
            method="POST"
            autoComplete="off"
            className={classes.form}
          >
            <Typography variant="h6" className={classes.root}>
              התחברות
            </Typography>

            <TextField
              className={classes.registerInput}
              id="outlined-basic"
              label="אימייל"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <TextField
              className={classes.registerInput}
              id="outlined-basic"
              label="סיסמה"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            {/* login */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              classes={{
                root: classes.registerButton,
                hover: classes.registerButtonHover,
              }}
              endIcon={<SendIcon />}
            >
              התחבר
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
