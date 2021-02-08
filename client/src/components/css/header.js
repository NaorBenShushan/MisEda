import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  /* ***********************************************
   *********************** NAVBAR ******************
   ************************************************* */
  navbarGrow: {
    flexGrow: 1,
  },
  navbarMenuButton: {
    marginRight: theme.spacing(2),
  },

  navbarSectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  navbarSectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  navbarMenuItem: {
    display: 'flex',
    textDecoration: 'none',
    color: '#4C5D73',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      minHeight: '1.8em',
    },
  },
}));
