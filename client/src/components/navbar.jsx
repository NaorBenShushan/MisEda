import React from 'react';
import { useStyles } from './css/header';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';
import logo_exp_LIGHT from './images/logo_exp_LIGHT.png';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/login"
      >
        התחבר
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/register"
      >
        הירשם
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/my-account"
      >
        החשבון שלי
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/favorites"
      >
        מועדפים
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/reviews"
      >
        ביקורות
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        className={classes.navbarMenuItem}
        component={Link}
        to="/my-rests"
      >
        המסעדות שלי
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.navbarGrow}>
        <AppBar position="static" style={{ background: '#AB2D45' }}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {/* Menu + Search */}
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {/* Menu Button - Hamburger */}
                  <Grid item>
                    <IconButton
                      edge="start"
                      className={classes.navbarMenuButton}
                      color="inherit"
                      aria-label="open drawer"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              {/* / Menu + Search */}

              {/* Logo */}
              <Typography variant="h6" noWrap component={Link} to="/">
                <CardMedia
                  style={{ width: '150px' }}
                  src={logo_exp_LIGHT}
                  component="img"
                />
              </Typography>

              {/* Left Icons + Small menu */}
              <Grid item>
                <div className={classes.navbarGrow} />
                <div className={classes.navbarSectionDesktop}>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.navbarSectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
}
