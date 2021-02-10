import {
  CardContent,
  Grid,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from './css/main';
import RestCard from './common/restCard';
import SearchIcon from '@material-ui/icons/Search';

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify="flex-end">
        <Grid item>
          <Typography className={classes.homeSliderTitleText}>
            ברוכים הבאים למִסְעֵדָה
          </Typography>
        </Grid>
        <br />
        <Grid container justify="space-between">
          {/* Search Input */}
          <Grid item>
            <Paper className={classes.homeSearchContainer}>
              {/* Search Input */}
              <div className={classes.homeSearch}>
                <div className={classes.homeSearchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="חפשו מסעדה..."
                  classes={{
                    root: classes.homeInputRoot,
                    input: classes.homeInputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Paper>
          </Grid>

          {/* Sub Title */}
          <Grid item>
            <Typography className={classes.homeSliderSmallTitleText}>
              חיפוש מסעדות לפי עדות
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography>
        <CardContent>
          <Typography className={classes.homeRankTitleText}>
            חמש המסעדות המדורגות ביותר:
          </Typography>

          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
            <RestCard />
          </Grid>
        </CardContent>
      </Typography>
    </React.Fragment>
  );
}
