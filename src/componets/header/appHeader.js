// @flow
import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ExitToApp from 'material-ui-icons/ExitToApp';
import classNames from 'classnames';

import  {drawerWidth} from '../drawer/drawer';
import {toggleDrawer} from "../../actions/UIActions";
import type {StoreType} from '../../store/storeTypes';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 36,
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

function ButtonAppBar(props: {classes: {[key: string]: string}, isDrawerOpen: boolean, toggleDrawer: () => any}) {
  const { classes } = props;
  return (
    <AppBar className={classNames(classes.appBar, props.isDrawerOpen && classes.appBarShift)}>
      <Toolbar>
        <IconButton
          className={classNames(classes.menuButton, props.isDrawerOpen && classes.hide)}
          color="contrast"
          aria-label="Open menu"
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          CRM Pro
        </Typography>
        {props.authUser ?
          <Button color="contrast" href={'/logout'}>Log out<ExitToApp /></Button>
          :
          <Button color="contrast" href={'/login'}>Sign In</Button>
        }
      </Toolbar>
    </AppBar>
  );
}


export default connect(
  (state: StoreType) => ({
    authUser: state.auth.authUser,
    isDrawerOpen: state.UI.isDrawerOpen,
  }), {
    toggleDrawer: toggleDrawer
  })
(withStyles(styles)(ButtonAppBar))