// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import type { Node } from 'react';
import {Route, Router, Switch, Link} from 'react-router-dom';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';
import withRoot from './componets/hoc/withRoot';
import withCheckAuth from './componets/hoc/withCheckAuth';

import Home from './containers/home';
import Users from './containers/users';
import Login from './containers/login';
import Logout from './containers/logout';
import Menu from './componets/header/menu';
import AppHeader from './componets/header/appHeader';
import MiniDrawer from './componets/drawer/drawer';

import './App.css';
import store, {history} from "./store/Store";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0, //theme.spacing.unit * 1,
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

let WithCheckAuth = (props: {classes: {[key: string]: string}}) => (
  <Router history={history}>
    <div className={props.classes.root}>
      <div className={props.classes.appFrame}>
        <AppHeader />
        <MiniDrawer />
        <main className={props.classes.content}>
          <Route exact path="/" component={Home}/>
          <Route path="/users" component={Users}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
        </main>
      </div>
    </div>
  </Router>
);

WithCheckAuth = withCheckAuth(WithCheckAuth);


class App extends Component<{classes: {[key: string]: string}}> {

  render(): Node {

    return (
      <Provider store={store}>
        <WithCheckAuth classes={this.props.classes} />
      </Provider>
    );
  }
}

export default withRoot(withStyles(styles)(App));

