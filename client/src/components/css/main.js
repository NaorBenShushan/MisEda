import { makeStyles, fade } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  homeSliderTitleText: {
    fontFamily: 'Suez One',
    marginLeft: theme.spacing(8),
    fontSize: '3rem',
    color: '#145B78',
    textShadow: '2px 2px 5px #ffffff',
  },

  homeSliderSmallTitleText: {
    fontFamily: 'Suez One',
    marginLeft: theme.spacing(8),
    color: '#5E0F1E',
    fontSize: '2rem',
    textShadow: '2px 2px 5px #ffffff',
  },

  /* Search Input */
  homeSearchContainer: {
    position: 'absolute',
    marginRight: theme.spacing(1),
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

  homeRankTitleText: {
    fontFamily: 'Suez One',
    fontSize: '2.2rem',
    color: '#999929',
    textShadow: '1px 1px 1px black',
  },

  /* Ranked Card */
  card: {
    //maxWidth: "260px",
    minWidth: '263px',
  },

  media: {
    margin: '0 auto',
    /* Desired image size: width: 208, height: 210 */
    width: '208px',
    height: '210px',
    overflow: 'hidden',
  },

  image: {
    minHeight: '100%',
    minWidth: '100%',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[400],
  },
  cardContent: {
    textAlign: 'left',
    fontSize: '1rem',
  },
  cardContentSpan: {
    fontWeight: 'bold',
  },
  description: {
    maxWidth: 228,
    overflowWrap: 'anywhere',
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareButtonMenu: {
    position: 'absolute',
    bottom: '55em',
  },

  /* Register */
  registerContainer: {
    minHeight: '51.5rem',
  },

  registerPaperClass: {
    marginTop: '10ch',
    textAlign: 'center',
    padding: '25px',
    minHeight: '10ch',
    maxHeight: '100ch',
    maxWidth: '45ch',
  },
  registerFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  registerInput: {
    margin: '0.4em 0',
  },
  /* registerUploadButton  */

  registerUploadButtonRoot: {
    color: 'white',
    background: '#35C0F7',

    '&:hover': {
      background: '#145B78',
    },
  },

  /* Register Button  */
  /*  registerUploadButton: {
    background: '#35C0F7',
  }, */
  registerButton: {
    margin: theme.spacing(1),
    background: '#FBBB04',
    '&:hover': {
      background: '#145B78',
    },
  },
}));
