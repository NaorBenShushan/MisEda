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

import SendIcon from '@material-ui/icons/Send';

import { useStyles } from './css/main';

export default function Reviews() {
  const classes = useStyles();
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
          הביקורות שלי
        </Typography>
        <Paper elevation={24} className={classes.registerPaperClass}>
          <Typography variant="h6" className={classes.root}>
            אהלן. אלה המסעדות שלך:
          </Typography>

          <TextField
            className={classes.registerInput}
            id="outlined-basic"
            label="שם פרטי"
            variant="outlined"
          />

          <TextField
            className={classes.registerInput}
            id="outlined-basic"
            label="שם משפחה"
            variant="outlined"
          />

          <TextField
            className={classes.registerInput}
            id="outlined-basic"
            label="אימייל"
            variant="outlined"
          />
          <br />

          <TextField
            className={classes.registerInput}
            id="outlined-basic"
            label="סיסמה"
            variant="outlined"
          />

          <br />
          {/* DROP DOWN SELECT/OPTION */}

          <FormControl
            style={{ minWidth: '222px' }}
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              בעלים של מסעדה?
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="בעלים של מסעדה?"
            >
              <MenuItem value={true}>כן</MenuItem>
              <MenuItem value={false}>לא</MenuItem>
            </Select>
          </FormControl>
          <br />
          {/* Send */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            endIcon={<SendIcon />}
          >
            שלח
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
