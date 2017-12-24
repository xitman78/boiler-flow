// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import type { Node } from 'react';
import {Route, Router, Switch, Link} from 'react-router-dom';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';
import withRoot from './componets/withRoot';
import withAuth from './componets/hoc/withAuth';

import Home from './containers/home';
import Users from './containers/users';
import Login from './containers/login';
import Logout from './containers/logout';
import Menu from './componets/header/menu';
import logo from './logo.svg';
import './App.css';
import store, {history} from "./store/Store";

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

let WithAuth = () => (
  <Router history={history}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Menu />
      <Route exact path="/" component={Home}/>
      <Route path="/users" component={Users}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
    </div>
  </Router>
);

WithAuth = withAuth(WithAuth);


class App extends Component<{}> {

  render(): Node {

    return (
      <Provider store={store}>
        <WithAuth />
      </Provider>
    );
  }
}

export default withRoot(withStyles(styles)(App));

