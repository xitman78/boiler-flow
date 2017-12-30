// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import AccountBox from 'material-ui-icons/AccountBox';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import type {StoreType} from '../../store/storeTypes';
import {toggleDrawer} from "../../actions/UIActions";

export const drawerWidth = 240;

const styles = theme => ({
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

class MiniDrawer extends React.Component<{
  classes: {[key: string]: string},
  theme: {},
  isDrawerOpen: boolean,
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
          <List className={classes.list}>
            <ListItem button component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText inset primary="Home" />
            </ListItem>
            <ListItem button component={Link} to='/users'>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText inset primary="Users" />
            </ListItem>
          </List>
          <Divider/>
         {/* <List className={classes.list}>Two</List>*/}
        </div>
      </Drawer>
    );
  }

}

export default withStyles(styles, { withTheme: true })(
  connect((state: StoreType) => ({
    isDrawerOpen: state.UI.isDrawerOpen
  }), {
    toggleDrawer: toggleDrawer
  })(MiniDrawer)
);