import { makeStyles, fade } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/* SITE COLORS */
// light-red: #AB2D45
// dark-red: #5E0F1E
// mustard: #B8B243
// dark-blue: #145B78
// light-blue: #35C0F7

export const useStyles = makeStyles((theme) => ({
  /* ****************************************************
   *********************** HOME ***********************
   **************************************************** */

  /* TITLES */
  homeSliderTitleText: {
    fontFamily: 'Suez One',
    fontSize: '3rem',
    color: '#145B78',
    textShadow: '2px 2px 5px #ffffff',
    marginRight: theme.spacing(8),
  },

  homeSliderSmallTitleText: {
    fontFamily: 'Suez One',
    marginRight: theme.spacing(8),
    color: '#5E0F1E',
    fontSize: '2rem',
    textShadow: '2px 2px 5px #ffffff',
  },

  homeRankTitleText: {
    fontFamily: 'Suez One',
    fontSize: '2.2rem',
    color: '#dbd5cf',
    textShadow: '3px 3px 3px #999929',
  },

  /* Search Input */
  homeSearchContainer: {
    position: 'absolute',
    marginLeft: theme.spacing(7),
  },
  homeSearch: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  homeSearchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeInputRoot: {
    color: 'inherit',
  },
  homeInputInput: {
    padding: theme.spacing(1, 6, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  /* / Search Input */

  /* **************************************************
   ********************* RestCard *************************
   **************************************************** */

  restCardRoot: {
    backgroundColor: '#facad3',
    boxShadow: 'inset 0 0 5px #145B78',
    opacity: 0.9,
    maxWidth: 345,
  },
  restCardMedia: {
    margin: '0 auto',
    /* Desired image size: width: 208, height: 210 */
    width: '208px',
    height: '210px',
    overflow: 'hidden',
    boxShadow: '0 0 2px 2px #145B78',
  },
  restCardExpand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  restCardExpandOpen: {
    transform: 'rotate(180deg)',
  },
  restCardAvatar: {
    backgroundColor: red[500],
  },

  /* **************************************************
   *************** My Account RestCard ****************
   **************************************************** */

  myAcRestCardRoot: {
    backgroundColor: '#facad3',
    boxShadow: 'inset 0 0 5px #145B78',
    opacity: 0.9,
    maxWidth: 700,
  },
  myAcRestCardMedia: {
    margin: '0 auto',
    /* Desired image size: width: 208, height: 210 */
    width: '208px',
    height: '210px',
    overflow: 'hidden',
    boxShadow: '0 0 2px 2px #145B78',
  },
  myAcRestCardExpand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  myAcRestCardExpandOpen: {
    transform: 'rotate(180deg)',
  },
  myAcRestCardAvatar: {
    backgroundColor: red[500],
  },

  /* **************************************************
   ********************* FORM *************************
   **************************************************** */
  formContainer: {
    minHeight: '51.5rem',
  },

  formTitle: {
    fontFamily: 'Suez One',
    fontSize: '1.7rem',
    marginRight: theme.spacing(8),
    marginBottom: theme.spacing(1),
    color: '#AB2D45',
    width: '100%',
  },

  formPaperClass: {
    marginTop: '10ch',
    textAlign: 'center',
    padding: '25px',
    minHeight: '10ch',
    maxWidth: '45ch',
    boxShadow: '0px 2px 35px 3px #5E0F1E',
  },
  formFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formInput: {
    margin: '0.4em 0',
  },

  /* UPLOAD Button  */

  formUploadButton: {
    fontSize: 16,
    color: 'white',
    background: '#35C0F7',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.2, 3),

    '&:hover': {
      background: '#145B78',
    },
  },

  /* SEND Button  */

  formSendButton: {
    fontSize: 18,
    marginTop: theme.spacing(2),
    background: '#FBBB04',
    paddingLeft: theme.spacing(4),
    '&:hover': {
      background: '#145B78',
    },
  },

  formSendButtonIcon: {
    fontSize: 22,
    marginRight: '15px',
    transform: 'rotate(205deg)',
  },

  errorText: {
    fontFamily: 'Tahoma',
    margin: '0 0 4px 0',
    padding: 0,
    color: 'red',
    fontStyle: 'bold',
    fontSize: '0.7rem',
  },

  /* **************************************************
   ********************* My Account *******************
   **************************************************** */

  myAccountInputs: {
    margin: '10px',
  },
}));
