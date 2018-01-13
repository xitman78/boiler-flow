// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import type { Node } from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';
import withRoot from './componets/hoc/withRoot';
import withCheckAuth from './componets/hoc/withCheckAuth';
import Home from './containers/home';
import Users from './containers/users';
import Login from './containers/login';
import Logout from './containers/logout';
import AppHeader from './componets/header/appHeader';
import MiniDrawer from './componets/drawer/drawer';
import ModalRoot from './componets/modal/modalRoot';
import Miss from './componets/miss/miss';

import './App.css';
import store, {history} from "./store/Store";

const styles = (theme: Object) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0, //theme.spacing.unit * 1,
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    flex: 1,
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
  footer: {
    height: 160,
    width: '100%',
    backgroundColor: theme.palette.primary[700],
    padding: 20,
    color: theme.palette.grey[400],
  }
});

type StyleClasses = $Keys<$Call<typeof styles, {}>>

let WithCheckAuth = (props: {classes: {[StyleClasses]: string}}) => (
  <Router history={history}>
    <div className={props.classes.root}>
      <div className={props.classes.appFrame}>
        <ModalRoot />
        <AppHeader />
        <MiniDrawer />
        <main className={props.classes.content}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/users" component={Users}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route component={Miss} />
          </Switch>
        </main>
      </div>
      <footer className={props.classes.footer}>
      &copy; Alexander Cherepnya, 2018
      </footer>
    </div>
  </Router>
);

WithCheckAuth = withCheckAuth(WithCheckAuth);


class App extends Component<{classes: {[StyleClasses]: string}}> {

  render(): Node {

    return (
      <Provider store={store}>
        <WithCheckAuth classes={this.props.classes} />
      </Provider>
    );
  }
}

export default withRoot(withStyles(styles)(App));

