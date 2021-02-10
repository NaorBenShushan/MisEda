import React from 'react';
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
// import { CloudUploadIcon, SendIcon } from '@material-ui/icons';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';

import useFormValidation from './useFormValidation';
import validateOnRegister from './validateOnRegister';

import { useStyles } from './css/main';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  restOwner: false,
  profilePicture: '',
};

export default function Register() {
  const { handleSubmit, handleChange, values, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateOnRegister,
  );
  const classes = useStyles();

  const doSubmit = (values) => {
    const formData = new FormData();
    // console.log(values.firstName);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('restOwner', values.restOwner);
    formData.append('profilePicture', values.profilePicture);

    console.log(Array.from(formData));
  };

  return (
    <Grid container direction='row' justify='center' className={classes.formContainer}>
      <Grid item>
        <Paper className={classes.formPaperClass}>
          <form
            // onSubmit={this.handleSubmit}
            method='POST'
            autoComplete='off'>
            <Typography className={classes.formTitle}>הירשם כדי להיות חלק ממִסְעֵדָה!</Typography>

            <TextField
              className={classes.formInput}
              id='outlined-basic'
              label='שם פרטי'
              variant='outlined'
              value={values.firstName}
              name='firstName'
              onChange={handleChange}
            />
            {errors.firstName && <p className={classes.errorText}>{errors.firstName}</p>}

            <TextField
              className={classes.formInput}
              id='outlined-basic'
              label='שם משפחה'
              variant='outlined'
              value={values.lastName}
              name='lastName'
              onChange={handleChange}
            />
            {errors.lastName && <p className={classes.errorText}>{errors.lastName}</p>}

            <TextField
              className={classes.formInput}
              id='outlined-basic'
              label='אימייל'
              variant='outlined'
              value={values.email}
              name='email'
              onChange={handleChange}
            />
            {errors.email && <p className={classes.errorText}>{errors.email}</p>}

            <TextField
              className={classes.formInput}
              id='outlined-basic'
              label='סיסמה'
              variant='outlined'
              value={values.password}
              name='password'
              onChange={handleChange}
            />
            {errors.password && <p className={classes.errorText}>{errors.password}</p>}

            <br />

            {/* DROP DOWN SELECT/OPTION */}

            <FormControl
              style={{ minWidth: '222px' }}
              variant='outlined'
              className={classes.formFormControl}>
              <InputLabel id='demo-simple-select-outlined-label'>בעלים של מסעדה?</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={values.restOwner}
                name='restOwner'
                onChange={handleChange}
                label='בעלים של מסעדה?'>
                <MenuItem value={true}>כן</MenuItem>
                <MenuItem value={false}>לא</MenuItem>
              </Select>
            </FormControl>
            <br />

            <input
              className={classes.formInput}
              accept='image/*'
              id='contained-button-file'
              type='file'
              style={{ display: 'none' }}
              name='profilePicture'
              onChange={handleChange}
            />
            <label htmlFor='contained-button-file'>
              <Button
                classes={{
                  root: classes.formUploadButton,
                  hover: classes.uploadButtonHover,
                }}
                variant='contained'
                component='span'
                endIcon={
                  <CloudUploadIcon
                    style={{
                      minWidth: '40px',
                      marginRight: '-20px',
                      fontSize: 23,
                    }}
                  />
                }>
                העלה תמונת פרופיל
              </Button>
            </label>

            <br />
            {/* Send */}
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, doSubmit)}
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
              }>
              שלח
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
