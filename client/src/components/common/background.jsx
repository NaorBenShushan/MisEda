import { CardMedia } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../css/main';

export default function Background() {
  const classes = useStyles();

  return <CardMedia component="img" className={classes.backgroundImage} />;
}
