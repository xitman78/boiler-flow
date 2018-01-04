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
import LoginToApp from 'material-ui-icons/Input';
import classNames from 'classnames';
import {createStructuredSelector} from 'reselect';

import  {drawerWidth} from '../drawer/drawer';
import {toggleDrawer} from "../../actions/UIActions";
import type {StoreType} from '../../store/storeTypes';

import './appHeader.css';

const styles = (theme: Object) => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

type StyleClasses = $Keys<$Call<typeof styles, {}>>

type Props = {
  classes: {[StyleClasses]: string},
  isDrawerOpen: boolean,
  toggleDrawer: () => any,
  isAuthorized: boolean
};

function ButtonAppBar(props: Props) {
  const { classes } = props;
  return (
    <AppBar className={classNames(classes.appBar, props.isDrawerOpen && classes.appBarShift)}>
      <Toolbar>
        <IconButton
          className={classNames("app-header-menu-button", props.isDrawerOpen && "app-header-icon-hide")}
          color="contrast"
          aria-label="Open menu"
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className="app-header-flex">
          CRM Pro
        </Typography>
        {props.isAuthorized ?
          <Button color="contrast" href={'/logout'}>Log out<ExitToApp/></Button>
          :
          <Button color="contrast" href={'/login'}>Sign In<LoginToApp/></Button>
        }
      </Toolbar>
    </AppBar>
  );
}

const selector = createStructuredSelector({
  isAuthorized: (state: StoreType) => !!state.auth.token,
  isDrawerOpen: (state: StoreType) => state.UI.isDrawerOpen,
});

const actionsMap = {
  toggleDrawer: toggleDrawer
};

export default connect(selector, actionsMap)(withStyles(styles)(ButtonAppBar));