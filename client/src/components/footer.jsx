import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Paper elevation={6}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{
          minHeight: '3em',
        }}
      >
        <Grid item>
          <b>
            &copy; Another site by{' '}
            <Link
              style={{
                color: 'darkOrange',
                textDecoration: 'none',
                fontFamily: 'Marck Script',
              }}
              to="/naor-doron-site"
            >
              <i>Naor & Doron</i>
            </Link>
            , {new Date().getFullYear()}
          </b>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
