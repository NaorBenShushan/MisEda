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

export default function RestCard() {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.restCardRoot}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.restCardAvatar}>
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
          className={classes.restCardMedia}
          image="http://www.ewasafi.co.il/img/0555/277.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            הדבר הראשון שחושבים עליו כששומעים את המילה "מרוקו" הוא קסם. מסעדת
            EWA SAFI שמה לה למטרה להביא את האותנטיות והקסם של מרוקו אל שכונת
            נווה צדק המרהיבה ביופייה.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
