import {
  CardContent,
  Grid,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from './css/main';
import RankedRest from './common/rankedRest';
import SearchIcon from '@material-ui/icons/Search';

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Typography>
        <CardContent className={classes.homeSliderText}>
          <Typography className={classes.homeSliderTitleText}>
            ברוכים הבאים למִסְעֵדָה
          </Typography>
          <Grid container justify="space-between" alignItems="center">
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
            <Grid item>
              <Typography className={classes.homeSliderSmallTitleText}>
                חיפוש מסעדות לפי עדות
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Typography>

      <Typography>
        <CardContent>
          <Typography className={classes.homeRankTitleText}>
            חמש המסעדות המדורגות ביותר:
          </Typography>

          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <RankedRest />
            <RankedRest />
            <RankedRest />
            <RankedRest />
            <RankedRest />
          </Grid>
        </CardContent>
      </Typography>
      <Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <RankedRest />
        </Grid>
      </Typography>
    </div>
  );
}
