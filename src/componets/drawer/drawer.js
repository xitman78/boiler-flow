// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {createStructuredSelector} from 'reselect';

import  AuthMenu from './authMenu';
import PublicMenu from './publicMenu';
import {toggleDrawer} from "../../actions/UIActions";
import type {StoreType} from '../../store/storeTypes';

export const drawerWidth = 240;

const styles = (theme: Object) => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

type StyleClasses = $Keys<$Call<typeof styles, {}>>

class MiniDrawer extends React.Component<{
  classes: {[StyleClasses]: string},
  theme: {},
  isDrawerOpen: boolean,
  isAuthorized: boolean,
  toggleDrawer: () => any}, {open: boolean}> {

  render() {
    const {classes, theme} = this.props;

    return (
      <Drawer
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.isDrawerOpen && classes.drawerPaperClose),
        }}
        open={this.props.isDrawerOpen}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.toggleDrawer}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          {this.props.isAuthorized ? <AuthMenu/> : <PublicMenu/>}
          <Divider/>
        </div>
      </Drawer>
    );
  }

}

const selector = createStructuredSelector({
  isDrawerOpen: (state: StoreType) => state.UI.isDrawerOpen,
  isAuthorized: (state: StoreType) => !!state.auth.token,
});

const actionsMap = {
  toggleDrawer: toggleDrawer
};

export default connect(selector, actionsMap)(withStyles(styles, { withTheme: true })(MiniDrawer));