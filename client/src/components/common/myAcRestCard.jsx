import React from 'react';
import { useStyles } from '../css/main';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';

export default function MyAcRestCard() {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.myAcRestCardRoot}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.myAcRestCardAvatar}>
              E
            </Avatar>
          }
          action={
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          }
          title="EWA SAFI"
          subheader="Moroccan Soul Food"
        />
        <CardMedia
          className={classes.myAcRestCardMedia}
          image="http://www.ewasafi.co.il/img/0555/277.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            הדבר הראשון שחושבים עליו כששומעים את המילה "מרוקו" הוא קסם. מסעדת
            EWA SAFI שמה לה למטרה להביא את האותנטיות והקסם של מרוקו אל שכונת
            נווה צדק המרהיבה ביופייה.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
